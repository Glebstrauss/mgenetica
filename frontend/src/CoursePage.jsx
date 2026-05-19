import React from 'react'
import Icon from './components/Icon'

function SectionCard({ title, children, eyebrow }) {
  return (
    <section className="section-card">
      {eyebrow ? <div className="section-eyebrow">{eyebrow}</div> : null}
      <h3>{title}</h3>
      {children}
    </section>
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

export default function CoursePage({
  course,
  detail,
  onBack,
  onOpenQuiz,
  onOpenCatalog,
  onOpenCourse,
  nextCourse,
  onLogout,
  loadingAuth
}) {
  const appBase = import.meta.env.BASE_URL || '/'
  const resolveAssetHref = (assetPath) => `${appBase.replace(/\/?$/, '/')}${assetPath.replace(/^\//, '')}`

  return (
    <div className="app-shell">
      <header className="app-header course-header">
        <div className="header-brand">
          <div className="brand-logo">
            <img src="https://mgenetica.github.io/mgenetica/images/mgenetica-logo-correct.png" alt="MGenética" style={{ width: 32, height: 32 }} />
          </div>
          <div className="brand-info">
            <div className="brand-name">{course.title}</div>
            <div className="brand-tagline">Página dedicada do curso</div>
          </div>
        </div>
        <div className="header-actions">
          <button type="button" className="btn btn-secondary" onClick={onBack}>
            <Icon name="arrowLeft" size={16} />
            Voltar ao catálogo
          </button>
          {onOpenCatalog ? (
            <button type="button" className="btn btn-secondary" onClick={onOpenCatalog}>
              <Icon name="layers" size={16} />
              Catálogo
            </button>
          ) : null}
          <button type="button" className="btn btn-secondary" onClick={onLogout} disabled={loadingAuth}>
            <Icon name="arrowLeft" size={16} />
            Sair
          </button>
        </div>
      </header>

      {detail ? (
        <main className="stack">
          <article className="module-card">
            <div className="module-header">
              <div className="badge-row">
                <span className="module-badge">{detail.badge}</span>
                {detail.meta.map((item) => (
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

            <h2 className="module-title">{detail.title}</h2>
            <p className="module-description">{detail.description}</p>
          </article>

          <SectionCard eyebrow="Ritmo" title="Como estudar este módulo">
            <p>{detail.readingRhythm}</p>
          </SectionCard>

          <SectionCard eyebrow="Sessão" title={detail.sessionPlan.title}>
            <p>{detail.sessionPlan.copy}</p>
            <div className="section-grid" style={{ marginTop: 16 }}>
              {detail.sessionPlan.steps.map((step) => (
                <div className="mini-card" key={step.title}>
                  <strong>{step.title}</strong>
                  <p>{step.copy}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard eyebrow="Leitura técnica" title={detail.technicalScan.title}>
            <p>{detail.technicalScan.copy}</p>
            <div className="section-grid" style={{ marginTop: 16 }}>
              {detail.technicalScan.steps.map((step) => (
                <div className="mini-card" key={step.title}>
                  <strong>{step.title}</strong>
                  <p>{step.copy}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard eyebrow="Contexto" title="O problema antes da fórmula">
            <div className="stack">
              {detail.introParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="callout-card" style={{ marginTop: 16 }}>
              <h3>Conceito central</h3>
              <p>{detail.centralConcept}</p>
            </div>
          </SectionCard>

          <SectionCard eyebrow="Equação" title="A equação do melhorista">
            <div className="equation-box">
              <div className="equation">{detail.equation}</div>
              <p className="subtle">
                O ganho genético anual depende da intensidade de seleção, da acurácia, da variância genética aditiva e
                do intervalo de geração.
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
                  {detail.symbols.map(([symbol, meaning, tip]) => (
                    <tr key={symbol}>
                      <td>
                        <strong>{symbol}</strong>
                      </td>
                      <td>{meaning}</td>
                      <td>{tip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="callout-card">
                <h3>Dica prática</h3>
                <p>{detail.equationNote}</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard eyebrow="Simulação em R" title={detail.scriptLab.title}>
            <p>{detail.scriptLab.copy}</p>
            <div className="section-grid" style={{ marginTop: 16 }}>
              {detail.scriptLab.items.map((item) => (
                <div className="mini-card" key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.copy}</p>
                  {item.assetPath ? (
                    <a
                      className="btn btn-secondary"
                      style={{ marginTop: 10 }}
                      href={resolveAssetHref(item.assetPath)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Abrir arquivo
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </SectionCard>

          {detail.codeBlocks.map((block) => (
            <CodeBlock key={block.label} block={block} />
          ))}

          <SectionCard eyebrow="Interpretação" title="Como ler os resultados">
            <ul className="takeaway-list">
              {detail.interpretation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="callout-warning" style={{ marginTop: 16 }}>
              <strong>Atenção:</strong> {detail.warning}
            </div>
          </SectionCard>

          <SectionCard eyebrow="Evidência" title="Caminho de evidência">
            <p>{detail.evidencePath}</p>
            <div className="callout-card" style={{ marginTop: 16 }}>
              <p>{detail.practiceContract}</p>
            </div>
          </SectionCard>

          <SectionCard eyebrow="Exercício" title="Exercício proposto">
            <ol className="exercise-list">
              {detail.exercises.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </SectionCard>

          <SectionCard eyebrow="Checkpoint" title="Antes do quiz">
            <p>{detail.checkpoint}</p>
          </SectionCard>

          <SectionCard eyebrow="Resumo" title="O que levar deste módulo">
            <ul className="takeaway-list">
              {detail.takeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </SectionCard>

          <SectionCard eyebrow="Ação" title="Depois do quiz">
            <p>{detail.afterQuiz}</p>
            <div className="hero-actions" style={{ marginTop: 16 }}>
              <button type="button" className="btn btn-primary" onClick={onOpenQuiz}>
                <Icon name="arrowRight" size={16} />
                Abrir quiz
              </button>
              <button type="button" className="btn btn-secondary" onClick={onBack}>
                <Icon name="arrowLeft" size={16} />
                Voltar ao catálogo
              </button>
            </div>
          </SectionCard>

          <SectionCard eyebrow="Fechamento" title="Antes de trocar de página">
            <div className="stack">
              <p>{detail.closeCheck}</p>
              <p>{detail.returnNote}</p>
            </div>
            <div className="module-nav" style={{ marginTop: 16 }}>
              <button className="module-nav-card" type="button" onClick={onOpenCatalog}>
                <Icon name="layers" size={16} />
                <span>Índice</span>
                <strong>Todos os módulos</strong>
              </button>
              {nextCourse && onOpenCourse ? (
                <button className="module-nav-card" type="button" onClick={() => onOpenCourse(nextCourse.id)}>
                  <Icon name="arrowRight" size={16} />
                  <span>Próximo curso</span>
                  <strong>{nextCourse.title}</strong>
                </button>
              ) : (
                <button className="module-nav-card" type="button" onClick={onOpenCatalog}>
                  <Icon name="arrowRight" size={16} />
                  <span>Próximo</span>
                  <strong>Veja os próximos cursos no catálogo</strong>
                </button>
              )}
            </div>
          </SectionCard>
        </main>
      ) : (
        <main className="stack">
          <article className="module-card">
            <div className="module-header">
              <div className="badge-row">
                <span className="module-badge">{course.id}</span>
                <span className="chip">{course.active ? 'Disponível' : 'Rascunho'}</span>
              </div>
              <div className="module-meta">
                <span>Curso dedicado</span>
              </div>
            </div>

            <h2 className="module-title">{course.title}</h2>
            <p className="module-description">{course.description}</p>
          </article>

          <SectionCard eyebrow="Status" title="Conteúdo em construção">
            <p>
              Esta página já está dedicada ao curso, mas o conteúdo completo ainda será preenchido na próxima etapa da
              trilha.
            </p>
          </SectionCard>
        </main>
      )}
    </div>
  )
}
