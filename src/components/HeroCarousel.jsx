import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Arrow from './Arrow.jsx'

const slides = [
  { label: 'Music Law', image: '/images/hero-music-soul2.webp', alt: 'Hip-hop artist in a recording studio', to: '/practice/music-law', focus: '78% top' },
  // Photo by Maria Orlova: https://www.pexels.com/photo/interior-of-indoors-basketball-court-in-sports-center-4946389/
  { label: 'NIL & College Sports Law', image: '/images/hero-basketball-court.jpg', alt: 'Empty indoor basketball court', to: '/practice/nil-college-sports-law', focus: '55% top' },
  { label: 'Business & General Law', image: '/images/hero-business-candid-soul2.webp', alt: 'Founder reviewing business documents in her office', to: '/practice/business-entertainment-law' },
  { label: 'Entertainment Law', image: '/images/hero-athlete-contract-soul2.webp', alt: 'Basketball athlete signing an agreement with an advisor', to: '/practice/business-entertainment-law' },
  { label: 'Fractional General Counsel', image: '/images/hero-fractional-afro-soul2.webp', mobileImage: '/images/hero-fractional-mobile-soul2.webp', alt: 'Attorney seated in a wood-paneled law office, looking at the camera', to: '/practice/fractional-general-counsel', focus: '72% 30%' },
  { label: 'Of Counsel', image: '/images/hero-counsel-soul2.webp', alt: 'Attorneys reviewing documents in a conference room', to: '/practice/of-counsel' },
]

// Time each slide stays up before the next one (the crossfade takes 0.7s of it).
const SLIDE_MS = 2800

// Phones (860px and narrower) can get their own portrait crop per slide via mobileImage.
const PHONE = '(max-width: 860px)'
function SlideImage({ item, className, decorative = false, priority = false }) {
  const img = <img className={className} src={item.image} alt={decorative ? '' : item.alt} aria-hidden={decorative ? 'true' : undefined} style={{ objectPosition: item.focus || '78% top' }} fetchPriority={priority ? 'high' : undefined} />
  if (!item.mobileImage) return img
  return (
    <picture className="hero-slide-picture">
      <source media={PHONE} srcSet={item.mobileImage} />
      {img}
    </picture>
  )
}

export default function HeroCarousel() {
  const [active, setActive] = useState(0)
  const [previous, setPrevious] = useState(null)

  // Always advances, on every device: no pause on hover, tap or focus (a phone tap fires
  // mouseenter/focus with no matching leave/blur, which used to freeze the slideshow).
  // Keyed on `active`, so a manual change gives the new slide its full time.
  useEffect(() => {
    if (slides.length < 2) return undefined
    const timer = window.setTimeout(() => {
      setPrevious(active)
      setActive((active + 1) % slides.length)
    }, SLIDE_MS)
    return () => window.clearTimeout(timer)
  }, [active])

  useEffect(() => {
    if (previous === null) return undefined
    const timer = window.setTimeout(() => setPrevious(null), 700)
    return () => window.clearTimeout(timer)
  }, [previous, active])

  function show(index) {
    if (index === active) return
    setPrevious(active)
    setActive((index + slides.length) % slides.length)
  }

  const slide = slides[active]

  return (
    <div className="photo hero-carousel" aria-label="Practice area photographs">
      {previous !== null && <SlideImage item={slides[previous]} className="hero-slide outgoing" decorative />}
      <SlideImage key={slide.image} item={slide} className="hero-slide incoming" priority={active === 0} />
      <div className="hero-slide-shade" aria-hidden="true" />
      <div className="hero-slide-footer">
        <div className="hero-slide-caption">
          <span className="hero-slide-count">{String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
          <Link to={slide.to}>{slide.label} <span aria-hidden="true"><Arrow dir="up-right" /></span></Link>
        </div>
        {slides.length > 1 && <div className="hero-slide-controls" aria-label="Choose a practice area image">
          <button type="button" onClick={() => show(active - 1)} aria-label="Previous image"><Arrow dir="left" /></button>
          <button type="button" onClick={() => show(active + 1)} aria-label="Next image"><Arrow dir="right" /></button>
        </div>}
      </div>
      {slides.length > 1 && <div className="hero-slide-progress" aria-label="Choose a practice area image">{slides.map((item, index) => <button key={item.label} type="button" className={index === active ? 'active' : ''} onClick={() => show(index)} aria-label={`Show ${item.label}`} aria-current={index === active ? 'true' : undefined}><span /></button>)}</div>}
    </div>
  )
}
