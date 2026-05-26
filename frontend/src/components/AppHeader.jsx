import React from 'react'
import { BRAND_LOGO_URL } from '../lib/branding'
import LocaleSwitcher from './LocaleSwitcher'

export default function AppHeader({ brandName, brandTagline, status, locale, onLocaleChange, t, children, className = '' }) {
  return (
    <header className={['app-header', className].filter(Boolean).join(' ')}>
      <div className="header-brand">
        <div className="brand-logo">
          <img src={BRAND_LOGO_URL} alt={t('common.brandName')} width="32" height="32" />
        </div>
        <div className="brand-info">
          <div className="brand-name">{brandName}</div>
          <div className="brand-tagline">{brandTagline}</div>
        </div>
      </div>
      <div className="header-actions">
        <LocaleSwitcher locale={locale} onChange={onLocaleChange} t={t} />
        {status ? <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">{status}</span> : null}
        {children}
      </div>
    </header>
  )
}
