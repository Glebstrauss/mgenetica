# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution.

## Tipo do próximo bloco

`post-publication-qa`

Use this as the default interpretation for the next block: verify the published site after the recent deployment, then run a true interactive rendered QA pass (light + dark, with devtools) for the recently added public UX components.

## Objective

Complete post-publication QA of the deployed site, then inspect the homepage first viewport + CTA hierarchy, the module index route band and representative module pages around the pre-quiz checkpoint (including dark mode focus/skip-link behavior), making only small polish fixes justified by rendered evidence.

Rendered-QA prerequisite: `quarto` must be available on `PATH`. If it is not, treat making Quarto available as the blocking next action before any new visual judgement.

Notes from the last block:
- In this Codex sandbox, `quarto preview` failed to bind a local port (`PermissionDenied`). Run the interactive QA in a normal terminal environment where preview can listen on localhost.
- If you need the vendored Quarto used in the sandbox, it was found at `/Users/glebstrauss/Library/Application Support/Lexis Local/vendor/quarto-1.9.37/bin/quarto`.
- If Quarto render fails with Sass cache errors on macOS, run with a clean HOME like `HOME=/private/tmp/quarto-home` (or another writable temp dir).
- Recent publication: commit `994de9e` was pushed to `main` and GitHub Actions run `25569422545` completed deployment successfully.

## In scope

- `Rscript scripts/validate_deployed_site.R` against the published GitHub Pages site.
- Local interactive rendered QA with `quarto preview` (preferred).
- Visual review of homepage first viewport and CTA hierarchy (hero + mid-page + final CTA).
- Visual review of module index flow around the route band (ensure it does not compete with header CTAs).
- Visual review of representative module pages with the pre-quiz checkpoint.
- Mobile/tablet checks for the new components and focus-visible styling.
- Small CSS or copy polish directly tied to rendered evidence.
- `WORKLOG_SITE.md` and `NEXT_SITE.md` updates.

## Out of scope

- App changes.
- Backend, CMS, authentication or new dependencies.
- Automatic publication, commit or push.
- Broad redesigns or scientific lesson rewrites.
- Manifest-only, validation-only or deployment-only work as the main task.
- Removing ignored/generated outputs unless explicitly requested.

## Priorities

1. Confirm changed files are site-only and preserve pre-existing local changes.
2. Check whether `quarto` is available on `PATH`.
3. If not available, record the blocker and obtain a working `quarto` install / PATH entry before attempting visual QA.
4. If available, run `quarto preview` and inspect homepage, module index and one representative module page.
5. Use the browser/devtools to check light and dark themes, including keyboard navigation focus rings and skip-link behavior.
6. Make only small rendered-safe polish fixes tied to evidence.
7. Run available validation and update records (do not publish unless explicitly requested).

## Planned cycles

### Cycle 1 — Render setup

- Run `git status --short --branch`.
- Check `command -v quarto`.
- Start local preview only if available.

### Cycle 2 — Homepage visual QA

- Inspect the first viewport and the new `.hero-learning-path`.
- Confirm CTA hierarchy, spacing and text wrapping.
- Fix only concrete issues found.

### Cycle 3 — Module index visual QA

- Inspect `.modules-route` between guidance and phase cards.
- Verify module-index raw-HTML actions navigate to rendered pages (`.html`), not source files (`.qmd`).
- Confirm the new actions do not compete with the main catalog.
- Fix only concrete issues found.

### Cycle 4 — Module page visual QA

- Inspect a beginning, middle and final module page around `.module-study-checkpoint`, quiz and module navigation.
- Verify the module nav cards (raw HTML) link to rendered outputs (`.html`), not `*.qmd`.
- Confirm the checkpoint helps transition to the quiz without crowding.
- Fix only concrete issues found.

### Cycle 5 — Mobile/accessibility QA

- Check mobile/tablet stacking and keyboard focus behavior for the new components.
- Confirm no horizontal overflow, clipped CTA text or weak dark-mode contrast (especially for focus rings and the skip-link).
- Fix only concrete issues found.

### Cycle 6 — Validation and records

- Run available validation.
- Update `WORKLOG_SITE.md` and `NEXT_SITE.md`.
- Do not publish unless explicitly requested.

## Criteria for completion

- Changes remain site-only.
- No app files are altered.
- Rendered QA is completed in a `quarto preview` environment, or unavailability is recorded with a concrete next action to obtain a render.
- Any polish is tied to homepage, module index, module page flow, responsiveness or accessibility.
- `WORKLOG_SITE.md` records diagnosis, implementation and validation notes.
- `NEXT_SITE.md` is updated with the next concrete site-only action.
- Changes are not committed, pushed or published unless the user explicitly requests publication.

## Recommended commands

- `git status --short --branch`
- `command -v quarto`
- `quarto preview`
- `HOME=/private/tmp/quarto-home quarto render` (only if needed to workaround Sass cache issues)
- `Rscript scripts/prepublish_site_check.R`
- `Rscript scripts/validate_site_manifest.R`
- `git diff --check`
- `rg 'href=\".*\\.qmd\"' modules`

Use `Rscript scripts/validate_deployed_site.R` only after publication or when specifically checking the deployed site.
