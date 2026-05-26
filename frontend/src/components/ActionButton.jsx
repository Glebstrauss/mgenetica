import React from 'react'

export default function ActionButton({ children, icon, variant = 'secondary', className = '', as: Component = 'button', ...props }) {
  return (
    <Component className={['btn', 'btn-' + variant, 'app-action', className].filter(Boolean).join(' ')} {...props}>
      {icon ? <span className="app-action-icon" aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
    </Component>
  )
}
