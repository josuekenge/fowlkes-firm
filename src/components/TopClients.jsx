import { useState } from 'react'
import { Link } from 'react-router-dom'
import { topClients } from '../data/gallery.js'
import { log } from '../lib/log.js'

// Home-page clients section: one client per "chapter", led by the number that matters, with the
// other four as an exhibition index. Portraits: /public/images/clients/<handle>.jpg via the
// PORTRAIT map in gallery.js; until supplied, each falls back to the client's best-known cover art.
export default function TopClients() {
  const [i, setI] = useState(0)
  const n = topClients.length
  const cur = topClients[i]
  const go = (k) => { const next = (k + n) % n; setI(next); log.info('clients chapter', { to: next, client: topClients[next].handle }) }
  const others = topClients.map((c, k) => ({ ...c, k })).filter((c) => c.k !== i)
  const pad = (x) => String(x + 1).padStart(2, '0')

  return (
    <section id="credits" className="section wrap rule story" aria-label="Our clients">
      <div className="head">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span className="eyebrow">Clients · A selection</span>
          <h2 className="h2">Our clients include</h2>
        </div>
        <div className="ctrls">
          <span className="count">{pad(i)} — {pad(n - 1)}</span>
          <button type="button" onClick={() => go(i - 1)} aria-label="Previous client">←</button>
          <button type="button" onClick={() => go(i + 1)} aria-label="Next client">→</button>
          <Link to="/clients" className="btn light">See all clients</Link>
        </div>
      </div>

      <div className="chapter" key={cur.handle}>
        <a className="portrait" href={`https://www.instagram.com/${cur.handle}`} target="_blank" rel="noreferrer" aria-label={`${cur.name} on Instagram`}>
          <img src={cur.photo} alt={cur.name} loading="eager" />
        </a>

        <div className="copy">
          <div className="lead">
            <div className={`big${cur.lead[0].length > 3 ? ' word' : ''}`}><span className="v">{cur.lead[0]}</span><span className="l">{cur.lead[1]}</span></div>
            <dl className="two">
              {cur.stats.map(([v, l]) => <div key={l}><dt>{v}</dt><dd>{l}</dd></div>)}
            </dl>
          </div>
          <div className="who">
            <span className="idx">{pad(i)} / {pad(n - 1)} · {cur.role}</span>
            <h3 className="name">{cur.name}</h3>
            <p className="line">{cur.story}</p>
          </div>
        </div>

        <ol className="index" aria-label="Other clients">
          {others.map((c) => (
            <li key={c.handle}>
              <button type="button" onClick={() => go(c.k)} aria-label={`Show ${c.name}`}>
                <span className="n">{pad(c.k)}</span>
                <img src={c.photo} alt="" loading="lazy" />
                <span className="t"><span className="nm">{c.name}</span><span className="s">{c.short}</span></span>
              </button>
            </li>
          ))}
          <li className="tail"><p>Every name here started with a conversation.</p></li>
        </ol>
      </div>
    </section>
  )
}
