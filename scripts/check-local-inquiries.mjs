import assert from 'node:assert/strict';

const origin = 'http://localhost:3000';
const values = () => ({
  requestId: crypto.randomUUID(),
  name: 'LOCAL QA TEST',
  email: 'potomac-qa@example.invalid',
  organization: 'Local test only',
  interest: 'QA',
  message: 'Local integration test; not a real inquiry.',
  website: '',
});
const post = (body, requestOrigin = origin) =>
  fetch(`${origin}/api/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: requestOrigin },
    body: JSON.stringify(body),
  });

assert.equal((await fetch(origin)).status, 200);
assert.equal((await post(values(), 'https://untrusted.example')).status, 403);
assert.equal((await post({ ...values(), email: 'invalid' })).status, 400);
assert.equal((await post({ ...values(), website: 'bot.example' })).status, 400);
assert.equal(
  (await post({ ...values(), message: 'a'.repeat(13000) })).status,
  413,
);
const first = values();
const saved = await post(first);
assert.equal(saved.status, 201, await saved.clone().text());
assert.equal((await saved.json()).reference, first.requestId);
assert.equal((await post(first)).status, 200);
const simultaneous = values();
const duplicates = await Promise.all([post(simultaneous), post(simultaneous)]);
assert.ok(duplicates.every((response) => [200, 201].includes(response.status)));
for (let count = 0; count < 3; count++)
  assert.equal((await post(values())).status, 201);
assert.equal((await post(values())).status, 429);
assert.equal((await post(first)).status, 200);
assert.equal((await fetch(`${origin}/api/inquiries`)).status, 405);
const anonymous = await fetch(`${origin}/inquiries`);
assert.ok(
  !(await anonymous.text()).includes('LOCAL QA TEST'),
  'Anonymous readers must not see inquiries',
);
const forged = await fetch(`${origin}/inquiries`, {
  headers: { 'oai-authenticated-user-email': 'seedy@sites.test' },
});
assert.ok(
  !(await forged.text()).includes('LOCAL QA TEST'),
  'Forged identity headers must not expose inquiries',
);
const signIn = await fetch(
  `${origin}/signin-with-chatgpt?return_to=%2Finquiries`,
  { redirect: 'manual' },
);
assert.equal(signIn.status, 302);
const localCookie = signIn.headers.get('set-cookie').split(';')[0];
const inbox = await fetch(`${origin}/inquiries`, {
  headers: { cookie: localCookie },
});
assert.equal(inbox.status, 200);
assert.ok(
  (await inbox.text()).includes('LOCAL QA TEST'),
  'Local owner should see saved inquiry',
);
console.log(
  'Local checks passed: render, validation, origin, honeypot, size, save, retry, concurrency, rate limit, method restriction, owner read-back.',
);
