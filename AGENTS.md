# AGENTS.md

## Project Fronts

- Live public site: `frontend/` Vite + React app.
- Backend services: `appwrite/` functions and deployment config.
- Optional API scaffold: `backend/`.

Work in the front that matches the request. Do not mix public UX, Appwrite runtime and backend scaffold changes without a concrete reason.

## Site Working Mode

- Diagnose before editing.
- Start from latest `origin/main`.
- Use a branch, never edit/publish `main` directly.
- Treat `frontend/` as the source of truth for visitor UX, consulting, training and learner routes.
- Keep public service pages clear, scientific, premium and decision-oriented.
- Prefer small route/data/style changes over broad rewrites.
- Run available tests and build before commit.

## Validation

```bash
cd frontend
node -v
npm test
npm run build
```

For Appwrite function code, also run `node --check` on touched `.js` files.

## Publication Guardrail

Do not commit, push, open PRs, deploy or merge into `main` unless the user explicitly asks.
