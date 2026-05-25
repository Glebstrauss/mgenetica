import React from 'react'
import Icon from './components/Icon'
import { BRAND_LOGO_URL } from './lib/branding'

function SectionCard({ eyebrow, title, paragraphs, code, codeLabel }) {
  return (
    <section className="section-card">
      {eyebrow ? <div className="section-eyebrow">{eyebrow}</div> : null}
      <h3>{title}</h3>
      <div className="stack">
        {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      {code ? (
        <div className="code-panel" style={{ marginTop: 18 }}>
          <div className="code-caption">
            <strong>{codeLabel}</strong>
            <span>R</span>
          </div>
          <pre className="code-block"><code>{code}</code></pre>
        </div>
      ) : null}
    </section>
  )
}

function FullTextSection({ text }) {
  if (!text) return null
  return (
    <section className="section-card">
      <div className="section-eyebrow">Texto completo</div>
      <h3>Texto revisado da unidade</h3>
      <p>Conteúdo integral importado do pacote de textos do curso.</p>
      <div className="code-panel" style={{ marginTop: 18 }}>
        <div className="code-caption">
          <strong>Markdown original</strong>
          <span>MD</span>
        </div>
        <pre className="code-block"><code>{text}</code></pre>
      </div>
    </section>
  )
}

function LocaleSwitcher({ locale, onLocaleChange, t }) {
  return (
    <label className="locale-switcher" aria-label={t('localeSwitcher.label')}>
      <span className="locale-switcher-icon" aria-hidden="true">
        <Icon name="globe" size={16} />
      </span>
      <select className="locale-select" value={locale} onChange={(e) => onLocaleChange(e.target.value)}>
        {['pt-BR', 'en', 'es'].map((localeCode) => (
          <option key={localeCode} value={localeCode}>
            {t('locales.' + localeCode)}
          </option>
        ))}
      </select>
    </label>
  )
}

export default function CoursePage({ course, detail, progress, onBack, onOpenQuiz, onOpenCatalog, onOpenCourse, nextCourse, onLogout, loadingAuth, locale, onLocaleChange, t }) {
  return (
    <div className="app-shell">
      <header className="app-header course-header">
        <div className="header-brand">
          <div className="brand-logo">
            <img src={BRAND_LOGO_URL} alt={t('common.brandName')} style={{ width: 32, height: 32 }} />
          </div>
          <div className="brand-info">
            <div className="brand-name">{course.title}</div>
            <div className="brand-tagline">{t('coursePage.dedicatedPage')}</div>
          </div>
        </div>
        <div className="header-actions">
          <LocaleSwitcher locale={locale} onLocaleChange={onLocaleChange} t={t} />
          <button type="button" className="btn btn-secondary" onClick={onBack}>
            <Icon name="arrowLeft" size={16} />
            {t('coursePage.backToCatalog')}
          </button>
          {onOpenCatalog ? (
            <button type="button" className="btn btn-secondary" onClick={onOpenCatalog}>
              <Icon name="layers" size={16} />
              {t('coursePage.catalog')}
            </button>
          ) : null}
          <button type="button" className="btn btn-secondary" onClick={onLogout} disabled={loadingAuth}>
            <Icon name="arrowLeft" size={16} />
            {t('common.logout')}
          </button>
        </div>
      </header>
      <a className="skip-link" href="#main-content">{t('common.skipToContent') || 'Skip to content'}</a>
      {detail ? (
        <main id="main-content" className="stack" tabIndex="-1">
          <article className="module-card">
            <div className="module-header">
              <div className="badge-row">
                <span className="module-badge">{detail.badge}</span>
                {detail.meta.map((item) => <span className="chip" key={item}>{item}</span>)}
              </div>
              <div className="module-meta">
                {detail.moduleMeta.map((item) => <React.Fragment key={item}><span>{item}</span></React.Fragment>)}
              </div>
            </div>
            <h2 className="module-title">{detail.title}</h2>
            <p className="module-description">{detail.description}</p>
          </article>
          <section className="section-card">
            <div className="section-eyebrow">{t('coursePage.progressEyebrow')}</div>
            <h3>{t('coursePage.progressTitle')}</h3>
            <div className="content-grid catalog-grid">
              <article className="course-card">
                <strong className="course-title">{t('coursePage.progressPercent')}</strong>
                <p className="course-description">{progress ? t('coursePage.progressPercentValue', { percent: progress.percent }) : t('coursePage.progressEmpty')}</p>
              </article>
              <article className="course-card">
                <strong className="course-title">{t('coursePage.progressAssessment')}</strong>
                <p className="course-description">{progress ? (progress.passed ? t('coursePage.progressPassed') : t('coursePage.progressReview')) : t('coursePage.progressPending')}</p>
              </article>
              <article className="course-card">
                <strong className="course-title">{t('coursePage.progressAttempts')}</strong>
                <p className="course-description">{progress ? t('coursePage.progressAttemptsValue', { count: progress.attempts || 0 }) : t('coursePage.progressPending')}</p>
              </article>
            </div>
          </section>
          {detail.sections.map((section) => (
            <SectionCard
              key={section.eyebrow + section.title}
              eyebrow={section.eyebrow}
              title={section.title}
              paragraphs={section.paragraphs}
              code={section.code}
              codeLabel={section.codeLabel}
            />
          ))}
          <FullTextSection text={detail.fullText} />
          <section className="section-card">
            <div className="section-eyebrow">{t('coursePage.actionEyebrow')}</div>
            <h3>{t('coursePage.actionTitle')}</h3>
            <p>{t('coursePage.afterQuizCopy')}</p>
            <div className="hero-actions" style={{ marginTop: 16 }}>
              <button type="button" className="btn btn-primary" onClick={onOpenQuiz}>
                <Icon name="arrowRight" size={16} />
                {t('coursePage.openQuiz')}
              </button>
              <button type="button" className="btn btn-secondary" onClick={onBack}>
                <Icon name="arrowLeft" size={16} />
                {t('coursePage.backToCatalog')}
              </button>
            </div>
          </section>
          <section className="section-card">
            <div className="section-eyebrow">{t('coursePage.closingEyebrow')}</div>
            <h3>{t('coursePage.closingTitle')}</h3>
            <p>{t('coursePage.closingCopy')}</p>
            <div className="module-nav" style={{ marginTop: 16 }}>
              <button className="module-nav-card" type="button" onClick={onOpenCatalog}>
                <Icon name="layers" size={16} />
                <span>{t('coursePage.index')}</span>
                <strong>{t('coursePage.allModules')}</strong>
              </button>
              {nextCourse && onOpenCourse ? (
                <button className="module-nav-card" type="button" onClick={() => onOpenCourse(nextCourse.id)}>
                  <Icon name="arrowRight" size={16} />
                  <span>{t('coursePage.nextCourse')}</span>
                  <strong>{nextCourse.title}</strong>
                </button>
              ) : (
                <button className="module-nav-card" type="button" onClick={onOpenCatalog}>
                  <Icon name="arrowRight" size={16} />
                  <span>{t('coursePage.next')}</span>
                  <strong>{t('coursePage.nextCatalogFallback')}</strong>
                </button>
              )}
            </div>
          </section>
        </main>
      ) : (
        <main id="main-content" className="stack" tabIndex="-1">
          <article className="module-card">
            <div className="module-header">
              <div className="badge-row">
                <span className="module-badge">{course.id}</span>
                <span className="chip">{course.active ? t('common.available') : t('common.draft')}</span>
              </div>
              <div className="module-meta">
                <span>{t('common.dedicatedCourse')}</span>
              </div>
            </div>
            <h2 className="module-title">{course.title}</h2>
            <p className="module-description">{course.description}</p>
          </article>
          <section className="section-card">
            <div className="section-eyebrow">{t('coursePage.constructionEyebrow')}</div>
            <h3>{t('coursePage.constructionTitle')}</h3>
            <p>{t('coursePage.constructionCopy')}</p>
          </section>
        </main>
      )}
    </div>
  )
}
