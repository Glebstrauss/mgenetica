# MGenética Backend (Phase 1)

This directory contains a minimal Node/Express API skeleton for Phase 1 (infrastructure + auth).

Quick start (local):

1. Copy example env: cp .env.example .env
2. Install deps: npm ci
3. Initialize DB: psql $PG_CONNECTION_STRING -f sql/schema.sql
4. Start: npm run dev

Docker:
  docker build -t mgenetica-backend:latest .
  docker run -p 4000:4000 --env-file .env mgenetica-backend:latest

CI:
See .github/workflows/backend-ci.yml

Note: Keep this backend isolated from the Quarto site; it's scaffolded as a starting point for Phase 1 work.
