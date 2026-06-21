const assert = require('node:assert/strict');
const test = require('node:test');
const { validateLoginInput, validateRegisterInput } = require('../src/validators');
const { createAuthLimiter } = require('../src/index');
const { scoreProgress } = require('../src/routes/progress');

test('register validation normalizes email and enforces password length', () => {
  const bad = validateRegisterInput({ email: 'USER@example.com', password: 'short' });
  assert.equal(bad.ok, false);

  const good = validateRegisterInput({
    email: 'USER@example.com',
    password: 'long-enough-password',
    name: 'Learner'
  });
  assert.equal(good.ok, true);
  assert.equal(good.value.email, 'user@example.com');
});

test('login validation rejects malformed credentials', () => {
  assert.equal(validateLoginInput({ email: 'bad', password: 'x' }).ok, false);
  assert.equal(validateLoginInput({ email: 'user@example.com', password: 'x' }).ok, true);
});

test('auth limiter returns 429 after configured threshold', () => {
  const limiter = createAuthLimiter({ windowMs: 1000, max: 1 });
  const req = { ip: '127.0.0.1', socket: {} };
  const res = {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; return this; }
  };
  let nextCalls = 0;
  limiter(req, res, () => { nextCalls += 1; });
  limiter(req, res, () => { nextCalls += 1; });
  assert.equal(nextCalls, 1);
  assert.equal(res.statusCode, 429);
  assert.deepEqual(res.body, { error: 'rate_limit_exceeded' });
});

test('legacy progress scoring ignores client-authored percent', () => {
  const forged = scoreProgress('module-01', undefined);
  assert.equal(forged.ok, false);
  assert.equal(forged.error, 'answers_required');

  const scored = scoreProgress('1', [0, 0, 0, 0, 0]);
  assert.equal(scored.ok, true);
  assert.equal(scored.courseId, 'module-01');
  assert.equal(scored.total, 5);
  assert.equal(scored.percent, 100);
});
