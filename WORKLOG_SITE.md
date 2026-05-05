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
