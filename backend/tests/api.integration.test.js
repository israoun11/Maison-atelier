// Integration tests. They need a THROWAWAY MongoDB database:
//   MONGODB_URI_TEST=mongodb://127.0.0.1:27017/atelier-maison-test npm test
// Without MONGODB_URI_TEST these tests are skipped. Only records created by the tests are removed.
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-test-secret-1234';

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI_TEST;
const skip = uri ? false : 'MONGODB_URI_TEST not set';

let server;
let base;
let Admin;
const creds = { email: 'test-admin@atelier.test', password: 'Sup3r-secret-pass' };

async function api(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(`${base}/api/v1${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, json };
}

before(async () => {
  if (skip) return;
  await mongoose.connect(uri);
  Admin = require('../src/models/Admin');
  await Admin.deleteMany({ email: creds.email });
  await Admin.create({ name: 'Test Admin', email: creds.email, password: creds.password });
  const app = require('../src/app');
  server = app.listen(0);
  base = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (skip) return;
  await Admin.deleteMany({ email: creds.email });
  server.close();
  await mongoose.disconnect();
});

test('auth, authorization and CRUD', { skip }, async (t) => {
  let token;
  let projectId;
  let serviceId;
  let messageId;

  await t.test('rejects bad login, accepts good login', async () => {
    assert.equal((await api('/auth/login', { method: 'POST', body: { email: creds.email, password: 'wrong' } })).status, 401);
    const ok = await api('/auth/login', { method: 'POST', body: creds });
    assert.equal(ok.status, 200);
    token = ok.json.token;
    assert.ok(token);
  });

  await t.test('protected routes require a token', async () => {
    assert.equal((await api('/projects', { method: 'POST', body: {} })).status, 401);
    assert.equal((await api('/contact')).status, 401);
    assert.equal((await api('/admin/stats')).status, 401);
    assert.equal((await api('/admin/stats', { token })).status, 200);
  });

  await t.test('project CRUD + slug lookup', async () => {
    const body = {
      title: 'Integration Test Project',
      category: 'Residential',
      location: 'Testville',
      description: 'A project created by the integration tests.',
      coverImage: 'https://example.com/cover.jpg',
    };
    assert.equal((await api('/projects', { method: 'POST', body: { title: 'x' }, token })).status, 400);
    const created = await api('/projects', { method: 'POST', body, token });
    assert.equal(created.status, 201);
    projectId = created.json.data._id;
    assert.equal(created.json.data.slug, 'integration-test-project');
    assert.equal((await api(`/projects/${projectId}`)).status, 200);
    assert.equal((await api('/projects/slug/integration-test-project')).status, 200);
    const upd = await api(`/projects/${projectId}`, { method: 'PUT', body: { featured: true }, token });
    assert.equal(upd.json.data.featured, true);
    assert.equal((await api('/projects?featured=true')).status, 200);
    assert.equal((await api(`/projects/${projectId}`, { method: 'DELETE', token })).status, 200);
    assert.equal((await api(`/projects/${projectId}`)).status, 404);
  });

  await t.test('service CRUD', async () => {
    const created = await api('/services', {
      method: 'POST',
      token,
      body: { title: 'Integration Test Service', description: 'Created by the tests.', image: 'https://example.com/s.jpg' },
    });
    assert.equal(created.status, 201);
    serviceId = created.json.data._id;
    assert.equal((await api(`/services/${serviceId}`, { method: 'PUT', token, body: { description: 'Updated by the tests.' } })).status, 200);
    assert.equal((await api(`/services/${serviceId}`, { method: 'DELETE', token })).status, 200);
  });

  await t.test('contact form is public; management is protected', async () => {
    assert.equal((await api('/contact', { method: 'POST', body: { name: 'A' } })).status, 400);
    const sent = await api('/contact', {
      method: 'POST',
      body: { name: 'Test Person', email: 'person@example.com', subject: 'Integration test', message: 'Hello from the integration tests.' },
    });
    assert.equal(sent.status, 201);
    const list = await api('/contact?status=new', { token });
    const msg = list.json.data.find((m) => m.subject === 'Integration test');
    assert.ok(msg);
    messageId = msg._id;
    assert.equal((await api(`/contact/${messageId}/status`, { method: 'PATCH', token, body: { status: 'read' } })).json.data.status, 'read');
    assert.equal((await api(`/contact/${messageId}/status`, { method: 'PATCH', token, body: { status: 'bogus' } })).status, 400);
    assert.equal((await api(`/contact/${messageId}`, { method: 'DELETE', token })).status, 200);
  });
});
