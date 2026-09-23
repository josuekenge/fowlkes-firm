import { karl } from '../data/site.js'
import SpeakingStory from '../components/SpeakingStory.jsx'
import PressSection from '../components/PressSection.jsx'
import { Rich } from '../lib/rich.jsx'
import Arrow from '../components/Arrow.jsx'

export default function About() {
  return (
    <main>
      <header className="page-head wrap about-head">
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
          <div className="bb" data-testid="billboard">
            <span className="bb-k">Recognition</span>
            <span className="bb-t">{karl.billboard.title}</span>
            <span className="bb-y">
              {karl.billboard.years.map(([y, url]) => (
                <a key={y} href={url} target="_blank" rel="noreferrer" aria-label={`${karl.billboard.title} ${y} list`}>{y} <Arrow dir="up-right" /></a>
              ))}
            </span>
            <p>{karl.billboard.line}</p>
          </div>
          <div className="about-bio">
            {karl.bio.slice(0, 2).map((p) => <p key={p.slice(0, 24)}><Rich text={p} /></p>)}
          </div>
          <div className="recog">
            {karl.recognition.map(([k, v]) => <div key={k}><span className="k">{k}</span><span>{v}</span></div>)}
            <div><span className="k">Education</span><span>{karl.education}</span></div>
            <div><span className="k">Teaching</span><span>{karl.teaching}</span></div>
            <div><span className="k">Previously</span><span>{karl.teachingPast}</span></div>
          </div>
          <div className="ventures" data-testid="ventures">
            {karl.ventures.map(([name, role, line]) => (
              <div key={name}><span className="role">{role}</span><span className="name">{name}</span><span className="line">{line}</span></div>
            ))}
          </div>
          <div className="lomo"><span className="k">{karl.framework[0]}</span><p>{karl.framework[1]}</p></div>
          <a href="/#contact" className="btn" style={{ alignSelf: 'flex-start' }}>Work with Karl</a>
        </div>
      </section>

      {/* press: black band, real outlet logos scrolling right to left */}
      <PressSection outlets={karl.outlets} features={karl.features} featuredIn={karl.featuredIn} />

      {/* where he's from + why the firm exists */}
      <section className="section wrap rule side">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span className="eyebrow">Where he's from</span>
          <h2 className="h2 about-h2">Jersey, and the other side of the table.</h2>
        </div>
        <div className="about-origin">
          {karl.origin.map((p) => <p key={p.slice(0, 24)}><Rich text={p} /></p>)}
          <blockquote className="pull">
            <p>"{karl.quote[0]}"</p>
            <cite>{karl.quote[1]}</cite>
          </blockquote>
        </div>
      </section>

      {/* teaching, told as a story */}
      <section id="teaching" className="section wrap rule side teaching" data-testid="teaching">
        <div className="teaching-head">
          <span className="eyebrow">Teaching</span>
          <h2 className="h2">The classroom, too.</h2>
          <ul className="teaching-marks">
            <li><span>Now</span>Drexel University</li>
            <li><span>Now</span>Rutgers Business School</li>
            <li><span>Before</span>Rowan University</li>
          </ul>
        </div>
        <div className="teaching-story">
          {karl.teachingStory.map((p) => <p key={p.slice(0, 24)}><Rich text={p} /></p>)}
        </div>
      </section>

      {/* speaking, told as a story */}
      <SpeakingStory />

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
