import { Link } from 'react-router-dom'

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

export default function PressSection({ outlets, features, featuredIn }) {
  const also = featuredIn.split(', ').filter((o) => !outlets.includes(o))
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

      <ol className="wrap px-features">
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
