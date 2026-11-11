const { test } = require('node:test');
const assert = require('node:assert/strict');
const slugify = require('../src/utils/slugify');

test('slugify handles accents, spaces and symbols', () => {
  assert.equal(slugify('Appartement Lumière'), 'appartement-lumiere');
  assert.equal(slugify('  Maison & Ardoise!! '), 'maison-ardoise');
  assert.equal(slugify(''), '');
});
