import React from 'react'

const paths = {
  arrowRight: 'M5 12h14m0 0-6-6m6 6-6 6',
  arrowLeft: 'M19 12H5m0 0 6-6m-6 6 6 6',
  lock: 'M7 10V8a5 5 0 0 1 10 0v2m-11 0h12v10H6V10Z',
  user: 'M20 21a8 8 0 1 0-16 0m12-11a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  layers: 'M12 3 3 8l9 5 9-5-9-5Zm0 10-9-5v6l9 5 9-5V8l-9 5Zm0 8-9-5v2l9 5 9-5v-2l-9 5Z',
  check: 'M20 6 9 17l-5-5',
  book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 0 4 24.5v-20Z'
}

export default function Icon({ name, title, size = 18, className = '' }) {
  const d = paths[name]
  if (!d) return null

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : 'presentation'}
      focusable="false"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {title ? <title>{title}</title> : null}
      <path d={d} />
    </svg>
  )
}
