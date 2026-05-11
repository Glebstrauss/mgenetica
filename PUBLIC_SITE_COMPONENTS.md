# PUBLIC_SITE_COMPONENTS.md

Reference for public-site patterns only. This file documents the visitor-facing MGenetica site and must not be used as app/admin documentation.

## Purpose

The public site uses editorial components to explain the MGenetica learning path, organize modules and support discovery. These patterns should remain scientific, premium, clear and modular enough for future content management through the internal app.

## Source Of Truth

- `data/site-manifest.yml`: public navigation, page registry, module order, module summaries, phase membership and editable-region metadata.
- `.qmd` pages: longform teaching content, page-specific editorial copy, exercises and scientific explanation.
- `styles/main.scss` and `styles/main-dark.scss`: visual system, public components, responsive behavior and dark-mode parity.
- `assets/js/`: public interactions only, loaded conditionally where possible.
- `quizzes/`: public quiz data for module self-assessment, referenced from the module registry in the manifest.

## Page Patterns

- Homepage: brand introduction, learning promise, hero proof panel, action-choice note, public wayfinding, output-standard guidance, trust anchors, first-session guidance, path-evidence contract, initial orientation, audience fit, start-readiness criteria, module anatomy, entry-decision guidance, returning-user route, public resource support, study-readiness checkpoint, credibility/evidence band, outcome map, continuity bridge to completion, visible learning path, repeatable learning loop, phase preview and primary next actions with `.final-cta-hint` and `.final-cta-checks`.
- Module index: complete public course catalog organized from the manifest-backed module journey, with public wayfinding, concise study guidance, output-route guidance by evidence type, completion flow, phase overview, module evidence standard, module catalog, certificate-route guidance and a decisive final next-step band with `.modules-next-step-hint` and `.modules-next-step-checks`.
- Module pages: consistent module header, objectives, reading-rhythm note, short session plan, technical-scan guidance, teaching content, script-lab reproduction block, module evidence path, practical evidence contract, pre-quiz checkpoint, technical takeaways, quiz, post-quiz continuity note, close-check guidance, return decision note, practical interpretation and previous/index/next navigation.
- Utility pages: search, glossary, certificate and study route use public hero sections, public wayfinding, task-focused panels, utility panel hints, query planning, no-result recovery guidance, result-close guidance, decision guidance, utility evidence-route guidance, example guidance, route start-today, route evidence, route output-check, session-split, weekly-output, table-reading and phase-handoff guidance, certificate evidence-review/readiness/recovery/identity/next-use/final-check guidance and return-to-trail guidance.
- Institutional page: profile/about content uses `profile-hero`, `.about-wayfinding`, `.about-route`, `.about-credibility`, `.about-public-contract`, `.about-editorial-boundary`, `.about-visitor-path`, public cards, site-map cards and restrained next-step guidance.

## Component Families

- Hero components: `.hero`, `.hero-panel-proof`, `.page-hero`, `.profile-hero` introduce the page and should not coexist with Quarto's automatic title block.
- Card components: module, phase, evidence, statement, resource, profile, public-page and routine cards share border, hover, focus and wrapping behavior through the final public component layer.
- CTA groups: `.hero-actions`, `.section-cta`, `.modules-landing-actions`, `.home-continuity-actions`, `.modules-certificate-route-actions`, `.utility-next-step`, `.utility-next-step-copy`, `.route-finish-actions`, `.final-cta-hint`, `.final-cta-checks`, `.final-cta-actions`, `.modules-next-step-hint`, `.modules-next-step-checks`, `.about-next-step-actions`, navbar journey CTA and `.profile-actions` should expose a clear primary path and restrained secondary actions.
- Wayfinding components: `.public-wayfinding`, `.public-wayfinding-grid`, `.public-wayfinding-item`, `.home-wayfinding`, `.modules-wayfinding`, `.route-wayfinding`, `.utility-wayfinding`, `.certificate-wayfinding` and `.about-wayfinding` identify the visitor's current public context and offer three immediate routes without adding app-like state; route items use numbered visual badges for faster scanning.
- Session-check components: `.public-session-check`, `.public-session-check-grid`, `.public-session-check-item`, `.route-session-check`, `.utility-session-check` and `.certificate-session-check` provide visitor-facing confirmation points for leaving a page with destination, evidence and return route clear; checklist items use numbered visual badges for consistent scan rhythm.
- Module session components: `.module-session-plan`, `.module-session-plan-grid`, `.module-session-plan-item`, `.module-technical-scan`, `.module-technical-scan-grid`, `.module-technical-scan-item`, `.module-script-lab`, `.module-script-lab-grid`, `.module-script-lab-item`, `.module-close-check`, `.module-close-check-grid` and `.module-close-check-item` keep each module session bounded by question, R evidence, script reproduction, technical reading, quiz readiness and closing decision; each grid uses the same numbered visual language as public wayfinding.
- Technical output components: `.home-output-standard`, `.home-output-standard-grid`, `.home-output-standard-item`, `.home-output-standard-actions`, `.modules-output-route`, `.modules-output-route-grid`, `.modules-output-route-item`, `.route-output-check`, `.route-output-check-grid`, `.route-output-check-item`, `.certificate-evidence-review`, `.certificate-evidence-review-grid`, `.certificate-evidence-review-item`, `.utility-evidence-route`, `.utility-evidence-route-grid` and `.utility-evidence-route-item` explain how code, tables, figures and outputs become evidence; module code/output/table styling keeps `div.sourceCode`, `.cell-output-stdout`, `.cell-output-stderr`, `.cell-output-display`, `.table-responsive` and `.code-copy-button` readable and keyboard-visible without adding app-like controls.
- Learning-path components: `.hero-learning-path`, `.hero-signal`, `.hero-action-note`, `.hero-action-note-hint`, `.hero-action-note-grid`, `.hero-action-note-item`, `.home-trust-anchors`, `.home-first-session`, `.home-output-standard`, `.home-path-contract`, `.home-orientation`, `.home-audience`, `.home-start-criteria`, `.home-returning`, `.module-anatomy-grid`, `.entry-decision`, `.home-evidence`, `.home-outcome-map`, `.home-readiness`, `.home-continuity`, `.resource-grid`, `.resource-card`, `.learning-loop-grid`, `.modules-completion-flow`, `.modules-output-route`, `.modules-evidence-standard`, `.modules-certificate-route`, `.modules-next-step`, `.route-overview`, `.route-week-decision`, `.route-start-today`, `.route-recovery-plan`, `.route-session-plan`, `.route-output-check`, `.route-session-split`, `.route-evidence-ladder`, `.route-phase-handoff`, `.route-weekly-output`, `.route-table-guide`, `.route-map-intro`, `.route-finish-band`, `.module-reading-rhythm`, `.module-session-plan`, `.module-technical-scan`, `.module-script-lab`, `.module-evidence-path`, `.module-practice-contract`, `.module-study-checkpoint`, `.module-takeaways`, `.module-after-quiz`, `.module-close-check`, `.module-return-note`, `.module-phase-start` and `.module-phase-note` clarify progression without turning the site into a dashboard.
- Discovery components: `.home-discovery`, `.discovery-grid`, `.discovery-card`, `.utility-no-result`, `.utility-result-close`, `.utility-panel-hint`, `.utility-decision`, `.utility-evidence-route`, `.utility-examples` and `.utility-query-plan` connect search, glossary and route pages as learning support, not as admin utilities.
- Certificate components: `.certificate-intro`, `.certificate-scope`, `.certificate-decision`, `.certificate-evidence-review`, `.certificate-recovery`, `.certificate-next-use`, `.certificate-identity-note`, `.certificate-final-check`, `.certificate-readiness-guide`, `.certificate-status`, `.certificate-pending-hint`, `.certificate-progress-summary`, `.certificate-progress-list`, `.certificate-progress-module`, `.certificate-progress-title`, `#cert-next-pending-link`, `.certificate-actions`, `.certificate-ready`, `.certificate-preview`, `.certificate-form` and `.certificate-noscript` keep the completion flow public and editorial while the progress logic remains browser-local.
- Institutional components: `.about-route`, `.about-credibility`, `.about-public-contract`, `.about-editorial-boundary`, `.about-visitor-path`, `.site-map-grid` and `.about-next-step` keep the about page connected to public learning routes.
- Module navigation: `.module-nav` and `.module-nav-card` keep module pages connected to previous, index and next destinations; module pages should expose this block as semantic `<nav aria-label="Navegação entre módulos">`.
- Learning widgets: quizzes, progress indicators and visualizations must remain public learning aids, not admin controls. Quiz JSON files are data for public self-assessment and must stay aligned with each module's `data-module` value.

## Responsive And Accessibility Rules

- Mobile layouts should collapse to one column without horizontal overflow.
- Tables, code and generated output must remain readable on small screens, with horizontal scrolling only where it protects scientific formatting.
- Focus states should be visible on cards, links, buttons and quiz controls.
- Header, footer, `.entry-link`, `.btn`, quiz controls, navbar toggles and Quarto code-copy buttons must expose visible keyboard focus.
- When a primary CTA uses shorthand labels (e.g., `Começar M01`), the rendered link/button must include an `aria-label` with the expanded meaning (e.g., "Começar pelo Módulo 01").
- `.entry-link` actions should include an explicit `aria-label` whenever the visible text is short, repeated or destination-dependent.
- Dark mode must preserve contrast on utility pages, module pages and institutional branding.
- Floating controls should appear only where the current page needs them.

## Maintenance Rules

- Prefer manifest metadata for navigation, module order, module script paths and card summaries.
- Keep scientific lesson content in `.qmd` files.
- Keep public reproduction assets limited to teaching scripts and generated module outputs; do not publish validation, deployment or app-management scripts as learning resources.
- Avoid adding new public patterns when an existing hero, card, CTA or module-navigation pattern fits.
- Do not delete old SCSS groups unless a later active rule clearly supersedes them and validation passes.
- Do not put app/admin behavior, authentication or backend assumptions into public components.

## Validation Contracts

- `scripts/validate_site_manifest.R` protects manifest/page/module contracts, Quarto navigation sync and this documentation file.
- `scripts/validate_deployed_site.R` protects the published public pages and representative module patterns after GitHub Pages deployment.
- `scripts/prepublish_site_check.R` is the required local gate before publication.
- GitHub Actions remains the authoritative full Quarto render path when local `quarto` is not available on `PATH`.
