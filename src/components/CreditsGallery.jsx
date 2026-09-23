import { useRef, useState } from 'react'
import { log } from '../lib/log.js'

// Clients page: the headline credits hung as a gallery wall you scroll sideways. Each work is the
// record's real cover or plaque (from the firm's own posts), with a museum-style wall label that
// leads with the verified number. Arrows, scroll, drag and swipe all move it; the piece in focus is lit.
const pad = (x) => String(x).padStart(2, '0')

// Desktop: after the last work, the track's leftover space holds a closing panel (every artist on
// the wall, plus next steps) instead of an empty wall.
export default function CreditsGallery({ items, names = [], onMore }) {
  const track = useRef(null)
  const [i, setI] = useState(0)
  const n = items.length

  // One step = a work's width plus the gap, read from the live layout so every breakpoint works.
  function step() {
    const el = track.current
    const first = el && el.querySelector('.cg-work')
    if (!first) return 0
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    return first.getBoundingClientRect().width + gap
  }

  function onScroll() {
    const s = step()
    if (!s) return
    const k = Math.max(0, Math.min(n - 1, Math.round(track.current.scrollLeft / s)))
    if (k !== i) setI(k)
  }

  function go(k) {
    const next = Math.max(0, Math.min(n - 1, k))
    const el = track.current
    const reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (el && typeof el.scrollTo === 'function') el.scrollTo({ left: next * step(), behavior: reduce ? 'auto' : 'smooth' })
    setI(next)
    log.info('credits gallery', { to: next, work: items[next] && items[next].record })
  }

  return (
    <div className="cg">
      <div className="cg-bar">
        <span className="cg-hint">Scroll, drag or use the arrows</span>
        <span className="cg-count" aria-live="polite">{pad(i + 1)} / {pad(n)}</span>
        <button type="button" onClick={() => go(i - 1)} disabled={i === 0} aria-label="Previous work">←</button>
        <button type="button" onClick={() => go(i + 1)} disabled={i === n - 1} aria-label="Next work">→</button>
      </div>

      <ol className="cg-track" ref={track} onScroll={onScroll} tabIndex={0} aria-label="Headline credits, scrolls sideways">
        {items.map((w, k) => (
          <li key={w.artist + w.record} className={`cg-work${k === i ? ' on' : ''}`}>
            <figure>
              <div className="cg-frame"><img src={w.src} alt={`${w.kind}: ${w.artist}, ${w.record}`} loading="lazy" /></div>
              <figcaption>
                <span className="v">{w.stat}</span>
                <span className="l">{w.statLabel}</span>
                <span className="no">No. {pad(k + 1)} · {w.kind}</span>
                <span className="rule" aria-hidden="true" />
                <span className="artist">{w.artist}</span>
                <span className="record">{w.record}</span>
                <span className="by">Produced by {w.clients.join(', ')}</span>
              </figcaption>
            </figure>
          </li>
        ))}
        {names.length > 0 && (
          <li className="cg-end" aria-label="Every artist on the wall">
            <span className="cg-end-k">Every artist on the wall</span>
            <p className="cg-end-t">{names.length} marquee artists.</p>
            <p className="cg-end-names">
              {names.map((a, k) => <span key={a}>{a}{k < names.length - 1 && <span className="dot" aria-hidden="true"> · </span>}</span>)}
            </p>
            <div className="cg-end-actions">
              {onMore && <button type="button" className="link" onClick={onMore}>See every credit ↓</button>}
              <a href="/#contact" className="btn light">Start a conversation</a>
            </div>
          </li>
        )}
      </ol>

      <div className="cg-rail" aria-hidden="true"><span style={{ width: `${((i + 1) / n) * 100}%` }} /></div>
    </div>
  )
}
