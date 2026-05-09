# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution. Do not publish automatically unless explicitly requested.

## Tipo do próximo bloco

`publication-readiness-review`

## Objective

Review the accumulated unpublished public-site UX changes and decide whether to publish. The current local work now includes homepage final CTA decision checks, module-index final CTA decision checks and semantic `<nav aria-label="Navegação entre módulos">` wrappers across all 12 module pages. The broader unpublished set also includes a homepage returning-user route, a module-index post-module return path, a homepage continuity bridge from study to certificate, audience-fit and start-readiness bands, homepage credibility/evidence, utility-page decision guidance, study-route rhythm guidance, module-index evidence and certificate-route checkpoints, phase-transition guidance, practice-evidence prompts across all 12 modules, certificate scope/limits, Sobre credibility commitments, compact public navbar/footer copy, responsive navbar compression, stronger focus-visible treatment and manifest/component validation coverage for the new public patterns.

The already published baseline improves the homepage hero proof and completion cue, homepage entry-decision guidance, homepage study-readiness checklist, public homepage resource cards, the explicit start CTA, primary navigation discoverability for the certificate, module-index completion/certificate bridge, module-index study-choice checkpoint, all module technical takeaways and post-quiz continuity notes, search/glossary return guidance, study-route finish band, the Sobre institutional route, certificate readiness guidance, certificate preview/form componentization, no-JavaScript certificate fallback, footer navigation clarity, responsive behavior, dark-mode parity, accessibility semantics and manifest/component validation coverage.

## Current local state

- The last publication completed successfully through GitHub Actions and deployed-site validation.
- New local site changes are not published.
- Targeted static Quarto render for `index.qmd`, `modules/index.qmd`, representative modules and changed module pages passed.
- Site manifest validation, whitespace diff check, SCSS validation and full prepublish check passed locally.
- The local project-level Quarto render rename failure remains resolved by serializing Quarto renders through `QUARTO_NUM_THREADS=1` in `scripts/prepublish_site_check.R`.
- Rendered HTML inspection confirmed:
  - `.final-cta-checks` in `docs/index.html`;
  - `.modules-next-step-checks` in `docs/modules/index.html`;
  - semantic `.module-nav` landmarks in rendered representative modules 01, 06 and 12;
  - `.home-returning` and `.home-returning-grid` in `docs/index.html`;
  - `.modules-return-path` and `.modules-return-path-grid` in `docs/modules/index.html`;
  - `.hero-panel-proof-list` including the certificate completion cue in `docs/index.html`;
  - `.entry-decision`, `.home-audience`, `.home-start-criteria`, `.home-readiness`, `.home-continuity`, `.home-evidence`, `.resource-grid` and `.resource-card` in `docs/index.html`;
  - footer navigation includes “Feedback” and no longer includes Quarto repo-actions UI in `docs/index.html`;
  - `.modules-completion-flow`, `.modules-evidence-standard`, `.modules-study-check`, `.modules-phase-bridge` and `.modules-certificate-route` in `docs/modules/index.html`;
  - `.module-takeaways`, `.module-practice-contract` and `.module-after-quiz` in rendered module pages;
  - `.about-route`, `.about-credibility`, `.utility-decision`, `.utility-return-guide`, `.route-week-decision`, `.route-finish-band`, `.certificate-scope`, `.certificate-readiness-guide`, `.certificate-noscript`, `.certificate-preview[role="region"]` and `.certificate-form` in their rendered pages.
- In-app browser tooling cannot open local `file://` renders in this sandbox due to URL policy; no true screenshot QA was performed.
- Pre-existing untracked local files remain unrelated and untouched: `.agents/`, `.vscode/`, `AUTOMATION_SITE.md`.

## In scope

- Review rendered HTML for `.final-cta-checks`, `.modules-next-step-checks`, semantic `.module-nav`, `.home-returning`, `.modules-return-path`, `.home-audience`, `.home-start-criteria`, `.home-continuity`, `.home-evidence`, `.utility-decision`, `.route-week-decision`, `.modules-evidence-standard`, `.modules-phase-bridge`, `.modules-certificate-route`, `.module-practice-contract`, `.certificate-scope` and `.about-credibility`.
- Review rendered HTML and, if tooling becomes available, browser screenshots for homepage entry/returning/final CTA sections, module index, representative module pages, utility pages, study route, Sobre page, footer and certificate page.
- Re-run `git diff --check`.
- Re-run `Rscript --vanilla scripts/validate_site_manifest.R`.
- Before any future publication, run `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`.
- If publication is explicitly requested, commit and push only tracked site-related changes, then watch GitHub Actions and run deployed-site validation.

## Out of scope

- App changes.
- Backend, CMS, authentication or new project dependencies.
- Automatic publication without explicit user request.
- Cleanup of unrelated untracked local files.

## Recommended commands

- `git status --short --branch`
- `git diff --check`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render`
- `gh run list --limit 5`
- `gh run watch`
- `Rscript scripts/validate_deployed_site.R`

## Criteria for completion

- Rendered/browser review shows no broken hero, homepage entry/returning/audience/start-readiness/readiness/evidence/resource/final CTA, module-index evidence standard/return path/final CTA, module-page practice evidence/takeaways/quiz/navigation flow, Sobre, footer, utility decision, route rhythm or certificate layout.
- Manifest validation, SCSS validation and whitespace diff check pass.
- Full prepublish gate passes immediately before any future publication.
- If published, GitHub Actions deployment completes successfully and deployed-site validation passes.
- No app files are changed.
