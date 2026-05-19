# MGenética Project Status

> **Source of Truth for AI Agents (Codex, Copilot, etc.)**
> Version: 1.3.0 | Date: 2026-05-19

## Project Overview
Educational platform for animal genetics and R programming.

- **Core Goal:** public scientific editorial platform with premium, trustworthy and modern UI/UX.
- **Current Phase:** GitHub Pages root is being switched to serve learner React app directly.
- **Immediate Next Phase:** complete Appwrite production auth/function checks and admin runtime validation after Pages deploy lands.
- **Target Longer-Term Phase:** v6 interactive learning layer with WebR and richer client-side learning tools.

## Verified Current State

- Primary live target is `https://mgenetica.github.io/mgenetica/`.
- PT-BR, English and Spanish public page trees exist for homepage, utility pages, roadmap and the 12 module pages.
- The locale switcher is base-path aware for GitHub Pages `/mgenetica/`.
- Module R examples inside the pages are static fenced code, while executable validation still runs through `scripts/run_all_modules.R`.
- The validated local gate is `scripts/prepublish_site_check.R`; safe local verification can skip render with `SKIP_QUARTO_RENDER=1`.
- The clean full Quarto render path was restored on 2026-05-17 after clearing stray generated source-side HTML and resource artifacts, and the full prepublish gate now completes with render enabled.
- The site was published successfully on 2026-05-17 through the GitHub Pages workflow on `main`, and the live URL responds at `https://mgenetica.github.io/mgenetica/`.
- A first SCSS maintainability pass on 2026-05-18 moved shared cyan aliases into the top token block and removed a later duplicate override.
- The learner app in `frontend/` now targets GitHub Pages root directly through `.github/workflows/pages-frontend.yml`.
- Quarto publication is preserved only as manual workflow dispatch.
- Optional Vercel deploy is preserved only as manual workflow dispatch.
- Appwrite browser config now supports endpoint/project env overrides and canonical function-ID fallbacks aligned to `appwrite/functions.json`.
- Appwrite backend now includes admin function surface for control-panel visibility.
- The deploy workflows were refreshed to the newer JavaScript-action runtime path before the next publish.
- The auxiliary frontend landing surface received a verified 2026-05-19 hero/auth layout correction to restore grid alignment, readable headline scale and consistent button/card rhythm across desktop and mobile.
- The auxiliary frontend hero highlight cards now use a cleaner icon/title/body hierarchy after 2026-05-19 visual QA exposed severe wrapping and balance defects in the previous card copy treatment.
- The auxiliary frontend hero now uses a separated top-row/bottom-row structure so the brand panel, CTA row and feature cards follow one consistent layout grid instead of competing for height in a single stretched block.
- A later 2026-05-19 deep layout pass corrected a hero markup/CSS structure mismatch that had been preventing intended professional grid from rendering consistently.
- The auxiliary frontend access experience now lives on a dedicated page instead of inside the public homepage, preserving clearer separation between institutional entry and learner authentication flow.

## Tech Stack

- **Frameworks:** Quarto website for public site; Vite + React for learner app.
- **Primary Languages:** R for public-site generation/validation; JavaScript for learner app and Appwrite functions.
- **Styling:** SCSS in `styles/main.scss` and `styles/main-dark.scss`.
- **Typography Direction:** DM Sans with DM Serif Display for editorial emphasis.
- **Interactions:** vanilla JavaScript for progress, i18n, quizzes, dark mode and page-specific interactions.
- **Data:** simulated CSVs in `data/`, quiz JSONs in `quizzes/`, manifest metadata in `data/site-manifest.yml`.
- **Infrastructure:** GitHub Pages through `.github/workflows/pages-frontend.yml`; optional Vercel through `.github/workflows/deploy-frontend.yml`; manual Quarto publish through `.github/workflows/quarto-publish.yml`; Appwrite Functions through `.github/workflows/appwrite-deploy.yml`.

## Architecture Notes

- **Primary runtime:** SPA served from Pages under /mgenetica/
- **Auth/runtime:** Appwrite browser SDK plus Appwrite cloud functions with credentialed requests
- **Admin runtime:** frontend admin gate by e-mail allowlist plus Appwrite admin status function

## File Map (Critical)

- `_quarto.yml`: global site configuration, render scope and public navigation.
- `frontend/src/App.jsx`: learner app screens, auth flow, admin panel
- `frontend/src/lib/appwrite.js`: learner-app Appwrite client and function execution wiring.
- `frontend/vite.config.js`: GitHub Pages base path
- `.github/workflows/pages-frontend.yml`: primary Pages deployment workflow
- `.github/workflows/deploy-frontend.yml`: learner-app build/deploy workflow.
- `.github/workflows/appwrite-deploy.yml`: Appwrite cloud-function deploy workflow.

## Active Goals

1. **Pages-root activation:** publish learner app directly to GitHub Pages root.
2. **Appwrite production safety:** register Pages origin in Appwrite Web Platforms and validate create-account/login/current-account/function flow.
3. **Admin visibility:** validate control-panel checks and admin access gating.

## Operational Constraints

- **Scope:** work only on the public website. Do not touch internal productivity apps.
- **Pages ownership:** do not let automatic Quarto and automatic frontend deploys fight for same Pages root.
- **Publication:** do not publish automatically; publish only on explicit user request.
- **Validation:** before publication, run `R_LIBS_USER=/private/tmp/mgenetica-r-lib Rscript --vanilla scripts/prepublish_site_check.R`.
- **Identity:** preserve the original logo asset family and the established navy/cyan brand direction unless explicitly changed.
- **Records:** keep `NEXT_SITE.md` and `WORKLOG_SITE.md` aligned with real verified state after each site block.

## Agent Interop

When starting a task, read this file, `NEXT_SITE.md` and `PLAN-EVOLUCAO-PRODUTO.md`.
Prefer current-state documentation grounded in validated site behavior over aspirational phase text.
