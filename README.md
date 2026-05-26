# MGenética

MGenética has two separate fronts in this repository:

- **Public site source:** editorial and institutional content in Quarto, kept for manual review/publication.
- **Learner app:** authenticated learning experience in `frontend/`, built with Vite + React + Appwrite and currently served at the GitHub Pages live root.

Do not mix these fronts. The public site must not become an admin/app surface. Today `https://mgenetica.github.io/mgenetica/` serves the React learner app, while the Quarto source remains the editorial source of record.

## Course Structure

The course hierarchy is:

```text
Course -> Theme/Main Module -> Study Block -> Study Block Items
```

MGenética currently uses:

- 1 course: MGenética
- 5 major themes/main modules
- 21 study blocks (`M1` through `M21`)
- 5 standard items in each study block:
  - Reading
  - Concept
  - Exercise
  - R Lab
  - Quiz

The `M1` through `M21` identifiers are study blocks, not the five major themes.

## Live Route Contract

The learner app owns the live root:

- `/mgenetica/` -> React learner app
- `#/auth` -> Sign in
- `#/catalog` -> Courses
- `#/account` -> Profile
- `#/course/module-01` through `#/course/module-21` -> Course page
- `#/quiz/module-01` through `#/quiz/module-21` -> Quiz

Legacy Quarto URLs are kept as compatibility entry points:

- `/mgenetica/plataforma.html` -> `#/auth`
- `/mgenetica/modules/` -> `#/catalog`
- `/mgenetica/en/modules/` -> `#/catalog`
- `/mgenetica/es/modules/` -> `#/catalog`
- `/mgenetica/modules/moduloNN-*.html` -> `#/course/module-NN`

Courses are free after sign in/login.

## Stack

- **Public site source:** Quarto + R + SCSS + static JavaScript
- **Live app/runtime:** Vite + React + Appwrite + GitHub Pages
- **Validation:** R scripts, Node syntax checks, frontend tests, Vite build

The Quarto site at the repository root has no primary Node toolchain beyond checks and CI support. The learner app has its own `frontend/package.json`.

## Prerequisites

- [Quarto](https://quarto.org/) for local public-site preview/render.
- [R](https://www.r-project.org/) for public-site validation scripts.
- Node.js for the learner app.

Local machines may not have `quarto` on `PATH`. The GitHub Pages workflows install Quarto when rendering the editorial site.

## Install Dependencies

Restore R dependencies:

```bash
Rscript -e 'renv::restore()'
```

Install learner-app dependencies:

```bash
cd frontend
npm ci
```

## Run Locally

Preview the public Quarto source:

```bash
quarto preview
```

Run the learner app:

```bash
cd frontend
npm run dev
```

## Build

Render the public Quarto source:

```bash
quarto render
```

Build the learner app:

```bash
cd frontend
npm run build
```

The Quarto output is generated under `docs/` for review/editorial workflows. The current GitHub Pages live root is occupied by the packaged learner app.

## Validation

Frontend:

```bash
cd frontend
npm test
npm run build
```

Public-site checks:

```bash
Rscript --vanilla scripts/validate_site_manifest.R
SKIP_QUARTO_RENDER=1 Rscript --vanilla scripts/prepublish_site_check.R
git diff --check
```

Full public-site publication check:

```bash
Rscript --vanilla scripts/prepublish_site_check.R
```

## Main Structure

```text
mgenetica/
├── _quarto.yml                  # Quarto public-site configuration
├── index.qmd                    # Public homepage source
├── plataforma.qmd               # Public handoff/source page
├── modules/                     # Quarto source for 21 study-block pages
├── semanas/                     # Public study route source
├── assets/                      # Public-site JavaScript and HTML includes
├── styles/                      # Public-site SCSS and dark mode
├── data/                        # Public-site manifest and simulated data
├── docs/                        # Quarto render output for editorial review
├── frontend/                    # React learner app + Appwrite integration
└── .github/workflows/           # Pages, Quarto manual, Vercel and Appwrite workflows
```

## Operational State

- The live URL `https://mgenetica.github.io/mgenetica/` serves the React learner app.
- The Quarto content remains available as editorial source and manual review output.
- Appwrite is the production backend for auth, course data, quiz submission and progress.
- The admin panel requires `ADMIN_EMAILS` and `APPWRITE_ADMIN_API_KEY` on `mgenetica_admin_fn`; `APPWRITE_API_KEY` is accepted as fallback.

## Agent Scope

- Work on the correct front: public site or learner app.
- Do not treat Quarto publication and learner-app publication as the same artifact.
- Before publishing site changes, run `Rscript --vanilla scripts/prepublish_site_check.R`.
- Preserve existing local changes; do not revert files without an explicit request.
