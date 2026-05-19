import React, {useEffect, useMemo, useState} from 'react'
import { module01 } from './data/module01'
import CoursePage from './CoursePage'
import Icon from './components/Icon'
import Quiz from './Quiz'
import {
  pingAppwrite,
  listCourses,
  getProgress,
  getAuthCapabilities,
  getAdminStatus,
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

function AuthPanel({ user, mode, onModeChange, onLogin, onSignup, onLogout, loading }) {
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
      if (mode === 'signup') {
        await onSignup({ email, password, name })
      } else {
        await onLogin({ email, password })
      }
      setPassword('')
    } catch (err) {
      setError(normalizeAuthError(err))
    }
  }

  return (
    <aside className="auth-card">
      <div className="auth-header">
        <div>
          <h2 className="auth-title">{user ? 'Conta conectada' : 'Acesse sua conta'}</h2>
          <p className="subtle" style={{ margin: '6px 0 0' }}>
            {user
              ? `Olá, ${user.name || user.email || user.$id}. Você está pronto para continuar.`
              : 'Entre para salvar progresso, abrir quizzes e usar a trilha completa.'}
          </p>
        </div>
      </div>

      {!user ? (
        <>
          <div className="auth-tabs">
            <button type="button" className={`tab ${mode === 'login' ? 'active' : ''}`} onClick={() => onModeChange('login')}>
              <Icon name="user" size={16} />
              Entrar
            </button>
            <button type="button" className={`tab ${mode === 'signup' ? 'active' : ''}`} onClick={() => onModeChange('signup')}>
              <Icon name="lock" size={16} />
              Criar conta
            </button>
          </div>

          <p className="auth-note">
            {mode === 'login'
              ? 'Use seu e-mail e senha para retomar a trilha.'
              : 'Crie uma conta para testar a experiência completa de aprendizado.'}
          </p>

          <form onSubmit={handleSubmit}>
            {mode === 'signup' ? (
              <div className="field">
                <label htmlFor="name">Nome</label>
                <input id="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
              </div>
            ) : null}
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                autoComplete="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@exemplo.com"
                required
              />
            </div>
            <div className="field">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            {error ? <div className="callout-card" style={{ borderColor: 'rgba(180, 38, 38, 0.16)', color: '#8a1f1f' }}>{error}</div> : null}
            <div className="auth-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                <Icon name="arrowRight" size={16} />
                {loading ? 'Processando…' : mode === 'login' ? 'Entrar' : 'Criar conta'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => onModeChange(mode === 'login' ? 'signup' : 'login')}>
                {mode === 'login' ? 'Quero criar conta' : 'Já tenho conta'}
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="login-cta">
            <div className="pill">
              <Icon name="check" size={14} />
              Sessão ativa
            </div>
            <div className="auth-status">
              <strong>{user.email || user.name || user.$id}</strong>
              <div className="subtle" style={{ marginTop: 6 }}>
                Você pode continuar lendo o módulo e abrir quizzes com a sessão atual.
              </div>
            </div>
            <button type="button" className="btn btn-secondary" onClick={onLogout}>
              <Icon name="arrowLeft" size={16} />
              Sair da conta
            </button>
          </div>
        </>
      )}
    </aside>
  )
}

function HomePage({ user, status, loadingAuth, isAdmin, onAuthIntent, onLogout, onOpenCatalog, onOpenAdmin }) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-logo">
            <img src="https://mgenetica.github.io/mgenetica/images/mgenetica-logo-correct.png" alt="MGenética" style={{ width: 32, height: 32 }} />
          </div>
          <div className="brand-info">
            <div className="brand-name">MGenética</div>
            <div className="brand-tagline">Melhoramento animal, do conceito ao código</div>
          </div>
        </div>
        <div className="header-actions">
          <span className="status-badge">{status}</span>
          {user ? (
            <>
              <button type="button" className="btn btn-secondary" onClick={onOpenCatalog} aria-label="Abrir área do aluno">
                <Icon name="layers" size={16} />
                Área do aluno
              </button>
              {isAdmin ? (
                <button type="button" className="btn btn-secondary" onClick={onOpenAdmin} aria-label="Abrir painel admin">
                  <Icon name="check" size={16} />
                  Admin
                </button>
              ) : null}
              <button type="button" className="btn btn-secondary" onClick={onLogout} disabled={loadingAuth} aria-label="Fazer logout">
                <Icon name="arrowLeft" size={16} />
                Sair
              </button>
            </>
          ) : (
            <button type="button" className="btn btn-primary" onClick={() => onAuthIntent('login')} aria-label="Entrar na plataforma">
              Entrar
            </button>
          )}
        </div>
      </header>

      <div className="landing-stack">
        <section className="hero-shell">
          <div className="hero-main">
            <div className="hero-copy-card">
              <div className="hero-eyebrow">Educação aplicada · Melhoramento genético animal</div>
              <h1 className="hero-headline">Genética que vira decisão no campo.</h1>
              <p className="hero-description">
                Estude genética quantitativa e genômica aplicada com uma trilha prática, verificável e guiada por R.
              </p>
              <div className="hero-cta">
                <button type="button" className="btn btn-primary" onClick={() => onAuthIntent('login')}>
                  <Icon name="arrowRight" size={16} />
                  Entrar para acessar a trilha
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => onAuthIntent('signup')}>
                  <Icon name="lock" size={16} />
                  Criar conta
                </button>
              </div>
            </div>

            <aside className="hero-brand-card" aria-hidden="true">
              <img src="https://mgenetica.github.io/mgenetica/images/mgenetica-logo-correct.png" alt="" style={{ maxWidth: 180, height: 'auto' }} />
              <div className="visual-caption">
                <strong>MGenética</strong>
                <p>Melhoramento animal, do conceito ao código.</p>
              </div>
              <div className="brand-meta">
                <div className="brand-meta-item">Conteúdo técnico com leitura clara.</div>
                <div className="brand-meta-item">Trilha prática com código e quiz.</div>
              </div>
            </aside>
          </div>
        </section>

        <section className="benefits-grid" aria-label="Pilares da plataforma">
          <article className="benefit-card">
            <div className="benefit-icon">
              <Icon name="book" size={18} />
            </div>
            <strong>R reproduzível</strong>
            <p>Exemplos e roteiros prontos para estudar com evidência.</p>
          </article>
          <article className="benefit-card">
            <div className="benefit-icon">
              <Icon name="layers" size={18} />
            </div>
            <strong>Ciência aplicada</strong>
            <p>Conteúdo técnico claro, focado em decisão no campo.</p>
          </article>
          <article className="benefit-card">
            <div className="benefit-icon">
              <Icon name="lock" size={18} />
            </div>
            <strong>Acesso único</strong>
            <p>Conta única para trilha, quizzes e progresso do curso.</p>
          </article>
        </section>

      </div>

      {user ? (
        <section className="learner-section">
          <div className="section-label">Área do aluno</div>
          <h2 className="section-heading">A trilha fica disponível após o login</h2>
          <p className="section-description">
            Use a área do aluno para abrir os cursos, revisar conteúdos e acessar cada página dedicada.
          </p>
          <div className="section-cta" style={{ marginTop: 16 }}>
            <button type="button" className="btn btn-primary" onClick={onOpenCatalog}>
              Abrir cursos
            </button>
            <button type="button" className="btn btn-secondary" onClick={onLogout} disabled={loadingAuth}>
              Sair da conta
            </button>
          </div>
        </section>
      ) : (
        <section className="trust-section" role="list" aria-label="Pilares de confiança da MGenética">
          <article className="trust-item" role="listitem">
            <strong>Rigor científico</strong>
            <p>Conteúdo baseado em genética quantitativa, estatística e aplicação no campo.</p>
          </article>
          <article className="trust-item" role="listitem">
            <strong>Linguagem clara</strong>
            <p>Explicações diretas, sem excesso de jargão e com interpretação curta.</p>
          </article>
          <article className="trust-item" role="listitem">
            <strong>Prática reproduzível</strong>
            <p>Scripts e dados simulados para estudar sem depender de bases externas.</p>
          </article>
        </section>
      )}
    </div>
  )
}

function AuthPage({ user, status, authMode, loadingAuth, isAdmin, onBack, onAuthIntent, onLogin, onSignup, onLogout, onOpenCatalog, onOpenAdmin }) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-logo">
            <img src="https://mgenetica.github.io/mgenetica/images/mgenetica-logo-correct.png" alt="MGenética" style={{ width: 32, height: 32 }} />
          </div>
          <div className="brand-info">
            <div className="brand-name">Acesso</div>
            <div className="brand-tagline">Entre para abrir a trilha de aprendizagem</div>
          </div>
        </div>
        <div className="header-actions">
          <span className="status-badge">{status}</span>
          <button type="button" className="btn btn-secondary" onClick={onBack} aria-label="Voltar para a home">
            <Icon name="arrowLeft" size={16} />
            Voltar
          </button>
          {user ? (
            <>
              <button type="button" className="btn btn-secondary" onClick={onOpenCatalog} aria-label="Abrir área do aluno">
                <Icon name="layers" size={16} />
                Área do aluno
              </button>
              {isAdmin ? (
                <button type="button" className="btn btn-secondary" onClick={onOpenAdmin} aria-label="Abrir painel admin">
                  <Icon name="check" size={16} />
                  Admin
                </button>
              ) : null}
              <button type="button" className="btn btn-secondary" onClick={onLogout} disabled={loadingAuth} aria-label="Fazer logout">
                <Icon name="arrowLeft" size={16} />
                Sair
              </button>
            </>
          ) : null}
        </div>
      </header>

      <section className="auth-page-shell">
        <div className="auth-page-intro">
          <div className="hero-eyebrow">Acesso à plataforma</div>
          <h1 className="section-heading auth-page-heading">Entre ou crie conta para continuar.</h1>
          <p className="section-description auth-page-copy">
            O acesso fica fora da home pública. Use esta página para abrir a trilha, continuar seus estudos e acompanhar o progresso.
          </p>
        </div>

        <AuthPanel
          user={user}
          mode={authMode}
          onModeChange={onAuthIntent}
          loading={loadingAuth}
          onLogin={onLogin}
          onSignup={onSignup}
          onLogout={onLogout}
        />
      </section>
    </div>
  )
}

function CatalogPage({ courses, isAdmin, onBack, onOpenCourse, onOpenAdmin, onLogout, loadingAuth }) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-logo">
            <img src="https://mgenetica.github.io/mgenetica/images/mgenetica-logo-correct.png" alt="MGenética" style={{ width: 32, height: 32 }} />
          </div>
          <div className="brand-info">
            <div className="brand-name">Cursos</div>
            <div className="brand-tagline">Acesse os módulos dedicados da trilha</div>
          </div>
        </div>
        <div className="header-actions">
          <button type="button" className="btn btn-secondary" onClick={onBack} aria-label="Voltar para a home">
            <Icon name="arrowLeft" size={16} />
            Voltar
          </button>
          {isAdmin ? (
            <button type="button" className="btn btn-secondary" onClick={onOpenAdmin} aria-label="Abrir painel admin">
              <Icon name="check" size={16} />
              Admin
            </button>
          ) : null}
          <button type="button" className="btn btn-secondary" onClick={onLogout} disabled={loadingAuth} aria-label="Fazer logout">
            <Icon name="lock" size={16} />
            Sair
          </button>
        </div>
      </header>

      <section className="content-section">
        <div className="section-label">Trilha</div>
        <h2 className="section-heading">Cursos com página dedicada</h2>
        <div className="content-grid catalog-grid" role="list" aria-label="Cursos disponíveis">
          {courses.map((course) => (
            <article className="course-card" role="listitem" key={course.id}>
              <strong className="course-title">{course.title}</strong>
              <p className="course-description">{course.description}</p>
              <div className="course-meta" style={{ marginTop: 12 }}>
                <span className="status-badge">{course.id === 'module-01' ? 'Disponível' : course.active ? 'Ativo' : 'Rascunho'}</span>
              </div>
              <button type="button" className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => onOpenCourse(course.id)} aria-label={`Abrir ${course.title}`}>
                Abrir página
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

function AdminPage({ user, status, report, loading, onBack, onRefresh, onLogout, loadingAuth }) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-logo">
            <img src="https://mgenetica.github.io/mgenetica/images/mgenetica-logo-correct.png" alt="MGenética" style={{ width: 32, height: 32 }} />
          </div>
          <div className="brand-info">
            <div className="brand-name">Admin</div>
            <div className="brand-tagline">Painel de controle do sistema</div>
          </div>
        </div>
        <div className="header-actions">
          <span className="status-badge">{status}</span>
          <button type="button" className="btn btn-secondary" onClick={onBack}>
            <Icon name="arrowLeft" size={16} />
            Voltar
          </button>
          <button type="button" className="btn btn-secondary" onClick={onLogout} disabled={loadingAuth}>
            <Icon name="lock" size={16} />
            Sair
          </button>
        </div>
      </header>

      <section className="content-section">
        <div className="section-label">Controle</div>
        <h2 className="section-heading">Saúde, autenticação e backend</h2>
        <p className="section-description">
          Este painel valida configuração do Appwrite, sessão atual, funções publicadas e smoke checks de aprendizagem.
        </p>
        <div className="section-cta" style={{ marginTop: 16 }}>
          <button type="button" className="btn btn-primary" onClick={onRefresh} disabled={loading}>
            {loading ? 'Executando checks…' : 'Executar checks'}
          </button>
          <a className="btn btn-secondary" href={PUBLIC_SITE_URL} target="_blank" rel="noreferrer">
            Abrir URL live
          </a>
        </div>
      </section>

      <section className="content-section">
        <div className="content-grid catalog-grid">
          <article className="course-card">
            <strong className="course-title">Sessão</strong>
            <p className="course-description">{user?.email || user?.name || user?.$id || 'Sem usuário autenticado'}</p>
          </article>
          <article className="course-card">
            <strong className="course-title">Appwrite</strong>
            <p className="course-description">{APPWRITE_ENDPOINT}</p>
          </article>
          <article className="course-card">
            <strong className="course-title">Projeto</strong>
            <p className="course-description">{APPWRITE_PROJECT_ID}</p>
          </article>
        </div>
      </section>

      <section className="content-section">
        <div className="content-grid catalog-grid">
          {Object.entries(functionIds).map(([key, value]) => (
            <article className="course-card" key={key}>
              <strong className="course-title">{key}</strong>
              <p className="course-description">{value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="panel" style={{ padding: 18 }}>
          <strong style={{ display: 'block', marginBottom: 12 }}>Último relatório</strong>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: 13, lineHeight: 1.5 }}>
{JSON.stringify(report || { info: 'Nenhum check executado ainda.' }, null, 2)}
          </pre>
        </div>
      </section>
    </div>
  )
}

export default function App() {
  const [courses, setCourses] = useState([])
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loadingAdmin, setLoadingAdmin] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [screen, setScreen] = useState('home')
  const [showQuiz, setShowQuiz] = useState(false)
  const [selectedCourseId, setSelectedCourseId] = useState(null)
  const [status, setStatus] = useState('Sincronizando com o Appwrite…')
  const [adminReport, setAdminReport] = useState(null)

  useEffect(() => {
    pingAppwrite().catch(() => {})
    getAccount()
      .then((account) => {
        setUser(account)
        setStatus('Sessão verificada.')
      })
      .catch(() => setStatus('Entre para desbloquear o fluxo completo.'))

    listCourses()
      .then((items) => setCourses(items))
      .catch(() => setCourses([]))
  }, [])

  const catalogCourses = useMemo(() => {
    const items = [
      {
        id: 'module-01',
        title: module01.title,
        description: module01.description,
        active: true
      },
      ...(courses || []).map((course) => ({
        id: course.id,
        title: course.title,
        description: course.description,
        active: !!course.published
      }))
    ]
    const seen = new Set()
    return items.filter((course) => {
      if (seen.has(course.id)) return false
      seen.add(course.id)
      return true
    })
  }, [courses])

  const selectedCourse = useMemo(
    () => catalogCourses.find((course) => course.id === selectedCourseId) || null,
    [catalogCourses, selectedCourseId]
  )

  const nextCourse = useMemo(() => {
    if (!selectedCourseId) return null
    const currentIndex = catalogCourses.findIndex((course) => course.id === selectedCourseId)
    if (currentIndex === -1) return null
    return catalogCourses.slice(currentIndex + 1).find(Boolean) || null
  }, [catalogCourses, selectedCourseId])

  const adminEnabled = useMemo(() => isAdminUser(user), [user])

  async function handleLogin({ email, password }) {
    setLoadingAuth(true)
    try {
      await createEmailSession(email, password)
      const account = await getAccount()
      setUser(account)
      setAdminReport(null)
      setAuthMode('login')
      setStatus('Sessão iniciada com sucesso.')
      setScreen('home')
    } finally {
      setLoadingAuth(false)
    }
  }

  async function handleSignup({ email, password, name }) {
    setLoadingAuth(true)
    try {
      await createAccount(email, password, name)
      await createEmailSession(email, password)
      const account = await getAccount()
      setUser(account)
      setAdminReport(null)
      setAuthMode('login')
      setStatus('Conta criada e sessão iniciada.')
      setScreen('home')
    } finally {
      setLoadingAuth(false)
    }
  }

  async function handleLogout() {
    setLoadingAuth(true)
    try {
      await deleteSession()
      setUser(null)
      setScreen('home')
      setSelectedCourseId(null)
      setShowQuiz(false)
      setAuthMode('login')
      setAdminReport(null)
      setStatus('Sessão encerrada.')
    } finally {
      setLoadingAuth(false)
    }
  }

  function focusAuth(mode) {
    setAuthMode(mode)
    setScreen('auth')
    setShowQuiz(false)
    setSelectedCourseId(null)
  }

  function openCatalog() {
    if (!user) {
      setStatus('Entre para acessar os cursos.')
      return
    }
    setScreen('catalog')
    setShowQuiz(false)
    setSelectedCourseId(null)
  }

  function openCourse(courseId) {
    if (!user) {
      setStatus('Entre para acessar esta página do curso.')
      return
    }
    setSelectedCourseId(courseId)
    setScreen('course')
    setShowQuiz(false)
  }

  function openAdmin() {
    if (!adminEnabled) {
      setStatus('Usuário atual não está na lista de administradores.')
      return
    }
    setScreen('admin')
    setShowQuiz(false)
    setSelectedCourseId(null)
  }

  async function runAdminChecks() {
    setLoadingAdmin(true)
    setStatus('Executando checks de sistema…')
    try {
      const [ping, auth, coursesPayload, progress, admin] = await Promise.all([
        pingAppwrite().then(() => ({ ok: true })).catch((err) => ({ ok: false, error: err.message })),
        getAuthCapabilities().catch((err) => ({ ok: false, error: err.message })),
        listCourses().catch((err) => ({ ok: false, error: err.message })),
        getProgress(user?.$id || user?.email || 'anonymous').catch((err) => ({ ok: false, error: err.message })),
        getAdminStatus(user?.email || '').catch((err) => ({ ok: false, error: err.message }))
      ])

      setAdminReport({
        checkedAt: new Date().toISOString(),
        ping,
        auth,
        courses: coursesPayload,
        progress,
        admin,
        user: user ? { id: user.$id, email: user.email || null, name: user.name || null } : null
      })
      setStatus('Checks de sistema concluídos.')
    } catch (err) {
      setAdminReport({
        checkedAt: new Date().toISOString(),
        fatal: err.message || 'Falha ao executar checks.'
      })
      setStatus('Falha ao executar checks de sistema.')
    } finally {
      setLoadingAdmin(false)
    }
  }

  function goHome() {
    setScreen('home')
    setShowQuiz(false)
    setSelectedCourseId(null)
  }

  if (showQuiz) {
    return (
      <div className="app-shell">
        <div className="panel" style={{ padding: 18, marginBottom: 16 }}>
          <button type="button" className="btn btn-secondary" onClick={() => setShowQuiz(false)}>
            Voltar ao curso
          </button>
        </div>
        <Quiz />
      </div>
    )
  }

  if (screen === 'course' && selectedCourse) {
    return (
      <CoursePage
        course={selectedCourse}
        detail={selectedCourse.id === 'module-01' ? module01 : null}
        onBack={() => setScreen('catalog')}
        onOpenQuiz={() => setShowQuiz(true)}
        onOpenCatalog={openCatalog}
        onOpenCourse={openCourse}
        nextCourse={nextCourse}
        onLogout={handleLogout}
        loadingAuth={loadingAuth}
      />
    )
  }

  if (screen === 'catalog' && user) {
    return (
      <CatalogPage
        courses={catalogCourses}
        isAdmin={adminEnabled}
        onBack={goHome}
        onOpenCourse={openCourse}
        onOpenAdmin={openAdmin}
        onLogout={handleLogout}
        loadingAuth={loadingAuth}
      />
    )
  }

  if (screen === 'admin' && user) {
    return (
      <AdminPage
        user={user}
        status={status}
        report={adminReport}
        loading={loadingAdmin}
        onRefresh={runAdminChecks}
        onBack={goHome}
        onLogout={handleLogout}
        loadingAuth={loadingAuth}
      />
    )
  }

  if (screen === 'auth') {
    return (
      <AuthPage
        user={user}
        status={status}
        authMode={authMode}
        loadingAuth={loadingAuth}
        isAdmin={adminEnabled}
        onBack={goHome}
        onAuthIntent={setAuthMode}
        onLogin={handleLogin}
        onSignup={handleSignup}
        onLogout={handleLogout}
        onOpenCatalog={openCatalog}
        onOpenAdmin={openAdmin}
      />
    )
  }

  return (
    <HomePage
      user={user}
      status={status}
      loadingAuth={loadingAuth}
      isAdmin={adminEnabled}
      onAuthIntent={focusAuth}
      onLogout={handleLogout}
      onOpenCatalog={openCatalog}
      onOpenAdmin={openAdmin}
    />
  )
}
