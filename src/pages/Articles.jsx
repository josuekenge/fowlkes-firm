import { useEffect, useState } from 'react'
import { log } from '../lib/log.js'
import { pressImage } from '../data/gallery.js'

// Reads content/articles.md (served from /content/articles.md) and renders each
// "## " section as a list. Entries are lines starting with "- ".
function parse(md) {
  const sections = []
  let cur = null
  for (const line of md.split('\n')) {
    if (line.startsWith('## ')) { cur = { title: line.slice(3).replace(/^\d+\.\s*/, ''), items: [] }; sections.push(cur) }
    else if (cur && line.startsWith('- ')) {
      const text = line.slice(2)
      const url = (text.match(/https?:\/\/\S+/g) || [])[0] || null
      const clean = text.replace(/\s*—?\s*https?:\/\/\S+/g, '').replace(/\*\*/g, '').replace(/\s*—\s*\[link needed\]/, '')
      const [head, ...rest] = clean.split(' — ')
      cur.items.push({ head, body: rest.join(' — '), url })
    }
  }
  return sections.filter((s) => s.items.length)
}

export default function Articles() {
  const [sections, setSections] = useState(null)
  const [err, setErr] = useState('')
  useEffect(() => {
    log.info('articles load start')
    fetch('/content/articles.md')
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.text() })
      .then((md) => { const s = parse(md); setSections(s); log.info('articles load ok', { sections: s.length }) })
      .catch((e) => { setErr('Articles are unavailable right now.'); log.error('articles load failed', { err: String(e) }) })
  }, [])

  return (
    <main>
      <header className="page-head wrap">
        <div className="main">
          <span className="eyebrow">Deals · Press · Talks</span>
          <h1>Articles</h1>
          <p className="lede">Every deal the firm has announced and every piece that has featured Karl Fowlkes, in one place.</p>
        </div>
      </header>
      <section className="section wrap articles" style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
        {err && <p role="alert" style={{ color: 'var(--muted)' }}>{err}</p>}
        {!sections && !err && <p style={{ color: 'var(--muted)' }}>Loading…</p>}
        {sections && sections.map((s) => (
          <div key={s.title} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h2 className="h2" style={{ fontSize: 40 }}>{s.title}</h2>
            <div className="rows">
              {s.items.map((it, i) => {
                const m = it.head.match(/^(\S+)\s*·\s*(.+?)\s*·\s*(.+)$/)
                const date = m ? m[1] : ''
                const outlet = m ? m[2] : ''
                const title = m ? m[3] : it.head
                const shot = pressImage[outlet.toLowerCase()]
                const inner = <>{shot && <img className="thumb" src={shot.src} alt="" loading="lazy" />}<span className="k">{outlet}</span><span className="v">{title}{it.body ? <span style={{ display: 'block', fontFamily: 'var(--body)', fontSize: 16, color: 'var(--muted)', marginTop: 6 }}>{it.body}</span> : null}</span><span className="d">{date}</span></>
                return it.url
                  ? <a key={i} className={`row${shot ? ' img' : ''}`} href={it.url} target="_blank" rel="noreferrer">{inner}</a>
                  : <div key={i} className={`row${shot ? ' img' : ''}`}>{inner}</div>
              })}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
