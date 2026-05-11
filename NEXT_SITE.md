# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution. Do not publish automatically unless explicitly requested.

## Tipo do próximo bloco

`publication-readiness-review`

## Objective

Review the newly accumulated local public-site UX changes and decide whether to publish. The already published baseline at commit `896fcd0` includes homepage trust anchors, homepage first-session guidance, public route strip, intent switching, public-journey summary, progress snapshot, path-evidence contract, session-choice guidance, outcome map, homepage 12-week planning CTA, reordered public navigation, footer home navigation, manifest-backed navbar journey CTA, module-catalog reading guidance, module-index quick jumps, direct phase-entry links, phase-card start links, module-readiness guidance, phase-decision guidance, evidence-based module-choice guidance, consistent evidence path and return note in all 12 module pages, weekly-route session models, route recovery, route evidence ladder, route phase-handoff, route weekly-output, route-table reading guidance, search/glossary utility crossroads, search/glossary example guidance, search/glossary query-planning guidance, certificate evidence-decision, recovery, identity and next-use guidance, and About-page public contract plus editorial-boundary guidance.

The current new local site work adds homepage hero action-choice guidance with clickable note routes, expanded aria labels and a first-viewport session-choice hint, homepage start-now, next-click, session-close guidance and final-CTA decision hint, search/glossary utility start-choice, no-result recovery, result-close routing and final utility-exit copy with direct return links and destination-specific aria labels, module-index navigation-contract actions with a compact decision hint plus final next-step hint, opening-flow and resume-route guidance, study-route start-today links and split-session guidance, certificate final-check guidance plus a dynamic pending-progress summary, next-pending CTA, pending-route hint and improved action semantics, About-page visitor-path criteria, and a consistent module reading-rhythm note across all 12 module pages, with manifest, documentation, validator, responsive and dark-mode coverage.

## Current local state

- The last publication completed successfully through GitHub Actions and deployed-site validation at commit `896fcd0`.
- New local site changes from the latest block are not published.
- Targeted static Quarto render for `index.qmd`, `modules/index.qmd`, representative module pages, `semanas/index.qmd`, `perfil.qmd`, `busca.qmd`, `glossario.qmd` and `certificado.qmd` passed across the current local blocks.
- Site manifest validation, whitespace diff check, SCSS validation, targeted Quarto render and full prepublish check passed locally after the newest edits.
- Rendered HTML inspection confirmed:
  - navbar order as `Início`, `Módulos`, `Roteiro`, `Busca`, `Glossário`, `Certificado`, `Sobre` in `docs/index.html`;
  - navbar journey CTA as `Começar M01` in rendered pages;
  - primary CTAs standardized to `Começar M01` with `aria-label="Começar pelo Módulo 01"` on homepage, module index and study route;
  - footer copy as `MGenética · estudar, consultar, concluir` and footer `Início` link in rendered pages;
  - homepage hero CTA `Planejar 12 semanas` in `docs/index.html`;
  - `.hero-action-note`, `.hero-action-note-grid` and `.hero-action-note-item` in `docs/index.html`;
  - `.hero-action-note-hint` and its session-choice copy in `docs/index.html`;
  - hero action-note links `Abrir Módulo 01`, `Ver índice` and `Planejar` with expanded aria labels in `docs/index.html`;
  - `.home-start-now` and `.home-start-now-grid` in `docs/index.html`;
  - `.home-next-click` and `.home-next-click-grid` in `docs/index.html`;
  - `.home-session-close` and `.home-session-close-grid` in `docs/index.html`;
  - `.home-trust-anchors` and `.home-trust-anchors-grid` in `docs/index.html`;
  - `.home-first-session` and `.home-first-session-grid` in `docs/index.html`;
  - `.home-route-strip` and `.home-route-strip-grid` in `docs/index.html`;
  - `.home-intent-switch` and `.home-intent-switch-grid` in `docs/index.html`;
  - `.home-public-journey` and `.home-public-journey-grid` in `docs/index.html`;
  - `.home-progress-snapshot` and `.home-progress-snapshot-grid` in `docs/index.html`;
  - `.home-path-contract` and `.home-path-contract-grid` in `docs/index.html`;
  - `.home-study-choice` and `.home-study-choice-grid` in `docs/index.html`;
  - `.home-outcome-map` and `.home-outcome-map-grid` in `docs/index.html`;
  - `.final-cta-hint` in `docs/index.html`;
  - `.modules-quick-jump` and `.modules-quick-jump-grid` in `docs/modules/index.html`;
  - `.modules-navigation-contract` and `.modules-navigation-contract-grid` in `docs/modules/index.html`;
  - `.modules-navigation-contract-hint` in `docs/modules/index.html`;
  - module-index navigation-contract direct links in `docs/modules/index.html`;
  - `.modules-phase-entry` and `.modules-phase-entry-grid` in `docs/modules/index.html`;
  - phase-card `Começar fase` links in `docs/modules/index.html`;
  - `.modules-readiness-meter` and `.modules-readiness-grid` in `docs/modules/index.html`;
  - `.modules-open-flow` and `.modules-open-flow-grid` in `docs/modules/index.html`;
  - `.modules-resume-route` and `.modules-resume-route-grid` in `docs/modules/index.html`;
  - `.modules-phase-decision` and `.modules-phase-decision-grid` in `docs/modules/index.html`;
  - `.modules-choice-path` and `.modules-choice-path-grid` in `docs/modules/index.html`;
  - `.modules-catalog-guide` and `.modules-catalog-guide-grid` in `docs/modules/index.html`;
  - `.modules-next-step-hint` in `docs/modules/index.html`;
  - `.module-evidence-path` in rendered representative module pages and in all 12 module source files;
  - `.module-return-note` in rendered representative module pages and in all 12 module source files;
  - `.module-reading-rhythm` in rendered representative module pages and in all 12 module source files;
  - `.route-start-today` and `.route-start-today-grid` in `docs/semanas/index.html`;
  - route start-today links to M01, modules and certificate in `docs/semanas/index.html`;
  - `.route-session-plan` and `.route-session-plan-grid` in `docs/semanas/index.html`;
  - `.route-session-split` and `.route-session-split-grid` in `docs/semanas/index.html`;
  - `.route-recovery-plan` and `.route-recovery-plan-grid` in `docs/semanas/index.html`;
  - `.route-evidence-ladder` and `.route-evidence-ladder-grid` in `docs/semanas/index.html`;
  - `.route-phase-handoff` and `.route-phase-handoff-grid` in `docs/semanas/index.html`;
  - `.route-weekly-output` and `.route-weekly-output-grid` in `docs/semanas/index.html`;
  - `.route-table-guide` and `.route-table-guide-grid` in `docs/semanas/index.html`;
  - `.about-public-contract` and `.about-public-contract-grid` in `docs/perfil.html`;
  - `.utility-crossroads` and `.utility-crossroads-grid` in `docs/busca.html` and `docs/glossario.html`;
  - `.utility-examples` and `.utility-examples-grid` in `docs/busca.html` and `docs/glossario.html`;
  - `.utility-query-plan` and `.utility-query-plan-grid` in `docs/busca.html` and `docs/glossario.html`;
  - `.utility-start-choice` and `.utility-start-choice-grid` in `docs/busca.html` and `docs/glossario.html`;
  - `.utility-no-result` and `.utility-no-result-grid` in `docs/busca.html` and `docs/glossario.html`;
  - utility no-result direct recovery links in `docs/busca.html` and `docs/glossario.html`;
  - destination-specific aria labels for utility no-result and result-close links in rendered utility pages;
  - `.utility-result-close` and `.utility-result-close-grid` in `docs/busca.html` and `docs/glossario.html`;
  - utility result-close direct links in `docs/busca.html` and `docs/glossario.html`;
  - `.utility-next-step-copy` in `docs/busca.html` and `docs/glossario.html`;
  - `.certificate-decision` and `.certificate-decision-grid` in `docs/certificado.html`.
  - `.certificate-recovery` and `.certificate-recovery-grid` in `docs/certificado.html`.
  - `.certificate-next-use` and `.certificate-next-use-grid` in `docs/certificado.html`.
  - `.certificate-identity-note` and `.certificate-identity-grid` in `docs/certificado.html`.
  - `.certificate-final-check` and `.certificate-final-check-grid` in `docs/certificado.html`.
  - `.certificate-progress-summary`, `.certificate-progress-module` and `.certificate-progress-title` in `docs/certificado.html`.
  - `.certificate-pending-hint` in `docs/certificado.html`.
  - `#cert-progress-summary` rendered with `role="status"` and `.certificate-actions` tied to it through `aria-describedby`.
  - `#cert-next-pending-link` and `updateNextPendingAction()` in `docs/certificado.html`.
  - `.about-editorial-boundary` and `.about-editorial-boundary-grid` in `docs/perfil.html`.
  - `.about-visitor-path` and `.about-visitor-path-grid` in `docs/perfil.html`.
- The local project-level Quarto render rename failure remains resolved by serializing Quarto renders through `QUARTO_NUM_THREADS=1` in `scripts/prepublish_site_check.R`.
- Browser tooling was not exposed in the latest tool discovery pass; no true screenshot QA was performed.
- Pre-existing untracked local files remain unrelated and untouched: `.agents/`, `.vscode/`, `AUTOMATION_SITE.md`.
- Next concrete action: perform true browser visual QA (light+dark + mobile widths) for the clickable homepage hero note grid and hint, homepage final CTA hint, module-index navigation-contract/final next-step hints, utility no-result/result-close/final-exit links, and certificate pending-module summary/next-pending CTA/pending-route hint, then decide whether to publish (only on explicit user request). The full prepublish gate has passed after the newest documentation updates; re-run it immediately before publication if more changes happen first.

## In scope

- Review rendered HTML for `.hero-action-note`, `.hero-action-note-hint`, `.hero-action-note-grid`, clickable hero-note `.entry-link` routes, `.home-start-now`, `.home-trust-anchors`, `.home-first-session`, `.home-route-strip`, `.home-intent-switch`, `.home-public-journey`, `.home-progress-snapshot`, `.home-path-contract`, `.home-next-click`, `.home-session-close`, `.home-study-choice`, `.home-outcome-map`, `.final-cta-hint`, homepage hero CTAs, navbar journey CTA, `.modules-quick-jump`, `.modules-navigation-contract`, `.modules-navigation-contract-hint`, module-index navigation-contract direct links, `.modules-phase-entry`, phase-card start links, `.modules-readiness-meter`, `.modules-open-flow`, `.modules-resume-route`, `.modules-phase-decision`, `.modules-choice-path`, `.modules-catalog-guide`, `.modules-next-step-hint`, `.module-reading-rhythm`, `.module-evidence-path`, `.module-return-note`, `.route-start-today`, route start-today direct links, `.route-session-plan`, `.route-session-split`, `.route-recovery-plan`, `.route-evidence-ladder`, `.route-phase-handoff`, `.route-weekly-output`, `.route-table-guide`, `.about-public-contract`, `.about-editorial-boundary`, `.about-visitor-path`, `.utility-start-choice`, `.utility-no-result`, utility no-result direct recovery links, `.utility-result-close`, utility result-close direct links, `.utility-next-step-copy`, `.utility-crossroads`, `.utility-examples`, `.utility-query-plan`, `.certificate-decision`, `.certificate-recovery`, `.certificate-next-use`, `.certificate-identity-note`, `.certificate-final-check`, `.certificate-pending-hint`, `.certificate-progress-summary`, `.certificate-progress-module`, `.certificate-progress-title`, `#cert-next-pending-link`, homepage entry/returning/final CTA sections, module index, utility pages and study route.
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
