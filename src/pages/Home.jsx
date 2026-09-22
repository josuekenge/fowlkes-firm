import { Link } from 'react-router-dom'
import { firm, stats, practiceAreas, creditsWall, certified, highlights, press, karl } from '../data/site.js'
import { Plus } from '../components/Layout.jsx'
import ContactForm from '../components/ContactForm.jsx'

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
                <p>{a.intro}</p>
                <span className="tags">{a.handles.map((h) => h[0]).join(' · ')}</span>
                <Link to={`/practice/${a.slug}`} className="link" style={{ alignSelf: 'flex-start' }}>{a.title}: details, clients &amp; work →</Link>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section id="credits" className="section wrap rule" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <h2 className="h2">Our clients' credits include</h2>
          <span className="eyebrow" style={{ maxWidth: 360, textAlign: 'right' }}>Records produced, co-produced or written by Fowlkes Firm clients</span>
        </div>
        <div className="wall">
          {creditsWall.map((n, i) => (
            <span key={n}>{n}{i < creditsWall.length - 1 && <span className="dot"> · </span>}</span>
          ))}
        </div>
        <div className="plaques">
          {certified.slice(0, 4).map(([n, l, t]) => (
            <div key={t} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span className="t">{t}</span><span className="s">{n === 'Gold' ? 'Gold' : `${n} ${l}`} · client production</span>
            </div>
          ))}
        </div>
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

      <section id="press" className="section wrap rule side">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h2 className="h2">Press &amp; recognition</h2>
          <p style={{ fontSize: 19, color: 'var(--ink-2)' }}>Karl is a go-to voice on the business of music, from AI to independence.</p>
        </div>
        <div className="rows">
          {press.map(([outlet, title, year, url]) => {
            const inner = <><span className="k">{outlet}</span><span className="v">{title}</span><span className="d">{year || ''}</span></>
            return url
              ? <a key={title} className="row press" href={url} target="_blank" rel="noreferrer">{inner}</a>
              : <div key={title} className="row press">{inner}</div>
          })}
        </div>
      </section>

      <section id="about" className="section wrap rule about">
        <div className="l">
          <span className="eyebrow">{karl.title}</span>
          <h2 className="h2">{karl.name}</h2>
          <span style={{ color: 'var(--ink-2)', fontSize: 18, lineHeight: 1.4 }}>{karl.headline}</span>
          <span style={{ color: 'var(--muted)', fontSize: 15 }}>{karl.education} · COO, EVGLE</span>
          <div className="socials">
            <a href={karl.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={karl.instagram} target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
        <div className="m"><img src={karl.portrait} alt="Karl Fowlkes, Esq., founder and managing partner of The Fowlkes Firm" width="633" height="633" loading="lazy" /></div>
        <div className="r">
          {karl.bio.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          <div className="recog">
            {karl.recognition.map(([k, v]) => <div key={k}><span className="k">{k}</span><span>{v}</span></div>)}
          </div>
          <span style={{ fontSize: 14, color: 'var(--muted)' }}>Featured in {karl.featuredIn}.</span>
          <a href="#contact" className="link" style={{ alignSelf: 'flex-start' }}>Work with Karl</a>
        </div>
      </section>

      <section className="section wrap rule" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <h2 className="h2">In the room</h2>
          <span className="eyebrow">Stages, panels and plaques</span>
        </div>
        <div className="room">
          {karl.photos.map(([src, cap]) => (
            <figure key={src}><img src={src} alt={cap} loading="lazy" /><figcaption>{cap}</figcaption></figure>
          ))}
          <figure><img src="/images/plaque-4x-platinum.jpg" alt="RIAA 4x Platinum plaque presented to Karl Fowlkes" loading="lazy" /><figcaption>RIAA 4x Platinum · presented to Karl Fowlkes, Esq.</figcaption></figure>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="quote">
          <p className="q">"[CLIENT TESTIMONIAL: what changed for them after working with Karl.]"</p>
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
