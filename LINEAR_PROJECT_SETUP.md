# Linear Project Setup: Phase 1 Foundation

**Status:** Configuration template (manual setup required)

---

## Project Summary

| Field | Value |
|-------|-------|
| **Project Name** | Phase 1: Core Platform Foundation |
| **Project Key** | P1FDN |
| **Timeline** | 2026-05-18 to 2026-08-23 |
| **Duration** | 12 weeks (7 × 2-week sprints) |
| **Organization** | mgenetica |

**Description:**
Backend infrastructure, authentication, user profiles, admin dashboard (May–Aug 2026)

---

## Teams to Configure

```yaml
teams:
  - name: Backend
    members: 2 FTE
    focus: [Auth, Profiles, APIs]
  
  - name: Frontend
    members: 1.5 FTE
    focus: [Admin Dashboard, UI]
  
  - name: DevOps
    members: 1 FTE
    focus: [Infrastructure, CI/CD, Database]
  
  - name: QA
    members: 0.5 FTE
    focus: [Testing, Security, Performance]
  
  - name: Product
    members: As needed
    focus: [Requirements, Roadmap]
```

---

## Cycles (2-Week Sprints)

| Cycle | Sprint | Dates | Duration |
|-------|--------|-------|----------|
| 1 | Sprint 1 | 2026-05-18 – 2026-05-31 | 14 days |
| 2 | Sprint 2 | 2026-06-01 – 2026-06-14 | 14 days |
| 3 | Sprint 3 | 2026-06-15 – 2026-06-28 | 14 days |
| 4 | Sprint 4 | 2026-06-29 – 2026-07-12 | 14 days |
| 5 | Sprint 5 | 2026-07-13 – 2026-07-26 | 14 days |
| 6 | Sprint 6 | 2026-07-27 – 2026-08-09 | 14 days |
| 7 | Sprint 7 | 2026-08-10 – 2026-08-23 | 14 days |

---

## Epics & Stories

### Epic 1.1: Infrastructure Setup
**Description:** Backend foundation, CI/CD, databases, containerization  
**Team Lead:** DevOps

| # | Story | Points | Team | Status |
|----|-------|--------|------|--------|
| 1.1.1 | Project setup (repos, CI/CD config, docs) | 5 | DevOps | - |
| 1.1.2 | Cloud infrastructure setup (AWS/GCP) | 8 | DevOps | - |
| 1.1.3 | Database schema and migrations | 8 | DevOps | - |
| 1.1.4 | Docker containerization | 5 | DevOps | - |
| 1.1.5 | Development environment docs | 3 | DevOps | - |

**Epic Total:** 29 pts

---

### Epic 1.2: User Authentication
**Description:** Registration, login, JWT, OAuth2, password management, RBAC  
**Team Lead:** Backend

| # | Story | Points | Team | Status |
|----|-------|--------|------|--------|
| 1.2.1 | Registration API (email + password) | 8 | Backend | - |
| 1.2.2 | Login and JWT token generation | 8 | Backend | - |
| 1.2.3 | Token refresh mechanism | 5 | Backend | - |
| 1.2.4 | OAuth2 integration (Google, GitHub, Microsoft) | 13 | Backend | - |
| 1.2.5 | Password reset and recovery | 8 | Backend | - |
| 1.2.6 | RBAC (role-based access control) | 5 | Backend | - |

**Epic Total:** 47 pts

---

### Epic 1.3: User Profile Management
**Description:** Profile APIs, preferences, GDPR compliance  
**Team Lead:** Backend

| # | Story | Points | Team | Status |
|----|-------|--------|------|--------|
| 1.3.1 | Profile API (GET, PUT) | 5 | Backend | - |
| 1.3.2 | Preference storage (language, theme) | 3 | Backend | - |
| 1.3.3 | Settings UI (admin prototype) | 5 | Frontend | - |
| 1.3.4 | Account deletion and data export (GDPR) | 5 | Backend | - |

**Epic Total:** 18 pts

---

### Epic 1.4: Admin Dashboard
**Description:** User management, activation, audit logs, analytics  
**Team Lead:** Frontend + Backend

| # | Story | Points | Team | Status |
|----|-------|--------|------|--------|
| 1.4.1 | User management interface | 8 | Frontend | - |
| 1.4.2 | User activation/suspension | 5 | Backend | - |
| 1.4.3 | Audit log system | 8 | Backend | - |
| 1.4.4 | Basic analytics (user count, activity) | 5 | Frontend | - |

**Epic Total:** 26 pts

---

### Epic 1.5: Testing & Security
**Description:** Unit tests, integration tests, security audit, performance, documentation  
**Team Lead:** QA

| # | Story | Points | Team | Status |
|----|-------|--------|------|--------|
| 1.5.1 | Unit tests (80%+ coverage) | 8 | QA | - |
| 1.5.2 | Integration tests (API + DB) | 8 | QA | - |
| 1.5.3 | OWASP Top 10 audit | 8 | QA | - |
| 1.5.4 | Performance baseline | 5 | QA | - |
| 1.5.5 | API documentation (Swagger) | 5 | Backend | - |

**Epic Total:** 34 pts

---

## Totals

| Metric | Count |
|--------|-------|
| **Total Epics** | 5 |
| **Total Stories** | 24 |
| **Total Story Points** | 154 pts |
| **Average Sprint Capacity** | ~22 pts / sprint |

---

## Manual Setup Instructions

### 1. Create Project in Linear UI
1. Go to **Linear workspace** (mgenetica)
2. Click **Projects** → **New Project**
3. Fill in:
   - **Name:** Phase 1: Core Platform Foundation
   - **Key:** P1FDN
   - **Description:** Backend infrastructure, authentication, user profiles, admin dashboard (May–Aug 2026)
   - **Start Date:** 2026-05-18
   - **Target Date:** 2026-08-23
4. Click **Create**

### 2. Add Teams (if not present)
1. Go to **Project Settings** → **Teams**
2. Create or assign:
   - Backend
   - Frontend
   - DevOps
   - QA
   - Product

### 3. Create Cycles
1. Go to **Project Settings** → **Cycles**
2. Create 7 cycles with 2-week intervals (see table above)
3. Set each cycle to "Active" when needed

### 4. Create Epics
For each epic below, create it in Linear:
- Go to **Backlog** → **+ Epic**
- Fill name, description, team
- Repeat for all 5 epics

### 5. Create Stories Under Each Epic
For each story in the tables above:
1. Go to the epic
2. Click **+ Add Issue**
3. Fill in:
   - **Title:** Story name
   - **Points:** Story points estimate
   - **Team:** Assigned team
   - **Description:** Brief context (if needed)
4. Set status to "Backlog"

### 6. Organize Backlog
1. Drag stories into priority order within each epic
2. Assign **Sprint 1** stories first (2026-05-18)
3. Assign other stories to appropriate cycles

---

## JSON Import Format (Optional)

If Linear supports bulk import via API or JSON, use this structure:

```json
{
  "project": {
    "name": "Phase 1: Core Platform Foundation",
    "key": "P1FDN",
    "description": "Backend infrastructure, authentication, user profiles, admin dashboard (May–Aug 2026)",
    "startDate": "2026-05-18",
    "targetDate": "2026-08-23"
  },
  "teams": [
    { "name": "Backend", "description": "Backend development (2 FTE)" },
    { "name": "Frontend", "description": "Frontend development (1.5 FTE)" },
    { "name": "DevOps", "description": "Infrastructure & deployment (1 FTE)" },
    { "name": "QA", "description": "Testing & security (0.5 FTE)" },
    { "name": "Product", "description": "Product management" }
  ],
  "cycles": [
    { "name": "Sprint 1", "startDate": "2026-05-18", "endDate": "2026-05-31" },
    { "name": "Sprint 2", "startDate": "2026-06-01", "endDate": "2026-06-14" },
    { "name": "Sprint 3", "startDate": "2026-06-15", "endDate": "2026-06-28" },
    { "name": "Sprint 4", "startDate": "2026-06-29", "endDate": "2026-07-12" },
    { "name": "Sprint 5", "startDate": "2026-07-13", "endDate": "2026-07-26" },
    { "name": "Sprint 6", "startDate": "2026-07-27", "endDate": "2026-08-09" },
    { "name": "Sprint 7", "startDate": "2026-08-10", "endDate": "2026-08-23" }
  ],
  "epics": [
    {
      "title": "Epic 1.1: Infrastructure Setup",
      "description": "Backend foundation, CI/CD, databases, containerization",
      "team": "DevOps"
    },
    {
      "title": "Epic 1.2: User Authentication",
      "description": "Registration, login, JWT, OAuth2, password management, RBAC",
      "team": "Backend"
    },
    {
      "title": "Epic 1.3: User Profile Management",
      "description": "Profile APIs, preferences, GDPR compliance",
      "team": "Backend"
    },
    {
      "title": "Epic 1.4: Admin Dashboard",
      "description": "User management, activation, audit logs, analytics",
      "team": "Frontend"
    },
    {
      "title": "Epic 1.5: Testing & Security",
      "description": "Unit tests, integration tests, security audit, performance, documentation",
      "team": "QA"
    }
  ]
}
```

---

## Next Steps for User

1. **Create Linear Project** using manual instructions above
2. **Add team members** to project
3. **Assign Sprint 1** stories (highest priority from backlog)
4. **Configure notifications** and access
5. **Start Sprint 1** (2026-05-18)

---

## References

- **Linear Docs:** https://linear.app/docs
- **Project Timeline:** 12 weeks (May 18 – Aug 23, 2026)
- **Capacity Planning:** ~22 pts/sprint
