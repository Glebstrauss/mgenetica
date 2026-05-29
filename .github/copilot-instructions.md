# Copilot Instructions for MGenetica

## Scope

This repository publishes the current MGenetica React site from `frontend/`.

- Use `frontend/` for public UX, service pages, catalog, auth screens and course pages.
- Use `appwrite/` only for function/runtime behavior.
- Keep `backend/` isolated unless the task is explicitly about that API scaffold.

## Commands

Run frontend checks from `frontend/`.

| Task | Command |
|---|---|
| Confirm Node runtime | `node -v` |
| Install dependencies | `npm ci` |
| Local dev server | `npm run dev` |
| Unit tests | `npm test` |
| Production build | `npm run build` |

Check touched Appwrite JavaScript with `node --check path/to/file.js`.

## Architecture

- `frontend/src/App.jsx` owns route composition and screen rendering.
- `frontend/src/lib/access.mjs` maps hash routes and compatibility redirects.
- `frontend/src/data/course-curriculum.generated.json` feeds local course fallback content.
- `appwrite/functions/courses/course-curriculum.generated.json` feeds backend course detail.
- `appwrite/functions/quizzes/quiz-bank.generated.json` feeds backend quiz delivery.
- `.github/workflows/pages-frontend.yml` deploys `frontend/dist` to GitHub Pages.

## Route Contract

- `#/consultoria`
- `#/treinamentos`
- `#/auth`
- `#/catalog`
- `#/account`
- `#/course/module-01` through `#/course/module-21`
- `#/quiz/module-01` through `#/quiz/module-21`

Static files in `frontend/public/` may redirect older URLs into these routes.

## Rules

- Do not publish from repository root.
- Do not add another site generator.
- Do not change Appwrite function IDs without updating workflow env and frontend config together.
- Do not commit, push, PR or merge unless explicitly requested.
