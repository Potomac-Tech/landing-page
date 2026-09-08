import assert from 'node:assert/strict';
import { readdir } from 'node:fs/promises';

const base = new URL(process.argv[2] || 'http://127.0.0.1:3000');
assert.ok(
  ['127.0.0.1', 'localhost'].includes(base.hostname) ||
    (base.hostname.startsWith('potomac-lunar-preview-20260908.') &&
      base.hostname.endsWith('.workers.dev')),
  'Only the isolated branch preview or localhost may be tested.',
);
const assets = await readdir(
  new URL('../dist/client/_next/static/', import.meta.url),
  { recursive: true },
);
const css = assets.find((name) => name.endsWith('.css'))?.replaceAll('\\', '/');
const js = assets.find((name) => name.endsWith('.js'))?.replaceAll('\\', '/');
assert.ok(css && js, 'Build the preview first.');

for (const path of [
  '/',
  '/pathfinder-1448.webp',
  '/product-previews.webp',
  '/favicon.png',
  `/_next/static/${css}`,
  `/_next/static/${js}`,
]) {
  const result = await fetch(new URL(path, base));
  assert.equal(result.status, 200, path);
  assert.match(result.headers.get('x-robots-tag') || '', /noindex/, path);
  assert.ok((await result.arrayBuffer()).byteLength > 0, path);
  console.log(`PASS ${path}`);
}

for (const path of [
  '/inquiries',
  '/inquiries/?_rsc=test',
  '/%69nquiries',
  '/signin-with-chatgpt',
]) {
  const result = await fetch(new URL(path, base), {
    headers: {
      'oai-authenticated-user-email': 'owner@example.com',
      'oai-authenticated-user-id': 'forged',
    },
  });
  assert.equal(result.status, 403, path);
  console.log(`PASS private route denied: ${path}`);
}
const robots = await fetch(new URL('/robots.txt', base));
assert.match(await robots.text(), /Disallow: \//);

for (const [origin, expectedStatus] of [
  [base.origin, 400],
  ['https://invalid.example', 403],
]) {
  const result = await fetch(new URL('/api/inquiries', base), {
    method: 'POST',
    headers: { origin, 'content-type': 'application/json' },
    body: '{}',
  });
  assert.equal(result.status, expectedStatus);
}
console.log('PASS robots and inquiry validation/origin protections');

if (process.argv.includes('--submit')) {
  const requestId = crypto.randomUUID();
  const body = JSON.stringify({
    requestId,
    name: 'BRANCH PREVIEW DEPLOYMENT TEST',
    email: 'preview-qa@example.invalid',
    organization: 'TEST ONLY',
    interest: 'Lunar data briefing',
    message:
      'Deployment smoke test. Delete this exact test record after verification.',
    website: '',
  });
  for (const status of [201, 200]) {
    const result = await fetch(new URL('/api/inquiries', base), {
      method: 'POST',
      headers: { origin: base.origin, 'content-type': 'application/json' },
      body,
    });
    assert.equal(result.status, status);
    assert.equal((await result.json()).reference, requestId);
  }
  console.log(
    `PASS inquiry save and idempotency. Delete test record: ${requestId}`,
  );
}
