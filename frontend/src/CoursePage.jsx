import React from 'react'
import Icon from './components/Icon'

function SectionCard({ title, children, eyebrow }) {
  return <section className="section-card">{eyebrow ? <div className="section-eyebrow">{eyebrow}</div> : null}<h3>{title}</h3>{children}</section>
}

function CodeBlock({ block }) {
  return <div className="section-card"><div className="code-caption"><strong>{block.title}</strong><span>{block.label}</span></div><pre className="code-block"><code>{block.code}</code></pre></div>
}

export default function CoursePage({ course, detail, onBack, onOpenQuiz, onOpenCatalog, onOpenCourse, nextCourse, onLogout, loadingAuth, locale, onLocaleChange, t }) {
  const appBase = import.meta.env.BASE_URL || '/'
  const resolveAssetHref = (assetPath) => appBase.replace(/\/?$/, '/') + assetPath.replace(/^\//, '')
  return (
    <div className="app-shell">
      <header className="app-header course-header">
        <div className="header-brand"><div className="brand-logo"><img src="https://mgenetica.github.io/mgenetica/images/mgenetica-logo-correct.png" alt={t('common.brandName')} style={{ width: 32, height: 32 }} /></div><div className="brand-info"><div className="brand-name">{course.title}</div><div className="brand-tagline">{t('coursePage.dedicatedPage')}</div></div></div>
        <div className="header-actions"><div className="auth-tabs" role="group" aria-label={t('localeSwitcher.label')}>{['pt-BR','en','es'].map((localeCode) => <button type="button" key={localeCode} className={'tab ' + (locale === localeCode ? 'active' : '')} onClick={() => onLocaleChange(localeCode)}>{t('locales.' + localeCode)}</button>)}</div><button type="button" className="btn btn-secondary" onClick={onBack}><Icon name="arrowLeft" size={16} />{t('coursePage.backToCatalog')}</button>{onOpenCatalog ? <button type="button" className="btn btn-secondary" onClick={onOpenCatalog}><Icon name="layers" size={16} />{t('coursePage.catalog')}</button> : null}<button type="button" className="btn btn-secondary" onClick={onLogout} disabled={loadingAuth}><Icon name="arrowLeft" size={16} />{t('common.logout')}</button></div>
      </header>
      {detail ? (
        <main className="stack">
          <article className="module-card"><div className="module-header"><div className="badge-row"><span className="module-badge">{detail.badge}</span>{detail.meta.map((item) => <span className="chip" key={item}>{item}</span>)}</div><div className="module-meta"><span>{t('common.reading')}</span><span>·</span><span>R</span><span>·</span><span>{t('coursePage.moduleMetaQuiz')}</span></div></div><h2 className="module-title">{detail.title}</h2><p className="module-description">{detail.description}</p></article>
          <SectionCard eyebrow={t('common.reading')} title={t('coursePage.studyTitle')}><p>{detail.readingRhythm}</p></SectionCard>
          <SectionCard eyebrow={detail.sessionPlan.title} title={detail.sessionPlan.title}><p>{detail.sessionPlan.copy}</p><div className="section-grid" style={{ marginTop: 16 }}>{detail.sessionPlan.steps.map((step) => <div className="mini-card" key={step.title}><strong>{step.title}</strong><p>{step.copy}</p></div>)}</div></SectionCard>
          <SectionCard eyebrow={detail.technicalScan.title} title={detail.technicalScan.title}><p>{detail.technicalScan.copy}</p><div className="section-grid" style={{ marginTop: 16 }}>{detail.technicalScan.steps.map((step) => <div className="mini-card" key={step.title}><strong>{step.title}</strong><p>{step.copy}</p></div>)}</div></SectionCard>
          <SectionCard eyebrow={t('coursePage.contextEyebrow')} title={t('coursePage.contextTitle')}><div className="stack">{detail.introParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="callout-card" style={{ marginTop: 16 }}><h3>{t('coursePage.centralConcept')}</h3><p>{detail.centralConcept}</p></div></SectionCard>
          <SectionCard eyebrow={t('coursePage.equationEyebrow')} title={t('coursePage.equationTitle')}><div className="equation-box"><div className="equation">{detail.equation}</div><p className="subtle">{t('coursePage.equationCopy')}</p><table className="symbol-table"><thead><tr><th>{t('coursePage.symbols.symbol')}</th><th>{t('coursePage.symbols.meaning')}</th><th>{t('coursePage.symbols.increase')}</th></tr></thead><tbody>{detail.symbols.map(([symbol, meaning, tip]) => <tr key={symbol}><td><strong>{symbol}</strong></td><td>{meaning}</td><td>{tip}</td></tr>)}</tbody></table><div className="callout-card"><h3>{t('coursePage.practicalTip')}</h3><p>{detail.equationNote}</p></div></div></SectionCard>
          <SectionCard eyebrow="R" title={detail.scriptLab.title}><p>{detail.scriptLab.copy}</p><div className="section-grid" style={{ marginTop: 16 }}>{detail.scriptLab.items.map((item) => <div className="mini-card" key={item.title}><strong>{item.title}</strong><p>{item.copy}</p>{item.assetPath ? <a className="btn btn-secondary" style={{ marginTop: 10 }} href={resolveAssetHref(item.assetPath)} target="_blank" rel="noreferrer">{t('common.openFile')}</a> : null}</div>)}</div></SectionCard>
          {detail.codeBlocks.map((block) => <CodeBlock key={block.label} block={block} />)}
          <SectionCard eyebrow={t('coursePage.interpretationEyebrow')} title={t('coursePage.interpretationTitle')}><ul className="takeaway-list">{detail.interpretation.map((item) => <li key={item}>{item}</li>)}</ul><div className="callout-warning" style={{ marginTop: 16 }}><strong>{t('coursePage.warning')}</strong> {detail.warning}</div></SectionCard>
          <SectionCard eyebrow={t('coursePage.evidenceEyebrow')} title={t('coursePage.evidenceTitle')}><p>{detail.evidencePath}</p><div className="callout-card" style={{ marginTop: 16 }}><p>{detail.practiceContract}</p></div></SectionCard>
          <SectionCard eyebrow={t('coursePage.exerciseEyebrow')} title={t('coursePage.exerciseTitle')}><ol className="exercise-list">{detail.exercises.map((item) => <li key={item}>{item}</li>)}</ol></SectionCard>
          <SectionCard eyebrow={t('coursePage.checkpointEyebrow')} title={t('coursePage.checkpointTitle')}><p>{detail.checkpoint}</p></SectionCard>
          <SectionCard eyebrow={t('coursePage.summaryEyebrow')} title={t('coursePage.summaryTitle')}><ul className="takeaway-list">{detail.takeaways.map((item) => <li key={item}>{item}</li>)}</ul></SectionCard>
          <SectionCard eyebrow={t('coursePage.actionEyebrow')} title={t('coursePage.actionTitle')}><p>{detail.afterQuiz}</p><div className="hero-actions" style={{ marginTop: 16 }}><button type="button" className="btn btn-primary" onClick={onOpenQuiz}><Icon name="arrowRight" size={16} />{t('coursePage.openQuiz')}</button><button type="button" className="btn btn-secondary" onClick={onBack}><Icon name="arrowLeft" size={16} />{t('coursePage.backToCatalog')}</button></div></SectionCard>
          <SectionCard eyebrow={t('coursePage.closingEyebrow')} title={t('coursePage.closingTitle')}><div className="stack"><p>{detail.closeCheck}</p><p>{detail.returnNote}</p></div><div className="module-nav" style={{ marginTop: 16 }}><button className="module-nav-card" type="button" onClick={onOpenCatalog}><Icon name="layers" size={16} /><span>{t('coursePage.index')}</span><strong>{t('coursePage.allModules')}</strong></button>{nextCourse && onOpenCourse ? <button className="module-nav-card" type="button" onClick={() => onOpenCourse(nextCourse.id)}><Icon name="arrowRight" size={16} /><span>{t('coursePage.nextCourse')}</span><strong>{nextCourse.title}</strong></button> : <button className="module-nav-card" type="button" onClick={onOpenCatalog}><Icon name="arrowRight" size={16} /><span>{t('coursePage.next')}</span><strong>{t('coursePage.nextCatalogFallback')}</strong></button>}</div></SectionCard>
        </main>
      ) : (
        <main className="stack"><article className="module-card"><div className="module-header"><div className="badge-row"><span className="module-badge">{course.id}</span><span className="chip">{course.active ? t('common.available') : t('common.draft')}</span></div><div className="module-meta"><span>{t('common.dedicatedCourse')}</span></div></div><h2 className="module-title">{course.title}</h2><p className="module-description">{course.description}</p></article><SectionCard eyebrow={t('coursePage.constructionEyebrow')} title={t('coursePage.constructionTitle')}><p>{t('coursePage.constructionCopy')}</p></SectionCard></main>
      )}
    </div>
  )
}
