# WORKLOG_SITE.md

Use this file to register site-only work blocks. Do not use it for app work.

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
