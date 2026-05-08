# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution.

## Objective

Publish and verify the public component documentation validation, then continue with one small site-maintenance improvement backed by validation or rendered evidence.

## Scope

In scope:

- Local prepublish validation for the current validation enhancement.
- Commit/push of the current site-only changes if validation passes.
- GitHub Pages workflow monitoring.
- Deployed validation after publication.
- Review of ignored/generated local outputs before staging.
- One small follow-up improvement: either a low-risk manifest/page-pattern validation enhancement or a rendered-verifiable CSS cleanup.
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
3. Commit and push the validation enhancement.
4. Watch GitHub Pages to completion.
5. Run `Rscript scripts/validate_deployed_site.R`.
6. Choose the next small maintenance step.

## Planned cycles

### Cycle 1 — Publish current validation enhancement

- Review git diff and changed-file scope.
- Run the full prepublish gate.
- Commit and push only if validation passes.

### Cycle 2 — Deployed QA

- Watch the GitHub Pages workflow.
- Run deployed-site validation.
- Confirm no ignored generated outputs are accidentally staged.

### Cycle 3 — Validation coverage review

- Review `scripts/validate_site_manifest.R` and `scripts/validate_deployed_site.R` for one small missing public-site contract.
- Prefer checks that protect manifest/page/component consistency without requiring rendered screenshots.

### Cycle 4 — Optional rendered-safe maintenance

- If local `quarto preview` is available, use rendered evidence for a tiny CSS cleanup.
- If local preview remains unavailable, avoid visual CSS deletion and prefer validation/documentation work.
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
