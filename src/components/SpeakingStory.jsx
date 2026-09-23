import { useEffect, useRef, useState } from 'react'
import { log } from '../lib/log.js'

// About page, "Speaking": told as a story, in order. Opens on Karl mid-sentence at the mic, then the
// route (a timeline that draws itself as it scrolls in), then the two stages abroad as photo chapters.
// Facts match karl.stages in site.js; photos are Karl's own posts. Motion is reveal-on-scroll only and
// switches off for prefers-reduced-motion.

const route = [
  ['I', '2021', 'Podcast', 'Bloomberg Law, On The Merits', 'Guest on hip-hop artists and IP rights'],
  ['II', '2022', 'New York', 'CultureCon, presented by HBO Max', 'Featured speaker'],
  ['III', '2023', 'Austin, Texas', 'SXSW', 'Speaker'],
  ['IV', '2024', 'Hamburg, Germany', 'Reeperbahn Festival', 'Wunderkinder talent scout'],
  ['V', '2024', 'Riyadh, Saudi Arabia', 'XP Music Futures', 'Panelist · MDLBEAST'],
  ['VI', '2025', 'Brooklyn, New York', 'LIU Roc Nation School of Music, Sports & Entertainment', 'Fireside chat'],
]

const chapters = [
  { n: 'IV', src: '/images/karl/07-C_YO4I2xnGA.jpg', alt: 'Reeperbahn Festival portrait of Karl Fowlkes, Wunderkinder talent scout', place: 'Hamburg · 2024', title: 'Scouting the next wave', venue: 'Reeperbahn Festival', role: 'Wunderkinder talent scout' },
  { n: 'V', src: '/images/karl/06-DDPITs8pEDj.jpg', alt: 'XP Music Futures speaker card for Karl Fowlkes, Riyadh', place: 'Riyadh · 2024', title: 'The business of music, abroad', venue: 'XP Music Futures, MDLBEAST', role: 'Panelist' },
]

const figures = [[6, 'Stages'], [3, 'Continents'], [5, 'Years on the road']]

// Adds `in` once an element scrolls into view (once). No IntersectionObserver (old browsers, tests): shown at once.
function useReveal() {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (typeof IntersectionObserver === 'undefined') { setShown(true); return undefined }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setShown(true); io.disconnect() }
    }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, shown]
}

// Counts up to `to` when `run` turns on; lands on the exact number (and starts there with reduced motion).
function Count({ to, run }) {
  const [v, setV] = useState(to)
  useEffect(() => {
    if (!run) return undefined
    const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof requestAnimationFrame === 'undefined') { setV(to); return undefined }
    let raf = 0
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / 900)
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    setV(0)
    raf = requestAnimationFrame(tick)
    // Safety net: if frames are paused (background tab), still land on the real number.
    const done = setTimeout(() => setV(to), 1400)
    return () => { cancelAnimationFrame(raf); clearTimeout(done) }
  }, [run, to])
  return <>{v}</>
}

export default function SpeakingStory() {
  const [openRef, openIn] = useReveal()
  const [routeRef, routeIn] = useReveal()
  const [c0Ref, c0In] = useReveal()
  const [c1Ref, c1In] = useReveal()
  const chapterRefs = [[c0Ref, c0In], [c1Ref, c1In]]

  useEffect(() => { if (routeIn) log.info('speaking story: route revealed') }, [routeIn])

  return (
    <section id="stages" className="speak" data-testid="stages" aria-labelledby="speak-title">
      <div ref={openRef} className={`sp-open${openIn ? ' in' : ''}`}>
        <figure className="sp-mic">
          <img src="/images/karl/10-C1DYaMKMPEJ.jpg" alt="Karl Fowlkes speaking into a microphone on a panel" loading="lazy" />
          <figcaption>On the panel · December 2023</figcaption>
        </figure>
        <div className="sp-intro">
          <span className="eyebrow">Speaking · 2021 to 2025</span>
          <h2 id="speak-title"><span className="ln"><span>From Newark</span></span>{' '}<span className="ln"><em>to Riyadh.</em></span></h2>
          <p>Karl takes the business of music to stages across three continents, on panels, festivals and campuses.</p>
          <dl className="sp-figs">
            {figures.map(([n, l]) => <div key={l}><dt><Count to={n} run={openIn} /></dt><dd>{l}</dd></div>)}
          </dl>
        </div>
      </div>

      <div ref={routeRef} className={`sp-route wrap${routeIn ? ' in' : ''}`}>
        <div className="sp-route-head">
          <span className="eyebrow">The route</span>
          <h3>Six stages, in order.</h3>
        </div>
        <ol className="sp-line">
          {route.map(([n, year, place, event, role], i) => (
            <li key={event} style={{ '--i': i }}>
              <span className="num">{n}</span>
              <span className="yr">{year}</span>
              <span className="dot" aria-hidden="true" />
              <span className="place">{place}</span>
              <span className="event">{event}</span>
              <span className="role">{role}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="sp-chapters wrap">
        {chapters.map((c, i) => {
          const [ref, shown] = chapterRefs[i]
          return (
            <article key={c.n} ref={ref} className={`sp-ch${i % 2 ? ' rev' : ''}${shown ? ' in' : ''}`}>
              <div className="sp-ch-img"><img src={c.src} alt={c.alt} loading="lazy" /></div>
              <div className="sp-ch-copy">
                <span className="chn">Chapter {c.n}</span>
                <span className="eyebrow">{c.place}</span>
                <h4>{c.title}</h4>
                <span className="venue">{c.venue}</span>
                <span className="role">{c.role}</span>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
