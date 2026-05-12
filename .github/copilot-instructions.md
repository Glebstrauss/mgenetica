# Copilot Instructions for MGenética

## Scope boundaries (critical)

- This repository is for the **public site** (Quarto + static assets). Keep changes in the site layer.
- Do **not** introduce or modify internal app/panel behavior unless explicitly requested.
- Preserve the public editorial tone: scientific, clear, premium, content-first.

## Build, validation, and checks

Run from repository root.

| Task | Command |
|---|---|
| Restore R dependencies | `Rscript -e 'renv::restore()'` |
| Local preview | `quarto preview` |
| Full site render | `quarto render` |
| Full prepublish validation (main gate) | `Rscript scripts/prepublish_site_check.R` |
| Manifest and structure validation | `Rscript scripts/validate_site_manifest.R` |
| Execute all module data scripts | `Rscript scripts/run_all_modules.R` |
| Deployed-site validation | `Rscript scripts/validate_deployed_site.R` |
| JS syntax check (all key files) | `node --check assets/js/progress.js && node --check assets/js/darkmode.js && node --check assets/js/interactives.js && node --check assets/js/quiz.js && node --check assets/js/teacher-mode.js` |

### Single-target checks

- Single module script: `Rscript scripts/modulo01.R` (swap for `modulo02.R` … `modulo12.R`).
- Single JS file syntax: `node --check assets/js/quiz.js`.
- Single validator: `Rscript scripts/validate_site_manifest.R`.

## High-level architecture

### 1) Quarto website shell + static output

- `_quarto.yml` defines the site shell (navbar/footer/sidebar), output target (`docs/`), theme stack, and included assets.
- QMD pages are the longform source (`index.qmd`, `modules/*.qmd`, `semanas/index.qmd`, utility pages).
- Rendered output is static and published through GitHub Pages workflow (`.github/workflows/quarto-publish.yml`).

### 2) Manifest-driven content registry

- `data/site-manifest.yml` is the canonical content registry for:
  - navigation and CTA,
  - page registry and editable regions,
  - module ordering, phase grouping, script and quiz linkage.
- `scripts/validate_site_manifest.R` enforces consistency between `site-manifest.yml`, `_quarto.yml`, QMD content markers, styles, and quiz metadata.

### 3) Front-end behavior model (no backend)

- Global script loading is centralized in `assets/html/body-extras.html`.
  - Always loads `progress.js` and `darkmode.js`.
  - Conditionally loads `interactives.js` when data hooks are present (`[data-viz]`, `[data-learning-map]`, `[data-glossary]`, `.mg-viz`).
  - Conditionally loads `teacher-mode.js` + `quiz.js` when `.quiz-container` exists.
- Progress + completion are browser-local (`localStorage`, key `mgenetica_completed`) and drive:
  - sidebar progress UI (`assets/js/progress.js`),
  - quiz completion marks (`assets/js/quiz.js`),
  - certificate gate/unlock logic (`certificado.qmd` inline script).

### 4) Data and module pipeline

- Each module has:
  - QMD page in `modules/`,
  - paired R script `scripts/moduloXX.R`,
  - generated CSV `data/moduloXX_simulado.csv`,
  - quiz file `quizzes/quiz-XX.json`.
- `scripts/run_all_modules.R` sources all `scripts/moduloXX.R` files.
- Prepublish checks validate YAML, SCSS, JS syntax, module scripts, whitespace, and optionally Quarto render.

## Key repository conventions

### Source-of-truth and synchronization rules

- Treat `data/site-manifest.yml` as the canonical registry; reflect matching nav/footer/CTA in `_quarto.yml`.
- Module order is strict and sequential (01..12); `previous`/`next`, quiz filenames, and quiz `module` IDs must align with order.

### Required page/module structural markers

- Pages and modules use explicit semantic class markers (for example `public-wayfinding`, `module-*`, `certificate-*`, `route-*`, `utility-*`).
- These markers are not cosmetic only: validators require them to exist and to match manifest-declared editable regions.
- `.entry-link` links must include `aria-label`.

### Pathing and static-site constraints

- Keep paths compatible with GitHub Pages subpaths (root vs `modules/`/`semanas/` depth).
- Maintain absolute favicon/manifest/social-image references as configured in shared head includes.

### Publication guardrail

- Before any publish-oriented change, run `Rscript scripts/prepublish_site_check.R`.
- In CI, prepublish runs with `SKIP_QUARTO_RENDER=1`; rendering and Pagefind indexing run in separate workflow steps.
