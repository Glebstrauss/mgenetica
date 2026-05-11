# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution. Do not publish automatically unless explicitly requested.

## Tipo do próximo bloco

`roll-out-module-script-labs-and-learning-flow`

## Objective

Roll out the module script-lab learning pattern across the remaining module pages so every module makes its R script, generated output artifact, parameter-change task and interpretation prompt explicit.

## Current local state

- The last publication completed successfully through GitHub Actions and deployed-site validation at commit `5d481f9`.
- Public-page structural simplification and SCSS pruning are already published.
- The current local, unpublished site-only work adds the first implementation of the `module-script-lab` pattern to representative modules:
  - Module 01: selection response and genetic gain;
  - Module 02: phenotypic variance decomposition and heritability;
  - Module 08: BLUP, EBV ranking and selection decisions;
  - Module 12: matrix G, GWAS and GBLUP.
- `_quarto.yml` now publishes `scripts/modulo*.R` and `data/modulo*_simulado.csv` as static learning resources.
- `styles/main.scss` and `styles/main-dark.scss` contain light/dark styling and responsive behavior for `.module-script-lab`, `.module-script-lab-grid` and `.module-script-lab-item`.
- `data/site-manifest.yml`, `PUBLIC_SITE_COMPONENTS.md`, `scripts/validate_site_manifest.R` and `scripts/validate_deployed_site.R` were updated to recognize/protect the representative script-lab pattern.
- Targeted render passed for Modules 01, 02, 08 and 12.
- Rendered HTML inspection confirmed the representative pages contain script-lab blocks and links to the standalone R scripts and generated CSV outputs.
- Resource inspection confirmed representative scripts and CSVs are copied into `docs/`.
- Full prepublish validation passed after the representative script-lab implementation.
- The site is static on GitHub Pages. Do not assume a backend R runtime exists for live per-user execution in production.
- Pre-existing untracked local files remain unrelated and untouched: `.agents/`, `.vscode/`, `AUTOMATION_SITE.md`.

## Product direction for module pages

- Treat each module page as a guided learning lab, not just a long article.
- Preserve the premium scientific/editorial tone while making the learning path operational: concept -> script -> output -> interpretation -> exercise -> quiz -> next module.
- Make the R examples feel usable inside the page wherever feasible:
  - first priority: render and explain the exact code/output in Quarto;
  - second priority: expose the corresponding full `scripts/moduloXX.R` file and generated `data/moduloXX_simulado.csv` as clear reproduction assets;
  - third priority: add lightweight browser interactions that mirror selected script parameters when they improve learning and do not require backend execution;
  - only consider WebR or browser-side R execution after a feasibility check for load time, package support, accessibility and GitHub Pages stability.
- Avoid turning module pages into an app-like coding environment. The public site should remain editorial, stable and easy to scan.

## In scope

- Add `module-script-lab` blocks to Modules 03, 04, 05, 06, 07, 09, 10 and 11.
- Keep each script-lab block concise and module-specific:
  - core question answered by the script;
  - link to `../scripts/moduloXX.R`;
  - link to `../data/moduloXX_simulado.csv`;
  - what to change in the script;
  - what output to inspect;
  - one interpretation prompt that supports the quiz and exercise.
- After rollout, strengthen `scripts/validate_site_manifest.R` so every module requires a script-lab block and matching script/CSV links.
- Render representative early, middle and late modules after rollout and inspect generated HTML links.
- Check mobile/responsive behavior of the script-lab grid through rendered HTML and browser QA if tooling is available.
- Run full prepublish validation at the end.

## Out of scope

- App changes.
- Backend execution, authentication, notebooks-as-a-service, server-side R sessions or user accounts.
- Large new dependencies without a feasibility pass.
- Automatic publication without explicit user request.
- Cleanup of unrelated untracked local files.

## Recommended commands

- `git status --short --branch`
- `rg -n "module-script-lab|scripts/modulo..\\.R|data/modulo.._simulado\\.csv" modules data scripts styles _quarto.yml`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\\n")'`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home quarto render modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd --no-execute`
- `PATH="/Applications/RStudio.app/Contents/Resources/app/quarto/bin:/Users/glebstrauss/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" HOME=/private/tmp/quarto-home Rscript scripts/prepublish_site_check.R`

## Criteria for completion

- All 12 module pages expose a clear script-lab block.
- Users can identify the standalone script, generated output artifact and interpretation task for every module.
- Code examples remain rendered and reproducible through the existing Quarto build.
- Any browser-side interaction remains lightweight, accessible and framed as a learning aid, not a replacement for R.
- Quizzes and exercises feel connected to script evidence.
- Module pages remain responsive and readable on mobile.
- Manifest validation, SCSS validation, targeted module render and full prepublish gate pass.
- No app files are changed.
