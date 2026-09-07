import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Button({ to, href, children, variant = 'primary', className = '', ...props }) {
  const classes = `button button--${variant} ${className}`.trim()
  const content = <>{children}<ArrowUpRight aria-hidden="true" size={18} /></>
  if (to) return <Link className={classes} to={to} {...props}>{content}</Link>
  if (href) return <a className={classes} href={href} {...props}>{content}</a>
  return <button className={classes} {...props}>{content}</button>
}
