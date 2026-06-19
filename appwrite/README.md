Appwrite local test scaffold

This folder contains a minimal docker-compose scaffold to run Appwrite locally for free testing.

Notes:
- This is a minimal example. Follow https://appwrite.io/docs/installation for complete setup and recommended resource sizes.
- To run locally: docker-compose -f appwrite/docker-compose.yml up -d
- After Appwrite is running, create a project in the Appwrite console and note PROJECT_ID and API key.

What was scaffolded:
- docker-compose.yml for appwrite + mariadb + redis
- example function scaffold at appwrite/functions/quizzes

Cloud function variables used by this repo:
- `ADMIN_EMAILS`: comma-separated list of admin e-mails for `mgenetica_admin_fn`
- preferred: configure function scopes so Appwrite injects `APPWRITE_FUNCTION_API_KEY`
- `APPWRITE_ADMIN_API_KEY`: recommended explicit admin/server key for `mgenetica_admin_fn` summary mode
- `APPWRITE_API_KEY`: accepted fallback key name in `mgenetica_admin_fn` when dedicated admin key is not set
- `APPWRITE_ADMIN_API_KEY`, `APPWRITE_API_KEY`, or scoped `APPWRITE_FUNCTION_API_KEY` is required by `mgenetica_progress_fn` because learner progress is persisted in Appwrite user prefs from the server side

GitHub Actions deploy notes:
- `.github/workflows/appwrite-deploy.yml` uses `APPWRITE_API_KEY` and `APPWRITE_PROJECT_ID` to push functions.
- Appwrite CLI 22 stores API keys under the current CLI session. Fresh CI runners have no session, so the workflow writes a minimal `~/.appwrite/prefs.json` session before `appwrite push functions` and removes it in an `if: always()` cleanup step.
- `pages-frontend.yml` accepts `APPWRITE_API_KEY`, `APPWRITE_ADMIN_API_KEY`, or `APPWRITE_FUNCTION_API_KEY` for backend audit and real-login smoke scripts.

Current live behavior:
- learner account creation/login works with Appwrite account REST calls
- learner e-mail verification is handled with Appwrite `/account/verification`; the frontend blocks courses, quizzes, progress and admin until `emailVerification` is true
- `mgenetica_auth_fn` advertises `email-verification` in auth capabilities after deployment
- learner functions execute for authenticated users
- quiz submissions now persist learner progress in Appwrite user prefs through `mgenetica_progress_fn`
- `node scripts/smoke_appwrite_runtime.mjs` passes against the deployed Appwrite project
- real-login smoke is available through `node scripts/smoke_appwrite_real_login.mjs` when an Appwrite API key is available locally or in CI
- admin summary remains unavailable until `ADMIN_EMAILS` and an admin API key are configured in the live function environment

Next steps (manual):
1. Start Appwrite with docker compose.
2. Open Appwrite console (http://localhost) and create a project and an API key.
3. Create a database collection for quizzes or deploy the Function below.
4. Configure frontend to use endpoint and project ID in `frontend/src/lib/appwrite.js` or frontend environment variables.
5. Configure Auth e-mail delivery/provider and allow verification callback URLs such as `https://www.mgenetica.com/#verify-email` and local dev equivalents.
6. Deploy functions with `.github/workflows/appwrite-deploy.yml` and verify with `node scripts/smoke_appwrite_runtime.mjs`.
