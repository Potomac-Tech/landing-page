import assert from 'node:assert/strict';
import test from 'node:test';
import {
  isPrivatePreviewPath,
  previewRequest,
  previewResponse,
} from '../lib/worker-preview.ts';

test('standalone requests discard forged Sites identity and preserve form bodies', async () => {
  const request = previewRequest(
    new Request('https://preview.example/api/inquiries', {
      method: 'POST',
      headers: {
        'OAI-Authenticated-User-Email': 'owner@example.com',
        'OAI-Authenticated-User-Id': 'forged',
        'content-type': 'application/json',
        origin: 'https://preview.example',
      },
      body: '{"test":true}',
    }),
  );
  assert.equal(request.headers.get('oai-authenticated-user-email'), null);
  assert.equal(request.headers.get('oai-authenticated-user-id'), null);
  assert.equal(request.headers.get('origin'), 'https://preview.example');
  assert.equal(await request.text(), '{"test":true}');
});

test('private routes, encoded equivalents, and their children are blocked', () => {
  for (const path of [
    '/inquiries',
    '/inquiries/',
    '/inquiries/nested',
    '/%69nquiries',
    '//inquiries',
    '/signin-with-chatgpt',
    '/callback',
    '/%ZZ',
  ]) {
    assert.equal(isPrivatePreviewPath(path), true, path);
  }
  for (const path of ['/', '/api/inquiries', '/pathfinder-1448.webp']) {
    assert.equal(isPrivatePreviewPath(path), false, path);
  }
});

test('preview responses preserve content and status while preventing indexing', async () => {
  const result = previewResponse(
    Response.json({ reference: 'test' }, { status: 201 }),
  );
  assert.equal(result.status, 201);
  assert.equal(
    result.headers.get('X-Robots-Tag'),
    'noindex, nofollow, noarchive',
  );
  assert.equal(result.headers.get('Cache-Control'), 'no-store');
  assert.deepEqual(await result.json(), { reference: 'test' });
});
