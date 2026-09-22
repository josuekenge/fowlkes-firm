import { Link, useParams, Navigate } from 'react-router-dom'
import { practiceAreas, clientCatalog, certified, firm } from '../data/site.js'
import { areaImages, clientImage } from '../data/gallery.js'
import { Fig, Grid } from '../components/Gallery.jsx'

export default function Practice() {
  const { slug } = useParams()
  const area = practiceAreas.find((a) => a.slug === slug)
  if (!area) return <Navigate to="/practice/music-law" replace />
  const isMusic = slug === 'music-law'
  const isNIL = slug === 'nil-college-sports-law'
  const idx = practiceAreas.indexOf(area)
  const next = practiceAreas[(idx + 1) % practiceAreas.length]
  const imgs = areaImages[slug] || { lead: [], work: [] }

  return (
    <main>
      <header className="page-head wrap">
        <div className="main">
          <Link to="/#practice" className="eyebrow">← Practice areas · {area.n}</Link>
          <h1>{area.title}</h1>
          <p className="lede">{area.short}</p>
        </div>
        <div className="toc">
          <span>On this page</span>
          <a href="#what">What we handle</a>
          <a href="#who">Who we represent</a>
          {isMusic && <a href="#clients">Client catalog</a>}
          {isMusic && <a href="#work">The work</a>}
          {isMusic && <a href="#results">Certified results</a>}
          {isNIL && <a href="#families">For athletes &amp; families</a>}
          {isNIL && <a href="#resources">Deals &amp; resources</a>}
          <a href="#contact">Start a conversation</a>
        </div>
      </header>

      {imgs.lead.length > 0 && (
        <section className="section wrap rule" style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div className={`lead-imgs${imgs.lead.length < 3 ? ' two' : ''}`}>
            {imgs.lead.map((it) => <Fig key={it.n} item={it} />)}
          </div>
        </section>
      )}

      {area.note && (
        <div className="note-band wrap">
          <span className="k eyebrow">Launched January 2026</span>
          <p className="v">{area.note}</p>
        </div>
      )}

      <section id="what" className="section wrap rule side">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <h2 className="h2" style={{ fontSize: 48 }}>What we handle</h2>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--ink-2)' }}>{area.intro}</p>
          {area.extra && <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--muted)' }}>{area.extra}</p>}
        </div>
        <div className="grid-2">
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

      {isNIL && (
        <>
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
          <section className="why">
            <div className="copy"><h2 className="h2" style={{ fontSize: 56 }}>{area.why[0]}</h2><p>{area.why[1]}</p></div>
            <div className="photo"><img src={imgs.work[1].src} alt={imgs.work[1].title} loading="lazy" /></div>
          </section>
          <section id="resources" className="section wrap rule articles" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
              <h2 className="h2">Deals, articles &amp; research</h2><Link to="/articles" className="link">All articles</Link>
            </div>
            <div className="rows">
              <div className="row"><span className="k">Firm announcement</span><span className="v">The Fowlkes Firm launches NIL &amp; College Sports Law Practice</span><span className="d">Jan 2026</span></div>
              <div className="row"><span className="k">Deal</span><span className="v">[Athlete] × [Brand or collective] · [one-line outcome]</span><span className="d">[Date]</span></div>
              <div className="row"><span className="k">Article</span><span className="v">[Publication] · [Headline of a piece quoting Karl on NIL]</span><span className="d">[Date]</span></div>
              <div className="row"><span className="k">Research</span><span className="v">[Guide to NIL rules by state, conference and school]</span><span className="d">[Date]</span></div>
            </div>
          </section>
        </>
      )}

      {isMusic && (
        <>
          <section id="clients" className="section wrap rule" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
              <h2 className="h2">Client catalog</h2><span className="eyebrow">A selection · from @fowlkesfirm</span>
            </div>
            <div className="rows">
              <div className="row client head"><span /><span>Client</span><span>Role</span><span>Selected credits</span></div>
              {clientCatalog.map(([name, role, ig, cred]) => (
                <div key={name} className="row client">
                  {clientImage[ig] ? <img className="thumb" src={clientImage[ig].src} alt={clientImage[ig].title} loading="lazy" /> : <span />}
                  <a className="name" href={`https://www.instagram.com/${ig}`} target="_blank" rel="noreferrer">{name}</a>
                  <span className="role">{role}</span>
                  <span className="cred">{cred}</span>
                </div>
              ))}
              <div className="row client">
                <span />
                <span className="name" style={{ color: 'var(--muted)' }}>and 30+ more</span>
                <span className="role">Producers, artists, writers</span>
                <a href={firm.social.instagram} target="_blank" rel="noreferrer" className="link" style={{ alignSelf: 'flex-start' }}>See the full roll on Instagram →</a>
              </div>
            </div>
          </section>
          <section id="work" className="section wrap rule" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
              <h2 className="h2">The work</h2><span className="eyebrow">{imgs.work.length} releases our clients produced, wrote or performed · from @fowlkesfirm</span>
            </div>
            <Grid items={imgs.work} cols={6} />
          </section>
          <section id="results" className="section wrap rule" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            <h2 className="h2">Certified results our clients played on</h2>
            <Grid items={imgs.plaques} cols={4} ratio="4 / 5" />
            <div className="results">
              {certified.map(([n, l, t]) => (
                <div key={t} className="card" style={{ gap: 12 }}><span className="n">{n}</span><span className="l">{l}</span><span className="t">{t}</span></div>
              ))}
            </div>
          </section>
        </>
      )}

      {!isMusic && !isNIL && imgs.work.length > 0 && (
        <section className="band">
          <div className="copy">
            <span className="eyebrow">In practice</span>
            <h2 className="h2" style={{ fontSize: 44 }}>The same counsel behind the plaques</h2>
            <p>Deal structure, ownership and leverage: what we negotiate for producers and artists is what we bring to founders, executives and companies.</p>
            <Link to="/practice/music-law#work" className="link" style={{ alignSelf: 'flex-start' }}>See the work →</Link>
          </div>
          <div className="imgs">
            {imgs.work.slice(0, 4).map((it) => <a key={it.n} href={it.url} target="_blank" rel="noreferrer"><img src={it.src} alt={it.title} loading="lazy" /></a>)}
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
