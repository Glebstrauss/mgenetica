const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const { port, jwtSecret, pgConnection } = require('./config');

const pool = new Pool({ connectionString: pgConnection });
const app = express();
app.use(bodyParser.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Simple auth endpoints (register/login)
app.post('/auth/register', async (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, name, role, created_at) VALUES ($1,$2,$3,$4, now()) RETURNING id, email, name, role',
      [email, hashed, name || null, 'learner']
    );
    const user = result.rows[0];
    const token = jwt.sign({ sub: user.id, role: user.role }, jwtSecret, { expiresIn: '7d' });
    res.json({ user, token });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'email already exists' });
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  }
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try {
    const result = await pool.query('SELECT id, email, password_hash, name, role FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'invalid_credentials' });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'invalid_credentials' });
    const token = jwt.sign({ sub: user.id, role: user.role }, jwtSecret, { expiresIn: '7d' });
    delete user.password_hash;
    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  }
});

app.listen(port, () => console.log(`mgenetica-backend listening on ${port}`));
