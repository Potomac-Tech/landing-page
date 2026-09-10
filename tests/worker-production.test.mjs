import assert from 'node:assert/strict';
import test from 'node:test';
import { productionRedirect, productionRequest, productionResponse } from '../lib/worker-production.ts';

test('production canonical redirects cannot be redirected to a path-supplied host', () => {
  const result = productionRedirect(new Request('https://www.potomacdb.com//evil.example/path?q=1'));
  assert.equal(result.status, 308);
  assert.equal(result.headers.get('location'), 'https://potomacdb.com//evil.example/path?q=1');
  assert.equal(productionRedirect(new Request('https://unknown.example/')).status, 421);
  assert.equal(productionRedirect(new Request('https://potomacdb.com/')), undefined);
});

test('production requests remove forged identity and forwarding but preserve POST bodies', async () => {
  const clean = productionRequest(new Request('https://potomacdb.com/api/inquiries', {
    method: 'POST', body: '{"test":true}',
    headers: {
      'oai-authenticated-user-email': 'forged@example.invalid',
      'x-forwarded-host': 'evil.example', 'x-forwarded-proto': 'http',
      forwarded: 'host=evil.example', host: 'evil.example',
      origin: 'https://potomacdb.com', 'cf-connecting-ip': '192.0.2.1',
    },
  }));
  for (const name of ['oai-authenticated-user-email', 'x-forwarded-host', 'x-forwarded-proto', 'forwarded']) {
    assert.equal(clean.headers.get(name), null);
  }
  assert.equal(clean.headers.get('host'), 'potomacdb.com');
  assert.equal(clean.headers.get('origin'), 'https://potomacdb.com');
  assert.equal(clean.headers.get('cf-connecting-ip'), '192.0.2.1');
  assert.equal(await clean.text(), '{"test":true}');
});

test('only successful public production pages are indexable; security and Vary survive', () => {
  for (const [url, status, noindex] of [
    ['https://potomacdb.com/', 200, false],
    ['https://potomacdb.com/api/inquiries', 201, true],
    ['https://potomacdb.com/missing', 404, true],
    ['https://potomac-landing-production.jake-249.workers.dev/', 200, true],
  ]) {
    const result = productionResponse(new Response('ok', { status, headers: { Vary: 'RSC' } }), new Request(url));
    assert.equal(result.status, status);
    assert.equal(result.headers.get('Vary'), 'RSC');
    assert.equal(result.headers.get('Cache-Control'), 'no-store');
    assert.equal(result.headers.get('X-Content-Type-Options'), 'nosniff');
    assert.equal(result.headers.has('X-Robots-Tag'), noindex);
  }
});
