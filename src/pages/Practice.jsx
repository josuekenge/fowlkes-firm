import { useState, useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { practiceAreas, clientCatalog, firm } from '../data/site.js'
import { areaImages, clientImage, pick, karl } from '../data/gallery.js'
import { Grid } from '../components/Gallery.jsx'
import { log } from '../lib/log.js'

// Best RIAA-style credential mentioned in a client's credits line, for the client-card eyebrow.
function bestCert(cred) {
  const m = cred.match(/(\d)x Platinum/i)
  if (m) return `${m[1]}× Platinum`
  if (/Platinum/i.test(cred)) return 'Platinum'
  if (/Gold/i.test(cred)) return 'Gold'
  if (/#1/.test(cred)) return '#1 album'
  return null
}

function Switcher({ slug }) {
  return (
    <nav className="pswitch wrap" aria-label="Practice areas">
      {practiceAreas.map((a) => (
        <Link key={a.slug} to={`/practice/${a.slug}`} className={a.slug === slug ? 'on' : ''} aria-current={a.slug === slug ? 'page' : undefined}>
          <span className="n">{a.n}</span><span className="t">{a.title}</span>
        </Link>
      ))}
    </nav>
  )
}

function Slideshow({ items, label }) {
  const [i, setI] = useState(0)
  useEffect(() => { setI(0) }, [items])
  if (!items.length) return null
  const cur = items[i]
  const go = (d) => { const n = (i + d + items.length) % items.length; setI(n); log.info('work slide', { to: n, post: items[n].post }) }
  return (
    <div className="show">
      <a className="frame" href={cur.url} target="_blank" rel="noreferrer" aria-label={`${cur.title} on Instagram`}>
        <img key={cur.n} src={cur.src} alt={cur.title} />
      </a>
      <div className="side">
        <span className="pos">{String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')} · {label}</span>
        <h3 className="title">{cur.title}</h3>
        <span className="sub">Made by a Fowlkes Firm client{cur.sub ? ` · ${cur.sub}` : ''}</span>
        {cur.cert && <span className="proof">{cur.cert}</span>}
        {cur.stats && (
          <dl className="nums">
            {cur.stats.map(([v, l]) => <div key={l}><dt>{v}</dt><dd>{l}</dd></div>)}
          </dl>
        )}
        <a href={cur.url} target="_blank" rel="noreferrer" className="link" style={{ alignSelf: 'flex-start' }}>Open the post →</a>
        <div className="ctrls">
          <button type="button" onClick={() => go(-1)} aria-label="Previous">←</button>
          <button type="button" onClick={() => go(1)} aria-label="Next">→</button>
        </div>
        <div className="film" role="tablist" aria-label="All work">
          {items.map((it, k) => (
            <button key={it.n} type="button" role="tab" aria-selected={k === i} className={k === i ? 'on' : ''} onClick={() => { setI(k); log.info('work slide', { to: k, post: it.post }) }} aria-label={it.title}>
              <img src={it.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Practice() {
  const { slug } = useParams()
  const area = practiceAreas.find((a) => a.slug === slug)
  if (!area) return <Navigate to="/practice/music-law" replace />
  const isMusic = slug === 'music-law'
  const isNIL = slug === 'nil-college-sports-law'
  const idx = practiceAreas.indexOf(area)
  const next = practiceAreas[(idx + 1) % practiceAreas.length]
  const imgs = areaImages[slug] || { lead: [], work: [] }
  // Every practice page gets its own photos: no image below appears on more than one practice page.
  // The music-law slideshow is the one exception (it shows every cover). k-prefixed ids are Karl's account.
  const K = (...ns) => ns.map((n) => karl.find((x) => x.n === n)).filter(Boolean)
  const sets = {
    'music-law': { hero: pick('43', '10', '64', '03', '05'), band: [] },
    'nil-college-sports-law': { hero: [], band: [] },
    'business-entertainment-law': { hero: [...pick('39', '47'), ...K('k36', 'k38', 'k15')], band: pick('06', '08', '16', '45') },
    'fractional-general-counsel': { hero: [...K('k01', 'k18'), ...pick('18'), ...K('k12', 'k17')], band: [...pick('20', '63', '68'), ...K('k00')] },
    'of-counsel': { hero: pick('51', '17', '21', '48', '19'), band: [...K('k23', 'k20'), ...pick('62', '60')] },
  }
  const set = sets[slug] || { hero: imgs.lead, band: imgs.work }
  const collage = set.hero

  return (
    <main>
      <Switcher slug={slug} />

      <header className="phero">
        <div className="copy">
          <span className="eyebrow">Practice area · {area.n} of 05</span>
          <h1>{area.title}</h1>
          <p className="lede">{area.short}</p>
          <div className="actions">
            <a href="#contact" className="btn">Start a conversation</a>
            {isMusic && <a href="#work" className="btn ghost">See the work</a>}
            {isNIL && <a href="#athletes" className="btn ghost">For athletes &amp; families</a>}
          </div>
        </div>
        {isNIL ? (
          <figure className="nil-photo nil-hero-photo">
            <img src="/images/nil-basketball.webp" alt="Illustration of a basketball athlete in a gym" loading="eager" />
            <figcaption>AI-generated illustration · Basketball</figcaption>
          </figure>
        ) : (
          <div className="collage mosaic" aria-label="Client work">
            {collage.map((it) => (
              <a key={it.n} href={it.url} target="_blank" rel="noreferrer" aria-label={`${it.title} on Instagram`}><img src={it.src} alt={it.title} loading="eager" /></a>
            ))}
          </div>
        )}
      </header>

      {area.note && (
        <div className="note-band wrap">
          <span className="k eyebrow">Launched January 2026</span>
          <p className="v">{area.note}</p>
        </div>
      )}

      {isNIL && (
        <div className="stats creds">
          <div><span className="value">NBPA</span><span className="label">Certified player agent, via Firm Sports, since 2021</span></div>
          <div><span className="value">FIBA</span><span className="label">Licensed agent</span></div>
          <div><span className="value">$80M+</span><span className="label">Negotiated in entertainment deals, the same clauses NIL uses</span></div>
          <div className="dark">
            <span className="value display">Bring your parents. Bring the paperwork.</span>
            <a href="#contact" className="link" style={{ alignSelf: 'flex-start', fontSize: 13 }}>Book a consultation</a>
          </div>
        </div>
      )}

      <section id="what" className="section wrap rule" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 820 }}>
          <h2 className="h2">What we handle</h2>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--ink-2)' }}>{area.intro}</p>
          {area.extra && <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--muted)' }}>{area.extra}</p>}
        </div>
        <div className="grid-3">
          {area.handles.map(([t, d]) => (
            <div key={t} className="card"><h3 className="h3">{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </section>

      {area.who && (
        <section id="who" className="who">
          {area.who.map(([t, s]) => <div key={t}><span className="t">{t}</span><span className="s">{s}</span></div>)}
        </section>
      )}

      {isMusic && (
        <>
          <section id="clients" className="section wrap rule" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span className="eyebrow">Certified</span>
                <h2 className="h2">Eight plaques, eight clients</h2>
              </div>
              <a href="#catalog" className="link">Full catalog below ↓</a>
            </div>
            <div className="five four">
              {imgs.plaques.map((it) => (
                <article key={it.n} className="fcard">
                  <a href={it.url} target="_blank" rel="noreferrer" aria-label={`${it.title} on Instagram`}><img src={it.src} alt={it.title} loading="lazy" /></a>
                  <span className="eyebrow">{it.cert || 'RIAA certified'}</span>
                  <span className="name">{it.title}</span>
                  <p>{it.sub}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="work" className="work">
            <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <span className="eyebrow">The work</span>
                  <h2 className="h2">Everything our clients have made</h2>
                </div>
                <span className="eyebrow">{imgs.work.length} releases · from @fowlkesfirm</span>
              </div>
              <Slideshow items={imgs.work} label="Client releases" />
            </div>
          </section>

          <section id="catalog" className="section wrap rule" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
              <h2 className="h2" style={{ fontSize: 40 }}>Client catalog</h2>
              <a href={firm.social.instagram} target="_blank" rel="noreferrer" className="link">The full roll on @fowlkesfirm →</a>
            </div>
            <div className="catalog">
              {clientCatalog.map(([name, role, ig, cred]) => (
                <div key={name} className="c">
                  <a className="name" href={`https://www.instagram.com/${ig}`} target="_blank" rel="noreferrer">{name}</a>
                  <span className="role">{role}</span>
                  <span className="cred">{cred}</span>
                </div>
              ))}
              <div className="c more">
                <span className="name">and 30+ more</span>
                <span className="role">Producers, artists, writers</span>
                <Link to="/clients" className="link" style={{ alignSelf: 'flex-start' }}>All clients →</Link>
              </div>
            </div>
          </section>
        </>
      )}

      {isNIL && (
        <>
          <section id="athletes" className="section wrap rule nil-feature">
            <div className="nil-feature-copy">
              <span className="eyebrow">Athlete-first counsel</span>
              <h2 className="h2">Built around the athlete</h2>
              <p>NIL opportunities move quickly. We help athletes and families understand the rights, obligations and long-term consequences behind every offer.</p>
              <a href="#families" className="link">How we work ↓</a>
            </div>
            <figure className="nil-photo">
              <img src="/images/nil-football.webp" alt="Illustration of an American football athlete on a practice field" loading="lazy" />
              <figcaption>AI-generated illustration · Football</figcaption>
            </figure>
          </section>

          <section id="families" className="section wrap rule" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
              <h2 className="h2">For athletes and families</h2><span className="eyebrow">How it works</span>
            </div>
            <div className="steps">
              {area.steps.map(([t, d], i) => (
                <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <span className="n">0{i + 1}</span><h3 className="h3">{t}</h3><p style={{ fontSize: 17, color: 'var(--ink-2)' }}>{d}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="band">
            <div className="copy">
              <span className="eyebrow">Why us</span>
              <h2 className="h2" style={{ fontSize: 44 }}>{area.why[0]}</h2>
              <p>{area.why[1]}</p>
            </div>
            <figure className="nil-photo">
              <img src="/images/nil-soccer.webp" alt="Illustration of a soccer athlete training on a pitch" loading="lazy" />
              <figcaption>AI-generated illustration · Soccer</figcaption>
            </figure>
          </section>

          <section id="record" className="section wrap rule nil-feature nil-feature-reverse">
            <figure className="nil-photo">
              <img src="/images/nil-track.webp" alt="Illustration of a sprinter at the start line" loading="lazy" />
              <figcaption>AI-generated illustration · Track &amp; field</figcaption>
            </figure>
            <div className="nil-feature-copy">
              <span className="eyebrow">Across college sports</span>
              <h2 className="h2">Every opportunity deserves a clear-eyed review</h2>
              <p>From endorsements to content and likeness rights, the details matter before an athlete signs.</p>
              <Link to="/articles" className="link">Read our NIL insights →</Link>
            </div>
          </section>
        </>
      )}

      {!isMusic && !isNIL && set.band.length > 0 && (
        <section className="band">
          <div className="copy">
            <span className="eyebrow">In practice</span>
            <h2 className="h2" style={{ fontSize: 44 }}>The same counsel behind the plaques</h2>
            <p>Deal structure, ownership and leverage: what we negotiate for producers and artists is what we bring to founders, executives and companies.</p>
            <Link to="/practice/music-law#work" className="link" style={{ alignSelf: 'flex-start' }}>See the work →</Link>
          </div>
          <div className="imgs">
            {set.band.slice(0, 4).map((it) => <a key={it.n} href={it.url} target="_blank" rel="noreferrer" aria-label={`${it.title} on Instagram`}><img src={it.src} alt={it.title} loading="lazy" /></a>)}
          </div>
        </section>
      )}

      <section id="contact" className="cta-band wrap">
        <h2>{area.cta[0]}</h2>
        <div className="r">
          <p>{area.cta[1]}</p>
          <a href="/#contact" className="btn light">Start a conversation</a>
          <Link to={`/practice/${next.slug}`} className="link" style={{ color: '#b8b8b8' }}>Next: {next.title} →</Link>
        </div>
      </section>
    </main>
  )
}
