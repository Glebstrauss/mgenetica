Appwrite local test scaffold

This folder contains a minimal docker-compose scaffold to run Appwrite locally for free testing.

Notes:
- This is a minimal example. Follow https://appwrite.io/docs/installation for complete setup and recommended resource sizes.
- To run locally: docker-compose -f appwrite/docker-compose.yml up -d
- After Appwrite is running, create a project in the Appwrite console and note PROJECT_ID and API key.

What was scaffolded:
- docker-compose.yml for appwrite + mariadb + redis
- example function scaffold at appwrite/functions/quizzes

Next steps (manual):
1. Start Appwrite with docker compose.
2. Open Appwrite console (http://localhost) and create a project and an API key.
3. Create a database collection for quizzes or deploy the Function below.
4. Configure frontend to use endpoint and project ID in frontend/src/appwriteClient.js
