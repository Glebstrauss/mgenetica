# MGenética Project Status

> **Source of Truth for AI Agents (Codex, Copilot, etc.)**
> Version: 1.0.0 | Date: 2026-05-12

## Project Overview
Educational platform for animal genetics and R programming.
- **Core Goal:** Scientific editorial platform with premium UI/UX ("Luminous Precision").
- **Current Phase:** v5 Redesign (Published/Finalizing).
- **Target Phase:** v6 (Interactive Lab with WebR).

## Tech Stack
- **Framework:** Quarto (quarto.org)
- **Primary Language:** R (Scripts in `scripts/`, modules in `modules/`)
- **Styling:** SCSS (`styles/main.scss`) - Design System v3/v5
- **Interactions:** Vanilla JS (`assets/js/`)
- **Data:** Simulated CSVs (`data/`), Quiz JSONs (`quizzes/`)
- **Infrastructure:** GitHub Pages (GitHub Actions)

## Architecture Notes
- **Static First:** No backend assumed. All state (progress, quizzes) is stored in `localStorage`.
- **Content-Centric:** Modules are `.qmd` files rendered to static HTML.
- **Manifest-Driven:** `data/site-manifest.yml` defines the structure and validation rules.

## File Map (Critical)
- `_quarto.yml`: Global configuration and navigation.
- `index.qmd`: Home page (Custom layout, no sidebar/TOC).
- `styles/main.scss`: Main design system tokens and rules.
- `assets/js/progress.js`: Core logic for tracking module completion.
- `scripts/prepublish_site_check.R`: Mandatory validation script.

## Active Goals
1.  **Visual Polish:** Align all internal modules with the v5 "Premium" look.
2.  **Script Lab Rollout:** Ensure all 12 modules have consistent R script/CSV accessibility.
3.  **UI/UX:** Implement 3-column grid for module cards and clean Hero composition.
4.  **Performance:** Optimize the 7k+ line SCSS file and implement critical CSS.

## Operational Constraints
- **Scope:** Work only on the public website. Do not touch internal productivity apps.
- **Validation:** Always run `Rscript scripts/prepublish_site_check.R` before claiming completion.
- **Identity:** Preserve the original logo (`images/mgenetica-logo-correct.png`) and Navy/Cyan palette.

## Agent Interop
When starting a task, read this file and `PLAN-EVOLUCAO-PRODUTO.md`.
Maintain the "Scientific Precision" tone in all UI copy and code structure.
