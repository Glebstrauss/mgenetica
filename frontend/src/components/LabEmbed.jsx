import React from 'react'

function normalizeLabSrc(src) {
  const value = typeof src === 'string' ? src.trim() : ''
  if (!/^\/labs\/[A-Za-z0-9_-]+\.html$/.test(value)) return null
  return value
}

export default function LabEmbed({ src, title, eyebrow, heading, description, openLabel }) {
  const labSrc = normalizeLabSrc(src)
  if (!labSrc) return null

  return (
    <section className="section-card lab-embed-card">
      <div className="section-eyebrow">{eyebrow}</div>
      <h3>{heading}</h3>
      <p>{description}</p>
      <div className="lab-embed-frame-wrap">
        <iframe
          className="lab-embed-frame"
          title={title || heading}
          src={labSrc}
          loading="lazy"
          sandbox="allow-scripts"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="lab-embed-actions">
        <a className="btn btn-secondary" href={labSrc} target="_blank" rel="noopener noreferrer">
          {openLabel}
        </a>
      </div>
    </section>
  )
}

export { normalizeLabSrc }
