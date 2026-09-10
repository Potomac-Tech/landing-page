import { database } from '@/db/client';
import { validateInquiry } from '@/lib/inquiries';

const response = (body: object, status = 200) =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin)
    return response(
      { error: 'Please submit your inquiry from the Potomac website.' },
      403,
    );
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    return response({ error: 'Unsupported request format.' }, 415);
  if (Number(request.headers.get('content-length')) > 12000)
    return response({ error: 'Your inquiry is too long.' }, 413);
  let raw = '';
  try {
    const reader = request.body?.getReader();
    if (!reader) return response({ error: 'Please complete the form.' }, 400);
    const decoder = new TextDecoder();
    let length = 0;
    for (;;) {
      const chunk = await reader.read();
      if (chunk.done) break;
      length += chunk.value.byteLength;
      if (length > 12000) {
        await reader.cancel();
        return response({ error: 'Your inquiry is too long.' }, 413);
      }
      raw += decoder.decode(chunk.value, { stream: true });
    }
    raw += decoder.decode();
  } catch {
    return response(
      { error: 'Please try submitting your inquiry again.' },
      400,
    );
  }
  let input;
  try {
    input = validateInquiry(JSON.parse(raw));
  } catch {
    return response({ error: 'Please check your form details.' }, 400);
  }
  if (!input || input.website)
    return response(
      { error: 'Please check your form details and try again.' },
      400,
    );
  try {
    const db = database();
    const ip = request.headers.get('cf-connecting-ip') || 'local';
    const hash = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(`potomac-inquiry:${ip}`),
    );
    const source = Array.from(new Uint8Array(hash), (byte) =>
      byte.toString(16).padStart(2, '0'),
    ).join('');
    const existing = await db
      .prepare('SELECT id FROM inquiries WHERE id = ?')
      .bind(input.requestId)
      .first<{ id: string }>();
    if (existing) return response({ reference: existing.id });
    const now = Date.now();
    const result = await db
      .prepare(`INSERT INTO inquiries (id, name, email, organization, interest, message, created_at, source_hash)
      SELECT ?, ?, ?, ?, ?, ?, ?, ?
      WHERE (SELECT COUNT(*) FROM inquiries WHERE source_hash = ? AND created_at > ?) < 5
      ON CONFLICT(id) DO NOTHING`)
      .bind(
        input.requestId,
        input.name,
        input.email.toLowerCase(),
        input.organization,
        input.interest,
        input.message,
        now,
        source,
        source,
        now - 3600000,
      )
      .run();
    if (!result.meta.changes) {
      const saved = await db
        .prepare('SELECT id FROM inquiries WHERE id = ?')
        .bind(input.requestId)
        .first<{ id: string }>();
      if (saved) return response({ reference: saved.id });
      return response(
        {
          error:
            'Too many requests. Please try again in an hour or email info@potomacdb.com.',
        },
        429,
      );
    }
    return response({ reference: input.requestId }, 201);
  } catch {
    return response(
      {
        error:
          'Your inquiry could not be saved. Please retry or email info@potomacdb.com.',
      },
      503,
    );
  }
}
