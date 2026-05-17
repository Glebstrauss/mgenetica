# MGenética Academy - Roadmap & Project Plan

## 1. Product Vision

Transform MGenética from a static course website into a **scientific interactive learning platform** that bridges biological theory, R simulation and technical interpretation with a premium academic-grade public experience.

## 2. Current Product Baseline

### Current Stack (v5 public site)

- **Engine:** Quarto static website.
- **Language:** R for teaching scripts, generated data and validation.
- **Frontend:** SCSS plus vanilla JavaScript.
- **Hosting:** GitHub Pages.
- **Current public direction:** editorial, institutional and multilingual, not app-like.

### Verified v5 state as of 2026-05-17

- Phase 1-4 public-site redesign is complete locally and ready for review.
- PT-BR, EN and ES public trees exist for homepage, utility pages, roadmap, module index and 12 module detail pages.
- The active brand typography is DM Sans with DM Serif Display emphasis, replacing the older Inter-oriented plan.
- The publication workflow depends on `scripts/prepublish_site_check.R` and a full Quarto render path when publishing.

## 3. UI/UX Enhancement Plan

### Phase 1-4: Public-site redesign foundation

- [x] Brand typography reset applied to the public shell.
- [x] Homepage simplified in PT-BR, EN and ES.
- [x] Navigation and footer simplified for the public editorial journey.
- [x] Module index redesigned in PT-BR, EN and ES.
- [x] Localization routing and metadata aligned for the full public page tree.
- [x] Prepublish render path hardened for localized Quarto output.

### Current follow-up block

- [ ] Polish internal module detail pages for reading rhythm, density and CTA continuity.
- [ ] Run wider browser QA across representative localized module detail pages.
- [ ] Publish only on explicit request after the final validation pass.

### Phase 5+: Interactive experience (v6 exploration)

- [ ] Evaluate WebR selectively for module-level interactive labs where it improves learning without turning the site into an admin tool.
- [ ] Improve public progress and completion feedback while keeping the experience visitor-facing and browser-local by default.
- [ ] Introduce richer client-side transitions or micro-interactions only where they support scientific clarity and reading flow.
- [ ] Reassess whether a component shell beyond Quarto is justified after the current public-site model is fully stable.

## 4. Performance And Maintainability

- **SCSS organization:** split the large styling surface into clearer design-system sections as active redesign rules stabilize.
- **Conditional scripts:** keep quiz and interactive assets off pages that do not need them.
- **Output efficiency:** monitor localized output size and avoid unnecessary asset duplication.
- **Critical path:** keep publication-friendly performance suitable for GitHub Pages and static delivery.

## 5. Security And Publication Approach

- **Static-first safety:** keep public delivery backend-free unless a future explicit product decision changes that.
- **Client-side execution:** if WebR is introduced later, treat it as a scoped educational enhancement, not a blanket architecture switch.
- **Publication gate:** run the prepublish validation suite before publication and keep Pages deployment concerns separate from site-content status.

## 6. Project Status And Interoperability

- `project_status.md` is the operational status snapshot for agents.
- `NEXT_SITE.md` is the next-block contract.
- `WORKLOG_SITE.md` is the verified execution history.
- `BACKLOG_SITE.md` is the open public-site todo list.

These records must stay aligned with the real validated state of the public site, not with older aspirational phase wording.
