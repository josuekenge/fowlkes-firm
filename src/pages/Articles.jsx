import { Link } from 'react-router-dom'
import { ig, karl } from '../data/gallery.js'
import Arrow from '../components/Arrow.jsx'

const photo = (id) => id.startsWith('/') ? id : [...ig, ...karl].find((item) => item.n === id)?.src
const story = (date, source, title, description, href, photoId) => ({ date, source, title, description, href, image: photo(photoId) })

const collections = [
  {
    id: 'press', label: 'Press & interviews', intro: 'Stories and conversations featuring Karl Fowlkes and the firm.',
    stories: [
      story('November 3, 2023', 'ABC News Live', 'AI songs that mimic popular artists raising alarms in the music industry', 'Karl discusses artist voices, publicity rights and the questions AI raises for music.', 'https://abcnews.com/US/ai-songs-mimic-popular-artists-raising-alarms-music/story?id=104569841', 'k12'),
      story('February 28, 2023', 'Boardroom', 'Karl Fowlkes: Build & Transcend', 'A conversation about building a practice at the intersection of music, ownership and culture.', 'https://boardroom.tv/karl-fowlkes-black-history-month/', 'k19'),
      story('December 8, 2022', 'Billboard Pro', 'What Happens to Songwriters When AI Can Generate Music?', 'Karl weighs in on what generative music could mean for writers and their rights.', 'https://www.billboard.com/pro/ai-technology-will-change-how-music-written/', '21'),
      story('March 25, 2022', 'Pex', 'Inside Rights with Karl Fowlkes', 'An interview on work for hire, music ownership and the value of a catalog.', 'https://pex.com/blog/inside-rights-with-karl-fowlkes-managing-partner-at-the-fowlkes-firm/', '/images/press-pex-inside-rights.png'),
      story('January 3, 2022', 'Muse by Clio', 'Liner Notes: Karl Fowlkes on Wu-Tang, EYL and Building Fowlkes Firm', 'The music and experiences behind Karl’s entertainment law practice.', 'https://musebycl.io/liner-notes/karl-fowlkes-wu-tang-eyl-and-building-fowlkes-firm-entertainment-law', '48'),
      story('November 29, 2021', 'The Source', 'Karl Fowlkes: A Music Business Savant', 'A profile of the firm’s early years and its work with artists and producers.', 'https://thesource.com/2021/11/29/karl-fowlkes-a-music-business-savant/', 'k38'),
      story('2021', 'Trapital', 'Becoming an Entertainment Attorney, NBA Agent, and NIL Opportunities', 'Karl’s path into entertainment law and the changing sports landscape.', 'https://www.trapital.co/episodes/karl-fowlkes-on-becoming-an-entertainment-attorney-nba-agent-and-nil-opportunities', 'k31'),
    ],
  },
  {
    id: 'insights', label: 'Insights', intro: 'Practical writing from the firm on college sports and NIL.',
    stories: [
      story('January 11, 2026', 'The Fowlkes Firm', 'What Colleges Need to Know About the New Incremental Scholarship Rules Under the House Settlement', 'How new scholarship rules affect benefit caps, planning and compliance.', 'https://www.fowlkesfirm.com/blog/csc', '12'),
      story('January 5, 2026', 'The Fowlkes Firm', 'A Parent’s Guide to NIL', 'What families should know before an athlete signs an NIL agreement.', 'https://www.fowlkesfirm.com/blog/parentsnil', 'k21'),
    ],
  },
  {
    id: 'recognition', label: 'Recognition', intro: 'Independent recognition of the firm’s work in music law.',
    stories: [
      story('April 1, 2024', 'Billboard', 'Top Music Lawyers 2024', 'Karl is named to Billboard’s list for a second consecutive year.', 'https://www.billboard.com/pro/billboard-top-music-lawyers-2024-list/', 'k01'),
      story('April 3, 2023', 'Billboard', 'Top Music Lawyers 2023', 'Billboard recognizes Karl among the attorneys shaping the music business.', 'https://www.billboard.com/pro/billboard-top-music-lawyers-2023-list/', 'k18'),
    ],
  },
  {
    id: 'announcements', label: 'Firm announcements', intro: 'News and updates directly from The Fowlkes Firm.',
    stories: [
      story('April 2026', 'Firm notice', 'A notice about accounts impersonating the firm', 'The firm shares guidance on recognizing unauthorized messages and payment requests.', 'https://www.instagram.com/p/DWrAxPLkRBd/', '01'),
      story('January 4, 2026', 'Practice launch', 'The Fowlkes Firm Launches NIL & College Sports Law Practice', 'A new practice focused on college athletes, families and NIL decisions.', 'https://www.fowlkesfirm.com/blog/2026/1/4/the-fowlkes-firm-launches-name-image-amp-likeness-nil-amp-college-sports-law-practice', '02'),
    ],
  },
]

function StoryCard({ item }) {
  return (
    <a className="story-row" href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${item.title} — read at ${item.source}`}>
      <div className="story-image"><img src={item.image} alt={`${item.source}: ${item.title}`} loading="lazy" /></div>
      <div className="story-copy">
        <p className="story-meta"><span>{item.source}</span><span>{item.date}</span></p>
        <h3>{item.title}</h3>
        <span className="story-action">Read original <span aria-hidden="true"><Arrow dir="up-right" /></span></span>
      </div>
      <aside className="story-note"><span className="eyebrow">In brief</span><p>{item.description}</p></aside>
    </a>
  )
}

export default function Articles() {
  return (
    <main className="articles-page">
      <header className="articles-head wrap">
        <div className="articles-head-main">
          <span className="eyebrow">The Fowlkes Firm / Stories</span>
          <h1>Stories worth telling.</h1>
          <p>Reporting, ideas and moments from the work behind music, sports and business.</p>
        </div>
        <nav className="articles-index" aria-label="On this page">
          <span className="eyebrow">Browse the page</span>
          {collections.map((item, index) => <a key={item.id} href={`#${item.id}`}><span>{String(index + 1).padStart(2, '0')}</span>{item.label}<span aria-hidden="true"><Arrow dir="down-right" /></span></a>)}
        </nav>
      </header>
      <div className="articles-content wrap">
        {collections.map((collection, index) => (
          <section className="story-section" id={collection.id} key={collection.id} aria-labelledby={`heading-${collection.id}`}>
            <header className="story-section-head">
              <span className="story-section-number">{String(index + 1).padStart(2, '0')}</span>
              <div><h2 id={`heading-${collection.id}`}>{collection.label}</h2><p>{collection.intro}</p></div>
              <span className="story-section-count">{String(collection.stories.length).padStart(2, '0')} stories</span>
            </header>
            <div className="story-list">{collection.stories.map((item) => <StoryCard key={item.href} item={item} />)}</div>
          </section>
        ))}
        <p className="articles-clients-note" data-testid="clients-note">
          Looking for client releases and certifications? <Link to="/clients">See the Clients page <Arrow dir="right" /></Link>
        </p>
      </div>
    </main>
  )
}
