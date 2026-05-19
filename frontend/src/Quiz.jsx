import React, {useEffect, useMemo, useState} from 'react'
import Icon from './components/Icon'
import { getQuiz, normalizeAppError, submitQuiz } from './lib/appwrite'

export default function Quiz({ courseId, courseTitle, locale, onBack, onPersistResult, t }) {
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [saveState, setSaveState] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    setResult(null)
    setSaveState('')
    getQuiz(courseId, locale)
      .then((payload) => {
        if (!active) return
        setQuiz(payload)
        setAnswers(new Array((payload?.questions || []).length).fill(null))
      })
      .catch((err) => {
        if (!active) return
        setError(normalizeAppError(err, {
          servicesUnavailable: t('quiz.servicesUnavailable'),
          sessionRequired: t('quiz.sessionRequired'),
          generic: t('quiz.loadError')
        }))
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [courseId, locale, t])

  const answeredCount = useMemo(() => answers.filter((value) => value !== null).length, [answers])

  function updateAnswer(questionIndex, optionIndex) {
    setAnswers((current) => {
      const next = current.slice()
      next[questionIndex] = optionIndex
      return next
    })
  }

  async function handleSubmit() {
    setSubmitting(true)
    setError('')
    setSaveState('')
    try {
      const payload = await submitQuiz(courseId, answers, locale)
      setResult(payload)
      if (onPersistResult) {
        await onPersistResult(payload)
        setSaveState(t('quiz.progressSaved'))
      }
    } catch (err) {
      setError(normalizeAppError(err, {
        servicesUnavailable: t('quiz.servicesUnavailable'),
        sessionRequired: t('quiz.sessionRequired'),
        generic: t('quiz.submitError')
      }))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="app-shell">
      <section className="content-section quiz-shell">
        <div className="section-label">{t('quiz.label')}</div>
        <h1 className="section-heading">{courseTitle || t('quiz.title')}</h1>
        <p className="section-description">
          {loading ? t('quiz.loading') : quiz?.subtitle || t('quiz.description')}
        </p>
        <div className="section-cta" style={{ marginTop: 16 }}>
          <button type="button" className="btn btn-secondary" onClick={onBack}>
            <Icon name="arrowLeft" size={16} />
            {t('quiz.backToCourse')}
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={loading || submitting || !quiz || answeredCount !== answers.length}>
            <Icon name="check" size={16} />
            {submitting ? t('quiz.submitting') : t('quiz.submit')}
          </button>
        </div>
      </section>

      {error ? (
        <section className="content-section">
          <div className="callout-warning"><strong>{t('quiz.errorLabel')}</strong> {error}</div>
        </section>
      ) : null}

      {saveState ? (
        <section className="content-section">
          <div className="callout-card">{saveState}</div>
        </section>
      ) : null}

      {!loading && quiz ? (
        <section className="content-section stack">
          <div className="content-grid catalog-grid">
            <article className="course-card">
              <strong className="course-title">{t('quiz.progressTitle')}</strong>
              <p className="course-description">{t('quiz.progressCopy', { answered: answeredCount, total: answers.length })}</p>
            </article>
            <article className="course-card">
              <strong className="course-title">{t('quiz.passMarkTitle')}</strong>
              <p className="course-description">{t('quiz.passMarkCopy', { passMark: quiz.passMark, total: quiz.questions.length })}</p>
            </article>
          </div>

          {quiz.questions.map((question, questionIndex) => (
            <article className="section-card quiz-question-card" key={question.id || questionIndex}>
              <div className="section-eyebrow">{t('quiz.questionLabel', { index: questionIndex + 1 })}</div>
              <h3>{question.text}</h3>
              <div className="quiz-options">
                {question.options.map((option, optionIndex) => {
                  const checked = answers[questionIndex] === optionIndex
                  return (
                    <label className={'quiz-option' + (checked ? ' selected' : '')} key={option}>
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        checked={checked}
                        onChange={() => updateAnswer(questionIndex, optionIndex)}
                      />
                      <span>{option}</span>
                    </label>
                  )
                })}
              </div>
            </article>
          ))}

          {result ? (
            <section className="section-card">
              <div className="section-eyebrow">{t('quiz.resultEyebrow')}</div>
              <h3>{t('quiz.resultTitle')}</h3>
              <p>{t('quiz.score', { score: result.score, total: result.total })}</p>
              <p>{result.passed ? t('quiz.passState') : t('quiz.failState')}</p>
              {saveState ? <p>{saveState}</p> : null}
            </section>
          ) : null}
        </section>
      ) : null}
    </div>
  )
}
