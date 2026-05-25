const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const { loadConfig } = require('./config');
const { validateLoginInput, validateRegisterInput } = require('./validators');
const auth = require('./middleware/auth');
const courses = require('./routes/courses');
const quizzes = require('./routes/quizzes');
const progress = require('./routes/progress');

function applySecurityHeaders(_req, res, next) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
}

function createAuthLimiter({ windowMs = 15 * 60 * 1000, max = 10 } = {}) {
  const buckets = new Map();
  return function authLimiter(req, res, next) {
    const key = req.ip || req.socket?.remoteAddress || 'unknown';
    const now = Date.now();
    const bucket = buckets.get(key) || { resetAt: now + windowMs, count: 0 };
    if (bucket.resetAt <= now) {
      bucket.resetAt = now + windowMs;
      bucket.count = 0;
    }
    bucket.count += 1;
    buckets.set(key, bucket);
    res.setHeader('X-RateLimit-Limit', String(max));
    res.setHeader('X-RateLimit-Remaining', String(Math.max(0, max - bucket.count)));
    if (bucket.count > max) return res.status(429).json({ error: 'rate_limit_exceeded' });
    return next();
  };
}

function applyCors(allowedOrigins) {
  return function cors(req, res, next) {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    }
    if (req.method === 'OPTIONS') return res.status(204).end();
    return next();
  };
}

function signUserToken(user, config) {
  return jwt.sign(
    { sub: String(user.id), role: user.role },
    config.jwtSecret,
    {
      expiresIn: '1h',
      issuer: config.jwtIssuer,
      audience: config.jwtAudience
    }
  );
}

function createApp({ pool, config = loadConfig() } = {}) {
  const db = pool || new Pool({ connectionString: config.pgConnection });
  const app = express();
  const authLimiter = createAuthLimiter();

  app.use(applySecurityHeaders);
  app.use(applyCors(config.allowedOrigins));
  app.use(bodyParser.json({ limit: '64kb' }));

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));

  app.post('/auth/register', authLimiter, async (req, res) => {
    const input = validateRegisterInput(req.body || {});
    if (!input.ok) return res.status(400).json({ error: input.error });
    try {
      const hashed = await bcrypt.hash(input.value.password, 12);
      const result = await db.query(
        'INSERT INTO users (email, password_hash, name, role, created_at) VALUES ($1,$2,$3,$4, now()) RETURNING id, email, name, role',
        [input.value.email, hashed, input.value.name, 'learner']
      );
      const user = result.rows[0];
      const token = signUserToken(user, config);
      return res.status(201).json({ user, token, expiresIn: 3600 });
    } catch (err) {
      if (err.code === '23505') return res.status(409).json({ error: 'email already exists' });
      return res.status(500).json({ error: 'internal_error' });
    }
  });

  app.post('/auth/login', authLimiter, async (req, res) => {
    const input = validateLoginInput(req.body || {});
    if (!input.ok) return res.status(401).json({ error: 'invalid_credentials' });
    try {
      const result = await db.query('SELECT id, email, password_hash, name, role FROM users WHERE email = $1', [input.value.email]);
      const user = result.rows[0];
      if (!user) return res.status(401).json({ error: 'invalid_credentials' });
      const ok = await bcrypt.compare(input.value.password, user.password_hash);
      if (!ok) return res.status(401).json({ error: 'invalid_credentials' });
      const token = signUserToken(user, config);
      delete user.password_hash;
      return res.json({ user, token, expiresIn: 3600 });
    } catch (_) {
      return res.status(500).json({ error: 'internal_error' });
    }
  });

  app.use('/courses', auth, courses);
  app.use('/quizzes', auth, quizzes);
  app.use('/progress', auth, progress);

  app.get('/me', auth, async (req, res) => {
    try {
      const result = await db.query('SELECT id, email, name, role FROM users WHERE id = $1', [req.user]);
      return res.json({ user: result.rows[0] || null });
    } catch (_) {
      return res.status(500).json({ error: 'internal_error' });
    }
  });

  return app;
}

if (require.main === module) {
  const config = loadConfig();
  const app = createApp({ config });
  app.listen(config.port, () => {
    process.stdout.write(`mgenetica-backend listening on ${config.port}\n`);
  });
}

module.exports = {
  applyCors,
  applySecurityHeaders,
  createApp,
  createAuthLimiter,
  signUserToken
};
