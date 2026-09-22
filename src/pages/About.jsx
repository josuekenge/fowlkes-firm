import { Link } from 'react-router-dom'
import { karl, practiceAreas } from '../data/site.js'

export default function About() {
  return (
    <main>
      <header className="about-hero">
        <div className="copy">
          <span className="eyebrow">{karl.title} · The Fowlkes Firm</span>
          <h1>{karl.name}</h1>
          <p className="lede">{karl.headline}</p>
          <div className="socials">
            <a href={karl.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={karl.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href="/#contact">Work with Karl</a>
          </div>
        </div>
        <div className="photo">
          <img src={karl.portrait} alt="Karl Fowlkes, Esq., founder and managing partner of The Fowlkes Firm" width="633" height="633" fetchPriority="high" />
        </div>
      </header>

      <section className="section wrap rule side">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span className="eyebrow">01</span>
          <h2 className="h2" style={{ fontSize: 48 }}>Founder &amp; Managing Partner</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: 19, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 760 }}>
          {karl.bio.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
      </section>

      <section className="section wrap rule side">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span className="eyebrow">02</span>
          <h2 className="h2" style={{ fontSize: 48 }}>What he does</h2>
        </div>
        <div className="rows">
          {practiceAreas.map((a) => (
            <Link key={a.slug} to={`/practice/${a.slug}`} className="row press">
              <span className="k">{a.n}</span>
              <span className="v">{a.title}<span style={{ display: 'block', fontFamily: 'var(--body)', fontSize: 16, color: 'var(--muted)', marginTop: 6 }}>{a.short}</span></span>
              <span className="d">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section wrap rule side">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span className="eyebrow">03</span>
          <h2 className="h2" style={{ fontSize: 48 }}>Where he's from</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: 19, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 760 }}>
          <p>[HOMETOWN: Karl's LinkedIn places him in Newark, New Jersey, and he calls the Sixers his hometown team. Confirm how he wants this told.]</p>
          <p>He earned his J.D. at {karl.education}, spent a short stint in corporate law, then opened The Fowlkes Firm. Today the firm sits at 1200 Morris Turnpike in Short Hills, New Jersey, and works with clients across the country.</p>
          <div className="recog">
            <div><span className="k">Education</span><span>{karl.education}</span></div>
            <div><span className="k">Teaching</span><span>Drexel University, Music Industry Program · Rutgers Business School</span></div>
            <div><span className="k">Also</span><span>COO, EVGLE</span></div>
          </div>
        </div>
      </section>

      <section className="section wrap rule" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span className="eyebrow">04</span>
            <h2 className="h2" style={{ fontSize: 48 }}>In the room</h2>
          </div>
          <span className="eyebrow">Stages, panels and plaques</span>
        </div>
        <div className="room">
          {karl.photos.map(([src, cap]) => (
            <figure key={src}><img src={src} alt={cap} loading="lazy" /><figcaption>{cap}</figcaption></figure>
          ))}
          <figure><img src="/images/plaque-4x-platinum.jpg" alt="RIAA 4x Platinum plaque presented to Karl Fowlkes" loading="lazy" /><figcaption>RIAA 4x Platinum · presented to Karl Fowlkes, Esq.</figcaption></figure>
        </div>
      </section>

      <section className="section wrap rule side">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span className="eyebrow">05</span>
          <h2 className="h2" style={{ fontSize: 48 }}>Recognition</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="recog">
            {karl.recognition.map(([k, v]) => <div key={k}><span className="k">{k}</span><span>{v}</span></div>)}
          </div>
          <span style={{ fontSize: 15, color: 'var(--muted)' }}>Featured in {karl.featuredIn}.</span>
          <Link to="/articles" className="link" style={{ alignSelf: 'flex-start' }}>Every article and deal →</Link>
        </div>
      </section>

      <section className="cta-band wrap">
        <h2>Work with Karl.</h2>
        <div className="r">
          <p>Producers, artists, athletes and founders. Every matter starts with a conversation.</p>
          <a href="/#contact" className="btn light">Start a conversation</a>
        </div>
      </section>
    </main>
  )
}
