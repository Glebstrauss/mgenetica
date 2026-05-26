import React from 'react'
import Icon from './Icon'
import { SUPPORTED_LOCALES } from '../i18n'

export default function LocaleSwitcher({ locale, onChange, t }) {
  return (
    <label className="locale-switcher" aria-label={t('localeSwitcher.label')}>
      <span className="locale-switcher-icon" aria-hidden="true">
        <Icon name="globe" size={16} />
      </span>
      <select className="locale-select" name="locale" value={locale} onChange={(e) => onChange(e.target.value)}>
        {SUPPORTED_LOCALES.map((localeCode) => (
          <option key={localeCode} value={localeCode}>
            {t('locales.' + localeCode)}
          </option>
        ))}
      </select>
    </label>
  )
}
