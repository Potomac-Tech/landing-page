import assert from 'node:assert/strict';

const base = new URL(
  process.argv[2] || 'https://potomac-landing-production.jake-249.workers.dev',
);
assert.ok(
  [
    'potomacdb.com',
    'potomac-landing-production.jake-249.workers.dev',
    'localhost',
    '127.0.0.1',
  ].includes(base.hostname),
);
const isPublic = base.hostname === 'potomacdb.com';
const page = await fetch(base);
assert.equal(page.status, 200);
assert.equal(page.headers.get('x-content-type-options'), 'nosniff');
assert.equal(page.headers.get('x-frame-options'), 'DENY');
assert.equal(page.headers.has('x-robots-tag'), !isPublic);
const html = await page.text();
assert.match(html, /Leaders of the Lunar Data Market/);
assert.match(html, /rel="canonical" href="https:\/\/potomacdb.com\/?"/);
assert.doesNotMatch(html, /href="\/inquiries"/);
const formTag = html.match(
  /<form\b[^>]*aria-label="Request a Potomac briefing"[^>]*>/,
)?.[0];
assert.ok(formTag, 'Briefing form must be server rendered.');
assert.match(formTag, /method="post"/i);
assert.match(formTag, /action="\/api\/inquiries"/);
assert.match(html, /<fieldset[^>]*disabled/);
const assets = new Set([
  '/favicon.png',
  '/pathfinder-1448.webp',
  '/product-previews.webp',
]);
for (const match of html.matchAll(
  /(?:src|href)="([^" ]*\/_next\/static\/[^" ]+)"/g,
))
  assets.add(match[1].replaceAll('&amp;', '&'));
assert.ok(assets.size > 3, 'Compiled application assets must be referenced.');
for (const asset of assets) {
  const result = await fetch(new URL(asset, base));
  assert.equal(result.status, 200, asset);
  assert.ok((await result.arrayBuffer()).byteLength > 0, asset);
}
console.log(
  `PASS homepage, canonical metadata, form privacy, and ${assets.size} assets`,
);
const robots = await fetch(new URL('/robots.txt', base));
assert.equal(robots.status, 200);
assert.match(
  await robots.text(),
  isPublic ? /^Allow: \/$/m : /^Disallow: \/$/m,
);
for (const path of [
  '/inquiries',
  '/%69nquiries',
  '/inquiries/?_rsc=test',
  '/signin-with-chatgpt',
  '/callback',
]) {
  const result = await fetch(new URL(path, base), {
    headers: { 'oai-authenticated-user-email': 'forged@example.invalid' },
  });
  assert.equal(result.status, 403, path);
}
for (const [origin, status] of [
  [base.origin, 400],
  ['https://invalid.example', 403],
]) {
  const result = await fetch(new URL('/api/inquiries', base), {
    method: 'POST',
    headers: { origin, 'content-type': 'application/json' },
    body: '{}',
  });
  assert.equal(result.status, status);
}
const forged = await fetch(base, {
  headers: { 'x-forwarded-host': 'evil.example', 'x-forwarded-proto': 'http' },
});
assert.equal(forged.status, 200);
assert.match(
  await forged.text(),
  /rel="canonical" href="https:\/\/potomacdb.com\/?"/,
);
console.log(
  'PASS robots, private route denial, forged headers, inquiry validation, and origin protections',
);
if (isPublic) {
  const redirect = await fetch('https://www.potomacdb.com/?migration-check=1', {
    redirect: 'manual',
  });
  assert.equal(redirect.status, 308);
  assert.equal(
    redirect.headers.get('location'),
    'https://potomacdb.com/?migration-check=1',
  );
  console.log('PASS www redirects to canonical production domain');
}
if (process.argv.includes('--submit')) {
  const requestId = crypto.randomUUID();
  const body = JSON.stringify({
    requestId,
    name: 'PRODUCTION MIGRATION TEST',
    email: 'migration-qa@example.invalid',
    organization: 'TEST ONLY',
    interest: 'Lunar data briefing',
    message:
      'Deployment verification only. Remove this exact test record after verification.',
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
  console.log(`PASS save and idempotency. Test record to remove: ${requestId}`);
}
