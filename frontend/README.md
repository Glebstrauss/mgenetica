Front-end learner app (separate from public Quarto site)

Quick start:
1. cd frontend
2. npm ci
3. npm run dev

This Vite+React surface is learner/app scope only.

- Public site stays on GitHub Pages through Quarto.
- This app should deploy separately to Vercel.
- Appwrite remains backend of record for auth, functions and learner flows.

Production requirements:
- GitHub secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
- Appwrite web platform must include deployed app origin
- Frontend env must expose Appwrite endpoint/project and function IDs when canonical defaults are not used
