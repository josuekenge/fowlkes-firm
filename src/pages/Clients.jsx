import { useState } from 'react'
import { Link } from 'react-router-dom'
import { roster, plaques, creditsWall, firm } from '../data/site.js'
import { log } from '../lib/log.js'
import { clientWall, plaques as plaqueShots, clientImage } from '../data/gallery.js'
import { Grid } from '../components/Gallery.jsx'

const groups = [
  ['producers', 'Producers', 'The deepest bench in the room. Their beats sit under #1 albums and multi-platinum singles.'],
  ['artists', 'Artists', 'Independent and signed. From first single to Gold plaque.'],
  ['companies', 'Labels & collectives', 'Imprints and producer collectives built to stay independent.'],
]

const clientStats = (total, credits) => [
  [`${total}+`, 'Clients on this page'],
  ['10', 'RIAA certifications posted'],
  [`${credits}+`, 'Marquee artists their work reached'],
]

export default function Clients() {
  const [tab, setTab] = useState('producers')
  const [q, setQ] = useState('')
  const list = roster[tab].filter(([name, , with_, note]) => {
    const s = q.trim().toLowerCase()
    return !s || name.toLowerCase().includes(s) || with_.some((w) => w.toLowerCase().includes(s)) || note.toLowerCase().includes(s)
  })
  const total = Object.values(roster).reduce((n, a) => n + a.length, 0)

  function pick(key) { setTab(key); log.info('clients tab', { tab: key }) }

  return (
    <main>
      <header className="page-head wrap clients-head">
        <div className="main">
          <span className="eyebrow">The roster</span>
          <h1>Clients</h1>
          <p className="lede">The producers, artists and companies The Fowlkes Firm represents, and the records their work reached.</p>
        </div>
        <div className="toc">
          <span>On this page</span>
          <a href="#roster">Roster</a>
          <a href="#credits">Credits reached</a>
          <a href="#plaques">Certified</a>
          <a href="#contact">Join the roster</a>
        </div>
      </header>

      {/* Phones: the three numbers scroll right to left in one strip (hidden on wider screens, see .clients-marquee). */}
      <section className="clients-marquee" aria-label="Client numbers">
        <div className="cm-track">
          {[false, true].map((dup) => (
            <div className="cm-group" key={dup ? 'copy' : 'original'} aria-hidden={dup ? 'true' : undefined}>
              {clientStats(total, creditsWall.length).map(([v, l]) => <div className="cm-item" key={l}><span className="v">{v}</span><span className="l">{l}</span></div>)}
            </div>
          ))}
        </div>
      </section>

      <div className="stats clients-stats">
        {clientStats(total, creditsWall.length).map(([v, l]) => <div key={l} className="num"><span className="value">{v}</span><span className="label">{l}</span></div>)}
        <div className="dark">
          <span className="value display">Every name here started with a conversation.</span>
          <a href="/#contact" className="link" style={{ alignSelf: 'flex-start', fontSize: 13 }}>Start yours</a>
        </div>
      </div>

      <section className="section wrap rule" style={{ display: 'flex', flexDirection: 'column', gap: 32, paddingTop: 48, paddingBottom: 48 }}>
        <Grid items={clientWall} cols={6} />
      </section>

      <section id="roster" className="section wrap rule" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div className="roster-controls">
          <label className="rsearch">
            <span className="sr-only">Search clients</span>
            <svg className="ico" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5 20 20" /></svg>
            <input type="search" placeholder="Search a client or an artist" value={q} onChange={(e) => setQ(e.target.value)} />
            {q && <button type="button" className="clear" onClick={() => setQ('')} aria-label="Clear search">&times;</button>}
          </label>
          <div className="seg" role="tablist" aria-label="Client groups">
            {groups.map(([key, label]) => (
              <button key={key} type="button" role="tab" aria-selected={tab === key} className={tab === key ? 'on' : ''} onClick={() => pick(key)}>
                <span className="t">{label}</span> <span className="n">{roster[key].length}</span>
              </button>
            ))}
          </div>
        </div>
        <p className="roster-blurb">{groups.find((g) => g[0] === tab)[2]}</p>
        <div className="roster">
          {list.map(([name, ig, with_, note], i) => (
            <article key={name} className="rcard">
              {clientImage[ig] ? <img className="cover" src={clientImage[ig].src} alt={clientImage[ig].title} loading="lazy" /> : <span className="idx">{String(i + 1).padStart(2, '0')}</span>}
              <div className="body">
                <a className="name" href={`https://www.instagram.com/${ig}`} target="_blank" rel="noreferrer">{name}</a>
                {with_.length > 0 && <div className="with">{with_.map((w) => <span key={w}>{w}</span>)}</div>}
                <p>{note}</p>
              </div>
              <a className="ig" href={`https://www.instagram.com/${ig}`} target="_blank" rel="noreferrer" aria-label={`${name} on Instagram`}>@{ig}</a>
            </article>
          ))}
          {list.length === 0 && <p style={{ color: 'var(--muted)' }}>No client matches that search.</p>}
        </div>
        <a href={firm.social.instagram} target="_blank" rel="noreferrer" className="link" style={{ alignSelf: 'flex-start' }}>The full roll, on @fowlkesfirm →</a>
      </section>

      <section id="credits" className="section wrap rule" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <h2 className="h2">Credits their work reached</h2>
          <span className="eyebrow" style={{ maxWidth: 360, textAlign: 'right' }}>Records produced, co-produced or written by Fowlkes Firm clients</span>
        </div>
        <div className="wall">
          {creditsWall.map((n, i) => <span key={n}>{n}{i < creditsWall.length - 1 && <span className="dot"> · </span>}</span>)}
        </div>
      </section>

      <section id="plaques" className="section wrap rule" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <h2 className="h2">Certified</h2>
          <span className="eyebrow">RIAA plaques, as posted by the firm</span>
        </div>
        <Grid items={plaqueShots} cols={4} ratio="4 / 5" />
        <div className="plaque-grid">
          {plaques.map(([n, l, t, who]) => (
            <div key={t} className="plaque">
              <div className="meta">
                <span className="n">{n} <small>{l}</small></span>
                <span className="t">{t}</span>
                <span className="owner">{who}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="cta-band wrap">
        <h2>Want your name on this page?</h2>
        <div className="r">
          <p>Producers, artists, athletes and founders. Every matter starts with a conversation.</p>
          <a href="/#contact" className="btn light">Start a conversation</a>
          <Link to="/practice/music-law" className="link" style={{ color: '#b8b8b8' }}>See how we work →</Link>
        </div>
      </section>
    </main>
  )
}
