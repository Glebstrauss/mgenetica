# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution.

## Objective

Publish and verify the homepage hero SCSS cleanup, then either continue one more conservative stylesheet pass or document the current public component patterns.

## Scope

In scope:

- Local prepublish validation for the current hero SCSS cleanup.
- Commit/push of the current site-only changes if validation passes.
- GitHub Pages workflow monitoring.
- Deployed validation after publication.
- Homepage and module-index spot checks if cache timing or layout concerns appear.
- One additional low-risk SCSS cleanup group, only after deployed validation is healthy.
- Optional short public component documentation if further CSS deletion is not clearly low risk.
- `WORKLOG_SITE.md` and `NEXT_SITE.md`.

Out of scope:

- App changes.
- Backend, CMS, authentication or new dependencies.
- Large redesigns.
- Broad SCSS deletion without rendered comparison.
- Public-content rewrites unrelated to component structure.

## Priorities

1. Run `Rscript scripts/prepublish_site_check.R`.
2. Confirm changed files are site-only.
3. Commit and push the hero SCSS cleanup.
4. Watch GitHub Pages to completion.
5. Run `Rscript scripts/validate_deployed_site.R`.
6. Decide between one more small SCSS cleanup group and documenting current public component patterns.

## Planned cycles

### Cycle 1 — Publish current hero cleanup

- Review git diff and changed-file scope.
- Run the full prepublish gate.
- Commit and push only if validation passes.

### Cycle 2 — Deployed QA

- Watch the GitHub Pages workflow.
- Run deployed-site validation.
- Fetch representative pages if cache timing causes uncertainty.

### Cycle 3 — Homepage/component parity check

- Prefer `quarto preview` if the CLI becomes available in the environment.
- If `quarto` remains unavailable locally, rely on GitHub Pages render plus deployed validation and document the limitation.
- Prioritize homepage and module-index behavior because the recent cleanups touched shared hero/card/grid styles.

### Cycle 4 — Next maintainability step

- If CSS duplication is still clearly superseded, remove one small additional group.
- If further deletion is ambiguous, add short documentation for public component patterns instead of forcing a risky cleanup.
- Preserve layout, pseudo-element structure and responsive behavior unless rendered evidence supports a change.

### Cycle 5 — Records

- Run available validation.
- Publish if rendered behavior changed.
- Update `WORKLOG_SITE.md` and prepare the next `NEXT_SITE.md`.

## Criteria for completion

- Changes remain site-only.
- No app files are altered.
- Local prepublish passes.
- GitHub Pages workflow succeeds for published changes.
- Deployed-site validation passes after publication.
- Any CSS cleanup is backed by compiled, deployed or rendered verification.
- `WORKLOG_SITE.md` and `NEXT_SITE.md` are updated.

## Recommended commands

- `Rscript scripts/prepublish_site_check.R`
- `Rscript scripts/validate_site_manifest.R`
- `Rscript scripts/validate_deployed_site.R`
- `git diff --check`
- `git status --short --branch`
- `git add ...`
- `git commit -m "..."`
- `git push origin main`
- `gh run list --repo Glebstrauss/mgenetica --workflow quarto-publish.yml --limit 3`
- `gh run watch <run-id> --repo Glebstrauss/mgenetica --exit-status`
