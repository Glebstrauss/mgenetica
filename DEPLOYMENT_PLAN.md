Deployment recommendation: Vercel (frontend) + Supabase (DB + Auth + Edge functions)

Rationale:
- Fast MVP: Vercel auto-deploys Vite apps from GitHub and provides global CDN.
- Supabase gives Postgres, Auth (email + OAuth), storage, and serverless Edge Functions for light backend — minimal infra and fastest time-to-market.
- This keeps the Quarto site on GitHub Pages and the interactive app on Vercel/Supabase.

High-level steps:
1. Create Vercel project for frontend (connect GitHub repo). Set VERCEL_PROJECT_ID and VERCEL_ORG_ID in GH secrets and VERCEL_TOKEN.
2. Create Supabase project. Note SUPABASE_URL, SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY; add to GH secrets.
3. Migrate DB: use backend/sql/schema.sql and backend/sql/seed.sql with psql or supabase migrations.
4. Configure frontend to use SUPABASE_URL for auth and API proxy (or configure Vercel rewrites to proxy /api to Supabase functions).
5. Optional: keep Node backend in a Render service or convert endpoints into Supabase Edge Functions.

CI templates added to .github/workflows/*.yml deploy the frontend to Vercel and provide a scaffold for Supabase deploys (secrets required). Do not commit secrets. See the workflows for exact variable names.

If approved, next actions to implement automatically:
- Add Vercel Action workflow (push on main) and test deploy.
- Add Supabase migration workflow and a small script to convert backend routes to Edge Functions.
- Provide GH Actions to run integration smoke tests after deploy.

If a different provider preferred (Render, Fly, Cloud Run), documentation can be adapted.
