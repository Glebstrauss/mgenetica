const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function validateRegisterInput(body = {}) {
  const email = normalizeEmail(body.email);
  const password = String(body.password || '');
  const name = typeof body.name === 'string' ? body.name.trim() : null;

  if (!EMAIL_RE.test(email)) return { ok: false, error: 'valid email required' };
  if (password.length < 12) return { ok: false, error: 'password must be at least 12 characters' };
  if (name && name.length > 120) return { ok: false, error: 'name too long' };
  return { ok: true, value: { email, password, name: name || null } };
}

function validateLoginInput(body = {}) {
  const email = normalizeEmail(body.email);
  const password = String(body.password || '');
  if (!EMAIL_RE.test(email) || !password) return { ok: false, error: 'invalid credentials' };
  return { ok: true, value: { email, password } };
}

module.exports = {
  validateLoginInput,
  validateRegisterInput
};
