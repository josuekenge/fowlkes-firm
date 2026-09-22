import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { firm } from '../data/site.js'
import { log } from '../lib/log.js'

const links = [
  ['/', 'Home'],
  ['/practice/music-law', 'Practice'],
  ['/#credits', 'Clients'],
  ['/articles', 'Articles'],
  ['/#about', 'Karl Fowlkes'],
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  useEffect(() => { setOpen(false); log.info('route', { path: loc.pathname + loc.hash }) }, [loc])
  return (
    <nav className={`nav wrap${open ? ' open' : ''}`} aria-label="Primary">
      <Link to="/" className="brand">{firm.name}</Link>
      <div className="links">
        {links.map(([to, label]) => (
          to.includes('#')
            ? <a key={to} href={to}>{label}</a>
            : <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'active' : '')}>{label}</NavLink>
        ))}
      </div>
      <a href="/#contact" className="cta">Start a conversation</a>
      <button type="button" className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
        </svg>
      </button>
      <div className="drawer">
        {links.map(([to, label]) => <a key={to} href={to}>{label}</a>)}
        <a href="/#contact">Start a conversation</a>
      </div>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="footer wrap">
      <img src="/images/monogram.webp" alt="Fowlkes Firm monogram" width="144" height="72" />
      <span className="addr">{firm.address}</span>
      <div className="links">
        <a href={firm.social.instagram} target="_blank" rel="noreferrer">Instagram</a>
        <a href={firm.social.x} target="_blank" rel="noreferrer">X</a>
        <a href={firm.social.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="/notice" style={{ color: 'var(--muted)' }}>Notice</a>
      </div>
    </footer>
  )
}

export function Plus() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path className="v" d="M12 5v14" /><path d="M5 12h14" />
    </svg>
  )
}
