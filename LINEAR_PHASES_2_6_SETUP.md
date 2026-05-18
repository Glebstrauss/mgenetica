# Linear Project Setup: Phases 2–6

**Status:** Configuration templates (follow Phase 1 pattern)

---

## Overview: 5 Projects, 30 Epics, 160+ Stories

| Phase | Project Key | Timeline | Epics | Stories | Pts |
|-------|-------------|----------|-------|---------|-----|
| **2** | P2LRN | 2026-06-01 to 2026-08-31 | 6 | 31 | 218 |
| **3** | P3INST | 2026-08-01 to 2026-10-31 | 6 | 28 | 200 |
| **4** | P4CMS | 2026-09-01 to 2026-10-31 | 7 | 35 | 245 |
| **5** | P5INT | 2026-10-01 to 2026-12-31 | 7 | 33 | 245 |
| **6** | P6ANA | 2026-11-01 to 2027-01-31 | 8 | 38 | 270 |
| **Total** | — | — | **34** | **165** | **1,178** |

---

## Phase 2: Learner Features (2026-06-01 to 2026-08-31)

**Project Key:** P2LRN  
**Timeline:** 13 weeks (6 × 2-week sprints + 1 week overlap)  
**Team Lead:** Frontend (1.5 FTE primary)

### Cycles

| Cycle | Sprint | Dates | Duration |
|-------|--------|-------|----------|
| 1 | Sprint 1 | 2026-06-01 – 2026-06-14 | 14 days |
| 2 | Sprint 2 | 2026-06-15 – 2026-06-28 | 14 days |
| 3 | Sprint 3 | 2026-06-29 – 2026-07-12 | 14 days |
| 4 | Sprint 4 | 2026-07-13 – 2026-07-26 | 14 days |
| 5 | Sprint 5 | 2026-07-27 – 2026-08-09 | 14 days |
| 6 | Sprint 6 | 2026-08-10 – 2026-08-31 | 21 days |

### Epics & Story Summary

**Epic 2.1: Learner Dashboard** (5 stories, 28 pts) — Frontend
- Learner dashboard component (8 pts)
- Display enrolled courses (5 pts)
- Progress overview (5 pts)
- Learning stats API (5 pts)
- Mobile responsiveness (5 pts)

**Epic 2.2: Progress Tracking** (4 stories, 20 pts) — Backend + Frontend
- Progress API (GET, POST, UPDATE) (8 pts)
- Module completion tracking (5 pts)
- Time spent per module (5 pts)
- Save/resume functionality (5 pts)

**Epic 2.3: Quiz System** (6 stories, 41 pts) — Frontend + Backend
- Quiz rendering component (8 pts)
- Question types (MC, true/false, short answer) (8 pts)
- Immediate feedback (5 pts)
- Scoring algorithm (5 pts)
- Quiz analytics (difficulty, discrimination) (8 pts)
- Quiz preview/edit (optional) (3 pts) [optional if time]

**Epic 2.4: Certificate System** (5 stories, 33 pts) — Frontend + Backend
- Certificate generation (jsPDF/template) (8 pts)
- Storage and tracking (8 pts)
- Verification endpoint (5 pts)
- Public certificate view (5 pts)
- Export to LinkedIn/wallet (optional, 5 pts) [stretch if time]

**Epic 2.5: Localization** (5 stories, 28 pts) — Frontend + Backend
- Dashboard localization (PT-BR, EN, ES) (8 pts)
- Quizzes and certificates localized (8 pts)
- Locale switcher (5 pts)
- RTL support research (3 pts)
- Translation validation (4 pts)

**Epic 2.6: Testing & QA** (6 stories, 68 pts) — QA
- Component tests (13 pts)
- E2E tests (UI workflows) (13 pts)
- Mobile testing (iOS, Android) (13 pts)
- Performance testing (< 3s load) (13 pts)
- Accessibility testing (WCAG) (8 pts)
- Test coverage dashboard (8 pts)

**Phase 2 Totals:** 31 stories, 218 pts

---

## Phase 3: Instructor & Cohort Management (2026-08-01 to 2026-10-31)

**Project Key:** P3INST  
**Timeline:** 13 weeks (6 × 2-week sprints + 1 week)  
**Team Lead:** Backend (1 FTE) + Frontend (1 FTE)

### Cycles

| Cycle | Sprint | Dates | Duration |
|-------|--------|-------|----------|
| 1 | Sprint 1 | 2026-08-01 – 2026-08-14 | 14 days |
| 2 | Sprint 2 | 2026-08-15 – 2026-08-28 | 14 days |
| 3 | Sprint 3 | 2026-08-29 – 2026-09-11 | 14 days |
| 4 | Sprint 4 | 2026-09-12 – 2026-09-25 | 14 days |
| 5 | Sprint 5 | 2026-09-26 – 2026-10-09 | 14 days |
| 6 | Sprint 6 | 2026-10-10 – 2026-10-31 | 21 days |

### Epics & Story Summary

**Epic 3.1: Cohort Management** (5 stories, 33 pts) — Backend
- Cohort CRUD (create, list, update, delete) (8 pts)
- Cohort templates (5 pts)
- Enrollment API (8 pts)
- Bulk import (CSV) (8 pts)
- Learner removal/re-enrollment (4 pts)

**Epic 3.2: Instructor Dashboard** (4 stories, 33 pts) — Frontend + Backend
- View all cohorts (8 pts)
- Per-cohort learner list with progress (8 pts)
- Individual learner detail view (8 pts)
- Cohort statistics (completion %, scores) (5 pts)

**Epic 3.3: Reporting & Analytics** (5 stories, 43 pts) — Backend + Frontend
- Learner progress report (PDF) (8 pts)
- Cohort performance summary (8 pts)
- Module-level analytics (8 pts)
- Time-to-completion analysis (8 pts)
- Quiz performance by question (8 pts)
- [Optional: Custom report builder] (3 pts)

**Epic 3.4: Notifications & Communication** (4 stories, 28 pts) — Backend + Frontend
- Email notification templates (8 pts)
- Completion alerts (5 pts)
- Instructor messages to cohort (8 pts)
- Notification preferences (5 pts)

**Epic 3.5: Instructor Tools** (5 stories, 38 pts) — Backend + Frontend
- Assignment creation (8 pts)
- Learner grouping and tagging (8 pts)
- Grade override capability (5 pts)
- Risk scoring (at-risk learners) (8 pts)
- Bulk actions (mark complete, reset, etc.) (5 pts)
- [Optional: AI-powered insights] (4 pts)

**Epic 3.6: Testing & Integration** (5 stories, 25 pts) — QA
- Cohort management tests (5 pts)
- Dashboard UI tests (5 pts)
- CSV import/export tests (5 pts)
- Performance (1000+ learners) (5 pts)
- Integration tests (instructor → learner workflows) (5 pts)

**Phase 3 Totals:** 28 stories, 200 pts

---

## Phase 4: Content Management System (2026-09-01 to 2026-10-31)

**Project Key:** P4CMS  
**Timeline:** 9 weeks (4 × 2-week sprints + 1 week)  
**Team Lead:** Backend (1 FTE) + Frontend (1 FTE)

### Cycles

| Cycle | Sprint | Dates | Duration |
|-------|--------|-------|----------|
| 1 | Sprint 1 | 2026-09-01 – 2026-09-14 | 14 days |
| 2 | Sprint 2 | 2026-09-15 – 2026-09-28 | 14 days |
| 3 | Sprint 3 | 2026-09-29 – 2026-10-12 | 14 days |
| 4 | Sprint 4 | 2026-10-13 – 2026-10-31 | 18 days |

### Epics & Story Summary

**Epic 4.1: CMS Selection & Setup** (4 stories, 34 pts) — Backend + DevOps
- Evaluate options (Strapi, Keystone, custom) (3 pts)
- Set up chosen CMS (13 pts)
- Database and file storage (8 pts)
- Git integration + versioning (10 pts)

**Epic 4.2: Content Editor** (5 stories, 41 pts) — Frontend + Backend
- Rich-text editor (8 pts)
- Markdown support (5 pts)
- Code block editor (8 pts)
- Image/asset insertion (5 pts)
- Preview functionality (8 pts)
- Version history (optional, 5 pts)

**Epic 4.3: Asset Management** (4 stories, 30 pts) — Backend + Frontend
- Asset library (images, CSV, scripts) (8 pts)
- Upload and validation (8 pts)
- Asset versioning (5 pts)
- CDN/S3 integration (optional, 8 pts)

**Epic 4.4: Localization Workflows** (4 stories, 30 pts) — Backend + Frontend
- Translation key management (8 pts)
- Module translation workflow (8 pts)
- Translation status dashboard (8 pts)
- Proof-reading and approval (6 pts)

**Epic 4.5: Publishing Pipeline** (4 stories, 38 pts) — Backend + Frontend
- Draft → approved → live workflow (13 pts)
- Approval/review step (5 pts)
- Scheduled publishing (8 pts)
- Rollback capability (8 pts)
- Automated build and deploy (optional, 4 pts)

**Epic 4.6: SEO & Metadata** (4 stories, 30 pts) — Frontend + Backend
- Meta title/description (5 pts)
- Open Graph tags (5 pts)
- Canonical URLs (5 pts)
- hreflang for locales (8 pts)
- Sitemap generation (optional, 5 pts)

**Epic 4.7: Testing & QA** (4 stories, 42 pts) — QA
- CMS functionality tests (13 pts)
- Publishing workflow tests (13 pts)
- Localization tests (8 pts)
- Performance (large files, bulk upload) (8 pts)

**Phase 4 Totals:** 35 stories, 245 pts

---

## Phase 5: Interactive Learning (2026-10-01 to 2026-12-31)

**Project Key:** P5INT  
**Timeline:** 13 weeks (6 × 2-week sprints + 1 week)  
**Team Lead:** Frontend (1 FTE) + Backend (1 FTE)

### Cycles

| Cycle | Sprint | Dates | Duration |
|-------|--------|-------|----------|
| 1 | Sprint 1 | 2026-10-01 – 2026-10-14 | 14 days |
| 2 | Sprint 2 | 2026-10-15 – 2026-10-28 | 14 days |
| 3 | Sprint 3 | 2026-10-29 – 2026-11-11 | 14 days |
| 4 | Sprint 4 | 2026-11-12 – 2026-11-25 | 14 days |
| 5 | Sprint 5 | 2026-11-26 – 2026-12-09 | 14 days |
| 6 | Sprint 6 | 2026-12-10 – 2026-12-31 | 21 days |

### Epics & Story Summary

**Epic 5.1: WebR Integration** (4 stories, 34 pts) — Backend + DevOps
- WebR package setup (8 pts)
- Environment configuration (8 pts)
- Package dependencies (5 pts)
- Sandbox/security (8 pts)
- Performance optimization (5 pts) [optional if needed]

**Epic 5.2: Code Editor UI** (4 stories, 33 pts) — Frontend
- Monaco Editor integration (8 pts)
- Syntax highlighting for R (8 pts)
- Line numbers, code folding, shortcuts (5 pts)
- Light/dark theme (5 pts)
- Keyboard shortcuts customization (optional, 5 pts)

**Epic 5.3: Lab Assignment System** (5 stories, 43 pts) — Frontend + Backend
- Lab schema (instructions, code, output) (8 pts)
- Lab rendering component (8 pts)
- Code submission and validation (8 pts)
- Hint system (5 pts)
- Solution reveal (5 pts)
- Completion tracking (optional, 4 pts)

**Epic 5.4: Output Rendering** (5 stories, 41 pts) — Frontend + Backend
- Console output (5 pts)
- Plot rendering (ggplot2, base, plotly) (13 pts)
- Table rendering (8 pts)
- Error display and debugging (8 pts)
- Export (PNG, CSV, R script) (optional, 8 pts)

**Epic 5.5: Lab Analytics** (3 stories, 25 pts) — Backend + Frontend
- Track attempts and time-to-completion (8 pts)
- Monitor common errors (8 pts)
- Identify struggling learners (5 pts)
- Measure lab effectiveness (optional, 4 pts)

**Epic 5.6: Performance & Optimization** (5 stories, 43 pts) — Backend + Frontend + DevOps
- WebR startup < 2s (13 pts)
- Package loading optimization (8 pts)
- Memory management (8 pts)
- Mobile performance (8 pts)
- Caching strategy (optional, 6 pts)

**Epic 5.7: Testing & QA** (4 stories, 26 pts) — QA
- Lab execution tests (8 pts)
- Output rendering tests (8 pts)
- Performance regression (5 pts)
- Browser compatibility (5 pts)

**Phase 5 Totals:** 33 stories, 245 pts

---

## Phase 6: Advanced Analytics (2026-11-01 to 2027-01-31)

**Project Key:** P6ANA  
**Timeline:** 13 weeks (6 × 2-week sprints + 1 week)  
**Team Lead:** Full-stack (1 FTE) + Data (0.5 FTE)

### Cycles

| Cycle | Sprint | Dates | Duration |
|-------|--------|-------|----------|
| 1 | Sprint 1 | 2026-11-01 – 2026-11-14 | 14 days |
| 2 | Sprint 2 | 2026-11-15 – 2026-11-28 | 14 days |
| 3 | Sprint 3 | 2026-11-29 – 2026-12-12 | 14 days |
| 4 | Sprint 4 | 2026-12-13 – 2026-12-26 | 14 days |
| 5 | Sprint 5 | 2026-12-27 – 2027-01-09 | 14 days |
| 6 | Sprint 6 | 2027-01-10 – 2027-01-31 | 21 days |

### Epics & Story Summary

**Epic 6.1: Event Tracking System** (5 stories, 38 pts) — Backend + Frontend
- Define learnable events (3 pts)
- Event logging schema (8 pts)
- Frontend event collection (8 pts)
- Event validation and deduplication (8 pts)
- Privacy compliance (GDPR, no PII) (8 pts)
- [Optional: Real-time event stream] (4 pts)

**Epic 6.2: Data Warehouse** (4 stories, 43 pts) — Backend + DevOps + Data
- Set up (BigQuery/Redshift/Snowflake) (13 pts)
- ETL pipeline (ingest events) (13 pts)
- Data normalization (8 pts)
- Query optimization (8 pts)
- Retention and archiving (optional, 5 pts)

**Epic 6.3: Analytics Dashboards** (5 stories, 43 pts) — Frontend + Backend
- Course completion analytics (8 pts)
- Module engagement heatmap (8 pts)
- Quiz performance analytics (8 pts)
- Time-on-task distribution (8 pts)
- Engagement scoring (5 pts)
- [Optional: Custom dashboard builder] (6 pts)

**Epic 6.4: Learner Profiling** (4 stories, 35 pts) — Backend + Data
- Learner segmentation (fast/slow, high/low) (8 pts)
- Learning pattern identification (13 pts)
- Risk scoring (dropout prediction) (8 pts)
- Recommendation basis calculation (6 pts)

**Epic 6.5: Recommendation Engine** (5 stories, 48 pts) — Backend + Data
- Content recommendation (next module) (13 pts)
- Remedial suggestions (8 pts)
- Peer comparison (8 pts)
- Personalized learning paths (8 pts)
- A/B testing framework (optional, 8 pts)

**Epic 6.6: Reporting & Insights** (4 stories, 38 pts) — Frontend + Backend
- Admin analytics dashboard (13 pts)
- Instructor cohort report (8 pts)
- Learner performance insights (8 pts)
- Export (CSV, PDF) (5 pts)
- [Optional: Scheduled email reports] (4 pts)

**Epic 6.7: Performance Optimization** (3 stories, 30 pts) — Backend + DevOps
- Query optimization (8 pts)
- Cache layer (Redis) (8 pts)
- Dashboard load < 2s (8 pts)
- Data refresh cadence optimization (optional, 6 pts)

**Epic 6.8: Testing & Validation** (4 stories, 27 pts) — QA + Data
- Analytics accuracy tests (8 pts)
- Dashboard performance (8 pts)
- Recommendation quality (5 pts)
- Data quality validation (6 pts)

**Phase 6 Totals:** 38 stories, 270 pts

---

## Cross-Phase Ongoing Work

These should be tracked as **Infrastructure** or **Recurring** epics:

**Security & Compliance** (ongoing, all phases)
- GDPR and data privacy compliance
- SOC 2 certification path
- API security (rate limiting, auth, validation)
- Dependency scanning
- Penetration testing (Phase 1, Phase 6)

**Performance & Scalability** (ongoing)
- Load testing
- Database optimization
- Caching strategy (Redis)
- CDN integration
- Auto-scaling

**Documentation** (ongoing)
- API docs (Swagger)
- User guides
- Dev setup guide
- Architecture docs
- Deployment runbook

**Testing** (ongoing)
- Unit tests (80%+ coverage)
- Integration tests
- E2E tests
- Performance tests
- Security tests

---

## Consolidated Timeline (All Phases)

```
2026-05-18 ────────────────────────────────────── 2027-01-31

Phase 1: Foundation
  ████████████  (May–Aug)

Phase 2: Learner
    ████████████  (Jun–Aug)

Phase 3: Instructor
        ████████████  (Aug–Oct)

Phase 4: CMS
            ████████  (Sep–Oct)

Phase 5: Interactive
                ████████████  (Oct–Dec)

Phase 6: Analytics
                    ████████████  (Nov–Jan)
```

---

## Setup Pattern (All Phases)

Follow the same setup instructions as **Phase 1** (see `LINEAR_PROJECT_SETUP.md`):

1. Create project in Linear UI
2. Add teams and members
3. Create 2-week sprint cycles
4. Create epics (using tables above)
5. Create stories under each epic
6. Organize backlog by priority and sprint assignment

---

## Capacity Planning

| Phase | Stories | Points | Avg Sprint | Weeks |
|-------|---------|--------|------------|-------|
| **1** | 24 | 154 | ~22 pts | 12 |
| **2** | 31 | 218 | ~36 pts | 13 |
| **3** | 28 | 200 | ~33 pts | 13 |
| **4** | 35 | 245 | ~61 pts | 9 |
| **5** | 33 | 245 | ~36 pts | 13 |
| **6** | 38 | 270 | ~40 pts | 13 |
| **Total** | **189** | **1,332** | — | 73 |

**Notes:**
- Phase 4 is compressed (9 weeks) → higher sprint capacity
- Other phases are 12–13 weeks → ~30–40 pts/sprint
- Adjust team size and velocity based on actual sprint performance
- Cross-phase work (security, testing) runs continuously

---

## Next Steps

1. **Create Phase 1 project** (LINEAR_PROJECT_SETUP.md)
2. **Kick off Phase 1** (2026-05-18)
3. **Create Phase 2 project** during Phase 1 Sprint 3
4. **Create Phase 3 project** during Phase 2 Sprint 2
5. **Create Phase 4 project** during Phase 3 Sprint 1
6. **Create Phase 5 project** during Phase 4 Sprint 2
7. **Create Phase 6 project** during Phase 5 Sprint 2

---

## References

- Phase 1 setup: `LINEAR_PROJECT_SETUP.md`
- 12-month roadmap: `12-MONTH-IMPLEMENTATION-ROADMAP.md`
- Platform spec: `E-LEARNING_PLATFORM_PROJECT.md`
- Linear docs: https://linear.app/docs
