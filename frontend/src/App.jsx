import React, {useEffect, useMemo, useState} from 'react'
import { module01 } from './data/module01'
import Quiz from './Quiz'
import {
  pingAppwrite,
  listCourses,
  createEmailSession,
  createAccount,
  deleteSession,
  getAccount
} from './lib/appwrite'

function SectionCard({ title, children, eyebrow }) {
  return (
    <section className="section-card">
      {eyebrow ? <div className="section-eyebrow">{eyebrow}</div> : null}
      <h3>{title}</h3>
      {children}
    </section>
  )
}

function AuthPanel({ user, onLogin, onSignup, onLogout, loading }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

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
      setError(err.message || 'Não foi possível autenticar.')
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
            <button type="button" className={`tab ${mode === 'login' ? 'active' : ''}`} onClick={() => setMode('login')}>
              Entrar
            </button>
            <button type="button" className={`tab ${mode === 'signup' ? 'active' : ''}`} onClick={() => setMode('signup')}>
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
                {loading ? 'Processando…' : mode === 'login' ? 'Entrar' : 'Criar conta'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
                {mode === 'login' ? 'Quero criar conta' : 'Já tenho conta'}
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="login-cta">
            <div className="pill">Sessão ativa</div>
            <div className="auth-status">
              <strong>{user.email || user.name || user.$id}</strong>
              <div className="subtle" style={{ marginTop: 6 }}>
                Você pode continuar lendo o módulo e abrir quizzes com a sessão atual.
              </div>
            </div>
            <button className="btn btn-secondary" onClick={onLogout}>
              Sair da conta
            </button>
          </div>
        </>
      )}
    </aside>
  )
}

function CodeBlock({ block }) {
  return (
    <div className="section-card">
      <div className="code-caption">
        <strong>{block.title}</strong>
        <span>{block.label}</span>
      </div>
      <pre className="code-block">
        <code>{block.code}</code>
      </pre>
    </div>
  )
}

export default function App() {
  const [courses, setCourses] = useState([])
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [status, setStatus] = useState('Sincronizando com o Appwrite…')

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

  const moduleCards = useMemo(
    () => [
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
    ],
    [courses]
  )

  async function handleLogin({ email, password }) {
    setLoadingAuth(true)
    try {
      await createEmailSession(email, password)
      const account = await getAccount()
      setUser(account)
      setStatus('Sessão iniciada com sucesso.')
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
      setStatus('Conta criada e sessão iniciada.')
    } finally {
      setLoadingAuth(false)
    }
  }

  async function handleLogout() {
    setLoadingAuth(true)
    try {
      await deleteSession()
      setUser(null)
      setStatus('Sessão encerrada.')
    } finally {
      setLoadingAuth(false)
    }
  }

  if (showQuiz) {
    return (
      <div className="app-shell">
        <div className="panel" style={{ padding: 18, marginBottom: 16 }}>
          <button className="btn btn-secondary" onClick={() => setShowQuiz(false)}>
            Voltar ao módulo
          </button>
        </div>
        <Quiz />
      </div>
    )
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">MG</div>
          <div className="brand-copy">
            <div className="brand-title">MGenética</div>
            <div className="brand-subtitle">Curso online em genética quantitativa e genômica aplicada</div>
          </div>
        </div>
        <div className="topbar-actions">
          <span className="pill">{status}</span>
          {user ? (
            <button className="btn btn-secondary" onClick={handleLogout} disabled={loadingAuth}>
              Sair
            </button>
          ) : (
            <a className="btn btn-primary" href="#auth">
              Entrar
            </a>
          )}
        </div>
      </header>

      <div className="layout-grid">
        <section className="hero-card">
          <div className="hero-kicker">Educação aplicada · Melhoramento genético animal</div>
          <h1 className="hero-title">Genética que vira decisão no campo.</h1>
          <p className="hero-summary">
            Uma trilha curta, prática e verificável: conceito, dados simulados, código em R, interpretação técnica e
            quizzes para consolidar a decisão.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#module-01">
              Abrir Módulo 01
            </a>
            <a className="btn btn-secondary" href="#modules">
              Ver trilha
            </a>
            <a className="btn btn-ghost" href="#auth">
              Conta e progresso
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <strong>12</strong>
              <span>módulos na trilha</span>
            </div>
            <div className="stat">
              <strong>R + Quarto</strong>
              <span>conteúdo reproduzível</span>
            </div>
            <div className="stat">
              <strong>Quiz</strong>
              <span>avaliação por módulo</span>
            </div>
          </div>
        </section>

        <div id="auth">
          <AuthPanel
            user={user}
            loading={loadingAuth}
            onLogin={handleLogin}
            onSignup={handleSignup}
            onLogout={handleLogout}
          />
        </div>
      </div>

      <div className="workspace">
        <aside className="toc-card" id="modules">
          <div className="toc-title">Trilha</div>
          <div className="toc-list">
            <a className="toc-item active" href="#module-01">
              <span>Módulo 01</span>
              <small>Fundamentos</small>
            </a>
            {moduleCards.slice(1, 5).map((course) => (
              <a className="toc-item" href="#courses" key={course.id}>
                <span>{course.title}</span>
                <small>{course.active ? 'Ativo' : 'Rascunho'}</small>
              </a>
            ))}
          </div>
        </aside>

        <main className="stack">
          <article className="module-card" id="module-01">
            <div className="module-header">
              <div className="badge-row">
                <span className="module-badge">{module01.badge}</span>
                {module01.meta.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <div className="module-meta">
                <span>Leitura</span>
                <span>·</span>
                <span>R</span>
                <span>·</span>
                <span>Quiz</span>
              </div>
            </div>

            <h2 className="module-title">{module01.title}</h2>
            <p className="module-description">{module01.description}</p>

            <div className="section-grid" style={{ marginTop: 18 }}>
              {module01.orientation.map((item) => (
                <div className="mini-card" key={item}>
                  <strong>{item}</strong>
                  <p>
                    {item === 'Leitura'
                      ? 'Entenda a pergunta biológica antes de executar qualquer código.'
                      : item === 'Simulação em R'
                        ? 'Use o script para gerar evidência e comparar cenários.'
                        : 'Feche a página com uma conclusão técnica curta e útil.'}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <SectionCard eyebrow="Ritmo" title="Como estudar este módulo">
            <p>{module01.readingRhythm}</p>
          </SectionCard>

          <SectionCard eyebrow="Sessão" title={module01.sessionPlan.title}>
            <p>{module01.sessionPlan.copy}</p>
            <div className="section-grid" style={{ marginTop: 16 }}>
              {module01.sessionPlan.steps.map((step) => (
                <div className="mini-card" key={step.title}>
                  <strong>{step.title}</strong>
                  <p>{step.copy}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard eyebrow="Leitura técnica" title={module01.technicalScan.title}>
            <p>{module01.technicalScan.copy}</p>
            <div className="section-grid" style={{ marginTop: 16 }}>
              {module01.technicalScan.steps.map((step) => (
                <div className="mini-card" key={step.title}>
                  <strong>{step.title}</strong>
                  <p>{step.copy}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard eyebrow="Contexto" title="O problema antes da fórmula">
            <div className="stack">
              {module01.introParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="callout-card" style={{ marginTop: 16 }}>
              <h3>Conceito central</h3>
              <p>{module01.centralConcept}</p>
            </div>
          </SectionCard>

          <SectionCard eyebrow="Equação" title="A equação do melhorista">
            <div className="equation-box">
              <div className="equation">{module01.equation}</div>
              <p className="subtle">
                O ganho genético anual depende da intensidade de seleção, da acurácia, da variância genética aditiva e do intervalo de geração.
              </p>
              <table className="symbol-table">
                <thead>
                  <tr>
                    <th>Símbolo</th>
                    <th>Significado</th>
                    <th>Como aumentar</th>
                  </tr>
                </thead>
                <tbody>
                  {module01.symbols.map(([symbol, meaning, tip]) => (
                    <tr key={symbol}>
                      <td><strong>{symbol}</strong></td>
                      <td>{meaning}</td>
                      <td>{tip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="callout-card">
                <h3>Dica prática</h3>
                <p>{module01.equationNote}</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard eyebrow="Simulação em R" title={module01.scriptLab.title}>
            <p>{module01.scriptLab.copy}</p>
            <div className="section-grid" style={{ marginTop: 16 }}>
              {module01.scriptLab.items.map((item) => (
                <div className="mini-card" key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.copy}</p>
                  {item.href ? (
                    <a className="btn btn-secondary" style={{ marginTop: 10 }} href={item.href}>
                      Abrir arquivo
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </SectionCard>

          {module01.codeBlocks.map((block) => (
            <CodeBlock key={block.label} block={block} />
          ))}

          <SectionCard eyebrow="Interpretação" title="Como ler os resultados">
            <ul className="takeaway-list">
              {module01.interpretation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="callout-warning" style={{ marginTop: 16 }}>
              <strong>Atenção:</strong> {module01.warning}
            </div>
          </SectionCard>

          <SectionCard eyebrow="Evidência" title="Caminho de evidência">
            <p>{module01.evidencePath}</p>
            <div className="callout-card" style={{ marginTop: 16 }}>
              <p>{module01.practiceContract}</p>
            </div>
          </SectionCard>

          <SectionCard eyebrow="Exercício" title="Exercício proposto">
            <ol className="exercise-list">
              {module01.exercises.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </SectionCard>

          <SectionCard eyebrow="Checkpoint" title="Antes do quiz">
            <p>{module01.checkpoint}</p>
          </SectionCard>

          <SectionCard eyebrow="Resumo" title="O que levar deste módulo">
            <ul className="takeaway-list">
              {module01.takeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard eyebrow="Ação" title="Depois do quiz">
            <p>{module01.afterQuiz}</p>
          </SectionCard>

          <SectionCard eyebrow="Fechamento" title="Antes de trocar de página">
            <div className="stack">
              <p>{module01.closeCheck}</p>
              <p>{module01.returnNote}</p>
            </div>
            <div className="module-nav" style={{ marginTop: 16 }}>
              <a className="module-nav-card" href="#">
                <span>Índice</span>
                <strong>Todos os módulos</strong>
              </a>
              <a className="module-nav-card" href={module01.nextModule.href}>
                <span>Próximo · Módulo 02</span>
                <strong>{module01.nextModule.title}</strong>
              </a>
            </div>
          </SectionCard>

          <SectionCard eyebrow="Cursos conectados" title="Outras ofertas da trilha">
            <div className="section-grid" id="courses">
              {moduleCards.map((course) => (
                <div className="mini-card" key={course.id}>
                  <strong>{course.title}</strong>
                  <p>{course.description}</p>
                  {course.id === 'module-01' ? (
                    <button className="btn btn-primary" style={{ marginTop: 10 }} onClick={() => setSelectedCourse(module01)}>
                      Abrir módulo
                    </button>
                  ) : (
                    <span className="chip" style={{ marginTop: 10, display: 'inline-flex' }}>
                      {course.active ? 'Disponível' : 'Em construção'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard eyebrow="Certificação" title="Pronto para começar?">
            <p className="subtle">
              Abra o primeiro módulo, faça a leitura guiada, execute o R e conclua com uma decisão técnica curta.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#module-01">
                Acessar Módulo 01
              </a>
              <a className="btn btn-secondary" href="#auth">
                Entrar ou criar conta
              </a>
            </div>
          </SectionCard>

          {selectedCourse ? (
            <SectionCard eyebrow="Resumo de seleção" title={selectedCourse.title}>
              <p>{selectedCourse.description || module01.description}</p>
            </SectionCard>
          ) : null}
        </main>
      </div>
    </div>
  )
}
