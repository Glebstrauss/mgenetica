const dotenv = require('dotenv');
dotenv.config();

function requiredEnv(name) {
  const value = process.env[name];
  if (!value || !String(value).trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function splitCsv(value) {
  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function loadConfig() {
  const jwtSecret = requiredEnv('JWT_SECRET');
  if (jwtSecret.length < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters.');
  }

  return {
    port: Number(process.env.PORT || 4000),
    jwtSecret,
    jwtIssuer: process.env.JWT_ISSUER || 'mgenetica-backend',
    jwtAudience: process.env.JWT_AUDIENCE || 'mgenetica-learners',
    pgConnection: process.env.DATABASE_URL || requiredEnv('PG_CONNECTION_STRING'),
    allowedOrigins: splitCsv(process.env.ALLOWED_ORIGINS)
  };
}

module.exports = {
  loadConfig
};
