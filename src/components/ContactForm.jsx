import { useEffect, useId, useRef, useState } from 'react'
import { firm } from '../data/site.js'
import { log } from '../lib/log.js'

const roles = ['Producer or songwriter', 'Artist', 'College athlete or family', 'Label, company or founder', 'Law firm or legal department']

export default function ContactForm() {
  const [status, setStatus] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    log.info('contact submit', { role: data.role, hasMsg: Boolean(data.message) })
    if (!data.name || !data.email) {
      setStatus('Please add your name and email.')
      log.warn('contact submit rejected: missing fields')
      return
    }
    // No backend yet: hand off to the mail client. Replace with the Node
    // endpoint once it exists (see server/ when added).
    const body = `Name: ${data.name}\nEmail: ${data.email}\nI am a: ${data.role}\n\n${data.message}`
    const href = `mailto:${firm.email}?subject=${encodeURIComponent('New inquiry from fowlkesfirm.com')}&body=${encodeURIComponent(body)}`
    try {
      window.location.href = href
      setStatus('Opening your email app. If nothing happened, email us directly.')
      log.info('contact handoff to mailto')
    } catch (err) {
      setStatus('Could not open your email app. Please email us directly.')
      log.error('contact mailto failed', { err: String(err) })
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <h2>Start a conversation</h2>
      <div className="field">
        <label htmlFor="c-name">Name</label>
        <input id="c-name" name="name" type="text" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="c-email">Email</label>
        <input id="c-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <span className="field-label" id="c-role-label">I am a…</span>
        <RolePicker />
      </div>
      <div className="field">
        <label htmlFor="c-msg">What are you working on?</label>
        <MessageBox />
      </div>
      <button type="submit" className="btn" style={{ alignSelf: 'flex-start' }}>Send message</button>
      <p className="status" role="status" aria-live="polite">{status}</p>
    </form>
  )
}

// On-brand dropdown for "I am a…". Replaces the native <select>, whose popup is drawn by the
// operating system and cannot be styled. Follows the listbox pattern: button opens a list,
// arrow keys move, Enter/Space picks, Escape closes. A hidden input keeps FormData working.
function RolePicker() {
  const [value, setValue] = useState(roles[0])
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const wrap = useRef(null)
  const button = useRef(null)
  const list = useRef(null)
  const id = useId()

  useEffect(() => {
    if (!open) return undefined
    list.current?.focus()
    const onDown = (e) => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  function show() { setActive(roles.indexOf(value)); setOpen(true) }
  function choose(i) {
    setValue(roles[i]); setOpen(false); button.current?.focus()
    log.info('contact role picked', { role: roles[i] })
  }
  function onButtonKey(e) {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); show() }
  }
  function onListKey(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, roles.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
    else if (e.key === 'Home') { e.preventDefault(); setActive(0) }
    else if (e.key === 'End') { e.preventDefault(); setActive(roles.length - 1) }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(active) }
    else if (e.key === 'Escape' || e.key === 'Tab') { setOpen(false); if (e.key === 'Escape') button.current?.focus() }
  }

  return (
    <div className={`picker${open ? ' open' : ''}`} ref={wrap}>
      <input type="hidden" name="role" value={value} />
      <button ref={button} type="button" className="picker-btn" aria-haspopup="listbox" aria-expanded={open} aria-labelledby={`c-role-label ${id}-v`} onClick={() => (open ? setOpen(false) : show())} onKeyDown={onButtonKey}>
        <span id={`${id}-v`}>{value}</span>
        <svg viewBox="0 0 12 8" width="12" height="8" aria-hidden="true"><path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
      </button>
      {open && (
        <ul ref={list} className="picker-list" role="listbox" tabIndex={-1} aria-labelledby="c-role-label" aria-activedescendant={`${id}-o${active}`} onKeyDown={onListKey}>
          {roles.map((r, i) => (
            <li key={r} id={`${id}-o${i}`} role="option" aria-selected={r === value} className={i === active ? 'active' : undefined} onPointerEnter={() => setActive(i)} onClick={() => choose(i)}>
              <span>{r}</span>
              {r === value && <svg viewBox="0 0 14 10" width="14" height="10" aria-hidden="true"><path d="M1 5 5 9 13 1" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// Message box that reads like an email draft: grows with the text (line breaks and spaces kept),
// then scrolls inside itself once it passes a comfortable height. Capped because the message is
// handed to the mail app through a mailto link, and very long links get cut off by some clients.
export const MESSAGE_LIMIT = 2000
function MessageBox() {
  const ref = useRef(null)
  const [count, setCount] = useState(0)

  function fit() {
    const el = ref.current
    if (!el) return
    const max = window.matchMedia && window.matchMedia('(max-width: 860px)').matches ? 240 : 320
    el.style.height = 'auto'
    const next = Math.min(el.scrollHeight, max)
    el.style.height = `${Math.max(next, el.dataset.min ? Number(el.dataset.min) : 0)}px`
    el.style.overflowY = el.scrollHeight > max ? 'auto' : 'hidden'
  }

  useEffect(() => {
    const el = ref.current
    if (el) el.dataset.min = String(el.offsetHeight || 0)
    fit()
  }, [])

  const near = count > MESSAGE_LIMIT * 0.9
  return (
    <>
      <textarea ref={ref} id="c-msg" name="message" rows="3" maxLength={MESSAGE_LIMIT} className="msg" aria-describedby="c-msg-count" onInput={(e) => { setCount(e.currentTarget.value.length); fit() }} />
      <span id="c-msg-count" className={`msg-count${near ? ' near' : ''}`} aria-live="polite">{count.toLocaleString()} / {MESSAGE_LIMIT.toLocaleString()}</span>
    </>
  )
}
