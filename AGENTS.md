# AGENTS.md

## Project fronts

This repository has two distinct fronts:

- Site: the public, editorial and institutional layer of MGenética.
- App: the internal management panel for the site and the user's projects.

Do not mix these fronts. When the request is about the site, work only on the site. When the request is about the app, work only on the app. Do not alter the app during site-evolution blocks unless the user explicitly asks for an app change or a site bug is caused by a minimal shared reference that must be fixed.

## Site working mode

The site must remain public-facing, premium, scientific, modern, elegant, clear, trustworthy and technological. It should be modular enough to be managed by the internal app later, but it must not become an app-like administrative experience.

For site work:

- Diagnose before editing.
- Work in cycles: diagnose -> implement -> test -> register.
- Do not stop after one small correction if the user requested a larger block.
- Do not stop only because the build passes.
- Cover the highest-impact public-site issues first.
- Keep site evolution separate from app evolution.
- Do not implement backend, authentication or complex integrations unless explicitly requested.
- Always run build, lint or tests when available.
- Always update `WORKLOG_SITE.md` and `NEXT_SITE.md` at the end of future site work blocks.

## Long site-evolution blocks

When the user requests a 1-hour work block for the site, do not treat "1 hour" as symbolic. Plan at least 5 complete work cycles before editing.

Each cycle must include:

- Diagnosis.
- Implementation.
- Testing or verification.
- Notes in the worklog.

Required coverage across the block:

- Homepage.
- Public navigation.
- Internal pages and modules.
- Responsiveness and accessibility.
- Performance where applicable.
- Code/content structure.
- Modular preparation for future app-based management.

Stop only after completing the planned cycles, reaching a real blocker, exhausting meaningful medium/high-impact site improvements, or using the requested work block effectively.
