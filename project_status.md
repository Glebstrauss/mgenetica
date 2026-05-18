# MGenética Project Status

> **Source of Truth for AI Agents (Codex, Copilot, etc.)**
> Version: 1.1.1 | Date: 2026-05-18

## Project Overview
Educational platform for animal genetics and R programming.

- **Core Goal:** public scientific editorial platform with premium, trustworthy and modern UI/UX.
- **Current Phase:** Phase 1-4 public-site redesign published and live on GitHub Pages.
- **Immediate Next Phase:** continue SCSS maintainability, with targeted module-detail polish only if later QA exposes an issue.
- **Target Longer-Term Phase:** v6 interactive learning layer with WebR and richer client-side learning tools.

## Verified Current State

- Public site only; no app/admin scope in this repository block.
- PT-BR, English and Spanish public page trees exist for homepage, utility pages, roadmap and the 12 module pages.
- The locale switcher is base-path aware for GitHub Pages `/mgenetica/`.
- Module R examples inside the pages are static fenced code, while executable validation still runs through `scripts/run_all_modules.R`.
- The validated local gate is `scripts/prepublish_site_check.R`; safe local verification can skip render with `SKIP_QUARTO_RENDER=1`.
- The clean full Quarto render path was restored on 2026-05-17 after clearing stray generated source-side HTML and resource artifacts, and the full prepublish gate now completes with render enabled.
- The site was published successfully on 2026-05-17 through the GitHub Pages workflow on `main`, and the live URL responds at `https://mgenetica.github.io/mgenetica/`.
- A first SCSS maintainability pass on 2026-05-18 moved shared cyan aliases into the top token block and removed a later duplicate override.

## Tech Stack

- **Framework:** Quarto website.
- **Primary Language:** R for module data generation and validation scripts.
- **Styling:** SCSS in `styles/main.scss` and `styles/main-dark.scss`.
- **Typography Direction:** DM Sans with DM Serif Display for editorial emphasis.
- **Interactions:** vanilla JavaScript for progress, i18n, quizzes, dark mode and page-specific interactions.
- **Data:** simulated CSVs in `data/`, quiz JSONs in `quizzes/`, manifest metadata in `data/site-manifest.yml`.
- **Infrastructure:** GitHub Pages through `.github/workflows/quarto-publish.yml`.

## Architecture Notes

- **Static first:** no backend assumed; public progress state remains browser-local.
- **Content-centric:** modules remain authored as `.qmd` and rendered to static HTML.
- **Manifest-driven:** `data/site-manifest.yml` is the canonical map for navigation, module registry and public metadata.
- **Localized routing:** Quarto render patterns include PT-BR root pages plus mirrored `en/` and `es/` trees.

## File Map (Critical)

- `_quarto.yml`: global site configuration, render scope and public navigation.
- `index.qmd`: homepage and primary editorial entrypoint.
- `modules/index.qmd`: public module catalog, mirrored in localized trees.
- `styles/main.scss`: active public design-system layer and redesign rules.
- `assets/js/i18n.js`: locale switching and route mapping.
- `data/site-manifest.yml`: canonical public-site content map.
- `scripts/prepublish_site_check.R`: required local validation gate before publication.
- `NEXT_SITE.md`: current next-block contract.
- `WORKLOG_SITE.md`: execution history for site-only blocks.

## Active Goals

1. **Design-system maintainability:** continue reorganizing the large SCSS surface into clearer sections without regressing the public visual system.
2. **Publication maintenance:** keep the publish path healthy for future site-only iterations now that full render validation and live deployment are both working again.

## Operational Constraints

- **Scope:** work only on the public website. Do not touch internal productivity apps.
- **Publication:** do not publish automatically; publish only on explicit user request.
- **Validation:** before publication, run `R_LIBS_USER=/private/tmp/mgenetica-r-lib Rscript --vanilla scripts/prepublish_site_check.R`.
- **Identity:** preserve the original logo asset family and the established navy/cyan brand direction unless explicitly changed.
- **Records:** keep `NEXT_SITE.md` and `WORKLOG_SITE.md` aligned with real verified state after each site block.

## Agent Interop

When starting a task, read this file, `NEXT_SITE.md` and `PLAN-EVOLUCAO-PRODUTO.md`.
Prefer current-state documentation grounded in validated site behavior over aspirational phase text.
