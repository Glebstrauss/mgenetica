# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution. Do not publish automatically unless explicitly requested.

## Tipo do próximo bloco

`publication-readiness-review`

## Objective

Review the newly accumulated local public-site UX changes and decide whether to publish. The current unpublished local work adds homepage trust anchors, homepage first-session guidance, a homepage public route strip, homepage intent switching, homepage public-journey summary, homepage progress snapshot, homepage path-evidence contract, homepage session-choice guidance, a homepage outcome map, a direct homepage 12-week planning CTA, reordered public navigation, footer home navigation, manifest-backed navbar journey CTA, module-catalog reading guidance, module-index quick jumps, direct phase-entry links, phase-card start links, module-readiness guidance, phase-decision guidance, evidence-based module-choice guidance, a consistent evidence path and return note in all 12 module pages, weekly-route session models, a route recovery plan, a route evidence ladder, route phase-handoff guidance, route weekly-output guidance, route-table reading guidance, search/glossary utility crossroads, search/glossary example guidance, search/glossary query-planning guidance, certificate evidence-decision, recovery, identity and next-use guidance, and About-page public contract plus editorial-boundary guidance. The already published baseline includes homepage final CTA decision checks, module-index final CTA decision checks, semantic module navigation across all 12 module pages, returning-user routes, post-module return guidance, evidence prompts, certificate scope guidance, utility decision guidance, study-route rhythm guidance, dark-mode parity, responsive behavior and validation coverage.

## Current local state

- The last publication completed successfully through GitHub Actions and deployed-site validation at commit `ffa7850`.
- New local site changes are not published.
- Targeted static Quarto render for `index.qmd`, `modules/index.qmd`, representative module pages, `semanas/index.qmd`, `perfil.qmd`, `busca.qmd`, `glossario.qmd` and `certificado.qmd` passed across the current local blocks.
- Site manifest validation, whitespace diff check, SCSS validation, targeted Quarto render and full prepublish check passed locally after the newest edits.
- Rendered HTML inspection confirmed:
  - navbar order as `Início`, `Módulos`, `Roteiro`, `Busca`, `Glossário`, `Certificado`, `Sobre` in `docs/index.html`;
  - navbar journey CTA as `Começar M01` in rendered pages;
  - footer copy as `MGenética · estudar, consultar, concluir` and footer `Início` link in rendered pages;
  - homepage hero CTA `Planejar 12 semanas` in `docs/index.html`;
  - `.home-trust-anchors` and `.home-trust-anchors-grid` in `docs/index.html`;
  - `.home-first-session` and `.home-first-session-grid` in `docs/index.html`;
  - `.home-route-strip` and `.home-route-strip-grid` in `docs/index.html`;
  - `.home-intent-switch` and `.home-intent-switch-grid` in `docs/index.html`;
  - `.home-public-journey` and `.home-public-journey-grid` in `docs/index.html`;
  - `.home-progress-snapshot` and `.home-progress-snapshot-grid` in `docs/index.html`;
  - `.home-path-contract` and `.home-path-contract-grid` in `docs/index.html`;
  - `.home-study-choice` and `.home-study-choice-grid` in `docs/index.html`;
  - `.home-outcome-map` and `.home-outcome-map-grid` in `docs/index.html`;
  - `.modules-quick-jump` and `.modules-quick-jump-grid` in `docs/modules/index.html`;
  - `.modules-phase-entry` and `.modules-phase-entry-grid` in `docs/modules/index.html`;
  - phase-card `Começar fase` links in `docs/modules/index.html`;
  - `.modules-readiness-meter` and `.modules-readiness-grid` in `docs/modules/index.html`;
  - `.modules-phase-decision` and `.modules-phase-decision-grid` in `docs/modules/index.html`;
  - `.modules-choice-path` and `.modules-choice-path-grid` in `docs/modules/index.html`;
  - `.modules-catalog-guide` and `.modules-catalog-guide-grid` in `docs/modules/index.html`;
  - `.module-evidence-path` in rendered representative module pages and in all 12 module source files;
  - `.module-return-note` in rendered representative module pages and in all 12 module source files;
  - `.route-session-plan` and `.route-session-plan-grid` in `docs/semanas/index.html`;
  - `.route-recovery-plan` and `.route-recovery-plan-grid` in `docs/semanas/index.html`;
  - `.route-evidence-ladder` and `.route-evidence-ladder-grid` in `docs/semanas/index.html`;
  - `.route-phase-handoff` and `.route-phase-handoff-grid` in `docs/semanas/index.html`;
  - `.route-weekly-output` and `.route-weekly-output-grid` in `docs/semanas/index.html`;
  - `.route-table-guide` and `.route-table-guide-grid` in `docs/semanas/index.html`;
  - `.about-public-contract` and `.about-public-contract-grid` in `docs/perfil.html`;
  - `.utility-crossroads` and `.utility-crossroads-grid` in `docs/busca.html` and `docs/glossario.html`;
  - `.utility-examples` and `.utility-examples-grid` in `docs/busca.html` and `docs/glossario.html`;
  - `.utility-query-plan` and `.utility-query-plan-grid` in `docs/busca.html` and `docs/glossario.html`;
  - `.certificate-decision` and `.certificate-decision-grid` in `docs/certificado.html`.
  - `.certificate-recovery` and `.certificate-recovery-grid` in `docs/certificado.html`.
  - `.certificate-next-use` and `.certificate-next-use-grid` in `docs/certificado.html`.
  - `.certificate-identity-note` and `.certificate-identity-grid` in `docs/certificado.html`.
  - `.about-editorial-boundary` and `.about-editorial-boundary-grid` in `docs/perfil.html`.
- The local project-level Quarto render rename failure remains resolved by serializing Quarto renders through `QUARTO_NUM_THREADS=1` in `scripts/prepublish_site_check.R`.
- Browser tooling was not exposed in the latest tool discovery pass; no true screenshot QA was performed.
- Pre-existing untracked local files remain unrelated and untouched: `.agents/`, `.vscode/`, `AUTOMATION_SITE.md`.

## In scope

- Review rendered HTML for `.home-trust-anchors`, `.home-first-session`, `.home-route-strip`, `.home-intent-switch`, `.home-public-journey`, `.home-progress-snapshot`, `.home-path-contract`, `.home-study-choice`, `.home-outcome-map`, homepage hero CTAs, navbar journey CTA, `.modules-quick-jump`, `.modules-phase-entry`, phase-card start links, `.modules-readiness-meter`, `.modules-phase-decision`, `.modules-choice-path`, `.modules-catalog-guide`, `.module-evidence-path`, `.module-return-note`, `.route-session-plan`, `.route-recovery-plan`, `.route-evidence-ladder`, `.route-phase-handoff`, `.route-weekly-output`, `.route-table-guide`, `.about-public-contract`, `.about-editorial-boundary`, `.utility-crossroads`, `.utility-examples`, `.utility-query-plan`, `.certificate-decision`, `.certificate-recovery`, `.certificate-next-use`, `.certificate-identity-note`, homepage entry/returning/final CTA sections, module index, utility pages and study route.
- Review rendered HTML and, if tooling becomes available, browser screenshots for homepage, module index, study route, representative module pages, utility pages, Sobre page, footer and certificate page.
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

- Rendered/browser review shows no broken hero, homepage study-choice/entry/returning/final CTA, module-index catalog/evidence/return path/final CTA, study-route session plan, module-page practice evidence/takeaways/quiz/navigation flow, Sobre, footer, utility decision, route rhythm or certificate layout.
- Manifest validation, SCSS validation and whitespace diff check pass.
- Full prepublish gate passes immediately before any future publication.
- If published, GitHub Actions deployment completes successfully and deployed-site validation passes.
- No app files are changed.
