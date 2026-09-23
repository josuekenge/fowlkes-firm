import { Link } from 'react-router-dom'
import { firm, stats, practiceAreas, karl } from '../data/site.js'
import { Plus } from '../components/Layout.jsx'
import ContactForm from '../components/ContactForm.jsx'
import TopClients from '../components/TopClients.jsx'
import HeroCarousel from '../components/HeroCarousel.jsx'

const milestoneItems = [
  ...stats.map(({ value, label }) => ({ value, label })),
  { value: 'Billboard ×2', label: 'Top Music Lawyers · 2023 & 2024' },
  { value: '40 Under 40', label: 'Bloomberg Law · 2021' },
  { value: '7× Platinum', label: 'Lil Baby, My Turn · client productions' },
  { value: '#1 Billboard 200', label: 'Drake & PARTYNEXTDOOR · client productions' },
  { value: 'EVGLE', label: 'Independent label · Blxst' },
  { value: 'Red Bull Records', label: 'Blxst, Chosen · client release' },
  { value: '10K Projects', label: 'Sunday Scaries · client release' },
  { value: 'Broke Records', label: 'Camp the Hills · client release' },
  { value: 'Drake · J. Cole · Nas', label: 'Credits by firm clients' },
]

function MilestoneItems({ duplicate = false }) {
  return milestoneItems.map((item, index) => (
    <div className="milestone" key={`${duplicate ? 'copy' : 'original'}-${index}`}>
      <span className="value">{item.value}</span>
      <span className="label">{item.label}</span>
    </div>
  ))
}

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
        <HeroCarousel />
      </header>

      <div className="stats home-stats">
        <section className="milestone-slider" aria-label="Firm milestones and client credits">
          <div className="milestone-track">
            <div className="milestone-group"><MilestoneItems /></div>
            <div className="milestone-group" aria-hidden="true"><MilestoneItems duplicate /></div>
          </div>
        </section>
        <div className="dark">
          <span className="value display">Every matter starts with a conversation.</span>
          <a href="#contact" className="link" style={{ alignSelf: 'flex-start' }}>Book a consultation</a>
        </div>
      </div>

      {/* PRACTICE: snippet only, each opens its own page */}
      <section id="practice" className="section wrap rule side">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <h2 className="h2">Practice areas</h2>
          <p style={{ fontSize: 19, color: 'var(--ink-2)' }}>Business-minded, industry-specific counsel. Sophisticated dealmaking blended with practical strategy. Each area opens to its own page with the work behind it.</p>
        </div>
        <div className="acc">
          {practiceAreas.map((a) => (
            <details key={a.slug}>
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

      <TopClients />

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
            <a href={firm.social.instagram} target="_blank" rel="noreferrer" className="link">@fowlkesfirm on Instagram</a>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="quote">
          <p className="q">“The goal is to protect cultural assets and provide legal strategy.”</p>
          <a className="quote-portrait" href="https://www.instagram.com/p/CwIPq7PLA7s/" target="_blank" rel="noreferrer" aria-label="View Karl Fowlkes portrait on Instagram">
            <img src="/images/karl/16-CwIPq7PLA7s.jpg" alt="Karl Fowlkes standing by a window and looking to his left" loading="lazy" />
          </a>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span className="who">Karl Fowlkes, Esq. · Founder</span>
            <a href="https://boardroom.tv/karl-fowlkes-black-history-month/" target="_blank" rel="noreferrer" className="link" style={{ alignSelf: 'flex-start' }}>Read the Boardroom interview ↗</a>
            <span className="note">{firm.verified}</span>
          </div>
        </div>
        <ContactForm />
      </section>
    </main>
  )
}
