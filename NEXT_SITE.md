# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution. Do not publish automatically unless explicitly requested.

## Tipo do próximo bloco

`script-lab-rollout-proof-and-publication-readiness`

## Objective

Finalize publication-readiness after the full script-lab rollout by restoring local Quarto availability, producing targeted render proof for representative modules, and running browser QA for script-lab UX consistency.

## Current local state

- GitHub Actions deployment failure on 2026-05-12 was diagnosed as a rerun artifact collision, not a Quarto/R/Pagefind content failure.
- `.github/workflows/quarto-publish.yml` now uses an attempt-specific Pages artifact name (`github-pages-${{ github.run_attempt }}`) for both upload and deploy.
- The script-lab pattern is now present in all 12 module pages.
- `scripts/validate_site_manifest.R` now enforces `module-script-lab` plus matching script/CSV links for every module.
- Full prepublish validation passed locally after dependency restore, including manifest, YAML, SCSS, JS, module scripts and whitespace checks.
- `scripts/prepublish_site_check.R` skipped Quarto render because `quarto` is not currently available on local `PATH`.
- A direct targeted render attempt for modules 03, 06 and 11 failed locally with `quarto: command not found`.
- `WORKLOG_SITE.md` includes the completed rollout block and current validation status.
- The site remains static on GitHub Pages; no backend runtime should be assumed.

## Product direction for module pages

- Keep modules as public editorial learning labs: concept -> script -> output -> interpretation -> exercise -> quiz -> next decision.
- Preserve the current static reproducibility strategy:
  - rendered Quarto code/output in-page;
  - downloadable `scripts/moduloXX.R`;
  - downloadable `data/moduloXX_simulado.csv`.
- Avoid app-like interaction or backend assumptions unless explicitly requested.

## In scope

- Verify the next `Render and Publish Quarto Site` workflow reaches `Deploy to GitHub Pages` successfully after the artifact-name fix.
- Confirm `https://mgenetica.github.io/` returns `200` after deployment.
- Restore/expose local Quarto binary in the shell path used for validation runs.
- Run targeted Quarto render for representative modules:
  - `modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd`
  - `modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd`
  - `modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd`
- Inspect generated HTML for script-lab links and structural consistency.
- Run browser QA (desktop/tablet/mobile) for representative modules focusing on:
  - script-lab readability,
  - CTA wrapping/focus visibility,
  - no document-level horizontal overflow.
- Run full prepublish validation again with Quarto render actually executed.
- Update `WORKLOG_SITE.md` and `NEXT_SITE.md` with outcomes.

## Out of scope

- App changes.
- Backend execution, authentication, notebooks-as-a-service or user account features.
- New large dependencies unrelated to render/QA proof.
- Automatic publication without explicit user request.

## Recommended commands

- `git status --short --branch`
- `command -v quarto`
- `quarto render modules/modulo03-estatistica-descritiva-e-exploracao-de-dados-no-r.qmd modules/modulo06-correlacoes-geneticas-e-fenotipicas.qmd modules/modulo11-controle-de-qualidade-de-dados-genomicos.qmd --no-execute`
- `Rscript --vanilla scripts/validate_site_manifest.R`
- `Rscript --vanilla -e 'sass::sass_file("styles/main.scss") |> invisible(); sass::sass_file("styles/main-dark.scss") |> invisible(); cat("scss ok\n")'`
- `Rscript scripts/prepublish_site_check.R`
- `git diff --check`

## Criteria for completion

- Latest GitHub Actions deployment completes successfully with the attempt-specific Pages artifact.
- Public GitHub Pages URL returns `200`.
- Quarto is available locally for the validation shell path.
- Targeted render passes for modules 03, 06 and 11.
- Rendered HTML confirms script-lab block and correct script/CSV links in representative modules.
- Browser QA confirms responsive readability and no document-level overflow on representative modules.
- Full prepublish gate passes with Quarto render executed (not skipped).
- No app files are changed.
