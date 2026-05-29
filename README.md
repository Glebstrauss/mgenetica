# MGenetica

MGenetica is the current React learner and service site for animal breeding education, consulting and institutional training.

## Current Site

- `frontend/`: Vite + React public app, served at `https://mgenetica.github.io/mgenetica/`.
- `appwrite/`: Appwrite functions and config for auth, course catalog, quizzes, progress and admin checks.
- `backend/`: optional Node API scaffold kept separate from the published GitHub Pages app.
- `supabase/`: legacy function scaffold kept for reference until Appwrite fully replaces it.

The active site surface is `frontend/`. Root-level generated static pages and the old editorial pipeline were removed from this branch.

## Live Routes

- `/mgenetica/` -> React app home
- `#/consultoria` -> consulting services
- `#/treinamentos` -> institutional training
- `#/auth` -> sign in
- `#/catalog` -> course catalog
- `#/account` -> learner profile
- `#/course/module-01` through `#/course/module-21` -> course pages
- `#/quiz/module-01` through `#/quiz/module-21` -> module quizzes

Compatibility redirects in `frontend/public/` keep older static URLs pointing into the React app.

## Development

```bash
cd frontend
npm ci
npm run dev
```

## Validation

```bash
cd frontend
npm test
npm run build
```

Backend/Appwrite files are JavaScript function payloads. Validate touched Node files with `node --check` when changing function code.

## Deploy

GitHub Pages deploys from `frontend/dist` through `.github/workflows/pages-frontend.yml`.

The workflow sets the public base path to `/mgenetica/` and injects the Appwrite endpoint, project ID and function IDs. Do not publish from repository root.

## Agent Scope

- Treat `frontend/` as source of truth for public site UX.
- Keep Appwrite function changes separate from visual/content work unless the feature needs backend behavior.
- Run frontend tests and build before commit.
- Do not commit, push, open PRs or merge into `main` unless explicitly requested.
