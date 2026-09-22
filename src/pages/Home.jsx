import { Link } from 'react-router-dom'
import { firm, stats, practiceAreas, creditsWall, certified, highlights, pressTimeline, karl } from '../data/site.js'
import { Plus } from '../components/Layout.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { plaqueStrip, clientWall } from '../data/gallery.js'
import { Grid } from '../components/Gallery.jsx'

export default function Home() {
  return (
    <main>
      <header className="hero">
        <div className="copy">
          <span className="eyebrow">Entertainment attorney · Karl Fowlkes, Esq. · New Jersey</span>
          <h1>Music. Sports. Business. <em>Done right.</em></h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <p className="lede">Internationally recognized, award-winning entertainment law practice. We've negotiated groundbreaking deals for artists, producers and athletes while staying committed to disruption and new media.</p>
            <div className="actions">
              <a href="#contact" className="btn">Start a conversation</a>
              <a href="#practice" className="btn ghost">See the practice</a>
            </div>
          </div>
        </div>
        <div className="photo">
          <img src="/images/hero-lookup.jpg" alt="Artist looking upward" width="1000" height="1000" fetchPriority="high" />
        </div>
      </header>

      <div className="stats">
        {stats.map((s) => (
          <div key={s.label}><span className="value">{s.value}</span><span className="label">{s.label}</span></div>
        ))}
        <div className="dark">
          <span className="value display">Every matter starts with a conversation.</span>
          <a href="#contact" className="link" style={{ alignSelf: 'flex-start', fontSize: 13 }}>Book a consultation</a>
        </div>
      </div>

      {/* PRACTICE: snippet only, each opens its own page */}
      <section id="practice" className="section wrap rule side">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h2 className="h2">Practice areas</h2>
          <p style={{ fontSize: 19, color: 'var(--ink-2)' }}>Business-minded, industry-specific counsel. Sophisticated dealmaking blended with practical strategy. Each area opens to its own page with the work behind it.</p>
        </div>
        <div className="acc">
          {practiceAreas.map((a, i) => (
            <details key={a.slug} open={i === 0}>
              <summary>
                <span className="t"><span className="n">{a.n}</span><span className="name">{a.title}</span></span>
                <Plus />
              </summary>
              <div className="body">
                <p>{a.short}</p>
                <span className="tags">{a.handles.slice(0, 4).map((h) => h[0]).join(' · ')}</span>
                <Link to={`/practice/${a.slug}`} className="link" style={{ alignSelf: 'flex-start' }}>Know more about {a.title} →</Link>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CLIENTS: snippet, View more goes to /clients */}
      <section id="credits" className="section wrap rule" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <h2 className="h2">Our clients' credits include</h2>
          <span className="eyebrow" style={{ maxWidth: 360, textAlign: 'right' }}>Records produced, co-produced or written by Fowlkes Firm clients</span>
        </div>
        <div className="wall">
          {creditsWall.slice(0, 14).map((n, i) => (
            <span key={n}>{n}{i < 13 && <span className="dot"> · </span>}</span>
          ))}
        </div>
        <Grid items={clientWall.slice(0, 6)} cols={6} />
        <div className="plaques">
          {certified.slice(0, 4).map(([n, l, t]) => (
            <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span className="t">{t}</span><span className="s">{n === 'Gold' ? 'Gold' : `${n} ${l}`} · client production</span>
            </div>
          ))}
        </div>
        <Grid items={plaqueStrip} cols={6} ratio="4 / 5" />
        <Link to="/clients" className="btn ghost" style={{ alignSelf: 'flex-start' }}>View more: the full roster</Link>
      </section>

      <section id="highlights" className="section wrap rule" style={{ display: 'flex', flexDirection: 'column', gap: 40, paddingRight: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', paddingRight: 'var(--gutter)' }}>
          <h2 className="h2">Client &amp; firm highlights</h2>
          <a href={firm.social.instagram} target="_blank" rel="noreferrer" className="link">@fowlkesfirm on Instagram</a>
        </div>
        <div className="strip">
          {highlights.map(([src, cap]) => (
            <figure key={src}><img src={src} alt={cap} loading="lazy" /><figcaption>{cap}</figcaption></figure>
          ))}
        </div>
      </section>

      {/* PRESS: roadmap */}
      <section id="press" className="section wrap rule" style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <h2 className="h2">Press &amp; recognition</h2>
          <Link to="/articles" className="link">Every article and deal</Link>
        </div>
        <ol className="roadmap">
          {pressTimeline.map(({ year, items }) => (
            <li key={year}>
              <span className="year">{year}</span>
              <span className="node" aria-hidden="true" />
              <div className="entries">
                {items.map(([outlet, title, url]) => {
                  const inner = <><span className="k">{outlet}</span><span className="v">{title}</span></>
                  return url
                    ? <a key={title} className="entry" href={url} target="_blank" rel="noreferrer">{inner}</a>
                    : <div key={title} className="entry">{inner}</div>
                })}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* FOUNDER teaser, full story on /about */}
      <section id="about" className="section wrap rule founder">
        <img src={karl.portrait} alt="Karl Fowlkes, Esq." width="633" height="633" loading="lazy" />
        <div className="copy">
          <span className="eyebrow">{karl.title}</span>
          <h2 className="h2">{karl.name}</h2>
          <p>{karl.bio[0]}</p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/about" className="btn">About</Link>
            <a href={karl.linkedin} target="_blank" rel="noreferrer" className="link">LinkedIn</a>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="quote">
          <p className="q">"[CLIENT TESTIMONIAL: from the firm's biggest artist, or someone who knows Karl directly.]"</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span className="who">[Client name], [title]</span>
            <span className="note">{firm.verified}</span>
          </div>
        </div>
        <ContactForm />
      </section>
    </main>
  )
}
