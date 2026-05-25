# Course Structure Redesign Design

Date: 2026-05-25
Scope: public Quarto site and internal React course app

## Goal

Make the MGenetica course hierarchy clear and consistent across the public site and the internal learner app.

Canonical hierarchy:

Course MGenetica
-> Theme / main module
-> Study block M1-M21
-> Reading, concept, exercise, R lab, quiz

The course has five main themes. The labels M1-M21 are study blocks distributed under those themes; they are not the main course themes.

## Current Problems

- The app catalog presents M1-M21 as a flat list, which makes them look like top-level modules.
- Course cards vary visually because description lengths change card height and action placement.
- Individual block pages render too wide and too dense for comfortable reading.
- The block page exposes the complete imported Markdown in a `Markdown original` section.
- Quiz submission fails with `Missing "execute" permission for role "users"`.
- Scientific and genetic notation needs more readable rendering than plain text or raw Markdown.

## Selected Approach

Use all three discussed approaches, but phased:

1. Shared course-structure model as the foundation.
2. UI correction on top of that model for immediate visible quality.
3. Limited content-pipeline cleanup only where current generated content creates the user-facing issue.

This avoids a full platform rewrite while fixing the structural cause.

## Architecture

Add or normalize a shared course-structure layer that exposes:

- Course metadata.
- Five theme records.
- Study blocks assigned to each theme.
- Five standard parts for each study block.

The app should consume this structure for catalog grouping and block-page context. The public Quarto site should mirror it in module index/navigation text and any structure data used to generate public pages.

The current Express backend and Appwrite functions remain in place. There is no NestJS migration in this work because the repository is not a NestJS app and the requested fixes do not require that blast radius.

## App Components

### Catalog Page

Render five theme groups. Each theme shows a short summary and its study blocks as standardized cards.

Each study-block card should have:

- Stable badge row: M number, theme, progress.
- Title.
- Bounded description preview.
- Status/progress area.
- Aligned `Open page` action at the bottom.

### Study Block Page

Render the block as a learning page, not a raw import dump.

The page should show:

- Course and theme context.
- Study block identity.
- A five-part learning path: Reading, Concept, Exercise, R Lab, Quiz.
- Comfortable reading width.
- Responsive containment for formulas, tables, code, and long terms.
- No raw `Markdown original` section.

### Quiz Page

Keep the current quiz bank and submission flow, but fix execution permissions/configuration so authenticated users can execute the quiz function.

Errors should be normalized into useful learner-facing messages without exposing backend internals.

## Public Site Components

The public Quarto site should communicate the same hierarchy:

- The module index should introduce the five main themes.
- M1-M21 should be labeled as study blocks inside those themes.
- Public navigation and page headings should avoid implying M1-M21 are the top-level course themes.
- Module pages should retain editorial/scientific tone and use the same five-part structure where practical.

This is site evolution, not app administration. No backend/auth work should be added to the public site.

## Data Flow

1. Source course data defines themes, study blocks, and standard parts.
2. App catalog loads module rows and groups them through the shared structure.
3. App block page formats selected module details into five learner-facing parts.
4. App quiz page calls Appwrite quiz function for get/submit.
5. Public Quarto pages/index consume the same hierarchy manually or through existing generation scripts where available.

## Math And Scientific Rendering

Prefer lightweight formatting first:

- Format formulas and genetic notation as dedicated inline/block elements.
- Preserve R code as code blocks.
- Keep table/code overflow contained.
- Avoid adding a heavy math dependency unless existing content requires full TeX parsing.

If formula content already uses TeX-style syntax, enable the existing Quarto/HTML math support on the public site and add a minimal app-side renderer only if needed.

## Error Handling

- Missing quiz execute permission should be handled by configuration, not hidden in UI copy.
- Auth/session failures should say the learner must refresh or sign in again.
- Service failures should say learning services are temporarily unavailable.
- Invalid course/quiz IDs should remain rejected by functions.

## Testing

Run available checks after implementation:

- `npm test` and `npm run build` in `frontend`.
- Backend tests if backend files are touched.
- `node --check` for touched Appwrite/backend JavaScript.
- Site validation scripts.
- Quarto/site render or documented skip path if render produces source-side artifacts.

Manual verification:

- Catalog shows 5 theme groups and aligned cards.
- A study block page has no raw `Markdown original`.
- Mobile width has no horizontal overflow.
- Quiz get/submit no longer fails for authenticated users because of execute permissions.
- Public module index communicates the same hierarchy.

## Non-Goals

- No NestJS migration.
- No full LMS rebuild.
- No new authentication system.
- No wholesale rewrite of the 21 lesson texts.
- No automatic publish, push, or deployment without explicit instruction.

## Implementation Phases

1. Normalize shared hierarchy and app catalog grouping.
2. Redesign study-block page structure and remove raw Markdown display.
3. Standardize card/page CSS and overflow handling.
4. Fix Appwrite quiz execute configuration and error copy.
5. Align public Quarto course index/navigation with the five-theme model.
6. Run validation and update `WORKLOG_SITE.md` / `NEXT_SITE.md` for site-side changes.

## Self-Review

- No unresolved placeholders.
- Scope is explicit: public site plus internal course app.
- The design avoids broad backend migration.
- The chosen architecture directly addresses the structural M1-M21 confusion.
- Testing covers frontend, functions, and public-site validation.
