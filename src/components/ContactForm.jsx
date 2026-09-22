import { useState } from 'react'
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
        <label htmlFor="c-role">I am a…</label>
        <select id="c-role" name="role" defaultValue={roles[0]}>
          {roles.map((r) => <option key={r}>{r}</option>)}
        </select>
      </div>
      <div className="field">
        <label htmlFor="c-msg">What are you working on?</label>
        <textarea id="c-msg" name="message" rows="3" />
      </div>
      <button type="submit" className="btn" style={{ alignSelf: 'flex-start' }}>Send message</button>
      <p className="status" role="status" aria-live="polite">{status}</p>
    </form>
  )
}
