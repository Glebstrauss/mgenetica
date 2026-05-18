-- Basic schema for Phase 1
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'learner',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
