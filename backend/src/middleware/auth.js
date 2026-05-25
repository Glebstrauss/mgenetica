const jwt = require('jsonwebtoken');
const { loadConfig } = require('../config');

function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return res.status(401).json({ error: 'access_token_required' });

  try {
    const config = loadConfig();
    const payload = jwt.verify(token, config.jwtSecret, {
      issuer: config.jwtIssuer,
      audience: config.jwtAudience
    });
    req.user = payload.sub;
    req.role = payload.role || 'learner';
    return next();
  } catch (_) {
    return res.status(401).json({ error: 'invalid_access_token' });
  }
}

module.exports = auth;
