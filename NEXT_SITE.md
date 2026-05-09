# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution. Do not publish automatically unless explicitly requested.

## Tipo do próximo bloco

`publication-readiness-review`

## Objective

After publication, verify the GitHub Actions deployment and the deployed public site. The published work improves the homepage hero proof and completion cue, homepage entry-decision guidance, homepage study-readiness checklist, public homepage resource cards, the explicit start CTA, primary navigation discoverability for the certificate, module-index completion/certificate bridge, module-index study-choice checkpoint, all module technical takeaways and post-quiz continuity notes, search/glossary return guidance, study-route finish band, the Sobre institutional route, certificate readiness guidance, certificate preview/form componentization, no-JavaScript certificate fallback, footer navigation clarity (explicit “Feedback” link), responsive behavior, dark-mode parity, accessibility semantics (including anchored heading scroll offset) and manifest/component validation coverage.

## Current local state

- Publication was explicitly requested by the user.
- Static Quarto renders for the homepage, module index, certificate page, search, glossary, study route, Sobre page and representative module pages passed.
- Explicit render of all public `.qmd` pages with `--no-execute` passed locally with the vendored Quarto CLI on `PATH`.
- The local project-level Quarto render rename failure was resolved by serializing Quarto renders through `QUARTO_NUM_THREADS=1` in `scripts/prepublish_site_check.R`.
- Full `scripts/prepublish_site_check.R` passed locally with the vendored Quarto CLI on `PATH` immediately before publication.
- Rendered HTML inspection confirmed:
  - `.hero-panel-proof-list` including the certificate completion cue in `docs/index.html`;
  - `.entry-decision` and `.entry-decision-list` in `docs/index.html`;
  - `.home-readiness`, `.home-readiness-grid` and navbar `Certificado` in `docs/index.html`;
  - `.resource-grid`, `.resource-card` and the “Começar Módulo 01” navbar CTA in `docs/index.html`;
  - footer navigation includes “Feedback” and no longer includes Quarto repo-actions UI in `docs/index.html`;
  - `.modules-completion-flow` and semantic `.modules-landing-panel[role="note"]` in `docs/modules/index.html`;
  - `.modules-study-check` and `.modules-study-check-list` in `docs/modules/index.html`;
  - `.module-takeaways` in the rendered start, middle and final module pages;
  - `.module-after-quiz` in the rendered start, transition and final module pages;
  - `.about-route` and `.about-route-steps` in `docs/perfil.html`;
  - `.utility-return-guide` in `docs/busca.html` and `docs/glossario.html`;
  - `.route-finish-band` in `docs/semanas/index.html`;
  - `.certificate-readiness-guide` and the public footer label in `docs/certificado.html`;
  - `.certificate-noscript`, `.certificate-preview[role="region"]`, `.certificate-form` and fallback link to modules in `docs/certificado.html`.
- In-app browser tooling cannot open local `file://` renders in this sandbox due to URL policy; no true screenshot QA was performed.
- Pre-existing untracked local files remain unrelated and untouched: `.agents/`, `.vscode/`, `AUTOMATION_SITE.md`.

## In scope

- Watch the GitHub Actions deployment triggered by the publication push.
- Run deployed-site validation after deployment completes.
- Review rendered HTML and, if tooling becomes available, browser screenshots for homepage entry/readiness/resource sections, module index, representative module pages with `.module-takeaways`, utility pages, study route, Sobre page, footer and certificate page.
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
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render`
- `gh run list --limit 5`
- `gh run watch`
- `Rscript scripts/validate_deployed_site.R`

## Criteria for completion

- Rendered/browser review shows no broken hero, homepage entry/readiness/resource, module-index, module-page takeaways/quiz flow, Sobre, footer, utility, route or certificate layout.
- Manifest validation and whitespace diff check pass.
- Full prepublish gate passes immediately before any future publication.
- GitHub Actions deployment completes successfully and deployed-site validation passes.
- No app files are changed.
