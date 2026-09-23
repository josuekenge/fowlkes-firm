import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { log } from '../lib/log.js'

// About page, "In the press": a black band where the outlets' real logos scroll right to left in a
// seamless loop (pauses on hover and for reduced motion), then the linked features.
// Logos: official marks as SVG in /public/images/press-logos (Wikimedia Commons, or the outlet's own site
// for Okayplayer and Boardroom), rendered white. Used only to say, accurately, where Karl was featured.
// `h` evens out optical weight: wide wordmarks get less height than compact marks.
const LOGOS = {
  'ABC News': { file: 'abc-news', h: 34 },
  CNN: { file: 'cnn', h: 30 },
  Billboard: { file: 'billboard', h: 30 },
  Variety: { file: 'variety', h: 30 },
  'Rolling Stone': { file: 'rolling-stone', h: 34 },
  'Bloomberg Law': { file: 'bloomberg-law', h: 40 },
  Complex: { file: 'complex', h: 30 },
  'The Source': { file: 'the-source', h: 36 },
  Okayplayer: { file: 'okayplayer', h: 26 },
  Boardroom: { file: 'boardroom', h: 17 },
}

function LogoRow({ outlets, copy }) {
  return (
    <ul className="px-group" aria-hidden={copy ? 'true' : undefined}>
      {outlets.map((o) => {
        const logo = LOGOS[o]
        return (
          <li key={o} style={logo ? { '--h': `${logo.h}px` } : undefined}>
            {logo
              ? <><img src={`/images/press-logos/${logo.file}.svg`} alt="" loading="lazy" /><span className="sr-only">{o}</span></>
              : <span className="px-word">{o}</span>}
          </li>
        )
      })}
    </ul>
  )
}

const pad = (x) => String(x).padStart(2, '0')

export default function PressSection({ outlets, features, featuredIn }) {
  const also = featuredIn.split(', ').filter((o) => !outlets.includes(o))
  // Phones: the stories are a swipe row. The counter and arrows track the card in view, and the rail
  // follows the scroll position continuously so it moves with the finger in real time.
  const list = useRef(null)
  const frame = useRef(0)
  const [at, setAt] = useState(0)
  const [progress, setProgress] = useState(1 / Math.max(features.length, 1))

  function measure() {
    const el = list.current
    if (!el) return
    const first = el.querySelector('li')
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const step = first ? first.getBoundingClientRect().width + gap : 0
    const max = el.scrollWidth - el.clientWidth
    const n = features.length
    const k = max <= 1 || !step ? 0 : el.scrollLeft >= max - 2 ? n - 1 : Math.round(el.scrollLeft / step)
    setAt(Math.max(0, Math.min(n - 1, k)))
    setProgress(max <= 1 ? 1 : Math.min(1, (1 + (el.scrollLeft / max) * (n - 1)) / n))
  }
  function onScroll() {
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(measure)
  }
  function go(k) {
    const el = list.current
    const next = Math.max(0, Math.min(features.length - 1, k))
    const target = el && el.querySelectorAll('li')[next]
    if (el && target && typeof el.scrollTo === 'function') {
      const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollTo({ left: target.offsetLeft - el.offsetLeft - (parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0), behavior: reduce ? 'auto' : 'smooth' })
    }
    setAt(next)
    log.info('press stories', { to: next, outlet: features[next] && features[next][0] })
  }
  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  return (
    <section id="press" className="press-x" data-testid="press" aria-labelledby="press-title">
      <div className="wrap px-head">
        <div>
          <span className="eyebrow">In the press</span>
          <h2 className="h2" id="press-title">Featured on major news outlets</h2>
        </div>
        <Link to="/articles" className="link">Every article →</Link>
      </div>

      <div className="px-marquee" aria-label="Outlets that have featured Karl Fowlkes">
        <div className="px-track">
          <LogoRow outlets={outlets} />
          <LogoRow outlets={outlets} copy />
        </div>
      </div>

      <div className="wrap px-nav" aria-label="Browse press stories">
        <span className="px-count" aria-live="polite">{pad(at + 1)} / {pad(features.length)}</span>
        <span className="px-rail" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></span>
        <button type="button" onClick={() => go(at - 1)} disabled={at === 0} aria-label="Previous story">←</button>
        <button type="button" onClick={() => go(at + 1)} disabled={at === features.length - 1} aria-label="Next story">→</button>
      </div>

      <ol className="wrap px-features" ref={list} onScroll={onScroll}>
        {features.map(([outlet, date, title, kind, url]) => {
          const body = (
            <>
              <span className="meta"><span className="o">{outlet}</span>{date && <span>{date}</span>}<span>{kind}</span></span>
              <span className="t">{title}</span>
              {url && <span className="go">Read ↗</span>}
            </>
          )
          return <li key={title}>{url ? <a href={url} target="_blank" rel="noreferrer">{body}</a> : <div>{body}</div>}</li>
        })}
      </ol>
      {also.length > 0 && <p className="wrap px-also">Also featured in {also.join(', ')}.</p>}
    </section>
  )
}
