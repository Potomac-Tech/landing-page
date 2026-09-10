import Link from 'next/link';
import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { database, siteEnvironment } from '@/db/client';
import { isInboxOwner } from '@/lib/inquiries';
import { chatGPTSignInPath } from '@/app/chatgpt-auth';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Private inquiry inbox — Potomac',
  robots: { index: false, follow: false },
  openGraph: { images: [] },
  twitter: { images: [] },
};

type Inquiry = {
  id: string;
  name: string;
  email: string;
  organization: string;
  interest: string;
  message: string;
  created_at: number;
};

export default async function InquiryInbox({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const requestHeaders = await headers();
  if (
    !isInboxOwner(
      requestHeaders.get('oai-authenticated-user-email'),
      siteEnvironment().INBOX_OWNER_EMAIL,
    )
  ) {
    return (
      <main className="inbox-page">
        <Link href="/">← Potomac</Link>
        <h1>Private inquiry inbox</h1>
        <p>This page is available only to the designated Potomac site owner.</p>
        {!requestHeaders.get('oai-authenticated-user-email') && (
          <a href={chatGPTSignInPath('/inquiries')} target="_top">
            Owner sign in
          </a>
        )}
      </main>
    );
  }
  const params = await searchParams;
  const parsedPage = parseInt(params.page || '0', 10);
  const page = Number.isFinite(parsedPage)
    ? Math.max(0, Math.min(1000, parsedPage))
    : 0;
  let rows: Inquiry[];
  try {
    const result = await database()
      .prepare(
        'SELECT id, name, email, organization, interest, message, created_at FROM inquiries ORDER BY created_at DESC, id DESC LIMIT 26 OFFSET ?',
      )
      .bind(page * 25)
      .all<Inquiry>();
    rows = result.results;
  } catch {
    return (
      <main className="inbox-page">
        <Link href="/">← Potomac</Link>
        <h1>Inquiry inbox</h1>
        <p>The inbox is temporarily unavailable. Please try again shortly.</p>
      </main>
    );
  }
  return (
    <main className="inbox-page">
      <Link href="/">← Potomac</Link>
      <p className="eyebrow">Owner access only</p>
      <h1>Inquiry inbox</h1>
      <p>
        Briefing requests and Cabeus Terminal early-access inquiries.
        Submissions are saved here; automatic email notifications are not
        enabled.
      </p>
      {!rows.length && (
        <div className="inbox-empty">No inquiries on this page.</div>
      )}
      {rows.slice(0, 25).map((inquiry) => (
        <article className="inbox-inquiry" key={inquiry.id}>
          <div>
            <h2>{inquiry.name}</h2>
            <time dateTime={new Date(inquiry.created_at).toISOString()}>
              {new Date(inquiry.created_at).toLocaleString('en-US', {
                timeZone: 'UTC',
              })}{' '}
              UTC
            </time>
          </div>
          <p>
            {inquiry.organization || 'No organization provided'} ·{' '}
            <a href={`mailto:${encodeURIComponent(inquiry.email)}`}>
              {inquiry.email}
            </a>
          </p>
          <h3>{inquiry.interest}</h3>
          <p className="inquiry-message">{inquiry.message}</p>
          <small>Reference: {inquiry.id}</small>
        </article>
      ))}
      <nav aria-label="Inbox pages">
        {page > 0 && (
          <a href={`/inquiries?page=${page - 1}`}>← Newer inquiries</a>
        )}
        {rows.length > 25 && (
          <a href={`/inquiries?page=${page + 1}`}>Older inquiries →</a>
        )}
      </nav>
    </main>
  );
}
