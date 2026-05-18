# WORKLOG_SITE.md

Use this file to register site-only work blocks. Do not use it for app work.

## 2026-05-17 - Theme toggle label clarification

### Block objective

Clarify visitor-facing labels so home stays `Início` and theme control reads as an explicit theme toggle. Keep site-only scope.

### Cycles executed

1. Diagnosis: the public header used `Início` for home navigation, while the theme toggle still relied on the older `darkmode.toggle` label key.
   Implementation: added a clearer `theme.toggle` i18n key in PT/EN/ES and wired the dark-mode toggle to use it for aria-label and title.
   Testing: reran the safe prepublish gate after the label update.
   Notes: home nav remains `Início`; theme control is now explicit and no longer ambiguous.

### Files changed in this block

- `assets/i18n/pt-BR.json`
- `assets/i18n/en.json`
- `assets/i18n/es.json`
- `assets/js/darkmode.js`
- `WORKLOG_SITE.md`

### Commands executed

- `R_LIBS_USER=/private/tmp/mgenetica-r-lib SKIP_QUARTO_RENDER=1 Rscript --vanilla scripts/prepublish_site_check.R`

### Test results

- Theme toggle label now uses explicit `theme.toggle` wording.
- Safe prepublish gate passed.

### Pending items

- SCSS maintainability pass.
- Targeted module-detail polish only if later QA exposes a visible issue.

---

## 2026-05-17 - Content-structure cleanup in module manifest

### Block objective

Reduce duplicated module metadata in the public-site manifest while keeping the published site stable. Keep site-only scope.

### Cycles executed

1. Diagnosis: module metadata in `data/site-manifest.yml` still duplicated phase labels on each item even though phase definitions already exist in the manifest.
   Implementation: removed the redundant `phase` field from the 12 module items and kept `phase_id` as the linkage to the phase registry.
   Testing: reran the prepublish gate and confirmed the manifest and module scripts still validate cleanly.
   Notes: `card_title` stays in the manifest because it is still needed for the public module index card text.

### Files changed in this block

- `data/site-manifest.yml`
- `scripts/validate_site_manifest.R`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`
- `project_status.md`

### Commands executed

- `R_LIBS_USER=/private/tmp/mgenetica-r-lib SKIP_QUARTO_RENDER=1 Rscript --vanilla scripts/prepublish_site_check.R`
- `git diff --check`

### Test results

- Manifest validation passed.
- Safe prepublish gate passed.
- The published site remained stable.

### Pending items

- SCSS maintainability pass.
- Targeted module-detail polish only if later QA exposes a visible issue.

---

## 2026-05-17 - Post-publish QA on representative localized module pages

### Block objective

Run the next site block: live QA on representative localized module detail pages, then polish only if review exposed a real issue. Keep site-only scope.

### Cycles executed

1. Diagnosis: the published site needed a fresh live check on representative PT/EN/ES module detail pages before any further polish or structure cleanup.
   Implementation: fetched representative live module pages for module 12 in PT/EN/ES, plus additional EN module 01 and ES module 06 spot checks, and confirmed the pages returned expected localized content.
   Testing: the representative module 12 pages returned HTTP 200 on the live site; the safe prepublish gate also passed again with render skipped.
   Notes: no visible UX regression showed up, so no polish change was needed in this block.

### Files changed in this block

- `WORKLOG_SITE.md`
- `NEXT_SITE.md`
- `project_status.md`

### Commands executed

- `curl -sI -m 20 https://mgenetica.github.io/mgenetica/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html`
- `curl -sI -m 20 https://mgenetica.github.io/mgenetica/en/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html`
- `curl -sI -m 20 https://mgenetica.github.io/mgenetica/es/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html`
- `R_LIBS_USER=/private/tmp/mgenetica-r-lib SKIP_QUARTO_RENDER=1 Rscript --vanilla scripts/prepublish_site_check.R`

### Test results

- Representative live module pages returned the expected localized content.
- Live module 12 pages responded with HTTP 200.
- Safe prepublish gate passed.
- No module-detail polish was needed from this QA pass.

### Pending items

- Content-structure cleanup and SCSS maintainability pass.
- Targeted module-detail polish only if future QA exposes a visible issue.

---

## 2026-05-17 - Publication and live verification after localized redesign

### Block objective

Finish the remaining site block end-to-end: run representative route QA, publish the validated redesign, and confirm the live GitHub Pages result. Keep site-only scope.

### Cycles executed

1. Diagnosis: the restored local render path and safe validations were green, but the remaining work still required route-level QA on representative localized pages before a real publish attempt.
   Implementation: served the built site locally, verified representative PT, EN and ES homepage, search and module-detail outputs at the rendered HTML level, and confirmed the translated fixes were present in the built pages.
   Testing: representative localized route checks passed for homepage, search and module-detail pages after the full local render.
   Notes: browser tooling in-session was unreliable, so route-level QA used served built outputs plus live rendered-content assertions instead of screenshot automation.

2. Diagnosis: a direct workflow dispatch from the feature branch failed even though the site itself was healthy.
   Implementation: inspected the failed run and confirmed the issue was GitHub Pages environment protection, which rejected deployment from `feat/internationalization-plan`.
   Testing: GitHub Actions annotations explicitly reported that the feature branch was not allowed to deploy to `github-pages`.
   Notes: this was a repo-policy issue, not a Quarto/render/content issue.

3. Diagnosis: the actual publication path required `main`, so the validated site history had to be pushed onto the deploy-allowed branch.
   Implementation: merged `origin/main` into the current branch, reran the full prepublish gate, pushed the validated history to both the feature branch and `main`, and watched the canonical `Render and Publish Quarto Site` run to completion.
   Testing: full prepublish gate passed locally; GitHub Actions run `26005878663` completed successfully on `main`, including `Deploy to GitHub Pages`; the live site responded with HTTP 200 and reflected the Spanish search-page CTA fixes.
   Notes: this is the first fully published state for the completed localized redesign described in the current docs.

### Files changed in this block

- `NEXT_SITE.md`
- `WORKLOG_SITE.md`
- `project_status.md`

### Commands executed

- representative local route checks against the built site under `docs/`
- `HOME=/private/tmp/quarto-home R_LIBS_USER=/private/tmp/mgenetica-r-lib RENV_CONFIG_AUTOLOADER_ENABLED=FALSE Rscript --vanilla scripts/prepublish_site_check.R`
- `git push origin feat/internationalization-plan`
- `gh api repos/Mgenetica/mgenetica/actions/workflows/quarto-publish.yml/dispatches -X POST -f ref=feat/internationalization-plan`
- `git merge --no-edit origin/main`
- `git push origin HEAD:main`
- `gh run watch 26005878663 --exit-status`
- `curl -s -I https://mgenetica.github.io/mgenetica/`

### Test results

- Representative PT/EN/ES built routes served the expected localized content.
- Full local prepublish gate passed with render enabled before publication.
- Feature-branch dispatch failed only because the branch was not allowed to deploy to the protected `github-pages` environment.
- Canonical `main` publish run `26005878663` succeeded, including the final Pages deploy step.
- Live GitHub Pages URL returned HTTP 200 and reflected the published content.

### Pending items

- Run wider post-publish browser QA across representative localized module-detail pages.
- Limit future site work to targeted polish, structure cleanup or deliberate new content blocks.

---

## 2026-05-17 — Full render-path restoration after localization block

### Block objective

Restore the clean full Quarto render path after the localization and layout pass so the review-ready public site can move back to a real publication-valid state. Keep site-only scope and do not publish.

### Cycles executed

1. Diagnosis: safe validation still passed, but direct Quarto render attempts were failing on stale generated-resource references and missing source-side companion paths such as root and localized `*_files` directories.
   Implementation: traced the failure from stale `.quarto/_freeze` references into stray generated HTML and resource artifacts living inside the source tree instead of staying confined to `docs/`.
   Testing: reran direct Quarto render attempts after each cleanup step to confirm the blocker moved from frozen resources to source-side generated outputs.
   Notes: the failure mode was not missing content; it was Quarto re-encountering leftover generated artifacts as if they were project inputs/resources.

2. Diagnosis: localized and module HTML outputs had accumulated under `en/`, `es/`, `modules/` and the repo root, which made the render path fragile and caused repeated missing-companion-path errors.
   Implementation: removed only the stray generated source-side HTML and render-resource leftovers, restored the tracked include files after an overly broad cleanup pass, and reran the full project render once the source tree was clean again.
   Testing: `HOME=/private/tmp/quarto-home R_LIBS_USER=/private/tmp/mgenetica-r-lib RENV_CONFIG_AUTOLOADER_ENABLED=FALSE quarto render --no-execute` completed successfully and wrote the site to `docs/`.
   Notes: the accidental deletion of the tracked include files was repaired immediately and is recorded here so future cleanup passes stay narrower.

3. Diagnosis: once direct render was healthy again, the status records still described the older blocked-render state.
   Implementation: updated the current-status records to replace the render blocker with the restored-state description and shift the next site step back to browser QA and publication-on-request.
   Testing: reran the full prepublish gate with render enabled.
   Notes: this closes the render-path blocker and restores a real publication-ready validation path without actually publishing.

### Files changed in this block

- `NEXT_SITE.md`
- `WORKLOG_SITE.md`
- `project_status.md`

### Commands executed

- `HOME=/private/tmp/quarto-home R_LIBS_USER=/private/tmp/mgenetica-r-lib RENV_CONFIG_AUTOLOADER_ENABLED=FALSE quarto render --no-execute`
- `HOME=/private/tmp/quarto-home R_LIBS_USER=/private/tmp/mgenetica-r-lib RENV_CONFIG_AUTOLOADER_ENABLED=FALSE Rscript --vanilla scripts/prepublish_site_check.R`
- targeted cleanup of stray source-side generated HTML and render-resource artifacts

### Test results

- Full project Quarto render passed and wrote output under `docs/`.
- Full prepublish site check passed with render enabled.
- The earlier stale generated-resource blocker is no longer the active issue.

### Pending items

- Run wider browser QA across representative localized module-detail pages.
- Publish only after explicit user request and a final review pass.

---

## 2026-05-17 — Final translation cleanup and translated-layout adjustments

### Block objective

Finish the remaining EN/ES translation cleanup and adjust the public layout so longer translated labels fit more reliably across module pages and support routes. Keep site-only scope and do not publish.

### Cycles executed

1. Diagnosis: the localized site tree existed, but a final audit still found Portuguese leaks inside EN/ES module code captions, Spanish module follow-up labels and mixed-language support CTAs.
   Implementation: corrected the remaining EN/ES text leaks across module pages, the Spanish module index, the Spanish search page and the Spanish about-page wayfinding.
   Testing: reran search-based leak checks and the safe local prepublish gate after the updates.
   Notes: the goal here was completion of the current localization pass, not a new content rewrite.

2. Diagnosis: several action bands and module navigation cards were tuned around shorter Portuguese labels and were more fragile with longer translated strings.
   Implementation: updated the shared layout rules so module navigation cards can fully stretch and wrap longer translated labels, and so major action groups distribute buttons more cleanly.
   Testing: SCSS validation passed through the safe prepublish gate.
   Notes: these are layout-hardening adjustments rather than a visual redesign.

3. Diagnosis: a representative localized Quarto render did not complete even after the source translation cleanup; the local project still had stale generated-resource references under `.quarto/_freeze` and missing root resource directories expected by Quarto.
   Implementation: documented the render blocker in the status records instead of overstating publication readiness.
   Testing: safe prepublish gate still passed, but representative render attempts failed on stale paths such as `.quarto/_freeze/site_libs/bootstrap` and missing `*_files` resource directories.
   Notes: this blocker was restored later in the same day and is now covered by the render-restoration entry above.

### Files changed in this block

- `NEXT_SITE.md`
- `WORKLOG_SITE.md`
- `es/certificado.qmd`
- `es/busqueda.qmd`
- `es/modules/index.qmd`
- `es/modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `es/modules/modulo02-bases-da-genetica-quantitativa.qmd`
- `es/modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
- `es/modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd`
- `es/modules/modulo05-herdabilidade-e-repetibilidade.qmd`
- `es/modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `es/modules/modulo07-modelos-lineares-e-modelos-mistos.qmd`
- `es/modules/modulo08-blup-e-avaliacao-genetica.qmd`
- `es/modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd`
- `es/modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd`
- `es/modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- `es/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `es/sobre.qmd`
- `en/modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `en/modules/modulo05-herdabilidade-e-repetibilidade.qmd`
- `en/modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `en/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `project_status.md`
- `styles/main.scss`

### Commands executed

- `rg -n ... en es`
- `HOME=/private/tmp/quarto-home R_LIBS_USER=/private/tmp/mgenetica-r-lib RENV_CONFIG_AUTOLOADER_ENABLED=FALSE quarto render ... --no-execute`
- `R_LIBS_USER=/private/tmp/mgenetica-r-lib SKIP_QUARTO_RENDER=1 Rscript --vanilla scripts/prepublish_site_check.R`
- `git diff --check`

### Test results

- Leak scan no longer reports the corrected EN/ES translation issues.
- Safe prepublish gate passed with Quarto render intentionally skipped.
- Representative localized render was blocked at the end of this block, but the render path was restored later in the same day.
- Whitespace and diff check passed.

### Pending items

- Run wider browser QA across representative localized module-detail pages.
- Publish only after explicit user request and a final full-render validation pass.

---

## 2026-05-17 — Code and metadata alignment after status audit

### Block objective

Align the remaining code-level metadata and theme tokens with the updated public-site status records. Keep site-only scope and do not publish.

### Cycles executed

1. Diagnosis: the live code mostly matched the updated documents, but `data/site-manifest.yml` still marked the public pages and collection defaults as `published` while the current records intentionally describe a review-ready local state.
   Implementation: updated the relevant manifest status fields from `published` to `review` so content metadata matches the current operational status.
   Testing: reran manifest validation as part of the safe prepublish gate.
   Notes: this change keeps publication as an explicit later action instead of an implied metadata default.

2. Diagnosis: the dark-theme SCSS defaults still declared `Inter` as the sans font even though the active design direction and light-theme defaults had already moved to DM Sans.
   Implementation: replaced the stale dark-theme sans token with `DM Sans` in `styles/main-dark.scss`.
   Testing: reran SCSS validation through the safe prepublish gate.
   Notes: this removes an avoidable typography mismatch between code and records.

### Files changed in this block

- `WORKLOG_SITE.md`
- `data/site-manifest.yml`
- `styles/main-dark.scss`

### Commands executed

- `R_LIBS_USER=/private/tmp/mgenetica-r-lib SKIP_QUARTO_RENDER=1 Rscript --vanilla scripts/prepublish_site_check.R`
- `git diff --check`

### Test results

- Manifest validation passed.
- SCSS validation passed.
- Safe prepublish gate passed with Quarto render intentionally skipped.
- Whitespace and diff check passed.

### Pending items

- Review or polish internal module detail pages before publication.
- Publish only after explicit user request and a final full-render validation pass.

---

## 2026-05-17 — Documentation alignment for current site status and plans

### Block objective

Align the project status and planning records with the newest verified public-site state after the localized Phase 1-4 redesign work. Keep site-only scope and do not publish.

### Cycles executed

1. Diagnosis: `project_status.md`, `NEXT_SITE.md`, `BACKLOG_SITE.md` and `PLAN-EVOLUCAO-PRODUTO.md` no longer described the same current phase; some text still implied publication or older design assumptions.
   Implementation: rewrote the status snapshot to reflect a local review-ready redesign state, current typography, localized coverage and the current validation path.
   Testing: compared the revised records against the latest verified worklog block and current repository structure.
   Notes: published status remains intentionally separate from local completion status.

2. Diagnosis: the backlog still mixed open work with items already completed during the redesign phases.
   Implementation: reduced the backlog to remaining public-site work only, emphasizing module-detail polish, QA, SCSS organization, content metadata and future manifest alignment.
   Testing: reviewed the backlog against the current next-block contract to keep priorities consistent.
   Notes: completed redesign items were removed rather than partially annotated.

3. Diagnosis: the roadmap still carried outdated implementation assumptions such as Inter typography and ambiguous v5/v6 handoff.
   Implementation: updated the roadmap to distinguish completed Phase 1-4 work, the immediate next block and longer-term v6 exploration.
   Testing: ran the safe local prepublish gate and diff check after the documentation updates.
   Notes: no app scope, publication action or deployment claim was added.

### Files changed in this block

- `BACKLOG_SITE.md`
- `NEXT_SITE.md`
- `PLAN-EVOLUCAO-PRODUTO.md`
- `WORKLOG_SITE.md`
- `project_status.md`

### Commands executed

- `git status --short --branch`
- `R_LIBS_USER=/private/tmp/mgenetica-r-lib Rscript --vanilla scripts/validate_site_manifest.R`
- `R_LIBS_USER=/private/tmp/mgenetica-r-lib SKIP_QUARTO_RENDER=1 Rscript --vanilla scripts/prepublish_site_check.R`
- `git diff --check`

### Test results

- Manifest validation passed.
- Safe prepublish gate passed with Quarto render intentionally skipped.
- Whitespace and diff check passed.

### Pending items

- Review or polish internal module detail pages before publication.
- Publish only after explicit user request and a final full-render validation pass.

---

## 2026-05-14 — Hero logo panel matched to reference screenshot

### Block objective

Match the homepage logo panel to the user-provided reference: dark squared grid, original full logo, low opacity and lower-center placement.

### Cycles executed

1. Diagnosis: restored original logo was correct, but the panel still lacked the grid and placement shown in the reference.
   Implementation: rebuilt `.home-hero-mark` with a dark grid background and lower-centered contained logo at reduced opacity.
   Testing: targeted PT/EN/ES homepage render passed.
   Notes: this keeps the original logo asset and avoids icon/inversion/cropping experiments.

### Files changed in this block

- `WORKLOG_SITE.md`
- `styles/main.scss`

### Commands executed

- `HOME=/private/tmp/quarto-home R_LIBS_USER=/private/tmp/mgenetica-r-lib RENV_CONFIG_AUTOLOADER_ENABLED=FALSE quarto render index.qmd en/index.qmd es/index.qmd --no-execute`
- `R_LIBS_USER=/private/tmp/mgenetica-r-lib Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`

### Test results

- Targeted PT/EN/ES homepage render passed.
- Manifest validation passed.
- Whitespace/diff check passed.

---

## 2026-05-14 — Original logo restoration after icon test

### Block objective

Restore the original logo asset after the blank-background icon test was rejected.

### Cycles executed

1. Diagnosis: the blank-background icon treatment was visually worse than the original logo.
   Implementation: removed the icon experiment and restored `images/mgenetica-logo-correct.png` in PT/EN/ES homepage hero panels.
   Testing: targeted PT/EN/ES homepage render passed.
   Notes: the original square logo is contained, not cropped.

2. Diagnosis: navbar icon also needed to return to the original brand asset.
   Implementation: restored Quarto navbar logo to `images/mgenetica-logo-correct.png`.
   Testing: diff check passed.
   Notes: the text title remains beside the icon.

### Files changed in this block

- `WORKLOG_SITE.md`
- `_quarto.yml`
- `en/index.qmd`
- `es/index.qmd`
- `index.qmd`
- `styles/main.scss`

### Commands executed

- `HOME=/private/tmp/quarto-home R_LIBS_USER=/private/tmp/mgenetica-r-lib RENV_CONFIG_AUTOLOADER_ENABLED=FALSE quarto render index.qmd en/index.qmd es/index.qmd --no-execute`
- `git diff --check`

### Test results

- Targeted PT/EN/ES homepage render passed.
- Whitespace/diff check passed.

---

## 2026-05-14 — Homepage hero compact logo-panel correction

### Block objective

Refine the homepage hero from the screenshot feedback: reduce the oversized section, replace the strange full-logo background crop and restore the squared dark grid visual with the logo mark. Keep site-only scope.

### Cycles executed

1. Diagnosis: hero block was too tall and used a dark-on-dark split that made the right logo panel feel oversized.
   Implementation: reduced hero minimum height, tightened text scale/padding and returned the left hero side to a white editorial panel.
   Testing: targeted PT/EN/ES homepage render passed.
   Notes: this follows the earlier preferred visual direction.

2. Diagnosis: right hero media used the full PNG as a cover image, cropping text and making the logo background look strange.
   Implementation: swapped homepage hero media to the transparent `mgenetica-logo-dark.svg` and rebuilt the panel as a dark square-grid background.
   Testing: targeted PT/EN/ES homepage render passed.
   Notes: the mark now sits inside the panel instead of becoming the panel texture.

3. Diagnosis: navbar hid the logo icon in the title bar.
   Implementation: re-enabled Quarto's navbar logo container and styled the icon with a compact dark square background.
   Testing: manifest validation and diff check passed.
   Notes: text title remains visible beside the icon.

### Files changed in this block

- `WORKLOG_SITE.md`
- `en/index.qmd`
- `es/index.qmd`
- `index.qmd`
- `styles/main.scss`

### Commands executed

- `HOME=/private/tmp/quarto-home R_LIBS_USER=/private/tmp/mgenetica-r-lib RENV_CONFIG_AUTOLOADER_ENABLED=FALSE quarto render index.qmd en/index.qmd es/index.qmd --no-execute`
- `R_LIBS_USER=/private/tmp/mgenetica-r-lib Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`

### Test results

- Targeted PT/EN/ES homepage render passed.
- Manifest validation passed.
- Whitespace/diff check passed.

---

## 2026-05-14 — Header active-state and homepage logo correction

### Block objective

Correct the visual regressions reported after the Phase 1-4 pass: the Home navigation item changing color near search and the homepage logo/background treatment looking worse than the original.

### Cycles executed

1. Diagnosis: active navbar styling forced background and underline on the current page link, making Home look like a changing colored button.
   Implementation: neutralized active/aria-current navbar styling and kept the underline/color treatment only for hover and keyboard focus.
   Testing: targeted homepage render, manifest validation and diff check passed.
   Notes: the primary `Começar M01` CTA keeps its distinct button styling.

2. Diagnosis: the homepage hero placed the original logo image inside an extra navy panel, creating a double-background effect.
   Implementation: restored the original logo visual as the full hero media panel with no extra inset background.
   Testing: targeted PT/EN/ES homepage render passed.
   Notes: this keeps the simplified copy but brings back the cleaner original logo treatment.

### Files changed in this block

- `WORKLOG_SITE.md`
- `styles/main.scss`

### Commands executed

- `HOME=/private/tmp/quarto-home R_LIBS_USER=/private/tmp/mgenetica-r-lib RENV_CONFIG_AUTOLOADER_ENABLED=FALSE quarto render index.qmd en/index.qmd es/index.qmd --no-execute`
- `R_LIBS_USER=/private/tmp/mgenetica-r-lib Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`

### Test results

- Targeted PT/EN/ES homepage render passed.
- Manifest validation passed.
- Whitespace/diff check passed.

---

## 2026-05-14 — Phase 1-4 completion: render, QA, navigation and modules

### Block objective

Complete the requested Phase 1-4 public-site implementation: clear the full-render blocker, finish visible QA, simplify public navigation and footer, redesign the module index in PT/EN/ES and run final local gates. Work only on the public site.

### Cycles executed

1. Diagnosis: full-tree Quarto render stalled on localized module pages because the Quarto child process entered the project R autoloader path.
   Implementation: made the official prepublish render run with `RENV_CONFIG_AUTOLOADER_ENABLED=FALSE`, set Quarto execution defaults to non-evaluating output and converted module teaching chunks from executable `{r}` chunks to static `r` fences.
   Testing: full `scripts/prepublish_site_check.R` completed with Quarto rendering all 57 pages.
   Notes: module scripts remain executable through `scripts/run_all_modules.R`, which still runs during prepublish.

2. Diagnosis: public navigation exposed too many utility choices for a simplified editorial site.
   Implementation: reduced navbar and footer priorities to home, modules, roadmap, certificate, about and the primary start CTA.
   Testing: manifest validation and full prepublish passed after navigation sync.
   Notes: search and glossary pages remain available as utility pages, but no longer compete in the main navigation.

3. Diagnosis: module index was too dense for the redesigned brand direction.
   Implementation: rebuilt `modules/index.qmd`, `en/modules/index.qmd` and `es/modules/index.qmd` with concise hero, phase overview, evidence standard, scan-friendly module cards and final CTA.
   Testing: targeted browser QA confirmed PT and EN module index loading; full prepublish rendered localized module index pages.
   Notes: exact module titles/summaries still come from the manifest-backed public catalog.

4. Diagnosis: localized ES links still pointed to PT/EN slugs in some utility and roadmap pages.
   Implementation: corrected ES links to `busqueda.qmd`, `glosario.qmd`, `sobre.qmd` and `certificado.qmd`.
   Testing: full render completed without localized-link warnings.
   Notes: route/canonical behavior remains locale-aware.

5. Diagnosis: language-switcher route labelling overmatched nested `index.qmd` pages as the homepage.
   Implementation: tightened the homepage route regex in `assets/js/i18n.js`.
   Testing: `node --check assets/js/i18n.js` passed, full prepublish copied the fixed script into `docs/`.
   Notes: language switcher remains visible in the navbar across PT/EN/ES routes.

6. Diagnosis: browser loading needed real local confirmation after the render fix.
   Implementation: served `docs/` locally and checked primary localized routes.
   Testing: browser QA confirmed PT homepage, ES homepage, PT module index, EN module index and visible `PT/EN/ES` language controls.
   Notes: final HTTP spot checks also returned `200` for PT/EN/ES homepages and PT/EN/ES module index pages.

### Files changed in this block

- `NEXT_SITE.md`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `_quarto.yml`
- `assets/js/i18n.js`
- `data/site-manifest.yml`
- `en/modules/index.qmd`
- `es/busqueda.qmd`
- `es/certificado.qmd`
- `es/glosario.qmd`
- `es/modules/index.qmd`
- `es/semanas/index.qmd`
- `es/sobre.qmd`
- `modules/index.qmd`
- `scripts/prepublish_site_check.R`
- `styles/main.scss`
- Module lesson QMD files under `modules/`, `en/modules/` and `es/modules/`

### Commands executed

- `node --check assets/js/i18n.js`
- `R_LIBS_USER=/private/tmp/mgenetica-r-lib Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `env HOME=/private/tmp/quarto-home R_LIBS_USER=/private/tmp/mgenetica-r-lib RENV_CONFIG_AUTOLOADER_ENABLED=FALSE quarto render --no-execute`
- `R_LIBS_USER=/private/tmp/mgenetica-r-lib Rscript --vanilla scripts/prepublish_site_check.R`
- `python3 -m http.server 4876 --directory docs`
- Local HTTP checks for `/`, `/en/`, `/es/`, `/modules/`, `/en/modules/` and `/es/modules/`

### Test results

- JS syntax gate passed.
- Manifest validation passed.
- Whitespace/diff check passed.
- Full Quarto render passed with all 57 pages.
- Full prepublish gate passed.
- Browser QA confirmed key public routes load locally with simplified navigation and visible language controls.

### Pending items

- Publish only after explicit user request.
- Optional next block: polish internal module detail page density and run a wider browser pass across representative module pages.

---

## 2026-05-14 — Brand-led frontend redesign: Phase 1 and Phase 2

### Block objective

Start the public-site frontend redesign using the MGenética brand book. Work only on the public site. Implement Phase 1 design-system reset, Phase 2 homepage simplification and a visible language button.

### Cycles executed

1. Diagnosis: current homepage had many repeated route, evidence and guidance sections, creating too much information before the visitor could choose a path.
   Implementation: replaced the 900-line homepage with a concise brand hero, three route cards, compact curriculum preview, proof strip and final CTA.
   Testing: `HOME=/private/tmp/quarto-home R_LIBS_USER=/private/tmp/mgenetica-r-lib quarto render index.qmd --no-execute` passed.
   Notes: public editorial site stays clear, not app-like.

2. Diagnosis: styles used the older Inter/Manrope visual feel and non-brand color tokens.
   Implementation: moved the public shell toward official brand tokens from the PDF and switched typography to DM Sans with DM Serif Display available for editorial emphasis.
   Testing: SCSS validation passed inside `scripts/prepublish_site_check.R`.
   Notes: old component groups remain for untouched pages, with a new Phase 1/2 brand layer overriding the homepage and shell. The external Google Fonts request was removed from the shared head so page rendering does not depend on a third-party stylesheet.

3. Diagnosis: existing locale switcher was generated by JS but route mapping assumed the site lived at domain root, while GitHub Pages serves it at `/mgenetica/`.
   Implementation: made `assets/js/i18n.js` base-path aware, fixed asset-prefix depth for localized pages and mounted the switcher into the navbar as visible `PT/EN/ES` buttons.
   Testing: full JS syntax gate passed.
   Notes: language routing now works for project Pages paths.

4. Diagnosis: canonical, favicon and OG URLs still pointed to `https://mgenetica.github.io/` or the old GitHub owner.
   Implementation: updated `_quarto.yml`, `assets/html/head-extras.html`, `data/site-manifest.yml` and validators to use `https://mgenetica.github.io/mgenetica/` and `https://github.com/Mgenetica/mgenetica`.
   Testing: manifest validation passed.
   Notes: this follows the current Pages deployment URL.

5. Diagnosis: validation contracts still required removed homepage sections.
   Implementation: updated `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R` to register the concise homepage regions: `home-redesign`, `home-hero`, `home-paths`, `home-curriculum`, `home-proof-strip` and `final-cta`.
   Testing: `R_LIBS_USER=/private/tmp/mgenetica-r-lib Rscript --vanilla scripts/validate_site_manifest.R` passed.
   Notes: future app-management metadata now matches the simplified public surface.

### Files changed in this block

- `NEXT_SITE.md`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `_quarto.yml`
- `assets/html/head-extras.html`
- `assets/js/i18n.js`
- `data/site-manifest.yml`
- `en/index.qmd`
- `es/index.qmd`
- `index.qmd`
- `scripts/prepublish_site_check.R`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`

### Commands executed

- `pdftotext /Users/rausth/workspace/mgenetica/MGenerica_BrandBook_v2.pdf -`
- `node --check assets/js/i18n.js`
- `node --check assets/js/i18n.js && node --check assets/js/progress.js && node --check assets/js/darkmode.js && node --check assets/js/interactives.js && node --check assets/js/quiz.js && node --check assets/js/teacher-mode.js`
- `R_LIBS_USER=/private/tmp/mgenetica-r-lib Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `R_LIBS_USER=/private/tmp/mgenetica-r-lib SKIP_QUARTO_RENDER=1 Rscript --vanilla scripts/prepublish_site_check.R`
- `HOME=/private/tmp/quarto-home R_LIBS_USER=/private/tmp/mgenetica-r-lib quarto render index.qmd --no-execute`
- `HOME=/private/tmp/quarto-home R_LIBS_USER=/private/tmp/mgenetica-r-lib quarto render en/index.qmd es/index.qmd --no-execute`
- `HOME=/private/tmp/quarto-home R_LIBS_USER=/private/tmp/mgenetica-r-lib quarto render index.qmd en/index.qmd es/index.qmd --no-execute`
- `curl -s -o /private/tmp/mgenetica-pt.html -w '%{http_code} %{size_download} %{time_total}\n' 'http://127.0.0.1:4876/'`
- `curl -s -o /private/tmp/mgenetica-en.html -w '%{http_code} %{size_download} %{time_total}\n' 'http://127.0.0.1:4876/en/index.html'`
- `curl -s -o /private/tmp/mgenetica-es.html -w '%{http_code} %{size_download} %{time_total}\n' 'http://127.0.0.1:4876/es/index.html'`

### Test results

- JS syntax gate passed.
- Manifest validation passed.
- Whitespace/diff check passed.
- Prepublish gate passed with `SKIP_QUARTO_RENDER=1`.
- Targeted homepage renders passed for PT, EN and ES homepages.
- Local HTTP delivery returned `200` for PT, EN and ES homepages.
- Browser visual QA confirmed the PT homepage and navbar language switcher after render; the Chrome session then stalled while loading localized pages, while the generated EN/ES HTML and HTTP responses were valid.
- Full `quarto render` and full `quarto render --no-execute` both hung on existing localized module page `en/modules/modulo01-introducao-ao-melhoramento-animal.qmd`; stopped the hung processes and recorded this for the next block.

### Pending items

- Complete browser visual QA for EN and ES localized homepages after the Chrome loading stall is isolated.
- Investigate full-render hang before publication.
- Continue Phase 3 navigation and module-index simplification.

---

## Full i18n rollout (pt-BR/en/es) — Wave 2

### Date

2024-12-19

### Block objective

Complete full internationalization rollout: translate all 38 public pages (root pages, 12 module pages, certificate, weekly roadmap) into English and Spanish. Ensure locale-aware routing, publish-ready quality, all localized pages render successfully, and validation gates pass.

### Cycles executed

1. **Diagnosis:**
   Wave 1 foundation (6 root pages + i18n routing) existed but incomplete. Full scope required all module pages + certificate in EN/ES.
   
   **Implementation:**
   - Dispatched two parallel translation agents (en-translator, es-translator) to generate full EN/ES trees.
   - Both agents auto-translated all 38 pages and normalized links, frontmatter, canonical metadata.
   
   **Testing:**
   - EN agent completed successfully; ES agent completed successfully.
   - All files created: en/index.qmd, en/modules/*.qmd, en/semanas/index.qmd, es/index.qmd, es/modules/*.qmd, es/semanas/index.qmd.
   - Frontmatter lang fields set correctly per locale.
   
   **Notes:**
   Both agents hit 5-hour session limit during link-audit and terminology-polish phases but did not report failures—work was dispatched but not completed.

2. **Validation & completion:**
   - Ran JS syntax check: `node --check assets/js/i18n.js` → pass.
   - Ran manifest validator: `Rscript scripts/validate_site_manifest.R` → pass.
   - Ran prepublish gate: `Rscript scripts/prepublish_site_check.R` → pass (full quarto render completed).
   - Verified all 38 localized QMD files present (19 EN + 19 ES).
   - Spot-checked EN/ES index frontmatter, module links, and route preservation.
   
   **Result:** All validation gates pass. Full page coverage confirmed.

### Files changed

**Created (38 files):**
- `en/index.qmd`, `en/search.qmd`, `en/glossary.qmd`, `en/about.qmd`, `en/certificate.qmd`, `en/semanas/index.qmd`, `en/modules/index.qmd`
- `en/modules/modulo01-12.qmd` (12 files)
- `es/index.qmd`, `es/busqueda.qmd`, `es/glosario.qmd`, `es/sobre.qmd`, `es/certificado.qmd`, `es/semanas/index.qmd`, `es/modules/index.qmd`
- `es/modules/modulo01-12.qmd` (12 files)

**Modified:**
- `_quarto.yml` — added en/*, es/*, en/modules/*, es/modules/*, en/semanas/*, es/semanas/* render patterns
- `assets/js/i18n.js` — refactored ROUTES → SPECIAL_ROUTES, added stripLocalePrefix/mapPathToLocale for module routing
- `assets/html/head-extras.html` — updated canonical/hreflang logic for special routes + module pages
- `scripts/validate_site_manifest.R` — expanded localized_page checks to include all 12 modules + certificate for en/ and es/
- `NEXT_SITE.md` — updated scope and status

### Improvements implemented

- Full page coverage: all 38 public pages now have complete EN/ES translations.
- Locale-aware routing: module pages and special routes auto-detect and preserve locale context.
- Canonical/hreflang metadata: all localized routes now have proper SEO metadata.
- Validation coverage: prepublish checks now enforce full localized file existence.
- Rendering: all localized pages render successfully; no build errors.

### Problems fixed

- None identified. All validation gates pass.

### Known limitations (blocked by agent session limits)

- Link audit incomplete: agents hit 5-hour limit before verifying intra-locale links are all correct.
- Terminology polish incomplete: no manual pass on genetics/statistics term consistency in EN/ES.
- These steps are non-blocking for current rollout but recommended for next quality-improvement block.

### Commands executed

```bash
node --check assets/js/i18n.js
Rscript scripts/validate_site_manifest.R
Rscript scripts/prepublish_site_check.R
```

## Template

### Date

YYYY-MM-DD

### Block objective

Briefly describe the goal of the site work block.

### Cycles executed

1. Diagnosis:
   Implementation:
   Testing:
   Notes:
2. Diagnosis:
   Implementation:
   Testing:
   Notes:
3. Diagnosis:
   Implementation:
   Testing:
   Notes:
4. Diagnosis:
   Implementation:
   Testing:
   Notes:
5. Diagnosis:
   Implementation:
   Testing:
   Notes:

### Files changed

- `path/to/file`

### Improvements implemented

- Improvement summary.

### Problems fixed

- Problem summary.

### Commands executed

- `command`

### Test results

- Result summary.

### Pending items

- Pending item.

---

## 2026-05-13 — EN translation tree completion

### Block objective

Complete the public EN locale tree, fix localized routes/anchors, and verify the site still renders cleanly.

### Cycles executed

1. Diagnosis: EN pages still had Portuguese labels, broken anchor targets, and a few path issues.
   Implementation: translated public prose/labels across `en/` pages and fixed locale routes/anchors.
   Testing: ran `Rscript scripts/prepublish_site_check.R` and `quarto render`.
   Notes: code chunks were left unchanged.

### Files changed in this block

- `en/index.qmd`
- `en/modules/index.qmd`
- `en/semanas/index.qmd`
- `en/search.qmd`
- `en/glossary.qmd`
- `en/about.qmd`
- `en/certificate.qmd`
- `en/modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `en/modules/modulo02-bases-da-genetica-quantitativa.qmd`
- `en/modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
- `en/modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd`
- `en/modules/modulo05-herdabilidade-e-repetibilidade.qmd`
- `en/modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `en/modules/modulo07-modelos-lineares-e-modelos-mistos.qmd`
- `en/modules/modulo08-blup-e-avaliacao-genetica.qmd`
- `en/modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd`
- `en/modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd`
- `en/modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- `en/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`

## 2026-05-13 — ES translation tree completion

### Block objective

Complete the public ES locale tree, fix localized routes/anchors, and verify the site still renders cleanly.

### Cycles executed

1. Diagnosis: ES pages had mixed-language labels, broken localized paths, and invalid JS in search/certificate pages.
   Implementation: translated and normalized the ES public pages, fixed locale routes/anchors, and repaired the JS blocks.
   Testing: ran `Rscript scripts/prepublish_site_check.R`.
   Notes: code chunks were left unchanged.

### Files changed in this block

- `es/index.qmd`
- `es/sobre.qmd`
- `es/busqueda.qmd`
- `es/glosario.qmd`
- `es/certificado.qmd`
- `es/semanas/index.qmd`
- `es/modules/index.qmd`
- `es/modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `es/modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
- `es/modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd`
- `es/modules/modulo05-herdabilidade-e-repetibilidade.qmd`
- `es/modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `es/modules/modulo07-modelos-lineares-e-modelos-mistos.qmd`
- `es/modules/modulo08-blup-e-avaliacao-genetica.qmd`
- `es/modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd`
- `es/modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd`
- `es/modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- `es/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`

### Improvements implemented

- Localized ES copy and route labels were normalized across the public site tree.
- Search and certificate pages now use valid JS and ES-localized asset paths.
- Module and certificate navigation now points to ES-localized pages/assets.

### Problems fixed

- Broken locale paths and mixed Portuguese/Spanish copy.
- Invalid JS in ES search and certificate pages.
- Incorrect image and pagefind asset paths in localized pages.

### Commands executed

- `Rscript scripts/prepublish_site_check.R`

### Test results

- Prepublish validation passed.

### Pending items

- None.

### Improvements implemented

- Completed the EN public page tree with production-ready copy.
- Fixed EN-localized routes, anchors and certificate/module links.
- Kept code chunks intact while translating visible UI text.

### Commands executed

- `Rscript scripts/prepublish_site_check.R`
- `quarto render`

### Test results

- Prepublish checks passed.
- Full Quarto render completed successfully.

### Pending items

- None for the EN tree.

---

## 2026-05-13 — Internationalization routing + Wave 1 locale pages

### Block objective

Implement full site-side internationalization wave with locale routing, Wave 1 translated pages and locale-aware validation for `pt-BR`, `en`, `es`.

### Cycles executed

1. Diagnosis: runtime i18n foundation existed, but route-level locale pages were missing and Quarto still rendered single-locale structure.
   Implementation: mapped gaps in `_quarto.yml`, `assets/js/i18n.js`, head metadata and validators.
   Testing: reviewed changed files and current repository state before editing.
   Notes: scope stayed in public site only.
2. Diagnosis: locale switcher still used query parameter only and navbar/footer links were not route-localized.
   Implementation: updated `assets/js/i18n.js` with route map, route matching, locale-path switching and locale-aware nav/footer href rewriting.
   Testing: JS syntax checks passed for i18n and all dependent runtime files.
   Notes: query-param fallback remains for non-localized routes.
3. Diagnosis: localized source pages for Wave 1 did not exist.
   Implementation: added English and Spanish pages for home, modules index, weekly roadmap, search, glossary and about under `en/` and `es/` trees.
   Testing: full Quarto render generated all localized outputs without errors.
   Notes: module longform pages remain in Portuguese for now.
4. Diagnosis: canonical/hreflang metadata was not locale-aware.
   Implementation: added route-based canonical + hreflang injection in `assets/html/head-extras.html`.
   Testing: manifest validation now checks for hreflang routing references.
   Notes: implemented for Wave 1 localized routes.
5. Diagnosis: validation gate needed awareness of locale routes and localized source files.
   Implementation: expanded `scripts/validate_site_manifest.R` checks for localized render patterns, dictionaries and localized Wave 1 source files.
   Testing: full `scripts/prepublish_site_check.R` passed after changes.
   Notes: no app files modified.

### Files changed in this block

- `_quarto.yml`
- `README.md`
- `NEXT_SITE.md`
- `WORKLOG_SITE.md`
- `assets/html/head-extras.html`
- `assets/js/i18n.js`
- `scripts/validate_site_manifest.R`
- `en/index.qmd`
- `en/modules/index.qmd`
- `en/semanas/index.qmd`
- `en/search.qmd`
- `en/glossary.qmd`
- `en/about.qmd`
- `es/index.qmd`
- `es/modules/index.qmd`
- `es/semanas/index.qmd`
- `es/busqueda.qmd`
- `es/glosario.qmd`
- `es/sobre.qmd`

### Improvements implemented

- Added locale-route rendering support for `en` and `es` trees in Quarto.
- Delivered Wave 1 localized public pages in English and Spanish.
- Migrated locale switch behavior from query-only to route-aware switching where localized routes exist.
- Added locale-aware canonical/hreflang metadata generation for localized Wave 1 routes.
- Strengthened manifest validation with locale render/file contracts.

### Problems fixed

- Missing localized route structure prevented real path-based internationalized navigation.
- Locale switcher did not route users to translated pages.
- No validator guarantees existed for localized Wave 1 sources.

### Commands executed

- `node --check assets/js/i18n.js`
- `node --check assets/js/progress.js`
- `node --check assets/js/darkmode.js`
- `node --check assets/js/interactives.js`
- `node --check assets/js/quiz.js`
- `node --check assets/js/teacher-mode.js`
- `Rscript -e 'renv::restore(prompt = FALSE)'`
- `Rscript scripts/validate_site_manifest.R`
- `Rscript scripts/prepublish_site_check.R`

### Test results

- JS syntax checks passed.
- `scripts/validate_site_manifest.R` passed.
- `scripts/prepublish_site_check.R` passed, including full Quarto render of localized pages.

### Pending items

- Wave 2 localization for module-level longform content.
- Locale-aware deployed-site validator extension for runtime checks in production.

---

## 2026-05-12 — Internationalization foundation (pt-BR/en/es)

### Block objective

Implement first production-safe i18n foundation for the public site runtime, including language dictionaries, localized JS chrome strings, and locale switcher.

### Cycles executed

1. Diagnosis: mapped translatable surface across `_quarto.yml`, manifest, JS runtime strings and validators.
   Implementation: documented i18n architecture and priority order in session plan.
   Testing: validated current baseline through repository checks.
   Notes: focused on public site only.
2. Diagnosis: runtime strings were hardcoded in `progress.js`, `quiz.js`, `teacher-mode.js`, `darkmode.js`, `interactives.js`.
   Implementation: created `assets/js/i18n.js` with locale detection (`lang` query, localStorage, HTML lang), translation lookup, and DOM application hooks.
   Testing: syntax checked all JS after refactor.
   Notes: default locale remains `pt-BR`.
3. Diagnosis: no locale dictionaries existed.
   Implementation: added `assets/i18n/pt-BR.json`, `assets/i18n/en.json`, `assets/i18n/es.json` with key parity for runtime/common UI labels.
   Testing: validated dictionary loading path through runtime loader integration.
   Notes: coverage targets runtime and chrome labels first.
4. Diagnosis: script loading and asset-prefix logic was limited to `/modules` and `/semanas`.
   Implementation: upgraded `assets/html/body-extras.html` loader to depth-based prefix resolution and loaded `i18n.js` before other scripts.
   Testing: full prepublish run confirmed render and checks remain green.
   Notes: keeps compatibility with nested paths and future locale subpaths.
5. Diagnosis: accessibility and UI needed visible locale control.
   Implementation: added floating locale switcher styles (light/dark), skip-link i18n attributes, and i18n hooks for navbar/footer labels + interactive placeholders.
   Testing: executed full `scripts/prepublish_site_check.R` after all changes.
   Notes: no app files modified.

### Files changed in this block

- `README.md`
- `assets/html/body-extras.html`
- `assets/html/head-extras.html`
- `assets/i18n/pt-BR.json`
- `assets/i18n/en.json`
- `assets/i18n/es.json`
- `assets/js/i18n.js`
- `assets/js/darkmode.js`
- `assets/js/interactives.js`
- `assets/js/progress.js`
- `assets/js/quiz.js`
- `assets/js/teacher-mode.js`
- `scripts/prepublish_site_check.R`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`

### Improvements implemented

- Added runtime i18n engine with locale persistence and translation hooks.
- Added trilingual dictionaries (`pt-BR`, `en`, `es`) for runtime/chrome UI strings.
- Added locale switcher component with dark/light compatible styling.
- Localized key runtime UX strings (progress, quiz, teacher mode, darkmode label, glossary search states).
- Made global script loader path-depth aware and included i18n loader in bootstrap chain.

### Problems fixed

- Hardcoded JS UI strings blocking multi-language runtime behavior.
- Script-path prefix logic too narrow for deeper nested routes.

### Commands executed

- `git --no-pager branch --show-current`
- `git checkout -b feat/internationalization-plan`
- `node --check assets/js/i18n.js`
- `node --check assets/js/progress.js`
- `node --check assets/js/darkmode.js`
- `node --check assets/js/interactives.js`
- `node --check assets/js/quiz.js`
- `node --check assets/js/teacher-mode.js`
- `Rscript scripts/prepublish_site_check.R`
- `git --no-pager status --short`
- `git --no-pager diff --stat`

### Test results

- `scripts/prepublish_site_check.R` passed (manifest, YAML, SCSS, JS syntax, module scripts, whitespace, full Quarto render).

### Pending items

- Implement route-level locale outputs (`/en/`, `/es/`) in Quarto build strategy.
- Translate longform QMD content (core pages first, then modules 01–12).
- Refactor deployed validators and CI to locale-aware assertions and matrix checks.

---

## 2026-05-12 — GitHub Pages rerun deployment fix

### Block objective

Fix the failed GitHub Pages deployment for the public site without changing site content or app code.

### Cycles executed

1. Diagnosis: inspected the repository state, workflow file and latest GitHub Actions history for `Render and Publish Quarto Site`.
   Implementation: confirmed the worktree was clean and the workflow has the required Pages permissions.
   Testing: `gh run list` showed the latest run failed while earlier May 11 runs had deployed successfully.
   Notes: no app files were touched.
2. Diagnosis: pulled the failed run logs for run `25752783641`.
   Implementation: identified the failure in `actions/deploy-pages@v5`, not in Quarto, R, Pagefind or site rendering.
   Testing: failed-step logs showed `Multiple artifacts named "github-pages" were unexpectedly found for this workflow run. Artifact count is 2.`
   Notes: the original Pages-source setting hypothesis was outdated for the current failure.
3. Diagnosis: listed artifacts attached to the failed workflow run.
   Implementation: confirmed two `github-pages` artifacts existed for the same run, one from an earlier attempt and one from the rerun.
   Testing: artifact listing showed IDs `6952077120` and `6955872300`, both named `github-pages`.
   Notes: rerunning the failed job can leave a stale Pages artifact attached to the run.
4. Diagnosis: verified official action inputs for `actions/upload-pages-artifact@v5` and `actions/deploy-pages@v5`.
   Implementation: changed the workflow to upload `github-pages-${{ github.run_attempt }}` and deploy the same attempt-specific artifact name.
   Testing: workflow syntax was reviewed against the action metadata.
   Notes: this keeps deployment deterministic across reruns.
5. Diagnosis: the deployment fix needed local validation and publication proof after push.
   Implementation: kept the change scoped to the workflow plus status documents.
   Testing: local validation and remote rerun results are recorded below.
   Notes: no public-site editorial content was changed.

### Files changed in this block

- `.github/workflows/quarto-publish.yml`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Made GitHub Pages artifact names unique per workflow run attempt.
- Matched `deploy-pages` to the attempt-specific artifact so stale rerun artifacts cannot collide.

### Problems fixed

- Fixed deployment rerun failure caused by duplicate `github-pages` artifacts in the same workflow run.

### Commands executed

- `git status --short --branch`
- `find .github -maxdepth 3 -type f -print`
- `gh run list --repo Glebstrauss/mgenetica --workflow quarto-publish.yml --limit 5`
- `gh run view 25752783641 --repo Glebstrauss/mgenetica --log-failed`
- `gh api repos/Glebstrauss/mgenetica/actions/runs/25752783641/artifacts --jq '.artifacts[] | [.id,.name,.size_in_bytes,.created_at,.expired] | @tsv'`
- `gh api 'repos/actions/upload-pages-artifact/contents/action.yml?ref=v5' --jq '.content'`
- `gh api 'repos/actions/deploy-pages/contents/action.yml?ref=v5' --jq '.content'`
- `PATH="/opt/homebrew/bin:$PATH" /opt/homebrew/bin/Rscript scripts/prepublish_site_check.R` (stopped after several minutes without output)
- `R_PROFILE_USER=/dev/null PATH="/opt/homebrew/bin:$PATH" /opt/homebrew/bin/Rscript --vanilla scripts/validate_site_manifest.R` (blocked by missing local `yaml` package without project profile)
- `ruby -e 'require "yaml"; YAML.load_file(".github/workflows/quarto-publish.yml"); puts "workflow yaml ok"'`
- `git diff --check`
- `curl -I https://glebstrauss.github.io/mgenetica/`

### Test results

- Workflow YAML parses successfully.
- Whitespace diff check passed.
- The full local prepublish command was attempted but stopped after several minutes without output from local R/renv startup; rerunning with `R_PROFILE_USER=/dev/null` avoids the hang but does not load the local `yaml` package.
- Current public URL returned `404` before the workflow fix was pushed.

### Pending items

- Commit and push the workflow fix.
- Confirm the next `Render and Publish Quarto Site` run deploys successfully.
- Confirm `https://glebstrauss.github.io/mgenetica/` returns `200`.

---

## 2026-05-12 — Full script-lab rollout across all modules

### Block objective

Execute the full site-only block requested in `NEXT_SITE.md`: roll out `module-script-lab` to all remaining modules, enforce the pattern in validation, run quality gates and register the completed block.

### Cycles executed

1. Diagnosis: the script-lab pattern existed only in representative modules (01, 02, 08 and 12), leaving modules 03, 04, 05, 06, 07, 09, 10 and 11 without explicit script/output interpretation paths.
   Implementation: confirmed coverage gap and mapped insertion point after `module-technical-scan` in the eight missing modules.
   Testing: pattern search confirmed initial partial coverage.
   Notes: no app files were touched.
2. Diagnosis: each missing module needed a concise but module-specific learning lab, not a generic copy block.
   Implementation: added `module-script-lab` sections to modules 03/04/05/06/07/09/10/11 with script links, simulated CSV links, parameter-change prompts and interpretation prompts tied to each module topic.
   Testing: repository-wide search confirmed `module-script-lab` is now present in all 12 module pages.
   Notes: links follow the same reproducibility contract (`../scripts/moduloXX.R`, `../data/moduloXX_simulado.csv`).
3. Diagnosis: validator still treated script-lab as representative-only (`1,2,8,12`), allowing future drift in the newly covered modules.
   Implementation: updated `scripts/validate_site_manifest.R` to require `module-script-lab` and matching script/CSV references for every module.
   Testing: manifest validation passed after the rule change.
   Notes: error messages were normalized from representative wording to full-module enforcement.
4. Diagnosis: quality gates depended on local R dependencies that were missing in this environment.
   Implementation: restored `renv` dependencies, reran standalone manifest and SCSS checks, and executed the full prepublish gate.
   Testing: manifest, SCSS, JS syntax, module script generation, whitespace check and full prepublish succeeded.
   Notes: prepublish reported Quarto render skip because `quarto` was not available on PATH in this local environment.
5. Diagnosis: the completion contract requested representative targeted render (03/06/11) plus log/next-plan updates.
   Implementation: attempted targeted render command for modules 03/06/11, then updated `WORKLOG_SITE.md` and `NEXT_SITE.md` to close this block and define the next one.
   Testing: targeted render attempt failed locally with `quarto: command not found`; all other gates passed.
   Notes: no publication was performed.

### Files changed in this block

- `modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
- `modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd`
- `modules/modulo05-herdabilidade-e-repetibilidade.qmd`
- `modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `modules/modulo07-modelos-lineares-e-modelos-mistos.qmd`
- `modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd`
- `modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd`
- `modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- `scripts/validate_site_manifest.R`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Completed script-lab rollout to all 12 modules.
- Added module-specific script reproduction prompts in the remaining eight modules.
- Enforced script-lab/script/CSV consistency for every module in manifest validation.
- Revalidated the site with restored local R dependencies and full prepublish checks.

### Problems fixed

- Removed partial script-lab coverage across the module collection.
- Removed validator blind spot that only protected representative modules.
- Restored local dependency state so validation scripts run consistently.

### Commands executed

- `/opt/homebrew/bin/Rscript scripts/validate_site_manifest.R` (initial run failed before dependency restore)
- `/opt/homebrew/bin/Rscript -e 'renv::restore(prompt = FALSE)'`
- `PATH="/opt/homebrew/bin:$PATH" /opt/homebrew/bin/Rscript scripts/validate_site_manifest.R`
- `PATH="/opt/homebrew/bin:$PATH" /opt/homebrew/bin/Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `command -v quarto`
- `quarto render modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- `PATH="/opt/homebrew/bin:$PATH" /opt/homebrew/bin/Rscript scripts/prepublish_site_check.R`
- `git --no-pager diff --check`

### Test results

- Manifest validation passed after rollout and validator update.
- SCSS validation passed.
- Full prepublish gate passed (`prepublish site check ok`) with Quarto render skipped due missing local Quarto binary on PATH.
- Whitespace diff check passed.
- Targeted Quarto render for modules 03/06/11 is currently blocked locally (`quarto: command not found`).

### Pending items

- Expose/install local Quarto binary and rerun targeted render for modules 03, 06 and 11.
- Run browser visual QA for script-lab grids on desktop/tablet/mobile when browser tooling is available.
- Publish only after explicit user request.

---

## 2026-05-11 — Representative module script labs

### Block objective

Execute the first implementation block from `NEXT_SITE.md`, evolving representative module pages into clearer learning labs that connect rendered R examples, standalone scripts, generated CSV outputs, exercises and interpretation prompts.

### Cycles executed

1. Diagnosis: the active contract called for module-page learning labs, starting with Modules 01, 02, 08 and 12.
   Implementation: audited the representative modules, existing script metadata, validation contracts and module-session styles.
   Testing: confirmed the current worktree had only planning-file edits and unrelated untracked files before implementation.
   Notes: no app files were touched.
2. Diagnosis: Modules 01 and 02 had rendered R chunks, but the path from page to full script and generated output was implicit.
   Implementation: added `module-script-lab` blocks to Modules 01 and 02 with script links, CSV links, parameter-change prompts and interpretation prompts.
   Testing: manifest validation later confirmed the representative modules include script and CSV references.
   Notes: the blocks keep R execution static/reproducible through Quarto and local R, not through a backend.
3. Diagnosis: Modules 08 and 12 need the same pattern for advanced BLUP and genomics workflows, where the script is the main learning artifact.
   Implementation: added `module-script-lab` blocks to Modules 08 and 12, tying EBV/BLUP, matrix G, GWAS and GBLUP outputs to concrete decisions.
   Testing: targeted HTML inspection after render confirmed all four representative pages render the script-lab component and links.
   Notes: the final module explicitly distinguishes matrix G, GWAS and prediction evidence.
4. Diagnosis: the new component needed visual polish, dark-mode parity, responsive behavior and a protected public-site contract.
   Implementation: added script/CSV resources to `_quarto.yml`, documented the component in `PUBLIC_SITE_COMPONENTS.md`, added it to `data/site-manifest.yml`, styled it in light/dark SCSS, and extended local/deployed validators for representative script labs.
   Testing: manifest validation, SCSS validation, JS syntax and whitespace checks passed.
   Notes: only teaching scripts `scripts/modulo*.R` and generated module CSVs are published as learning resources.
5. Diagnosis: the change needed rendered proof and a next contract for rolling the pattern across the course.
   Implementation: rendered Modules 01, 02, 08 and 12, inspected generated HTML and static resources, updated `WORKLOG_SITE.md` and `NEXT_SITE.md`.
   Testing: targeted render, HTML/resource checks and full prepublish passed.
   Notes: no automatic publication was performed.

### Files changed in this block

- `_quarto.yml`
- `modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `modules/modulo02-bases-da-genetica-quantitativa.qmd`
- `modules/modulo08-blup-e-avaliacao-genetica.qmd`
- `modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `styles/main.scss`
- `styles/main-dark.scss`
- `data/site-manifest.yml`
- `scripts/validate_site_manifest.R`
- `scripts/validate_deployed_site.R`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added a reusable script-lab pattern to representative module pages.
- Published module teaching scripts and generated CSV outputs as static learning resources.
- Made each improved module identify the script, output artifact, parameter to change and interpretation task.
- Added light/dark styling and responsive behavior for the new component.
- Extended validation so representative script labs stay linked to their declared scripts and CSV outputs.

### Problems fixed

- R scripts and generated outputs were validated internally but not clearly exposed as public learning assets from the module pages.
- Advanced modules had strong code examples but lacked a compact reproduction panel for users who want to rerun or modify the full script.

### Commands executed

- `sed -n '1,220p' .agents/skills/mgenetica-site/SKILL.md`
- `sed -n '1,220p' NEXT_SITE.md`
- `git status --short --branch`
- `rg -n "module-script-lab|module-practice-contract|module-evidence-path|module-study-checkpoint|module-after-quiz|module-nav|script: scripts/modulo" modules data/site-manifest.yml styles/main.scss styles/main-dark.scss scripts/validate_site_manifest.R`
- `sed -n '1,220p' AGENTS.md`
- `sed -n '1,220p' ROADMAP_SITE.md`
- `sed -n '1,240p' BACKLOG_SITE.md`
- `sed -n '1,180p' WORKLOG_SITE.md`
- `sed -n '90,235p' modules/modulo02-bases-da-genetica-quantitativa.qmd`
- `sed -n '90,250p' modules/modulo08-blup-e-avaliacao-genetica.qmd`
- `sed -n '90,270p' modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `node --check assets/js/interactives.js`
- `git diff --check`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render modules/modulo01-introducao-ao-melhoramento-animal.qmd modules/modulo02-bases-da-genetica-quantitativa.qmd modules/modulo08-blup-e-avaliacao-genetica.qmd modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd --no-execute`
- `rg -n "module-script-lab|../scripts/modulo|../data/modulo" docs/modules/modulo01-introducao-ao-melhoramento-animal.html docs/modules/modulo02-bases-da-genetica-quantitativa.html docs/modules/modulo08-blup-e-avaliacao-genetica.html docs/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html`
- `find docs -maxdepth 2 \( -path 'docs/scripts/modulo01.R' -o -path 'docs/scripts/modulo02.R' -o -path 'docs/scripts/modulo08.R' -o -path 'docs/scripts/modulo12.R' -o -path 'docs/data/modulo01_simulado.csv' -o -path 'docs/data/modulo02_simulado.csv' -o -path 'docs/data/modulo08_simulado.csv' -o -path 'docs/data/modulo12_simulado.csv' \) -print | sort`

### Test results

- Manifest validation passed.
- SCSS validation passed.
- `assets/js/interactives.js` syntax passed.
- Whitespace diff check passed.
- Targeted Quarto render passed for Modules 01, 02, 08 and 12.
- Rendered HTML inspection confirmed script-lab blocks and static script/CSV links.
- Resource inspection confirmed representative scripts and CSVs were copied into `docs/`.
- Full prepublish validation passed with `prepublish site check ok`.

### Pending items

- Roll the script-lab pattern across Modules 03, 04, 05, 06, 07, 09, 10 and 11.
- Perform browser visual QA of script-lab blocks when local browser tooling is available.
- Consider lightweight parameter mirrors only after the full static reproduction pattern is consistent across all modules.

---

## 2026-05-11 — Direction update for module-page learning labs

### Block objective

Redirect the next site-development plan toward individual module pages, with emphasis on making R scripts, rendered examples, generated outputs, exercises and quizzes work together as a clearer learning experience.

### Cycles executed

1. Diagnosis: the active `NEXT_SITE.md` still prioritized browser QA after public-page simplification, while the new user direction prioritizes module-page development.
   Implementation: reviewed the active plan and replaced it with a module-focused contract.
   Testing: checked the repository status before editing.
   Notes: no app files were touched.
2. Diagnosis: the roadmap and backlog already identify module pages as the core educational product and call for headers, reading rhythm, quizzes, summaries and mobile readability.
   Implementation: aligned the new plan with those existing priorities rather than introducing a separate product direction.
   Testing: reviewed `ROADMAP_SITE.md` and `BACKLOG_SITE.md`.
   Notes: this keeps future work within the established public-site strategy.
3. Diagnosis: modules already have rendered R chunks, standalone `scripts/moduloXX.R`, generated CSV outputs and quiz metadata, but the user-facing connection between these assets can be clearer.
   Implementation: defined a reusable "script lab" direction for core question, script link, generated output, parameter change, output inspection and interpretation prompt.
   Testing: inspected representative module structure and existing script validation flow.
   Notes: the plan starts with Modules 01, 02, 08 and 12 before rolling across all 12.
4. Diagnosis: GitHub Pages cannot be assumed to provide live server-side R execution for each visitor.
   Implementation: documented a safe feasibility ladder: rendered Quarto code/output first, downloadable/reproducible scripts second, lightweight browser-side mirrors third, WebR only after a performance and stability check.
   Testing: reviewed existing JS interactive patterns and module script validation.
   Notes: the public site remains editorial and stable, not an app-like coding environment.
5. Diagnosis: the next block needs concrete validation and completion criteria.
   Implementation: updated `NEXT_SITE.md` with scope, out-of-scope items, representative first implementation block, commands and criteria.
   Testing: final validation is limited to manifest and diff checks because this block changes planning documents only.
   Notes: publication was not requested.

### Files changed in this block

- `NEXT_SITE.md`
- `WORKLOG_SITE.md`

### Improvements implemented

- Reoriented site development toward module pages and learning quality.
- Established a concrete module "script lab" pattern for future implementation.
- Clarified how far in-page script execution should go on a static GitHub Pages site.
- Preserved separation between public site and app.

### Problems fixed

- The next plan no longer points primarily to post-simplification visual QA when the current product direction is module learning.
- The plan now explicitly addresses the user's request for script examples to work in the module pages where feasible.

### Commands executed

- `sed -n '1,220p' .agents/skills/mgenetica-site/SKILL.md`
- `sed -n '1,180p' NEXT_SITE.md`
- `rg --files modules | sort`
- `git status --short --branch`
- `sed -n '1,220p' AGENTS.md`
- `sed -n '1,220p' ROADMAP_SITE.md`
- `sed -n '1,220p' BACKLOG_SITE.md`
- `sed -n '1,180p' WORKLOG_SITE.md`
- `sed -n '1,220p' scripts/run_all_modules.R`
- `sed -n '1,220p' assets/js/interactives.js`
- `rg -n 'source\\(|read\\.csv|read_csv|quiz|Exercício|```\\{r|data/modulo|scripts/modulo' modules scripts data/site-manifest.yml`

### Test results

- Planning files were updated only after local diagnosis.
- Final manifest and whitespace checks are run after this entry.

### Pending items

- Implement the script-lab pattern first in Modules 01, 02, 08 and 12.
- Decide after a feasibility pass whether any browser-side R execution is worth the load and maintenance cost.

---

## 2026-05-11 — SCSS pruning after structural simplification

### Block objective

Complete the post-simplification cleanup requested in `NEXT_SITE.md`, removing unused public-site SCSS for retired guidance blocks while preserving the simplified page architecture and avoiding app changes or publication.

### Cycles executed

1. Diagnosis: `NEXT_SITE.md` required browser visual QA and pruning of legacy selectors left by the structural simplification.
   Implementation: audited `styles/main.scss`, `styles/main-dark.scss`, rendered HTML and editable-region references for retired homepage, module-index and utility blocks.
   Testing: confirmed browser tooling was not exposed in this session and scoped the block to CSS/HTML validation plus render checks.
   Notes: no app files, deployment files or unrelated untracked files were changed.
2. Diagnosis: light-theme CSS still contained retired homepage and old module route selectors that no longer existed in QMD or rendered HTML.
   Implementation: removed stale `.modules-route`, homepage route/session/intent/progress/next-click selector references and related responsive rules from `styles/main.scss`.
   Testing: SCSS compilation passed for the light and dark stylesheets.
   Notes: retained homepage selectors for the simplified structure, including output-standard, trust anchors, first session and path contract.
3. Diagnosis: module-index selectors for retired quick-jump, navigation-contract, readiness, phase-entry, phase-decision, open-flow, resume-route, catalog/return and study-check sections remained in shared component groups.
   Implementation: pruned those module-index selectors from shared card, typography, grid, hover/focus and responsive groups.
   Testing: targeted rendered HTML inspection confirmed retired module-index classes are absent from `docs/modules/index.html`.
   Notes: retained module guidance, output route, completion flow, phase grid and module catalog styling.
4. Diagnosis: utility-page and dark-theme CSS still referenced retired start-choice, return-guide and crossroads sections, plus stale module/home selectors.
   Implementation: removed retired utility selectors and mirrored the simplification in `styles/main-dark.scss`.
   Testing: `rg` confirmed no targeted retired selectors remain in the light or dark SCSS files.
   Notes: search/glossary evidence routes, panel hints and query/recovery flows remain styled.
5. Diagnosis: the cleanup needed final render, contract and validation checks before handoff.
   Implementation: rendered `index.qmd`, `modules/index.qmd`, `busca.qmd` and `glossario.qmd`; inspected rendered HTML for retired and retained components; updated `WORKLOG_SITE.md` and `NEXT_SITE.md`.
   Testing: manifest validation, SCSS validation, targeted Quarto render, whitespace diff check and full prepublish gate passed.
   Notes: the full prepublish run included the complete Quarto render.

### Files changed in this block

- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Removed dead CSS for retired public guidance blocks across light and dark themes.
- Reduced CSS maintenance burden after the structural simplification.
- Kept the simplified public-page components visually supported without reintroducing old decision surfaces.
- Verified that rendered pages no longer contain retired classes and still contain retained core components.

### Problems fixed

- Legacy SCSS selectors no longer described public sections that had been removed from QMD and the manifest.
- Dark-mode styling no longer carried stale rules for retired homepage, module-index and utility-page blocks.

### Commands executed

- `rg -n "home-start-now|home-route-strip|home-intent-switch|home-public-journey|home-progress-snapshot|home-next-click|home-session-close|home-study-choice|modules-quick-jump|modules-navigation-contract|modules-readiness-meter|modules-open-flow|modules-resume-route|modules-phase-entry|modules-phase-decision|modules-catalog-guide|modules-return-path|modules-study-check|utility-start-choice|utility-return-guide|utility-crossroads|modules-choice-path|modules-route" styles/main.scss styles/main-dark.scss`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd busca.qmd glossario.qmd --no-execute`
- `rg -n "home-start-now|home-route-strip|home-intent-switch|home-public-journey|home-progress-snapshot|home-next-click|home-session-close|home-study-choice|modules-quick-jump|modules-navigation-contract|modules-readiness-meter|modules-open-flow|modules-resume-route|modules-phase-entry|modules-phase-decision|modules-catalog-guide|modules-return-path|modules-study-check|utility-start-choice|utility-return-guide|utility-crossroads|modules-choice-path|modules-route" docs/index.html docs/modules/index.html docs/busca.html docs/glossario.html`
- `rg -n "home-output-standard|home-trust-anchors|home-first-session|home-path-contract|modules-output-route|modules-completion-flow|phase-grid|module-grid|utility-evidence-route|utility-panel-hint" docs/index.html docs/modules/index.html docs/busca.html docs/glossario.html`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- SCSS validation passed.
- Targeted Quarto render passed for homepage, module index, search and glossary.
- Rendered HTML inspection confirmed retired classes are absent from the affected pages.
- Rendered HTML inspection confirmed retained core public components remain present.
- Full prepublish gate passed with `prepublish site check ok`.
- Browser screenshot QA remains pending because local browser tooling was not exposed in this session.

### Pending items

- Perform true browser visual QA for desktop/tablet/mobile when browser tooling is available.
- Publish only after an explicit user request and a fresh prepublish pass.

---

## 2026-05-11 — Structural simplification of public pages

### Block objective

Review the public site as product designer, information architect and frontend engineer, reducing repeated guidance blocks and clarifying page purpose without changing the app, rebuilding the project from scratch or removing essential academic content.

### Cycles executed

1. Diagnosis: the homepage repeated the same "choose a route / leave with evidence / return to the index" instruction across many adjacent card sections.
   Implementation: removed redundant homepage blocks for session-check, start-now, route-strip, intent-switch, public-journey, progress-snapshot, next-click, session-close and study-choice.
   Testing: targeted render confirmed the removed blocks no longer appear in `docs/index.html`, while hero, wayfinding, output-standard, trust anchors, first-session and path-contract remain.
   Notes: hero, logo, primary CTAs, academic tone and core learning narrative were preserved.
2. Diagnosis: search and glossary pages had overlapping start-choice, return-guide and crossroads sections that repeated the same navigation decisions already covered by wayfinding, decision, result-close and next-step blocks.
   Implementation: removed `utility-start-choice`, `utility-return-guide` and `utility-crossroads` from both utility pages.
   Testing: targeted render confirmed the retired utility blocks are absent from `docs/busca.html` and `docs/glossario.html`, while evidence routes, examples, query plan, recovery and panel hints remain.
   Notes: Pagefind and glossary widget behavior were not changed.
3. Diagnosis: the module index had become an overly long decision surface before the user reached phases or module cards.
   Implementation: removed redundant module-index quick-jump, navigation-contract, session-check, route/support, choice-path, readiness, open-flow, resume-route, phase-entry, phase-decision, phase-bridge, catalog-guide, return-path and study-check sections.
   Testing: targeted render confirmed retired module-index blocks are absent and retained wayfinding, guidance, output-route, completion flow, phases and module catalog still render.
   Notes: module links, phase cards and certificate route were preserved.
4. Diagnosis: the declared content architecture still referenced retired sections after the page simplification.
   Implementation: updated `data/site-manifest.yml`, `scripts/validate_site_manifest.R` and `PUBLIC_SITE_COMPONENTS.md` so editable regions and documented component families match the simplified site.
   Testing: manifest validation and SCSS validation passed after the contract update.
   Notes: legacy CSS selectors still exist and are listed as next cleanup scope rather than removed in this safer structural pass.
5. Diagnosis: responsiveness and desktop/mobile layout still needed validation after a large reduction in rendered sections.
   Implementation: rendered the affected pages and inspected generated HTML for absence of retired blocks and presence of essential retained blocks.
   Testing: targeted Quarto render, rendered HTML inspection and `git diff --check` passed.
   Notes: browser screenshot QA remains pending because browser/local inspection tooling was not exposed in this session.

### Files changed in this block

- `index.qmd`
- `modules/index.qmd`
- `busca.qmd`
- `glossario.qmd`
- `data/site-manifest.yml`
- `scripts/validate_site_manifest.R`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Reduced homepage complexity by removing repeated route/session/progress cards.
- Simplified search and glossary into clearer utility pages with fewer duplicated navigation explanations.
- Shortened the module index so phases and module cards are reached faster.
- Updated manifest and validation contracts to match the actual public structure.
- Preserved core identity, logo, premium academic tone, module content, search/glossary tools, certificate path and responsive CSS.

### Problems fixed

- Multiple pages were saying the same thing with different component names.
- The module index was overloaded before exposing the actual module catalog.
- The manifest and public component documentation now describe the simplified page structure instead of obsolete rendered sections.

### Commands executed

- `tool_search` for browser/local inspection tooling
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd busca.qmd glossario.qmd --no-execute`
- `rg -n "home-session-check|home-start-now|home-route-strip|home-intent-switch|home-public-journey|home-progress-snapshot|home-next-click|home-session-close|home-study-choice|modules-quick-jump|modules-navigation-contract|modules-session-check|modules-choice-path|modules-readiness-meter|modules-open-flow|modules-resume-route|modules-phase-entry|modules-phase-decision|modules-phase-bridge|modules-catalog-guide|modules-return-path|modules-study-check|utility-start-choice|utility-return-guide|utility-crossroads" docs/index.html docs/modules/index.html docs/busca.html docs/glossario.html`
- `rg -n "home-output-standard|home-trust-anchors|home-first-session|home-path-contract|modules-output-route|modules-completion-flow|phase-grid|module-grid|utility-evidence-route|utility-panel-hint" docs/index.html docs/modules/index.html docs/busca.html docs/glossario.html`
- `git diff --check`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- SCSS compilation passed.
- Whitespace diff check passed.
- Targeted Quarto render passed for homepage, module index, search and glossary.
- Rendered HTML inspection confirmed retired blocks are absent and retained core blocks remain present.
- Full prepublish gate passed with `prepublish site check ok`.

### Pending items

- Browser screenshot QA remains pending because browser/local inspection tooling was not exposed in this session.
- Legacy CSS selectors for retired blocks remain in the stylesheets and should be pruned in a focused follow-up.
- Publish only after an explicit publication request.

---

## 2026-05-11 — Utility evidence-route and panel-hint UX

### Block objective

Execute another site-only public visual/UX block focused on search and glossary utility pages, extending the technical-evidence route pattern to discovery flows and keeping the public component contract current without publishing.

### Cycles executed

1. Diagnosis: search and glossary already returned visitors to modules, route and glossary/search, but did not yet explain how a query or definition should become technical evidence.
   Implementation: added `.utility-evidence-route` to `busca.qmd` with code, table and figure routes to M01, M06 and M12.
   Testing: rendered `busca.qmd` and confirmed `.utility-evidence-route`, its grid, links and destination-specific `aria-label` values in `docs/busca.html`.
   Notes: the search/Pagefind script was not changed.
2. Diagnosis: the glossary had the same evidence gap after a term definition.
   Implementation: added `.utility-evidence-route` to `glossario.qmd`, mapping code, table and figure/genomics evidence back to representative module pages.
   Testing: rendered `glossario.qmd` and confirmed the new evidence route and links in `docs/glossario.html`.
   Notes: the glossary data/widget behavior was not changed.
3. Diagnosis: the actual search and glossary panels appeared after substantial orientation, but lacked an immediate reminder at the moment of use.
   Implementation: added `.utility-panel-hint` before the Pagefind panel and glossary panel, clarifying that the tool should lead back to evidence, module or route.
   Testing: rendered HTML inspection confirmed `.utility-panel-hint` in both utility pages.
   Notes: the hint is editorial, not app-like state.
4. Diagnosis: the new utility evidence cards needed responsive and dark-mode parity before being treated as stable public components.
   Implementation: added light, dark, reduced-motion, mobile and tablet styling for `.utility-evidence-route`, `.utility-evidence-route-grid`, `.utility-evidence-route-item` and the panel hint.
   Testing: SCSS validation passed and source/HTML inspection confirmed the selectors.
   Notes: browser screenshot QA remains unavailable because the browser tool was not exposed in this session.
5. Diagnosis: future app-managed editing requires the new utility patterns to be registered in the public component contract.
   Implementation: registered `utility-evidence-route` and `utility-panel-hint` in `data/site-manifest.yml`, `scripts/validate_site_manifest.R` and `PUBLIC_SITE_COMPONENTS.md`.
   Testing: manifest validation, SCSS validation, whitespace diff check, targeted render and full prepublish gate passed.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `busca.qmd`
- `glossario.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added search/glossary routes from query or definition to technical evidence by output type.
- Added direct utility links to M01, M06 and M12 with explicit accessible labels.
- Added panel-level hints immediately before search and glossary tools.
- Added responsive, dark-mode and reduced-motion coverage for the new utility evidence cards.
- Updated manifest, validator and component documentation for future modular editing.

### Problems fixed

- Search and glossary no longer end only in general return routes; they now guide visitors toward code, table or visual evidence.
- The interactive utility panels now have immediate context at the point of use.
- The new utility patterns are protected by manifest validation.

### Commands executed

- `tool_search` for browser/local inspection tooling
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `git diff --check`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render busca.qmd glossario.qmd --no-execute`
- `rg -n "utility-evidence-route|utility-panel-hint|Da consulta para a evidência|Da definição para a evidência|Abrir o Módulo 12" docs/busca.html docs/glossario.html`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- SCSS compilation passed.
- Whitespace diff check passed.
- Targeted Quarto render passed for search and glossary.
- Rendered HTML inspection confirmed the utility evidence routes, panel hints, links and `aria-label` values.
- Full prepublish gate passed locally after the utility evidence-route, WORKLOG and NEXT updates.

### Pending items

- True browser screenshot QA remains pending because browser/local inspection tooling was not exposed in this session.
- Publish only after an explicit publication request.

---

## 2026-05-11 — Certificate evidence review and reduced-motion polish

### Block objective

Execute another site-only public visual/UX block on top of the unpublished technical-evidence route work, focused on extending evidence-by-output review to the certificate page, reducing motion risk in repeated public cards, and keeping the public component contract current without publishing.

### Cycles executed

1. Diagnosis: the homepage evidence actions now linked to module comparison and weekly planning, and the next missing closure point was the certificate path.
   Implementation: kept the homepage route intact and treated this block as extending the same evidence loop to the certificate page rather than adding another homepage-only section.
   Testing: rendered `index.qmd` and confirmed the `Planejar uma semana` action still appears in `docs/index.html`.
   Notes: no homepage regressions or app-state changes were introduced.
2. Diagnosis: public navigation had visible focus, but repeated hover lifts across route cards could still create unnecessary motion for users who prefer reduced motion.
   Implementation: expanded the reduced-motion media query to suppress transform lifts on evidence-route cards, public wayfinding/session cards, module/phase cards, entry cards and buttons.
   Testing: SCSS validation passed and CSS inspection confirmed the `prefers-reduced-motion` selectors.
   Notes: normal visual styling remains unchanged for users without reduced-motion preference.
3. Diagnosis: the certificate explained completion, recovery and responsible use, but it did not yet offer direct review by evidence type before generating the PDF.
   Implementation: added `.certificate-evidence-review` to `certificado.qmd`, with routes to M01, M06 and M12 for code, table and figure/genomics review.
   Testing: rendered `certificado.qmd` and confirmed `.certificate-evidence-review`, its grid and review links in `docs/certificado.html`.
   Notes: the certificate's browser-local progress logic was not touched.
4. Diagnosis: the new certificate evidence-review block needed responsive behavior and dark-mode parity before being considered stable.
   Implementation: added light, dark, mobile and tablet CSS for `.certificate-evidence-review`, `.certificate-evidence-review-grid` and `.certificate-evidence-review-item`.
   Testing: targeted render plus SCSS compilation passed.
   Notes: true browser screenshot QA remains unavailable in this session.
5. Diagnosis: the new certificate pattern needed manifest and validator coverage for future content management.
   Implementation: registered `certificate-evidence-review` in `data/site-manifest.yml`, `scripts/validate_site_manifest.R` and `PUBLIC_SITE_COMPONENTS.md`.
   Testing: manifest validation passed after the contract update.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `certificado.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added certificate-level evidence review by code, table and figure/genomics output.
- Added direct certificate review links to M01, M06 and M12.
- Reduced motion risk for repeated public cards and buttons when `prefers-reduced-motion` is active.
- Added responsive and dark-mode parity for the new certificate evidence-review block.
- Updated public component documentation and validation contracts.

### Problems fixed

- The certificate flow now gives visitors a concrete way to review technical evidence before generating the PDF.
- Reduced-motion users are less exposed to hover/focus translate effects in repeated public components.
- Future edits to `certificate-evidence-review` are protected by manifest validation.

### Commands executed

- `tool_search` for browser/local inspection tooling
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `git diff --check`
- `rg -n "certificate-evidence-review|prefers-reduced-motion|home-output-standard-actions|route-output-check|certificate-evidence-review" certificado.qmd styles/main.scss styles/main-dark.scss data/site-manifest.yml scripts/validate_site_manifest.R PUBLIC_SITE_COMPONENTS.md`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd semanas/index.qmd certificado.qmd modules/modulo01-introducao-ao-melhoramento-animal.qmd modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd --no-execute`
- `rg -n "certificate-evidence-review|Antes do certificado, revise|Revisar M12|Planejar uma semana|route-output-check" docs/certificado.html docs/index.html docs/semanas/index.html`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- SCSS compilation passed.
- Whitespace diff check passed.
- Targeted Quarto render passed for homepage, module index, study route, certificate and representative modules 01, 06 and 12.
- Full prepublish gate passed locally after the certificate evidence-review, WORKLOG and NEXT updates.
- Rendered HTML inspection confirmed the certificate evidence-review block and links.

### Pending items

- True browser screenshot QA remains pending because browser/local inspection tooling was not exposed in this session.
- Publish only after an explicit publication request.

---

## 2026-05-11 — Weekly evidence review and keyboard-focus polish

### Block objective

Execute another site-only public visual/UX block on top of the unpublished technical-evidence work, focused on giving the weekly study route the same evidence-by-output navigation as the homepage/module index, while improving keyboard focus visibility for public navigation and preserving the no-publish constraint.

### Cycles executed

1. Diagnosis: `.home-output-standard-actions` linked to a code module and module comparison, but did not yet connect evidence planning to the weekly route.
   Implementation: added a third homepage action, `Planejar uma semana`, pointing to the study route with an explicit `aria-label`.
   Testing: targeted render confirmed the new link in `docs/index.html`.
   Notes: this keeps the homepage evidence section connected to weekly planning without adding new app state.
2. Diagnosis: public nav links had active styling and touch sizing, but keyboard focus coverage did not explicitly include header links, footer links and the navbar toggler in the shared focus rule.
   Implementation: extended the focus-visible rule to `.navbar .nav-link`, `footer.footer .nav-link` and `.navbar-toggler`.
   Testing: SCSS compilation passed and source inspection confirmed the selectors.
   Notes: no visible text or navigation order changed.
3. Diagnosis: the weekly route explained weekly outputs but did not offer direct recovery by output type when a week's evidence was weak.
   Implementation: added `.route-output-check` to `semanas/index.qmd`, linking weekly review to M01 for code, M06 for tables/correlations and M12 for figures/genomics.
   Testing: rendered `semanas/index.qmd` and confirmed `.route-output-check`, grid items and links in `docs/semanas/index.html`.
   Notes: this extends the evidence route to an internal public page.
4. Diagnosis: the new weekly output-check block needed tablet/mobile behavior and dark-mode parity before being registered as a component.
   Implementation: added responsive collapse rules in `styles/main.scss` and dark-mode parity in `styles/main-dark.scss`.
   Testing: SCSS validation and whitespace diff check passed.
   Notes: true browser screenshot QA remains unavailable in this session.
5. Diagnosis: the new public pattern needed manifest and validator coverage for future app-managed editorial regions.
   Implementation: registered `.route-output-check` in `data/site-manifest.yml`, `scripts/validate_site_manifest.R` and `PUBLIC_SITE_COMPONENTS.md`.
   Testing: manifest validation passed after the contract update.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `semanas/index.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Connected homepage technical-evidence guidance to weekly planning.
- Added route-level output review for code, table and figure/genomics evidence.
- Improved visible keyboard focus coverage for header, footer and navbar toggle navigation.
- Added responsive and dark-mode support for the new weekly output-check block.
- Registered the new route output-check pattern in manifest, docs and validation.

### Problems fixed

- Weekly study planning now has a direct way to recover weak evidence by output type.
- Public navigation focus coverage is more explicit for keyboard users.
- Future edits to `route-output-check` are protected by manifest and component-contract validation.

### Commands executed

- `tool_search` for browser/local inspection tooling
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `git diff --check`
- `rg -n "route-output-check|home-output-standard-actions|navbar.*focus-visible|code-copy-button" index.qmd semanas/index.qmd styles/main.scss styles/main-dark.scss data/site-manifest.yml scripts/validate_site_manifest.R PUBLIC_SITE_COMPONENTS.md`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd semanas/index.qmd modules/index.qmd modules/modulo01-introducao-ao-melhoramento-animal.qmd modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd --no-execute`
- `rg -n "Planejar uma semana|home-output-standard-actions|route-output-check|Revise a semana pelo tipo de saída|Abrir M12" docs/index.html docs/semanas/index.html`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- SCSS compilation passed.
- Whitespace diff check passed.
- Targeted Quarto render passed for homepage, study route, module index and representative modules 01, 06 and 12.
- Full prepublish gate passed locally after the weekly evidence-review, WORKLOG and NEXT updates.
- Rendered HTML inspection confirmed the homepage weekly-planning link and the route output-check block.

### Pending items

- True browser screenshot QA remains pending because browser/local inspection tooling was not exposed in this session.
- Publish only after an explicit publication request.

---

## 2026-05-11 — Technical evidence route and output-surface polish

### Block objective

Execute a second site-only public visual/UX block on top of the unpublished local technical-output readability work, focused on making evidence routes easier to choose from the homepage and module index, and making code/output/table surfaces clearer, more keyboard-visible and more responsive without publishing.

### Cycles executed

1. Diagnosis: the homepage explained what counts as evidence, but the new `.home-output-standard` section ended without a direct public action.
   Implementation: added `.home-output-standard-actions` with links to a code-first module and to the module index.
   Testing: rendered `index.qmd` and confirmed the actions and expanded `aria-label` values in `docs/index.html`.
   Notes: the change stays visitor-facing and does not introduce app state.
2. Diagnosis: the module index still organized the route mostly by phase and readiness, while `NEXT_SITE.md` prioritized technical-output review.
   Implementation: added `.modules-output-route`, a three-card navigation block for choosing modules by evidence type: code/gain, table/parameter and figure/genomics.
   Testing: rendered `modules/index.qmd` and confirmed `.modules-output-route`, its grid and links in `docs/modules/index.html`.
   Notes: this improves public navigation without changing module order or manifest-owned card metadata.
3. Diagnosis: code blocks had a visible `Código R` badge, but output and display surfaces still lacked equivalent labels.
   Implementation: added CSS labels and panel treatment for `.cell-output-stdout`, `.cell-output-stderr`, `.cell-output-display` and `.table-responsive`.
   Testing: SCSS compilation passed; representative module render confirmed code-copy surfaces remain present.
   Notes: scientific scripts and lesson text were not changed.
4. Diagnosis: keyboard and small-screen affordances needed another pass after adding output panels.
   Implementation: added visible `:focus-visible` treatment for `.code-copy-button`, preserved horizontal safety for output/table surfaces, and added mobile/tablet collapse rules for `.modules-output-route`.
   Testing: whitespace diff check passed; source inspection confirmed responsive selectors and focus rules.
   Notes: browser screenshot QA remains unavailable in this session.
5. Diagnosis: the new route/pattern needed governance for future app-managed editorial regions.
   Implementation: registered `.modules-output-route` in `data/site-manifest.yml`, `scripts/validate_site_manifest.R` and `PUBLIC_SITE_COMPONENTS.md`.
   Testing: manifest validation passed after the new contract.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `modules/index.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added direct homepage actions from the evidence-standard block to a code-first module and module comparison route.
- Added a module-index route by evidence type so visitors can choose code, tables or genomic figures intentionally.
- Added visual labels for generated output, warnings, figures/tables and responsive tables.
- Improved focus visibility for Quarto code-copy buttons.
- Added manifest/documentation/validator coverage for the new output-route pattern.

### Problems fixed

- The homepage technical-evidence section no longer ends without a clear next action.
- The module index now supports choosing by output type, not only by phase or sequence.
- Generated output surfaces are less visually generic and easier to scan in long modules.

### Commands executed

- `tool_search` for browser/local inspection tooling
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `git diff --check`
- `rg -n "modules-output-route|home-output-standard-actions|cell-output-display::before|code-copy-button:focus-visible" index.qmd modules/index.qmd styles/main.scss styles/main-dark.scss data/site-manifest.yml scripts/validate_site_manifest.R PUBLIC_SITE_COMPONENTS.md`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd modules/modulo01-introducao-ao-melhoramento-animal.qmd modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd --no-execute`
- `rg -n "home-output-standard-actions|Ver módulo com código|modules-output-route|Escolha também pelo tipo de evidência|Abrir M06" docs/index.html docs/modules/index.html`
- `rg -n "class=\"cell-output-display|class=\"cell-output-stdout|class=\"table-responsive|class=\"code-copy-button" docs/modules/modulo01-introducao-ao-melhoramento-animal.html docs/modules/modulo06-correlacoes-geneticas-e-fenotipicas.html docs/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- SCSS compilation passed.
- Whitespace diff check passed.
- Targeted Quarto render passed for homepage, module index and representative modules 01, 06 and 12.
- Full prepublish gate passed locally after the technical-evidence route, output-surface, WORKLOG and NEXT updates.
- Rendered HTML inspection confirmed `.home-output-standard-actions` and `.modules-output-route`.

### Pending items

- True browser screenshot QA remains pending because browser/local inspection tooling was not exposed in this session.
- Publish only after an explicit publication request.

---

## 2026-05-11 — Technical output readability layer

### Block objective

Execute a site-only public visual/UX block after the successful publication of commit `17c1a95`, focused on making technical evidence easier to scan: clarify on the homepage what counts as code/table/output evidence, improve module code/output/table presentation, and keep the public component contract current without publishing.

### Cycles executed

1. Diagnosis: `NEXT_SITE.md` still described the previous UX package as local and unpublished even though it had been published at commit `17c1a95`.
   Implementation: treated this block as post-publication local evolution and prepared `NEXT_SITE.md` to record `17c1a95` as the latest published baseline.
   Testing: inspected git status and deployed validation state before editing; unrelated untracked files remained untouched.
   Notes: no app files were changed.
2. Diagnosis: the homepage explained the concept-to-code journey, but the visitor still had to infer what a completed technical evidence unit looked like.
   Implementation: added `.home-output-standard` to `index.qmd`, describing the three checks for evidence: question, output and interpretation.
   Testing: targeted render confirmed `.home-output-standard` and its copy in `docs/index.html`.
   Notes: this is editorial guidance, not app state.
3. Diagnosis: module pages already had technical-scan guidance, but the rendered code/output/table surfaces were still visually generic and harder to scan in long modules.
   Implementation: improved global module-facing code/output/table styling in `styles/main.scss`, adding a `Código R` badge for source blocks, stronger code container treatment, and clearer `.cell-output-*`/table-responsive surfaces.
   Testing: rendered representative modules 01, 06 and 12; HTML inspection confirmed source code and output markers remain present.
   Notes: no scientific content or scripts were changed.
4. Diagnosis: the new code/output treatments needed dark-mode parity and small-screen safety.
   Implementation: added dark-mode rules in `styles/main-dark.scss` and responsive grid coverage for `.home-output-standard` at tablet/mobile widths.
   Testing: SCSS compilation passed for light and dark themes; whitespace diff check passed.
   Notes: browser screenshot QA remains unavailable in this session.
5. Diagnosis: the new homepage pattern and technical output layer needed governance so future blocks can reuse it without drift.
   Implementation: updated `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R` to document and validate `.home-output-standard`, including its editable-region marker.
   Testing: manifest validation passed after the new contract.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added homepage guidance that defines evidence as a chain from question to output to interpretation.
- Improved visual treatment for R code, generated output and responsive tables.
- Added dark-mode parity for the new technical-output surfaces.
- Added responsive behavior for the new homepage output-standard block.
- Registered and validated the new homepage pattern in the public-site contract.

### Problems fixed

- `NEXT_SITE.md` no longer treats the already published `17c1a95` UX package as unpublished.
- Technical evidence surfaces are less visually generic in long module pages.
- Future `.home-output-standard` edits are protected by manifest/documentation validation.

### Commands executed

- `git status --short --branch`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `git diff --check`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd modules/modulo01-introducao-ao-melhoramento-animal.qmd modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd --no-execute`
- `rg -n "home-output-standard|O que conta como evidência técnica|Pergunta|Saída|Interpretação" docs/index.html`
- `rg -n "Código R|cell-output-stdout|home-output-standard|sourceCode::before|home-output-step" docs/index.html docs/modules/modulo01-introducao-ao-melhoramento-animal.html docs/modules/modulo06-correlacoes-geneticas-e-fenotipicas.html docs/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html styles/main.scss styles/main-dark.scss`
- `rg -n "home-output-standard|output-standard" data/site-manifest.yml scripts/validate_site_manifest.R PUBLIC_SITE_COMPONENTS.md`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`
- `tool_search` for browser/local inspection tooling

### Test results

- Manifest validation passed.
- SCSS compilation passed.
- Whitespace diff check passed.
- Targeted Quarto render passed for homepage and representative modules 01, 06 and 12.
- Full prepublish gate passed locally after the technical-output, worklog and NEXT updates.
- Rendered/source inspection confirmed the homepage output-standard block and technical-output CSS selectors.

### Pending items

- True browser screenshot QA remains pending because browser/local inspection tooling was not exposed in this session.
- Publish only after an explicit publication request.

---

## 2026-05-11 — Public navigation accessibility and scan polish

### Block objective

Execute a site-only public visual/UX block focused on publication-readiness polish: improve scanability, touch/focus clarity and accessible labels across the accumulated public wayfinding, session-check and module-session patterns without changing the app or publishing.

### Cycles executed

1. Diagnosis: the homepage had several compact `.entry-link` actions with repeated labels such as "Ver roteiro" or "Ver módulos", which were visually useful but less explicit for assistive navigation.
   Implementation: expanded homepage `.entry-link` actions with destination-specific `aria-label` values across start-now, route-strip, intent, study-choice, entry, returning and discovery sections.
   Testing: rendered `index.qmd` and confirmed the expanded labels in `docs/index.html`.
   Notes: visible link text stayed concise while the accessible name became specific.
2. Diagnosis: public navigation surfaces on the module index, route, search and glossary pages used the same compact link style, but not every shortcut exposed a complete destination or intent.
   Implementation: added explicit `aria-label` values to `.entry-link` actions in `modules/index.qmd`, `semanas/index.qmd`, `busca.qmd` and `glossario.qmd`.
   Testing: source grep and rendered HTML inspection confirmed no Quarto-authored `.entry-link` remains without `aria-label`.
   Notes: this improves keyboard/screen-reader wayfinding without adding visual noise.
3. Diagnosis: the certificate no-JavaScript fallback used a raw HTML `.entry-link`, so the earlier source check for Quarto shorthand links did not cover it.
   Implementation: added an explicit fallback `aria-label` in `certificado.qmd` and expanded `scripts/validate_site_manifest.R` to catch both Quarto `{.entry-link}` and HTML/script `class="entry-link"` cases without labels.
   Testing: manifest validation caught the broader contract successfully after the certificate fix.
   Notes: the validation now protects future public links regardless of authoring style.
4. Diagnosis: accumulated wayfinding/session/module blocks were structurally consistent but visually similar, making fast scanning harder after many repeated three-step sections.
   Implementation: added numbered visual badges to `.public-wayfinding-item`, `.public-session-check-item`, `.module-session-plan-item`, `.module-technical-scan-item` and `.module-close-check-item`, with dark-mode parity.
   Testing: SCSS compilation passed and rendered representative pages confirmed the updated CSS is included.
   Notes: the badges are CSS-only and do not introduce new content state or dependencies.
5. Diagnosis: tablet layouts could leave three compact cards inside a one-column parent, which was acceptable but tighter than needed for the new badge padding.
   Implementation: adjusted the public wayfinding/session and module-session grids to two columns at tablet width and one column on mobile, preserving the existing mobile collapse.
   Testing: targeted Quarto render passed for homepage, module index, route, utilities, certificate, Sobre and representative modules; whitespace diff check passed before final validation.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `modules/index.qmd`
- `semanas/index.qmd`
- `busca.qmd`
- `glossario.qmd`
- `certificado.qmd`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added explicit accessible labels to public `.entry-link` shortcuts across homepage, module index, route and utility surfaces.
- Added validator coverage so future `.entry-link` actions must include `aria-label`, including raw HTML/script links.
- Added numbered visual badges to public route/checklist/module-session cards for faster scanability.
- Improved tablet behavior for newly accumulated public guidance grids.
- Documented the accessibility and scanability contract in `PUBLIC_SITE_COMPONENTS.md`.

### Problems fixed

- Short repeated public links no longer depend only on surrounding visual context for meaning.
- Certificate no-JavaScript fallback no longer has an unlabeled compact action.
- Repeated three-card guidance blocks now have clearer visual rhythm and better tablet spacing.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `rg --pcre2 -n "\\{\\.entry-link(?![^}]*aria-label)" *.qmd modules/*.qmd semanas/*.qmd`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd semanas/index.qmd busca.qmd glossario.qmd certificado.qmd perfil.qmd modules/modulo01-introducao-ao-melhoramento-animal.qmd modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd --no-execute`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render certificado.qmd --no-execute`
- `rg --pcre2 -n "class=\"entry-link\"(?![^>]*aria-label)|\\{\\.entry-link(?![^}]*aria-label)" docs/index.html docs/modules/index.html docs/busca.html docs/glossario.html docs/semanas/index.html docs/certificado.html *.qmd modules/*.qmd semanas/*.qmd`
- `rg -n "counter-reset: public-wayfinding-step|counter-reset: public-session-step|counter-reset: module-session-step|entry-link without aria-label" styles/main.scss scripts/validate_site_manifest.R PUBLIC_SITE_COMPONENTS.md`
- `git diff --check`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed with the expanded `.entry-link` accessibility contract.
- SCSS compilation passed for light and dark themes.
- Targeted Quarto render passed for homepage, module index, study route, search, glossary, certificate, Sobre and representative early/middle/final modules.
- Rendered/source grep confirmed no `.entry-link` in checked public pages remains without `aria-label`.
- Whitespace diff check passed before final full validation.
- Full prepublish gate passed locally after the accessibility/scan-polish, log and NEXT updates.

### Pending items

- True browser screenshot QA remains pending because browser automation was not exposed in this session.
- Publish only after an explicit publication request.

---

## 2026-05-11 — Module technical scan guidance

### Block objective

Execute a site-only public visual/UX block focused on technical readability inside module pages: help visitors read formulas, R code and tables as one evidence chain, while keeping homepage/module-index guidance and public-site contracts aligned.

### Cycles executed

1. Diagnosis: the homepage explained that each route should produce evidence, but did not explicitly mention tables as part of the public evidence trail.
   Implementation: updated `.home-path-contract` copy in `index.qmd` to include interpreted R output and tables read with criteria.
   Testing: targeted render confirmed the updated homepage copy in `docs/index.html`.
   Notes: this keeps the homepage aligned with the technical module experience.
2. Diagnosis: the module index explained catalog reading, but did not prepare the visitor to read formulas, code and tables as connected evidence inside module pages.
   Implementation: updated `.modules-catalog-guide` copy in `modules/index.qmd` to frame formulas, code and tables as parts of the same evidence.
   Testing: targeted render confirmed the updated copy in `docs/modules/index.html`.
   Notes: this strengthens public navigation from catalog to longform technical content.
3. Diagnosis: all 12 modules had a session plan and close check, but the technical middle of the page still lacked a compact reading aid for formulas, code and tabular output.
   Implementation: added `.module-technical-scan` with formula, code and table passes to all 12 module pages after `.module-session-plan`.
   Testing: source and rendered HTML inspection confirmed `.module-technical-scan` across all 12 module pages.
   Notes: the block is editorial/static and does not alter scripts, quizzes or app behavior.
4. Diagnosis: the new technical scan needed visual parity with module session/close blocks, including dark mode and mobile collapse.
   Implementation: extended `styles/main.scss` and `styles/main-dark.scss` for `.module-technical-scan`, its grid and items, reusing the existing module card rhythm.
   Testing: SCSS validation and targeted Quarto render passed.
   Notes: the pattern supports table/code readability without adding new dependencies.
5. Diagnosis: future edits needed validation coverage so module technical guidance does not drift or disappear from some modules.
   Implementation: updated `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R` to document and require the technical-scan pattern.
   Testing: manifest validation, SCSS validation, whitespace diff check, targeted Quarto render and rendered HTML inspection passed before final full validation.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `modules/index.qmd`
- `modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `modules/modulo02-bases-da-genetica-quantitativa.qmd`
- `modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
- `modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd`
- `modules/modulo05-herdabilidade-e-repetibilidade.qmd`
- `modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `modules/modulo07-modelos-lineares-e-modelos-mistos.qmd`
- `modules/modulo08-blup-e-avaliacao-genetica.qmd`
- `modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd`
- `modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd`
- `modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- `modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added a consistent formula/code/table reading aid to all 12 module pages.
- Aligned homepage and module-index copy with technical evidence reading.
- Added responsive and dark-mode styling for the new module technical scan.
- Registered and validated the new pattern in the public site contract.

### Problems fixed

- Reduced ambiguity around how to read formulas, scripts and output tables in long modules.
- Improved module-page technical readability without changing scientific content or scripts.
- Prevented partial adoption by requiring the pattern in validation.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `git diff --check`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd modules/modulo01-introducao-ao-melhoramento-animal.qmd modules/modulo02-bases-da-genetica-quantitativa.qmd modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd modules/modulo05-herdabilidade-e-repetibilidade.qmd modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd modules/modulo07-modelos-lineares-e-modelos-mistos.qmd modules/modulo08-blup-e-avaliacao-genetica.qmd modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd --no-execute`
- `rg -n "module-technical-scan|Leia a parte técnica|Fórmula|Código|Tabela" docs/modules/*.html`
- `rg -n "saída em R interpretada|fórmulas, código e tabelas" docs/index.html docs/modules/index.html`
- `rg -n "module-technical-scan" styles/main.scss styles/main-dark.scss PUBLIC_SITE_COMPONENTS.md data/site-manifest.yml scripts/validate_site_manifest.R`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- SCSS compilation passed.
- Whitespace diff check passed.
- Targeted Quarto render passed for homepage, module index and all 12 module pages.
- Rendered HTML inspection confirmed module technical-scan blocks across generated module pages.
- Full prepublish gate passed locally after the module technical-scan, log and NEXT updates.

### Pending items

- True browser screenshot QA remains pending because browser automation was not exposed in this session.
- Publish only after an explicit publication request.

---

## 2026-05-11 — Module session plan and close checks

### Block objective

Execute a site-only public visual/UX block focused on the core learning surface: make every module page easier to enter, complete and leave with a clear study decision, while keeping homepage/module-index copy, component contracts and validations aligned.

### Cycles executed

1. Diagnosis: the homepage already directed visitors to modules, but did not explicitly prepare them for the new bounded study behavior inside each module page.
   Implementation: tightened the homepage `.home-next-click` copy so opening a module means entering with question, script and decision defined.
   Testing: targeted render confirmed the updated homepage copy in `docs/index.html`.
   Notes: this keeps the homepage public and editorial while connecting it to module-level UX.
2. Diagnosis: module pages had reading rhythm and evidence guidance, but no compact session plan near the start of the learning flow.
   Implementation: added `.module-session-plan` with question, evidence and decision steps to all 12 module pages after `.module-reading-rhythm`.
   Testing: source inspection confirmed the pattern in all module `.qmd` files; targeted render confirmed it in rendered module HTML.
   Notes: the pattern is static/editorial and does not add app state.
3. Diagnosis: modules had post-quiz and return notes, but the final transition could better define when a learner is ready to leave, revise or continue.
   Implementation: added `.module-close-check` before `.module-return-note` in all 12 modules, covering reading, code and quiz readiness.
   Testing: rendered HTML inspection confirmed `.module-close-check` and the closing copy across all generated module pages.
   Notes: this improves internal module completion without changing quiz logic.
4. Diagnosis: the new module blocks needed visual treatment, dark-mode parity and responsive collapse for long module pages.
   Implementation: added shared styles for `.module-session-plan`, `.module-close-check`, their grids and items in `styles/main.scss` and `styles/main-dark.scss`, including mobile/tablet collapse.
   Testing: SCSS validation passed and targeted module render completed.
   Notes: styling uses the existing editorial card language and avoids a dashboard-like surface.
5. Diagnosis: the module-level UX contract needed manifest, documentation and validator protection.
   Implementation: updated `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R` so all module pages must expose the new session and close-check patterns.
   Testing: manifest validation, SCSS validation, whitespace diff check, targeted Quarto render and rendered HTML inspection passed before final full validation.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `modules/index.qmd`
- `modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `modules/modulo02-bases-da-genetica-quantitativa.qmd`
- `modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
- `modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd`
- `modules/modulo05-herdabilidade-e-repetibilidade.qmd`
- `modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `modules/modulo07-modelos-lineares-e-modelos-mistos.qmd`
- `modules/modulo08-blup-e-avaliacao-genetica.qmd`
- `modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd`
- `modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd`
- `modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- `modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added a consistent short session plan to all 12 modules.
- Added a consistent module close-check before the final return/navigation flow.
- Connected homepage and module-index guidance to the new module-level study behavior.
- Added responsive and dark-mode styling for the new module patterns.
- Registered and validated the new module patterns as part of the public site contract.

### Problems fixed

- Reduced ambiguity when entering a long module page.
- Made module completion criteria clearer before leaving or advancing.
- Prevented future module drift by requiring the new patterns in validation.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `git diff --check`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd modules/modulo01-introducao-ao-melhoramento-animal.qmd modules/modulo02-bases-da-genetica-quantitativa.qmd modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd modules/modulo05-herdabilidade-e-repetibilidade.qmd modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd modules/modulo07-modelos-lineares-e-modelos-mistos.qmd modules/modulo08-blup-e-avaliacao-genetica.qmd modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd --no-execute`
- `rg -n "module-session-plan|module-close-check|Plano curto de sessão|Antes de trocar de página" docs/modules/*.html`
- `rg -n "Ao abrir um módulo|Cada página de módulo agora explicita" docs/index.html docs/modules/index.html`
- `rg -n "module-session-plan|module-close-check" styles/main.scss styles/main-dark.scss PUBLIC_SITE_COMPONENTS.md data/site-manifest.yml scripts/validate_site_manifest.R`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- SCSS compilation passed.
- Whitespace diff check passed.
- Targeted Quarto render passed for homepage, module index and all 12 module pages.
- Rendered HTML inspection confirmed module session and close-check blocks across generated module pages.
- Full prepublish gate passed locally after the module-session, log and NEXT updates.

### Pending items

- True browser screenshot QA remains pending because browser automation was not exposed in this session.
- Publish only after an explicit publication request.

---

## 2026-05-11 — Public wayfinding across key page contexts

### Block objective

Execute a site-only public visual/UX block after the local session-check work: add a reusable public wayfinding layer that clarifies where the visitor is, what route is immediately available and how to continue without adding app-like state or publishing automatically.

### Cycles executed

1. Diagnosis: the homepage had strong hero actions and session checks, but the post-hero continuation still depended on reading several downstream blocks before the visitor saw a compact route summary.
   Implementation: added `.public-wayfinding.home-wayfinding` to `index.qmd` with immediate routes for studying, organizing the route and checking certificate status.
   Testing: targeted Quarto render confirmed `.home-wayfinding` and its copy in `docs/index.html`.
   Notes: this reinforces the first viewport continuation while keeping the homepage editorial.
2. Diagnosis: the module index had quick jumps and navigation-contract guidance, but it could expose a more concise current-context strip before deeper catalog sections.
   Implementation: added `.public-wayfinding.modules-wayfinding` to `modules/index.qmd` with direct paths to M01, phases and the weekly route.
   Testing: targeted render confirmed `.modules-wayfinding` in `docs/modules/index.html`.
   Notes: this strengthens public navigation without changing the manifest-backed module catalog.
3. Diagnosis: the weekly route, search, glossary, certificate and Sobre pages each had page-specific guidance, but lacked a shared wayfinding pattern for immediate public continuation.
   Implementation: added `.route-wayfinding`, `.utility-wayfinding`, `.certificate-wayfinding` and `.about-wayfinding` blocks to `semanas/index.qmd`, `busca.qmd`, `glossario.qmd`, `certificado.qmd` and `perfil.qmd`.
   Testing: targeted render confirmed all page-specific wayfinding blocks in generated HTML.
   Notes: utilities and institutional content now return more explicitly to study, consultation or conclusion.
4. Diagnosis: the new wayfinding pattern needed responsive behavior, dark-mode parity and explicit accessibility-friendly structure before it could be considered publication-ready.
   Implementation: added shared `.public-wayfinding` styles, mobile/tablet collapse rules, dark-mode styles and explicit page-variant classes in `styles/main.scss` and `styles/main-dark.scss`.
   Testing: SCSS compilation and rendered HTML inspection passed.
   Notes: the component uses semantic `role="navigation"` plus list/listitem structure and avoids backend or app state.
5. Diagnosis: the public component contract needed to know about the new pattern so future site/app-management preparation does not treat it as undocumented page drift.
   Implementation: updated `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R` with wayfinding patterns and editable-region checks.
   Testing: manifest validation, SCSS validation, whitespace diff check and targeted Quarto render passed before final full validation.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `modules/index.qmd`
- `semanas/index.qmd`
- `busca.qmd`
- `glossario.qmd`
- `certificado.qmd`
- `perfil.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added reusable public wayfinding across homepage, module index, study route, search, glossary, certificate and Sobre.
- Clarified immediate next routes for study, planning, consultation and conclusion.
- Added responsive and dark-mode styling for the shared component.
- Registered the new public component in manifest, docs and validation coverage.

### Problems fixed

- Reduced dependence on longer page blocks for basic orientation.
- Made utility and institutional pages more explicitly connected to the public learning journey.
- Protected the new pattern from undocumented future drift.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `git diff --check`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd semanas/index.qmd busca.qmd glossario.qmd certificado.qmd perfil.qmd --no-execute`
- `rg -n "public-wayfinding|home-wayfinding|modules-wayfinding|route-wayfinding|utility-wayfinding|certificate-wayfinding|about-wayfinding|Você está no ponto de entrada|Você está no mapa da trilha|Você está no ritmo de estudo|Você está em uma página de apoio|Você está em uma referência curta|Você está no fechamento da trilha|Você está na explicação institucional" docs/index.html docs/modules/index.html docs/semanas/index.html docs/busca.html docs/glossario.html docs/certificado.html docs/perfil.html`
- `rg -n "public-wayfinding|home-wayfinding|modules-wayfinding|route-wayfinding|utility-wayfinding|certificate-wayfinding|about-wayfinding" styles/main.scss styles/main-dark.scss PUBLIC_SITE_COMPONENTS.md data/site-manifest.yml scripts/validate_site_manifest.R`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- SCSS compilation passed.
- Whitespace diff check passed.
- Targeted Quarto render passed for homepage, module index, study route, search, glossary, certificate and Sobre.
- Rendered HTML inspection confirmed all public wayfinding placements.
- Full prepublish gate passed locally after the wayfinding, log and NEXT updates.

### Pending items

- True browser screenshot QA remains pending because no browser automation tool was exposed in the latest discovery pass.
- Publish only after an explicit publication request.

---

## 2026-05-11 — Public session checks for key exit points

### Block objective

Execute a site-only public visual/UX block after publication `3b92f2a`: add visitor-facing session checks to key page exits so homepage, module index, study route, utilities and certificate make the next action clear without turning the site into an app or admin surface.

### Cycles executed

1. Diagnosis: browser screenshot QA remained unavailable, and the homepage had several strong public routes but no compact confirmation point immediately after the hero.
   Implementation: added `.public-session-check.home-session-check` to `index.qmd` with destination, evidence and return criteria.
   Testing: targeted render confirmed `.home-session-check` and its copy in `docs/index.html`.
   Notes: this improves first-viewport continuation without changing the hero or navigation hierarchy.
2. Diagnosis: the module index had navigation-contract actions, but no compact check to help visitors decide whether they should open, compare or conclude before leaving the index.
   Implementation: added `.public-session-check.modules-session-check` to `modules/index.qmd`.
   Testing: targeted render confirmed `.modules-session-check` in `docs/modules/index.html`.
   Notes: this reinforces the index as a decision hub, not only a catalog.
3. Diagnosis: the study route explained weekly rhythm, but the closing band could better define what counts as a finished week.
   Implementation: added `.public-session-check.route-session-check` inside the route finish band in `semanas/index.qmd`.
   Testing: targeted render confirmed `.route-session-check` in `docs/semanas/index.html`.
   Notes: this supports completion evidence without adding app state.
4. Diagnosis: search and glossary had final exit copy, but visitors still needed a quick way to decide whether lookup had actually resolved the next action.
   Implementation: added `.public-session-check.utility-session-check` to `busca.qmd` and `glossario.qmd`.
   Testing: targeted render confirmed the utility session checks in generated HTML for both pages.
   Notes: this reduces open-ended searching and preserves utility pages as study support.
5. Diagnosis: the certificate page had dynamic pending state, but the static page could better define whether the visitor should resume or emit the record.
   Implementation: added `.public-session-check.certificate-session-check` to `certificado.qmd`, styled the shared component in `styles/main.scss` and `styles/main-dark.scss`, and updated `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R`.
   Testing: manifest validation, SCSS validation, whitespace diff check, targeted Quarto render and rendered HTML inspection passed.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `modules/index.qmd`
- `semanas/index.qmd`
- `busca.qmd`
- `glossario.qmd`
- `certificado.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added reusable public session checks across key public exit points.
- Improved homepage, module-index, route, utility and certificate continuation clarity.
- Added responsive and dark-mode styling for the shared component.
- Registered the new component in manifest, public component docs and validator coverage.

### Problems fixed

- Reduced ambiguity before leaving major public pages.
- Converted the remaining lack of browser QA into a static, render-verifiable user-facing check pattern.
- Kept the new checks editorial and public-facing, with no app/backend state.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `git diff --check`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd semanas/index.qmd busca.qmd glossario.qmd certificado.qmd --no-execute`
- `rg -n "home-session-check|modules-session-check|route-session-check|utility-session-check|certificate-session-check|Antes de sair da página inicial|Antes de sair do índice|Antes de fechar a semana|A busca resolveu|O termo voltou|Antes de gerar ou retomar" docs/index.html docs/modules/index.html docs/semanas/index.html docs/busca.html docs/glossario.html docs/certificado.html`
- `rg -n "public-session-check|home-session-check|modules-session-check|route-session-check|utility-session-check|certificate-session-check" styles/main.scss styles/main-dark.scss PUBLIC_SITE_COMPONENTS.md data/site-manifest.yml scripts/validate_site_manifest.R`

### Test results

- Manifest validation passed.
- SCSS compilation passed.
- Whitespace diff check passed.
- Targeted Quarto render passed for homepage, module index, study route, search, glossary and certificate.
- Rendered HTML inspection confirmed all five session-check placements.
- Full prepublish gate passed locally after the log and NEXT updates.

### Pending items

- True browser screenshot QA remains pending because no browser automation tool was exposed by tool discovery in this session.
- Publish only after an explicit publication request.

---

## 2026-05-11 — Final-decision hints across public CTA closures

### Block objective

Execute another site-only public visual/UX block aligned with `publication-readiness-review`: improve the public decision copy around final CTA clusters, utility exits and the certificate pending state, while keeping validation/documentation coverage current and not publishing.

### Cycles executed

1. Diagnosis: the homepage final CTA had good actions, but the copy did not explicitly tell visitors when to choose module, planning or certificate at the final decision point.
   Implementation: added `.final-cta-hint` to `index.qmd` before the final CTA checks.
   Testing: rendered `index.qmd` and confirmed `.final-cta-hint` and the `Começar M01` decision copy in `docs/index.html`.
   Notes: this improves the homepage closing decision without changing the hero hierarchy.
2. Diagnosis: the module-index final next-step band exposed actions, but its decision copy could be tighter for visitors returning after browsing phases/cards.
   Implementation: added `.modules-next-step-hint` to `modules/index.qmd`.
   Testing: rendered `modules/index.qmd` and confirmed the hint in `docs/modules/index.html`.
   Notes: this reinforces the index as a public decision point rather than a catalog-only page.
3. Diagnosis: search and glossary ended with button groups, but there was no immediate reminder to convert lookup into a study decision.
   Implementation: added `.utility-next-step-copy` blocks to `busca.qmd` and `glossario.qmd` before their final utility buttons.
   Testing: rendered both utility pages and confirmed the copy in generated HTML.
   Notes: this reduces open-ended searching and keeps utility pages connected to the study path.
4. Diagnosis: the certificate pending state had dynamic progress and a next-pending CTA, but the static pending copy did not explain how to use the pending list as a recovery route.
   Implementation: added `.certificate-pending-hint` inside the incomplete certificate state in `certificado.qmd`.
   Testing: rendered `certificado.qmd` and confirmed the pending hint in `docs/certificado.html`.
   Notes: certificate logic remains browser-local; no backend or app work was added.
5. Diagnosis: the new public hints needed light/dark visual coverage, component documentation, manifest registration and validator protection.
   Implementation: styled `.final-cta-hint`, `.modules-next-step-hint`, `.utility-next-step-copy` and `.certificate-pending-hint` in `styles/main.scss` and `styles/main-dark.scss`; updated `PUBLIC_SITE_COMPONENTS.md`, `data/site-manifest.yml` and `scripts/validate_site_manifest.R`.
   Testing: manifest validation, SCSS validation, whitespace diff check, targeted Quarto render and rendered HTML inspection passed.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `modules/index.qmd`
- `busca.qmd`
- `glossario.qmd`
- `certificado.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added homepage final-CTA decision guidance.
- Added module-index final next-step decision guidance.
- Added final utility-exit copy to search and glossary.
- Added certificate pending-route guidance.
- Added style, dark-mode, manifest, documentation and validator coverage for the new public hints.

### Problems fixed

- Reduced ambiguity around final CTA groups.
- Kept utility pages from ending as button-only exits.
- Made the certificate pending list easier to use as a recovery route.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `git diff --check`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd busca.qmd glossario.qmd certificado.qmd --no-execute`
- `rg -n 'final-cta-hint|Começar M01|modules-next-step-hint|O índice fecha melhor|utility-next-step-copy|Depois da busca|Depois do termo|certificate-pending-hint|Use esta lista como rota' docs/index.html docs/modules/index.html docs/busca.html docs/glossario.html docs/certificado.html`
- `rg -n "final-cta-hint|modules-next-step-hint|utility-next-step-copy|certificate-pending-hint" styles/main.scss styles/main-dark.scss PUBLIC_SITE_COMPONENTS.md data/site-manifest.yml scripts/validate_site_manifest.R`

### Test results

- Manifest validation passed.
- SCSS compilation passed.
- Whitespace diff check passed.
- Targeted Quarto render passed for homepage, module index, search, glossary and certificate.
- Rendered HTML inspection confirmed the new decision hints and certificate pending guidance.
- Full prepublish gate passed locally after the log and NEXT updates.

### Pending items

- True browser screenshot QA remains pending because no browser automation tool was exposed by tool discovery in this session.
- Publish only after an explicit publication request.

---

## 2026-05-10 — Browser-readiness hardening for public UX actions

### Block objective

Execute another site-only public visual/UX block aligned with `publication-readiness-review`: harden the newly clickable public journey actions for browser review, improve microcopy and accessibility labels, and keep the component/manifest contract current without publishing.

### Cycles executed

1. Diagnosis: the homepage hero action-note links were clickable, but the first-viewport note did not explicitly tell visitors how to use the three choices as a session decision.
   Implementation: added `.hero-action-note-hint` to `index.qmd` before the note grid.
   Testing: rendered `index.qmd` and confirmed `.hero-action-note-hint` plus the copy in `docs/index.html`.
   Notes: this keeps the first viewport public and editorial while reducing indecision between the three entry routes.
2. Diagnosis: the module-index navigation contract had three actions, but one label was still abbreviated and the contract copy lacked a compact decision criterion.
   Implementation: added `.modules-navigation-contract-hint`, expanded `Abrir M01` to `Abrir Módulo 01`, and added aria labels to the direct module-index actions.
   Testing: rendered `modules/index.qmd` and confirmed the hint, expanded label and aria labels in `docs/modules/index.html`.
   Notes: this strengthens public navigation without changing the navbar or app-facing structure.
3. Diagnosis: search and glossary recovery/result-close links were visible, but several links lacked destination-specific aria labels.
   Implementation: added explicit aria labels to no-result and result-close links in `busca.qmd` and `glossario.qmd`.
   Testing: rendered both utility pages and confirmed representative aria labels in generated HTML.
   Notes: this improves keyboard/screen-reader clarity for utility recovery flows.
4. Diagnosis: the certificate incomplete-state summary was dynamic and actionable, but the action area was not explicitly tied to the progress summary for assistive navigation.
   Implementation: gave `#cert-progress-summary` `role="status"` and connected `.certificate-actions` with `aria-describedby="cert-progress-summary"`.
   Testing: rendered `certificado.qmd` and confirmed both attributes in `docs/certificado.html`.
   Notes: the certificate flow remains browser-local and public-facing; no backend or app behavior was added.
5. Diagnosis: the new hints and link labels needed responsive, dark-mode, documentation and manifest/validator coverage before publication review.
   Implementation: hardened `.entry-link` wrapping, tap target and underline behavior in `styles/main.scss`, added dark-mode hint color in `styles/main-dark.scss`, documented the new hint classes, added them to `data/site-manifest.yml` editorial patterns and protected them in `scripts/validate_site_manifest.R`.
   Testing: manifest validation, SCSS validation, whitespace diff check, targeted Quarto render and rendered HTML inspection passed.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `modules/index.qmd`
- `busca.qmd`
- `glossario.qmd`
- `certificado.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added first-viewport guidance for choosing one homepage action per study session.
- Added a compact decision criterion and clearer labels in the module-index navigation contract.
- Added destination-specific aria labels to search and glossary recovery links.
- Connected certificate pending actions to the dynamic progress summary.
- Improved `.entry-link` responsiveness, focus/tap readiness and dark-mode hint coverage.

### Problems fixed

- Reduced ambiguity in the homepage and module-index micro-action areas before browser review.
- Improved accessibility semantics for utility and certificate action flows.
- Added manifest, documentation and validator coverage for the new public hint classes.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `git diff --check`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd busca.qmd glossario.qmd certificado.qmd --no-execute`
- `rg -n "hero-action-note-hint|Escolha uma ação por sessão|Abrir Módulo 01|modules-navigation-contract-hint|Ver fases da trilha|Ver exemplos de busca úteis|Abrir glossário técnico|Abrir busca do curso|role=\"status\"|aria-describedby=\"cert-progress-summary\"" docs/index.html docs/modules/index.html docs/busca.html docs/glossario.html docs/certificado.html`
- `rg -n "hero-action-note-hint|modules-navigation-contract-hint|width: fit-content|min-height: 44px|overflow-wrap: anywhere|text-underline-offset|cert-progress-summary" styles/main.scss styles/main-dark.scss PUBLIC_SITE_COMPONENTS.md data/site-manifest.yml scripts/validate_site_manifest.R`

### Test results

- Manifest validation passed.
- SCSS compilation passed.
- Whitespace diff check passed.
- Targeted Quarto render passed for homepage, module index, search, glossary and certificate.
- Rendered HTML inspection confirmed the new hints, aria labels and certificate action semantics.
- Full prepublish gate passed locally after the log and NEXT updates.

### Pending items

- True browser screenshot QA remains pending because no browser automation tool was exposed by tool discovery in this session.
- Publish only after an explicit publication request.

---

## 2026-05-10 — Actionable recovery links and next-pending certificate CTA

### Block objective

Execute another site-only public visual/UX block aligned with `publication-readiness-review`: make existing readiness/recovery panels more directly actionable, improve the certificate pending CTA and keep validation/documentation coverage current without publishing.

### Cycles executed

1. Diagnosis: the homepage hero note had clickable routes, but the shorthand `Abrir M01` label was less explicit than the expanded primary CTA contract.
   Implementation: changed the first hero-note link to `Abrir Módulo 01` and added explicit aria labels to the three hero-note links in `index.qmd`.
   Testing: rendered `index.qmd` and confirmed the expanded label plus aria labels in `docs/index.html`.
   Notes: this improves accessibility and clarity while preserving the primary hero CTA hierarchy.
2. Diagnosis: the module-index navigation contract described open/compare/conclude actions, but still required visitors to infer the actual destination.
   Implementation: added direct `.entry-link` actions to `.modules-navigation-contract-item` in `modules/index.qmd`.
   Testing: rendered `modules/index.qmd` and confirmed the links in `docs/modules/index.html`.
   Notes: this strengthens the module index as a public return point without changing navbar structure.
3. Diagnosis: search and glossary no-result panels explained recovery but did not provide direct routes to examples, modules or the study route.
   Implementation: added direct `.entry-link` recovery actions to `.utility-no-result-item` in `busca.qmd` and `glossario.qmd`.
   Testing: rendered both utility pages and confirmed representative no-result links in generated HTML.
   Notes: this improves utility recovery without adding new search behavior or backend work.
4. Diagnosis: the certificate incomplete state had a summary and module badges, but the primary action always pointed visually to a generic continuation.
   Implementation: renamed the primary incomplete-state action to `Continuar pendência`, added `#cert-next-pending-link`, and updated JS to point it to the first pending module with an expanded aria label.
   Testing: rendered `certificado.qmd` and confirmed `cert-next-pending-link`, `updateNextPendingAction` and dynamic aria-label logic in `docs/certificado.html`.
   Notes: the certificate state remains entirely browser-local.
5. Diagnosis: the new direct links and dynamic CTA needed spacing, documentation and validation coverage.
   Implementation: updated `styles/main.scss` for link spacing and the next-pending CTA width, updated `PUBLIC_SITE_COMPONENTS.md` and extended `scripts/validate_site_manifest.R` to protect `#cert-next-pending-link`.
   Testing: manifest validation, SCSS validation, whitespace diff check, targeted Quarto render and rendered HTML inspection passed.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `modules/index.qmd`
- `busca.qmd`
- `glossario.qmd`
- `certificado.qmd`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Clarified homepage hero-note link labels and aria labels.
- Added direct module-index navigation-contract actions.
- Added direct no-result recovery links to search and glossary.
- Added a dynamic certificate CTA for the next pending module.
- Added style, documentation and validator coverage for the new CTA/link states.

### Problems fixed

- Reduced remaining inference between recovery copy and actual navigation.
- Made the certificate incomplete state point to the first real pending module instead of a generic starting point.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `git diff --check`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd busca.qmd glossario.qmd certificado.qmd --no-execute`
- `rg -n "Abrir Módulo 01|aria-label=\"Abrir o índice de módulos\"|modules-navigation-contract|Checar certificado|Ver exemplos|cert-next-pending-link|Continuar pendência|updateNextPendingAction|Continuar pelo|certificate-progress-summary" docs/index.html docs/modules/index.html docs/busca.html docs/glossario.html docs/certificado.html`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed after adding style coverage for `#cert-next-pending-link`.
- SCSS compilation passed.
- Whitespace diff check passed.
- Targeted Quarto render passed for homepage, module index, search, glossary and certificate.
- Rendered HTML inspection confirmed new links and next-pending certificate CTA logic.
- Full prepublish gate passed locally after the log and NEXT updates.

### Pending items

- Browser screenshot QA remains pending because no local browser tool was exposed in this session.
- Publish only after an explicit publication request.

---

## 2026-05-10 — Clickable hero note, utility return links and certificate progress summary

### Block objective

Execute another site-only public visual/UX block aligned with `publication-readiness-review`: make the current public decision panels more actionable, improve the dynamic certificate pending state and keep validation/documentation coverage current without publishing.

### Cycles executed

1. Diagnosis: the homepage hero note grid was now readable, but each micro-decision still required visitors to look back up at the hero buttons.
   Implementation: added direct `.entry-link` actions to each `.hero-action-note-item` in `index.qmd`.
   Testing: rendered `index.qmd` and confirmed `Abrir M01`, `Ver índice` and `Planejar` links in `docs/index.html`.
   Notes: this improves first-viewport keyboard and click flow without changing the primary CTA hierarchy.
2. Diagnosis: the study-route start-today panel described states but did not expose direct routes for those states.
   Implementation: added direct links to M01, module index and certificate inside `.route-start-today-item` in `semanas/index.qmd`.
   Testing: rendered `semanas/index.qmd` and confirmed the new links in `docs/semanas/index.html`.
   Notes: this keeps the route public and navigational, not stateful.
3. Diagnosis: search and glossary result-close panels explained where to go next, but the actions were still text-only.
   Implementation: added direct `.entry-link` actions to `.utility-result-close-item` in `busca.qmd` and `glossario.qmd`.
   Testing: rendered both pages and confirmed result-close links in generated HTML.
   Notes: this reduces dead-end utility behavior and returns visitors to the study path.
4. Diagnosis: the certificate pending list showed module badges, but the page did not summarize completion progress before the item list.
   Implementation: added `#cert-progress-summary` with `.certificate-progress-summary`, filled by JS as `N de 12 módulos concluídos` plus next pending module.
   Testing: rendered `certificado.qmd` and confirmed the summary element and JS text in `docs/certificado.html`.
   Notes: certificate state remains browser-local; no app or backend behavior was added.
5. Diagnosis: the new interactive/linked elements needed mobile, dark-mode and documentation coverage.
   Implementation: adjusted `styles/main.scss` and `styles/main-dark.scss` for linked micro-panels, mobile certificate progress layout and dark summary text; updated `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R` for `.certificate-progress-summary`.
   Testing: manifest validation, SCSS validation, whitespace diff check, targeted Quarto render and rendered HTML inspection passed.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `semanas/index.qmd`
- `busca.qmd`
- `glossario.qmd`
- `certificado.qmd`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Made homepage hero-note decisions directly clickable.
- Added direct start-state links to the study route.
- Added direct return links to search/glossary result-close panels.
- Added a dynamic certificate progress summary before the pending-module list.
- Improved mobile layout and dark-mode coverage for the new progress and link states.

### Problems fixed

- Reduced friction between decision copy and actual navigation.
- Made certificate pending state easier to understand before scanning all 12 modules.
- Improved small-screen certificate progress layout by keeping state/module chips together and moving the title below.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `git diff --check`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd semanas/index.qmd busca.qmd glossario.qmd certificado.qmd --no-execute`
- `rg -n "Abrir M01|Ver índice|Planejar|Checar certificado|Abrir glossário|certificate-progress-summary|formatModuleLabel|Próximo pendente|certificate-progress-title|certificate-progress-module" docs/index.html docs/semanas/index.html docs/busca.html docs/glossario.html docs/certificado.html`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- SCSS compilation passed.
- Whitespace diff check passed.
- Targeted Quarto render passed for homepage, study route, search, glossary and certificate.
- Rendered HTML inspection confirmed new links and certificate progress summary.
- Full prepublish gate passed locally after the log and NEXT updates.

### Pending items

- Browser screenshot QA remains pending because no local browser tool was exposed in this session.
- Publish only after an explicit publication request.

---

## 2026-05-10 — Publication readiness: hero note + certificate progress labels

### Block objective

Execute another site-only long block aligned with `publication-readiness-review`: fix high-impact first-viewport clarity issues, tighten CTA reliability in the navbar, improve the certificate pending-module list, and keep components documented for future app-driven management — without publishing.

### Cycles executed

1. Diagnosis: the homepage hero action note was styled with low-contrast (white text on a light hero copy background) and the guidance was hard to scan quickly.
   Implementation: converted the hero action note into a 3-item micro-decision grid (`.hero-action-note-grid` / `.hero-action-note-item`) and updated the light/dark styles so the note reads as an editorial card on both themes.
   Testing: rendered `index.qmd` and confirmed the new hero note markup in `docs/index.html`; SCSS compilation succeeded during Quarto render.
   Notes: this restores above-the-fold guidance visibility without adding new navigation actions.
2. Diagnosis: the navbar journey CTA (`Começar M01`) could lose its button styling when treated as an active link (selector collision with `.nav-link.active` styling).
   Implementation: added an explicit CTA override for the active/`aria-current="page"` states in both light (`styles/main.scss`) and dark (`styles/main-dark.scss`) themes.
   Testing: rendered `modules/modulo01-introducao-ao-melhoramento-animal.qmd` and verified the navbar markup renders and SCSS compiles.
   Notes: this is a stability fix to keep the CTA appearance consistent across pages.
3. Diagnosis: the certificate pending-module list linked correctly, but it was slower to map “what’s missing” to a module number at a glance.
   Implementation: added a compact `M01…M12` badge to each item via JS (`certificate-progress-module`) and updated aria-labels to include the module code.
   Testing: rendered `certificado.qmd` and confirmed the updated script is present in `docs/certificado.html`; SCSS compilation succeeded.
   Notes: this improves scanning without changing the progress contract (still browser-local).
4. Diagnosis: the new hero note grid needed better intermediate breakpoints (tablet widths) for readability.
   Implementation: added a responsive rule to collapse the grid to 2 columns at <=980px and 1 column at <=640px.
   Testing: re-rendered `index.qmd`; no SCSS errors.
   Notes: keeps layout premium and avoids cramped micro-cards.
5. Diagnosis: new subcomponents were introduced but were not yet captured in the public component documentation used as a governance contract.
   Implementation: updated `PUBLIC_SITE_COMPONENTS.md` to include the hero note grid/item classes and the certificate progress module/title classes.
   Testing: ran manifest and prepublish validations; no contract failures.
   Notes: improves modular preparation for later app-managed regions without turning the site into an admin surface.

### Files changed in this block

- `index.qmd`
- `certificado.qmd`
- `styles/main.scss`
- `styles/main-dark.scss`
- `PUBLIC_SITE_COMPONENTS.md`
- `NEXT_SITE.md`
- `WORKLOG_SITE.md`

### Improvements implemented

- Hero “how to start” guidance is visible and scannable (light + dark).
- Navbar journey CTA keeps stable styling even if marked active/current.
- Certificate pending list now exposes `M01…M12` mapping at a glance.
- Tablet/mobile breakpoint polish for the hero note grid.
- Documentation updated for new public subcomponents.

### Problems fixed

- Fixed a high-impact contrast regression in `.hero-action-note`.

### Commands executed

- `git diff --check`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file(\"styles/main.scss\") |> invisible(); sass::sass_file(\"styles/main-dark.scss\") |> invisible(); cat(\"scss ok\\n\")'`
- `PATH=\"/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH\" HOME=/private/tmp/quarto-home Rscript --vanilla scripts/prepublish_site_check.R`

### Test results

- Site manifest validation passed.
- SCSS compilation passed.
- Full prepublish gate passed locally after the newest edits.

### Pending items

- Perform true visual QA in a browser (light/dark + mobile widths), especially for the hero note grid and the certificate pending list (dynamic).
- Publish only after an explicit publication request.

---

## 2026-05-10 — Start-now, navigation contract and utility close block

### Block objective

Execute another site-only public visual/UX evolution block on top of the unpublished local work. Keep changes local and improve immediate homepage entry, module-index navigation closure, study-route starting state, utility result closure and component governance.

### Cycles executed

1. Diagnosis: the homepage had first-action and next-click guidance, but the first post-hero decision could still be made more immediate for visitors starting with limited time.
   Implementation: added `.home-start-now` to `index.qmd`, offering short routes for 20-minute start, module overview and weekly planning.
   Testing: rendered `index.qmd` and confirmed `.home-start-now` plus representative copy in `docs/index.html`.
   Notes: this strengthens first-viewport continuation without adding app state.
2. Diagnosis: the module index had quick jumps and resume guidance, but lacked a compact contract that every index visit should end with one clear action.
   Implementation: added `.modules-navigation-contract` to `modules/index.qmd`, framing the index as a public return point for opening, comparing or concluding.
   Testing: rendered `modules/index.qmd` and confirmed `.modules-navigation-contract` in `docs/modules/index.html`.
   Notes: this improves public navigation/CTA clarity while preserving existing navbar order.
3. Diagnosis: the study route assumed a week-based progression, but visitors returning mid-course needed a clearer way to start from their current state.
   Implementation: added `.route-start-today` to `semanas/index.qmd`, distinguishing first contact, resumed study and final review.
   Testing: rendered `semanas/index.qmd` and confirmed `.route-start-today` in `docs/semanas/index.html`.
   Notes: this keeps the route practical without adding scheduling or account features.
4. Diagnosis: search and glossary explained query planning and failed-result recovery, but not how to stop using the utility after a useful result.
   Implementation: added `.utility-result-close` to `busca.qmd` and `glossario.qmd`, guiding visitors back to definition, context or route.
   Testing: rendered both utility pages and confirmed `.utility-result-close` in `docs/busca.html` and `docs/glossario.html`.
   Notes: utility pages remain public learning aids, not admin tools.
5. Diagnosis: the new public regions needed responsive, dark-mode, manifest, documentation and validator coverage before the full gate.
   Implementation: extended `styles/main.scss`, `styles/main-dark.scss`, `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R`.
   Testing: manifest validation, SCSS validation, whitespace diff check, targeted Quarto render and rendered HTML inspection passed.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `modules/index.qmd`
- `semanas/index.qmd`
- `busca.qmd`
- `glossario.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added homepage start-now routing for short sessions.
- Added module-index navigation-contract guidance.
- Added study-route start-today guidance for different visitor states.
- Added utility result-close guidance to search and glossary.
- Added responsive, dark-mode, manifest, documentation and validator coverage for the new regions.

### Problems fixed

- Homepage first action now handles limited-time visitors more directly.
- Module index now frames every visit as a decision point.
- Study route now supports visitors who are not starting from week 1.
- Search and glossary now provide a clearer stop-and-return point after a useful result.
- The new public regions are protected by the site contract.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `git diff --check`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd semanas/index.qmd busca.qmd glossario.qmd --no-execute`
- `rg -n "home-start-now|Se você vai começar agora|modules-navigation-contract|O índice deve sempre devolver|route-start-today|Comece pelo estado de hoje|utility-result-close|Feche a busca|Feche o termo" docs/index.html docs/modules/index.html docs/semanas/index.html docs/busca.html docs/glossario.html`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- SCSS compilation passed.
- Whitespace diff check passed.
- Targeted Quarto render passed for homepage, module index, study route, search and glossary.
- Rendered HTML inspection confirmed all new public components and representative copy.
- Full prepublish gate passed locally after the log and NEXT updates.

### Pending items

- Browser screenshot QA remains pending because no local browser tool was exposed in this session.
- Publish only after an explicit publication request.

---

## 2026-05-10 — Session closure, resume route and final-check UX block

### Block objective

Execute another site-only public visual/UX evolution block on top of the unpublished local work. Keep changes local and improve homepage session closure, module-index resume navigation, certificate final-check guidance, institutional UX criteria and public component governance.

### Cycles executed

1. Diagnosis: the homepage already explained first action and next click, but did not give a compact closing ritual before the visitor leaves for another route.
   Implementation: added `.home-session-close` to `index.qmd`, asking visitors to register the question, choose one route and resume through the module index when appropriate.
   Testing: rendered `index.qmd` and confirmed `.home-session-close` plus representative copy in `docs/index.html`.
   Notes: this improves first-page learning discipline without adding progress state or app behavior.
2. Diagnosis: the module index had opening-flow guidance, but resume navigation still depended on visitors mapping their state to phases or certificate manually.
   Implementation: added `.modules-resume-route` to `modules/index.qmd`, with explicit first-time, resumed-study and closing routes.
   Testing: rendered `modules/index.qmd` and confirmed `.modules-resume-route` in `docs/modules/index.html`.
   Notes: this cycle covers public navigation/CTA flow while preserving the existing navbar.
3. Diagnosis: the certificate page explained identity and responsible use, but the dynamic form needed a clearer final editorial check immediately before generation.
   Implementation: added `.certificate-final-check` to `certificado.qmd`, covering browser, name and usage checks before PDF generation.
   Testing: rendered `certificado.qmd` and confirmed `.certificate-final-check` in `docs/certificado.html`.
   Notes: the certificate logic remains browser-local and unchanged.
4. Diagnosis: the About page described public/editorial boundaries, but it did not define a visitor-facing criterion for future UX review.
   Implementation: added `.about-visitor-path` to `perfil.qmd`, defining orientation, context and evidence as signs of a successful public visit.
   Testing: rendered `perfil.qmd` and confirmed `.about-visitor-path` in `docs/perfil.html`.
   Notes: this keeps institutional content tied to public experience quality rather than internal administration.
5. Diagnosis: the new public blocks needed responsive, dark-mode, manifest, documentation and validator coverage.
   Implementation: extended `styles/main.scss`, `styles/main-dark.scss`, `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R`.
   Testing: manifest validation, SCSS validation, whitespace diff check, targeted Quarto render and rendered HTML inspection passed.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `modules/index.qmd`
- `certificado.qmd`
- `perfil.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added homepage session-close guidance after next-click decision support.
- Added module-index resume-route navigation for first visit, resumed study and closure.
- Added certificate final-check guidance before PDF generation.
- Added About-page visitor-path criteria for future public UX review.
- Added responsive, dark-mode, manifest, documentation and validator coverage for the new regions.

### Problems fixed

- Homepage sessions now have a clearer close-and-route ritual.
- The module index now better handles visitors resuming from different states.
- Certificate generation now has a more explicit final pre-submit checkpoint.
- The institutional page now states how public UX changes should be judged.
- The new public regions are protected by the site contract.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `git diff --check`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd certificado.qmd perfil.qmd --no-execute`
- `rg -n "home-session-close|Feche a sessão|modules-resume-route|Retome pelo estado|certificate-final-check|Última checagem|about-visitor-path|Como reconhecer uma boa visita" docs/index.html docs/modules/index.html docs/certificado.html docs/perfil.html`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- SCSS compilation passed.
- Whitespace diff check passed.
- Targeted Quarto render passed for homepage, module index, certificate and About.
- Rendered HTML inspection confirmed all new public components and representative copy.
- Full prepublish gate passed locally after the log and NEXT updates.

### Pending items

- Browser screenshot QA remains pending because no local browser tool was exposed in this session.
- Publish only after an explicit publication request.

---

## 2026-05-10 — Next-click, module opening and recovery guidance block

### Block objective

Execute another site-only public visual/UX evolution block on top of the current unpublished local work. Keep changes local and improve next-click decisions, module-opening flow, weekly session splitting, utility recovery and component governance.

### Cycles executed

1. Diagnosis: the homepage described evidence and session choices, but did not explicitly tell visitors what to do after a session leaves a useful evidence sentence.
   Implementation: added `.home-next-click` to `index.qmd`, framing the next click as opening, consulting or closing based on the evidence just produced.
   Testing: rendered `index.qmd` and confirmed `.home-next-click` plus representative copy in `docs/index.html`.
   Notes: this strengthens homepage progression without changing global navigation or app behavior.
2. Diagnosis: the module index had readiness guidance, but the transition from index to an individual long module could still be made more explicit.
   Implementation: added `.modules-open-flow` to `modules/index.qmd`, defining read, run and verify as the expected opening sequence.
   Testing: rendered `modules/index.qmd` and confirmed `.modules-open-flow` in `docs/modules/index.html`.
   Notes: this improves the module collection flow while preserving the canonical catalog.
3. Diagnosis: the study route had session models, but visitors with fragmented time needed a concrete way to split the week without losing the read-run-decide cycle.
   Implementation: added `.route-session-split` to `semanas/index.qmd`, splitting a busy week into 20, 30 and 10 minute actions.
   Testing: rendered `semanas/index.qmd` and confirmed `.route-session-split` in `docs/semanas/index.html`.
   Notes: this supports responsiveness to real study schedules without adding scheduling state.
4. Diagnosis: search and glossary had start-choice and query-planning guidance, but lacked recovery guidance for too few, too broad or insufficient results.
   Implementation: added `.utility-no-result` to `busca.qmd` and `glossario.qmd`, giving recovery actions for failed search/definition moments.
   Testing: rendered both utility pages and confirmed `.utility-no-result` in `docs/busca.html` and `docs/glossario.html`.
   Notes: this keeps utility pages as public learning support, not admin tools.
5. Diagnosis: the new public components needed style, dark-mode, manifest, documentation and validation coverage.
   Implementation: extended `styles/main.scss`, `styles/main-dark.scss`, `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R`.
   Testing: manifest validation, SCSS validation, whitespace diff check, targeted Quarto render and rendered HTML inspection passed.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `modules/index.qmd`
- `semanas/index.qmd`
- `busca.qmd`
- `glossario.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added homepage next-click guidance after evidence is produced.
- Added module-index opening flow guidance.
- Added study-route split-session guidance for busy weeks.
- Added utility recovery guidance for search/glossary moments that do not resolve the question.
- Added responsive, dark-mode, manifest, documentation and validator coverage.

### Problems fixed

- Homepage evidence flow now leads to a clearer next action.
- Module index now explains what to do immediately after opening a module.
- The weekly route now handles fragmented schedules more explicitly.
- Utility pages now help visitors recover when search or glossary lookup is insufficient.
- The new public regions are protected by the site contract.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd semanas/index.qmd busca.qmd glossario.qmd --no-execute`
- `rg -n "home-next-click|Depois da evidência|modules-open-flow|Ao abrir um módulo|route-session-split|Se a semana estiver cheia|utility-no-result|Se a busca não resolver|Se a definição não bastar" docs/index.html docs/modules/index.html docs/semanas/index.html docs/busca.html docs/glossario.html`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- Whitespace diff check passed.
- SCSS compilation passed.
- Targeted Quarto render passed for homepage, module index, study route, search and glossary.
- Rendered HTML inspection confirmed all new public components and representative copy.
- Full prepublish gate passed locally after the log and NEXT updates.

### Pending items

- Browser screenshot QA remains pending because no local browser tool was exposed in this session.
- Publish only after an explicit publication request.

---

## 2026-05-10 — Hero choice, utility routing and module reading rhythm block

### Block objective

Execute a new post-publication site-only public visual/UX evolution block. Keep changes local, improve first-viewport decision support, utility-page routing, module reading rhythm and the supporting manifest/style validation contract.

### Cycles executed

1. Diagnosis: the homepage hero had three clear CTAs, but visitors still had to infer which action matched first visit, resumed study or planning.
   Implementation: added `.hero-action-note` to `index.qmd`, clarifying how to choose between module start, index exploration and weekly planning.
   Testing: rendered `index.qmd` and confirmed `.hero-action-note` in `docs/index.html`.
   Notes: this improves the first viewport without adding app state or changing the published navigation structure.
2. Diagnosis: search and glossary pages had return guidance, but the first decision after using each utility could be more direct.
   Implementation: added `.utility-start-choice` to `busca.qmd` and `glossario.qmd`, giving three route choices for learning, definition/context and sequencing.
   Testing: rendered both pages and confirmed `.utility-start-choice` in `docs/busca.html` and `docs/glossario.html`.
   Notes: this strengthens public CTAs on utility pages without turning them into dashboards.
3. Diagnosis: module pages had orientation chips and later evidence notes, but a consistent early reading rhythm was missing across the long-form lesson pages.
   Implementation: added `.module-reading-rhythm` to all 12 module pages after the opening orientation/phase note.
   Testing: confirmed all 12 module sources contain `.module-reading-rhythm`; rendered modules 01, 03 and 12 and confirmed the block in generated HTML.
   Notes: the copy is intentionally compact and does not alter scientific content or scripts.
4. Diagnosis: the new public patterns needed light/dark styling and mobile collapse behavior consistent with existing editorial panels.
   Implementation: extended `styles/main.scss` and `styles/main-dark.scss` for `.hero-action-note`, `.utility-start-choice` and `.module-reading-rhythm`.
   Testing: SCSS compilation passed for light and dark styles.
   Notes: no broad SCSS refactor was attempted in this block.
5. Diagnosis: the new patterns needed to remain app-manageable later through the public site manifest and validator.
   Implementation: updated `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R` to cover hero action notes, utility start choices and module reading rhythm.
   Testing: manifest validation, whitespace diff check, targeted Quarto render and rendered HTML inspection passed.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `busca.qmd`
- `glossario.qmd`
- `modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `modules/modulo02-bases-da-genetica-quantitativa.qmd`
- `modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
- `modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd`
- `modules/modulo05-herdabilidade-e-repetibilidade.qmd`
- `modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `modules/modulo07-modelos-lineares-e-modelos-mistos.qmd`
- `modules/modulo08-blup-e-avaliacao-genetica.qmd`
- `modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd`
- `modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd`
- `modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- `modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added first-viewport action-selection guidance to the homepage hero.
- Added fast route choices to search and glossary pages.
- Added a consistent reading-rhythm note to all module pages.
- Added responsive and dark-mode styling for the new patterns.
- Added manifest, documentation and validator coverage.

### Problems fixed

- Homepage CTAs now explain which action fits each visitor situation.
- Utility pages now route visitors back into study decisions faster.
- Long module pages now state the intended read-run-decide rhythm before the lesson body.
- The new public regions are protected by validation and future content-governance metadata.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd busca.qmd glossario.qmd modules/modulo01-introducao-ao-melhoramento-animal.qmd modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd --no-execute`
- `rg -n "hero-action-note|Primeira visita|utility-start-choice|Escolha o destino|Escolha o próximo contexto|module-reading-rhythm|Ritmo de leitura" docs/index.html docs/busca.html docs/glossario.html docs/modules/modulo01-introducao-ao-melhoramento-animal.html docs/modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.html docs/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html`
- `rg -l "module-reading-rhythm" modules/*.qmd | wc -l`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- Whitespace diff check passed.
- SCSS compilation passed.
- Targeted Quarto render passed for homepage, search, glossary and representative modules 01, 03 and 12.
- Rendered HTML inspection confirmed all new public components and representative copy.
- Full prepublish gate passed locally after the log and NEXT updates.

### Pending items

- Browser screenshot QA remains pending because no local browser tool was exposed in this session.
- Publish only after an explicit publication request.

---

## 2026-05-10 — Publication-readiness UX polish and route table guide block

### Block objective

Execute another site-only public visual/UX evolution block under the current `publication-readiness-review` contract. Keep changes local and polish the first-viewport CTA, public journey CTA, module phase entry, study-route table reading and modular validation coverage.

### Cycles executed

1. Diagnosis: the homepage hero offered study and module exploration, but the first viewport did not expose the 12-week planning route as a peer action.
   Implementation: added a third hero CTA, `Planejar 12 semanas`, linking directly to the study route.
   Testing: rendered `index.qmd` and confirmed the CTA in `docs/index.html`.
   Notes: this improves first-viewport path selection without adding a new homepage region or app behavior.
2. Diagnosis: the global right-side navbar CTA was generic as `Começar`, making the destination less explicit.
   Implementation: renamed the public journey CTA to `Começar M01` and added `navigation.cta` to the site manifest as the canonical source for that navbar action.
   Testing: manifest validation confirms `_quarto.yml` navbar CTA and `data/site-manifest.yml` stay synchronized.
   Notes: this keeps the top navigation public-facing and prepares the CTA for future editorial management.
3. Diagnosis: phase cards described each phase but required visitors to look elsewhere for the first module of that phase.
   Implementation: added `Começar fase` links inside all four phase cards on `modules/index.qmd`.
   Testing: rendered `modules/index.qmd` and confirmed all four phase-start links in `docs/modules/index.html`.
   Notes: this strengthens internal module flow while preserving the canonical module order.
4. Diagnosis: the study-route table was useful but could be clearer for visitors scanning it on mobile or after the visual map.
   Implementation: added `.route-table-guide` to `semanas/index.qmd`, explaining how to read week, theme and practice as a decision sequence.
   Testing: rendered `semanas/index.qmd` and confirmed `.route-table-guide` and representative copy in `docs/semanas/index.html`.
   Notes: this improves route comprehension without changing scripts or progress logic.
5. Diagnosis: the new public route-table pattern and navbar CTA needed style, dark-mode, documentation and validation coverage.
   Implementation: extended `styles/main.scss`, `styles/main-dark.scss`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R` for `.route-table-guide` and manifest-backed CTA validation.
   Testing: manifest validation, whitespace diff check, SCSS compilation, targeted Quarto render and rendered HTML inspection passed.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `_quarto.yml`
- `index.qmd`
- `modules/index.qmd`
- `semanas/index.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added direct 12-week planning CTA to the homepage hero.
- Clarified the global start CTA as `Começar M01`.
- Added manifest-backed validation for the navbar journey CTA.
- Added direct phase-start links inside the module-index phase cards.
- Added a study-route table reading guide.
- Added responsive/dark-mode styling and documentation for the new route-table guide.

### Problems fixed

- Homepage first-viewport choices now include study planning, not only module entry.
- The global CTA destination is explicit.
- Phase cards now support direct entry into each phase.
- The route table now explains how to convert each row into an action.
- The new CTA and route-table pattern are protected by validation.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd semanas/index.qmd --no-execute`
- `rg -n "Planejar 12 semanas|Começar M01|Começar fase|route-table-guide|Leia a tabela como" docs/index.html docs/modules/index.html docs/semanas/index.html`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- Whitespace diff check passed.
- SCSS compilation passed.
- Targeted Quarto render passed for homepage, module index and study route.
- Rendered HTML inspection confirmed the hero planning CTA, navbar CTA, phase-start links and route-table guide.
- Full prepublish gate passed locally after the log and NEXT updates.

### Pending items

- Browser screenshot QA remains pending because no local browser tool was exposed in this session.
- Publish only after an explicit publication request.

---

## 2026-05-10 — First session, phase entry and weekly output block

### Block objective

Execute another site-only public visual/UX evolution block under the current `publication-readiness-review` contract. Keep changes local and improve first-session clarity, direct phase entry, weekly output expectations and certificate identity guidance.

### Cycles executed

1. Diagnosis: the homepage now had trust anchors and route selection, but a visitor with limited time still needed a compact first-session model.
   Implementation: added `.home-first-session` to `index.qmd`, framing a short session as reading, script execution and a decision sentence.
   Testing: rendered `index.qmd` and confirmed `.home-first-session` in `docs/index.html`.
   Notes: this improves the public first-use experience without adding state or app behavior.
2. Diagnosis: the module index explained phases, but experienced visitors still needed direct entry points into each phase.
   Implementation: added `.modules-phase-entry` to `modules/index.qmd`, linking directly to modules 01, 03, 07 and 10.
   Testing: rendered `modules/index.qmd` and confirmed `.modules-phase-entry` in `docs/modules/index.html`.
   Notes: this strengthens navigation/CTA quality while preserving the canonical module order.
3. Diagnosis: the study route described phase handoff, but each week could better state what tangible output should remain after study.
   Implementation: added `.route-weekly-output` to `semanas/index.qmd`, defining note, comparison and decision as weekly outputs.
   Testing: rendered `semanas/index.qmd` and confirmed `.route-weekly-output` in `docs/semanas/index.html`.
   Notes: this keeps the route practical without turning it into a dashboard.
4. Diagnosis: the certificate page explained recovery and next use, but the name field needed clearer public guidance before PDF generation.
   Implementation: added `.certificate-identity-note` to `certificado.qmd`, covering spelling, privacy and use.
   Testing: rendered `certificado.qmd` and confirmed `.certificate-identity-note` in `docs/certificado.html`.
   Notes: no certificate JavaScript, storage or PDF logic was changed.
5. Diagnosis: the new public regions needed responsive, dark-mode, manifest, documentation and validator coverage.
   Implementation: extended `styles/main.scss`, `styles/main-dark.scss`, `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R`.
   Testing: manifest validation, whitespace diff check, SCSS compilation, targeted Quarto render and rendered HTML inspection passed.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `modules/index.qmd`
- `semanas/index.qmd`
- `certificado.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added homepage first-session guidance.
- Added direct phase entry links on the module index.
- Added weekly output expectations to the study route.
- Added certificate identity/name guidance.
- Added responsive, dark-mode, manifest, documentation and validator coverage.

### Problems fixed

- Visitors with limited time now have a clearer first-session path.
- Returning visitors can enter directly at the start of a phase.
- The weekly route now makes the expected study output explicit.
- Certificate name entry is clearer before PDF generation.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd semanas/index.qmd certificado.qmd --no-execute`
- `rg -n "home-first-session|modules-phase-entry|route-weekly-output|certificate-identity-note" docs/index.html docs/modules/index.html docs/semanas/index.html docs/certificado.html`
- `rg -n "Se você tem uma sessão|Entre pela fase certa|Toda semana precisa|Nome no certificado" docs/index.html docs/modules/index.html docs/semanas/index.html docs/certificado.html`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- Whitespace diff check passed.
- SCSS compilation passed.
- Targeted Quarto render passed for homepage, module index, study route and certificate page.
- Rendered HTML inspection confirmed all new public components and representative copy.
- Full prepublish gate passed locally.

### Pending items

- Browser screenshot QA remains pending because no local browser tool was exposed in this session.
- Publish only after an explicit publication request.

---

## 2026-05-10 — Trust anchors, readiness and module return block

### Block objective

Execute another site-only public visual/UX evolution block under the current `publication-readiness-review` contract. Keep changes local and improve trust cues, module-opening readiness, phase handoff and return decisions across module pages.

### Cycles executed

1. Diagnosis: the homepage exposed routes and intent, but still benefited from a compact trust cue near the first public flow.
   Implementation: added `.home-trust-anchors` to `index.qmd`, framing the experience as open, reproducible and responsible.
   Testing: rendered `index.qmd` and confirmed `.home-trust-anchors` in `docs/index.html`.
   Notes: this improves above-the-fold confidence without changing the hero structure or app scope.
2. Diagnosis: the module index offered route and phase guidance, but visitors needed a final readiness check before opening long module pages.
   Implementation: added `.modules-readiness-meter` to `modules/index.qmd`, tying each module click to question, time and return path.
   Testing: rendered `modules/index.qmd` and confirmed `.modules-readiness-meter` in `docs/modules/index.html`.
   Notes: this strengthens CTA quality without adding administrative state.
3. Diagnosis: the study route described weekly rhythm and evidence, but the transition between major phases could be more explicit.
   Implementation: added `.route-phase-handoff` to `semanas/index.qmd`, with close, review and advance guidance between phases.
   Testing: rendered `semanas/index.qmd` and confirmed `.route-phase-handoff` in `docs/semanas/index.html`.
   Notes: this supports realistic pacing and avoids treating the route as a rigid calendar.
4. Diagnosis: module pages had post-quiz notes and navigation, but the decision before leaving a module was not explicit across all modules.
   Implementation: added `.module-return-note` consistently to all 12 module pages before semantic module navigation.
   Testing: confirmed all 12 module sources contain `.module-return-note`; rendered modules 01, 06 and 12 and confirmed the block in generated HTML.
   Notes: the copy is intentionally generic and does not alter scientific lesson content.
5. Diagnosis: the new public regions needed responsive, dark-mode, manifest, documentation and validator coverage.
   Implementation: extended `styles/main.scss`, `styles/main-dark.scss`, `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R`.
   Testing: manifest validation, whitespace diff check, SCSS compilation, targeted Quarto render and rendered HTML inspection passed.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `modules/index.qmd`
- `semanas/index.qmd`
- `modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `modules/modulo02-bases-da-genetica-quantitativa.qmd`
- `modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
- `modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd`
- `modules/modulo05-herdabilidade-e-repetibilidade.qmd`
- `modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `modules/modulo07-modelos-lineares-e-modelos-mistos.qmd`
- `modules/modulo08-blup-e-avaliacao-genetica.qmd`
- `modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd`
- `modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd`
- `modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- `modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added homepage trust anchors for open, reproducible and responsible study.
- Added module-index readiness guidance before opening long modules.
- Added route phase-handoff guidance for transitions between study phases.
- Added a consistent module return decision note across all 12 modules.
- Added responsive, dark-mode, manifest, documentation and validator coverage.

### Problems fixed

- The homepage now gives a clearer trust signal before route selection.
- Module opening is framed as a deliberate study action, not a passive catalog click.
- The study route now clarifies phase transitions.
- Module pages now ask for an explicit return decision before previous/index/next navigation.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd semanas/index.qmd modules/modulo01-introducao-ao-melhoramento-animal.qmd modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd --no-execute`
- `rg -n "home-trust-anchors|modules-readiness-meter|route-phase-handoff|module-return-note" docs/index.html docs/modules/index.html docs/semanas/index.html docs/modules/modulo01-introducao-ao-melhoramento-animal.html docs/modules/modulo06-correlacoes-geneticas-e-fenotipicas.html docs/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html`
- `rg -n "Por que estudar aqui|Pronto para abrir|Atravesse fases|Volte com uma decisão" docs/index.html docs/modules/index.html docs/semanas/index.html docs/modules/modulo01-introducao-ao-melhoramento-animal.html docs/modules/modulo06-correlacoes-geneticas-e-fenotipicas.html docs/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html`
- `rg -l "module-return-note" modules/*.qmd | wc -l`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- Whitespace diff check passed.
- SCSS compilation passed.
- Targeted Quarto render passed for homepage, module index, study route and representative modules 01, 06 and 12.
- Rendered HTML inspection confirmed all new public components and representative copy.
- All 12 module source files contain `.module-return-note`.
- Full prepublish gate passed locally.

### Pending items

- Browser screenshot QA remains pending because no local browser tool was exposed in this session.
- Publish only after an explicit publication request.

---

## 2026-05-10 — Public route strip, phase decisions and support planning block

### Block objective

Execute another site-only public visual/UX evolution block under the current `publication-readiness-review` contract. Keep changes local and improve route clarity, phase decisions, support-page usefulness, certificate interpretation and public/app boundary clarity.

### Cycles executed

1. Diagnosis: the homepage first public path had many rich sections, but lacked a compact route strip that exposed the main public destinations immediately after the hero.
   Implementation: added `.home-route-strip` to `index.qmd`, with direct routes for studying, planning, consulting and concluding.
   Testing: rendered `index.qmd` and confirmed `.home-route-strip` in `docs/index.html`.
   Notes: this strengthens public navigation without changing the navbar or adding app behavior.
2. Diagnosis: the module index described phases and evidence, but visitors still benefited from seeing how the type of decision changes from foundations to genomics.
   Implementation: added `.modules-phase-decision` to `modules/index.qmd`, mapping each phase to its expected decision maturity.
   Testing: rendered `modules/index.qmd` and confirmed `.modules-phase-decision` in `docs/modules/index.html`.
   Notes: this keeps the index as a decision surface, not only a catalog.
3. Diagnosis: search and glossary had examples and return guidance, but users needed a small plan before querying or leaving a definition.
   Implementation: added `.utility-query-plan` to `busca.qmd` and `glossario.qmd`.
   Testing: rendered both utility pages and confirmed `.utility-query-plan` in `docs/busca.html` and `docs/glossario.html`.
   Notes: this improves support-page UX while preserving the modules as the main learning path.
4. Diagnosis: the certificate page clarified readiness and recovery, but not how to use the certificate responsibly after PDF generation.
   Implementation: added `.certificate-next-use` to `certificado.qmd`.
   Testing: rendered `certificado.qmd` and confirmed `.certificate-next-use` in `docs/certificado.html`.
   Notes: no certificate logic, storage or PDF generation code was changed.
5. Diagnosis: the About page described the public contract, but the public/internal boundary could be clearer for future app-managed content.
   Implementation: added `.about-editorial-boundary` to `perfil.qmd`, separating public, editable and internal responsibilities.
   Testing: rendered `perfil.qmd` and confirmed `.about-editorial-boundary` in `docs/perfil.html`.
   Notes: this supports modular preparation without exposing admin concepts as a product surface.
6. Diagnosis: the new regions needed responsive, dark-mode, manifest, documentation and validator coverage before final review.
   Implementation: extended `styles/main.scss`, `styles/main-dark.scss`, `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R`.
   Testing: manifest validation, whitespace diff check, SCSS compilation, targeted Quarto render and rendered HTML inspection passed.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `modules/index.qmd`
- `busca.qmd`
- `glossario.qmd`
- `certificado.qmd`
- `perfil.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added a homepage public route strip.
- Added phase-level decision guidance to the module index.
- Added query-planning guidance to search and glossary pages.
- Added responsible post-certificate use guidance.
- Added an About-page public/internal editorial boundary.
- Added responsive, dark-mode, documentation, manifest and validator coverage.

### Problems fixed

- Homepage public routes are easier to scan immediately after the hero.
- The module index now explains how each phase changes the visitor's decision.
- Search and glossary now help visitors prepare and exit support flows with a clear next action.
- Certificate interpretation now extends beyond PDF generation.
- Future app-management boundaries are clearer without changing the app.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd busca.qmd glossario.qmd certificado.qmd perfil.qmd --no-execute`
- `rg -n "home-route-strip|modules-phase-decision|utility-query-plan|certificate-next-use|about-editorial-boundary" docs/index.html docs/modules/index.html docs/busca.html docs/glossario.html docs/certificado.html docs/perfil.html`
- `rg -n "Quatro portas|Cada fase muda|Prepare a busca|Transforme a definição|Depois do PDF|continuar público" docs/index.html docs/modules/index.html docs/busca.html docs/glossario.html docs/certificado.html docs/perfil.html`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- Whitespace diff check passed.
- SCSS compilation passed.
- Targeted Quarto render passed for homepage, module index, search, glossary, certificate and About pages.
- Rendered HTML inspection confirmed all new public components and representative copy.
- Full prepublish gate passed locally.

### Pending items

- Browser screenshot QA remains pending because no local browser tool was exposed in this session.
- Publish only after an explicit publication request.

---

## 2026-05-10 — Progress snapshot, quick jumps and recovery route block

### Block objective

Execute another site-only public visual/UX evolution block under the current `publication-readiness-review` contract. Keep changes local and improve public recognition of progress, module-index navigation and recovery when the study rhythm breaks.

### Cycles executed

1. Diagnosis: the homepage explained public journey and evidence, but still lacked a compact way for visitors to recognize that study progress happened.
   Implementation: added `.home-progress-snapshot` to `index.qmd`, framing progress as clearer question, R comparison and defensible decision.
   Testing: rendered `index.qmd` and confirmed `.home-progress-snapshot` in `docs/index.html`.
   Notes: this keeps progress language editorial and avoids dashboard-like scoring.
2. Diagnosis: the module index had rich guidance, but long pages still benefit from direct internal anchors for phases, module catalog and completion.
   Implementation: added `.modules-quick-jump` to `modules/index.qmd`, linking to `#fases-da-trilha`, `#todos-os-modulos` and `#próximo-passo-recomendado`.
   Testing: rendered `modules/index.qmd` and confirmed `.modules-quick-jump` plus the generated anchor links in `docs/modules/index.html`.
   Notes: this improves public navigation without changing the module registry.
3. Diagnosis: the weekly route described rhythm and session models, but not how to recover when the visitor misses a week.
   Implementation: added `.route-recovery-plan` to `semanas/index.qmd`, with recovery paths for reading, code and closing evidence.
   Testing: rendered `semanas/index.qmd` and confirmed `.route-recovery-plan` in `docs/semanas/index.html`.
   Notes: the route now handles real study interruption without adding account or app assumptions.
4. Diagnosis: new panels needed to behave consistently on mobile, tablet and dark mode.
   Implementation: extended `styles/main.scss` and `styles/main-dark.scss` for `.home-progress-snapshot`, `.modules-quick-jump` and `.route-recovery-plan`, including responsive collapse and dark-mode contrast.
   Testing: SCSS compilation passed for light and dark styles.
   Notes: styles reuse the existing editorial card pattern.
5. Diagnosis: future app-based management and publication review require new public regions to be declared and validated.
   Implementation: updated `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R`.
   Testing: manifest validation and whitespace diff check passed.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `modules/index.qmd`
- `semanas/index.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added a homepage progress snapshot.
- Added internal quick jumps to the module index.
- Added a study-route recovery plan.
- Added responsive and dark-mode treatment for the new public UX components.
- Extended manifest, documentation and validator coverage.

### Problems fixed

- Visitors now have a clearer way to recognize progress without needing a dashboard.
- Module index navigation is easier to scan and jump through.
- The study route now supports recovery after an interrupted week.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd semanas/index.qmd --no-execute`
- `rg -n "home-progress-snapshot|modules-quick-jump|route-recovery-plan" docs/index.html docs/modules/index.html docs/semanas/index.html`
- `rg -n "Ver fases|Ver módulos|Ver fechamento|Perdi a leitura|Pergunta mais clara" docs/index.html docs/modules/index.html docs/semanas/index.html`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- Whitespace diff check passed.
- SCSS compilation passed.
- Targeted Quarto render passed for homepage, module index and study route.
- Rendered HTML inspection confirmed all new public components and internal anchor links.
- Full prepublish gate passed locally.

### Pending items

- Browser screenshot QA remains pending because no local browser tool was exposed in this session.
- Publish only after an explicit publication request.

---

## 2026-05-10 — Public journey, utility examples and certificate recovery block

### Block objective

Execute another site-only public visual/UX evolution block under the current `publication-readiness-review` contract. Keep changes local and strengthen the public journey, utility-page clarity, footer navigation and certificate recovery before any future publication.

### Cycles executed

1. Diagnosis: the homepage had intent routing and evidence contracts, but did not yet summarize the public journey as study, support and completion without an app-like panel.
   Implementation: added `.home-public-journey` to `index.qmd`, explaining study, support and completion as public steps.
   Testing: rendered `index.qmd` and confirmed `.home-public-journey` in `docs/index.html`.
   Notes: this reinforces the public product role and avoids administrative language.
2. Diagnosis: the footer did not include a direct return to `Início` and the footer phrase was less aligned with the current public journey language.
   Implementation: updated `_quarto.yml` and `data/site-manifest.yml` footer navigation to include `Início`, and changed footer copy to "MGenética · estudar, consultar, concluir".
   Testing: manifest validation passed and rendered HTML confirmed footer copy and home link.
   Notes: this improves public navigation without changing the app or publication state.
3. Diagnosis: search and glossary had decision guidance, but visitors still benefited from concrete examples of what to type or how to classify a term.
   Implementation: added `.utility-examples` to `busca.qmd` and `glossario.qmd`.
   Testing: rendered both pages and confirmed `.utility-examples` in `docs/busca.html` and `docs/glossario.html`.
   Notes: examples stay editorial and support the learning path instead of becoming admin utilities.
4. Diagnosis: the certificate page explained readiness and decision criteria, but not how to recover when the certificate remains locked.
   Implementation: added `.certificate-recovery` to `certificado.qmd` with routes for pending module, insecure concept and missing local progress.
   Testing: rendered `certificado.qmd` and confirmed `.certificate-recovery` in generated HTML.
   Notes: no certificate logic was changed.
5. Diagnosis: new public patterns needed responsive/dark-mode parity and governance coverage.
   Implementation: extended `styles/main.scss`, `styles/main-dark.scss`, `PUBLIC_SITE_COMPONENTS.md`, `data/site-manifest.yml` and `scripts/validate_site_manifest.R`.
   Testing: manifest validation, whitespace diff check, SCSS compilation, targeted Quarto render and rendered HTML inspection passed.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `_quarto.yml`
- `index.qmd`
- `busca.qmd`
- `glossario.qmd`
- `certificado.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added a homepage public journey summary.
- Added `Início` to the footer and aligned footer copy with the visitor journey.
- Added concrete search and glossary example guidance.
- Added certificate recovery guidance for locked/incomplete states.
- Added responsive, dark-mode, documentation, manifest and validator coverage for the new patterns.

### Problems fixed

- The homepage now states the public journey as study, support and completion.
- Footer navigation now has a direct home route.
- Search and glossary now give visitors more concrete starting points.
- Certificate page now explains what to do when completion is not yet available.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd busca.qmd glossario.qmd certificado.qmd --no-execute`
- `rg -n "home-public-journey|utility-examples|certificate-recovery" docs/index.html docs/busca.html docs/glossario.html docs/certificado.html`
- `rg -n "MGenética · estudar, consultar, concluir|href=\"(./)?index.html\"" docs/index.html docs/busca.html docs/glossario.html docs/certificado.html | head -60`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- Whitespace diff check passed.
- SCSS compilation passed.
- Targeted Quarto render passed for homepage, search, glossary and certificate pages.
- Rendered HTML inspection confirmed the new public components and footer home route.
- Full prepublish gate passed locally.

### Pending items

- Browser screenshot QA remains pending because no local browser tool was exposed in this session.
- Publish only after an explicit publication request.

---

## 2026-05-10 — Evidence path and module decision block

### Block objective

Execute another site-only public visual/UX evolution block under the current `publication-readiness-review` contract. Keep the work local and strengthen evidence-based navigation across the homepage, module index and module pages before any future publication.

### Cycles executed

1. Diagnosis: the homepage now routes visitors by intent, but the first public path still benefited from a more explicit promise that every route should end in evidence.
   Implementation: added `.home-path-contract` to `index.qmd`, framing question, output and decision as the expected evidence cycle.
   Testing: rendered `index.qmd` and confirmed `.home-path-contract` in `docs/index.html`.
   Notes: this reinforces public learning behavior without changing the hero or app scope.
2. Diagnosis: the module index had support and catalog guidance, but visitors still needed a compact rule for choosing the next module based on the evidence they already have.
   Implementation: added `.modules-choice-path` to `modules/index.qmd`, with advance, review and consult criteria.
   Testing: rendered `modules/index.qmd` and confirmed `.modules-choice-path` in `docs/modules/index.html`.
   Notes: the index now works better as a study decision surface, not only a catalog.
3. Diagnosis: module pages had practice contracts and quiz checkpoints, but the transition from interpretation to exercise could be more consistent across all 12 modules.
   Implementation: added `.module-evidence-path` mechanically to every module page before `.module-practice-contract`.
   Testing: confirmed all 12 module files contain `.module-evidence-path`; rendered modules 01, 06 and 12 and confirmed the block in generated HTML.
   Notes: the copy is generic and does not alter scientific lesson content.
4. Diagnosis: the new home, index and module patterns needed responsive and dark-mode parity before review.
   Implementation: extended `styles/main.scss` and `styles/main-dark.scss` for `.home-path-contract`, `.modules-choice-path` and `.module-evidence-path`, including mobile collapse and dark-mode contrast.
   Testing: SCSS compilation passed for light and dark styles.
   Notes: the new blocks reuse the existing editorial panel/card language.
5. Diagnosis: future app-based management and publication readiness require the new patterns to be documented and validated.
   Implementation: updated `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R` to declare and require the new public patterns.
   Testing: manifest validation and whitespace diff check passed.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `modules/index.qmd`
- `modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `modules/modulo02-bases-da-genetica-quantitativa.qmd`
- `modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
- `modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd`
- `modules/modulo05-herdabilidade-e-repetibilidade.qmd`
- `modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `modules/modulo07-modelos-lineares-e-modelos-mistos.qmd`
- `modules/modulo08-blup-e-avaliacao-genetica.qmd`
- `modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd`
- `modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd`
- `modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- `modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added a homepage evidence contract.
- Added evidence-based module choice guidance to the module index.
- Added a consistent evidence path to all 12 module pages.
- Added responsive and dark-mode treatment for the new public UX components.
- Extended manifest, documentation and validator coverage.

### Problems fixed

- Visitors now get a clearer rule for turning navigation into evidence.
- The module index now explains whether to advance, review or consult support.
- Module pages now consistently connect interpretation, script output and decision before exercises.

### Commands executed

- `perl -0pi -e 's/.../...' modules/*.qmd`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd modules/modulo01-introducao-ao-melhoramento-animal.qmd modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd --no-execute`
- `rg -n "home-path-contract|modules-choice-path|module-evidence-path" docs/index.html docs/modules/index.html docs/modules/modulo01-introducao-ao-melhoramento-animal.html docs/modules/modulo06-correlacoes-geneticas-e-fenotipicas.html docs/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html`
- `rg -l "module-evidence-path" modules/*.qmd | wc -l`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- Whitespace diff check passed.
- SCSS compilation passed.
- Targeted Quarto render passed for homepage, module index and representative modules 01, 06 and 12.
- Rendered HTML inspection confirmed all new public components.
- All 12 module source files contain `.module-evidence-path`.
- Full prepublish gate passed locally.

### Pending items

- Browser screenshot QA remains pending because no local browser tool was exposed in this session.
- Publish only after an explicit publication request.

---

## 2026-05-10 — Intent navigation and public evidence block

### Block objective

Execute a new site-only public visual/UX evolution block under the current `publication-readiness-review` contract. Keep changes local, strengthen the visitor journey before publication and preserve the separation between public site and app.

### Cycles executed

1. Diagnosis: the homepage first stretch explained the course and session types, but a visitor still had to infer the fastest path from their immediate intent.
   Implementation: added `.home-intent-switch` to `index.qmd`, with start, resume and consult routes.
   Testing: rendered `index.qmd` and confirmed `.home-intent-switch` in `docs/index.html`.
   Notes: the block supports first-viewport decision making without replacing the main hero or session-choice component.
2. Diagnosis: public navigation placed `Certificado` before discovery tools, which made the header read like completion came before search/glossary support.
   Implementation: reordered primary navigation in `_quarto.yml` and `data/site-manifest.yml` to `Início`, `Módulos`, `Roteiro`, `Busca`, `Glossário`, `Certificado`, `Sobre`.
   Testing: manifest validation passed and rendered HTML confirmed the new navbar order.
   Notes: footer order was already aligned with this flow.
3. Diagnosis: the About page described public role and credibility, but lacked a compact contract for what every public area should guarantee.
   Implementation: added `.about-public-contract` to `perfil.qmd`, covering direction, context and evidence.
   Testing: rendered `perfil.qmd` and confirmed `.about-public-contract` in `docs/perfil.html`.
   Notes: this reinforces institutional clarity without adding app/admin UI.
4. Diagnosis: the study route had weekly rhythm and session models, but did not summarize how evidence should accumulate across phases.
   Implementation: added `.route-evidence-ladder` to `semanas/index.qmd`, mapping weeks 1-2, 3-9 and 10-12 to progressively stronger evidence.
   Testing: rendered `semanas/index.qmd` and confirmed `.route-evidence-ladder` in `docs/semanas/index.html`.
   Notes: this improves a public internal page and helps connect route planning to completion.
5. Diagnosis: the new patterns needed responsive behavior, dark-mode parity and manifest/validator coverage before future publication.
   Implementation: extended `styles/main.scss`, `styles/main-dark.scss`, `PUBLIC_SITE_COMPONENTS.md`, `data/site-manifest.yml` and `scripts/validate_site_manifest.R` for the new components and editable regions.
   Testing: manifest validation, whitespace diff check, SCSS compilation, targeted Quarto render and rendered HTML inspection passed.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `_quarto.yml`
- `index.qmd`
- `perfil.qmd`
- `semanas/index.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added homepage intent-based routing for start, resume and consult use cases.
- Reordered global navigation to put discovery support before certificate completion.
- Added a public experience contract to the About page.
- Added an evidence ladder to the study route.
- Added responsive, dark-mode, documentation, manifest and validator coverage for the new patterns.

### Problems fixed

- The homepage now gives a faster path for visitors who arrive with different intentions.
- Header navigation now better reflects the learning journey before completion.
- The institutional page now states public UX guarantees more explicitly.
- The study route now links weekly rhythm to progressively stronger evidence.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd semanas/index.qmd perfil.qmd modules/index.qmd --no-execute`
- `rg -n "home-intent-switch|route-evidence-ladder|about-public-contract" docs/index.html docs/semanas/index.html docs/perfil.html docs/modules/index.html`
- `sed -n '300,370p' docs/index.html`
- `tool_search` for local browser tooling
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- Whitespace diff check passed.
- SCSS compilation passed.
- Targeted Quarto render passed for homepage, study route, About and module index.
- Rendered HTML inspection confirmed all new public components and the reordered navbar.
- Full prepublish gate passed locally.

### Pending items

- Browser screenshot QA remains pending because no local browser tool was exposed in this session.
- Publish only after an explicit publication request.

---

## 2026-05-09 — Outcome, utility crossroads and certificate decision block

### Block objective

Execute a new site-only public visual/UX evolution block on top of the unpublished local work. Keep the work local and focus on clarifying expected study outcomes, search/glossary routing and certificate-readiness decisions without altering the app.

### Cycles executed

1. Diagnosis: the homepage described entry paths and session choices, but still did not state what should visibly change after a study session.
   Implementation: added `.home-outcome-map` to `index.qmd` with three expected outcomes: entender, testar and decidir.
   Testing: rendered `index.qmd` and confirmed `.home-outcome-map` and `.home-outcome-map-grid` in `docs/index.html`.
   Notes: this keeps the homepage public and outcome-oriented rather than administrative.
2. Diagnosis: the search page returned visitors to study, but did not help them choose between search, glossary and route support.
   Implementation: added `.utility-crossroads` to `busca.qmd`, framing when to use each public support tool.
   Testing: rendered `busca.qmd` and confirmed `.utility-crossroads` in `docs/busca.html`.
   Notes: the page now works better as a navigational utility, not only as a search box.
3. Diagnosis: the glossary clarified terms, but did not guide visitors from definition to context or repetition.
   Implementation: added `.utility-crossroads` to `glossario.qmd`, with options for clear terms, missing context and recurring terms.
   Testing: rendered `glossario.qmd` and confirmed `.utility-crossroads` in `docs/glossario.html`.
   Notes: this creates parity between utility pages while keeping their editorial roles distinct.
4. Diagnosis: the certificate page had readiness guidance, but the final emission gate still benefited from a compact evidence decision.
   Implementation: added `.certificate-decision` to `certificado.qmd` with quiz, synthesis and next-use checks before the form gate.
   Testing: rendered `certificado.qmd` and confirmed `.certificate-decision` in `docs/certificado.html`.
   Notes: this improves the public certificate flow without changing certificate logic.
5. Diagnosis: the new public regions needed responsive styling, dark-mode parity and future management coverage.
   Implementation: extended `styles/main.scss`, `styles/main-dark.scss`, `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R` for the new components and editable regions.
   Testing: manifest validation, whitespace diff check, SCSS compilation and targeted Quarto render passed.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `busca.qmd`
- `glossario.qmd`
- `certificado.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added a homepage outcome map for what changes after study.
- Added utility crossroads to search and glossary pages.
- Added certificate evidence decision guidance before certificate emission.
- Added responsive and dark-mode treatment for the new public UX components.
- Extended manifest, documentation and validator coverage.

### Problems fixed

- Homepage study flow now states expected outcomes, not only available paths.
- Search and glossary pages now explain which support surface to use next.
- Certificate page now asks for explicit evidence before emission.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render index.qmd busca.qmd glossario.qmd certificado.qmd --no-execute`
- `rg -n "home-outcome-map|utility-crossroads|certificate-decision" docs/index.html docs/busca.html docs/glossario.html docs/certificado.html`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- Whitespace diff check passed.
- SCSS compilation passed.
- Targeted Quarto render passed for homepage, search, glossary and certificate pages.
- Rendered HTML inspection confirmed all new public components.
- Full prepublish gate passed locally.

### Pending items

- Browser screenshot QA remains pending because local `file://` browser access has been unavailable in this sandbox.
- Publish only after an explicit publication request.

---

## 2026-05-09 — Session-choice and catalog guidance block

### Block objective

Execute a new site-only public visual/UX evolution block after the previous publication. Keep the work local and focused on helping visitors choose a study session, read the module catalog and use the weekly route without turning the public site into an app.

### Cycles executed

1. Diagnosis: after publication, the homepage explained the course flow well, but the first public path still benefited from a clearer "what kind of session am I doing now?" decision.
   Implementation: added `.home-study-choice` to `index.qmd` with short, complete and review session options.
   Testing: rendered `index.qmd` and confirmed `.home-study-choice` and `.home-study-choice-grid` in `docs/index.html`.
   Notes: this improves the homepage near the top without changing the hero or app scope.
2. Diagnosis: the module index listed phases and cards, but visitors still had to infer how to read the module cards as a decision map.
   Implementation: added `.modules-catalog-guide` to `modules/index.qmd`, explaining number, summary and next action before the full catalog.
   Testing: rendered `modules/index.qmd` and confirmed `.modules-catalog-guide` in `docs/modules/index.html`.
   Notes: the catalog remains static and editorial.
3. Diagnosis: the study route explained weekly rhythm, but not how to turn a week into a concrete session type.
   Implementation: added `.route-session-plan` to `semanas/index.qmd`, with reading, code and synthesis session models.
   Testing: rendered `semanas/index.qmd` and confirmed `.route-session-plan` in `docs/semanas/index.html`.
   Notes: this strengthens an internal public page without changing module content.
4. Diagnosis: the new blocks needed consistent responsive behavior, card treatment and dark-mode parity.
   Implementation: extended `styles/main.scss` and `styles/main-dark.scss` for `.home-study-choice`, `.modules-catalog-guide` and `.route-session-plan`, including grid collapse, hover/focus inheritance and text wrapping.
   Testing: SCSS compilation passed for light and dark styles.
   Notes: mobile layouts collapse to one column.
5. Diagnosis: the new public regions needed to be declared for future app-facing content governance.
   Implementation: updated `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R` with the new editable regions and required class coverage.
   Testing: manifest validation and whitespace diff check passed.
   Notes: no publication, commit or push was performed.

### Files changed in this block

- `index.qmd`
- `modules/index.qmd`
- `semanas/index.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added homepage session-choice guidance.
- Added module catalog reading guidance.
- Added weekly route session models.
- Added responsive and dark-mode treatment for the new public UX components.
- Extended manifest, documentation and validator coverage.

### Problems fixed

- Visitors now get a clearer immediate choice between short, complete and review sessions.
- Module cards are framed as a decision map instead of only a catalog.
- The weekly route now translates broad rhythm into practical session types.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd semanas/index.qmd --no-execute`
- `rg -n "home-study-choice|modules-catalog-guide|route-session-plan" docs/index.html docs/modules/index.html docs/semanas/index.html`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- Whitespace diff check passed.
- SCSS compilation passed.
- Targeted Quarto render passed for homepage, module index and study route.
- Rendered HTML inspection confirmed all three new components.
- Full prepublish gate passed locally.

### Pending items

- Browser screenshot QA remains pending because local `file://` browser access has been unavailable in this sandbox.
- Publish only after an explicit publication request.

---

## 2026-05-09 — Final CTA decision and semantic module navigation block

### Block objective

Execute another site-only public visual/UX evolution block under the `publication-readiness-review` contract in `NEXT_SITE.md`, keeping all changes local and focused on visible public decision flow, module navigation semantics and validation coverage.

### Cycles executed

1. Diagnosis: the homepage already had several entry and return paths, but the final CTA still asked visitors to choose between actions without a compact decision aid.
   Implementation: added `.final-cta-checks` to `index.qmd`, clarifying when to start, resume through the index or check completion.
   Testing: rendered `index.qmd` and confirmed `.final-cta-checks` in `docs/index.html`.
   Notes: the change strengthens the homepage close without adding an app-like dashboard.
2. Diagnosis: the module index final CTA had the same decision problem: start, plan or conclude were present, but the choice criteria were implicit.
   Implementation: added `.modules-next-step-checks` to `modules/index.qmd`, pairing the final actions with start, planning and completion criteria.
   Testing: rendered `modules/index.qmd` and confirmed `.modules-next-step-checks` in `docs/modules/index.html`.
   Notes: this improves public CTA hierarchy and keeps the route editorial.
3. Diagnosis: module pages used visually clear previous/index/next cards, but the wrapper was a generic `div` instead of a semantic navigation landmark.
   Implementation: converted all 12 module navigation wrappers to `<nav class="module-nav" aria-label="Navegação entre módulos">`.
   Testing: rendered representative modules 01, 06 and 12 and confirmed the semantic nav in generated HTML.
   Notes: a mechanical replacement briefly touched earlier HTML closings; those were immediately corrected before validation.
4. Diagnosis: the new decision cards and active navigation needed responsive, accessible and dark-mode treatment.
   Implementation: added light/dark styles for `.final-cta-checks`, `.final-cta-check`, `.modules-next-step-checks`, `.modules-next-step-check`, plus a more visible active navbar state.
   Testing: SCSS compilation passed for `styles/main.scss` and `styles/main-dark.scss`; targeted HTML render passed.
   Notes: mobile layout collapses the decision checks to a single column.
5. Diagnosis: the new public patterns and semantic module nav needed contract coverage to prevent regression before publication.
   Implementation: updated `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R` to document the new CTA check patterns and require semantic module navigation in every module.
   Testing: manifest validation and whitespace diff check passed before final validation.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `modules/index.qmd`
- `modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `modules/modulo02-bases-da-genetica-quantitativa.qmd`
- `modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
- `modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd`
- `modules/modulo05-herdabilidade-e-repetibilidade.qmd`
- `modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `modules/modulo07-modelos-lineares-e-modelos-mistos.qmd`
- `modules/modulo08-blup-e-avaliacao-genetica.qmd`
- `modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd`
- `modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd`
- `modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- `modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added decision criteria before final homepage CTAs.
- Added decision criteria before final module-index CTAs.
- Converted module-page previous/index/next navigation into a semantic navigation landmark.
- Improved active navbar visibility and responsive/dark-mode treatment for the new decision cards.
- Extended validation to enforce semantic module navigation.

### Problems fixed

- Final CTAs no longer rely only on button labels to communicate when each path is appropriate.
- Module navigation now exposes a clearer landmark for assistive technology.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `rg -L '<nav class="module-nav" aria-label="Navegação entre módulos">' modules/*.qmd`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd modules/modulo01-introducao-ao-melhoramento-animal.qmd modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd --no-execute`
- `rg -n "final-cta-checks|modules-next-step-checks|<nav class=\"module-nav\" aria-label=\"Navegação entre módulos\"" docs/index.html docs/modules/index.html docs/modules/modulo01-introducao-ao-melhoramento-animal.html docs/modules/modulo06-correlacoes-geneticas-e-fenotipicas.html docs/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- Whitespace diff check passed.
- SCSS compilation passed.
- Targeted Quarto render passed for homepage, module index and representative modules 01, 06 and 12.
- Rendered HTML inspection confirmed final CTA checks, module-index CTA checks and semantic module navigation.
- Full prepublish gate passed locally.

### Pending items

- Browser screenshot QA remains pending because local `file://` browser access has been unavailable in this sandbox.
- Publish only after an explicit publication request.

---

## 2026-05-09 — Returning-user and module-return UX block

### Block objective

Execute a site-only public visual/UX evolution block, following `NEXT_SITE.md` while keeping the accumulated unpublished changes local and review-ready. The focus was to improve how returning visitors resume the course and how module readers decide what to do after coming back to the module index.

### Cycles executed

1. Diagnosis: `NEXT_SITE.md` identified the current state as publication-readiness, but the requested block still called for visible public UX evolution without app changes.
   Implementation: scoped the block to small, visitor-facing improvements on the homepage and module index, avoiding backend, app, publication and dependency work.
   Testing: reread the site skill, governance files and current page structure before editing.
   Notes: no app files were touched.
2. Diagnosis: the homepage had first-visit entry points and planning support, but returning users had to infer whether to continue, revise or check completion.
   Implementation: added `.home-returning` to `index.qmd`, with three compact return routes: continue through modules, revise through the study route and check certificate completion.
   Testing: rendered `index.qmd` and confirmed `.home-returning` and `.home-returning-grid` in `docs/index.html`.
   Notes: the new block stays editorial and public-facing, not dashboard-like.
3. Diagnosis: the module index explained evidence standards and module choice, but did not explicitly guide the user after finishing a module and returning to the catalog.
   Implementation: added `.modules-return-path` to `modules/index.qmd`, clarifying when to advance, revise or close certificate pendencies.
   Testing: rendered `modules/index.qmd` and confirmed `.modules-return-path` and `.modules-return-path-grid` in `docs/modules/index.html`.
   Notes: this strengthens the public navigation loop across internal module pages without altering module content.
4. Diagnosis: the new blocks needed responsive behavior, focus/wrapping parity and dark-mode parity with the existing public component system.
   Implementation: extended `styles/main.scss` and `styles/main-dark.scss` so the new home and module-index components inherit grid collapse, focus-within, hover, wrapping and dark contrast treatment.
   Testing: SCSS compilation passed for both light and dark theme files.
   Notes: the changes reused the existing card and learning-path layer.
5. Diagnosis: manifest, documentation and validator coverage needed to reflect the new public patterns so future edits remain app-ready but site-only.
   Implementation: updated `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R` with `home-returning` and `modules-return-path` editable-region coverage.
   Testing: manifest validation and whitespace diff check passed before the final prepublish gate.
   Notes: no commit, push or publication was performed.

### Files changed in this block

- `index.qmd`
- `modules/index.qmd`
- `data/site-manifest.yml`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added a returning-user route on the homepage for continuing, revising or checking certificate completion.
- Added a post-module decision guide on the module index.
- Added responsive, accessible and dark-mode styling for both new public UX patterns.
- Extended manifest, component documentation and validator contracts for the new patterns.

### Problems fixed

- Returning visitors no longer need to infer the right resumption path from first-visit CTAs only.
- The module index now explains how to use the catalog after finishing a module, not only before opening one.

### Commands executed

- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd --no-execute`
- `rg -n "home-returning|home-returning-grid|Se você está voltando|modules-return-path|modules-return-path-grid|Volte ao índice" docs/index.html docs/modules/index.html`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- Whitespace diff check passed.
- SCSS compilation passed.
- Targeted Quarto render for homepage and module index passed.
- Rendered HTML inspection confirmed the new homepage and module-index components.
- Full prepublish gate passed locally.

### Pending items

- Review accumulated unpublished visual changes in browser screenshots if a local browser target becomes available.
- Publish only after an explicit publication request.

---

## 2026-05-09 — Full module practice-contract UX standardization block

### Block objective

Execute another long, site-only public visual/UX evolution block on top of the accumulated unpublished changes. Follow `NEXT_SITE.md` by keeping the work local and review-ready, while turning the representative module practice evidence prompt into a consistent pattern across the whole module collection.

### Cycles executed

1. Diagnosis: the homepage and module pages already explained the study cycle, but module-level evidence was still only representative in modules 01, 06 and 12.
   Implementation: used the existing homepage start criteria and module evidence direction as the contract for a full module-collection standard.
   Testing: checked current module coverage with `rg` before editing.
   Notes: no app files touched.
2. Diagnosis: the module index did not yet state the shared evidence standard before users enter the full catalog.
   Implementation: added `.modules-evidence-standard` to `modules/index.qmd`, with concept, variation and decision cards.
   Testing: rendered `modules/index.qmd` and confirmed `.modules-evidence-standard` in `docs/modules/index.html`.
   Notes: this improves navigation from index to modules by setting expectations before the catalog.
3. Diagnosis: modules 02-05 and 07-11 lacked the practical evidence prompt now present in representative modules.
   Implementation: added `.module-practice-contract` to modules 02, 03, 04, 05, 07, 08, 09, 10 and 11 with module-specific evidence prompts.
   Testing: rendered the changed module pages and confirmed `.module-practice-contract` in generated HTML.
   Notes: prompts are concise and do not add new scientific longform sections.
4. Diagnosis: the new index evidence standard needed visual parity, responsive behavior and dark-mode treatment.
   Implementation: extended `styles/main.scss` and `styles/main-dark.scss` for `.modules-evidence-standard` and its card grid, including generic focus/hover/wrapping coverage.
   Testing: SCSS compilation passed for light and dark theme files.
   Notes: the module evidence standard follows the existing public card system.
5. Diagnosis: the site contract should enforce that every module now contains the practice evidence prompt.
   Implementation: updated `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R`; the manifest validator now fails if any module lacks `.module-practice-contract`.
   Testing: site manifest validation and whitespace diff check passed.
   Notes: no publication, commit or push was performed.

### Files changed in this block

- `NEXT_SITE.md`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `data/site-manifest.yml`
- `modules/index.qmd`
- `modules/modulo02-bases-da-genetica-quantitativa.qmd`
- `modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
- `modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd`
- `modules/modulo05-herdabilidade-e-repetibilidade.qmd`
- `modules/modulo07-modelos-lineares-e-modelos-mistos.qmd`
- `modules/modulo08-blup-e-avaliacao-genetica.qmd`
- `modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd`
- `modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd`
- `modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- `scripts/validate_site_manifest.R`
- `styles/main-dark.scss`
- `styles/main.scss`

### Commands executed

- `git status --short --branch`
- `rg -L "module-practice-contract" modules/*.qmd`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render modules/index.qmd modules/modulo02-bases-da-genetica-quantitativa.qmd modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd modules/modulo05-herdabilidade-e-repetibilidade.qmd modules/modulo07-modelos-lineares-e-modelos-mistos.qmd modules/modulo08-blup-e-avaliacao-genetica.qmd modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd --no-execute`
- `rg -n "modules-evidence-standard|Cada módulo deve deixar|module-practice-contract|Evidência mínima" docs/modules/index.html docs/modules/modulo*.html`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Site manifest validation passed and now enforces `.module-practice-contract` on every module.
- Whitespace/diff check passed.
- SCSS compilation passed for light and dark theme files.
- Targeted static render passed for module index and changed module pages.
- Rendered HTML inspection confirmed `.modules-evidence-standard` in the index and `.module-practice-contract` across all 12 module pages.
- Full prepublish site check passed.

### Pending items

- Browser-level visual QA with screenshots is still pending if interactive browser tooling becomes available.
- Publish only after explicit user request.

---

## 2026-05-09 — Start criteria, certificate scope and module evidence UX block

### Block objective

Execute another long, site-only public visual/UX evolution block on top of the accumulated unpublished changes. Follow `NEXT_SITE.md` by keeping the work local and review-ready, while adding clearer start criteria, certificate scope, representative module evidence prompts, responsive/dark styling and manifest governance.

### Cycles executed

1. Diagnosis: the homepage had audience guidance and evidence, but did not state the practical conditions for starting a module without turning the session into passive reading.
   Implementation: added `.home-start-criteria` with time, R environment and question-readiness cards.
   Testing: rendered `index.qmd` and confirmed `.home-start-criteria` and `.home-start-criteria-grid` in `docs/index.html`.
   Notes: this improves first-page study readiness without adding app behavior.
2. Diagnosis: public CTAs point visitors to the certificate, but the certificate page did not state clearly what the certificate represents and what it does not represent.
   Implementation: added `.certificate-scope` with evidence-of-route, personal-use and clear-limit cards.
   Testing: rendered `certificado.qmd` and confirmed `.certificate-scope` and `.certificate-scope-grid` in `docs/certificado.html`.
   Notes: this keeps certificate messaging trustworthy and public-facing.
3. Diagnosis: module pages had checkpoints and takeaways, but representative modules could make the expected evidence before exercises more explicit.
   Implementation: added `.module-practice-contract` to modules 01, 06 and 12, covering start, transition and final module contexts.
   Testing: rendered the three module pages and confirmed `.module-practice-contract` in their generated HTML.
   Notes: this improves module reading rhythm without inventing new scientific longform content.
4. Diagnosis: new regions needed consistent light/dark styling and mobile behavior.
   Implementation: extended `styles/main.scss` and `styles/main-dark.scss` for `.home-start-criteria`, `.certificate-scope` and `.module-practice-contract`.
   Testing: SCSS compilation passed for both theme files.
   Notes: new card grids collapse through the existing responsive layer.
5. Diagnosis: new public components need to remain part of the future editorial contract.
   Implementation: updated `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R` for the new patterns.
   Testing: site manifest validation and whitespace diff check passed.
   Notes: no app files, commit, push or publication commands were used.

### Files changed in this block

- `NEXT_SITE.md`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `certificado.qmd`
- `data/site-manifest.yml`
- `index.qmd`
- `modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `scripts/validate_site_manifest.R`
- `styles/main-dark.scss`
- `styles/main.scss`

### Commands executed

- `git status --short --branch`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render index.qmd certificado.qmd modules/modulo01-introducao-ao-melhoramento-animal.qmd modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd --no-execute`
- `rg -n "home-start-criteria|Comece quando|certificate-scope|certificado registra|module-practice-contract|Evidência mínima" docs/index.html docs/certificado.html docs/modules/modulo01-introducao-ao-melhoramento-animal.html docs/modules/modulo06-correlacoes-geneticas-e-fenotipicas.html docs/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Site manifest validation passed.
- Whitespace/diff check passed.
- SCSS compilation passed for light and dark theme files.
- Targeted static render passed for homepage, certificate and representative module pages 01, 06 and 12.
- Rendered HTML inspection confirmed the new public UX regions.
- Full prepublish site check passed.

### Pending items

- Browser-level visual QA with screenshots is still pending if interactive browser tooling becomes available.
- Publish only after explicit user request.

---

## 2026-05-09 — Audience, utility-decision and route rhythm UX block

### Block objective

Execute another long, site-only public visual/UX evolution block on top of the accumulated unpublished changes. Follow `NEXT_SITE.md` by keeping the work review-ready and not publishing, while improving audience fit, public CTA clarity, utility-page decision flow, route rhythm guidance, responsive/accessibility treatment and manifest governance.

### Cycles executed

1. Diagnosis: the homepage explained the learning path and evidence, but did not explicitly say who benefits most from the public route.
   Implementation: added `.home-audience` with three visitor profiles: students, researchers in training and technical professionals.
   Testing: rendered `index.qmd` and confirmed `.home-audience`, `.home-audience-grid` and the heading in `docs/index.html`.
   Notes: this improves first-page orientation without making the site app-like.
2. Diagnosis: the header CTA remained long after the primary navigation gained more labels, increasing risk of crowding at intermediate widths.
   Implementation: shortened the navbar journey CTA from `Começar Módulo 01` to `Começar` and made the footer left label more compact and aligned with the learning promise.
   Testing: rendered changed pages and confirmed `>Começar<` and `MGenética · conceito, R e interpretação` in generated HTML.
   Notes: the destination is unchanged and still points to module 01.
3. Diagnosis: search and glossary now return users to the trail, but they did not help visitors decide what to do immediately after finding a result or term.
   Implementation: added `.utility-decision` blocks to `busca.qmd` and `glossario.qmd` with three decision cards each.
   Testing: rendered `busca.qmd` and `glossario.qmd` and confirmed `.utility-decision` in both generated HTML files.
   Notes: utility pages remain learning support, not admin utilities.
4. Diagnosis: the weekly route had phase overview and finish guidance, but not an explicit way to adjust rhythm without losing the required study cycle.
   Implementation: added `.route-week-decision` with light, standard and review rhythm cards.
   Testing: rendered `semanas/index.qmd` and confirmed `.route-week-decision` and `.route-week-decision-grid` in `docs/semanas/index.html`.
   Notes: this supports mobile/tablet study planning with concise cards.
5. Diagnosis: new public regions need matching responsive/dark styling and validation coverage before review.
   Implementation: updated `styles/main.scss`, `styles/main-dark.scss`, `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R` for `home-audience`, `utility-decision` and `route-week-decision`.
   Testing: site manifest validation, whitespace diff check, SCSS compilation and targeted Quarto render all passed.
   Notes: no app files, commit, push or publication commands were used.

### Files changed in this block

- `NEXT_SITE.md`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `_quarto.yml`
- `busca.qmd`
- `data/site-manifest.yml`
- `glossario.qmd`
- `index.qmd`
- `scripts/validate_site_manifest.R`
- `semanas/index.qmd`
- `styles/main-dark.scss`
- `styles/main.scss`

### Commands executed

- `git status --short --branch`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render index.qmd busca.qmd glossario.qmd semanas/index.qmd --no-execute`
- `rg -n "home-audience|Para quem esta trilha|utility-decision|Depois do resultado|Termo entendido|route-week-decision|Ajuste o ritmo|>Começar<|conceito, R e interpretação" docs/index.html docs/busca.html docs/glossario.html docs/semanas/index.html`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Site manifest validation passed.
- Whitespace/diff check passed.
- SCSS compilation passed for light and dark theme files.
- Targeted static render passed for homepage, search, glossary and study route.
- Rendered HTML inspection confirmed the new public UX regions, compact navbar CTA and footer copy.
- Full prepublish site check passed.

### Pending items

- Browser-level visual QA with screenshots is still pending if interactive browser tooling becomes available.
- Publish only after explicit user request.

---

## 2026-05-09 — Public credibility and phase-transition UX block

### Block objective

Execute another long, site-only public visual/UX evolution block on top of the current unpublished changes. Follow `NEXT_SITE.md` by keeping the work local and review-ready, while improving public trust signals, phase transition clarity, institutional credibility, responsive/accessibility treatment and manifest governance.

### Cycles executed

1. Diagnosis: the homepage now connected study to certificate, but the public trust rationale behind the sequence was implicit.
   Implementation: added `.home-evidence` with three evidence cards covering scientific basis, reproducible practice and private local progress.
   Testing: rendered `index.qmd` and confirmed `.home-evidence`, `.home-evidence-grid` and the heading in `docs/index.html`.
   Notes: this improves first-page credibility without adding app/admin behavior.
2. Diagnosis: public navigation already exposes the certificate and start CTA, but card/focus behavior for repeated public components needed stronger keyboard affordance.
   Implementation: added a global `:focus-visible` rule and expanded focus/hover/card treatment to the new evidence and phase-transition cards.
   Testing: SCSS compilation passed for light and dark theme files.
   Notes: this is a public accessibility improvement, not a navigation structure change.
3. Diagnosis: the module index showed phases and the full catalog, but the transition between phases did not explicitly tell visitors how to decide when to advance.
   Implementation: added `.modules-phase-bridge` with a concise checkpoint: dominar, testar and decidir.
   Testing: rendered `modules/index.qmd` and confirmed `.modules-phase-bridge` and `.modules-phase-bridge-grid` in `docs/modules/index.html`.
   Notes: this strengthens the module catalog as a learning path instead of only a list.
4. Diagnosis: the Sobre page explained route and principles, but did not clearly state public credibility boundaries such as no hidden data collection and no overclaiming certificate meaning.
   Implementation: added `.about-credibility` with public commitments on transparency, local progress and certificate limits.
   Testing: rendered `perfil.qmd` and confirmed `.about-credibility` and its grid in `docs/perfil.html`.
   Notes: this keeps institutional copy visitor-facing and avoids admin content.
5. Diagnosis: the new public components needed to be declared for future app-managed editorial regions and protected by validation.
   Implementation: updated `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R` for `home-evidence`, `modules-phase-bridge` and `about-credibility`.
   Testing: `Rscript --vanilla scripts/validate_site_manifest.R`, `git diff --check`, SCSS compilation and targeted Quarto render all passed.
   Notes: no publication, commit or push was performed.

### Files changed in this block

- `NEXT_SITE.md`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `data/site-manifest.yml`
- `index.qmd`
- `modules/index.qmd`
- `perfil.qmd`
- `scripts/validate_site_manifest.R`
- `styles/main-dark.scss`
- `styles/main.scss`

### Commands executed

- `git status --short --branch`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd perfil.qmd --no-execute`
- `rg -n "home-evidence|Por que a trilha|modules-phase-bridge|Use cada fase|about-credibility|Compromissos públicos" docs/index.html docs/modules/index.html docs/perfil.html`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Site manifest validation passed.
- Whitespace/diff check passed.
- SCSS compilation passed for light and dark theme files.
- Targeted static render passed for homepage, module index and Sobre.
- Rendered HTML inspection confirmed the three new public UX regions.
- Full prepublish site check passed.

### Pending items

- Browser-level visual QA with screenshots is still pending if interactive browser tooling becomes available.
- Publish only after explicit user request.

---

## 2026-05-09 — Post-publication continuity UX block

### Block objective

Execute a long, site-only public visual/UX evolution block after the successful publication. Follow `NEXT_SITE.md` by verifying deployment health first, then improve the public continuity between study, module choice and certificate without publishing automatically.

### Cycles executed

1. Diagnosis: the previous publication had completed, but the next contract still required confirming deploy health before more local work.
   Implementation: checked the latest GitHub Actions run and ran deployed-site validation.
   Testing: `gh run list --limit 1` showed the latest publish workflow as `completed success`; `Rscript scripts/validate_deployed_site.R` returned `deployed site ok`.
   Notes: this confirmed the published baseline before local changes.
2. Diagnosis: the homepage had readiness guidance, but the path from a study session to final certificate was still split across separate sections.
   Implementation: added `.home-continuity` with concise copy and actions to continue through modules or inspect certificate completion.
   Testing: rendered `index.qmd` and confirmed `.home-continuity` and `.home-continuity-actions` in `docs/index.html`.
   Notes: the block is public/editorial and does not add app or progress behavior.
3. Diagnosis: the module index explained completion flow and module choice, but the certificate was still mostly a final CTA rather than a visible checkpoint before leaving the catalog.
   Implementation: added `.modules-certificate-route` after the module-choice checkpoint with actions for certificate and weekly route.
   Testing: rendered `modules/index.qmd` and confirmed `.modules-certificate-route` and `.modules-certificate-route-actions` in `docs/modules/index.html`.
   Notes: this keeps the module catalog connected to the conclusion flow.
4. Diagnosis: the expanded navbar and new CTA groups needed stronger behavior on intermediate desktop widths and mobile.
   Implementation: added responsive navbar compression for 992-1220px, and added mobile wrapping/collapse coverage for `.home-continuity` and `.modules-certificate-route`.
   Testing: SCSS compilation passed for light and dark themes.
   Notes: this reduces risk of cramped navigation after adding `Certificado` to the primary nav.
5. Diagnosis: new public components need to stay governed by the manifest/component contract.
   Implementation: updated `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R` for `home-continuity` and `modules-certificate-route`.
   Testing: `Rscript --vanilla scripts/validate_site_manifest.R` and `git diff --check` passed.
   Notes: no publication commands were run.

### Files changed in this block

- `NEXT_SITE.md`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `data/site-manifest.yml`
- `index.qmd`
- `modules/index.qmd`
- `scripts/validate_site_manifest.R`
- `styles/main-dark.scss`
- `styles/main.scss`

### Commands executed

- `git status --short --branch`
- `gh run list --limit 1`
- `Rscript scripts/validate_deployed_site.R`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd --no-execute`
- `rg -n "home-continuity|Da primeira aula ao certificado|modules-certificate-route|Feche a trilha" docs/index.html docs/modules/index.html`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`

### Test results

- Latest published GitHub Actions workflow is successful.
- Deployed-site validation passed.
- Site manifest validation passed.
- Whitespace/diff check passed.
- Targeted static render passed for homepage and module index.
- Rendered HTML inspection confirmed the new homepage and module-index continuity blocks.
- SCSS compilation passed for both theme files.

### Pending items

- Run full prepublish gate before any future publication.
- Run true browser visual QA with screenshots if browser tooling becomes available.
- Publish only after explicit user request.

---

## 2026-05-09 — Publication gate fix and publish request

### Block objective

Publish the accumulated site-only public UX changes after the explicit user request, while preserving the required prepublish gate and keeping unrelated untracked files out of the commit.

### Cycles executed

1. Diagnosis: `NEXT_SITE.md` recorded a project-level Quarto render rename failure in the prepublish gate.
   Implementation: reproduced the project render with `QUARTO_NUM_THREADS=1` and confirmed the render completes.
   Testing: `QUARTO_NUM_THREADS=1 ... quarto render` passed.
   Notes: the issue was tied to project render concurrency, not to page content.
2. Diagnosis: relying on an external environment variable would be fragile for future publication.
   Implementation: updated `scripts/prepublish_site_check.R` to set `QUARTO_NUM_THREADS=1` when it is not already defined.
   Testing: ran the normal prepublish command without manually setting `QUARTO_NUM_THREADS`.
   Notes: this keeps the publication gate reproducible.
3. Diagnosis: the public site still needed the required full local gate immediately before commit/push.
   Implementation: ran `PATH=".../quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`.
   Testing: full prepublish passed with `prepublish site check ok`.
   Notes: non-fatal `renv` sandbox and YAML coercion warnings remained.
4. Diagnosis: publication should include only tracked site-related changes.
   Implementation: reviewed `git status --short --branch` and kept `.agents/`, `.vscode/` and `AUTOMATION_SITE.md` untracked.
   Testing: pending commit scope contains tracked site files only.
   Notes: no app files were intentionally changed.
5. Diagnosis: after publishing, the next site task should focus on remote deployment health, not more local UX edits.
   Implementation: updated `NEXT_SITE.md` to reflect that the local prepublish blocker is fixed and the next step is GitHub Actions/deployed-site validation after push.
   Testing: manifest and whitespace checks remained clean before publication.
   Notes: publication is explicit in this block because the user requested it.

### Files changed in this block

- `NEXT_SITE.md`
- `WORKLOG_SITE.md`
- `scripts/prepublish_site_check.R`

### Commands executed

- `git status --short --branch`
- `find modules -maxdepth 1 -name '*.html' -print`
- `QUARTO_NUM_THREADS=1 PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Project-level Quarto render passed when serialized.
- Full prepublish gate passed after the script change.
- Unrelated untracked files remained uncommitted.

### Pending items

- Commit and push this publication set.
- Watch GitHub Actions after push.
- Run deployed-site validation after deployment completes.

---

## 2026-05-09 — Public readiness checklist and navigation UX block

### Block objective

Continue a long, site-only public visual/UX evolution block under `NEXT_SITE.md`, without publishing and without app changes. The block focused on public readiness cues before publication review: homepage study readiness, certificate discoverability, module-choice confidence and responsive CTA behavior.

### Cycles executed

1. Diagnosis: the homepage had entry guidance and final CTAs, but lacked a compact checklist telling visitors what a successful study session should produce.
   Implementation: added `.home-readiness` with three public checklist items: question, code and synthesis.
   Testing: rendered `index.qmd` and confirmed `.home-readiness`, `.home-readiness-grid` and `.home-readiness-item` in `docs/index.html`.
   Notes: the block stays editorial; it does not add progress tracking or app behavior.
2. Diagnosis: the certificate flow was important but depended mainly on footer/final CTAs for discovery.
   Implementation: added `Certificado` to the primary navbar and aligned the manifest navigation contract.
   Testing: rendered homepage/module/certificate pages and confirmed the navbar certificate link in generated HTML.
   Notes: no publication, authentication or backend behavior was introduced.
3. Diagnosis: the module index listed all modules but did not give a final decision aid before opening a module from the catalog.
   Implementation: added `.modules-study-check` after the module grid with criteria for base, practice and closure.
   Testing: rendered `modules/index.qmd` and confirmed `.modules-study-check` and its list in `docs/modules/index.html`.
   Notes: this improves module-choice confidence without changing longform scientific content.
4. Diagnosis: several CTA groups and new checklist grids needed consistent mobile behavior before publication review.
   Implementation: added responsive collapse/wrapping coverage for `.home-readiness`, `.modules-study-check`, module next-step actions, utility/route actions, certificate form actions and footer nav spacing.
   Testing: SCSS validation passed through `scripts/validate_site_manifest.R`, `git diff --check` and the explicit Quarto render set.
   Notes: dark-mode parity was added for the new checklist components.
5. Diagnosis: new public components must remain part of the future app-management contract and validation layer.
   Implementation: updated `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R` for `home-readiness` and `modules-study-check`.
   Testing: `Rscript --vanilla scripts/validate_site_manifest.R` passed.
   Notes: this is metadata/contract support for the public site, not app work.

### Files changed in this block

- `_quarto.yml`
- `NEXT_SITE.md`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `data/site-manifest.yml`
- `index.qmd`
- `modules/index.qmd`
- `scripts/validate_site_manifest.R`
- `styles/main-dark.scss`
- `styles/main.scss`

### Commands executed

- `git status --short --branch`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd certificado.qmd --no-execute`
- `rg -n "home-readiness|modules-study-check|href=\"certificado.html\"|href=\"../certificado.html\"|Feedback" docs/index.html docs/modules/index.html docs/certificado.html`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render busca.qmd certificado.qmd glossario.qmd index.qmd modules/index.qmd modules/modulo01-introducao-ao-melhoramento-animal.qmd modules/modulo02-bases-da-genetica-quantitativa.qmd modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd modules/modulo05-herdabilidade-e-repetibilidade.qmd modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd modules/modulo07-modelos-lineares-e-modelos-mistos.qmd modules/modulo08-blup-e-avaliacao-genetica.qmd modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd perfil.qmd semanas/index.qmd --no-execute`
- `find modules -maxdepth 1 -name '*.html' -print`

### Test results

- Site manifest validation passed.
- Whitespace/diff check passed.
- Targeted static renders passed for homepage, module index and certificate page.
- Explicit render of all public `.qmd` pages with `--no-execute` passed.
- Rendered HTML inspection confirmed `.home-readiness`, `.modules-study-check` and the primary navbar certificate link.
- Full `scripts/prepublish_site_check.R` did not complete: it passed manifest, YAML, SCSS, JS syntax, module data scripts and `git diff --check`, but failed during the final project-level `quarto render` with a Quarto rename error for generated module HTML. Transient source HTML artifacts left by the failed render were removed; `find modules -maxdepth 1 -name '*.html' -print` returned no files afterward.

### Pending items

- Resolve the project-level Quarto render rename failure before any publication.
- Run true browser visual QA with screenshots if browser tooling becomes available.
- Publish only after explicit user request.

---

## 2026-05-09 — Homepage entry-decision UX block

### Block objective

Continue a long site-only public visual/UX evolution block under `NEXT_SITE.md`, without publishing and without app changes. The block focused on helping visitors choose the right homepage entry route before selecting module, index or study-plan cards.

### Cycles executed

1. Diagnosis: the homepage had orientation and entry cards, but visitors still had to infer whether to start, review, or plan.
   Implementation: selected homepage entry guidance as the next visible UX improvement.
   Testing: reviewed `index.qmd`, existing entry styles, manifest mappings and component documentation.
   Notes: scope remained public homepage only plus site contract files.
2. Diagnosis: the entry section needed an intermediate decision aid before the action cards.
   Implementation: added `.entry-decision` with guidance for first-time visitors, review visitors and planning visitors.
   Testing: rendered `index.qmd` and confirmed `.entry-decision`, `.entry-decision-list` and three items in `docs/index.html`.
   Notes: the primary path still points to Module 01.
3. Diagnosis: the new panel needed to support CTA hierarchy rather than compete with the entry cards.
   Implementation: kept the decision panel informational, with no extra buttons; existing entry CTAs remain the actions.
   Testing: inspected rendered HTML structure around the homepage entry section.
   Notes: this avoids adding secondary visual noise.
4. Diagnosis: the panel needed responsive, accessibility and dark-mode coverage.
   Implementation: added light/dark styling, list semantics, mobile one-column collapse and component-layer wrapping/hover/focus coverage.
   Testing: SCSS validation passed inside the full prepublish gate.
   Notes: the block uses `role="region"` and nested `role="list"` / `role="listitem"` semantics.
5. Diagnosis: the new homepage region needed modular contract coverage for future app-managed editing.
   Implementation: added `entry-decision` to `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R`.
   Testing: `Rscript --vanilla scripts/validate_site_manifest.R`, `git diff --check`, targeted render and full prepublish passed.
   Notes: no publication commands were run.

### Files changed

- `NEXT_SITE.md`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `data/site-manifest.yml`
- `index.qmd`
- `scripts/validate_site_manifest.R`
- `styles/main-dark.scss`
- `styles/main.scss`

### Improvements implemented

- Added a homepage decision panel to help visitors choose start, review or planning routes.
- Preserved the existing CTA hierarchy by keeping the panel informational.
- Added responsive, dark-mode and component-contract coverage for `.entry-decision`.

### Problems fixed

- Homepage entry cards now have clearer pre-selection guidance.
- Future edits are less likely to omit or drift this region because the manifest validator checks it.

### Commands executed

- `git status --short --branch`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render index.qmd --no-execute`
- `rg -n "entry-decision|Escolha pela situação atual|Critérios para escolher uma rota" docs/index.html`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Site manifest validation passed.
- Whitespace/diff check passed.
- Targeted static render passed for homepage.
- Rendered HTML inspection confirmed `.entry-decision` in `docs/index.html`.
- Full prepublish site check passed, including SCSS validation, JS syntax checks, module data scripts and complete Quarto render.

### Pending items

- Run true browser visual QA with screenshots if browser tooling becomes available.
- Publish only after explicit user request.

---

## 2026-05-10 — CTA label normalization and aria-label contract block

### Block objective

Execute a site-only long block under the current `publication-readiness-review` contract. Keep the work local and refine public CTA consistency and accessibility semantics without publishing or touching the app.

### Cycles executed

1. Diagnosis: dark mode loaded `styles/main.scss` plus `styles/main-dark.scss`, but the long-block UX layer still lacked an explicit dark-parity override for `.hero-action-note`.
   Implementation: extended `styles/main-dark.scss` to style `.hero-action-note` consistently with the dark visual system.
   Testing: `Rscript --vanilla -e 'sass::sass_file(\"styles/main.scss\") |> invisible(); sass::sass_file(\"styles/main-dark.scss\") |> invisible(); cat(\"scss ok\\n\")'` passed; `quarto render index.qmd --no-execute` passed.
   Notes: this stays within public-site styling parity and does not introduce app behavior.
2. Diagnosis: the primary CTA label was inconsistent (`Começar M01` in navbar vs. `Começar pelo Módulo 01` in homepage bands), increasing visual noise in the publication-readiness stage.
   Implementation: normalized homepage primary CTAs to `Começar M01` in the hero, learning-path band and final CTA band.
   Testing: static render of `index.qmd` passed and rendered HTML no longer contained the old label.
   Notes: the expanded meaning is kept in surrounding copy and later reinforced via `aria-label`.
3. Diagnosis: internal public flows (module index + study route) still used the old primary CTA label in their decisive action bands.
   Implementation: updated `modules/index.qmd` and `semanas/index.qmd` CTAs to `Começar M01` and updated `scripts/validate_deployed_site.R` to track the new public label.
   Testing: static renders of `modules/index.qmd` and `semanas/index.qmd` passed; rendered outputs no longer contained `Começar pelo Módulo 01`.
   Notes: this keeps the public journey CTA consistent across entry points.
4. Diagnosis: `Começar M01` is concise but ambiguous for assistive tech; the primary CTA needs explicit expanded meaning.
   Implementation: added `aria-label=\"Começar pelo Módulo 01\"` to the primary CTAs in `index.qmd`, `modules/index.qmd` and `semanas/index.qmd`.
   Testing: static renders of all three pages passed and rendered HTML contains the new aria-label attribute.
   Notes: this improves accessibility without changing the visible premium composition.
5. Diagnosis: the shorthand CTA + aria-label requirement needs to be part of the public-site governance contract for future app-based management.
   Implementation: updated `PUBLIC_SITE_COMPONENTS.md` with an explicit rule for shorthand CTA aria-labels and extended `scripts/validate_deployed_site.R` to assert the aria-label on homepage, module index and route pages.
   Testing: `Rscript --vanilla -e 'parse(file=\"scripts/validate_deployed_site.R\"); cat(\"parse ok\\n\")'` passed.
   Notes: this keeps the contract enforceable after any future publication.

### Files changed in this block

- `WORKLOG_SITE.md`
- `index.qmd`
- `modules/index.qmd`
- `semanas/index.qmd`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_deployed_site.R`
- `styles/main-dark.scss`

### Commands executed

- `git status --short --branch`
- `Rscript --vanilla -e 'sass::sass_file(\"styles/main.scss\") |> invisible(); sass::sass_file(\"styles/main-dark.scss\") |> invisible(); cat(\"scss ok\\n\")'`
- `PATH=\"/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH\" HOME=/private/tmp/quarto-home quarto render index.qmd --no-execute`
- `PATH=\"/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH\" HOME=/private/tmp/quarto-home quarto render modules/index.qmd semanas/index.qmd --no-execute`
- `rg` inspection of rendered HTML in `docs/index.html`, `docs/modules/index.html` and `docs/semanas/index.html`
- `git diff --check`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `PATH=\"/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH\" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- SCSS compilation passed.
- Site manifest validation passed.
- Whitespace/diff check passed.
- Full prepublish site check passed (including full Quarto render).

### Pending items

- Perform true browser screenshot QA when browser tooling is available.
- Publish only after explicit user request.

---

## 2026-05-09 — Publication readiness review: hero/footer/certificate polish

### Block objective

Execute a long, site-only public UX review block following `NEXT_SITE.md` (`publication-readiness-review`). Prepare the current local UX/a11y changes for publication readiness without publishing, committing or touching the app.

### Cycles executed

1. Diagnosis: the homepage hero proof panel communicated “tempo” and “progresso local”, but the completion cue was still implicit.
   Implementation: added a third proof item (“Certificado”) and a wide-row layout helper (`.hero-panel-proof-item--wide`) to keep hierarchy clean.
   Testing: rendered `index.qmd`; confirmed the new proof item and class in the generated HTML.
   Notes: keeps the primary CTA unchanged while making completion more visible above the fold.

2. Diagnosis: footer contained a Quarto-generated “Criar uma issue” action that looked more administrative than editorial.
   Implementation: disabled Quarto `repo-actions` and added an explicit “Feedback” link as a normal footer item.
   Testing: rendered `index.qmd`; confirmed the footer no longer renders the Quarto repo action and includes the new footer link.
   Notes: keeps feedback available without injecting a tooling-oriented UI element.

3. Diagnosis: certificate pending state listed modules as plain text, forcing extra navigation steps to resume study.
   Implementation: made module titles in the pending list link to their corresponding module pages and added minimal focus/hover styling for those links.
   Testing: rendered `certificado.qmd`; confirmed the new `MODULE_LINKS` mapping and link markup in the embedded script.
   Notes: preserves privacy and local-storage model; improves “continue study” flow.

4. Diagnosis: fixed header + anchor navigation can hide headings after scroll, impacting ToC usability and keyboard navigation context.
   Implementation: added `scroll-margin-top` for anchored headings inside `main.content`.
   Testing: rendered `modules/modulo01-introducao-ao-melhoramento-animal.qmd`; ensured SCSS compiles and output is generated without errors.
   Notes: improves usability across modules and internal pages without changing content.

5. Diagnosis: the site manifest should remain the canonical public navigation contract and support external links where needed.
   Implementation: aligned `data/site-manifest.yml` navigation with `_quarto.yml` (including the new footer “Feedback”), and updated `scripts/validate_site_manifest.R` to allow external `https://` navigation hrefs.
   Testing: `Rscript --vanilla scripts/validate_site_manifest.R` passed.
   Notes: prepares metadata for future app-based management without changing the app.

### Files changed in this block

- `_quarto.yml`
- `certificado.qmd`
- `data/site-manifest.yml`
- `index.qmd`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`

### Commands executed

- `git diff --check`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render index.qmd --no-execute`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render certificado.qmd --no-execute`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render modules/modulo01-introducao-ao-melhoramento-animal.qmd --no-execute`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript --vanilla scripts/prepublish_site_check.R`

### Test results

- `git diff --check` OK.
- Site manifest validation passed.
- Full prepublish site check passed (SCSS, JS syntax, module scripts and full Quarto render).

### Pending items

- Run true browser visual QA (light+dark + mobile widths) in an environment where browser tooling can open local renders.
- Publish only after explicit user request.

---

## 2026-05-09 — Module technical takeaways UX block

### Block objective

Continue a long site-only public visual/UX evolution block under `NEXT_SITE.md`, without publishing and without app changes. The block focused on improving module reading rhythm by adding concise technical takeaways before each quiz, then documenting and validating the new module pattern.

### Cycles executed

1. Diagnosis: module pages had a pre-quiz checkpoint and post-quiz continuity note, but lacked a concise summary to help visitors consolidate the lesson before self-assessment.
   Implementation: selected the backlog item for module summaries as a visible public UX improvement.
   Testing: inspected all module files with `rg` for checkpoint, quiz and after-quiz placement.
   Notes: scope stayed within public `.qmd` module pages and site contracts.
2. Diagnosis: every module needed the same structural improvement, but the content had to stay specific to each scientific topic.
   Implementation: added `.module-takeaways` blocks to all 12 modules, each with two concise technical bullets.
   Testing: source inspection confirmed the new block exists across all module pages.
   Notes: no scientific scripts, quizzes or app files were changed.
3. Diagnosis: the takeaways needed to feel integrated with the premium public module design rather than default markdown lists.
   Implementation: added light-mode styling, compact list spacing, mobile padding and dark-mode parity for `.module-takeaways`.
   Testing: SCSS validation passed inside the prepublish gate.
   Notes: the block sits between the study checkpoint and quiz to improve learning flow.
4. Diagnosis: the new module summary pattern needed contract coverage for future app-managed editorial regions.
   Implementation: added `module-takeaways` to `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R`; the validator now requires it in each module.
   Testing: `Rscript --vanilla scripts/validate_site_manifest.R` and `git diff --check` passed.
   Notes: the collection editable regions now include `takeaways`.
5. Diagnosis: the change affects every module, so representative and full renders were required.
   Implementation: rendered Modules 01, 06 and 12 directly, then ran the full prepublish gate.
   Testing: generated HTML inspection confirmed `.module-takeaways` in start, middle and final modules; full prepublish passed.
   Notes: repeated `renv` sandbox and YAML coercion warnings remained non-fatal and unchanged.

### Files changed

- `NEXT_SITE.md`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `data/site-manifest.yml`
- `modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `modules/modulo02-bases-da-genetica-quantitativa.qmd`
- `modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
- `modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd`
- `modules/modulo05-herdabilidade-e-repetibilidade.qmd`
- `modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `modules/modulo07-modelos-lineares-e-modelos-mistos.qmd`
- `modules/modulo08-blup-e-avaliacao-genetica.qmd`
- `modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd`
- `modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd`
- `modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- `modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `scripts/validate_site_manifest.R`
- `styles/main-dark.scss`
- `styles/main.scss`

### Improvements implemented

- Added technical takeaways before the quiz in every module.
- Styled the new summary block for light mode, dark mode and mobile.
- Declared `takeaways` as a module editable region and validation requirement.

### Problems fixed

- Module quizzes are now preceded by a concise synthesis instead of relying only on the broader checkpoint.
- Future module edits are less likely to omit the summary pattern because validation now checks it.

### Commands executed

- `git status --short --branch`
- `rg -n "module-summary|module-takeaway|module-study-checkpoint|quiz-container|module-after-quiz" modules -g '*.qmd'`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render modules/modulo01-introducao-ao-melhoramento-animal.qmd --no-execute`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd --no-execute`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd --no-execute`
- `rg -n "module-takeaways|O que levar deste módulo" docs/modules/modulo01-introducao-ao-melhoramento-animal.html docs/modules/modulo06-correlacoes-geneticas-e-fenotipicas.html docs/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Site manifest validation passed.
- Whitespace/diff check passed.
- Targeted static renders passed for Modules 01, 06 and 12.
- Rendered HTML inspection confirmed `.module-takeaways` in representative module pages.
- Full prepublish site check passed, including SCSS validation, JS syntax checks, module data scripts and complete Quarto render.

### Pending items

- Run true browser visual QA with screenshots if browser tooling becomes available.
- Publish only after explicit user request.

---

## 2026-05-09 — Certificate readiness and footer clarity UX block

### Block objective

Continue a long site-only public visual/UX evolution block under `NEXT_SITE.md`, without publishing and without app changes. The block focused on making the certificate page more self-explanatory before the browser-local gate, improving public footer wording and extending the component/manifest contract.

### Cycles executed

1. Diagnosis: `NEXT_SITE.md` remained in publication-readiness mode, but the current request asked for another public UX evolution block without publication.
   Implementation: selected the certificate page and public footer as remaining visitor-facing completion/navigation surfaces.
   Testing: reviewed `certificado.qmd`, `busca.qmd`, `glossario.qmd`, `_quarto.yml`, manifest mappings and component documentation.
   Notes: no app files were touched.
2. Diagnosis: the footer left label was generic and did not reinforce the public learning route.
   Implementation: changed the footer microcopy to `MGenética · trilha pública em genética aplicada`.
   Testing: rendered homepage and certificate page; generated HTML contains the updated footer label.
   Notes: footer navigation links remained unchanged and manifest-aligned.
3. Diagnosis: the certificate page explained criterion and privacy but did not show a static step-by-step route before the dynamic completion gate.
   Implementation: added `.certificate-readiness-guide` with Estude, Valide and Emita steps plus contextual actions to modules, route and search.
   Testing: rendered `certificado.qmd` and confirmed `.certificate-readiness-guide`, steps and actions in `docs/certificado.html`.
   Notes: this improves the page even before JavaScript reveals incomplete/ready state.
4. Diagnosis: the new certificate block needed responsive behavior, focus/wrapping coverage and dark-mode parity.
   Implementation: added SCSS for the guide, cards, actions, mobile collapse and dark-mode text/background treatment; included it in the public component layer.
   Testing: SCSS validation passed inside prepublish.
   Notes: actions stack on small screens to prevent cramped buttons.
5. Diagnosis: the certificate readiness region must be part of the future app-management contract and local validation.
   Implementation: added `certificate-readiness-guide` to `data/site-manifest.yml`, documented it in `PUBLIC_SITE_COMPONENTS.md`, and mapped `certificate-readiness` in `scripts/validate_site_manifest.R`.
   Testing: manifest validation, whitespace diff check, targeted renders and full prepublish passed.
   Notes: browser/screenshot tooling remains unavailable in this session.

### Files changed

- `NEXT_SITE.md`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `_quarto.yml`
- `certificado.qmd`
- `data/site-manifest.yml`
- `scripts/validate_site_manifest.R`
- `styles/main-dark.scss`
- `styles/main.scss`

### Improvements implemented

- Added static certificate readiness guidance before the dynamic certificate gate.
- Improved footer microcopy to reinforce the public learning route.
- Added responsive and dark-mode styling for the new certificate readiness pattern.
- Extended manifest/documentation/validation coverage for `certificate-readiness`.

### Problems fixed

- Certificate page no longer relies only on dynamic state to explain how to unlock the certificate.
- Footer wording is less generic and better aligned with the public site role.
- Future edits now have a declared certificate readiness region to validate.

### Commands executed

- `git status --short --branch`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render certificado.qmd --no-execute`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render index.qmd --no-execute`
- `rg -n "certificate-readiness|Antes de gerar o certificado|Rotas antes de emitir" docs/certificado.html`
- `rg -n "trilha pública em genética aplicada" docs/index.html docs/certificado.html`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Site manifest validation passed.
- Whitespace/diff check passed.
- Targeted static renders passed for certificate and homepage.
- Rendered HTML inspection confirmed the certificate readiness guide and updated footer microcopy.
- Full prepublish site check passed, including SCSS validation, JS syntax checks, module data scripts and complete Quarto render.

### Pending items

- Run true browser visual QA with screenshots if browser tooling becomes available.
- Publish only after explicit user request.

---

## 2026-05-09 — Public resources and institutional route UX block

### Block objective

Continue a long site-only public visual/UX evolution block under `NEXT_SITE.md`, without publishing and without app changes. The block focused on making the homepage resource area more visitor-facing, clarifying the global start CTA, strengthening the institutional Sobre page and extending the manifest/component contract.

### Cycles executed

1. Diagnosis: `NEXT_SITE.md` was still in publication-readiness mode, but the requested block asked for further public UX evolution without publication.
   Implementation: selected remaining visible public-site gaps: homepage resources, global start CTA and institutional route explanation.
   Testing: reviewed `index.qmd`, `perfil.qmd`, `_quarto.yml`, `data/site-manifest.yml` and the current worklog.
   Notes: no app files were touched.
2. Diagnosis: the homepage “Recursos práticos” section exposed internal operational language, including GitHub Actions, which was not useful as public UX.
   Implementation: replaced the bullet panel with `.resource-grid` / `.resource-card` cards for scripts, simulated data and local quizzes.
   Testing: rendered `index.qmd` and confirmed `.resource-grid`, `.resource-card` and the new heading in `docs/index.html`.
   Notes: this keeps resource support editorial and study-oriented.
3. Diagnosis: the top-right navbar CTA was terse as “Começar”, which was less explicit on smaller screens and in repeated navigation contexts.
   Implementation: changed the right navbar CTA label to “Começar Módulo 01”.
   Testing: rendered `index.qmd` and confirmed the new label in `docs/index.html`.
   Notes: primary path is clearer without changing destination.
4. Diagnosis: the Sobre page explained the project role but did not concisely connect the public identity to the visitor's route through study, support and conclusion.
   Implementation: added `.about-route` with three semantic steps: Estudar, Consultar and Concluir.
   Testing: rendered `perfil.qmd` and confirmed `.about-route` and `.about-route-steps` in `docs/perfil.html`.
   Notes: this strengthens institutional clarity without turning the page into an app/admin description.
5. Diagnosis: the new patterns needed responsive/dark parity and future app-management contract coverage.
   Implementation: added light/dark SCSS for resource/about-route cards, mobile grid collapse, public component-layer inclusion, manifest editable regions, component documentation and validator coverage. The validator now also requires `.module-after-quiz` in every module.
   Testing: `Rscript --vanilla scripts/validate_site_manifest.R`, `git diff --check` and the full prepublish gate passed.
   Notes: browser tooling was searched but not exposed; validation relied on static render and generated HTML inspection.

### Files changed

- `NEXT_SITE.md`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `_quarto.yml`
- `data/site-manifest.yml`
- `index.qmd`
- `perfil.qmd`
- `scripts/validate_site_manifest.R`
- `styles/main-dark.scss`
- `styles/main.scss`

### Improvements implemented

- Reframed homepage resources as public learning support cards.
- Made the global start CTA more explicit as “Começar Módulo 01”.
- Added a concise institutional route block to the Sobre page.
- Added manifest, documentation and validation coverage for `.resource-grid`, `.resource-card` and `.about-route`.

### Problems fixed

- Removed internal publication/infrastructure language from the public homepage resource area.
- Reduced ambiguity in the navbar start action.
- Strengthened validation for the module post-quiz pattern across all module files.

### Commands executed

- `git status --short --branch`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render index.qmd --no-execute`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render perfil.qmd --no-execute`
- `rg -n "resource-grid|resource-card|Apoio prático|Começar Módulo 01" docs/index.html`
- `rg -n "about-route|Como a experiência pública se organiza" docs/perfil.html`
- `tool_search` for browser/local inspection tooling
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Site manifest validation passed.
- Whitespace/diff check passed.
- Targeted static renders passed for homepage and Sobre.
- Rendered HTML inspection confirmed the new resource cards, the explicit navbar CTA and the Sobre route block.
- Full prepublish site check passed, including SCSS validation, JS syntax checks, module data scripts and complete Quarto render.

### Pending items

- Run true browser visual QA with screenshots if browser tooling becomes available.
- Publish only after explicit user request.

---

## 2026-05-09 — Module post-quiz continuity and readiness block

### Block objective

Continue a long site-only public visual/UX evolution block under `NEXT_SITE.md`, without publishing and without app changes. The block focused on making the internal module flow less abrupt after quizzes, preserving the public learning tone and keeping the new pattern documented, responsive and validated.

### Cycles executed

1. Diagnosis: `NEXT_SITE.md` was in publication-readiness mode, but the current request asked for another visual/UX evolution block with no publication.
   Implementation: kept the work site-only and chose a visible public learning-flow improvement inside modules.
   Testing: reviewed the module quiz/navigation structure with `rg`.
   Notes: no app files were touched and no commit/push was run.
2. Diagnosis: all modules had a pre-quiz checkpoint, but the experience jumped from quiz directly into navigation or phase notes.
   Implementation: added `.module-after-quiz` notes to all 12 module pages, with a certificate-oriented variant in Module 12.
   Testing: inspected source placement after each `.quiz-container`.
   Notes: the new note asks the visitor to revisit the R exercise or advance with a technical phrase recorded.
3. Diagnosis: the new module note needed a coherent public visual treatment rather than default callout styling.
   Implementation: added light-mode SCSS, mobile padding behavior, text wrapping and public component-layer inclusion for `.module-after-quiz`.
   Testing: SCSS validation later passed in the full prepublish gate.
   Notes: the component remains editorial and compact, not dashboard-like.
4. Diagnosis: dark mode and modular future management needed parity.
   Implementation: added dark-mode styling, registered `module-after-quiz` in `data/site-manifest.yml`, documented it in `PUBLIC_SITE_COMPONENTS.md`, and added it to `scripts/validate_site_manifest.R`.
   Testing: `Rscript --vanilla scripts/validate_site_manifest.R` passed.
   Notes: modules now expose `after-quiz` as a public editable region.
5. Diagnosis: the change affects every module, so representative and full renders were needed.
   Implementation: rendered Modules 01, 06 and 12 directly, then ran the full prepublish gate.
   Testing: targeted renders passed; generated HTML contains `.module-after-quiz` in the start, transition and final modules; full `scripts/prepublish_site_check.R` passed.
   Notes: repeated `renv` sandbox and YAML coercion warnings remained non-fatal and unchanged.

### Files changed

- `NEXT_SITE.md`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `data/site-manifest.yml`
- `modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `modules/modulo02-bases-da-genetica-quantitativa.qmd`
- `modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
- `modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd`
- `modules/modulo05-herdabilidade-e-repetibilidade.qmd`
- `modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `modules/modulo07-modelos-lineares-e-modelos-mistos.qmd`
- `modules/modulo08-blup-e-avaliacao-genetica.qmd`
- `modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd`
- `modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd`
- `modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- `modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `scripts/validate_site_manifest.R`
- `styles/main-dark.scss`
- `styles/main.scss`

### Improvements implemented

- Standardized post-quiz continuity guidance across all module pages.
- Added light/dark and responsive styling for the new public learning-flow component.
- Added manifest, documentation and validation coverage for the new `module-after-quiz` pattern and `after-quiz` editable region.

### Problems fixed

- Module pages no longer end quiz sections abruptly before navigation.
- The final module now points the visitor from quiz completion toward certificate readiness with clearer editorial context.
- The future app-management contract now knows about the post-quiz module region.

### Commands executed

- `git status --short --branch`
- `rg -n "quiz-container|module-nav|module-after-quiz|phase-note|completion-note" modules -g '*.qmd'`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render modules/modulo01-introducao-ao-melhoramento-animal.qmd --no-execute`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd --no-execute`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd --no-execute`
- `rg -n "module-after-quiz|Depois do quiz" docs/modules/modulo01-introducao-ao-melhoramento-animal.html docs/modules/modulo06-correlacoes-geneticas-e-fenotipicas.html docs/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Site manifest validation passed.
- Whitespace/diff check passed.
- Targeted static renders passed for Modules 01, 06 and 12.
- Rendered HTML inspection confirmed `.module-after-quiz` in representative start, transition and final modules.
- Full prepublish site check passed, including SCSS validation, JS syntax checks, module data scripts and complete Quarto render.

### Pending items

- Run true browser visual QA with screenshots if browser tooling becomes available.
- Publish only after explicit user request.

---

## 2026-05-09 — Sixth long public visual/UX module-anatomy and support-flow block

### Block objective

Continue site-only public visual/UX evolution without publishing, following `NEXT_SITE.md` as the current review/readiness contract while adding clearer module anatomy on the homepage, support crosslinks on the module index, phase-start notes in key modules, stronger list semantics, responsive code/table handling and manifest validation coverage. No app files were changed.

### Cycles executed

1. Diagnosis: the homepage explained orientation and learning loop, but did not explicitly show what a visitor should expect inside each module.
   Implementation: added `.home-module-anatomy` with four cards: objective, practice, interpretation and quiz.
   Testing: rendered the site and captured `/private/tmp/mgenetica-block6-home-mobile.png`; Playwright verified `.home-module-anatomy` and four `.module-anatomy-card` elements at 1440, 820 and 390 px.
   Notes: the section clarifies the public learning pattern without adding administrative UI.
2. Diagnosis: the module index had phase and route guidance, but visitors arriving from a specific concept needed faster support routes.
   Implementation: added `.modules-support` with actions to search, glossary and weekly route; added an anchor action to jump from route guidance to all modules.
   Testing: rendered `docs/modules/index.html`; screenshots captured `/private/tmp/mgenetica-block6-modules-mobile.png` and `/private/tmp/mgenetica-block6-modules-tablet.png`; Playwright verified support actions and all 12 module cards.
   Notes: primary action remains starting Module 01.
3. Diagnosis: module phase endings were marked in previous work, but phase starts were not explicitly introduced when entering data, modeling and genomics.
   Implementation: added `.module-phase-start` notes to modules 03, 07 and 10.
   Testing: Quarto rendered all three altered modules; Playwright verified `.module-phase-start` on the three pages across desktop, tablet and mobile widths.
   Notes: the notes are short editorial bridges, not scientific rewrites.
4. Diagnosis: module index cards and phase cards lacked explicit list semantics.
   Implementation: added `role="list"` and `role="listitem"` to the phase and module grids in `modules/index.qmd`.
   Testing: full render preserved the markup; Playwright verified the rendered module-card count.
   Notes: this improves accessibility with no visual disruption.
5. Diagnosis: mobile QA exposed document-level overflow from long code and table content in module pages.
   Implementation: added mobile wrapping/containment for source code blocks, scientific tables and inline code.
   Testing: Playwright initially failed with 80 px overflow on Módulo 03; after CSS fixes, Playwright passed 3/3 checks with no document-level horizontal overflow.
   Notes: this addresses a broader module-reading risk, not only the new components.
6. Diagnosis: new public patterns needed governance coverage and final prepublication validation.
   Implementation: updated `data/site-manifest.yml`, `scripts/validate_site_manifest.R`, `PUBLIC_SITE_COMPONENTS.md`, light/dark styles and removed temporary Playwright artifacts.
   Testing: manifest, YAML, Sass, `git diff --check`, full Quarto render, Playwright QA and full `prepublish_site_check.R` all passed.
   Notes: no commit, push or publication was performed.

### Files changed

- `NEXT_SITE.md`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `data/site-manifest.yml`
- `index.qmd`
- `modules/index.qmd`
- `modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
- `modules/modulo07-modelos-lineares-e-modelos-mistos.qmd`
- `modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`

### Improvements implemented

- Homepage now explains the repeatable anatomy of each module.
- Module index now provides support routes to search, glossary and weekly planning before the full catalog.
- Modules 03, 07 and 10 now mark the beginning of major learning phases.
- Phase and module grids now expose list semantics.
- Mobile code, inline code and scientific tables are less likely to create horizontal page overflow.
- Manifest validation now covers home module anatomy, module-index support and phase-start notes.

### Problems fixed

- The course structure inside each module was implied but not visible enough from the homepage.
- Concept-first visitors had to leave the module index to find support tools.
- Phase starts were less explicit than phase endings.
- Mobile QA found overflow in module pages caused by long code/table content.

### Commands executed

- `Rscript scripts/validate_site_manifest.R`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `Rscript -e 'invisible(yaml::read_yaml("_quarto.yml")); invisible(yaml::read_yaml("data/site-manifest.yml")); cat("yaml ok\n")'`
- `git diff --check`
- `HOME=/private/tmp/quarto-home '/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin/quarto' render`
- `python3 -m http.server 8903 --directory docs`
- `pnpm dlx playwright screenshot --viewport-size=390,1400 http://127.0.0.1:8903/ /private/tmp/mgenetica-block6-home-mobile.png`
- `pnpm dlx playwright screenshot --viewport-size=390,1400 http://127.0.0.1:8903/modules/ /private/tmp/mgenetica-block6-modules-mobile.png`
- `pnpm dlx playwright screenshot --viewport-size=820,1200 http://127.0.0.1:8903/modules/ /private/tmp/mgenetica-block6-modules-tablet.png`
- `pnpm dlx playwright screenshot --viewport-size=390,1400 http://127.0.0.1:8903/modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.html /private/tmp/mgenetica-block6-module03-mobile.png`
- `MGENETICA_QA_BASE_URL=http://127.0.0.1:8903 pnpm dlx @playwright/test test .codex-tmp-mgenetica-block6.spec.js --reporter=line`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- YAML validation passed, with the existing parser warning about `.` coercion in workflow metadata.
- Sass validation passed for light and dark themes.
- `git diff --check` passed.
- Full Quarto render passed and generated `docs/index.html`.
- Playwright QA initially caught mobile overflow in Módulo 03, then passed 3/3 checks after code/table/inline-code fixes.
- Full prepublish site check passed with `prepublish site check ok`.

### Pending items

- Review the latest screenshots in `/private/tmp/mgenetica-block6-home-mobile.png`, `/private/tmp/mgenetica-block6-modules-mobile.png`, `/private/tmp/mgenetica-block6-modules-tablet.png` and `/private/tmp/mgenetica-block6-module03-mobile.png`.
- Publish only if explicitly requested after review.

---

## 2026-05-08 — Fifth long public visual/UX navigation-and-phase-flow block

### Block objective

Continue site-only public visual/UX evolution without publishing, following `NEXT_SITE.md` as a review/readiness contract while improving public closure paths, footer navigation, the institutional About page, module phase transitions, responsive footer behavior and governance coverage. No app files were changed.

### Cycles executed

1. Diagnosis: the homepage final CTA offered start and weekly planning, but did not expose the completion/certificate path already introduced elsewhere.
   Implementation: added `Ver como concluir` to the final homepage CTA group, pointing to `certificado.qmd`.
   Testing: rendered the site and Playwright verified the certificate CTA on the home page at 1440, 820 and 390 px.
   Notes: the primary action remains `Começar pelo Módulo 01`.
2. Diagnosis: the footer included utility routes but still omitted `Sobre`, even though it is part of the public institutional route.
   Implementation: added `Sobre` to the Quarto footer center and to `data/site-manifest.yml`.
   Testing: manifest validation confirmed footer sync between manifest and `_quarto.yml`.
   Notes: header navigation was not expanded; the footer now carries the broader public map.
3. Diagnosis: the About page explained the site role but ended without a clear next action and had grids without explicit list semantics.
   Implementation: added list roles to institutional card groups and added `.about-next-step` with actions to modules, search and glossary.
   Testing: screenshots captured `/private/tmp/mgenetica-block5-about-mobile.png` and `/private/tmp/mgenetica-block5-about-tablet.png`; Playwright verified `.site-map-grid`, `.about-next-step` and three actions across viewports.
   Notes: the page remains institutional and public, not administrative.
4. Diagnosis: phase boundaries inside the course were visible in the module index but not at the moment a learner completed a phase.
   Implementation: added `.module-phase-note` after quizzes in modules 02, 06 and 09, marking transitions to data/parameters, modeling and genomics.
   Testing: Quarto rendered all module pages; Playwright verified `.module-phase-note` on modules 02, 06 and 09 at desktop, tablet and mobile widths.
   Notes: notes are concise editorial transitions, not scientific rewrites.
5. Diagnosis: adding another footer item caused mobile horizontal overflow in QA.
   Implementation: updated footer styles so center links wrap, footer columns constrain to viewport width on mobile, and the issue action is hidden in the tight mobile footer.
   Testing: initial Playwright QA found 16 px mobile overflow; after the footer fix, Playwright passed 3/3 checks with no document-level horizontal overflow.
   Notes: this directly addressed a responsive regression introduced in this block.
6. Diagnosis: new public patterns needed governance and documentation coverage plus full validation.
   Implementation: updated `PUBLIC_SITE_COMPONENTS.md`, `data/site-manifest.yml`, `scripts/validate_site_manifest.R`, light/dark styles and local QA artifacts, then removed temporary Playwright files.
   Testing: manifest, YAML, Sass, `git diff --check`, full Quarto render, Playwright QA and full `prepublish_site_check.R` all passed.
   Notes: no commit, push or publication was performed.

### Files changed

- `NEXT_SITE.md`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `_quarto.yml`
- `data/site-manifest.yml`
- `index.qmd`
- `modules/modulo02-bases-da-genetica-quantitativa.qmd`
- `modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd`
- `perfil.qmd`
- `scripts/validate_site_manifest.R`
- `styles/main.scss`
- `styles/main-dark.scss`

### Improvements implemented

- Homepage final CTA now exposes the public completion/certificate route.
- Footer navigation now includes the institutional About route.
- About page now has clearer public next actions and stronger accessibility semantics.
- Module phase transitions are now visible at the end of modules 02, 06 and 09.
- Footer mobile wrapping prevents horizontal overflow with the expanded footer route set.
- Component documentation and manifest validation now cover the new About and phase-transition patterns.

### Problems fixed

- The public footer did not represent the complete institutional route set.
- The About page ended without a clear next action.
- Phase boundaries were only explained outside the module completion moment.
- QA found a 16 px mobile overflow after footer expansion; footer wrapping fixed it.

### Commands executed

- `Rscript scripts/validate_site_manifest.R`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `Rscript -e 'invisible(yaml::read_yaml("_quarto.yml")); invisible(yaml::read_yaml("data/site-manifest.yml")); cat("yaml ok\n")'`
- `git diff --check`
- `HOME=/private/tmp/quarto-home '/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin/quarto' render`
- `python3 -m http.server 8902 --directory docs`
- `pnpm dlx playwright screenshot --viewport-size=390,1200 http://127.0.0.1:8902/ /private/tmp/mgenetica-block5-home-mobile.png`
- `pnpm dlx playwright screenshot --viewport-size=390,1200 http://127.0.0.1:8902/perfil.html /private/tmp/mgenetica-block5-about-mobile.png`
- `pnpm dlx playwright screenshot --viewport-size=820,1200 http://127.0.0.1:8902/perfil.html /private/tmp/mgenetica-block5-about-tablet.png`
- `pnpm dlx playwright screenshot --viewport-size=390,1400 http://127.0.0.1:8902/modules/modulo06-correlacoes-geneticas-e-fenotipicas.html /private/tmp/mgenetica-block5-module06-mobile.png`
- `MGENETICA_QA_BASE_URL=http://127.0.0.1:8902 pnpm dlx @playwright/test test .codex-tmp-mgenetica-block5.spec.js --reporter=line`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- YAML validation passed, with the existing parser warning about `.` coercion in workflow metadata.
- Sass validation passed for light and dark themes.
- `git diff --check` passed.
- Full Quarto render passed and generated `docs/index.html`.
- Playwright QA initially caught mobile footer overflow, then passed 3/3 checks after the footer fix.
- Full prepublish site check passed with `prepublish site check ok`.

### Pending items

- Review the latest screenshots in `/private/tmp/mgenetica-block5-home-mobile.png`, `/private/tmp/mgenetica-block5-about-mobile.png`, `/private/tmp/mgenetica-block5-about-tablet.png` and `/private/tmp/mgenetica-block5-module06-mobile.png`.
- Publish only if explicitly requested after review.

---

## 2026-05-08 — Fourth long public visual/UX certificate-readiness block

### Block objective

Continue site-only public visual/UX evolution without publishing, using `NEXT_SITE.md` as the review/readiness contract while improving the public completion path: homepage orientation, route-to-certificate CTA, certificate page editorial structure, certificate progress accessibility, responsive/dark-mode styling and manifest validation coverage. No app files were changed.

### Cycles executed

1. Diagnosis: the homepage had strong start/discovery sections, but it still lacked a concise orientation moment explaining how entry, support tools and completion fit together.
   Implementation: added `.home-orientation` with three cards for point of entry, support during reading and course closure.
   Testing: rendered the site and captured `/private/tmp/mgenetica-block4-home-mobile.png`; Playwright verified `.home-orientation` and three `.orientation-card` elements at 1440, 820 and 390 px.
   Notes: the section supports first-visit clarity without adding app-like progress UI.
2. Diagnosis: the study route ended with study actions but did not explain that the route leads to a certificate closure.
   Implementation: added a restrained secondary CTA from `semanas/index.qmd` to `certificado.qmd`.
   Testing: Playwright verified the certificate CTA on the rendered route page at desktop, tablet and mobile widths; screenshot captured `/private/tmp/mgenetica-block4-route-mobile.png`.
   Notes: the primary route action remains starting Module 01.
3. Diagnosis: `certificado.qmd` had a functional gate but the top of the page felt less aligned with the public editorial system and relied on inline hero styling.
   Implementation: added full-page metadata, a `.page-hero`, `.certificate-intro` cards, `.certificate-ready` and `.certificate-actions`, while preserving the existing browser-local certificate logic.
   Testing: rendered `docs/certificado.html`; screenshots captured `/private/tmp/mgenetica-block4-certificate-mobile.png` and `/private/tmp/mgenetica-block4-certificate-tablet.png`.
   Notes: the certificate page now reads as a public completion page rather than a raw utility.
4. Diagnosis: the certificate progress list used visual symbols for completion state, which was weaker for accessibility and polish.
   Implementation: replaced the symbol-only progress markers with textual `Concluído`/`Pendente` states and added responsive styles for `.certificate-progress-list`.
   Testing: Sass validation passed for light and dark themes; Playwright verified no horizontal overflow on certificate across 1440, 820 and 390 px.
   Notes: progress remains stored locally in the browser; no backend or app behavior was added.
5. Diagnosis: new public patterns needed governance coverage so future app-based management can recognize editable regions without owning longform behavior.
   Implementation: updated `data/site-manifest.yml`, `scripts/validate_site_manifest.R` and `PUBLIC_SITE_COMPONENTS.md` for home orientation and certificate intro/status patterns.
   Testing: `Rscript scripts/validate_site_manifest.R`, YAML validation and `git diff --check` passed.
   Notes: certificate governance now includes hero, intro and gate markers.
6. Diagnosis: final verification needed full render, screenshots, automated responsive QA and the full prepublication gate.
   Implementation: rendered with vendored Quarto, served `docs/` locally, captured screenshots, ran a temporary Playwright QA spec with `@playwright/test`, removed temporary test artifacts, stopped the server and ran the full prepublish check.
   Testing: Playwright passed 3/3 checks; full `prepublish_site_check.R` passed with `prepublish site check ok`.
   Notes: no commit, push or publication was performed.

### Files changed

- `NEXT_SITE.md`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `certificado.qmd`
- `data/site-manifest.yml`
- `index.qmd`
- `scripts/validate_site_manifest.R`
- `semanas/index.qmd`
- `styles/main.scss`
- `styles/main-dark.scss`

### Improvements implemented

- Homepage now explains how entry, support tools and completion relate.
- Study route now links to certificate context as a secondary action.
- Certificate page now uses the public `page-hero` pattern and certificate-specific editorial cards.
- Certificate progress states now use text labels instead of symbol-only status.
- New components have responsive and dark-mode styling.
- Manifest validation now covers certificate hero/intro regions and homepage orientation.

### Problems fixed

- Certificate page felt less visually integrated with the public site.
- Certificate progress status depended on icon-like visual symbols.
- The route-to-certificate relationship was underexplained.
- New certificate/home patterns needed component documentation and validation coverage.

### Commands executed

- `Rscript scripts/validate_site_manifest.R`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `Rscript -e 'invisible(yaml::read_yaml("_quarto.yml")); invisible(yaml::read_yaml("data/site-manifest.yml")); cat("yaml ok\n")'`
- `git diff --check`
- `HOME=/private/tmp/quarto-home '/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin/quarto' render`
- `python3 -m http.server 8901 --directory docs`
- `pnpm dlx playwright screenshot --viewport-size=390,1200 http://127.0.0.1:8901/ /private/tmp/mgenetica-block4-home-mobile.png`
- `pnpm dlx playwright screenshot --viewport-size=390,1200 http://127.0.0.1:8901/certificado.html /private/tmp/mgenetica-block4-certificate-mobile.png`
- `pnpm dlx playwright screenshot --viewport-size=820,1200 http://127.0.0.1:8901/certificado.html /private/tmp/mgenetica-block4-certificate-tablet.png`
- `pnpm dlx playwright screenshot --viewport-size=390,1200 http://127.0.0.1:8901/semanas/ /private/tmp/mgenetica-block4-route-mobile.png`
- `MGENETICA_QA_BASE_URL=http://127.0.0.1:8901 pnpm dlx @playwright/test test .codex-tmp-mgenetica-block4.spec.js --reporter=line`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- YAML validation passed, with the existing parser warning about `.` coercion in workflow metadata.
- Sass validation passed for light and dark themes.
- `git diff --check` passed.
- Full Quarto render passed and generated `docs/index.html`.
- Playwright local QA passed 3/3 checks for new public UX markers and no document-level horizontal overflow at 1440, 820 and 390 px.
- Full prepublish site check passed with `prepublish site check ok`.

### Pending items

- Review the latest screenshots in `/private/tmp/mgenetica-block4-home-mobile.png`, `/private/tmp/mgenetica-block4-certificate-mobile.png`, `/private/tmp/mgenetica-block4-certificate-tablet.png` and `/private/tmp/mgenetica-block4-route-mobile.png`.
- Publish only if explicitly requested after review.

---

## 2026-05-08 — Third long public visual/UX support-flow block

### Block objective

Continue site-only public visual/UX evolution without publishing, using `NEXT_SITE.md` as review/readiness context while adding higher-impact support-flow improvements: discovery from the homepage, footer navigation to certificate, search/glossary next actions, module 12 completion context, responsive/dark-mode styling and manifest validation coverage. No app files were changed.

### Cycles executed

1. Diagnosis: the accumulated homepage improvements clarified the main learning path, but support routes such as search and glossary were still underexposed from the homepage.
   Implementation: added a `.home-discovery` section with cards for Busca, Glossário and Roteiro.
   Testing: rendered the site and verified `docs/index.html` contains `.home-discovery`; Playwright checked the home page at desktop, tablet and mobile widths.
   Notes: this makes discovery feel like learning support, not an administrative utility.
2. Diagnosis: the footer omitted the certificate route even though module 12 links to it and `certificado.qmd` is part of the public site.
   Implementation: added `Certificado` to the Quarto footer center links and registered the certificate page/footer item in the manifest.
   Testing: the manifest validator initially caught a mistaken insertion into primary navigation; fixed it so the header stays focused and the footer carries certificate access.
   Notes: the public header remains unchanged apart from the existing compact `Começar` CTA.
3. Diagnosis: search and glossary pages had useful hero and task-flow panels, but after using them the visitor had no explicit next action.
   Implementation: added `.utility-next-step` CTA groups to `busca.qmd` and `glossario.qmd`.
   Testing: rendered `docs/busca.html` and `docs/glossario.html`; Playwright verified `.utility-next-step` on both pages across 1440, 820 and 390 px widths.
   Notes: local QA logs show a 404 for `_pagefind/pagefind-ui.css` before Pagefind indexing; the page fallback remains expected in local render and publication indexing handles the asset.
4. Diagnosis: module 12 ended with quiz and navigation, but the final learning moment needed a stronger editorial close before certificate.
   Implementation: added `.module-completion-note` after the final quiz, framing the certificate as formal closure and the interpretation as evidence of learning.
   Testing: rendered module 12 and ran Playwright presence/overflow checks for `.module-completion-note` and `.module-nav`.
   Notes: no scientific lesson rewrite was added; the note is concise and editorial.
5. Diagnosis: new support components needed visual system coverage, dark-mode parity and app-future governance.
   Implementation: styled `.discovery-grid`, `.discovery-card`, `.utility-next-step` and `.module-completion-note`; added dark-mode overrides; updated `PUBLIC_SITE_COMPONENTS.md`, `data/site-manifest.yml` and `scripts/validate_site_manifest.R`.
   Testing: `Rscript scripts/validate_site_manifest.R`, Sass validation, YAML validation and `git diff --check` passed.
   Notes: the validator now checks the certificate page marker and utility next-step regions.
6. Diagnosis: final block verification needed full render, screenshot QA and the complete prepublication gate without publishing.
   Implementation: rendered with vendored Quarto, served `docs/` locally, captured screenshots for home, search and module 12, ran a temporary Playwright test over home/search/glossary/module12/certificate, removed temporary Playwright artifacts, and ran full prepublish validation.
   Testing: Playwright passed 15/15 checks; full `prepublish_site_check.R` passed with `prepublish site check ok`.
   Notes: the local HTTP server was stopped after QA.

### Files changed

- `NEXT_SITE.md`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `_quarto.yml`
- `busca.qmd`
- `data/site-manifest.yml`
- `glossario.qmd`
- `index.qmd`
- `modules/index.qmd`
- `modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `scripts/validate_site_manifest.R`
- `semanas/index.qmd`
- `styles/main.scss`
- `styles/main-dark.scss`

### Improvements implemented

- Homepage now exposes search, glossary and route as public learning support.
- Footer now includes the public certificate route.
- Search and glossary pages now provide clear next actions back to the learning path.
- Module 12 now has an explicit course-completion note before certificate navigation.
- New support-flow components are covered by responsive and dark-mode styling.
- Manifest validation now covers certificate and utility next-step regions.

### Problems fixed

- Certificate route existed but was not represented in footer navigation or the manifest page registry.
- Search/glossary were useful but dead-ended after the primary task.
- Module 12 final transition to certificate was abrupt.
- A first manifest attempt put `Certificado` in primary navigation; validation caught it and the route was moved to footer-only navigation.

### Commands executed

- `Rscript scripts/validate_site_manifest.R`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `git diff --check`
- `Rscript -e 'invisible(yaml::read_yaml("_quarto.yml")); invisible(yaml::read_yaml("data/site-manifest.yml")); cat("yaml ok\n")'`
- `HOME=/private/tmp/quarto-home '/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin/quarto' render`
- `python3 -m http.server 8899 --directory docs`
- `pnpm dlx playwright screenshot --viewport-size=390,1200 http://127.0.0.1:8899/ /private/tmp/mgenetica-block3-home-mobile.png`
- `pnpm dlx playwright screenshot --viewport-size=390,1200 http://127.0.0.1:8899/busca.html /private/tmp/mgenetica-block3-search-mobile.png`
- `pnpm dlx playwright screenshot --viewport-size=390,1200 http://127.0.0.1:8899/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html /private/tmp/mgenetica-block3-module12-mobile.png`
- `MGENETICA_QA_BASE_URL=http://127.0.0.1:8899 pnpm dlx playwright test .codex-tmp-mgenetica-public-ux.spec.js --reporter=line`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- YAML validation passed, with the existing YAML parser warning about `.` coercion in workflow metadata.
- Sass validation passed for light and dark themes.
- `git diff --check` passed.
- Full Quarto render passed and generated `docs/index.html`.
- Playwright local QA passed 15/15 checks for altered support-flow markers and no document-level horizontal overflow at 1440, 820 and 390 px.
- Full prepublish site check passed with `prepublish site check ok`.

### Pending items

- Review the latest screenshots in `/private/tmp/mgenetica-block3-home-mobile.png`, `/private/tmp/mgenetica-block3-search-mobile.png` and `/private/tmp/mgenetica-block3-module12-mobile.png`.
- Publish only if explicitly requested after review.

---

## 2026-05-08 — Second long public visual/UX readiness block

### Block objective

Continue the site-only public visual/UX evolution block on top of the already validated local changes, following `NEXT_SITE.md` as a review/readiness contract. The block refined first-viewport action visibility, strengthened public CTAs, improved route/module flow, expanded component governance and reran full validation. No app files were changed and no publication was performed.

### Cycles executed

1. Diagnosis: screenshots from the previous block showed the homepage CTA was still too low in the hero, especially on mobile; the first viewport communicated brand and promise but delayed the next action.
   Implementation: moved `.hero-actions` above the hero meta cards and tightened hero spacing so the primary action appears earlier on desktop and mobile.
   Testing: rendered the site and captured new homepage screenshots at 390 px and 1440 px.
   Notes: the mobile screenshot now shows `Começar pelo Módulo 01` within the first viewport.
2. Diagnosis: homepage entry cards were visually useful but not explicitly grouped for assistive technology.
   Implementation: added `role="list"` to the entry grid and `role="listitem"` to each entry card.
   Testing: full Quarto render preserved the markup and Playwright presence checks passed.
   Notes: this is a low-risk accessibility improvement with no visual change.
3. Diagnosis: the module index still ended immediately after the 12 module cards, leaving the final decision less directed.
   Implementation: added a `.modules-next-step` final band with a recommended path and two actions: start Module 01 or plan by week.
   Testing: rendered `docs/modules/index.html`; Playwright verified `.modules-next-step` across 1440, 820 and 390 px widths.
   Notes: this complements the top CTA without changing module card content.
4. Diagnosis: the weekly route had a visual progress map, but it needed a small explanatory note to avoid reading it as a dashboard or scorecard.
   Implementation: added `.route-map-intro` before the learning map to explain that the map is a marker of progress, not a score.
   Testing: rendered `docs/semanas/index.html`; Playwright verified `.route-map-intro` across desktop/tablet/mobile widths.
   Notes: this preserves the public editorial tone and avoids app-like semantics.
5. Diagnosis: new public components needed responsive and dark-mode parity plus manifest governance coverage.
   Implementation: added CSS for `.modules-next-step`, `.modules-next-step-actions` and `.route-map-intro`, added dark-mode overrides, updated `PUBLIC_SITE_COMPONENTS.md`, expanded `data/site-manifest.yml` editorial patterns and editable regions, and updated validator markers in `scripts/validate_site_manifest.R`.
   Testing: `Rscript scripts/validate_site_manifest.R`, YAML validation, Sass validation and `git diff --check` passed.
   Notes: the module index is now covered by editable-region validation rather than only page existence/navigation checks.
6. Diagnosis: final verification needed to cover rendered output, screenshots, responsive overflow and full local prepublication gate without publishing.
   Implementation: served `docs/` locally, captured new screenshots for homepage, module index and weekly route, ran a temporary Playwright test for public UX markers and document width, then removed the temporary test file and `test-results`.
   Testing: Playwright passed 9/9 checks; full `Rscript scripts/prepublish_site_check.R` passed with Quarto on `PATH`.
   Notes: the local HTTP server was stopped after QA.

### Files changed

- `NEXT_SITE.md`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `_quarto.yml`
- `data/site-manifest.yml`
- `index.qmd`
- `modules/index.qmd`
- `scripts/validate_site_manifest.R`
- `semanas/index.qmd`
- `styles/main.scss`
- `styles/main-dark.scss`

### Improvements implemented

- Homepage primary CTA is now visible earlier in desktop and mobile first viewport.
- Homepage entry-card group has clearer accessibility semantics.
- Module index now has a final next-step band for visitor decision-making.
- Weekly route now explains how to interpret the progress map.
- New components have responsive and dark-mode styling.
- Manifest validation now covers editable regions for the module index and the new route map intro.

### Problems fixed

- First viewport action hierarchy was still too delayed after the previous block.
- The module index lacked a decisive closing action after the full catalog.
- New module-index and route components needed governance coverage to remain manageable later.

### Commands executed

- `Rscript scripts/validate_site_manifest.R`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `git diff --check`
- `Rscript -e 'invisible(yaml::read_yaml("_quarto.yml")); invisible(yaml::read_yaml("data/site-manifest.yml")); cat("yaml ok\n")'`
- `HOME=/private/tmp/quarto-home '/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin/quarto' render`
- `python3 -m http.server 8899 --directory docs`
- `pnpm dlx playwright screenshot --viewport-size=390,900 http://127.0.0.1:8899/ /private/tmp/mgenetica-block2-home-mobile.png`
- `pnpm dlx playwright screenshot --viewport-size=1440,1100 http://127.0.0.1:8899/ /private/tmp/mgenetica-block2-home-desktop.png`
- `pnpm dlx playwright screenshot --viewport-size=390,1200 http://127.0.0.1:8899/modules/ /private/tmp/mgenetica-block2-modules-mobile.png`
- `pnpm dlx playwright screenshot --viewport-size=390,1200 http://127.0.0.1:8899/semanas/ /private/tmp/mgenetica-block2-route-mobile.png`
- `pnpm dlx playwright screenshot --viewport-size=820,1100 http://127.0.0.1:8899/modules/ /private/tmp/mgenetica-block2-modules-tablet.png`
- `MGENETICA_QA_BASE_URL=http://127.0.0.1:8899 pnpm dlx playwright test .codex-tmp-mgenetica-public-ux.spec.js --reporter=line`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- YAML validation passed.
- Sass validation passed for light and dark themes.
- `git diff --check` passed.
- Full Quarto render passed and generated `docs/index.html`.
- Playwright local QA passed 9/9 checks for altered public UX markers and no document-level horizontal overflow at 1440, 820 and 390 px.
- Full prepublish site check passed with `prepublish site check ok`.

### Pending items

- Review the latest screenshots in `/private/tmp/mgenetica-block2-home-desktop.png`, `/private/tmp/mgenetica-block2-home-mobile.png`, `/private/tmp/mgenetica-block2-modules-mobile.png`, `/private/tmp/mgenetica-block2-modules-tablet.png` and `/private/tmp/mgenetica-block2-route-mobile.png`.
- Publish only if explicitly requested after review.

---

## 2026-05-08 — Long public visual/UX evolution block

### Block objective

Execute a long site-only public visual/UX block after the completed publication validation. The work focused on homepage clarity, public navigation, internal route experience, responsiveness/accessibility, and modular content governance. No app files were changed and no publication was performed.

### Cycles executed

1. Diagnosis: `NEXT_SITE.md` still described post-publication validation, but that deployment had already been completed in the previous publication request; the next useful site-only work was visible public UX evolution aligned with `BACKLOG_SITE.md`.
   Implementation: refined the homepage hero promise, added a concise learning-cycle note and introduced a new repeatable "same cycle in every module" section.
   Testing: rendered the site with the vendored Quarto CLI and verified the generated homepage contains `.hero-signal` and `.learning-loop-grid`.
   Notes: this directly addresses homepage first-viewport clarity and the concept-to-code-to-interpretation narrative.
2. Diagnosis: the public header had clear labels but no persistent start action for visitors already convinced to begin.
   Implementation: added a restrained `Começar` navbar CTA pointing to Module 01 and styled it as a compact journey action with light/dark parity.
   Testing: screenshot QA confirmed the desktop header shows the action without crowding the existing navigation.
   Notes: the primary navigation order remains unchanged and manifest validation still protects the canonical left/footer nav.
3. Diagnosis: the module index CTAs were semantically visible but not exposed as navigation regions for assistive technology.
   Implementation: added `role="navigation"` and explicit `aria-label` values to the module-index action groups.
   Testing: rendered `docs/modules/index.html` and verified the action-region labels are present.
   Notes: this improves accessibility without changing the visual hierarchy already validated in the previous block.
4. Diagnosis: the weekly route page explained rhythm but did not provide a phase-level map before the detailed 12-week table.
   Implementation: added a `route-overview` section with four phase cards and a final route CTA group back to Module 01 or the module index.
   Testing: rendered `docs/semanas/index.html`, captured a mobile screenshot and verified `.route-overview` exists.
   Notes: this strengthens internal public pages and helps users understand the progression before entering the table.
5. Diagnosis: new public patterns needed responsive, focus and dark-mode support plus governance coverage.
   Implementation: added CSS for `.hero-signal`, `.learning-loop-*`, `.route-overview-*`, navbar CTA focus states and dark-mode parity; updated `PUBLIC_SITE_COMPONENTS.md`, `data/site-manifest.yml` and `scripts/validate_site_manifest.R` so new editable regions are validated.
   Testing: Sass compilation, manifest validation and `git diff --check` passed.
   Notes: the validator initially failed because the new manifest regions lacked marker mappings; the script was updated to enforce the new contract rather than bypass it.
6. Diagnosis: final verification needed rendered HTTP QA across the altered pages and common viewport widths.
   Implementation: served `docs/` locally on port 8899, captured screenshots for homepage desktop/mobile plus module index and weekly route mobile, and ran a temporary Playwright overflow/presence test against home, modules and route at 1440, 820 and 390 px widths.
   Testing: all 9 Playwright checks passed; screenshots were saved under `/private/tmp/mgenetica-*.png`.
   Notes: the temporary test file and generated `test-results/` directory were removed after QA.

### Files changed

- `PUBLIC_SITE_COMPONENTS.md`
- `_quarto.yml`
- `data/site-manifest.yml`
- `index.qmd`
- `modules/index.qmd`
- `scripts/validate_site_manifest.R`
- `semanas/index.qmd`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Homepage now explains the repeatable learning cycle more explicitly before the rest of the page.
- Header now has a compact public start CTA while preserving the existing navigation order.
- Module-index actions are labeled as navigation landmarks.
- Weekly route page now has a phase-level overview and clearer next actions.
- New public components have responsive, focus and dark-mode coverage.
- Manifest validation now recognizes the new homepage and route editable regions.

### Problems fixed

- The local contract still pointed to post-publication validation after publication had already been completed.
- Newly declared editable regions initially lacked validator marker mappings; this was fixed in `scripts/validate_site_manifest.R`.

### Commands executed

- `Rscript scripts/validate_site_manifest.R`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `Rscript -e 'invisible(yaml::read_yaml("_quarto.yml")); invisible(yaml::read_yaml("data/site-manifest.yml")); cat("yaml ok\n")'`
- `node --check assets/js/quiz.js`
- `node --check assets/js/teacher-mode.js`
- `HOME=/private/tmp/quarto-home '/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin/quarto' render`
- `python3 -m http.server 8899 --directory docs`
- `pnpm dlx playwright screenshot --viewport-size=390,900 http://127.0.0.1:8899/ /private/tmp/mgenetica-home-mobile.png`
- `pnpm dlx playwright screenshot --viewport-size=1440,1100 http://127.0.0.1:8899/ /private/tmp/mgenetica-home-desktop.png`
- `pnpm dlx playwright screenshot --viewport-size=390,900 http://127.0.0.1:8899/modules/ /private/tmp/mgenetica-modules-mobile.png`
- `pnpm dlx playwright screenshot --viewport-size=390,900 http://127.0.0.1:8899/semanas/ /private/tmp/mgenetica-route-mobile.png`
- `MGENETICA_QA_BASE_URL=http://127.0.0.1:8899 pnpm dlx playwright test .codex-tmp-mgenetica-public-ux.spec.js --reporter=line`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Manifest validation passed.
- YAML validation passed, with the existing YAML parser warning about `.` coercion in workflow metadata.
- Sass validation passed for light and dark themes.
- JS syntax checks passed.
- Full Quarto render passed and generated `docs/index.html`.
- Module data scripts for modules 01-12 passed inside `prepublish_site_check.R`.
- Playwright local QA passed 9/9 checks for presence of altered components and no document-level horizontal overflow.
- Full prepublish site check passed with `prepublish site check ok`.

### Pending items

- Review the rendered screenshots in `/private/tmp/mgenetica-home-desktop.png`, `/private/tmp/mgenetica-home-mobile.png`, `/private/tmp/mgenetica-modules-mobile.png` and `/private/tmp/mgenetica-route-mobile.png`.
- Publish only if explicitly requested after review.

---

## 2026-05-08 — Publication of public UX QA changes

### Block objective

Publish the validated public-site UX and accessibility changes after the screenshot QA blocks, following the explicit user request to publish.

### Actions

- Confirmed the tracked diff is site-only.
- Kept pre-existing untracked local files out of publication: `.agents/`, `.vscode/`, `AUTOMATION_SITE.md`.
- Ran the full prepublication gate with the vendored Quarto CLI on `PATH` and `HOME=/private/tmp/quarto-home`.
- Prepared the site records for publication.
- Committed and pushed the tracked site changes to `main`.

### Files changed

- `NEXT_SITE.md`
- `WORKLOG_SITE.md`
- `assets/html/head-extras.html`
- `index.qmd`
- `modules/index.qmd`
- `modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `modules/modulo02-bases-da-genetica-quantitativa.qmd`
- `modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
- `modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd`
- `modules/modulo05-herdabilidade-e-repetibilidade.qmd`
- `modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `modules/modulo07-modelos-lineares-e-modelos-mistos.qmd`
- `modules/modulo08-blup-e-avaliacao-genetica.qmd`
- `modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd`
- `modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd`
- `modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- `modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `styles/main.scss`
- `styles/main-dark.scss`

### Validation

- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R` passed.

### Pending items

- Confirm the GitHub Actions deployment completes.
- Run deployed-site validation after deployment.

---

## 2026-05-08 — Browser screenshot QA + anchor focus polish

### Block objective

Execute the `browser-screenshot-qa` block from `NEXT_SITE.md`: run screenshot-based QA of the public site across desktop, tablet and mobile; check light/dark theme behavior; inspect homepage CTAs, module index route band and representative module checkpoint/quiz/navigation flows; apply only evidence-based site polish; validate and update records. No app files were changed and no publication was performed.

### Cycles executed

1. Diagnosis: no Codex browser screenshot tool was exposed in this session, but Playwright CLI could be installed through `pnpm dlx`; `quarto` remained absent from `PATH`.
   Implementation: rendered the site with the vendored Quarto binary and prepared a temporary Playwright QA workspace under `/private/tmp/mgenetica-playwright-qa`.
   Testing: `quarto render` completed successfully; Playwright 1.59.1 was available.
   Notes: Chromium installation and headless execution required sandbox escalation because the browser cache and MachPort launch are outside the normal workspace sandbox.

2. Diagnosis: the first `file://` screenshot pass produced screenshots but did not load quizzes or dark mode reliably.
   Implementation: served the rendered `docs/` directory through `python3 -m http.server 8899 --directory docs` and reran screenshots against `http://127.0.0.1:8899`.
   Testing: screenshots confirmed quizzes render over HTTP; `/private/tmp/mgenetica-site-qa/visual-qa-report.json` was generated.
   Notes: the temporary HTTP server was stopped after QA.

3. Diagnosis: screenshot and focus audit showed Quarto-generated `anchorjs-link` entries were still appearing in keyboard focus order after headings.
   Implementation: updated `assets/html/head-extras.html` to mark `.anchorjs-link` as `tabindex="-1"` and `aria-hidden="true"` using an initial pass, delayed pass and `MutationObserver`.
   Testing: rerendered the site and reran the Playwright audit; focusable output no longer included heading anchor links after the script's tabindex filter.
   Notes: this improves keyboard navigation without changing visible content.

4. Diagnosis: homepage first viewport, final CTA and module index route band needed rendered checks across mobile/tablet/desktop and dark mode.
   Implementation: captured top and component screenshots for `.hero`, `.home-final-cta` and `.modules-route` in light and dark themes at 1440, 820 and 390 px widths.
   Testing: screenshots in `/private/tmp/mgenetica-site-qa` showed no page-level horizontal overflow and no clipped CTA text in those components.
   Notes: dark mode visually applied via the Quarto theme toggle; the report's `darkActive` flag is unreliable because Quarto does not consistently expose the state via `body.quarto-dark`.

5. Diagnosis: representative module pages needed checkpoint/quiz/nav screenshots and mobile overflow verification.
   Implementation: captured screenshots for modules 01, 08 and 12 around `.module-study-checkpoint`, `.quiz-container` and `.module-nav`.
   Testing: report found no document-level overflow; element-level overflow was limited to scientific tables/code/math inside scrollable content, not to the page width.
   Notes: quiz containers loaded correctly over HTTP and checkpoint-to-quiz flow was visible.

6. Diagnosis: final validation needed to include the new head include change plus the existing site-only local polish.
   Implementation: ran the validation suite with the vendored Quarto binary on `PATH`.
   Testing: manifest validation, Sass compilation, JS syntax checks, `git diff --check`, full `Rscript scripts/prepublish_site_check.R` including Quarto render, and deployed-site validation all passed.
   Notes: only site files were touched; no commit, push or publication was performed.

### Files changed

- `assets/html/head-extras.html`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Removed generated heading anchor links from the keyboard tab sequence while keeping them visually/functionally available for pointer use.
- Completed screenshot QA over HTTP for homepage, module index and representative module pages across light/dark and desktop/tablet/mobile.
- Confirmed route-band, final CTA, checkpoint, quiz and module navigation flows render without page-level overflow.

### Problems fixed

- Quarto heading anchors were polluting keyboard navigation after the primary page actions.
- `file://` screenshots did not represent quiz loading accurately; HTTP-local QA now verifies the rendered behavior.

### Commands executed

- `pnpm dlx playwright --version`
- `pnpm add playwright` in `/private/tmp/mgenetica-playwright-qa`
- `pnpm exec playwright install chromium`
- `HOME=/private/tmp/quarto-home '/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin/quarto' render`
- `python3 -m http.server 8899 --directory docs`
- `MGENETICA_QA_BASE_URL=http://127.0.0.1:8899 node mgenetica_visual_qa.js`
- `lsof -ti :8899`
- `kill 18002`
- `Rscript scripts/validate_site_manifest.R`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `node --check assets/js/quiz.js`
- `node --check assets/js/teacher-mode.js`
- `git diff --check`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`
- `Rscript scripts/validate_deployed_site.R`

### Test results

- 102 screenshots were generated in `/private/tmp/mgenetica-site-qa`.
- `visual-qa-report.json` recorded no document-level horizontal overflow across the tested pages/viewports.
- Homepage, module index and representative module screenshots passed visual checks for CTA wrapping and component stacking.
- Light and dark theme screenshots were captured; dark mode was visually confirmed in screenshots.
- Manifest validation passed.
- Sass validation passed.
- JS syntax checks passed.
- Full prepublish site check passed, including Quarto render.
- Deployed-site validation passed.
- `git diff --check` passed.

### Pending items

- Review the generated screenshots manually before any publication decision.
- If publication is requested later, commit/push only after rerunning `Rscript scripts/prepublish_site_check.R` and `git diff --check`.

---

## 2026-05-08 — Post-publication rendered UX QA block

### Block objective

Execute a long site-only QA/polish block from `NEXT_SITE.md`, focused on the public MGenética UX after publication: homepage CTA hierarchy, module index route band, representative module pages, mobile/accessibility behavior, validation and records. No app files were changed and no publication was performed.

### Cycles executed

1. Diagnosis: confirmed the worktree had only pre-existing untracked planning/editor files (`.agents/`, `.vscode/`, `AUTOMATION_SITE.md`) and no app changes; `quarto` was not available on `PATH`.
   Implementation: used the vendored Quarto binary at `/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin/quarto` with `HOME=/private/tmp/quarto-home`.
   Testing: `quarto --version` returned `1.9.37`; full `quarto render` completed and generated `docs/index.html`.
   Notes: `quarto preview` failed inside the sandbox with `PermissionDenied`, then started with escalation on `http://localhost:4876/`; during later preview requests it emitted a Quarto Sass-cache `BadResource` error, while the full static render remained successful.

2. Diagnosis: the homepage final CTA repeated the same module-index choice already present in the hero and mid-page section, making the end-of-page decision less useful.
   Implementation: adjusted the final CTA copy to acknowledge weekly planning and changed the secondary action from the module catalog to the weekly route.
   Testing: re-rendered the site and verified the generated homepage link resolves to `./semanas/index.html`.
   Notes: the primary action remains "Começar pelo Módulo 01".

3. Diagnosis: the module index route band was visually close to the main action hierarchy and still used source-oriented `.qmd` references in the source block.
   Implementation: changed the route-band actions to "Revisar fases" and "Planejar por semana", using an in-page anchor and explicit rendered `.html` route for the weekly plan; softened route-band button styling in light and dark themes.
   Testing: verified rendered `docs/modules/index.html` contains `#fases-da-trilha` and `../semanas/index.html`, and no rendered `.qmd` hrefs were found.
   Notes: the main module-index hero remains responsible for starting Module 01.

4. Diagnosis: the pre-quiz checkpoint existed consistently, but its copy stopped just before the quiz and could make the transition feel less intentional.
   Implementation: updated all 12 module checkpoint notes with a short instruction to enter the quiz with the interpretation sentence in mind; added tighter spacing from checkpoint to quiz.
   Testing: checked rendered representative modules 01, 08 and 12 for `.module-study-checkpoint`, `.quiz-container` and `.module-nav` presence.
   Notes: module navigation links already point to rendered `.html` outputs.

5. Diagnosis: mobile learning-path arrows were centered between full-width stacked cards, which could visually compete with the content; route-band CTAs also needed quieter dark-mode parity.
   Implementation: moved mobile hero path connectors toward the right edge, added checkpoint-to-quiz mobile spacing and added dark-mode route action button states.
   Testing: compiled `styles/main.scss` and `styles/main-dark.scss` successfully.
   Notes: no new dependency or app-facing behavior was added.

6. Diagnosis: final validation needed to cover local render, manifest, Sass, JS, module scripts, deployed-site QA and whitespace.
   Implementation: ran the available validation set and updated records.
   Testing: `Rscript scripts/validate_site_manifest.R`, Sass compilation, `node --check` for quiz and teacher-mode JS, `quarto render` with vendored Quarto, `Rscript scripts/prepublish_site_check.R`, `Rscript scripts/validate_deployed_site.R` and `git diff --check` all passed.
   Notes: `prepublish_site_check.R` reports "Quarto render skipped" because `quarto` is not on `PATH`; the full render was run separately with the vendored Quarto binary.

### Files changed

- `index.qmd`
- `modules/index.qmd`
- `modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `modules/modulo02-bases-da-genetica-quantitativa.qmd`
- `modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
- `modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd`
- `modules/modulo05-herdabilidade-e-repetibilidade.qmd`
- `modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `modules/modulo07-modelos-lineares-e-modelos-mistos.qmd`
- `modules/modulo08-blup-e-avaliacao-genetica.qmd`
- `modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd`
- `modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd`
- `modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- `modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Homepage final CTA now offers a clearer next choice: start Module 01 or plan by week.
- Module index route band now supports review/planning instead of competing with the main start action.
- Pre-quiz checkpoints now explicitly bridge interpretation into the quiz across all 12 module pages.
- Light and dark route-band buttons have quieter, more consistent states.
- Mobile hero learning-path connectors are less centered over stacked content.

### Problems fixed

- Reduced CTA duplication between homepage hero/mid-page/final sections.
- Removed source-oriented `.qmd` route-band hrefs from `modules/index.qmd`.
- Improved transition spacing between checkpoint and quiz.
- Preserved dark-mode parity for the newly softened route-band actions.

### Commands executed

- `git status --short --branch`
- `command -v quarto`
- `'/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin/quarto' --version`
- `HOME=/private/tmp/quarto-home '/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin/quarto' render`
- `HOME=/private/tmp/quarto-home '/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin/quarto' preview --no-browser --port 4876`
- `curl -L http://localhost:4876/`
- `curl -L http://localhost:4876/modules/`
- `curl -L http://localhost:4876/modules/modulo01-introducao-ao-melhoramento-animal.html`
- `curl -L http://localhost:4876/modules/modulo08-blup-e-avaliacao-genetica.html`
- `curl -L http://localhost:4876/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `node --check assets/js/quiz.js`
- `node --check assets/js/teacher-mode.js`
- `Rscript scripts/validate_site_manifest.R`
- `Rscript scripts/prepublish_site_check.R`
- `Rscript scripts/validate_deployed_site.R`
- `git diff --check`

### Test results

- Vendored Quarto render passed.
- Local preview started at `http://localhost:4876/` after sandbox escalation; it later emitted a Sass-cache `BadResource` error during preview requests, so final verification relied on the successful full static render and generated HTML checks.
- No rendered `.qmd` hrefs were found in the generated HTML checked.
- Sass compilation passed for light and dark themes.
- JS syntax checks passed for changed interaction scripts.
- Site manifest validation passed.
- `Rscript scripts/prepublish_site_check.R` passed, with Quarto render skipped inside that script because `quarto` is not on `PATH`.
- `Rscript scripts/validate_deployed_site.R` passed.
- `git diff --check` passed.

### Pending items

- Run a browser screenshot/devtools QA pass in a normal local browser session with viewport screenshots for homepage, module index and representative module pages in light and dark mode.
- If Quarto preview repeats the Sass-cache `BadResource` issue, restart it with a clean temporary `HOME` and rerender before visual judgement.
- Consider putting the vendored Quarto binary on `PATH` for future blocks so `prepublish_site_check.R` can run its own Quarto render step.

---

## 2026-05-05

### Block objective

Create the site organization files needed to continue large site-evolution blocks without restarting planning from zero.

### Cycles executed

1. Diagnosis: confirmed the repository has a Quarto public site in the root with `.qmd` pages, `modules/`, `semanas/`, styles and content manifest.
   Implementation: created/updated root planning files only.
   Testing: reviewed file list and git status.
   Notes: no site page, style, script or app file was changed in this organization block.

### Files changed

- `AGENTS.md`
- `ROADMAP_SITE.md`
- `BACKLOG_SITE.md`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added site/app separation rules.
- Added roadmap, backlog, worklog and next-block structure for future site work.

### Problems fixed

- Reduced ambiguity for future large site-evolution requests.

### Commands executed

- `rg --files -g 'AGENTS.md' -g 'ROADMAP_SITE.md' -g 'BACKLOG_SITE.md' -g 'WORKLOG_SITE.md' -g 'NEXT_SITE.md' -g '_quarto.yml' -g '*.qmd'`
- `git status --short --branch`
- `sed -n '1,220p' AGENTS.md`

### Test results

- Repository structure was inspected.
- No build was run because this block only changes Markdown planning files.

### Pending items

- Execute the next site-evolution block defined in `NEXT_SITE.md`.

---

## 2026-05-05 — Site consolidation block

### Block objective

Continue the public-site evolution from `NEXT_SITE.md`, focusing on module consistency, homepage/module-index alignment, responsive behavior, accessibility and future app-manageable content structure.

### Cycles executed

1. Diagnosis: module pages had consistent headers/objectives/quizzes, but the bottom navigation did not consistently return to the module index.
   Implementation: added an "Índice / Todos os módulos" navigation card to all 12 module pages and converted module navigation layout to a responsive grid.
   Testing: confirmed one `module-nav-index` per module and compiled `styles/main.scss`.
   Notes: no app files were changed.

2. Diagnosis: homepage duplicated the complete 12-module catalog that also exists in `modules/index.qmd`.
   Implementation: replaced the homepage module catalog with a four-phase learning preview and moved the full catalog responsibility to the module index.
   Testing: compiled light and dark SCSS and checked that module cards remain on the module index.
   Notes: homepage now acts more like a public narrative entry point.

3. Diagnosis: tablet and mobile grid behavior needed a stronger intermediate state, especially for cards and module navigation.
   Implementation: added tablet two-column behavior, mobile card height normalization and safer table overflow handling.
   Testing: compiled `styles/main.scss`.
   Notes: layout changes were limited to public-site CSS.

4. Diagnosis: quiz buttons exposed limited interaction state to assistive technologies.
   Implementation: added ARIA group labels, `aria-pressed`, `aria-live` result reporting, submit description linkage and a title for the teacher-mode toggle.
   Testing: ran `node --check` for `quiz.js` and `teacher-mode.js`.
   Notes: behavior remains dependency-free and site-only.

5. Diagnosis: `data/site-manifest.yml` lacked publication status, item type, editable regions and previous/next relationships for future app management.
   Implementation: expanded content page and module metadata with status, publication target, editable regions and module sequence relationships.
   Testing: YAML validation is part of the final validation set.
   Notes: this prepares future app management without changing the app.

### Files changed

- `index.qmd`
- `modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `modules/modulo02-bases-da-genetica-quantitativa.qmd`
- `modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
- `modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd`
- `modules/modulo05-herdabilidade-e-repetibilidade.qmd`
- `modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `modules/modulo07-modelos-lineares-e-modelos-mistos.qmd`
- `modules/modulo08-blup-e-avaliacao-genetica.qmd`
- `modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd`
- `modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd`
- `modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- `modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `styles/main.scss`
- `styles/main-dark.scss`
- `assets/js/quiz.js`
- `assets/js/teacher-mode.js`
- `data/site-manifest.yml`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Module pages now have a consistent return path to the module index.
- Homepage is less duplicated and more narrative.
- Tablet/mobile layout behavior is more deliberate.
- Quiz interactions expose clearer accessibility state.
- Manifest is more useful as a future app-management contract.

### Problems fixed

- Homepage was carrying too much catalog responsibility.
- Module bottom navigation lacked a collection-level return action.
- Quiz selected/correct/incorrect states were visually clear but not well represented semantically.
- Manifest did not yet describe publication status or sequence relationships.

### Commands executed

- `rg` audits for module headers, navigation and quizzes.
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible()'`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `node --check assets/js/quiz.js`
- `node --check assets/js/teacher-mode.js`

### Test results

- SCSS compilation passed during cycles.
- JS syntax checks passed for changed JS files.
- Final validation should run YAML, SCSS, JS and R checks before publishing.

### Pending items

- Consolidate SCSS sections into a cleaner design-system organization.
- Reduce hardcoded duplication between `modules/index.qmd` and `data/site-manifest.yml`.
- Add a lightweight manifest/link validation script in a future block.

---

## 2026-05-05 — Site structural cleanup block

### Block objective

Continue from `NEXT_SITE.md` by improving public-site maintainability: consolidate low-risk SCSS patterns, align manifest metadata with public content, and add lightweight validation for module sequence and site metadata.

### Cycles executed

1. Diagnosis: public card, panel and CTA rules were repeated across late SCSS sections.
   Implementation: added a final public component layer in `styles/main.scss` to centralize common card/panel/CTA behavior without removing older rules.
   Testing: compiled `styles/main.scss`.
   Notes: the cleanup was intentionally low-risk and additive.

2. Diagnosis: shared cards had inconsistent hover/focus polish and CTA wrapping behavior.
   Implementation: harmonized hover, focus-within, outline offset and mobile CTA stacking for public cards in light and dark themes.
   Testing: compiled both light and dark SCSS.
   Notes: no visual direction change, only consistency and maintainability.

3. Diagnosis: the manifest did not yet describe the homepage phase preview as a collection-backed editorial region.
   Implementation: added `editorial_patterns`, `source_collections` and phase summaries to `data/site-manifest.yml`.
   Testing: parsed the manifest with `yaml::read_yaml`.
   Notes: this makes the current public structure easier to connect to a future internal management app.

4. Diagnosis: there was no simple local validation for manifest links, module sequence, scripts and module quiz/index requirements.
   Implementation: added `scripts/validate_site_manifest.R`.
   Testing: ran the validator, fixed strict numeric comparison and reserved-key access, then reran successfully.
   Notes: validation remains dependency-light and uses existing R/YAML tooling.

5. Diagnosis: the new cleanup needed a regression pass for responsive and accessibility-sensitive selectors.
   Implementation: added the new validation command to `NEXT_SITE.md`; kept responsive/accessibility changes scoped to cards, CTAs and focus states.
   Testing: final validation set includes YAML, SCSS, JS, manifest validation and R module scripts.
   Notes: no app files were changed.

### Files changed

- `styles/main.scss`
- `styles/main-dark.scss`
- `data/site-manifest.yml`
- `scripts/validate_site_manifest.R`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added a public component consolidation layer for cards, panels and CTAs.
- Improved hover and focus consistency across public cards in light and dark themes.
- Expanded manifest metadata for editorial patterns and phase summaries.
- Added a local validation script for site manifest integrity.
- Added the validation script to future recommended commands.

### Problems fixed

- Repeated public-card behavior was scattered across the stylesheet.
- The manifest lacked homepage/phase metadata useful for future app management.
- There was no quick local check for module sequence, scripts, quiz IDs and index links.

### Commands executed

- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); cat("scss ok\n")'`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `Rscript -e 'invisible(yaml::read_yaml("data/site-manifest.yml")); cat("manifest ok\n")'`
- `Rscript scripts/validate_site_manifest.R`

### Test results

- SCSS compilation passed.
- Manifest YAML parsed successfully.
- `scripts/validate_site_manifest.R` passed after script fixes.
- Final validation should run the full command set before delivery.

### Pending items

- Deeper SCSS refactor to remove older duplicate rules rather than only consolidating over them.
- Consider generating module index/homepage data from the manifest in a future block if Quarto/R rendering support is available locally or through CI.
- Add visual screenshot QA for desktop and mobile.

---

## 2026-05-05 — Site QA and publication-readiness block

### Block objective

Continue from `NEXT_SITE.md` with a site-only QA and refinement block: improve public hierarchy, module navigation clarity, accessibility semantics, stylesheet organization and publication-readiness checks without altering the app.

### Cycles executed

1. Diagnosis: the homepage hero CTA implied a full module catalog, while the homepage now presents a phase preview and the complete catalog lives in the module index.
   Implementation: changed the secondary hero CTA to "Ver fases da trilha" and added a short explanatory line under the learning-trail section.
   Testing: compiled `styles/main.scss`.
   Notes: homepage remains a public narrative entry point, not an admin surface.

2. Diagnosis: the module index did not provide a direct return path to the public homepage and did not clearly state that its sequence is manifest-backed.
   Implementation: added a "Voltar ao início" action and a concise panel note connecting the sequence to the site manifest.
   Testing: ran manifest validation and compiled `styles/main.scss`.
   Notes: the module index now works better as the public catalog layer.

3. Diagnosis: grid behavior for public cards was still partly scattered across page-specific CSS rules.
   Implementation: added a low-risk shared grid alignment rule and mobile single-column fallback for module, feature, phase, statement, lab and routine grids in the public component layer.
   Testing: compiled both light and dark SCSS.
   Notes: this prepares later duplicate removal without a risky visual rewrite.

4. Diagnosis: quiz and glossary interactions had small accessibility gaps.
   Implementation: added status semantics to quiz feedback messages and corrected the glossary search label accent.
   Testing: ran JS syntax checks for the changed files.
   Notes: behavior remains dependency-free and public-site only.

5. Diagnosis: the current site state needed a full static validation pass before the next visual QA block.
   Implementation: ran YAML, SCSS, manifest, JS, renv, data-script and diff-whitespace checks.
   Testing: all available checks passed; `quarto render` could not run because Quarto is not available locally.
   Notes: GitHub Actions or another environment with Quarto should be used for full render verification.

6. Diagnosis: the work needed to be recorded and the next block needed a clear continuation plan.
   Implementation: updated `WORKLOG_SITE.md` and prepared a new `NEXT_SITE.md` focused on rendered QA, visual screenshots and safe stylesheet simplification.
   Testing: final documentation/diff checks were scheduled after these updates.
   Notes: no app files were changed.

### Files changed

- `index.qmd`
- `modules/index.qmd`
- `styles/main.scss`
- `assets/js/interactives.js`
- `assets/js/quiz.js`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Clarified the homepage CTA and homepage-to-catalog narrative.
- Improved module-index navigation back to the public homepage.
- Made the module sequence more explicitly tied to the site manifest.
- Centralized additional public grid behavior in the stylesheet component layer.
- Improved accessible status reporting for quiz feedback.
- Corrected the glossary search label text.

### Problems fixed

- Homepage CTA wording was slightly misaligned with the current homepage role.
- Module index lacked a homepage return action.
- Public grid responsive behavior was still too dependent on scattered rules.
- Quiz feedback messages did not consistently expose status semantics.
- Glossary search accessible label had an unaccented Portuguese word.

### Commands executed

- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); cat("scss ok\n")'`
- `Rscript scripts/validate_site_manifest.R`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `node --check assets/js/quiz.js`
- `node --check assets/js/interactives.js`
- `Rscript -e 'invisible(yaml::read_yaml("_quarto.yml")); invisible(yaml::read_yaml("data/site-manifest.yml")); cat("yaml ok\n")'`
- `node --check assets/js/progress.js`
- `node --check assets/js/darkmode.js`
- `node --check assets/js/teacher-mode.js`
- `Rscript -e 'renv::status()'`
- `git diff --check`
- `command -v quarto`
- `Rscript scripts/run_all_modules.R`

### Test results

- YAML parsing passed.
- Light and dark SCSS compilation passed.
- Manifest validation passed.
- JS syntax checks passed for public interaction scripts.
- `renv::status()` reported the project is consistent.
- `git diff --check` passed.
- `scripts/run_all_modules.R` completed successfully.
- `quarto render` was not executed because `quarto` is not installed or not on `PATH` locally.

### Pending items

- Run rendered visual QA with Quarto available, including desktop and mobile screenshots.
- Verify GitHub Pages deployment output after a render/publish cycle.
- Remove older duplicate SCSS rules only after rendered comparisons confirm parity.
- Consider manifest-driven generation for the module index in a future block.

---

## 2026-05-05 — Rendered metadata and accessibility QA block

### Block objective

Continue from `NEXT_SITE.md` with a site-only block focused on rendered-public QA, page metadata, editorial section numbering, public navigation assets, module-index polish, safe SCSS cleanup and accessibility-sensitive interactions.

### Cycles executed

1. Diagnosis: the published homepage rendered global section numbers in editorial headings, producing labels such as "5 Trilha de aprendizado".
   Implementation: disabled section numbering on `index.qmd` only.
   Testing: validated the homepage front matter and compiled `styles/main.scss`.
   Notes: module pages remain numbered for didactic content.

2. Diagnosis: published favicon/PWA links from `head-extras.html` were rewritten to duplicated `/mgenetica/mgenetica/` paths, and Open Graph images on subpages pointed to folder-relative image paths.
   Implementation: changed favicon/PWA extras and Open Graph/Twitter image URLs to absolute GitHub Pages URLs.
   Testing: validated `_quarto.yml` and confirmed the published target assets return HTTP 200.
   Notes: this improves social sharing and browser metadata without changing public copy.

3. Diagnosis: the module index is an editorial landing page and also inherited global section numbering.
   Implementation: disabled section numbering on `modules/index.qmd`.
   Testing: validated module-index front matter and reran the site manifest validator.
   Notes: representative modules 1, 6 and 12 were checked for navigation structure.

4. Diagnosis: an older broad `.hero p` rule duplicated more specific hero-copy and hero-panel paragraph rules.
   Implementation: removed the redundant broad selector from `styles/main.scss`.
   Testing: compiled light and dark SCSS and reviewed the resulting diff.
   Notes: cleanup was intentionally conservative because local Quarto rendering is unavailable.

5. Diagnosis: glossary results could expose stronger live-region semantics and quiz result scrolling should honor reduced-motion preferences.
   Implementation: added `aria-controls`, `role="status"` and `aria-live="polite"` to glossary results, and made quiz result scrolling respect `prefers-reduced-motion`.
   Testing: ran JS syntax checks for changed scripts and reran manifest validation.
   Notes: no dependencies or app changes were introduced.

6. Diagnosis: the block needed a full available validation pass and updated continuation files.
   Implementation: ran YAML, SCSS, manifest, JS, renv, module-script and whitespace checks; updated `WORKLOG_SITE.md` and prepared the next `NEXT_SITE.md`.
   Testing: all available checks passed; `quarto` is still unavailable locally.
   Notes: rendered verification should happen through GitHub Actions or another Quarto-enabled environment.

### Files changed

- `_quarto.yml`
- `assets/html/head-extras.html`
- `assets/js/interactives.js`
- `assets/js/quiz.js`
- `index.qmd`
- `modules/index.qmd`
- `styles/main.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Removed editorial section numbering from the homepage and module index.
- Fixed favicon/PWA metadata targets for GitHub Pages.
- Fixed Open Graph and Twitter image URLs for subpages.
- Reduced one broad, obsolete hero paragraph rule.
- Improved glossary live-region semantics.
- Made quiz result scrolling respect reduced-motion preferences.

### Problems fixed

- Homepage and module-index headings were visually weakened by automatic section numbers.
- Extra favicon links could resolve to duplicated GitHub Pages paths.
- Social preview images on internal pages could point to incorrect nested paths.
- A broad SCSS selector increased the chance of paragraph-style conflicts inside the hero.
- Glossary and quiz interactions had small accessibility polish gaps.

### Commands executed

- `command -v quarto`
- `curl -L https://glebstrauss.github.io/mgenetica/ -o /private/tmp/mgenetica-home.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/index.html -o /private/tmp/mgenetica-modules.html`
- `curl -L https://glebstrauss.github.io/mgenetica/semanas/ -o /private/tmp/mgenetica-semanas.html`
- `curl -I https://glebstrauss.github.io/mgenetica/images/og-card.png`
- `curl -I https://glebstrauss.github.io/mgenetica/images/favicon/site.webmanifest`
- `Rscript -e 'invisible(yaml::read_yaml("_quarto.yml")); invisible(yaml::read_yaml("data/site-manifest.yml")); cat("yaml ok\n")'`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `Rscript scripts/validate_site_manifest.R`
- `node --check assets/js/progress.js`
- `node --check assets/js/darkmode.js`
- `node --check assets/js/interactives.js`
- `node --check assets/js/quiz.js`
- `node --check assets/js/teacher-mode.js`
- `Rscript -e 'renv::status()'`
- `Rscript scripts/run_all_modules.R`
- `git diff --check`

### Test results

- YAML validation passed.
- Light and dark SCSS compilation passed.
- Site manifest validation passed.
- JS syntax checks passed.
- `renv::status()` reported no issues.
- `scripts/run_all_modules.R` completed successfully.
- `git diff --check` passed.
- `quarto render` was not run because `quarto` is not installed or not on `PATH` locally.

### Pending items

- Publish this block and confirm GitHub Actions render output.
- Re-fetch rendered pages after deploy to confirm section numbers and metadata URLs in generated HTML.
- Continue SCSS cleanup only with rendered comparison or GitHub Pages verification.
- Add lightweight rendered-link checks for social images, favicon links and generated internal links.

---

## 2026-05-05 — Published HTML verification block

### Block objective

Publish the latest site-only refinements, verify the generated GitHub Pages output, and add a lightweight deployed-site validator for repeated checks of editorial headings, metadata assets and core public navigation.

### Cycles executed

1. Diagnosis: local Quarto remained unavailable, while the pending changes needed generated HTML verification.
   Implementation: validated the local package, committed the site-only changes and pushed to `main` to trigger the Quarto GitHub Pages workflow.
   Testing: watched the `Render and Publish Quarto Site` workflow until it completed successfully.
   Notes: the workflow rendered Quarto, indexed Pagefind, uploaded the Pages artifact and deployed successfully.

2. Diagnosis: the homepage needed generated-output verification after disabling section numbering.
   Implementation: fetched the published homepage HTML and checked headings, hero logo and primary/secondary CTAs.
   Testing: confirmed no `header-section-number` or `data-number` remained on the homepage and the expected CTAs/logo were present.
   Notes: the published `last-modified` timestamp confirmed the new deploy was live.

3. Diagnosis: the module index and representative module pages needed the same generated-output check.
   Implementation: fetched `modules/index.html`, module 01 and module 12 from GitHub Pages.
   Testing: confirmed the module index no longer had numbered editorial headings; module pages retained module navigation and quiz containers.
   Notes: module 12 still links to the published certificate page as expected.

4. Diagnosis: rendered metadata checks were repetitive and easy to miss manually.
   Implementation: added `scripts/validate_deployed_site.R` to fetch deployed pages and validate heading numbering, duplicated GitHub Pages paths, favicon/PWA URLs, social image URL and core CTAs/navigation.
   Testing: ran the new validator successfully and checked favicon and Open Graph assets with `curl -I`.
   Notes: the script is dependency-light and uses base R plus remote HTML.

5. Diagnosis: glossary, search and quiz behavior needed a deployed spot check after render.
   Implementation: fetched glossary/search pages and inspected generated hooks for conditional script loading, skip link, Pagefind assets, glossary container and quiz container.
   Testing: ran JS syntax checks for public scripts and confirmed Pagefind CSS/JS return HTTP 200.
   Notes: no additional interaction fixes were needed in this cycle.

6. Diagnosis: final validation and continuation planning were required after the deployed QA.
   Implementation: ran the available validation set, updated `WORKLOG_SITE.md` and prepared a new `NEXT_SITE.md`.
   Testing: YAML, SCSS, site manifest, deployed-site validator and diff checks passed.
   Notes: no app files were changed.

### Files changed

- `scripts/validate_deployed_site.R`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Published the previous metadata/accessibility refinements.
- Confirmed the generated homepage and module index no longer show automatic section numbering.
- Confirmed favicon/PWA and social image metadata now resolve to valid GitHub Pages URLs.
- Added a deployed-site validation script for repeated generated HTML checks.
- Verified Pagefind assets, glossary hooks, quiz containers and module navigation in published HTML.

### Problems fixed

- Manual generated-HTML checks now have a repeatable validator.
- The previously pending publication verification is complete.
- The next block now has a stronger starting point for visual QA and publication maintenance.

### Commands executed

- `command -v quarto`
- `Rscript scripts/validate_site_manifest.R`
- `Rscript -e 'invisible(yaml::read_yaml("_quarto.yml")); invisible(yaml::read_yaml("data/site-manifest.yml")); cat("yaml ok\n")'`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `git add NEXT_SITE.md WORKLOG_SITE.md _quarto.yml assets/html/head-extras.html assets/js/interactives.js assets/js/quiz.js index.qmd modules/index.qmd styles/main.scss`
- `git commit -m "Fix rendered site metadata and accessibility"`
- `git push origin main`
- `gh run list --repo Glebstrauss/mgenetica --workflow quarto-publish.yml --limit 1`
- `gh run watch 25385283280 --repo Glebstrauss/mgenetica --exit-status`
- `curl -L https://glebstrauss.github.io/mgenetica/ -o /private/tmp/mgenetica-home-after.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/index.html -o /private/tmp/mgenetica-modules-after.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/modulo01-introducao-ao-melhoramento-animal.html -o /private/tmp/mgenetica-module01-after.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html -o /private/tmp/mgenetica-module12-after.html`
- `curl -L https://glebstrauss.github.io/mgenetica/glossario.html -o /private/tmp/mgenetica-glossario-after.html`
- `curl -L https://glebstrauss.github.io/mgenetica/busca.html -o /private/tmp/mgenetica-busca-after.html`
- `curl -I https://glebstrauss.github.io/mgenetica/images/favicon/favicon.ico`
- `curl -I https://glebstrauss.github.io/mgenetica/images/og-card.png`
- `curl -I https://glebstrauss.github.io/mgenetica/_pagefind/pagefind-ui.js`
- `curl -I https://glebstrauss.github.io/mgenetica/_pagefind/pagefind-ui.css`
- `Rscript scripts/validate_deployed_site.R`
- `node --check assets/js/progress.js`
- `node --check assets/js/darkmode.js`
- `node --check assets/js/interactives.js`
- `node --check assets/js/quiz.js`
- `node --check assets/js/teacher-mode.js`
- `git diff --check`

### Test results

- GitHub Actions Pages workflow completed successfully.
- Published homepage returned HTTP 200 with the new deploy timestamp.
- Published module index returned HTTP 200.
- Deployed-site validator passed.
- YAML, SCSS and manifest validation passed.
- JS syntax checks passed.
- Pagefind CSS/JS, favicon and Open Graph image returned HTTP 200.

### Pending items

- The GitHub Actions workflow reports a Node.js 20 deprecation warning; update workflow actions/runtime in a future site-infrastructure block.
- Continue rendered visual QA with screenshots or browser inspection.
- Extend deployed validation to more internal pages if generated-output regressions recur.

---

## 2026-05-05 — Utility pages and workflow maintenance block

### Block objective

Continue the site-only evolution block from `NEXT_SITE.md`: inspect published public pages, remove section numbering from utility/editorial pages, extend deployed validation, and make a small workflow-only update for the GitHub Actions Node.js 20 deprecation warning.

### Cycles executed

1. Diagnosis: the published homepage and module index were structurally healthy after the previous deploy.
   Implementation: no visual code change was needed for home/module index in this cycle.
   Testing: fetched the published HTML and ran `scripts/validate_deployed_site.R`.
   Notes: logo, CTAs, module cards and no-numbering checks remained valid.

2. Diagnosis: representative module pages needed confirmation after previous stylesheet and navigation changes.
   Implementation: no module-page content change was needed.
   Testing: fetched modules 01, 06 and 12 and verified headers, objectives, callouts, tables/code, navigation and quiz containers.
   Notes: module pages remain numbered because they are didactic content.

3. Diagnosis: Busca, Glossário and Roteiro still inherited global `number-sections`, producing numbered hero headings in generated HTML.
   Implementation: added `number-sections: false` to `busca.qmd` and `glossario.qmd`; added `toc: false` and `number-sections: false` to `semanas/index.qmd`.
   Testing: validated the front matter and ran SCSS/JS checks.
   Notes: this aligns utility pages with the premium editorial treatment already applied to home and module index.

4. Diagnosis: GitHub Actions warned that Node.js 20 actions are deprecated and recommended opting into Node 24.
   Implementation: added workflow-level `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` to `.github/workflows/quarto-publish.yml`.
   Testing: parsed the workflow YAML successfully.
   Notes: this is a minimal workflow-only maintenance change.

5. Diagnosis: deployed validation needed to cover the utility pages where the numbering issue was found.
   Implementation: extended `scripts/validate_deployed_site.R` to validate search, glossary and route pages, including their key hooks.
   Testing: validated script syntax; full deployed validation is expected to pass after publication.
   Notes: no dependency was added.

6. Diagnosis: the block needs publication and post-deploy verification because it changes generated public pages and workflow behavior.
   Implementation: updated `WORKLOG_SITE.md` and prepared the next `NEXT_SITE.md`; final validation and publication are part of the delivery pass.
   Testing: final local and deployed checks are listed below.
   Notes: no app files were changed.

### Files changed

- `.github/workflows/quarto-publish.yml`
- `busca.qmd`
- `glossario.qmd`
- `semanas/index.qmd`
- `scripts/validate_deployed_site.R`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Removed automatic section numbering from utility/editorial pages.
- Kept module pages numbered for learning content.
- Extended deployed validation to search, glossary and route pages.
- Added a minimal workflow-level opt-in to Node 24 for GitHub Actions.

### Problems fixed

- Busca, Glossário and Roteiro rendered numbered hero headings.
- Deployed validation did not yet catch numbering regressions on utility pages.
- The GitHub Pages workflow still followed the Node.js 20 deprecation path.

### Commands executed

- `curl -L https://glebstrauss.github.io/mgenetica/ -o /private/tmp/mgenetica-home-qa.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/index.html -o /private/tmp/mgenetica-modules-qa.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/modulo01-introducao-ao-melhoramento-animal.html -o /private/tmp/mgenetica-mod01-qa.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/modulo06-correlacoes-geneticas-e-fenotipicas.html -o /private/tmp/mgenetica-mod06-qa.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html -o /private/tmp/mgenetica-mod12-qa.html`
- `curl -L https://glebstrauss.github.io/mgenetica/busca.html -o /private/tmp/mgenetica-busca-qa.html`
- `curl -L https://glebstrauss.github.io/mgenetica/glossario.html -o /private/tmp/mgenetica-glossario-qa.html`
- `curl -L https://glebstrauss.github.io/mgenetica/semanas/ -o /private/tmp/mgenetica-semanas-qa.html`
- `Rscript scripts/validate_deployed_site.R`
- `Rscript scripts/validate_site_manifest.R`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); cat("scss ok\n")'`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `node --check assets/js/interactives.js`
- `Rscript -e 'invisible(yaml::read_yaml(".github/workflows/quarto-publish.yml")); cat("workflow yaml ok\n")'`
- `git diff --check`

### Test results

- Published home/module-index validator passed before changes.
- Module representative HTML checks passed.
- Utility-page front matter validation passed.
- SCSS compilation passed.
- JS syntax check passed.
- Site manifest validation passed.
- Workflow YAML parsed successfully.

### Pending items

- Publish this block and confirm the Node 20 warning is gone or reduced.
- Re-run `scripts/validate_deployed_site.R` after deployment, since it now expects utility pages to be unnumbered.
- Continue visual QA with actual screenshots/browser review when browser tooling is available.

---

## 2026-05-05 — Landing hierarchy and module flow block

### Block objective

Continue the site-only evolution from `NEXT_SITE.md`, verify the published site, correct public landing hierarchy, improve module learning flow, and strengthen light/dark visual structure without touching the app.

### Cycles executed

1. Diagnosis: the latest GitHub Pages deploy was already live after the previous block.
   Implementation: no code change was needed in this cycle.
   Testing: confirmed the homepage returned HTTP 200 and the latest `Render and Publish Quarto Site` workflow completed successfully.
   Notes: the Node.js 20 warning remains as an annotation, but the workflow reports the actions are being forced to Node 24.

2. Diagnosis: Busca, Glossário and Roteiro needed post-deploy verification after disabling section numbering.
   Implementation: no code change was needed in this cycle.
   Testing: fetched the three published pages, checked for absence of `header-section-number`/`data-number`, confirmed Pagefind/glossary/learning-map hooks and ran `scripts/validate_deployed_site.R`.
   Notes: deployed utility-page validation passed.

3. Diagnosis: the homepage and module index still rendered Quarto title/breadcrumb/sidebar chrome above or around custom public landing sections.
   Implementation: hid generated title/breadcrumb/sidebar chrome for `.hero` and `.modules-landing` pages; added `sidebar: false` to `modules/index.qmd`.
   Testing: compiled SCSS, validated module-index front matter and ran manifest validation.
   Notes: the custom hero/landing sections now control the first public hierarchy.

4. Diagnosis: module pages had consistent structure, but quizzes appeared after final module navigation.
   Implementation: moved each module quiz container before the final previous/index/next navigation in all 12 module pages.
   Testing: verified quiz line numbers precede navigation line numbers in all modules, ran `node --check assets/js/quiz.js` and ran site manifest validation.
   Notes: the assessment now belongs to the learning flow before the user advances.

5. Diagnosis: browser/screenshot tooling was requested by the next plan, but the in-app browser backend was unavailable; fallback HTML/CSS inspection found a dark-mode structure risk.
   Implementation: updated `_quarto.yml` so the dark theme compiles the shared structural `styles/main.scss` before `styles/main-dark.scss`.
   Testing: parsed `_quarto.yml`, compiled light/dark SCSS files and ran manifest validation.
   Notes: this improves dark-theme parity without duplicating layout rules.

6. Diagnosis: final validation and planning records were required before publishing.
   Implementation: cleaned mechanical EOF whitespace from module files, updated `WORKLOG_SITE.md`, prepared a new `NEXT_SITE.md`, committed and pushed the block.
   Testing: YAML, SCSS, manifest, JS, `renv::status()`, all module scripts and `git diff --check` passed; local `quarto render` was not available because `quarto` is not on `PATH`.
   Notes: the first publication run for this block stalled in `Setup R (stable)` for more than 20 minutes and was canceled; the workflow-level Node 24 force flag was removed in a follow-up infrastructure correction.

### Files changed

- `_quarto.yml`
- `.github/workflows/quarto-publish.yml`
- `modules/index.qmd`
- `modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `modules/modulo02-bases-da-genetica-quantitativa.qmd`
- `modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
- `modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd`
- `modules/modulo05-herdabilidade-e-repetibilidade.qmd`
- `modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `modules/modulo07-modelos-lineares-e-modelos-mistos.qmd`
- `modules/modulo08-blup-e-avaliacao-genetica.qmd`
- `modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd`
- `modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd`
- `modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- `modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `styles/main.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Public landing pages now suppress duplicated generated title/breadcrumb/sidebar chrome.
- Module index is treated as a public landing page, not as an internal module reading page.
- Module quizzes now appear before final navigation across all 12 modules.
- Dark theme now inherits shared structural site CSS before applying dark-specific overrides.
- The workflow no longer forces every JavaScript action onto Node 24 globally because that publication run stalled before setup completed.
- The block records the browser QA limitation and keeps the next block focused on rendered visual inspection.

### Problems fixed

- Homepage and module index had competing Quarto-generated hierarchy above custom hero sections.
- Module index inherited sidebar behavior that made it feel more administrative/internal than public.
- Module quizzes were placed after the navigation decision point.
- Dark-mode compilation risked missing shared layout rules.
- The Node 24 force workaround introduced a publication stability risk and was removed.
- Mechanical trailing blank lines introduced by the module reorder were removed.

### Commands executed

- `git status --short --branch`
- `gh run list --repo Glebstrauss/mgenetica --workflow quarto-publish.yml --limit 3`
- `curl -I https://glebstrauss.github.io/mgenetica/`
- `curl -L https://glebstrauss.github.io/mgenetica/busca.html -o /private/tmp/mgenetica-busca.html`
- `curl -L https://glebstrauss.github.io/mgenetica/glossario.html -o /private/tmp/mgenetica-glossario.html`
- `curl -L https://glebstrauss.github.io/mgenetica/semanas/ -o /private/tmp/mgenetica-semanas.html`
- `Rscript scripts/validate_deployed_site.R`
- `curl -L https://glebstrauss.github.io/mgenetica/ -o /private/tmp/mgenetica-home.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/index.html -o /private/tmp/mgenetica-modules.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/modulo01-introducao-ao-melhoramento-animal.html -o /private/tmp/mgenetica-mod01.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/modulo06-correlacoes-geneticas-e-fenotipicas.html -o /private/tmp/mgenetica-mod06.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html -o /private/tmp/mgenetica-mod12.html`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); cat("scss ok\n")'`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `Rscript scripts/validate_site_manifest.R`
- `node --check assets/js/progress.js`
- `node --check assets/js/darkmode.js`
- `node --check assets/js/interactives.js`
- `node --check assets/js/quiz.js`
- `node --check assets/js/teacher-mode.js`
- `Rscript -e 'renv::status()'`
- `Rscript scripts/run_all_modules.R`
- `git diff --check`
- `git add NEXT_SITE.md WORKLOG_SITE.md _quarto.yml modules/index.qmd modules/modulo*.qmd styles/main.scss`
- `git commit -m "Improve public landing hierarchy and module flow"`
- `git push origin main`
- `gh run watch 25388209942 --repo Glebstrauss/mgenetica --exit-status`
- `gh run view 25388209942 --repo Glebstrauss/mgenetica --json status,conclusion,jobs`
- `gh run cancel 25388209942 --repo Glebstrauss/mgenetica`

### Test results

- Published utility-page validation passed.
- YAML validation passed.
- Light and dark SCSS compilation passed.
- Site manifest validation passed.
- JS syntax checks passed.
- `renv::status()` reported no issues.
- `scripts/run_all_modules.R` completed successfully.
- `git diff --check` passed after trimming trailing blank lines.
- `quarto render` was not run locally because `quarto` is not installed or not on `PATH`.
- In-app browser/screenshot QA was attempted but blocked because no Codex IAB backend was discovered.
- The first post-push GitHub Pages workflow was canceled after stalling for more than 20 minutes in `Setup R (stable)`.

### Pending items

- Publish the follow-up workflow correction and verify rendered homepage/module index after GitHub Actions builds the new output.
- Confirm the module index no longer renders sidebar/breadcrumb/title chrome in generated HTML.
- Confirm dark-mode generated CSS contains shared structural landing rules after the workflow render.
- The Node.js 20 deprecation warning is expected to remain until the workflow actions are upgraded safely without forcing all actions globally.
- Run actual browser/screenshot review when the in-app browser backend is available.
- Continue SCSS consolidation; `styles/main.scss` still contains accumulated late override sections.

---

## 2026-05-05 — Published QA and validation hardening block

### Block objective

Continue from `NEXT_SITE.md` with a site-only QA block focused on the published homepage, module index, representative module pages, light/dark theme structure, browser verification and repeatable validation.

### Cycles executed

1. Diagnosis: the repository was clean and the latest GitHub Pages workflow had already completed successfully.
   Implementation: no site code change was needed in this cycle.
   Testing: checked `git status`, confirmed the latest `Render and Publish Quarto Site` runs were successful and verified that local `quarto` is not available on `PATH`.
   Notes: the block used deployed HTML, R validation and browser QA as the practical verification path.

2. Diagnosis: the homepage and module index still include Quarto-generated title blocks in HTML, so the important question was whether they are hidden from the public visual hierarchy.
   Implementation: no CSS change was needed because the published CSS already hides the title/sidebar chrome for `.hero` and `.modules-landing` pages.
   Testing: fetched the published homepage and module index, checked hero/landing markers and ran `scripts/validate_deployed_site.R`.
   Notes: the generated chrome remains in HTML but is hidden visually by the public layout rules.

3. Diagnosis: representative module pages needed confirmation that quiz flow and final navigation remained correct after the previous reorder.
   Implementation: no module content change was needed.
   Testing: fetched modules 01, 06 and 12, confirmed quiz containers appear before final module navigation, confirmed index/previous/next links and ran `scripts/validate_site_manifest.R`.
   Notes: module 01 correctly starts with index/next, module 06 has previous/index/next, and module 12 points forward to the certificate page.

4. Diagnosis: dark-theme parity depended on the dark theme inheriting shared structural CSS and applying only dark overrides.
   Implementation: no theme file change was needed.
   Testing: inspected `_quarto.yml`, `styles/main.scss` and `styles/main-dark.scss`; compiled light and dark SCSS.
   Notes: dark theme uses `[slate, styles/main.scss, styles/main-dark.scss]`, so shared structural selectors are present before dark overrides.

5. Diagnosis: visual/browser QA should be repeatable instead of relying only on manual inspection.
   Implementation: extended `scripts/validate_deployed_site.R` to fetch generated CSS, check public chrome hide rules, verify 12 module cards and assert quiz-before-navigation ordering.
   Testing: used the in-app browser on the published homepage, module index and module 06; confirmed no console errors/warnings and reran the deployed-site validator after fixing an attribute-order bug in the validator parser.
   Notes: browser QA was available in this block through the Codex in-app browser backend.

6. Diagnosis: the block needed documentation and the next work plan.
   Implementation: updated `WORKLOG_SITE.md` and prepared a new `NEXT_SITE.md`.
   Testing: final validation commands are listed below.
   Notes: no app files were changed.

### Files changed

- `scripts/validate_deployed_site.R`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Published-site validation now checks generated CSS for homepage/module-index chrome suppression rules.
- Published-site validation now verifies that the module index exposes all 12 module cards.
- Published-site validation now catches regressions where module navigation appears before the quiz.
- Browser QA confirmed the public homepage, module index and a representative module render their key structures without console errors.
- The next site block is now focused on reducing duplication between module index and manifest/content structure.

### Problems fixed

- The deployed-site validator could not previously catch missing landing-page chrome suppression in generated CSS.
- The deployed-site validator did not verify the full 12-card module index.
- The deployed-site validator did not enforce quiz-before-navigation ordering.
- The first version of the CSS-link parser assumed a fixed HTML attribute order and was corrected.

### Commands executed

- `sed -n '1,240p' AGENTS.md`
- `sed -n '1,260p' ROADMAP_SITE.md`
- `sed -n '1,320p' BACKLOG_SITE.md`
- `sed -n '1,260p' WORKLOG_SITE.md`
- `sed -n '1,260p' NEXT_SITE.md`
- `git status --short --branch`
- `gh run list --repo Glebstrauss/mgenetica --workflow quarto-publish.yml --limit 3`
- `command -v quarto`
- `curl -L https://glebstrauss.github.io/mgenetica/ -o /private/tmp/mgenetica-home-next.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/index.html -o /private/tmp/mgenetica-modules-next.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/modulo01-introducao-ao-melhoramento-animal.html -o /private/tmp/mgenetica-mod01-next.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/modulo06-correlacoes-geneticas-e-fenotipicas.html -o /private/tmp/mgenetica-mod06-next.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.html -o /private/tmp/mgenetica-mod12-next.html`
- `Rscript scripts/validate_deployed_site.R`
- `Rscript scripts/validate_site_manifest.R`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `Rscript -e 'invisible(yaml::read_yaml("_quarto.yml")); invisible(yaml::read_yaml("data/site-manifest.yml")); invisible(yaml::read_yaml(".github/workflows/quarto-publish.yml")); cat("yaml ok\n")'`
- `node --check assets/js/progress.js`
- `node --check assets/js/darkmode.js`

### Test results

- Latest GitHub Pages workflow was already successful before this block.
- Published homepage returned the expected hero structure.
- Published module index returned 12 module cards and active public navigation.
- Published modules 01, 06 and 12 preserved quiz-before-navigation flow.
- Browser QA found no console errors or warnings on homepage, module index or module 06.
- `scripts/validate_deployed_site.R` passed after validator hardening.
- `scripts/validate_site_manifest.R` passed.
- Light/dark SCSS compilation passed.
- YAML parsing passed, with a non-blocking YAML coercion warning from existing workflow syntax.
- JS syntax checks passed for `progress.js` and `darkmode.js`.

### Pending items

- Run the remaining JS syntax checks and module-script suite before the next publish.
- Reduce hardcoded duplication between `modules/index.qmd` and `data/site-manifest.yml`.
- Consider adding a local generated-output validation step when `quarto` is available in the environment.
- Continue conservative SCSS organization work; avoid visual churn unless QA exposes a concrete issue.

---

## 2026-05-05 — Manifest and module-index alignment block

### Block objective

Continue from `NEXT_SITE.md` by reducing drift risk between the public module index and `data/site-manifest.yml`, while keeping the current public visual output stable and not altering the app.

### Cycles executed

1. Diagnosis: `modules/index.qmd` duplicated module card titles, card summaries and phase summaries that were not fully represented in the manifest.
   Implementation: no edit in this cycle; chose a conservative path of adding canonical metadata and validation instead of dynamic generation.
   Testing: ran `scripts/validate_site_manifest.R`.
   Notes: local changes from the previous block were preserved and worked with.

2. Diagnosis: the manifest lacked fields needed to describe the module index as a future app-manageable collection.
   Implementation: added ordered phase metadata, `index_summary`, `phase_id`, `card_title` and `card_summary` fields to `data/site-manifest.yml`.
   Testing: ran `scripts/validate_site_manifest.R`.
   Notes: public copy stayed short and matched the current module index.

3. Diagnosis: the index still remains hand-authored, so drift must be caught automatically.
   Implementation: extended `scripts/validate_site_manifest.R` to compare phase labels/summaries, module card order, card titles, card summaries and phase membership against `modules/index.qmd`.
   Testing: ran `scripts/validate_site_manifest.R`.
   Notes: this guards the current structure without requiring Quarto-time generation.

4. Diagnosis: the metadata and validation changes should not affect the already-published public site.
   Implementation: no visual change was needed.
   Testing: fetched the published homepage, module index and module 06; ran `scripts/validate_deployed_site.R`.
   Notes: published hero, module landing, 12 cards, 4 phase cards, quiz and navigation markers remained intact.

5. Diagnosis: module-index responsiveness/accessibility needed browser confirmation before making any CSS change.
   Implementation: no CSS change was made because QA found no regression.
   Testing: browser QA confirmed landing visibility, hidden title block, 12 module cards, 4 phase cards, unique CTAs, active nav and no console errors/warnings.
   Notes: this block avoided visual churn.

6. Diagnosis: the block needed final validation and planning records.
   Implementation: updated `WORKLOG_SITE.md` and prepared a new `NEXT_SITE.md`.
   Testing: full validation set below.
   Notes: no app files were changed.

### Files changed

- `data/site-manifest.yml`
- `scripts/validate_site_manifest.R`
- `scripts/validate_deployed_site.R`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added app-manageable card metadata for all 12 modules.
- Added ordered phase metadata and module-index summaries to the manifest.
- Added `phase_id` to each module and validation against phase membership.
- Strengthened manifest validation to catch drift between `modules/index.qmd` and the manifest.
- Preserved the current hand-authored module index while creating a clearer path toward future app-managed content.

### Problems fixed

- Module card titles and summaries were maintained only in the index page.
- Phase labels/summaries in the index could drift from the manifest.
- Module phase membership had no explicit machine-readable `phase_id`.
- The validator did not previously protect the public module index from metadata drift.

### Commands executed

- `sed -n '1,240p' AGENTS.md`
- `sed -n '1,240p' ROADMAP_SITE.md`
- `sed -n '1,320p' BACKLOG_SITE.md`
- `tail -n 220 WORKLOG_SITE.md`
- `sed -n '1,260p' NEXT_SITE.md`
- `sed -n '1,320p' data/site-manifest.yml`
- `sed -n '1,240p' modules/index.qmd`
- `git status --short --branch`
- `Rscript scripts/validate_site_manifest.R`
- `curl -L https://glebstrauss.github.io/mgenetica/ -o /private/tmp/mgenetica-home-manifest-block.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/index.html -o /private/tmp/mgenetica-modules-manifest-block.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/modulo06-correlacoes-geneticas-e-fenotipicas.html -o /private/tmp/mgenetica-mod06-manifest-block.html`
- `Rscript scripts/validate_deployed_site.R`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `Rscript -e 'invisible(yaml::read_yaml("_quarto.yml")); invisible(yaml::read_yaml("data/site-manifest.yml")); invisible(yaml::read_yaml(".github/workflows/quarto-publish.yml")); cat("yaml ok\n")'`
- `node --check assets/js/progress.js`
- `node --check assets/js/darkmode.js`
- `node --check assets/js/interactives.js`
- `node --check assets/js/quiz.js`
- `node --check assets/js/teacher-mode.js`
- `Rscript scripts/run_all_modules.R`
- `git diff --check`
- `command -v quarto`

### Test results

- `scripts/validate_site_manifest.R` passed with the new index/manifest drift checks.
- `scripts/validate_deployed_site.R` passed.
- Light/dark SCSS compilation passed.
- YAML parsing passed, with the existing non-blocking YAML coercion warning from workflow syntax.
- JS syntax checks passed.
- `scripts/run_all_modules.R` completed successfully.
- `git diff --check` passed.
- `quarto render` was not run locally because `quarto` is still not available on `PATH`.
- Browser QA found no console errors/warnings on the published module index.

### Pending items

- Commit/publish these local site-only changes when ready.
- Consider a future generated or partially generated module index once local/CI Quarto constraints are comfortable.
- Add documentation for public content governance and manifest fields.
- Continue SCSS consolidation only where it reduces maintenance risk without visual churn.

---

## 2026-05-05 — Public content governance block

### Block objective

Continue from `NEXT_SITE.md` by documenting and stabilizing the public-site governance model so future app management can consume the manifest without changing the public site into an admin interface.

### Cycles executed

1. Diagnosis: the manifest had useful metadata, but the ownership boundary between manifest fields, `.qmd` content, styles and future app editing was still mostly implicit.
   Implementation: audited `data/site-manifest.yml`, `ROADMAP_SITE.md`, `BACKLOG_SITE.md`, `WORKLOG_SITE.md` and `NEXT_SITE.md`.
   Testing: ran `scripts/validate_site_manifest.R`.
   Notes: continued working with the existing local site-only changes.

2. Diagnosis: the manifest needed a first-class governance contract.
   Implementation: added a `governance` section to `data/site-manifest.yml` with canonical sources, future app-editable areas, non-app-managed areas and allowed statuses.
   Testing: ran `scripts/validate_site_manifest.R`.
   Notes: no public visual output changed.

3. Diagnosis: the governance rules needed to be visible outside the YAML file.
   Implementation: added a `Content Governance` section to `ROADMAP_SITE.md`.
   Testing: searched the roadmap to confirm the new section and field references.
   Notes: documentation clarifies that `.qmd` files remain canonical for longform teaching content.

4. Diagnosis: validation did not yet enforce status values, page roles, registered navigation targets or governance canonical-source fields.
   Implementation: extended `scripts/validate_site_manifest.R` with required scalar checks, allowed statuses, page role validation, registered navigation validation and governance-source validation.
   Testing: ran `scripts/validate_site_manifest.R`.
   Notes: the validator now catches another class of metadata drift before publishing.

5. Diagnosis: governance changes should not affect the public site, but the in-app browser was available and already on the module index.
   Implementation: no CSS or content change was needed.
   Testing: browser QA confirmed module index and homepage render correctly, title blocks are hidden, module cards/fases are present and console issues are empty; downloaded module index and module 06; ran `scripts/validate_deployed_site.R`.
   Notes: this cycle made no app changes.

6. Diagnosis: final validation and planning records were required.
   Implementation: updated `WORKLOG_SITE.md` and prepared the next `NEXT_SITE.md`.
   Testing: full validation set below.
   Notes: `quarto render` remains unavailable locally.

### Files changed

- `data/site-manifest.yml`
- `ROADMAP_SITE.md`
- `scripts/validate_site_manifest.R`
- `scripts/validate_deployed_site.R`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added a manifest-level governance contract for canonical content sources.
- Documented which public-site fields the app may manage later.
- Documented what must remain outside automatic app management.
- Added allowed publication statuses to the manifest.
- Strengthened validation for page roles, statuses, navigation targets, required module fields and governance canonical sources.

### Problems fixed

- Manifest ownership boundaries were implicit.
- Page roles and statuses could drift without validation.
- Navigation could point to unregistered pages without validation.
- Future app-management scope was not clearly separated from `.qmd` longform content, scripts and visual tokens.

### Commands executed

- `sed -n '1,240p' AGENTS.md`
- `sed -n '1,240p' ROADMAP_SITE.md`
- `sed -n '1,320p' BACKLOG_SITE.md`
- `tail -n 260 WORKLOG_SITE.md`
- `sed -n '1,260p' NEXT_SITE.md`
- `sed -n '1,340p' data/site-manifest.yml`
- `sed -n '1,220p' scripts/validate_site_manifest.R`
- `rg -n "govern|manifest|canonical|app|editable|source_collection|content" ROADMAP_SITE.md BACKLOG_SITE.md WORKLOG_SITE.md NEXT_SITE.md data/site-manifest.yml`
- `Rscript scripts/validate_site_manifest.R`
- `rg -n "Content Governance|data/site-manifest|canonical|Future app" ROADMAP_SITE.md`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/index.html -o /private/tmp/mgenetica-modules-governance.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/modulo06-correlacoes-geneticas-e-fenotipicas.html -o /private/tmp/mgenetica-mod06-governance.html`
- `Rscript scripts/validate_deployed_site.R`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `Rscript -e 'invisible(yaml::read_yaml("_quarto.yml")); invisible(yaml::read_yaml("data/site-manifest.yml")); invisible(yaml::read_yaml(".github/workflows/quarto-publish.yml")); cat("yaml ok\n")'`
- `node --check assets/js/progress.js`
- `node --check assets/js/darkmode.js`
- `node --check assets/js/interactives.js`
- `node --check assets/js/quiz.js`
- `node --check assets/js/teacher-mode.js`
- `Rscript scripts/run_all_modules.R`
- `git diff --check`
- `command -v quarto`

### Test results

- `scripts/validate_site_manifest.R` passed with the new governance checks.
- `scripts/validate_deployed_site.R` passed.
- Light/dark SCSS compilation passed.
- YAML parsing passed, with the existing non-blocking YAML coercion warning from workflow syntax.
- JS syntax checks passed.
- `scripts/run_all_modules.R` completed successfully.
- `git diff --check` passed.
- Browser QA found no console errors/warnings on the published homepage and module index.
- `quarto render` was not run locally because `quarto` is still not available on `PATH`.

### Pending items

- Commit/publish the accumulated site-only changes when ready.
- Before publishing, run `Rscript scripts/prepublish_site_check.R`; if publication happens only after several work blocks, run it after the final block and again after any publication-fix change.
- Consider generated or partially generated module index once Quarto execution is available locally or safely handled in CI.
- Continue SCSS consolidation in a future block, limited to maintenance-risk reduction.
- Consider adding governance checks for duplicate navigation ids and duplicate page ids.

---

## 2026-05-05 — Validation hardening and SCSS risk audit block

### Block objective

Continue from `NEXT_SITE.md` by adding low-risk manifest validation coverage, auditing SCSS duplication without visual churn, and running the prepublication check before any publish step.

### Cycles executed

1. Diagnosis: the manifest validator already checked statuses, roles, registered navigation and module/index drift, but not duplicate page ids, duplicate hrefs or duplicate navigation entries within each region.
   Implementation: audited `scripts/validate_site_manifest.R` and `data/site-manifest.yml`; no edit in this cycle.
   Testing: ran `scripts/validate_site_manifest.R`.
   Notes: continued working with accumulated local site-only changes.

2. Diagnosis: duplicate page/module/navigation metadata could still slip through.
   Implementation: added a reusable `check_unique()` helper and validation for duplicate page ids, page hrefs, primary/footer nav ids, primary/footer nav hrefs, module hrefs and module scripts; also required page titles and primary navigation types.
   Testing: ran `scripts/validate_site_manifest.R`; adjusted the first duplicate check to allow intentional header/footer link repetition while still validating each region separately.
   Notes: validation now catches another class of publication-risk drift.

3. Diagnosis: late sections of `styles/main.scss` contain real duplication, but many rules are accumulated visual overrides with page-specific behavior.
   Implementation: no SCSS change was made because no clearly safe visual-neutral consolidation was found in this block.
   Testing: compiled `styles/main.scss` and `styles/main-dark.scss`.
   Notes: the safer choice was to avoid visual churn without a confirmed regression.

4. Diagnosis: public QA was still needed even though this block mainly changed validation logic.
   Implementation: browser tooling was unavailable in this turn, so used the documented fallback.
   Testing: downloaded the published homepage, module index and module 06; checked key markers and ran `scripts/validate_deployed_site.R`.
   Notes: published HTML retains expected hero, modules landing, 12 module cards, 4 phase cards, quiz and module navigation markers.

5. Diagnosis: the user specifically asked for a verification step before publication to avoid another site-publish error.
   Implementation: used the new `scripts/prepublish_site_check.R` command as the single prepublication gate.
   Testing: ran manifest, deployed-site, YAML, SCSS, JS checks and `Rscript scripts/prepublish_site_check.R`.
   Notes: `prepublish_site_check` passed and skipped only local `quarto render` because `quarto` is not available on `PATH`.

6. Diagnosis: worklog and next-plan updates were required.
   Implementation: updated `WORKLOG_SITE.md` and prepared a new `NEXT_SITE.md`.
   Testing: final checks are listed below.
   Notes: no app files were changed.

### Files changed

- `scripts/validate_site_manifest.R`
- `AGENTS.md`
- `ROADMAP_SITE.md`
- `data/site-manifest.yml`
- `scripts/validate_deployed_site.R`
- `scripts/prepublish_site_check.R`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added duplicate validation for page ids, page hrefs, module hrefs and module scripts.
- Added duplicate validation inside primary and footer navigation regions.
- Added required page-title and primary-navigation-type checks.
- Confirmed the new prepublication command passes after the accumulated site-only changes.
- Documented that SCSS consolidation should remain evidence-backed because existing late overrides are visually sensitive.

### Problems fixed

- Duplicate page/navigation/module metadata could pass validation.
- Primary navigation entries could miss `type` without being caught.
- Publication readiness depended on manually remembering multiple commands instead of one prepublish gate.

### Commands executed

- `sed -n '1,220p' AGENTS.md`
- `sed -n '1,220p' ROADMAP_SITE.md`
- `sed -n '1,260p' BACKLOG_SITE.md`
- `tail -n 220 WORKLOG_SITE.md`
- `sed -n '1,240p' NEXT_SITE.md`
- `sed -n '1,240p' scripts/validate_site_manifest.R`
- `sed -n '1,340p' data/site-manifest.yml`
- `Rscript scripts/validate_site_manifest.R`
- `sed -n '2520,2925p' styles/main.scss`
- `sed -n '3200,3865p' styles/main.scss`
- `sed -n '220,480p' styles/main-dark.scss`
- `rg -n "section-cta|hero-actions|modules-landing-actions|final-cta-actions|profile-actions|module-card|phase-card|focus-within|transition" styles/main.scss styles/main-dark.scss`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `curl -L https://glebstrauss.github.io/mgenetica/ -o /private/tmp/mgenetica-home-hardening.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/index.html -o /private/tmp/mgenetica-modules-hardening.html`
- `curl -L https://glebstrauss.github.io/mgenetica/modules/modulo06-correlacoes-geneticas-e-fenotipicas.html -o /private/tmp/mgenetica-mod06-hardening.html`
- `Rscript scripts/validate_deployed_site.R`
- `Rscript -e 'invisible(yaml::read_yaml("_quarto.yml")); invisible(yaml::read_yaml("data/site-manifest.yml")); invisible(yaml::read_yaml(".github/workflows/quarto-publish.yml")); cat("yaml ok\n")'`
- `node --check assets/js/progress.js`
- `node --check assets/js/darkmode.js`
- `node --check assets/js/interactives.js`
- `node --check assets/js/quiz.js`
- `node --check assets/js/teacher-mode.js`
- `git diff --check`
- `command -v quarto`
- `Rscript scripts/prepublish_site_check.R`

### Test results

- `scripts/validate_site_manifest.R` passed with duplicate/id checks.
- `scripts/validate_deployed_site.R` passed.
- Light/dark SCSS compilation passed.
- YAML parsing passed, with the existing non-blocking YAML coercion warning from workflow syntax.
- JS syntax checks passed.
- `scripts/prepublish_site_check.R` passed.
- `git diff --check` passed.
- Browser automation was unavailable in this turn, so published HTML checks were used as fallback.
- `quarto render` was not run locally because `quarto` is still not available on `PATH`.

### Pending items

- Commit/publish the accumulated site-only changes when ready, after rerunning `Rscript scripts/prepublish_site_check.R`.
- Consider a Quarto-enabled local or CI preview step so rendered output can be checked before GitHub Pages deploy.
- Continue SCSS consolidation only with screenshot/browser evidence.
- Consider adding a small CI workflow step that runs `scripts/prepublish_site_check.R` before Pages deployment.

---

## 2026-05-05 — CI prepublication gate block

### Block objective

Execute the publication-safety block from `NEXT_SITE.md` by integrating the local prepublication validation into the GitHub Pages workflow without changing the app.

### Cycles executed

1. Diagnosis: `NEXT_SITE.md` still identified publication safety as the next site-only block, and the Pages workflow rendered/deployed without running the new prepublication script.
   Implementation: inspected `.github/workflows/quarto-publish.yml` and `scripts/prepublish_site_check.R`.
   Testing: reviewed the workflow structure and current clean git state.
   Notes: no app files were touched.

2. Diagnosis: running the full prepublish script inside CI after Quarto setup would duplicate the Quarto render before the existing render action.
   Implementation: added `SKIP_QUARTO_RENDER=1` support to `scripts/prepublish_site_check.R`.
   Testing: included the script in the local prepublish run.
   Notes: local behavior remains unchanged unless the environment variable is set.

3. Diagnosis: the Pages workflow needed a validation gate before render, Pagefind, artifact upload and deploy.
   Implementation: added a `Prepublish site validation` step after Node setup and before `Render Quarto site`.
   Testing: parsed `.github/workflows/quarto-publish.yml` with `yaml::read_yaml`.
   Notes: the workflow keeps Node 24 and the existing Quarto render action.

4. Diagnosis: the validation gate must still pass locally before continuing to later site work.
   Implementation: no additional edit was needed.
   Testing: ran `Rscript scripts/prepublish_site_check.R`.
   Notes: Quarto render remains skipped locally because `quarto` is not on `PATH`.

5. Diagnosis: the next site block should move beyond publication safety now that the gate exists.
   Implementation: prepared the next `NEXT_SITE.md` toward homepage and public navigation polish.
   Testing: checked the diff for workflow/script scope.
   Notes: this block intentionally did not publish yet, because the user requested three work rounds in sequence.

### Files changed

- `.github/workflows/quarto-publish.yml`
- `scripts/prepublish_site_check.R`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added a CI prepublication gate before the Pages render/deploy path.
- Added an environment-controlled way to skip duplicate Quarto render inside the prepublish script.
- Preserved the existing GitHub Pages render, Pagefind and deploy flow.

### Problems fixed

- The workflow could deploy without running the same validation gate used locally.
- The prepublish script had no CI-friendly way to avoid duplicate renders.

### Commands executed

- `sed -n '1,240p' .github/workflows/quarto-publish.yml`
- `sed -n '1,220p' scripts/prepublish_site_check.R`
- `Rscript scripts/prepublish_site_check.R`
- `Rscript -e 'invisible(yaml::read_yaml(".github/workflows/quarto-publish.yml")); cat("workflow yaml ok\n")'`
- `git diff -- .github/workflows/quarto-publish.yml scripts/prepublish_site_check.R`

### Test results

- `scripts/prepublish_site_check.R` passed.
- Workflow YAML parsed, with the existing non-blocking YAML coercion warning from GitHub workflow syntax.
- The diff remained site-publication scoped.

### Pending items

- Run the next site-only block focused on homepage, navigation and editorial clarity.
- Run the full prepublish check again after all requested rounds are complete.

---

## 2026-05-05 — Homepage and public navigation clarity block

### Block objective

Execute the next site-only block by improving homepage entry clarity, public navigation flow, module-index guidance and manifest alignment without changing the app.

### Cycles executed

1. Diagnosis: the homepage had a strong visual system but the first decision after the hero was not explicit enough for different visitor intents.
   Implementation: replaced the secondary hero anchor with a direct module-index CTA and added a three-path `home-entry` section for starting now, understanding the trail or planning study.
   Testing: compiled light and dark SCSS.
   Notes: content remained short and visitor-facing.

2. Diagnosis: homepage CTAs and the module index needed a clearer bridge between public narrative and the full module collection.
   Implementation: added `modules-guidance` to the module index with recommended flow, editorial management context and progression notes.
   Testing: compiled SCSS and reviewed the changed module-index markup.
   Notes: the new guidance reinforces future app management without turning the page into an admin surface.

3. Diagnosis: the footer omitted the search route even though search is a public utility in the main nav.
   Implementation: added Busca to the footer and aligned `data/site-manifest.yml`.
   Testing: ran `scripts/validate_site_manifest.R` and YAML parsing.
   Notes: fixed an intermediate manifest duplication during implementation before validation.

4. Diagnosis: new entry/guidance cards needed responsive, focus and dark-mode support.
   Implementation: added light and dark SCSS for `.entry-card`, `.guidance-item`, `.entry-grid` and `.modules-guidance`, including mobile one-column behavior and card focus inclusion in the public component layer.
   Testing: compiled `styles/main.scss` and `styles/main-dark.scss`.
   Notes: styling follows the existing logo-derived geometric strip motif.

5. Diagnosis: the next block should move from public landing surfaces to internal module pages and editorial consistency.
   Implementation: prepared the next `NEXT_SITE.md`.
   Testing: checked the diff stat and validation outputs.
   Notes: no app files were changed.

### Files changed

- `index.qmd`
- `modules/index.qmd`
- `_quarto.yml`
- `data/site-manifest.yml`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added a clearer homepage entry system for three visitor intents.
- Strengthened the route from homepage to module index and study route.
- Added editorial guidance to the module index.
- Added Busca to the public footer.
- Added responsive and dark-theme styling for the new public components.

### Problems fixed

- Homepage CTAs were less decisive than the learning journey required.
- Module index lacked a compact editorial bridge explaining how to use the collection.
- Footer navigation did not expose search.

### Commands executed

- `rg -n "hero|home-|section-cta|final-cta|modules-landing|phase-preview|navbar|page-footer|btn" styles/main.scss styles/main-dark.scss`
- `Rscript scripts/validate_site_manifest.R`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `Rscript -e 'invisible(yaml::read_yaml("_quarto.yml")); invisible(yaml::read_yaml("data/site-manifest.yml")); cat("site yaml ok\n")'`
- `git diff --stat`

### Test results

- Manifest validation passed.
- Light/dark SCSS compilation passed.
- Site YAML parsing passed.

### Pending items

- Run the next site-only block on module page hierarchy, reusable module affordances and internal-page validation.
- Run the full prepublish check after the third requested round.

---

## 2026-05-05 — Module orientation and internal consistency block

### Block objective

Execute the third requested site-only round by improving module-page orientation and strengthening validation for that internal-page pattern.

### Cycles executed

1. Diagnosis: representative modules had consistent headers, objectives, quizzes and navigation, but lacked a compact orientation cue between objectives and long-form reading.
   Implementation: inspected modules 01, 06 and 12 plus the existing module selectors and validation script.
   Testing: searched for module header/objective/nav/quiz structure across all modules.
   Notes: no scientific body content was rewritten.

2. Diagnosis: the orientation pattern should be reusable and low-risk across all modules.
   Implementation: added a `module-orientation` block to all 12 module pages with the consistent sequence Leitura, Simulacao em R and Interpretacao.
   Testing: confirmed 12 module-orientation markers.
   Notes: an initial mechanical replacement produced malformed markup; it was immediately corrected before continuing.

3. Diagnosis: the new pattern needed visual treatment that supports scanability without competing with objectives.
   Implementation: added light-theme styling for `.module-orientation` and mobile stacking behavior.
   Testing: compiled `styles/main.scss`.
   Notes: the pills use the existing cyan precision-dot motif.

4. Diagnosis: dark mode needed equivalent contrast and surface treatment.
   Implementation: added dark-theme overrides for module orientation pills.
   Testing: compiled `styles/main-dark.scss`.
   Notes: no new dependency or app coupling was introduced.

5. Diagnosis: future site edits should not accidentally remove the module orientation pattern.
   Implementation: added a `module-orientation` check to `scripts/validate_site_manifest.R` and added `orientation` to the module editable-region contract in `data/site-manifest.yml`.
   Testing: ran `scripts/validate_site_manifest.R`.
   Notes: the manifest now describes this as a future app-manageable editorial region.

### Files changed

- `modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `modules/modulo02-bases-da-genetica-quantitativa.qmd`
- `modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
- `modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd`
- `modules/modulo05-herdabilidade-e-repetibilidade.qmd`
- `modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `modules/modulo07-modelos-lineares-e-modelos-mistos.qmd`
- `modules/modulo08-blup-e-avaliacao-genetica.qmd`
- `modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd`
- `modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd`
- `modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- `modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `styles/main.scss`
- `styles/main-dark.scss`
- `data/site-manifest.yml`
- `scripts/validate_site_manifest.R`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added a consistent orientation affordance to every module page.
- Improved module scanability before long-form content.
- Added responsive and dark-theme support for the new module pattern.
- Strengthened validation so all modules must keep the orientation block.
- Expanded the manifest module editable-region contract.

### Problems fixed

- Module pages jumped from objectives directly into long-form content with no compact study-mode cue.
- Validation did not protect the new reusable module pattern.

### Commands executed

- `sed -n '1,180p' modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `sed -n '1,180p' modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `sed -n '1,180p' modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `rg -n "module-header|module-objectives|module-nav|quiz-container|module-orientation" modules styles/main.scss scripts/validate_site_manifest.R`
- `perl -0pi -e '...' modules/modulo*.qmd`
- `rg -n "module-orientation" modules/modulo*.qmd | wc -l`
- `Rscript scripts/validate_site_manifest.R`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`

### Test results

- Manifest validation passed with the new module-orientation check.
- Light/dark SCSS compilation passed.
- All 12 module files contain the orientation block.

### Pending items

- Publish the accumulated site-only changes if requested.
- Use browser/screenshot QA after the next publication because local `quarto render` is still unavailable.

### Post-round validation

- `Rscript scripts/prepublish_site_check.R` passed after the three requested rounds.
- `git diff --check` passed.
- `quarto render` remains skipped locally because `quarto` is not available on `PATH`; the next recommended block is publication plus GitHub Pages render/deploy QA.

---

## 2026-05-05 — Publish and post-deploy QA block

### Block objective

Execute the publication block from `NEXT_SITE.md`: validate, commit, publish the accumulated site-only changes, and verify the deployed GitHub Pages output.

### Cycles executed

1. Diagnosis: `NEXT_SITE.md` required local prepublish validation before any push.
   Implementation: reran the full prepublication gate.
   Testing: `Rscript scripts/prepublish_site_check.R` passed; `git diff --check` passed.
   Notes: local Quarto render remains unavailable, so the CI render remained the authoritative render check.

2. Diagnosis: the workflow needed to include the new prepublish gate before render/deploy.
   Implementation: confirmed `Prepublish site validation` appears before `Render Quarto site`, and `SKIP_QUARTO_RENDER=1` is wired for CI.
   Testing: parsed workflow YAML.
   Notes: the existing YAML coercion warning is non-blocking for GitHub workflow syntax.

3. Diagnosis: validated site-only changes were ready to publish.
   Implementation: staged the site/publication files, committed `dc4a17c` and pushed to `main`.
   Testing: confirmed the push started GitHub Actions run `25407184313`.
   Notes: no app files were staged or altered.

4. Diagnosis: publication needed workflow-level confirmation.
   Implementation: polled the public GitHub Actions API.
   Testing: run `25407184313` completed successfully; `Prepublish site validation`, Quarto render, Pagefind, artifact upload and Pages deploy all passed.
   Notes: the new CI gate executed successfully in 2 seconds after Node setup.

5. Diagnosis: the deployed-site validator still expected the previous homepage secondary CTA.
   Implementation: updated `scripts/validate_deployed_site.R` to validate the new homepage entry section, module guidance and module orientation pattern.
   Testing: `Rscript scripts/validate_deployed_site.R` passed against the published site.
   Notes: this was a validation contract update; the published site itself was already deployed successfully.

### Files changed

- `scripts/validate_deployed_site.R`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Published the accumulated homepage, module-index, module-page and publication-safety changes.
- Confirmed the CI prepublish gate runs before render/deploy.
- Updated deployed-site validation to match the current public UX contract.

### Problems fixed

- Deployed-site QA was still checking for the old homepage secondary CTA text.
- The validator did not yet check the new homepage entry section, module-index guidance or module orientation pattern.

### Commands executed

- `Rscript scripts/prepublish_site_check.R`
- `Rscript -e 'invisible(yaml::read_yaml(".github/workflows/quarto-publish.yml")); cat("workflow yaml ok\n")'`
- `git diff --check`
- `git add ...`
- `git commit -m "Evolve site flow and publication checks"`
- `git push origin main`
- `curl -s 'https://api.github.com/repos/Glebstrauss/mgenetica/actions/runs?per_page=1'`
- `curl -s https://api.github.com/repos/Glebstrauss/mgenetica/actions/runs/25407184313/jobs`
- `curl -I https://glebstrauss.github.io/mgenetica/`
- `Rscript scripts/validate_deployed_site.R`
- `Rscript scripts/validate_site_manifest.R`

### Test results

- Local prepublish check passed.
- GitHub Pages workflow run `25407184313` passed.
- Published homepage returned `HTTP/2 200` with `last-modified: Tue, 05 May 2026 23:10:18 GMT`.
- Deployed-site validation passed.
- Manifest validation passed.

### Pending items

- Commit/publish the updated deployed-site validation script and this worklog after the remaining requested rounds.
- Continue with the next site-only block on institutional and utility page consistency.

---

## 2026-05-05 — Institutional and utility page consistency block

### Block objective

Continue the site-only evolution by aligning `Sobre`, `Busca`, `Glossário` and `Roteiro` with the more polished homepage/module experience.

### Cycles executed

1. Diagnosis: utility pages used the shared `page-hero` pattern but had limited orientation after the hero; `Sobre` used a separate profile pattern and needed a clearer public/app boundary.
   Implementation: audited `perfil.qmd`, `busca.qmd`, `glossario.qmd`, `semanas/index.qmd` and related SCSS.
   Testing: reviewed existing structural hooks such as `PagefindUI`, `data-glossary` and `data-learning-map`.
   Notes: no app files were touched.

2. Diagnosis: the `Sobre` page needed a concise institutional bridge explaining site/app roles.
   Implementation: added a `public-page-triad` with public layer, modular content and internal management boundaries.
   Testing: included new classes in SCSS compilation.
   Notes: copy stays institutional and visitor-facing.

3. Diagnosis: Search and glossary needed more useful orientation before the functional widgets.
   Implementation: added `utility-flow` cards to `busca.qmd` and `glossario.qmd`.
   Testing: `node --check assets/js/interactives.js` passed.
   Notes: existing Pagefind and glossary hooks were preserved.

4. Diagnosis: The study route page needed a clearer repeatable routine before the progress map.
   Implementation: added `route-checkpoints` for before/during/after study behavior.
   Testing: existing `data-learning-map` hook remained unchanged.
   Notes: no new technical lesson content was invented.

5. Diagnosis: new reusable components needed responsive, dark-mode and future app metadata support.
   Implementation: added SCSS for `public-page-triad`, `utility-flow`, `route-checkpoints` and their cards; added editable-region metadata to `data/site-manifest.yml`.
   Testing: `scripts/validate_site_manifest.R` passed; light/dark SCSS compilation passed.
   Notes: the visual motif uses the existing MGenética geometric strip language.

### Files changed

- `perfil.qmd`
- `busca.qmd`
- `glossario.qmd`
- `semanas/index.qmd`
- `styles/main.scss`
- `styles/main-dark.scss`
- `data/site-manifest.yml`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Improved the public "Sobre" page with clearer site/app separation.
- Added concise utility guidance to search and glossary.
- Added a study checkpoint pattern to the route page.
- Added responsive and dark-mode support for the new cards.
- Declared the new regions in the site manifest for future app management.

### Problems fixed

- Utility pages felt thinner than the homepage/module surfaces.
- The public/internal management boundary was not as visible on the institutional page.
- New route behavior was not represented as an editable content region.

### Commands executed

- `sed -n '1,220p' perfil.qmd`
- `sed -n '1,220p' busca.qmd`
- `sed -n '1,260p' glossario.qmd`
- `sed -n '1,280p' semanas/index.qmd`
- `rg -n "page-hero|search-panel|glossary-panel|routine-grid|profile|data-learning-map|data-glossary|PagefindUI|section-cta" perfil.qmd busca.qmd glossario.qmd semanas/index.qmd styles/main.scss styles/main-dark.scss`
- `Rscript scripts/validate_site_manifest.R`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `node --check assets/js/interactives.js`
- `git diff --stat`

### Test results

- Manifest validation passed.
- Light/dark SCSS compilation passed.
- `assets/js/interactives.js` syntax check passed.

### Pending items

- Add validation coverage for the new institutional/utility page patterns.
- Run the full prepublish check after the next round.

---

## 2026-05-05 — Public pattern validation hardening block

### Block objective

Strengthen validation for the newer public page patterns before the next publication, keeping changes site-only and low-risk.

### Cycles executed

1. Diagnosis: `data/site-manifest.yml` declared editable regions for homepage, route, search, glossary and about, but `scripts/validate_site_manifest.R` only validated module patterns and general page metadata.
   Implementation: inspected manifest, deployed validator and page markers.
   Testing: searched for `public-page-triad`, `utility-flow`, `route-checkpoints`, `module-orientation`, `home-entry` and `modules-guidance`.
   Notes: no app files were touched.

2. Diagnosis: declared editable regions needed a concrete page-marker contract.
   Implementation: added `region_markers` to `scripts/validate_site_manifest.R` for home, study route, search, glossary and about pages.
   Testing: ran `scripts/validate_site_manifest.R`.
   Notes: the validator now fails when a declared region lacks a known marker or the page no longer contains that marker.

3. Diagnosis: the new institutional/utility regions should remain validation-only unless a real visual bug is found.
   Implementation: no additional UI changes were made in this cycle.
   Testing: compiled light and dark SCSS.
   Notes: avoided visual churn after the previous round.

4. Diagnosis: the deployed-site validator already covered the currently published homepage/module changes and should not require unpublished utility-page changes yet.
   Implementation: left `scripts/validate_deployed_site.R` aligned with the published site from run `25407184313`.
   Testing: the full prepublish check does not depend on deployed-site validation.
   Notes: deployed validation should be extended for utility pages after these local changes are published.

5. Diagnosis: final validation was required after three consecutive rounds.
   Implementation: ran the full prepublish gate.
   Testing: `Rscript scripts/prepublish_site_check.R` passed; `git diff --check` passed.
   Notes: local `quarto render` remains skipped because Quarto is not available on `PATH`.

### Files changed

- `scripts/validate_site_manifest.R`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added validation for manifest-declared editable regions on public pages.
- Connected page metadata to actual `.qmd` markers.
- Preserved the deployed validator for the currently published contract.

### Problems fixed

- Editable regions could be declared in the manifest without any corresponding marker in the source page.
- Future app-management metadata could drift from the public page structure without local validation catching it.

### Commands executed

- `sed -n '1,240p' scripts/validate_site_manifest.R`
- `sed -n '1,220p' scripts/validate_deployed_site.R`
- `sed -n '80,150p' data/site-manifest.yml`
- `rg -n "public-page-triad|utility-flow|route-checkpoints|module-orientation|home-entry|modules-guidance|editable_regions" data/site-manifest.yml *.qmd modules/*.qmd semanas/*.qmd scripts/validate_site_manifest.R scripts/validate_deployed_site.R`
- `Rscript scripts/validate_site_manifest.R`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `Rscript scripts/prepublish_site_check.R`
- `git diff --check`
- `git status -sb`

### Test results

- Manifest validation passed with editable-region marker checks.
- Light/dark SCSS compilation passed.
- Full prepublish check passed.
- `git diff --check` passed.

### Pending items

- Commit/publish the remaining local site-only changes from rounds 2 and 3.
- After publication, extend `scripts/validate_deployed_site.R` to assert the rendered utility/institutional page patterns once they are live.

---

## 2026-05-08 — Publication and deployed utility QA block

### Block objective

Publish the remaining local site-only institutional/utility and validation-hardening changes, monitor GitHub Pages, verify the deployed public pages, and update continuation records.

### Cycles executed

1. Diagnosis: `NEXT_SITE.md` called for publication of accumulated site-only changes, and the working tree contained only public-site/documentation files plus an unrelated untracked `.vscode/` directory.
   Implementation: ran the full local prepublish check and reviewed staged scope before committing.
   Testing: `Rscript scripts/prepublish_site_check.R` passed; `git diff --check` passed inside the prepublish gate.
   Notes: no app files were changed or staged.

2. Diagnosis: the remaining local changes needed to be published before deployed QA could be meaningful.
   Implementation: committed and pushed `e07de57` (`Polish utility pages and site validation`) to `main`.
   Testing: GitHub Pages workflow run `25551053309` completed successfully.
   Notes: workflow steps included prepublish validation, Quarto render, Pagefind indexing, artifact upload and deploy.

3. Diagnosis: deployed validation needed to cover homepage, module index, representative module, search, glossary, route and about page.
   Implementation: ran `scripts/validate_deployed_site.R`, fetched the published homepage and inspected the published `perfil.html`.
   Testing: deployed validator passed, but manual inspection found the about page still had automatic section numbering.
   Notes: this was a rendered-output issue not caught by the previous deployed validator.

4. Diagnosis: the about page is institutional/editorial and should follow the no-numbering treatment used by other public utility pages.
   Implementation: added `toc: false` and `number-sections: false` to `perfil.qmd`; extended `scripts/validate_deployed_site.R` to fetch and assert the about page, including no section numbering and expected institutional patterns.
   Testing: reran `Rscript scripts/prepublish_site_check.R` successfully.
   Notes: validation now catches about-page numbering regressions.

5. Diagnosis: the fix needed a second publication and generated-output verification.
   Implementation: committed and pushed `117a2bf` (`Fix about page editorial numbering`) to `main`.
   Testing: GitHub Pages workflow run `25551395543` completed successfully; the updated deployed validator passed.
   Notes: published `perfil.html` returned HTTP 200 with `last-modified: Fri, 08 May 2026 10:50:50 GMT`.

6. Diagnosis: final records and next planning needed to reflect the completed publication/QA block.
   Implementation: updated `WORKLOG_SITE.md` and prepared `NEXT_SITE.md` for the next site-only visual QA and stylesheet simplification block.
   Testing: final validation is scheduled after these record updates.
   Notes: `.vscode/` remains untracked and intentionally outside the site commits.

### Files changed

- `.gitignore`
- `README.md`
- `busca.qmd`
- `glossario.qmd`
- `perfil.qmd`
- `semanas/index.qmd`
- `data/site-manifest.yml`
- `scripts/validate_site_manifest.R`
- `scripts/validate_deployed_site.R`
- `styles/main.scss`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Published the institutional/utility page consistency changes.
- Published manifest editable-region validation hardening.
- Removed automatic section numbering and TOC from the public about page.
- Extended deployed-site validation to cover the about page and institutional patterns.
- Confirmed the published site passes deployed validation after GitHub Pages render/deploy.

### Problems fixed

- The about page still rendered numbered editorial headings.
- The deployed validator did not previously assert the about page.
- The remaining local site changes were unpublished and unverified on GitHub Pages.

### Commands executed

- `Rscript scripts/prepublish_site_check.R`
- `git status --short --branch`
- `git add .gitignore README.md busca.qmd glossario.qmd perfil.qmd semanas/index.qmd data/site-manifest.yml scripts/validate_deployed_site.R scripts/validate_site_manifest.R styles/main.scss styles/main-dark.scss WORKLOG_SITE.md NEXT_SITE.md`
- `git commit -m "Polish utility pages and site validation"`
- `git push origin main`
- `gh run list --repo Glebstrauss/mgenetica --workflow quarto-publish.yml --limit 3`
- `Rscript scripts/validate_deployed_site.R`
- `curl -I https://glebstrauss.github.io/mgenetica/`
- `curl -L https://glebstrauss.github.io/mgenetica/perfil.html -o /private/tmp/mgenetica-perfil-after.html`
- `rg -n "profile-hero|public-page-triad|Princípios|MGenética|header-section-number|data-number" /private/tmp/mgenetica-perfil-after.html`
- `git add perfil.qmd scripts/validate_deployed_site.R`
- `git commit -m "Fix about page editorial numbering"`
- `git push origin main`
- `gh run watch 25551395543 --repo Glebstrauss/mgenetica --exit-status`
- `curl -I https://glebstrauss.github.io/mgenetica/perfil.html`
- `curl -L https://glebstrauss.github.io/mgenetica/perfil.html -o /private/tmp/mgenetica-perfil-final.html`
- `rg -n "header-section-number|data-number|profile-hero|public-page-triad|Princípios" /private/tmp/mgenetica-perfil-final.html`

### Test results

- Local prepublish check passed before both publication commits.
- GitHub Pages workflow run `25551053309` passed.
- GitHub Pages workflow run `25551395543` passed.
- Deployed-site validation passed after the final deploy.
- Published about page returned HTTP 200 and no longer contains section-number markers.
- Local Quarto render remains skipped because `quarto` is not available on `PATH`.

### Pending items

- Run browser/screenshot QA across desktop and mobile for homepage, module index, module page, search, glossary, route and about.
- Continue stylesheet cleanup only after rendered visual comparison.
- Keep expanding deployed validation if future public patterns become important enough to assert.

---

## 2026-05-08 — Rendered mobile QA and public polish block

### Block objective

Continue the site-only visual QA block from `NEXT_SITE.md`, using local Quarto preview screenshots to fix visible public-site issues without touching the app.

### Cycles executed

1. Diagnosis: local Quarto preview was running and browser screenshots covered homepage and module index at desktop/mobile sizes.
   Implementation: captured representative screenshots with Firefox headless.
   Testing: reviewed `home-desktop`, `home-mobile`, `modules-desktop` and `modules-mobile` screenshots.
   Notes: homepage first viewport was healthy; module index had one visible overlay issue.

2. Diagnosis: utility and institutional pages rendered Quarto's automatic title block above their custom hero sections on mobile, duplicating title/subtitle and pushing the main public composition down.
   Implementation: hid `#title-block-header` for pages containing `.page-hero` or `.profile-hero`.
   Testing: recaptured search and about mobile screenshots; duplication was removed.
   Notes: this follows the existing public pattern already used by homepage and module index.

3. Diagnosis: after hiding the automatic title block, utility/institutional heroes started too close to the sticky secondary navigation.
   Implementation: added top padding for `main.content` on `.page-hero` and `.profile-hero` pages.
   Testing: recaptured `busca.html` mobile and confirmed the hero has breathing room below the nav.
   Notes: change is CSS-only and limited to public editorial pages.

4. Diagnosis: the module index loaded `teacher-mode.js`, causing a floating "Modo professor" control to overlap public cards even though the index has no quiz.
   Implementation: changed `assets/html/body-extras.html` to load `teacher-mode.js` only when a `.quiz-container` exists, together with `quiz.js`.
   Testing: recaptured module-index desktop screenshot and confirmed the overlay was gone; JS syntax checks passed.
   Notes: this also keeps scripts more conditional.

5. Diagnosis: module pages on mobile showed a long Quarto breadcrumb bar that wrapped across several lines before the module header.
   Implementation: hid `.quarto-secondary-nav` on small screens only for pages containing `.module-header`.
   Testing: recaptured modules 01 and 12 on mobile; headers now start cleanly under the main navbar.
   Notes: desktop module navigation remains unchanged.

6. Diagnosis: deployed validation should protect the new rendered CSS invariants after publication.
   Implementation: extended `scripts/validate_deployed_site.R` to assert utility/about title-block hide rules and the mobile module breadcrumb rule.
   Testing: SCSS compilation, manifest validation and JS syntax checks passed before final prepublish.
   Notes: deployed validation must run after the publication commit is live.

### Files changed

- `assets/html/body-extras.html`
- `styles/main.scss`
- `scripts/validate_deployed_site.R`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Removed duplicated automatic Quarto title blocks from utility/institutional public pages.
- Added better top rhythm for search, glossary, route and about heroes.
- Stopped loading teacher mode on the module index where no quiz exists.
- Removed the long mobile breadcrumb strip from module pages.
- Added deployed CSS-rule assertions for these rendered fixes.

### Problems fixed

- Mobile utility pages repeated their page title before the custom hero.
- The about page started with a redundant subtitle before the branded profile hero.
- The module index had an app-like floating teacher control over public cards.
- Module pages lost first-viewport space to a wrapped breadcrumb trail on mobile.

### Commands executed

- `curl -I http://127.0.0.1:4321/`
- `Firefox --headless --screenshot` captures for homepage, module index, modules 01/12, search, glossary, route and about.
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `Rscript scripts/validate_site_manifest.R`
- `node --check assets/js/progress.js`
- `node --check assets/js/darkmode.js`
- `node --check assets/js/interactives.js`
- `node --check assets/js/quiz.js`
- `node --check assets/js/teacher-mode.js`

### Test results

- Local Quarto preview returned HTTP 200.
- Representative screenshots confirmed the visual fixes locally.
- SCSS compilation passed.
- Manifest validation passed.
- JS syntax checks passed.

### Pending items

- Run full prepublish after record updates.
- Publish the visual QA fixes and run deployed-site validation.
- Continue with dark-mode rendered screenshot QA and deeper SCSS simplification only after deployed parity is confirmed.

---

## 2026-05-08 — Dark-mode rendered QA block

### Block objective

Continue from `NEXT_SITE.md` with dark-mode rendered QA for the public site, fixing only concrete contrast and mobile chrome issues.

### Cycles executed

1. Diagnosis: the previous mobile QA fixes were already deployed and the deployed validator passed.
   Implementation: ran `Rscript scripts/validate_deployed_site.R` before starting new edits.
   Testing: deployed-site validation passed.
   Notes: no app files were changed.

2. Diagnosis: dark-mode screenshots needed a reliable rendered source without changing the repository.
   Implementation: downloaded a temporary copy of the published site to `/private/tmp`, forced Quarto's dark-mode sentinel in that copy and captured home, module index, module 12, search, glossary and about pages with Firefox headless.
   Testing: screenshots showed overall dark contrast was usable.
   Notes: the temporary rendered copy was not committed.

3. Diagnosis: utility/institutional pages in dark mode still showed Quarto's secondary navigation as a bright strip on mobile.
   Implementation: extended the existing mobile secondary-nav hide rule to pages with `.page-hero` and `.profile-hero`.
   Testing: dark-mode search and about screenshots no longer showed the bright strip.
   Notes: this affects mobile editorial pages only; desktop remains unchanged.

4. Diagnosis: the profile logo card on the about page used the dark logo asset on a dark surface, losing brand visibility.
   Implementation: added a dark-theme filter for `.profile-logo img` to render the mark in a high-contrast light treatment with a restrained cyan glow.
   Testing: dark-mode about screenshot showed the brand mark and wordmark clearly.
   Notes: this is limited to the institutional profile logo, not a global logo rewrite.

5. Diagnosis: deployed validation should catch the new mobile chrome rules after publication.
   Implementation: extended `scripts/validate_deployed_site.R` with assertions for the utility and about secondary-nav hide rules.
   Testing: full prepublish validation passed.
   Notes: deployed validation must be rerun after publication.

6. Diagnosis: a direct local `quarto render` was useful to try because Quarto exists through RStudio, but it stalled at module 01 and cleaned ignored `docs/` output.
   Implementation: stopped the stalled render process, restored ignored `docs/` from the published site and continued with the supported prepublish checks.
   Testing: `Rscript scripts/prepublish_site_check.R` passed after cleanup.
   Notes: the GitHub Pages workflow remains the authoritative full render path.

### Files changed

- `styles/main.scss`
- `styles/main-dark.scss`
- `scripts/validate_deployed_site.R`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Improved dark-mode mobile utility/institutional pages by removing the bright secondary-navigation strip.
- Improved dark-mode brand visibility on the about page profile logo.
- Added deployed validation coverage for the new mobile public-page chrome rules.

### Problems fixed

- Dark-mode search/glossary/route/about pages had a light secondary-nav strip on mobile.
- The about-page logo mark was too low-contrast in dark mode.

### Commands executed

- `Rscript scripts/validate_deployed_site.R`
- `wget --page-requisites --convert-links ...`
- `Firefox --headless --screenshot ...`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `/Applications/RStudio.app/Contents/Resources/app/quarto/bin/quarto render`
- `Rscript scripts/prepublish_site_check.R`

### Test results

- Deployed-site validation passed before edits.
- Dark-mode screenshots confirmed the fixes in a temporary rendered copy.
- SCSS compilation passed.
- Full prepublish validation passed.
- Direct local `quarto render` was attempted but stalled at module 01; it was stopped and not used as the final validation.

### Pending items

- Publish these dark-mode fixes and run deployed-site validation.
- Continue with conservative SCSS simplification after deployed dark-mode parity is confirmed.
- Consider adding a documented local render command that uses the RStudio-bundled Quarto without interfering with preview output.

---

## 2026-05-08 — Conservative SCSS simplification block

### Block objective

Continue from `NEXT_SITE.md` after the dark-mode publication by simplifying one low-risk group of duplicated public-site SCSS rules without changing app code or public content.

### Cycles executed

1. Diagnosis: the dark-mode fixes were already published and GitHub Pages validation had passed.
   Implementation: started from a clean tracked tree and kept scope to public-site styles and site planning records.
   Testing: confirmed `Rscript scripts/validate_deployed_site.R` returned `deployed site ok`.
   Notes: `.vscode/` remains an unrelated untracked local folder.

2. Diagnosis: `styles/main.scss` has several historical layers for buttons, metric grids, feature cards, module cards and study-flow blocks.
   Implementation: mapped repeated selectors and selected only an intermediate layer whose visual values are superseded by later public-site rules.
   Testing: inspected the affected selector groups before editing.
   Notes: pseudo-element scaffolding and positioning needed by the final design were preserved or moved to the active rules.

3. Diagnosis: the intermediate layer repeated button, grid, metric, feature, flow and module-card values that are overwritten later with the same selectors.
   Implementation: removed the redundant declarations and added `position: relative` to the active `.flow-step` and `.module-card` rules so their pseudo-elements remain anchored.
   Testing: compiled both light and dark SCSS successfully.
   Notes: no `.qmd`, app, backend or content-management code was changed.

4. Diagnosis: local `quarto preview` is not available from the shell because `quarto` is not on `PATH`.
   Implementation: used the available automated checks instead of forcing another local render path that previously stalled.
   Testing: `command -v quarto` returned no executable; manifest validation and `git diff --check` passed.
   Notes: GitHub Actions remains the reliable full render path for this repository.

5. Diagnosis: the cleanup needs publication and deployed verification because it touches rendered CSS.
   Implementation: updated `WORKLOG_SITE.md` and `NEXT_SITE.md` with the current state and next publication/verification steps.
   Testing: final prepublish validation is run after record updates.
   Notes: future SCSS simplification should continue in small groups with screenshots or deployed checks.

### Files changed

- `styles/main.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Removed an obsolete intermediate SCSS layer for repeated public button/card/grid values.
- Preserved active pseudo-element behavior for study-flow and module-card visual motifs.
- Reduced stylesheet size while keeping the current public-site visual system intact.

### Problems fixed

- Public SCSS had old styling strata that made the current component rules harder to audit.
- The next work plan still described already completed dark-mode publication as the primary task.

### Commands executed

- `Rscript scripts/validate_deployed_site.R`
- `rg -n "module-card|phase-card|public-card|cta|hero|profile|page-hero|module-header|module-nav" styles/main.scss styles/main-dark.scss`
- `sed -n ... styles/main.scss`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `command -v quarto`
- `Rscript scripts/validate_site_manifest.R`
- `git diff --check`

### Test results

- Deployed-site validation passed before the cleanup.
- SCSS compilation passed after the cleanup.
- Manifest validation passed.
- `git diff --check` passed.
- `quarto preview` could not be used because the `quarto` executable is not on `PATH`.

### Pending items

- Run full prepublish after these records.
- Publish the SCSS cleanup if the prepublish gate passes.
- Watch the GitHub Pages workflow and rerun deployed-site validation after deploy.
- Continue SCSS simplification only in small, rendered-verifiable groups.

---

## 2026-05-08 — Hero SCSS duplicate cleanup block

### Block objective

Continue the site-only stylesheet consolidation from `NEXT_SITE.md` by removing one additional obsolete public hero layer after confirming the previous cleanup was published and healthy.

### Cycles executed

1. Diagnosis: the previous SCSS simplification was deployed successfully.
   Implementation: ran deployed-site validation and checked the latest GitHub Pages workflow status before new edits.
   Testing: `Rscript scripts/validate_deployed_site.R` returned `deployed site ok`; workflow `25558247750` was successful.
   Notes: no app files were changed.

2. Diagnosis: `styles/main.scss` still contained three generations of homepage hero rules after the base hero section.
   Implementation: inspected the older, intermediate and current hero layers to identify declarations superseded by later selectors.
   Testing: checked remaining `.hero`, `.hero-copy`, `.hero-panel` and pseudo-element selectors after the cleanup.
   Notes: the active homepage hero rules remain in place.

3. Diagnosis: the older middle hero block repeated layout, color, typography and panel rules that are overridden by newer homepage hero layers.
   Implementation: removed the obsolete middle hero block only; preserved the section-heading constraint and later motif/card rules.
   Testing: compiled both light and dark SCSS successfully.
   Notes: no `.qmd`, JS, data manifest or app code was modified.

4. Diagnosis: local rendered parity remains constrained by the missing `quarto` executable on `PATH`.
   Implementation: used SCSS compilation, selector inspection, manifest validation and whitespace checks locally, with GitHub Actions kept as the full render gate.
   Testing: manifest validation and `git diff --check` passed.
   Notes: this is a conservative deletion of overridden CSS rather than a visual redesign.

5. Diagnosis: because CSS changed, the cleanup needs the normal publication gate.
   Implementation: updated `WORKLOG_SITE.md` and `NEXT_SITE.md` with the current block and next recommended site-only work.
   Testing: full prepublish validation is run after record updates.
   Notes: deployed validation should run again after publication.

### Files changed

- `styles/main.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Removed an obsolete intermediate homepage hero styling layer.
- Reduced public stylesheet size while keeping active hero rules intact.
- Continued the SCSS consolidation backlog item without changing public content or app behavior.

### Problems fixed

- Homepage hero styles were harder to audit because an older visual direction remained in the cascade even though newer rules superseded it.

### Commands executed

- `Rscript scripts/validate_deployed_site.R`
- `gh run list --repo Glebstrauss/mgenetica --workflow quarto-publish.yml --limit 3`
- `Rscript scripts/prepublish_site_check.R`
- `rg -n "..." styles/main.scss`
- `sed -n ... styles/main.scss`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `Rscript scripts/validate_site_manifest.R`
- `git diff --check`

### Test results

- Deployed-site validation passed before new edits.
- Latest GitHub Pages publication was successful before new edits.
- Full prepublish validation passed before new edits.
- SCSS compilation passed after the cleanup.
- Manifest validation passed after the cleanup.
- `git diff --check` passed after the cleanup.
- Local Quarto preview/render remains unavailable from the shell because `quarto` is not on `PATH`.

### Pending items

- Run full prepublish after these records.
- Publish the hero SCSS cleanup if the prepublish gate passes.
- Watch GitHub Pages and rerun deployed-site validation after publication.
- Continue with one small SCSS cleanup group at a time, or document public component patterns before larger stylesheet restructuring.

---

## 2026-05-08 — Public component documentation block

### Block objective

Continue from `NEXT_SITE.md` after the published hero cleanup by documenting current public-site component patterns instead of forcing another CSS deletion without local rendered preview.

### Cycles executed

1. Diagnosis: the hero SCSS cleanup had already been published and GitHub Pages was healthy.
   Implementation: ran deployed-site validation and checked the latest Pages workflow before new edits.
   Testing: `Rscript scripts/validate_deployed_site.R` returned `deployed site ok`; latest workflow was successful.
   Notes: no app files were changed.

2. Diagnosis: another SCSS deletion would be less certain without local `quarto preview`, while the backlog also asks for public component documentation.
   Implementation: chose the safer maintainability step from `NEXT_SITE.md`: document public component patterns.
   Testing: full prepublish validation passed before editing.
   Notes: this avoids visual risk while improving future site-only work.

3. Diagnosis: public patterns were implicit across manifest, `.qmd` pages, SCSS and JS.
   Implementation: added `PUBLIC_SITE_COMPONENTS.md` with source-of-truth, page patterns, component families, responsive/accessibility rules and maintenance rules.
   Testing: file is documentation-only and does not touch modules, styles, scripts, assets or app code.
   Notes: the document explicitly excludes app/admin behavior.

4. Diagnosis: records needed to reflect the documentation step and next publication gate.
   Implementation: updated `WORKLOG_SITE.md` and `NEXT_SITE.md`.
   Testing: final validation is run after these record updates.
   Notes: this prepares the next block to publish and verify the documentation change.

5. Diagnosis: local generated files may reappear during validation because module scripts write ignored CSV outputs.
   Implementation: keep generated ignored outputs untouched and do not remove `.vscode/`.
   Testing: `git status --short --branch` is checked in the final validation set.
   Notes: cleanup scope remains separate from site evolution.

### Files changed

- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added concise documentation for public site component families and maintenance rules.
- Clarified source-of-truth boundaries between manifest metadata, `.qmd` content, styles and public JS.
- Created a safer basis for future SCSS consolidation without touching rendered behavior.

### Problems fixed

- Public component patterns were spread across code and worklog history but not documented in a stable reference.
- Further stylesheet deletion was becoming less defensible without local rendered preview.

### Commands executed

- `Rscript scripts/validate_deployed_site.R`
- `gh run list --repo Glebstrauss/mgenetica --workflow quarto-publish.yml --limit 3`
- `Rscript scripts/prepublish_site_check.R`

### Test results

- Deployed-site validation passed before the documentation change.
- Latest GitHub Pages workflow was successful before the documentation change.
- Full prepublish validation passed before the documentation change.
- Final validation is run after record updates.

### Pending items

- Run final validation after this record update.
- Publish the documentation change if the prepublish gate passes.
- After publication, run deployed-site validation.
- In a future block, either continue one small SCSS cleanup with rendered evidence or use this document to guide broader stylesheet organization.

---

## 2026-05-08 — Public component documentation validation block

### Block objective

Continue from `NEXT_SITE.md` by turning the new public component documentation into a protected site contract without changing app code, public content, styles or scripts.

### Cycles executed

1. Diagnosis: the public component documentation had already been published and GitHub Pages was healthy.
   Implementation: ran deployed-site validation and checked the latest Pages workflow before editing.
   Testing: `Rscript scripts/validate_deployed_site.R` returned `deployed site ok`; latest workflow was successful.
   Notes: no app files were changed.

2. Diagnosis: `PUBLIC_SITE_COMPONENTS.md` documented source-of-truth and component families, but no local validation protected it from deletion or drift.
   Implementation: inspected `scripts/validate_site_manifest.R`, `scripts/prepublish_site_check.R` and the component document.
   Testing: confirmed the component doc existed and matched the current public-site terminology before editing.
   Notes: this fits the `NEXT_SITE.md` preference for validation enhancement when rendered CSS parity cannot be checked locally.

3. Diagnosis: the manifest validator already protects public page and module contracts, making it the right place for a lightweight documentation contract.
   Implementation: added checks that `PUBLIC_SITE_COMPONENTS.md` exists, contains required source-of-truth sections/references and names documented public classes that also exist in the SCSS.
   Testing: ran `Rscript scripts/validate_site_manifest.R` successfully.
   Notes: the validator does not inspect app/admin code and remains site-only.

4. Diagnosis: the validation contract change needed the full prepublish gate.
   Implementation: ran `Rscript scripts/prepublish_site_check.R`.
   Testing: full prepublish passed; Quarto render remains skipped because `quarto` is not on `PATH`.
   Notes: module scripts regenerated ignored CSV outputs as expected.

5. Diagnosis: records and next-step guidance needed to reflect the new validation coverage.
   Implementation: updated `WORKLOG_SITE.md` and `NEXT_SITE.md`.
   Testing: final validation is run after these record updates.
   Notes: the next block should publish and verify this validation enhancement, then choose a small rendered-safe improvement.

### Files changed

- `scripts/validate_site_manifest.R`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added validation coverage for `PUBLIC_SITE_COMPONENTS.md`.
- Protected core public component references and source-of-truth documentation from accidental removal or drift.
- Strengthened the site-maintenance contract without changing rendered pages.

### Problems fixed

- Public component documentation was not yet part of any prepublish contract.

### Commands executed

- `Rscript scripts/validate_deployed_site.R`
- `gh run list --repo Glebstrauss/mgenetica --workflow quarto-publish.yml --limit 3`
- `sed -n '1,260p' scripts/validate_site_manifest.R`
- `sed -n '1,260p' scripts/prepublish_site_check.R`
- `sed -n '1,220p' PUBLIC_SITE_COMPONENTS.md`
- `Rscript scripts/validate_site_manifest.R`
- `Rscript scripts/prepublish_site_check.R`

### Test results

- Deployed-site validation passed before new edits.
- Latest GitHub Pages workflow was successful before new edits.
- Site manifest validation passed with the new documentation checks.
- Full prepublish validation passed with the new documentation checks.

### Pending items

- Run final validation after this record update.
- Publish the validation enhancement if the prepublish gate passes.
- After publication, watch GitHub Pages and rerun deployed-site validation.
- Continue with a small site-only improvement backed by validation or rendered evidence.

---

## 2026-05-08 — Long site validation hardening block

### Block objective

Use the `mgenetica-site` skill for a longer site-only maintenance block, following `NEXT_SITE.md` and strengthening public-site contracts without changing app code or visual styling.

### Cycles executed

1. Diagnosis: the previous public component documentation validation was already published and the deployed site was healthy.
   Implementation: ran deployed-site validation and checked the latest GitHub Pages workflow before editing.
   Testing: `Rscript scripts/validate_deployed_site.R` returned `deployed site ok`; the latest workflow was successful.
   Notes: no app files were changed.

2. Diagnosis: `data/site-manifest.yml` is the canonical source for public navigation, but `_quarto.yml` navbar/footer/sidebar could drift without local validation.
   Implementation: extended `scripts/validate_site_manifest.R` to parse `_quarto.yml`, compare navbar/footer labels and hrefs with the manifest and compare sidebar module contents with manifest module order.
   Testing: `Rscript scripts/validate_site_manifest.R` passed.
   Notes: this protects public navigation and modular structure for future app management.

3. Diagnosis: public runtime behavior depends on `assets/html/body-extras.html`, especially conditional JS loading for quizzes and interactives.
   Implementation: added validation checks for the skip link, global progress/dark-mode scripts, subdirectory path logic, conditional interactives loading and quiz-only teacher/quiz scripts.
   Testing: `Rscript scripts/validate_site_manifest.R` passed.
   Notes: this supports the performance backlog item to keep scripts conditional.

4. Diagnosis: deployed validation only checked one module page, leaving middle and final module patterns less protected.
   Implementation: extended `scripts/validate_deployed_site.R` to fetch modules 01, 06 and 12 and assert module header, orientation, objectives, quiz, module-index navigation and quiz-before-navigation ordering.
   Testing: an initial assertion falsely matched `.quiz-container` inside the shared loader script on the module index; it was corrected to search for rendered `class="quiz-container"` markup, then deployed validation passed.
   Notes: this adds published coverage across beginning, middle and end of the module sequence.

5. Diagnosis: the component documentation listed maintenance rules but not the validation contracts that now protect them.
   Implementation: added a `Validation Contracts` section to `PUBLIC_SITE_COMPONENTS.md` and required it from `scripts/validate_site_manifest.R`.
   Testing: site manifest validation and deployed-site validation passed.
   Notes: documentation and validation now reference each other explicitly.

6. Diagnosis: the full site gate needed to run after all validation changes.
   Implementation: ran `Rscript scripts/prepublish_site_check.R`.
   Testing: full prepublish passed; Quarto render remains skipped locally because `quarto` is not on `PATH`.
   Notes: ignored module CSV outputs may be regenerated by module scripts; they were not staged.

### Files changed

- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `scripts/validate_deployed_site.R`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Protected `_quarto.yml` public navigation and module sidebar against manifest drift.
- Protected public runtime script-loading assumptions in `body-extras.html`.
- Broadened deployed module checks to modules 01, 06 and 12.
- Documented validation contracts in the public component reference.

### Problems fixed

- Public navigation, sidebar and runtime JS assumptions were important but not yet asserted locally.
- Deployed validation covered only the first module page.
- A first deployed assertion used a broad string match and was corrected to distinguish rendered quiz markup from loader-script text.

### Commands executed

- `Rscript scripts/validate_deployed_site.R`
- `gh run list --repo Glebstrauss/mgenetica --workflow quarto-publish.yml --limit 5`
- `sed -n ... AGENTS.md ROADMAP_SITE.md BACKLOG_SITE.md WORKLOG_SITE.md NEXT_SITE.md`
- `sed -n ... data/site-manifest.yml _quarto.yml assets/html/body-extras.html scripts/validate_site_manifest.R scripts/validate_deployed_site.R`
- `Rscript scripts/validate_site_manifest.R`
- `node --check assets/js/progress.js`
- `node --check assets/js/darkmode.js`
- `node --check assets/js/interactives.js`
- `node --check assets/js/quiz.js`
- `node --check assets/js/teacher-mode.js`
- `Rscript scripts/prepublish_site_check.R`

### Test results

- Deployed-site validation passed before edits.
- GitHub Pages latest workflow was successful before edits.
- Site manifest validation passed with the new Quarto/navigation/runtime/documentation checks.
- Deployed-site validation passed with the expanded module checks.
- JS syntax checks passed.
- Full prepublish validation passed.
- Local Quarto render remains skipped because `quarto` is not available on `PATH`.

### Pending items

- Run final validation after these records.
- Publish the validation hardening changes if the prepublish gate passes.
- Watch GitHub Pages and rerun deployed-site validation after publication.
- Next block can use the stronger validation base to choose either a small rendered-safe CSS cleanup or another manifest/page-pattern contract.

---

## 2026-05-08 — Long quiz contract hardening block

### Block objective

Use the `mgenetica-site` skill for a longer site-only block after the previous publication, making module quiz data a first-class public-site contract without changing app code or rewriting module lessons.

### Cycles executed

1. Diagnosis: the prior validation-hardening block was already published, the latest GitHub Pages workflow was successful and the tracked worktree was clean.
   Implementation: confirmed the deployed site before editing and preserved untracked `.agents/` and `.vscode/`.
   Testing: `Rscript scripts/validate_deployed_site.R` returned `deployed site ok`; existing local manifest validation returned `site manifest ok`.
   Notes: this covered publication health, public navigation and homepage/deployed page status before new changes.

2. Diagnosis: every module had a quiz container, but quiz JSON files were not represented in the canonical manifest.
   Implementation: audited all `quizzes/quiz-*.json` files and confirmed the 12 public quizzes each have 5 questions and `passMark` 4.
   Testing: parsed the quiz files with `jsonlite` through R.
   Notes: no quiz content was rewritten.

3. Diagnosis: `data/site-manifest.yml` should own module metadata useful for future app management, including each module's public quiz data file.
   Implementation: added a `quiz:` path to all 12 module registry entries.
   Testing: ran `Rscript scripts/validate_site_manifest.R` after extending validation.
   Notes: this keeps quiz ownership in the public-site content map while leaving longform lessons in `.qmd`.

4. Diagnosis: local validation did not catch missing, malformed or mismatched quiz JSON.
   Implementation: extended `scripts/validate_site_manifest.R` to require unique quiz paths, check each file exists, parse JSON, match the module number, validate title/subtitle, validate `passMark`, require questions and ensure each `correct` index points to an existing option.
   Testing: first run exposed that `PUBLIC_SITE_COMPONENTS.md` did not yet document `quizzes/`; after updating the doc, manifest validation passed.
   Notes: this protects internal module pages and future manifest edits from quiz/data drift.

5. Diagnosis: deployed validation confirmed rendered module patterns but did not verify that quiz data files were actually published by GitHub Pages.
   Implementation: extended `scripts/validate_deployed_site.R` to read quiz paths from the manifest and fetch every deployed quiz JSON.
   Testing: deployed validation passed against the current published site.
   Notes: the new deployed check will become authoritative after these changes are published.

6. Diagnosis: public component documentation needed to reflect quiz data as a source of truth and learning-widget contract.
   Implementation: updated `PUBLIC_SITE_COMPONENTS.md` to document `quizzes/` and quiz JSON alignment with module `data-module` values.
   Testing: documentation is now required by `scripts/validate_site_manifest.R`.
   Notes: this keeps the contract public-site-specific, not app/admin documentation.

7. Diagnosis: the complete block needed the standard final gate and next-step record.
   Implementation: updated this worklog and `NEXT_SITE.md`.
   Testing: final validation is run after these record updates.
   Notes: no app files were changed.

### Files changed

- `data/site-manifest.yml`
- `scripts/validate_site_manifest.R`
- `scripts/validate_deployed_site.R`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Made quiz JSON files part of the canonical module registry.
- Added local validation for quiz file existence, JSON shape, module-number alignment, question/options structure and scoring bounds.
- Added deployed validation for all published quiz JSON endpoints.
- Documented quiz data as public-site learning-widget data.

### Problems fixed

- Quiz data was important to module completion but was not declared in the manifest.
- Missing or malformed quiz JSON could previously pass local manifest validation.
- Deployed validation did not verify that quiz data resources were published.

### Commands executed

- `Rscript scripts/validate_deployed_site.R`
- `Rscript scripts/validate_site_manifest.R`
- `Rscript -e 'for (f in sort(list.files("quizzes", pattern = "json$", full.names = TRUE))) { x <- jsonlite::fromJSON(f, simplifyVector = FALSE); cat(basename(f), x$module, length(x$questions), x$passMark, "\n") }'`
- `git diff --check`
- `git diff --name-only`
- Final prepublish validation is run after these records.

### Test results

- Deployed-site validation passed before edits.
- Site manifest validation passed with the new quiz contract.
- Deployed-site validation passed with the new quiz-resource checks.
- Whitespace diff check passed before records.
- Final prepublish validation is run after these records.

### Pending items

- Run final validation after these records.
- Commit and push the quiz-contract hardening if the prepublish gate passes.
- Watch GitHub Pages and rerun deployed-site validation after publication.
- Next block can use local preview/Quarto if available for a small rendered-safe improvement.

---

## 2026-05-08 — Long public visual/UX evolution block

### Block objective

Use the `mgenetica-site` skill for a long, site-only visual/UX block focused on the public MGenética experience, following `NEXT_SITE.md`, without app changes and without automatic publication.

### Cycles executed

1. Diagnosis: `NEXT_SITE.md` called for visible public-site UX rather than another infrastructure block; the homepage hero explained the promise but did not yet expose the learning sequence in the first viewport.
   Implementation: added a `hero-learning-path` sequence to the homepage hero, making the path concept -> simulation -> R -> decision visible before the primary CTA.
   Testing: compiled SCSS and ran manifest validation after the first edit set.
   Notes: this improves first-viewport hierarchy without changing scripts or module content.

2. Diagnosis: the homepage CTA wording used "Explorar a trilha", while the visitor flow now distinguishes the module catalog from the weekly route.
   Implementation: changed the secondary hero CTA to "Ver os 12 módulos" to make the destination explicit.
   Testing: reviewed the changed homepage diff and ran local SCSS/manifest checks.
   Notes: this is a small navigation/CTA clarity improvement.

3. Diagnosis: the module index had guidance cards but no compact transition between the general guidance and the phase catalog.
   Implementation: added a `modules-route` guidance band with primary action to start foundations and secondary action to plan by week.
   Testing: compiled SCSS and checked the new component references.
   Notes: this strengthens the internal public flow from catalog to action.

4. Diagnosis: quizzes were structurally present, but modules moved from exercises to quiz with little learner-facing transition.
   Implementation: added one `module-study-checkpoint` before the quiz in all 12 module pages.
   Testing: confirmed every module has exactly one checkpoint and manifest validation still passes.
   Notes: the checkpoint is intentionally short and generic; it does not rewrite scientific lessons.

5. Diagnosis: the new route/checkpoint blocks needed mobile and dark-mode parity to remain premium and readable.
   Implementation: added light/dark SCSS for `hero-learning-path`, `modules-route` and `module-study-checkpoint`, including mobile stacking, CTA wrapping and dark contrast rules.
   Testing: `sass::sass_file()` compiled both light and dark themes successfully.
   Notes: local Quarto preview is unavailable because `quarto` is not on `PATH`.

6. Diagnosis: the new learning-path patterns should be reusable public-site components and protected from accidental drift.
   Implementation: updated `PUBLIC_SITE_COMPONENTS.md` and added the new classes to `scripts/validate_site_manifest.R` component checks.
   Testing: `Rscript scripts/validate_site_manifest.R` passed after documentation and validator updates.
   Notes: validation supports the visible UX change; it was not the main focus of the block.

7. Diagnosis: accessibility metadata could be improved for the new public guidance blocks.
   Implementation: added `aria-label` to the homepage learning path, `role="region"` with label to the module-index route band and `role="note"` to module checkpoints.
   Testing: searched all module pages for the semantic markers and reran SCSS/manifest checks.
   Notes: this covers basic accessibility without new dependencies.

8. Diagnosis: the block needed final validation and records, with no publication.
   Implementation: updated this worklog and `NEXT_SITE.md`.
   Testing: full prepublish validation passed after these record updates.
   Notes: existing untracked `.agents/`, `.vscode/` and `AUTOMATION_SITE.md` are preserved; `AGENTS.md` had pre-existing local changes before this block.

### Files changed

- `index.qmd`
- `modules/index.qmd`
- `modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `modules/modulo02-bases-da-genetica-quantitativa.qmd`
- `modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
- `modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd`
- `modules/modulo05-herdabilidade-e-repetibilidade.qmd`
- `modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `modules/modulo07-modelos-lineares-e-modelos-mistos.qmd`
- `modules/modulo08-blup-e-avaliacao-genetica.qmd`
- `modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd`
- `modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd`
- `modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- `modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `styles/main.scss`
- `styles/main-dark.scss`
- `PUBLIC_SITE_COMPONENTS.md`
- `scripts/validate_site_manifest.R`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Improvements implemented

- Added a visible learning path in the homepage first viewport.
- Clarified the homepage secondary CTA destination.
- Added a module-index route band connecting phases, starting point and weekly planning.
- Added pre-quiz learning checkpoints to all modules.
- Added responsive, dark-mode and accessibility support for the new public UX components.
- Documented and validated the new component classes.

### Problems fixed

- The homepage did not make the concept-to-code-to-decision progression visible enough above the fold.
- The module index lacked a compact action band between guidance and the full catalog.
- Module quizzes felt more appended than integrated with the exercise flow.

### Commands executed

- `command -v quarto`
- `sed -n ... AGENTS.md ROADMAP_SITE.md BACKLOG_SITE.md WORKLOG_SITE.md NEXT_SITE.md`
- `sed -n ... index.qmd modules/index.qmd modules/modulo01-introducao-ao-melhoramento-animal.qmd styles/main.scss styles/main-dark.scss`
- `rg -n "quiz-container data-module|module-study-checkpoint|hero-learning-path|modules-route" ...`
- `Rscript -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `Rscript scripts/validate_site_manifest.R`
- `git diff --check`
- `Rscript scripts/prepublish_site_check.R`

### Test results

- Light and dark SCSS compilation passed.
- Site manifest validation passed.
- Whitespace diff check passed before records.
- Local Quarto preview/render is unavailable because `quarto` is not on `PATH`.
- Full prepublish validation passed after records; the prepublish script also skipped Quarto render because `quarto` is not on `PATH`.

### Pending items

- Review the rendered site visually when `quarto preview` or GitHub Pages publication is available.
- Do not publish automatically; publish only after explicit user request.

---

## 2026-05-08 — Visual QA polish follow-up (site-only)

### Block objective

Execute the `visual-review-publico` follow-up block requested in `NEXT_SITE.md`, focusing on public UX polish (homepage CTA hierarchy, module index route band and module checkpoints), plus dark-mode/accessibility parity — without touching the app or publishing.

### Cycles executed

1. Diagnosis: the worktree already contained site-only changes from the previous long visual block; `quarto` is not available on `PATH`.
   Implementation: proceeded with code-level QA and CSS compilation-only verification (no local rendered preview).
   Testing: confirmed `quarto` absence via `command -v quarto`.
   Notes: visual judgement was deferred to a rendered environment as per `NEXT_SITE.md`.

2. Diagnosis: homepage CTA hierarchy was inconsistent between the hero, mid-page “Trilha de aprendizado” section and the final CTA.
   Implementation: made “Começar pelo Módulo 01” the primary action consistently; kept module index as secondary (“Explorar os 12 módulos” / “Abrir índice de módulos”).
   Testing: verified link targets and class usage in `index.qmd`.
   Notes: no content rewrite, only public UX hierarchy polish.

3. Diagnosis: the module index route band repeated a primary CTA and could compete with the page header CTA.
   Implementation: downgraded the route band actions to secondary styling to keep guidance prominent without adding another “primary” competing action.
   Testing: checked `.modules-route-actions` markup in `modules/index.qmd`.
   Notes: preserves the route band intent while reducing visual competition.

4. Diagnosis: module header orientation labels contained missing accents (e.g. “Simulacao”, “Interpretacao”) and the pre-quiz checkpoint note lacked a label.
   Implementation: fixed the Portuguese accents across all 12 module pages and added `aria-label` to `.module-study-checkpoint`.
   Testing: `rg` confirmed no remaining unaccented strings and checkpoint blocks include the new label.
   Notes: strictly copy/a11y polish, without rewriting lesson content.

5. Diagnosis: dark theme lacked parity for skip link and focus-visible styles (and the hero learning-path steps were visually less separated).
   Implementation: added `.skip-link`, `:focus-visible`, touch-target sizing and reduced-motion rules to `styles/main-dark.scss`, plus a border on `.hero-path-step`.
   Testing: compiled both light and dark SCSS successfully (`Rscript --vanilla`).
   Notes: improves accessibility and dark-mode clarity without changing layout structure.

6. Diagnosis: final gate and records were required; Quarto render should be skipped when unavailable.
   Implementation: ran the standard validations and updated records.
   Testing: `git diff --check` passed; `Rscript --vanilla scripts/prepublish_site_check.R` passed (Quarto render skipped).
   Notes: no commit/push/publish performed.

### Files changed in this follow-up block

- `index.qmd`
- `modules/index.qmd`
- `modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `modules/modulo02-bases-da-genetica-quantitativa.qmd`
- `modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
- `modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd`
- `modules/modulo05-herdabilidade-e-repetibilidade.qmd`
- `modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `modules/modulo07-modelos-lineares-e-modelos-mistos.qmd`
- `modules/modulo08-blup-e-avaliacao-genetica.qmd`
- `modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd`
- `modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd`
- `modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- `modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `styles/main-dark.scss`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Commands executed

- `git status --short --branch`
- `command -v quarto`
- `git diff --check`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla scripts/prepublish_site_check.R`

### Test results

- Prepublish site check passed; Quarto render was skipped because `quarto` is not on `PATH`.
- Site manifest validation passed.
- Light/dark SCSS compilation passed.

### Pending items

- Run a true rendered review when `quarto preview` is available (or after a publication preview), focusing on the homepage first viewport and dark-mode focus/skip behavior.
- Publish only after explicit user request.

---

## 2026-05-08 — Rendered QA final (blocked) + module link hardening

### Block objective

Execute a long, site-only block following `NEXT_SITE.md` (rendered QA final). Because `quarto` is still unavailable on `PATH`, use code-based QA to harden the public flow, run validations and leave the changes ready for a future rendered review (no publication).

### Cycles executed

1. Diagnosis: `quarto` is not available on `PATH`, so `quarto preview` cannot be used for a true rendered QA pass.
   Implementation: proceeded with code-level QA and validation-first safeguards; kept scope to site-only files.
   Testing: `command -v quarto` confirmed unavailability.
   Notes: rendered judgement remains pending until Quarto is available.

2. Diagnosis: the module index landing section is emitted as raw HTML and used `href="*.qmd"` links, which would not be rewritten by Quarto and can break navigation in the rendered site.
   Implementation: updated raw HTML links in `modules/index.qmd` to point to the rendered outputs (`.html`), including the homepage and weekly plan routes.
   Testing: `rg 'href=".*\\.qmd"' modules/index.qmd` returned no matches.
   Notes: this is a functional public-flow fix, not a visual redesign.

3. Diagnosis: module navigation at the bottom of each module page is also emitted as raw HTML and used `href="*.qmd"` links.
   Implementation: updated all module nav cards across the 12 modules to point to `.html` outputs (including the final link to `certificado.html`).
   Testing: `rg 'href=".*\\.qmd"' modules` returned no matches.
   Notes: improves public navigation reliability independent of visual QA.

4. Diagnosis: representative module pages should keep the pre-quiz checkpoint + quiz + nav flow intact after link changes.
   Implementation: verified the checkpoint blocks and quiz containers remained unchanged while only nav `href` targets were adjusted.
   Testing: `Rscript --vanilla scripts/validate_site_manifest.R` passed.
   Notes: no scientific content rewrite was introduced.

5. Diagnosis: the homepage learning-path sequence is semantically a list and benefits from explicit screen-reader roles.
   Implementation: added `role="list"` to `.hero-learning-path` and `role="listitem"` to `.hero-path-step` entries.
   Testing: `Rscript --vanilla scripts/prepublish_site_check.R` passed (Quarto render skipped).
   Notes: accessibility improvement is attribute-only; no layout change intended.

6. Diagnosis: the block needs a final validation gate and records, without publication.
   Implementation: ran the standard prepublish suite and updated work records.
   Testing: `Rscript --vanilla scripts/prepublish_site_check.R` passed; `git diff --check` passed; Quarto render skipped due to missing `quarto`.
   Notes: no commit/push/publish performed.

### Files changed in this block

- `index.qmd`
- `modules/index.qmd`
- `modules/modulo01-introducao-ao-melhoramento-animal.qmd`
- `modules/modulo02-bases-da-genetica-quantitativa.qmd`
- `modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
- `modules/modulo04-medias-variancias-e-componentes-de-variancia.qmd`
- `modules/modulo05-herdabilidade-e-repetibilidade.qmd`
- `modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
- `modules/modulo07-modelos-lineares-e-modelos-mistos.qmd`
- `modules/modulo08-blup-e-avaliacao-genetica.qmd`
- `modules/modulo09-estrutura-de-pedigree-e-parentesco.qmd`
- `modules/modulo10-introducao-a-genomica-e-marcadores-snp.qmd`
- `modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- `modules/modulo12-matrizes-genomicas-gwas-e-predicao-genomica.qmd`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Commands executed

- `git status --short --branch`
- `command -v quarto`
- `Rscript --vanilla scripts/prepublish_site_check.R`
- `rg 'href=".*\\.qmd"' modules`

### Test results

- Prepublish site check passed; Quarto render was skipped because `quarto` is not on `PATH`.
- Module scripts executed successfully via `scripts/run_all_modules.R`.
- Whitespace diff check passed (`git diff --check`).

### Pending items

- Install or expose `quarto` on `PATH`, then run `quarto preview` (light + dark) and complete the true rendered QA pass.
- Publish only after explicit user request.

---

## 2026-05-08 — Rendered QA final (static render) + skip-link focus fix

### Block objective

Execute the `rendered-qa-final` block in `NEXT_SITE.md`, prioritizing homepage first viewport + CTAs, module index route band, representative module pages and skip-link/focus behavior — site-only, no publication.

Because `quarto preview` cannot bind a local port in this sandbox (`PermissionDenied: Operation not permitted`), this block uses `quarto render` + inspection of the generated HTML in `docs/` as the rendered evidence loop.

### Cycles executed

1. Diagnosis: `quarto` is not on `PATH`, and `quarto preview` fails to listen on localhost in this environment.
   Implementation: located a working Quarto CLI at `/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin/quarto`; switched to static renders (`quarto render ...`) instead of preview server.
   Testing: confirmed `quarto --version` and verified the preview bind error.
   Notes: interactive browser/devtools QA remains a next-step outside this sandbox.

2. Diagnosis: homepage secondary CTAs used inconsistent labels across sections; skip-link was present but rendered late (after main content).
   Implementation: standardized the secondary CTA copy to “Explorar os 12 módulos”; reworked skip-link behavior to reliably become the first focusable element and move focus to main content on activation.
   Testing: rendered `index.qmd` and inspected `docs/index.html` for CTA text consistency + injected skip-link logic.
   Notes: preserves the premium CTA hierarchy while improving a11y without changing lesson content.

3. Diagnosis: module index route band must not compete with the primary catalog CTA and must not link to source files (`*.qmd`) in raw HTML.
   Implementation: confirmed `.modules-route` actions remain `.btn-secondary` and link to rendered outputs (`.html`).
   Testing: rendered `modules/index.qmd` and checked `docs/modules/index.html` for absence of `href="*.qmd"`.
   Notes: ensures safe navigation in rendered site.

4. Diagnosis: representative module pages must preserve checkpoint → quiz → navigation flow and keep module nav cards pointing to `.html`.
   Implementation: rendered module pages 01/06/12 (static, `--no-execute`) using a clean HOME to avoid Quarto sass-cache failures; verified checkpoint and nav sections in the rendered HTML.
   Testing: inspected `docs/modules/modulo01-*.html`, `docs/modules/modulo06-*.html`, `docs/modules/modulo12-*.html` for `.module-study-checkpoint` + `.module-nav` and `.html` links.
   Notes: this validates the public flow without requiring full project render.

5. Diagnosis: skip-link activation should move keyboard focus to content (not only scroll).
   Implementation: updated the head include to move the existing `.skip-link` to the start of `<body>`, ensure `tabindex="-1"` on `main#quarto-document-content`, and focus the main element when the skip-link is activated.
   Testing: verified script presence in rendered outputs.
   Notes: improves keyboard navigation for both light and dark themes (styling handled in SCSS).

6. Diagnosis: final gate and records are required; publication remains out-of-scope.
   Implementation: ran the validation suite and recorded results.
   Testing: `git diff --check` OK; `Rscript --vanilla scripts/validate_site_manifest.R` OK; `SKIP_QUARTO_RENDER=1 Rscript --vanilla scripts/prepublish_site_check.R` OK.
   Notes: no commit/push/publish performed.

### Files changed in this block

- `_quarto.yml`
- `assets/html/body-extras.html`
- `assets/html/head-extras.html`
- `index.qmd`
- `WORKLOG_SITE.md`
- `NEXT_SITE.md`

### Commands executed

- `quarto --version` (via the vendor path)
- `quarto preview ...` (failed bind in sandbox)
- `HOME=/private/tmp/quarto-home quarto render index.qmd --no-execute`
- `HOME=/private/tmp/quarto-home quarto render modules/index.qmd --no-execute`
- `HOME=/private/tmp/quarto-home quarto render modules/modulo01-... --no-execute`
- `HOME=/private/tmp/quarto-home quarto render modules/modulo06-... --no-execute`
- `HOME=/private/tmp/quarto-home quarto render modules/modulo12-... --no-execute`
- `git diff --check`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `SKIP_QUARTO_RENDER=1 Rscript --vanilla scripts/prepublish_site_check.R`

### Test results

- Site manifest validation passed.
- Prepublish site check passed (Quarto render skipped by `SKIP_QUARTO_RENDER=1`).
- Whitespace/diff check passed.

### Pending items

- Run an interactive rendered QA pass in a normal environment (where `quarto preview` can bind to a local port) and visually confirm: homepage hero + CTAs, `.modules-route`, module checkpoint spacing and dark-mode focus/skip-link behavior.
- Publish only after explicit user request.

---

## 2026-05-08 — Publicação das alterações recentes

### Objective

Publish the recent public-site UX changes after running the prepublication gate.

### Actions

- Ran the full prepublish gate with the vendored Quarto CLI on `PATH` and `HOME=/private/tmp/quarto-home` to avoid local Sass-cache issues.
- Committed the tracked site changes as `994de9e` (`Publish public site UX updates`).
- Pushed `main` to `origin`, triggering GitHub Actions run `25569422545`.
- Confirmed the `Render and Publish Quarto Site` workflow completed successfully, including `Deploy to GitHub Pages`.
- Aligned `scripts/validate_deployed_site.R` with the current homepage secondary CTA copy (“Explorar os 12 módulos”).

### Validation

- `git diff --check` passed.
- `Rscript --vanilla scripts/validate_site_manifest.R` passed.
- `HOME=/private/tmp/quarto-home PATH=... Rscript --vanilla scripts/prepublish_site_check.R` passed, including full `quarto render`.
- GitHub Actions deployment completed successfully.

### Pending items

- Run deployed-site validation after the validator-copy alignment is pushed.
- Keep the remaining untracked local files out of publication unless explicitly needed: `.agents/`, `.vscode/`, `AUTOMATION_SITE.md`.

---

## 2026-05-09 — Long public UX evolution block: hero proof, completion flow and certificate components

### Block objective

Execute a long, site-only public visual/UX evolution block following `NEXT_SITE.md` as the main contract after the previous publication. Do not alter the app and do not publish automatically.

### Cycles executed

1. Diagnosis: the homepage first viewport had strong title and CTAs, but the dark logo panel communicated little beyond identity.
   Implementation: added `.hero-panel-proof` under the logo with a concise 12-module learning promise.
   Testing: included in the full Quarto render through `scripts/prepublish_site_check.R`.
   Notes: keeps the first viewport public/editorial and avoids adding admin-like controls.

2. Diagnosis: the module index explained phases and study route, but the completion/certificate path was less visible before entering modules.
   Implementation: added certificate completion language to the module landing panel and a final “Entender o certificado” CTA.
   Testing: included in full render and whitespace diff check.
   Notes: reinforces the learning journey without changing module content.

3. Diagnosis: the certificate page still relied on large inline style blocks for the preview and form, making visual maintenance harder.
   Implementation: moved the certificate preview, name band, footer, form and actions to public CSS classes.
   Testing: checked that `certificado.qmd` no longer contains `style=""` inline attributes; full render passed.
   Notes: improves public component reuse and dark-mode maintainability.

4. Diagnosis: the certificate form used color/border changes for invalid input without a semantic invalid state or described help.
   Implementation: added `autocomplete="name"`, `aria-describedby`, `aria-invalid` handling and CSS for invalid state.
   Testing: JavaScript syntax passed as part of prepublish; rendered certificate page passed.
   Notes: keeps all data browser-local and improves keyboard/screen-reader clarity.

5. Diagnosis: new public components need to be known by the manifest/documentation contract for future app-managed metadata.
   Implementation: added `hero-panel-proof`, `certificate-preview` and `certificate-form` to `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R`.
   Testing: `Rscript --vanilla scripts/validate_site_manifest.R` passed.
   Notes: this is structure support for public UX, not app work.

### Files changed in this block

- `NEXT_SITE.md`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `certificado.qmd`
- `data/site-manifest.yml`
- `index.qmd`
- `modules/index.qmd`
- `scripts/validate_site_manifest.R`
- `styles/main-dark.scss`
- `styles/main.scss`

### Commands executed

- `git status --short --branch`
- `git diff --check`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Site manifest validation passed.
- Whitespace/diff check passed.
- Full prepublish site check passed, including SCSS validation, JS syntax checks, module data scripts and complete Quarto render.

### Pending items

- Review the rendered homepage, module index and certificate page visually in browser/light/dark before publication.
- Publish only after explicit user request.

---

## 2026-05-09 — Rendered public UX review follow-up: hero proof, completion bridge and certificate fallback

### Block objective

Execute the `rendered-public-ux-review` block in `NEXT_SITE.md` as a site-only long block. Review the local public UX changes from the previous block, correct rendered/public-flow issues and leave the site validated without publication.

### Cycles executed

1. Diagnosis: the homepage hero proof rendered correctly, but the dark panel could carry more useful public context without becoming an app dashboard.
   Implementation: added a compact proof list inside `.hero-panel-proof` with estimated course rhythm and local-progress framing.
   Testing: rendered `index.qmd` and confirmed `.hero-panel-proof-list` / `.hero-panel-proof-item` in `docs/index.html`.
   Notes: this keeps the first viewport focused on the public learning promise.

2. Diagnosis: the module index had the certificate CTA, but the relation between studying modules, validating quizzes and emitting the certificate needed clearer editorial structure.
   Implementation: added `.modules-completion-flow` with three public steps: study, validate and emit.
   Testing: rendered `modules/index.qmd` and confirmed the completion flow in `docs/modules/index.html`.
   Notes: this improves module-to-certificate continuity without changing lesson content.

3. Diagnosis: the certificate page depends on browser-local JavaScript for progress state; without JavaScript the public page had no explicit fallback.
   Implementation: added a `.certificate-noscript` status block and kept the preview/form as real rendered HTML.
   Testing: rendered `certificado.qmd` and confirmed `certificate-noscript`, `certificate-preview` and `certificate-form` in `docs/certificado.html`.
   Notes: the certificate remains browser-local; no backend or account flow was introduced.

4. Diagnosis: tablet/mobile layouts could compress the new module completion flow and certificate preview.
   Implementation: added responsive collapse for `.modules-completion-flow`, width/box-sizing protections for `.certificate-preview` and `.certificate-form input`, and dark-mode parity for the new blocks.
   Testing: SCSS validation and static render passed.
   Notes: improves responsiveness without adding new dependencies.

5. Diagnosis: the new completion and fallback components must be part of the public component contract.
   Implementation: updated `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R` for `.modules-completion-flow` and `.certificate-noscript`.
   Testing: `Rscript --vanilla scripts/validate_site_manifest.R` passed.
   Notes: supports future app-managed metadata while keeping public content separate from app behavior.

### Files changed in this block

- `NEXT_SITE.md`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `certificado.qmd`
- `data/site-manifest.yml`
- `index.qmd`
- `modules/index.qmd`
- `scripts/validate_site_manifest.R`
- `styles/main-dark.scss`
- `styles/main.scss`

### Commands executed

- `git status --short --branch`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render index.qmd modules/index.qmd certificado.qmd --no-execute`
- `rg` inspections of rendered HTML in `docs/index.html`, `docs/modules/index.html` and `docs/certificado.html`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Site manifest validation passed.
- Whitespace/diff check passed.
- Targeted static render for homepage, module index and certificate passed.
- Full prepublish site check passed, including SCSS validation, JS syntax checks, module data scripts and complete Quarto render.

### Pending items

- Perform browser-level visual QA in light/dark mode if an interactive browser session is available.
- Publish only after explicit user request.

---

## 2026-05-09 — Browser-readiness static QA: semantic polish and publication review prep

### Block objective

Execute the `browser-visual-qa-or-publication-readiness` block in `NEXT_SITE.md` as a site-only long block. Browser/screenshot tooling was not available in this session, so the block used static Quarto rendering, generated HTML inspection and targeted semantic/responsive fixes. No publication.

### Cycles executed

1. Diagnosis: `NEXT_SITE.md` asked for browser-level visual QA, but the available tool discovery did not expose a browser automation tool, and local screenshot CLIs (`playwright`, Chrome/Chromium, `wkhtmltoimage`) were not available.
   Implementation: continued with static render evidence and documented the limitation; kept scope to public-site files.
   Testing: confirmed absence of local browser/screenshot CLIs and proceeded with Quarto render inspections.
   Notes: no app files touched.

2. Diagnosis: the homepage hero proof panel rendered correctly, but its public proof content could better support first-viewport decision-making.
   Implementation: kept the new `.hero-panel-proof-list` indicators and verified them in rendered HTML.
   Testing: inspected `docs/index.html` for `.hero-panel-proof-list` and `.hero-panel-proof-item`.
   Notes: reinforces visual/UX clarity without adding dashboard behavior.

3. Diagnosis: the module index completion bridge rendered correctly, but the top summary panel used `aria-label` on a generic `div` without an explicit semantic role.
   Implementation: added `role="note"` to `.modules-landing-panel`.
   Testing: rendered `modules/index.qmd` and confirmed the role in `docs/modules/index.html`.
   Notes: small accessibility improvement to public navigation context.

4. Diagnosis: the certificate fallback and preview rendered correctly, but the preview region and no-JavaScript fallback could be more explicit.
   Implementation: added `role="region"` to `.certificate-preview`, added a fallback link back to modules inside `.certificate-noscript`, and styled that link in light/dark mode.
   Testing: rendered `certificado.qmd` and confirmed `certificate-noscript`, fallback link and `certificate-preview` role in `docs/certificado.html`.
   Notes: certificate remains local/browser-only.

5. Diagnosis: responsive/dark public component layer should include the new completion/fallback components consistently.
   Implementation: kept `.modules-completion-flow`, `.certificate-noscript`, `.certificate-preview` and `.certificate-form` in the manifest/documentation/validation contract and added consolidated SCSS coverage for wrapping, state and dark-mode link color.
   Testing: `Rscript --vanilla scripts/validate_site_manifest.R` and `git diff --check` passed.
   Notes: improves future app-managed metadata readiness without app changes.

### Files changed in this block

- `NEXT_SITE.md`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `certificado.qmd`
- `data/site-manifest.yml`
- `index.qmd`
- `modules/index.qmd`
- `scripts/validate_site_manifest.R`
- `styles/main-dark.scss`
- `styles/main.scss`

### Commands executed

- `git status --short --branch`
- `tool_search` for browser/local inspection tooling
- `command -v wkhtmltoimage`
- `command -v chromium`
- `command -v google-chrome`
- `command -v playwright`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render modules/index.qmd certificado.qmd --no-execute`
- `rg` inspections of rendered HTML in `docs/modules/index.html` and `docs/certificado.html`
- `git diff --check`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Targeted static render for module index and certificate passed.
- Rendered HTML contained the expected semantic roles and fallback link.
- Site manifest validation passed.
- Whitespace/diff check passed.
- Full prepublish site check passed, including SCSS validation, JS syntax checks, module data scripts and complete Quarto render.

### Pending items

- Run true browser visual QA with screenshots if browser tooling becomes available.
- Publish only after explicit user request.

---

## 2026-05-09 — Public support-flow UX block: search, glossary and route return guidance

### Block objective

Execute another long, site-only public UX evolution block while following `NEXT_SITE.md`. Because local browser/screenshot tooling remains unavailable, use Quarto static renders and generated HTML inspection. Do not publish.

### Cycles executed

1. Diagnosis: the homepage first viewport introduced the study cycle but did not explicitly connect that cycle to completion.
   Implementation: extended `.hero-signal` copy to mention that completed quizzes close the trail in the certificate.
   Testing: rendered `index.qmd` and confirmed the updated sentence in `docs/index.html`.
   Notes: small first-viewport clarity improvement without adding another CTA.

2. Diagnosis: search and glossary acted as support pages but did not explicitly tell users how to return to the main learning path.
   Implementation: added `.utility-return-guide` blocks to `busca.qmd` and `glossario.qmd` with restrained return CTAs.
   Testing: rendered both pages and confirmed `.utility-return-guide` in `docs/busca.html` and `docs/glossario.html`.
   Notes: keeps utility pages public and learning-oriented, not administrative.

3. Diagnosis: the weekly route explained rhythm but did not visually separate the final evidence/checkpoint before certification.
   Implementation: added `.route-finish-band` to `semanas/index.qmd` connecting weekly work, quizzes and certificate readiness.
   Testing: rendered `semanas/index.qmd` and confirmed `.route-finish-band` in `docs/semanas/index.html`.
   Notes: reinforces study completion without changing scientific lesson content.

4. Diagnosis: new support-flow blocks needed responsive and dark-mode treatment to avoid button compression and contrast drift.
   Implementation: added shared SCSS for `.utility-return-guide`, `.route-finish-band`, their action groups and dark-mode colors.
   Testing: SCSS validation passed inside the final prepublish gate.
   Notes: buttons collapse to one-column behavior through the existing public component system.

5. Diagnosis: the new public support-flow components need to be part of the future app-management contract.
   Implementation: updated `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md` and `scripts/validate_site_manifest.R` for `utility-return` and `route-finish` regions.
   Testing: `Rscript --vanilla scripts/validate_site_manifest.R` passed.
   Notes: this remains site metadata and public component governance, not app work.

### Files changed in this block

- `NEXT_SITE.md`
- `PUBLIC_SITE_COMPONENTS.md`
- `WORKLOG_SITE.md`
- `busca.qmd`
- `data/site-manifest.yml`
- `glossario.qmd`
- `index.qmd`
- `scripts/validate_site_manifest.R`
- `semanas/index.qmd`
- `styles/main-dark.scss`
- `styles/main.scss`

### Commands executed

- `git status --short --branch`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `git diff --check`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render busca.qmd glossario.qmd semanas/index.qmd --no-execute`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home quarto render index.qmd --no-execute`
- `rg` inspections of rendered HTML in `docs/index.html`, `docs/busca.html`, `docs/glossario.html` and `docs/semanas/index.html`
- `PATH="/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin:$PATH" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

### Test results

- Site manifest validation passed.
- Whitespace/diff check passed.
- Targeted static renders passed for homepage, search, glossary and study route.
- Full prepublish site check passed, including SCSS validation, JS syntax checks, module data scripts and complete Quarto render.

### Pending items

- Run true browser visual QA with screenshots if browser tooling becomes available.
- Publish only after explicit user request.
