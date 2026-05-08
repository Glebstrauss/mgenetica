# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution.

## Objective

Publish and verify the public component documentation, then use it to guide the next conservative site-maintenance step.

## Scope

In scope:

- Local prepublish validation for the current documentation change.
- Commit/push of the current site-only changes if validation passes.
- GitHub Pages workflow monitoring.
- Deployed validation after publication.
- Review of `PUBLIC_SITE_COMPONENTS.md` against current public page patterns.
- One small follow-up improvement: either a low-risk SCSS cleanup with clear evidence or a manifest/page-pattern validation enhancement.
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
3. Commit and push the documentation change.
4. Watch GitHub Pages to completion.
5. Run `Rscript scripts/validate_deployed_site.R`.
6. Choose the next small maintenance step using `PUBLIC_SITE_COMPONENTS.md` as the reference.

## Planned cycles

### Cycle 1 — Publish current documentation

- Review git diff and changed-file scope.
- Run the full prepublish gate.
- Commit and push only if validation passes.

### Cycle 2 — Deployed QA

- Watch the GitHub Pages workflow.
- Run deployed-site validation.
- Confirm no generated or ignored local outputs are accidentally staged.

### Cycle 3 — Documentation alignment

- Compare `PUBLIC_SITE_COMPONENTS.md` with the current homepage, module index, module pages, utility pages and profile page.
- Tighten documentation only if it is inaccurate or too broad.

### Cycle 4 — Next maintainability step

- Prefer a validation enhancement if rendered CSS parity cannot be checked locally.
- Only remove another SCSS group if it is clearly superseded and compiled/deployed verification is enough.
- Preserve layout, pseudo-element structure, responsive behavior and dark-mode parity.

### Cycle 5 — Records

- Run available validation.
- Publish if rendered behavior or validation contracts changed.
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
