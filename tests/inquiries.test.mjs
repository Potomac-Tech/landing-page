import test from 'node:test';
import assert from 'node:assert/strict';
import { validateInquiry, isInboxOwner } from '../lib/inquiries.ts';

const valid = () => ({
  requestId: crypto.randomUUID(),
  name: 'Test Operator',
  email: 'operator+test@example.com',
  organization: '',
  interest: 'Briefing',
  message: 'A site-selection question.',
  website: '',
});

await test('accepts a complete inquiry and trims text', () => {
  const value = validateInquiry({ ...valid(), name: ' Test Operator ' });
  assert.equal(value.name, 'Test Operator');
});
await test('rejects missing, malformed, and oversized values', () => {
  for (const value of [
    null,
    [],
    {},
    { ...valid(), email: 'person@example.com?bcc=attacker%40evil.com' },
    { ...valid(), message: 'a'.repeat(2001) },
    { ...valid(), name: '\0Name' },
    { ...valid(), requestId: '../id' },
    { ...valid(), name: ' ' },
  ])
    assert.equal(validateInquiry(value), null);
});
await test('only the configured owner can read inquiries', () => {
  assert.equal(isInboxOwner('OWNER@example.com', 'owner@example.com'), true);
  for (const [viewer, owner] of [
    [null, 'owner@example.com'],
    ['owner@example.com', undefined],
    ['intruder@example.com', 'owner@example.com'],
    ['', ''],
  ])
    assert.equal(isInboxOwner(viewer, owner), false);
});
