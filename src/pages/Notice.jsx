import { Link } from 'react-router-dom'
import { firm } from '../data/site.js'

export default function Notice({ notFound = false }) {
  return (
    <main>
      <header className="page-head wrap">
        <div className="main">
          <span className="eyebrow">{notFound ? 'Error 404' : 'Notice'}</span>
          <h1>{notFound ? 'Page not found' : 'Notice'}</h1>
          <p className="lede">{notFound ? 'That page does not exist.' : firm.verified}</p>
          {!notFound && <p style={{ color: 'var(--ink-2)' }}>Attorney advertising. Prior results do not guarantee a similar outcome. This site is for general information only and does not create an attorney–client relationship.</p>}
          <Link to="/" className="link" style={{ alignSelf: 'flex-start' }}>Back to home</Link>
        </div>
      </header>
    </main>
  )
}
