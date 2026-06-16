import React from 'react'
import { BRAND_LOGO_URL } from '../lib/branding'
import LocaleSwitcher from './LocaleSwitcher'

export default function AppHeader({ brandName, brandTagline, status, locale, onLocaleChange, t, children, className = '', homeHref }) {
  const BrandElement = homeHref ? 'a' : 'div'
  return (
    <header className={['app-header', className].filter(Boolean).join(' ')}>
      <BrandElement className="header-brand" href={homeHref} aria-label={homeHref ? t('common.home') : undefined}>
        <div className="brand-logo">
          <img src={BRAND_LOGO_URL} alt={t('common.brandName')} width="72" height="72" />
        </div>
        <div className="brand-info">
          <div className="brand-name">{brandName}</div>
          <div className="brand-tagline">{brandTagline}</div>
        </div>
      </BrandElement>
      <div className="header-actions">
        <LocaleSwitcher locale={locale} onChange={onLocaleChange} t={t} />
        {status ? <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">{status}</span> : null}
        {children}
      </div>
    </header>
  )
}
