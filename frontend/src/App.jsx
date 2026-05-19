import React, {useEffect, useMemo, useState} from 'react'
import { getCourseCatalog, getCourseDetail } from './data/courseCurriculum'
import CoursePage from './CoursePage'
import Icon from './components/Icon'
import Quiz from './Quiz'
import { BRAND_LOGO_URL } from './lib/branding'
import { createTranslator, detectInitialLocale, LOCALE_STORAGE_KEY, normalizeLocale, SUPPORTED_LOCALES } from './i18n'
import {
  pingAppwrite,
  listCourses,
  getProgress,
  getAuthCapabilities,
  getAdminStatus,
  getAdminSummary,
  createEmailSession,
  createAccount,
  deleteSession,
  getAccount,
  normalizeAuthError,
  functionIds,
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  PUBLIC_SITE_URL
} from './lib/appwrite'

const ADMIN_EMAILS = String(import.meta.env.VITE_ADMIN_EMAILS || '')
  .split(',')
  .map((item) => item.trim().toLowerCase())
  .filter(Boolean)

function isAdminUser(user) {
  const email = String(user?.email || '').trim().toLowerCase()
  return !!email && ADMIN_EMAILS.includes(email)
}

function parseRouteHash(hash) {
  const clean = (hash || '').replace(/^#/, '').trim()
  if (!clean) return { screen: 'home', authMode: 'login', selectedCourseId: null, showQuiz: false }
  if (clean === 'auth' || clean === 'login') return { screen: 'auth', authMode: 'login', selectedCourseId: null, showQuiz: false }
  if (clean === 'signup') return { screen: 'auth', authMode: 'signup', selectedCourseId: null, showQuiz: false }
  if (clean === 'catalog') return { screen: 'catalog', authMode: 'login', selectedCourseId: null, showQuiz: false }
  if (clean === 'admin') return { screen: 'admin', authMode: 'login', selectedCourseId: null, showQuiz: false }
  if (clean.indexOf('course/') === 0) {
    const selectedCourseId = clean.slice('course/'.length) || null
    return { screen: selectedCourseId ? 'course' : 'home', authMode: 'login', selectedCourseId, showQuiz: false }
  }
  if (clean.indexOf('quiz/') === 0) {
    const selectedCourseId = clean.slice('quiz/'.length) || null
    return { screen: selectedCourseId ? 'course' : 'home', authMode: 'login', selectedCourseId, showQuiz: !!selectedCourseId }
  }
  return { screen: 'home', authMode: 'login', selectedCourseId: null, showQuiz: false }
}

function buildRouteHash(route) {
  if (route.showQuiz && route.selectedCourseId) return 'quiz/' + route.selectedCourseId
  if (route.screen === 'auth') return route.authMode === 'signup' ? 'signup' : 'auth'
  if (route.screen === 'catalog') return 'catalog'
  if (route.screen === 'admin') return 'admin'
  if (route.screen === 'course' && route.selectedCourseId) return 'course/' + route.selectedCourseId
  return ''
}

function LocaleSwitcher({ locale, onChange, t }) {
  return (
    <label className="locale-switcher" aria-label={t('localeSwitcher.label')}>
      <span className="locale-switcher-icon" aria-hidden="true">
        <Icon name="globe" size={16} />
      </span>
      <select className="locale-select" value={locale} onChange={(e) => onChange(e.target.value)}>
        {SUPPORTED_LOCALES.map((localeCode) => (
          <option key={localeCode} value={localeCode}>
            {t('locales.' + localeCode)}
          </option>
        ))}
      </select>
    </label>
  )
}

function AppHeader({ brandName, brandTagline, status, locale, onLocaleChange, t, children }) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-logo">
          <img src={BRAND_LOGO_URL} alt={t('common.brandName')} style={{ width: 32, height: 32 }} />
        </div>
        <div className="brand-info">
          <div className="brand-name">{brandName}</div>
          <div className="brand-tagline">{brandTagline}</div>
        </div>
      </div>
      <div className="header-actions">
        <LocaleSwitcher locale={locale} onChange={onLocaleChange} t={t} />
        {status ? <span className="sr-only">{status}</span> : null}
        {children}
      </div>
    </header>
  )
}

function AuthPanel({ user, mode, onModeChange, onLogin, onSignup, onLogout, loading, t, errorMessages }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setError('')
  }, [mode, user])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      if (mode === 'signup') await onSignup({ email, password, name })
      else await onLogin({ email, password })
      setPassword('')
    } catch (err) {
      setError(normalizeAuthError(err, errorMessages))
    }
  }

  return (
    <aside className="auth-card">
      <div className="auth-header">
        <div>
          <h2 className="auth-title">{user ? t('authPanel.connectedTitle') : t('authPanel.defaultTitle')}</h2>
          <p className="subtle" style={{ margin: '6px 0 0' }}>
            {user ? t('authPanel.connectedCopy', { name: user.name || user.email || user.$id }) : t('authPanel.defaultCopy')}
          </p>
        </div>
      </div>
      {!user ? (
        <>
          <div className="auth-tabs">
            <button type="button" className={'tab ' + (mode === 'login' ? 'active' : '')} onClick={() => onModeChange('login')}>
              <Icon name="user" size={16} />
              {t('authPanel.tabLogin')}
            </button>
            <button type="button" className={'tab ' + (mode === 'signup' ? 'active' : '')} onClick={() => onModeChange('signup')}>
              <Icon name="lock" size={16} />
              {t('authPanel.tabSignup')}
            </button>
          </div>
          <p className="auth-note">{mode === 'login' ? t('authPanel.loginNote') : t('authPanel.signupNote')}</p>
          <form onSubmit={handleSubmit}>
            {mode === 'signup' ? (
              <div className="field">
                <label htmlFor="name">{t('authPanel.name')}</label>
                <input id="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder={t('authPanel.namePlaceholder')} />
              </div>
            ) : null}
            <div className="field">
              <label htmlFor="email">{t('authPanel.email')}</label>
              <input id="email" autoComplete="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('authPanel.emailPlaceholder')} required />
            </div>
            <div className="field">
              <label htmlFor="password">{t('authPanel.password')}</label>
              <input id="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            {error ? <div className="callout-card" style={{ borderColor: 'rgba(180, 38, 38, 0.16)', color: '#8a1f1f' }}>{error}</div> : null}
            <div className="auth-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                <Icon name="arrowRight" size={16} />
                {loading ? t('authPanel.loading') : mode === 'login' ? t('authPanel.tabLogin') : t('authPanel.createAccount')}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => onModeChange(mode === 'login' ? 'signup' : 'login')}>
                {mode === 'login' ? t('authPanel.wantCreateAccount') : t('authPanel.alreadyHaveAccount')}
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="login-cta">
          <div className="pill">
            <Icon name="check" size={14} />
            {t('authPanel.activeSession')}
          </div>
          <div className="auth-status">
            <strong>{user.email || user.name || user.$id}</strong>
            <div className="subtle" style={{ marginTop: 6 }}>{t('authPanel.activeCopy')}</div>
          </div>
          <button type="button" className="btn btn-secondary" onClick={onLogout}>
            <Icon name="arrowLeft" size={16} />
            {t('home.learner.logout')}
          </button>
        </div>
      )}
    </aside>
  )
}

function HomePage({ user, status, loadingAuth, isAdmin, onAuthIntent, onLogout, onOpenCatalog, onOpenAdmin, locale, onLocaleChange, t }) {
  const benefits = t('home.benefits')
  const trust = t('home.trust')
  return (
    <div className="app-shell">
      <AppHeader brandName={t('common.brandName')} brandTagline={t('common.brandTagline')} status={status} locale={locale} onLocaleChange={onLocaleChange} t={t}>
        {user ? (
          <>
            <button type="button" className="btn btn-secondary" onClick={onOpenCatalog} aria-label={t('home.openCatalogAria')}>
              <Icon name="layers" size={16} />
              {t('common.learnerArea')}
            </button>
            {isAdmin ? <button type="button" className="btn btn-secondary" onClick={onOpenAdmin} aria-label={t('home.openAdminAria')}><Icon name="check" size={16} />{t('common.admin')}</button> : null}
            <button type="button" className="btn btn-secondary" onClick={onLogout} disabled={loadingAuth} aria-label={t('home.logoutAria')}><Icon name="arrowLeft" size={16} />{t('common.logout')}</button>
          </>
        ) : (
          <button type="button" className="btn btn-primary" onClick={() => onAuthIntent('login')} aria-label={t('home.signInAria')}>{t('home.signIn')}</button>
        )}
      </AppHeader>
      <div className="landing-stack">
        <section className="hero-shell">
          <div className="hero-main">
            <div className="hero-copy-card">
              <div className="hero-eyebrow">{t('home.eyebrow')}</div>
              <h1 className="hero-headline">{t('home.headline')}</h1>
              <p className="hero-description">{t('home.description')}</p>
              <div className="hero-cta">
                <button type="button" className="btn btn-primary" onClick={() => onAuthIntent('login')}><Icon name="arrowRight" size={16} />{t('home.ctaLogin')}</button>
                <button type="button" className="btn btn-secondary" onClick={() => onAuthIntent('signup')}><Icon name="lock" size={16} />{t('home.ctaSignup')}</button>
              </div>
            </div>
            <aside className="hero-brand-card" aria-hidden="true">
              <img src={BRAND_LOGO_URL} alt="" style={{ maxWidth: 180, height: 'auto' }} />
              <div className="visual-caption"><strong>{t('common.brandName')}</strong><p>{t('common.brandTagline')}.</p></div>
              <div className="brand-meta"><div className="brand-meta-item">{t('home.brandMeta1')}</div><div className="brand-meta-item">{t('home.brandMeta2')}</div></div>
            </aside>
          </div>
        </section>
        <section className="benefits-grid" aria-label={t('home.benefitsAria')}>
          <article className="benefit-card"><div className="benefit-icon"><Icon name="book" size={18} /></div><strong>{benefits.reproducible.title}</strong><p>{benefits.reproducible.copy}</p></article>
          <article className="benefit-card"><div className="benefit-icon"><Icon name="layers" size={18} /></div><strong>{benefits.science.title}</strong><p>{benefits.science.copy}</p></article>
          <article className="benefit-card"><div className="benefit-icon"><Icon name="lock" size={18} /></div><strong>{benefits.access.title}</strong><p>{benefits.access.copy}</p></article>
        </section>
      </div>
      {user ? (
        <section className="learner-section">
          <div className="section-label">{t('home.learner.label')}</div>
          <h2 className="section-heading">{t('home.learner.heading')}</h2>
          <p className="section-description">{t('home.learner.copy')}</p>
          <div className="section-cta" style={{ marginTop: 16 }}>
            <button type="button" className="btn btn-primary" onClick={onOpenCatalog}>{t('home.learner.openCourses')}</button>
            <button type="button" className="btn btn-secondary" onClick={onLogout} disabled={loadingAuth}>{t('home.learner.logout')}</button>
          </div>
        </section>
      ) : (
        <section className="trust-section" role="list" aria-label={t('home.trustAria')}>
          <article className="trust-item" role="listitem"><strong>{trust.rigor.title}</strong><p>{trust.rigor.copy}</p></article>
          <article className="trust-item" role="listitem"><strong>{trust.clarity.title}</strong><p>{trust.clarity.copy}</p></article>
          <article className="trust-item" role="listitem"><strong>{trust.practice.title}</strong><p>{trust.practice.copy}</p></article>
        </section>
      )}
    </div>
  )
}

function AuthPage({ user, status, authMode, loadingAuth, isAdmin, onAuthIntent, onLogin, onSignup, onLogout, onOpenCatalog, onOpenAdmin, locale, onLocaleChange, t, errorMessages }) {
  return (
    <div className="app-shell">
      <AppHeader brandName={t('authPage.brandName')} brandTagline={t('authPage.brandTagline')} status={status} locale={locale} onLocaleChange={onLocaleChange} t={t}>
        {user ? (
          <>
            <button type="button" className="btn btn-secondary" onClick={onOpenCatalog}><Icon name="layers" size={16} />{t('common.learnerArea')}</button>
            {isAdmin ? <button type="button" className="btn btn-secondary" onClick={onOpenAdmin}><Icon name="check" size={16} />{t('common.admin')}</button> : null}
            <button type="button" className="btn btn-secondary" onClick={onLogout} disabled={loadingAuth}><Icon name="arrowLeft" size={16} />{t('common.logout')}</button>
          </>
        ) : null}
      </AppHeader>
      <section className="auth-page-shell">
        <div className="auth-page-intro">
          <div className="hero-eyebrow">{t('authPage.eyebrow')}</div>
          <h1 className="section-heading auth-page-heading">{t('authPage.heading')}</h1>
          <p className="section-description auth-page-copy">{t('authPage.copy')}</p>
        </div>
        <AuthPanel user={user} mode={authMode} onModeChange={onAuthIntent} loading={loadingAuth} onLogin={onLogin} onSignup={onSignup} onLogout={onLogout} t={t} errorMessages={errorMessages} />
      </section>
    </div>
  )
}

function CatalogPage({ courses, isAdmin, onBack, onOpenCourse, onOpenAdmin, onLogout, loadingAuth, locale, onLocaleChange, t }) {
  return (
    <div className="app-shell">
      <AppHeader brandName={t('catalog.brandName')} brandTagline={t('catalog.brandTagline')} status={''} locale={locale} onLocaleChange={onLocaleChange} t={t}>
        <button type="button" className="btn btn-secondary" onClick={onBack} aria-label={t('catalog.backHomeAria')}><Icon name="arrowLeft" size={16} />{t('common.back')}</button>
        {isAdmin ? <button type="button" className="btn btn-secondary" onClick={onOpenAdmin} aria-label={t('catalog.openAdminAria')}><Icon name="check" size={16} />{t('common.admin')}</button> : null}
        <button type="button" className="btn btn-secondary" onClick={onLogout} disabled={loadingAuth} aria-label={t('catalog.logoutAria')}><Icon name="lock" size={16} />{t('common.logout')}</button>
      </AppHeader>
      <section className="content-section">
        <div className="section-label">{t('catalog.label')}</div>
        <h2 className="section-heading">{t('catalog.heading')}</h2>
        <div className="content-grid catalog-grid" role="list" aria-label={t('catalog.coursesAria')}>
          {courses.map((course) => (
            <article className="course-card" role="listitem" key={course.id}>
              <div className="badge-row" style={{ marginBottom: 12 }}>
                <span className="chip">{course.legacyId}</span>
                <span className="chip">{course.blockTitle}</span>
              </div>
              <strong className="course-title">{course.title}</strong>
              <p className="course-description">{course.description}</p>
              <div className="course-meta" style={{ marginTop: 12 }}><span className="status-badge">{course.active ? t('common.available') : t('common.draft')}</span></div>
              <button type="button" className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => onOpenCourse(course.id)} aria-label={t('catalog.openCourseAria', { title: course.title })}>{t('catalog.openPage')}</button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function AdminPage({ user, status, report, loading, onBack, onRefresh, onLogout, loadingAuth, locale, onLocaleChange, t }) {
  const adminConfigured = report?.admin?.appwrite?.adminApiConfigured
  const adminEmailsCount = report?.admin?.checks?.configuredAdminEmails
  return (
    <div className="app-shell">
      <AppHeader brandName={t('common.admin')} brandTagline={t('adminPage.brandTagline')} status={status} locale={locale} onLocaleChange={onLocaleChange} t={t}>
        <button type="button" className="btn btn-secondary" onClick={onBack}><Icon name="arrowLeft" size={16} />{t('common.back')}</button>
        <button type="button" className="btn btn-secondary" onClick={onLogout} disabled={loadingAuth}><Icon name="lock" size={16} />{t('common.logout')}</button>
      </AppHeader>
      <section className="content-section">
        <div className="section-label">{t('adminPage.label')}</div>
        <h2 className="section-heading">{t('adminPage.heading')}</h2>
        <p className="section-description">{t('adminPage.copy')}</p>
        <div className="section-cta" style={{ marginTop: 16 }}>
          <button type="button" className="btn btn-primary" onClick={onRefresh} disabled={loading}>{loading ? t('adminPage.runningChecks') : t('adminPage.runChecks')}</button>
          <a className="btn btn-secondary" href={PUBLIC_SITE_URL} target="_blank" rel="noreferrer">{t('common.openLiveUrl')}</a>
        </div>
      </section>
      <section className="content-section"><div className="content-grid catalog-grid"><article className="course-card"><strong className="course-title">{t('adminPage.session')}</strong><p className="course-description">{user?.email || user?.name || user?.$id || t('adminPage.noUser')}</p></article><article className="course-card"><strong className="course-title">{t('adminPage.appwrite')}</strong><p className="course-description">{APPWRITE_ENDPOINT}</p></article><article className="course-card"><strong className="course-title">{t('adminPage.project')}</strong><p className="course-description">{APPWRITE_PROJECT_ID}</p></article></div></section>
      <section className="content-section"><div className="content-grid catalog-grid">{Object.entries(functionIds).map(([key, value]) => <article className="course-card" key={key}><strong className="course-title">{key}</strong><p className="course-description">{value}</p></article>)}</div></section>
      <section className="content-section"><div className="panel" style={{ padding: 18 }}><strong style={{ display: 'block', marginBottom: 12 }}>{t('adminPage.requiredConfigTitle')}</strong><p className="section-description" style={{ marginBottom: 12 }}>{t('adminPage.requiredConfigCopy')}</p><div className="content-grid catalog-grid"><article className="course-card"><strong className="course-title">ADMIN_EMAILS</strong><p className="course-description">{t('adminPage.adminEmailsCopy')}</p></article><article className="course-card"><strong className="course-title">APPWRITE_ADMIN_API_KEY</strong><p className="course-description">{t('adminPage.adminApiKeyCopy')}</p></article><article className="course-card"><strong className="course-title">APPWRITE_API_KEY</strong><p className="course-description">{t('adminPage.fallbackApiKeyCopy')}</p></article></div><p className="subtle" style={{ margin: '14px 0 0' }}>{t('adminPage.currentStatus', { configured: String(Boolean(adminConfigured)), count: adminEmailsCount ?? 0 })}</p></div></section>
      <section className="content-section"><div className="panel" style={{ padding: 18 }}><strong style={{ display: 'block', marginBottom: 12 }}>{t('adminPage.reportTitle')}</strong><pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: 13, lineHeight: 1.5 }}>{JSON.stringify(report || { info: t('adminPage.noChecks') }, null, 2)}</pre></div></section>
    </div>
  )
}

export default function App() {
  const initialRoute = parseRouteHash(typeof window !== 'undefined' ? window.location.hash : '')
  const [locale, setLocale] = useState(detectInitialLocale())
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loadingAdmin, setLoadingAdmin] = useState(false)
  const [authMode, setAuthMode] = useState(initialRoute.authMode)
  const [screen, setScreen] = useState(initialRoute.screen)
  const [showQuiz, setShowQuiz] = useState(initialRoute.showQuiz)
  const [selectedCourseId, setSelectedCourseId] = useState(initialRoute.selectedCourseId)
  const [statusState, setStatusState] = useState({ key: 'status.syncing' })
  const [adminReport, setAdminReport] = useState(null)
  const t = useMemo(() => createTranslator(locale), [locale])
  const errorMessages = useMemo(() => t('authErrors'), [t])
  const status = t(statusState.key, statusState.params)
  const catalogCourses = useMemo(() => getCourseCatalog(locale), [locale])

  function syncFromHash() { const route = parseRouteHash(window.location.hash); setAuthMode(route.authMode); setScreen(route.screen); setShowQuiz(route.showQuiz); setSelectedCourseId(route.selectedCourseId) }
  function navigate(next) { const hash = buildRouteHash(next); const currentHash = window.location.hash.replace(/^#/, ''); if (hash === currentHash) { syncFromHash(); return } window.location.hash = hash }
  function updateStatus(key, params) { setStatusState({ key, params }) }

  useEffect(() => {
    const normalized = normalizeLocale(locale)
    window.localStorage.setItem(LOCALE_STORAGE_KEY, normalized)
    document.documentElement.lang = normalized
  }, [locale])

  useEffect(() => {
    pingAppwrite().catch(() => {})
    getAccount().then((account) => { setUser(account); updateStatus('status.sessionVerified') }).catch(() => updateStatus('status.unlockFlow'))
  }, [])

  useEffect(() => { syncFromHash(); const handleHashChange = () => syncFromHash(); window.addEventListener('hashchange', handleHashChange); return () => window.removeEventListener('hashchange', handleHashChange) }, [])

  const selectedCourse = useMemo(() => catalogCourses.find((course) => course.id === selectedCourseId) || null, [catalogCourses, selectedCourseId])
  const nextCourse = useMemo(() => { if (!selectedCourseId) return null; const currentIndex = catalogCourses.findIndex((course) => course.id === selectedCourseId); if (currentIndex === -1) return null; return catalogCourses.slice(currentIndex + 1).find(Boolean) || null }, [catalogCourses, selectedCourseId])
  const selectedCourseDetail = useMemo(() => (selectedCourse ? getCourseDetail(selectedCourse.id, locale) : null), [selectedCourse, locale])
  const adminEnabled = useMemo(() => isAdminUser(user), [user])

  async function handleLogin(payload) { setLoadingAuth(true); try { await createEmailSession(payload.email, payload.password); const account = await getAccount(); setUser(account); setAdminReport(null); updateStatus('status.loginSuccess'); navigate({ screen: 'home', authMode: 'login', selectedCourseId: null, showQuiz: false }) } finally { setLoadingAuth(false) } }
  async function handleSignup(payload) { setLoadingAuth(true); try { await createAccount(payload.email, payload.password, payload.name); await createEmailSession(payload.email, payload.password); const account = await getAccount(); setUser(account); setAdminReport(null); updateStatus('status.signupSuccess'); navigate({ screen: 'home', authMode: 'login', selectedCourseId: null, showQuiz: false }) } finally { setLoadingAuth(false) } }
  async function handleLogout() { setLoadingAuth(true); try { await deleteSession(); setUser(null); setAdminReport(null); updateStatus('status.sessionClosed'); navigate({ screen: 'home', authMode: 'login', selectedCourseId: null, showQuiz: false }) } finally { setLoadingAuth(false) } }
  function focusAuth(mode) { navigate({ screen: 'auth', authMode: mode, selectedCourseId: null, showQuiz: false }) }
  function openCatalog() { if (!user) { updateStatus('status.enterCourses'); return } navigate({ screen: 'catalog', authMode, selectedCourseId: null, showQuiz: false }) }
  function openCourse(courseId) { if (!user) { updateStatus('status.enterCoursePage'); return } navigate({ screen: 'course', authMode, selectedCourseId: courseId, showQuiz: false }) }
  function openAdmin() { if (!adminEnabled) { updateStatus('status.notAdmin'); return } navigate({ screen: 'admin', authMode, selectedCourseId: null, showQuiz: false }) }
  async function runAdminChecks() {
    setLoadingAdmin(true)
    updateStatus('status.runningChecks')
    try {
      const results = await Promise.all([
        pingAppwrite().then(() => ({ ok: true })).catch((err) => ({ ok: false, error: err.message })),
        getAuthCapabilities().catch((err) => ({ ok: false, error: err.message })),
        listCourses(locale).catch((err) => ({ ok: false, error: err.message })),
        getProgress(user?.$id || user?.email || 'anonymous').catch((err) => ({ ok: false, error: err.message })),
        getAdminStatus(user?.email || '').catch((err) => ({ ok: false, error: err.message })),
        getAdminSummary(user?.email || '').catch((err) => ({ ok: false, error: err.message }))
      ])
      setAdminReport({ checkedAt: new Date().toISOString(), ping: results[0], auth: results[1], courses: results[2], progress: results[3], admin: results[4], summary: results[5], user: user ? { id: user.$id, email: user.email || null, name: user.name || null } : null })
      updateStatus('status.checksDone')
    } catch (err) {
      setAdminReport({ checkedAt: new Date().toISOString(), fatal: err.message || 'Failed to run checks.' })
      updateStatus('status.checksFailed')
    } finally { setLoadingAdmin(false) }
  }
  function goHome() { navigate({ screen: 'home', authMode: 'login', selectedCourseId: null, showQuiz: false }) }

  if (showQuiz) {
    return <Quiz courseId={selectedCourseId} courseTitle={selectedCourse?.title || ''} locale={locale} onBack={() => navigate({ screen: 'course', authMode, selectedCourseId, showQuiz: false })} t={t} />
  }
  if (screen === 'course' && selectedCourse) {
    return <CoursePage course={selectedCourse} detail={selectedCourseDetail} onBack={() => navigate({ screen: 'catalog', authMode, selectedCourseId: null, showQuiz: false })} onOpenQuiz={() => navigate({ screen: 'course', authMode, selectedCourseId, showQuiz: true })} onOpenCatalog={openCatalog} onOpenCourse={openCourse} nextCourse={nextCourse} onLogout={handleLogout} loadingAuth={loadingAuth} locale={locale} onLocaleChange={setLocale} t={t} />
  }
  if (screen === 'catalog' && user) {
    return <CatalogPage courses={catalogCourses} isAdmin={adminEnabled} onBack={goHome} onOpenCourse={openCourse} onOpenAdmin={openAdmin} onLogout={handleLogout} loadingAuth={loadingAuth} locale={locale} onLocaleChange={setLocale} t={t} />
  }
  if (screen === 'admin' && user) {
    return <AdminPage user={user} status={status} report={adminReport} loading={loadingAdmin} onRefresh={runAdminChecks} onBack={goHome} onLogout={handleLogout} loadingAuth={loadingAuth} locale={locale} onLocaleChange={setLocale} t={t} />
  }
  if (screen === 'auth') {
    return <AuthPage user={user} status={status} authMode={authMode} loadingAuth={loadingAuth} isAdmin={adminEnabled} onAuthIntent={focusAuth} onLogin={handleLogin} onSignup={handleSignup} onLogout={handleLogout} onOpenCatalog={openCatalog} onOpenAdmin={openAdmin} locale={locale} onLocaleChange={setLocale} t={t} errorMessages={errorMessages} />
  }
  return <HomePage user={user} status={status} loadingAuth={loadingAuth} isAdmin={adminEnabled} onAuthIntent={focusAuth} onLogout={handleLogout} onOpenCatalog={openCatalog} onOpenAdmin={openAdmin} locale={locale} onLocaleChange={setLocale} t={t} />
}
