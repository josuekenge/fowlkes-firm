import { Link } from 'react-router-dom'
import { karl } from '../data/site.js'

export default function About() {
  return (
    <main>
      <header className="page-head wrap" style={{ paddingBottom: 48 }}>
        <div className="main">
          <span className="eyebrow">The Fowlkes Firm</span>
          <h1>About</h1>
        </div>
      </header>

      {/* portrait left, credentials right */}
      <section className="section wrap rule profile">
        <div className="left">
          <img src={karl.portrait} alt="Karl Fowlkes, Esq., founder and managing partner of The Fowlkes Firm" width="633" height="633" fetchPriority="high" />
          <div className="socials">
            <a href={karl.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={karl.instagram} target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
        <div className="right">
          <span className="eyebrow">{karl.title}</span>
          <h2 className="h2">{karl.name}</h2>
          <p className="headline">{karl.headline}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, fontSize: 19, lineHeight: 1.55, color: 'var(--ink-2)' }}>
            {karl.bio.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
          <div className="recog">
            {karl.recognition.map(([k, v]) => <div key={k}><span className="k">{k}</span><span>{v}</span></div>)}
            <div><span className="k">Education</span><span>{karl.education}</span></div>
            <div><span className="k">Teaching</span><span>Drexel University, Music Industry Program · Rutgers Business School</span></div>
            <div><span className="k">Also</span><span>COO, EVGLE · Launched The Fowlkes Firm in 2019</span></div>
          </div>
          <span style={{ fontSize: 14, color: 'var(--muted)' }}>Featured in {karl.featuredIn}.</span>
          <a href="/#contact" className="btn" style={{ alignSelf: 'flex-start' }}>Work with Karl</a>
        </div>
      </section>

      {/* where he's from + why the firm exists */}
      <section className="section wrap rule side">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span className="eyebrow">Where he's from</span>
          <h2 className="h2" style={{ fontSize: 48 }}>Jersey, and the other side of the table.</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: 19, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 760 }}>
          {karl.origin.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          <blockquote className="pull">
            <p>"{karl.quote[0]}"</p>
            <cite>{karl.quote[1]}</cite>
          </blockquote>
        </div>
      </section>

      {/* in the room */}
      <section className="section wrap rule" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span className="eyebrow">Stages, panels and plaques</span>
            <h2 className="h2" style={{ fontSize: 48 }}>In the room</h2>
          </div>
          <Link to="/articles" className="link">Every article and deal</Link>
        </div>
        <div className="room">
          {karl.photos.map(([src, cap]) => (
            <figure key={src}><img src={src} alt={cap} loading="lazy" /><figcaption>{cap}</figcaption></figure>
          ))}
          <figure><img src="/images/plaque-4x-platinum.jpg" alt="RIAA 4x Platinum plaque presented to Karl Fowlkes" loading="lazy" /><figcaption>RIAA 4x Platinum · presented to Karl Fowlkes, Esq.</figcaption></figure>
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
