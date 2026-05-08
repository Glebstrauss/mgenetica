# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution.

## Objective

Publish and verify the quiz-contract hardening block, then use Quarto/local preview if available for one small rendered-safe improvement to the public learning flow.

## Scope

In scope:

- Local prepublish validation for the quiz manifest/deployed-validation changes.
- Commit/push of the current site-only changes if validation passes.
- GitHub Pages workflow monitoring.
- Deployed validation after publication, including deployed quiz JSON checks.
- A small follow-up improvement to homepage, module index or module pages backed by rendered evidence when possible.
- `WORKLOG_SITE.md` and `NEXT_SITE.md`.

Out of scope:

- App changes.
- Backend, CMS, authentication or new dependencies.
- Broad SCSS deletion without rendered comparison.
- Scientific lesson rewrites unrelated to the public learning flow.
- Removing ignored/generated outputs unless explicitly requested.

## Priorities

1. Run `Rscript scripts/prepublish_site_check.R`.
2. Confirm changed files are site-only.
3. Commit and push the quiz-contract hardening.
4. Watch GitHub Pages to completion.
5. Run `Rscript scripts/validate_deployed_site.R`.
6. If continuing locally, try `quarto preview` or the available local render path before visual/CSS changes.

## Planned cycles

### Cycle 1 — Publish current quiz-contract hardening

- Review git diff and changed-file scope.
- Run the full prepublish gate.
- Commit and push only if validation passes.

### Cycle 2 — Deployed QA

- Watch the GitHub Pages workflow.
- Run deployed-site validation.
- Confirm ignored/generated local outputs are not staged.

### Cycle 3 — Local rendered setup

- Check whether `quarto` is available on `PATH`.
- If available, run `quarto preview` for local rendered QA.
- If unavailable, prefer validation/documentation/content-structure work over visual deletion.

### Cycle 4 — Small rendered-safe improvement

- Prefer homepage, module index or module page flow.
- Keep edits small, public-site-only and compatible with manifest contracts.
- Run targeted validation during the cycle.

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
- Any visual/CSS change is backed by compiled, deployed or rendered verification.
- `WORKLOG_SITE.md` and `NEXT_SITE.md` are updated.

## Recommended commands

- `Rscript scripts/prepublish_site_check.R`
- `Rscript scripts/validate_site_manifest.R`
- `Rscript scripts/validate_deployed_site.R`
- `git diff --check`
- `git status --short --branch`
- `git add data/site-manifest.yml scripts/validate_site_manifest.R scripts/validate_deployed_site.R PUBLIC_SITE_COMPONENTS.md WORKLOG_SITE.md NEXT_SITE.md`
- `git commit -m "Harden module quiz contracts"`
- `git push origin main`
- `gh run list --repo Glebstrauss/mgenetica --workflow quarto-publish.yml --limit 3`
- `gh run watch <run-id> --repo Glebstrauss/mgenetica --exit-status`
