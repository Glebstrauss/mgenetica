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

Current live behavior:
- learner account creation/login works with Appwrite account REST calls
- learner functions execute for authenticated users
- quiz submissions now persist learner progress in Appwrite user prefs through `mgenetica_progress_fn`
- admin summary remains unavailable until `ADMIN_EMAILS` and an admin API key are configured in the live function environment

Next steps (manual):
1. Start Appwrite with docker compose.
2. Open Appwrite console (http://localhost) and create a project and an API key.
3. Create a database collection for quizzes or deploy the Function below.
4. Configure frontend to use endpoint and project ID in frontend/src/appwriteClient.js
