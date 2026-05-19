Deployment recommendation: Vercel (frontend) + Appwrite (auth + functions)

Rationale:
- Fast MVP: Vercel auto-deploys Vite apps from GitHub and provides global CDN.
- Appwrite already exists in this repo and is compatible with browser React + Node runtime functions.
- This keeps Quarto public site on GitHub Pages and learner app on Vercel/Appwrite.

High-level steps:
1. Create Vercel project for frontend (connect GitHub repo). Set VERCEL_PROJECT_ID and VERCEL_ORG_ID in GH secrets and VERCEL_TOKEN.
2. Set APPWRITE_API_KEY and APPWRITE_PROJECT_ID for Appwrite function deploy workflow.
3. Add deployed Vercel origin to Appwrite Web Platforms so account sessions and function calls work in browser.
4. Confirm frontend env values for endpoint, project id and function IDs.
5. Deploy Appwrite functions and verify login -> listCourses -> submitQuiz flow.

CI templates in .github/workflows deploy frontend to Vercel and Appwrite functions to cloud after secrets are present. Do not commit secrets. See workflows for exact variable names.

If approved, next actions to implement automatically:
- Add real Vercel secrets and verify prod deploy no longer skips.
- Register final Vercel production URL in Appwrite platform settings.
- Provide browser-level smoke test after deploy.

If a different static host is preferred later, documentation can be adapted without changing Appwrite runtime choice.
