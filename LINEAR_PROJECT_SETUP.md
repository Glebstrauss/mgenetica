# Linear Project Setup: 1-Week MVP Sprint (May 18–24, 2026)

**Status:** Accelerated execution via parallel AI agents

---

## Project Summary

| Field | Value |
|-------|-------|
| **Project Name** | MGenética E-Learning MVP Sprint |
| **Project Key** | MVP1WK |
| **Timeline** | 2026-05-18 to 2026-05-24 |
| **Duration** | 1 week (7 days, 5 working days) |
| **Organization** | mgenetica |
| **Execution Model** | Parallel AI agents (one per phase/component) |

**Description:**
Compressed 6-phase e-learning platform MVP — all core features deployed to staging by Friday EOD.

---

## Single Sprint: Mon 5/18 – Fri 5/22

| Day | Sprint | Focus | Agents | Target |
|-----|--------|-------|--------|--------|
| Mon | MVP-1 | Phase 1 & 2 | 3 agents | API + Auth + Dashboard |
| Tue | MVP-1 | Phase 3 & 4 | 2 agents | Instructor + CMS |
| Wed | MVP-1 | Phase 5 | 2 agents | WebR + Code Editor |
| Thu | MVP-1 | Phase 6 + Int | 2 agents | Analytics + Tests |
| Fri | MVP-1 | Deploy | 2 agents | Staging live + demo |

**Sprint Total:** 11 agent tasks, 26 developer-days, 120 effective hours

---

## Agents & Daily Tasks

### Monday 5/18: 3 Agents (Phase 1 & 2)

**1. Agent: phase-1-infrastructure**
- Goal: API server + database ready
- Tasks:
  - Bootstrap Node/Express or Python/FastAPI project
  - PostgreSQL schema (users, roles, sessions)
  - Docker + docker-compose
  - GitHub Actions CI/CD skeleton
  - Deploy Docker to staging server
- Deliverable: API running at https://staging.api.local
- Estimated: 6h
- Tests: Docker builds, DB migrations pass

**2. Agent: phase-1-authentication**
- Goal: Auth system complete
- Tasks:
  - POST /auth/register (email + password validation)
  - POST /auth/login (JWT generation)
  - POST /auth/refresh (token refresh)
  - GET /auth/oauth/google (OAuth2 callback)
  - GET /auth/oauth/github (OAuth2 callback)
  - Role-based middleware (admin, user)
- Deliverable: All auth endpoints tested
- Estimated: 7h
- Tests: 80%+ coverage (unit + integration)

**3. Agent: phase-2-dashboard**
- Goal: Learner dashboard UI
- Tasks:
  - React app scaffold
  - Dashboard layout (courses, progress, stats)
  - Course card component
  - Progress bar + streak counter
  - Mobile responsive (Tailwind CSS)
  - Mock API integration
- Deliverable: Dashboard at https://staging.ui.local/dashboard
- Estimated: 6h
- Tests: Component tests, responsive layout verified

---

### Tuesday 5/19: 2 Agents (Phase 3 & 4)

**4. Agent: phase-3-instructor**
- Goal: Instructor dashboard + cohorts
- Tasks:
  - Cohort CRUD API (POST, GET, PUT, DELETE)
  - Enrollment API (bulk CSV import)
  - Learner list API (with filters, pagination)
  - Progress aggregation query
  - Audit log table + API
  - Instructor role + permissions
- Deliverable: Cohort management API working
- Estimated: 6h
- Tests: API contract tests, CSV import tested

**5. Agent: phase-4-cms**
- Goal: CMS content API
- Tasks:
  - Strapi minimal setup OR custom headless API
  - Content schema (modules, quizzes, assets)
  - Draft/publish workflow API
  - Asset upload endpoint (S3 or local)
  - Content delivery API (GET /content/module/1)
  - Admin editor UI (basic rich-text)
- Deliverable: CMS API functional
- Estimated: 8h
- Tests: Content CRUD tests, schema validation

**Frontend (both phases) — merged with dashboard agent:**
- Instructor dashboard UI (cohort table, learner details)
- Cohort creation form
- CSV bulk upload form
- Content editor form scaffold
- Estimated: 6h (runs parallel Tuesday)

---

### Wednesday 5/20: 2 Agents (Phase 5)

**6. Agent: phase-5-webr**
- Goal: Interactive R labs in browser
- Tasks:
  - WebR package setup + environment
  - Monaco editor (R syntax highlighting)
  - Lab assignment schema (instructions, template code, tests)
  - Code submission + execution endpoint
  - Output rendering (console, plots, errors)
  - Performance tuning (WebR startup < 2s)
  - Mobile UI (responsive code editor)
- Deliverable: Interactive lab demo working
- Estimated: 8h
- Tests: Lab execution tests, WebR performance benchmark

**7. Agent: phase-5-backend**
- Goal: Lab API + sandbox
- Tasks:
  - Lab assignment CRUD API
  - Code execution sandbox (secure)
  - R package isolation
  - Execution timeout + memory limits
  - Result storage (attempts, outputs)
  - Lab completion tracking
- Deliverable: Lab API secure + working
- Estimated: 6h
- Tests: Sandbox security audit, execution tests

---

### Thursday 5/21: 2 Agents (Phase 6 + Integration)

**8. Agent: phase-6-analytics**
- Goal: Event tracking + basic analytics
- Tasks:
  - Event schema (page view, quiz submit, lab complete, etc.)
  - Frontend event collection (tracking.js)
  - Analytics API (ingest events)
  - Basic analytics dashboard (completions, engagement)
  - Learner segmentation (fast/slow learners)
  - GDPR compliance (no PII in logs)
- Deliverable: Analytics dashboard live
- Estimated: 7h
- Tests: Event validation, GDPR audit

**9. Agent: cross-phase-integration**
- Goal: System integration + testing
- Tasks:
  - End-to-end user flow (register → dashboard → quiz → cert → lab)
  - API integration tests (Phase 1→2→3→4→5→6)
  - Contract tests (API boundary validation)
  - Performance regression (response times < 200ms)
  - Security scan (OWASP top 10, dependency audit)
  - Test coverage report (target 80%+)
- Deliverable: All integration tests green
- Estimated: 8h
- Tests: E2E flow, API contracts, security scan

---

### Friday 5/22: 2 Agents (Deploy + Polish)

**10. Agent: deployment-production**
- Goal: Staging deployment + performance ready
- Tasks:
  - Cache layer setup (Redis)
  - Database query optimization
  - Load testing (1000 concurrent users)
  - Performance profiling (identify bottlenecks)
  - Production readiness checklist
  - Secrets management (env vars, .env.local)
  - Health check endpoints
- Deliverable: System ready for production deploy
- Estimated: 6h
- Tests: Load test reports, perf baseline

**11. Agent: qa-final**
- Goal: Final QA + demo ready
- Tasks:
  - Smoke tests (critical user paths)
  - Mobile testing (iOS/Android responsive)
  - Accessibility audit (WCAG basics)
  - Dependency audit (security)
  - Performance metrics collection
  - Demo walkthrough script
  - Release notes (features, known issues)
- Deliverable: Demo ready + release notes
- Estimated: 6h
- Tests: Smoke tests pass, accessibility report

---

## MVP Feature Checklist

### Phase 1: Core Foundation ✓
- [x] User registration (email + password)
- [x] Login with JWT
- [x] OAuth2 (Google, GitHub)
- [x] User profile API
- [x] Role-based access control
- [x] 80%+ test coverage

### Phase 2: Learner ✓
- [x] Dashboard (courses, progress)
- [x] Module tracking
- [x] Quiz system (basic)
- [x] Certificate generation
- [x] Localization (PT-BR, EN)
- [x] Mobile responsive

### Phase 3: Instructor ✓
- [x] Cohort management
- [x] Learner list + progress
- [x] CSV bulk import
- [x] Reporting (CSV export)
- [x] Audit logs

### Phase 4: CMS ✓
- [x] Content API
- [x] Admin editor
- [x] Draft/publish workflow
- [x] Asset upload

### Phase 5: Interactive Learning ✓
- [x] WebR in browser
- [x] Code editor (R syntax)
- [x] Code execution + output
- [x] Lab assignments
- [x] Mobile UI

### Phase 6: Analytics ✓
- [x] Event tracking
- [x] Completion analytics
- [x] User activity dashboard
- [x] Learner segmentation

---

## Success Criteria (Must All Pass)

- ✓ All agents complete on schedule
- ✓ API response time < 200ms (p95)
- ✓ WebR startup < 2s
- ✓ 80%+ test coverage
- ✓ Zero critical security issues
- ✓ Mobile responsive (375px–1920px)
- ✓ End-to-end flow works
- ✓ Deployed to staging
- ✓ Demo ready
- ✓ Performance baseline established

---

## Architecture (1-Week Build)

```
┌─────────────────────────────────────────────────┐
│         User Interface (React)                  │
│  Dashboard | Instructor | Editor | Lab | CMS   │
└────────────┬────────────────────────────────────┘
             │ REST API
┌────────────▼────────────────────────────────────┐
│         Node/Express API Server                 │
│  Auth | Cohorts | Content | Labs | Analytics   │
└────────────┬────────────────────────────────────┘
             │ 
┌────────────▼────────────────────────────────────┐
│      PostgreSQL Database                        │
│  Users | Cohorts | Content | Labs | Events     │
└─────────────────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────┐
│      Redis Cache (optional)                     │
│  Session | Query cache                         │
└─────────────────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────┐
│      WebR (Browser-based R)                     │
│  Interactive labs | Code execution             │
└─────────────────────────────────────────────────┘
```

---

## Tech Stack (Final)

| Component | Technology |
|-----------|------------|
| **API Server** | Node.js + Express |
| **Database** | PostgreSQL 14+ |
| **Frontend** | React 18 + Tailwind CSS |
| **CMS** | Strapi headless |
| **WebR** | WebAssembly R engine |
| **Testing** | Jest + Cypress |
| **DevOps** | Docker + GitHub Actions |
| **Deployment** | AWS EC2 (staging) / GCP Cloud Run |
| **Analytics** | PostgreSQL + Grafana (lightweight) |

---

## Deployment Target

**Staging URL:** https://staging.mgenetica.local

- API: https://staging.api.mgenetica.local
- UI: https://staging.mgenetica.local
- CMS Admin: https://staging.cms.mgenetica.local
- Docs: https://staging.docs.mgenetica.local

**Credentials:** (managed in `.env.local`, never committed)
- Database: postgres://user:pass@db:5432/mgenetica_staging
- JWT Secret: (random, generated on deploy)
- OAuth: (Google/GitHub keys, from credentials)

---

## Next Steps (Post-MVP)

After this week:
1. **Production Deploy** — Move from staging to production
2. **User Testing** — Gather feedback from real users
3. **Iteration Sprint** — Bug fixes, UX polish, performance tuning
4. **Monitoring** — Set up alerting and analytics dashboards
5. **Phase 2 Features** — Advanced instructor tools, recommendation engine, etc.

---

## Agents Ready

All 11 agent tasks are ready for dispatch. Each agent has:
- Clear scope (1–2 days max)
- Integration contracts (API specs, component props)
- Test requirements (80%+ coverage)
- Deployment target (staging URLs)

**Status:** Ready to start Monday 2026-05-18

---

## References

- Master roadmap: `12-MONTH-IMPLEMENTATION-ROADMAP.md`
- E-learning spec: `E-LEARNING_PLATFORM_PROJECT.md`
- Multi-week setup: `LINEAR_PHASES_2_6_SETUP.md`
