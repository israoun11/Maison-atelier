const { test } = require('node:test');
const assert = require('node:assert/strict');
const s = require('../src/validators/schemas');

test('contact schema accepts valid input and rejects bad input', () => {
  const ok = { name: 'Jane Doe', email: 'jane@example.com', subject: 'Hello', message: 'A message long enough.' };
  assert.equal(s.contactSchema.safeParse(ok).success, true);
  assert.equal(s.contactSchema.safeParse({ ...ok, email: 'nope' }).success, false);
  assert.equal(s.contactSchema.safeParse({ ...ok, message: 'short' }).success, false);
});

test('project schema applies defaults; update schema is partial', () => {
  const p = s.projectSchema.parse({
    title: 'Test',
    category: 'Residential',
    location: 'Paris',
    description: 'A sufficiently long description.',
    coverImage: 'https://example.com/a.jpg',
  });
  assert.equal(p.featured, false);
  assert.deepEqual(p.gallery, []);
  assert.equal(s.projectUpdateSchema.safeParse({ featured: true }).success, true);
  assert.equal(s.projectUpdateSchema.safeParse({ coverImage: 'not a url' }).success, false);
});

test('status schema only allows known statuses', () => {
  assert.equal(s.statusSchema.safeParse({ status: 'read' }).success, true);
  assert.equal(s.statusSchema.safeParse({ status: 'deleted' }).success, false);
});
