import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, within, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.jsx'
import SpeakingStory from '../components/SpeakingStory.jsx'
import PressSection from '../components/PressSection.jsx'
import { practiceAreas } from '../data/site.js'

function at(path) {
  return render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)
}

beforeEach(() => {
  window.scrollTo = vi.fn()
  Element.prototype.scrollIntoView = vi.fn()
  localStorage.clear()
})

describe('home', () => {
  it('shows the hero, the $80M stat framed as client outcome, and all five practice areas', () => {
    at('/')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Music. Sports. Business.')
    const milestones = document.querySelector('.milestone-group:not([aria-hidden])')
    expect(within(milestones).getByText('$80M+')).toBeInTheDocument()
    expect(within(milestones).getByText(/Negotiated for artists/i)).toBeInTheDocument()
    expect(within(milestones).getByText('Billboard ×2')).toBeInTheDocument()
    expect(within(milestones).getByText('Red Bull Records')).toBeInTheDocument()
    expect(document.querySelector('.milestone-group[aria-hidden="true"]')).toBeInTheDocument()
    expect(screen.getByText('Every matter starts with a conversation.')).toBeInTheDocument()
    expect(practiceAreas).toHaveLength(5)
    expect(screen.queryByText(/Executive Representation/)).toBeNull()
    for (const a of practiceAreas) expect(screen.getAllByText(a.title).length).toBeGreaterThan(0)
  })
  it('rotates distinct practice photos and updates the active caption', () => {
    const { container } = at('/')
    expect(screen.getByAltText('Hip-hop artist in a recording studio')).toHaveAttribute('src', '/images/hero-music-soul2.webp')
    fireEvent.click(screen.getByRole('button', { name: 'Show NIL & College Sports Law' }))
    expect(screen.getByAltText('Empty indoor basketball court')).toHaveAttribute('src', '/images/hero-basketball-court.jpg')
    expect(screen.getByText('02 / 06')).toBeInTheDocument()
    expect(container.innerHTML).not.toMatch(/grayscale/)
  })
  it('keeps the exec-representation sentence inside Business & Entertainment, unchanged', () => {
    const biz = practiceAreas.find((a) => a.slug === 'business-entertainment-law')
    expect(biz.extra).toMatch(/^We serve as trusted legal counsel to music and sports executives at every stage of their careers\./)
  })
  it('contact form rejects a missing email and logs it', () => {
    at('/')
    const form = screen.getByRole('heading', { name: 'Start a conversation' }).closest('form')
    fireEvent.change(within(form).getByLabelText('Name'), { target: { value: 'Test' } })
    fireEvent.submit(form)
    expect(screen.getByRole('status')).toHaveTextContent(/name and email/i)
    const logs = JSON.parse(localStorage.getItem('fowlkes.log'))
    expect(logs.some((l) => l.level === 'warn' && /rejected/.test(l.msg))).toBe(true)
  })
})

describe('home practice areas are a card grid, not a stacked accordion', () => {
  it('renders all five areas as sibling cards inside one grid with no <details>', () => {
    const { container } = at('/')
    const grid = screen.getByTestId('practice-grid')
    const cards = grid.querySelectorAll(':scope > a.practice-card')
    expect(cards).toHaveLength(practiceAreas.length)
    expect(container.querySelector('#practice details')).toBeNull()
    for (const a of practiceAreas) expect(grid.querySelector(`a[href="/practice/${a.slug}"]`)).not.toBeNull()
  })
  it('the grid stylesheet keeps at least two columns at every breakpoint', () => {
    const css = readFileSync(resolve(process.cwd(), 'src/index.css'), 'utf8')
    const cols = [...css.matchAll(/\.practice-grid \{[^}]*grid-template-columns: repeat\((\d), minmax/g)].map((m) => Number(m[1]))
    expect(cols).toEqual([4, 2, 2])
  })
})

describe('about page hidden gems', () => {
  it('names The Melody App as a co-founded venture alongside the firm and EVGLE', () => {
    at('/about')
    const v = screen.getByTestId('ventures')
    expect(within(v).getByText('The Melody App')).toBeInTheDocument()
    expect(within(v).getByText('Co-founder')).toBeInTheDocument()
    expect(within(v).getByText('EVGLE')).toBeInTheDocument()
  })
  it('highlights the international stages, including Riyadh and Hamburg', () => {
    at('/about')
    const s = screen.getByTestId('stages')
    expect(within(s).getByText('Riyadh, Saudi Arabia')).toBeInTheDocument()
    expect(within(s).getByText('Hamburg, Germany')).toBeInTheDocument()
    expect(within(s).getByText('SXSW')).toBeInTheDocument()
  })
  it('speaking section tells the stages as a story: mic opening, ordered route, photo chapters', () => {
    at('/about')
    const s = screen.getByTestId('stages')
    expect(within(s).getByRole('heading', { level: 2 })).toHaveTextContent('From Newark to Riyadh.')
    expect(within(s).getByAltText(/speaking into a microphone/)).toHaveAttribute('src', '/images/karl/10-C1DYaMKMPEJ.jpg')
    const years = [...s.querySelectorAll('.sp-line .yr')].map((n) => Number(n.textContent))
    expect(years).toHaveLength(6)
    expect([...years].sort((a, b) => a - b)).toEqual(years)
    expect(s.querySelectorAll('.sp-ch')).toHaveLength(1)
    expect(s.querySelectorAll('.sp-ch img')).toHaveLength(1)
    expect(s.querySelectorAll('.sp-abroad li')).toHaveLength(2)
    for (const img of s.querySelectorAll('img')) expect(img.getAttribute('alt')).toBeTruthy()
  })
  it('speaking story reveals each part when it scrolls into view', () => {
    const observed = []
    const Real = window.IntersectionObserver
    window.IntersectionObserver = class { constructor(cb) { this.cb = cb } observe(el) { observed.push([this.cb, el]) } disconnect() {} }
    try {
      at('/about')
      const route = screen.getByTestId('stages').querySelector('.sp-route')
      expect(route).not.toHaveClass('in')
      act(() => { for (const [cb, el] of observed) cb([{ isIntersecting: true, target: el }]) })
      expect(route).toHaveClass('in')
      expect(screen.getByTestId('stages').querySelector('.sp-open')).toHaveClass('in')
    } finally { window.IntersectionObserver = Real }
  })
  it('highlights major news outlets with linked features', () => {
    at('/about')
    const p = screen.getByTestId('press')
    expect(within(p).getByRole('heading', { name: 'Featured on major news outlets' })).toBeInTheDocument()
    for (const o of ['ABC News', 'CNN', 'Billboard', 'Rolling Stone']) expect(within(p).getAllByText(o).length).toBeGreaterThan(0)
    expect(within(p).getByRole('link', { name: /A Music Business Savant/ })).toHaveAttribute('href', 'https://thesource.com/2021/11/29/karl-fowlkes-a-music-business-savant/')
    expect(within(p).queryByRole('link', { name: /Universal Music Group/ })).toBeNull()
  })
  it('tells the teaching story once, with Drexel, Rutgers and Rowan as past', () => {
    at('/about')
    const t = screen.getByTestId('teaching')
    expect(within(t).getByRole('heading', { name: 'The classroom, too.' })).toBeInTheDocument()
    expect(t).toHaveTextContent('Drexel University')
    expect(t).toHaveTextContent('Rutgers Business School')
    expect(t).toHaveTextContent('Before that he taught at Rowan')
    expect(screen.getAllByText(/Hip-Hop Evolution/)).toHaveLength(1)
  })
  it('highlights Billboard Top Music Lawyers 2023 and 2024 with links to both lists', () => {
    at('/about')
    const b = screen.getByTestId('billboard')
    expect(b).toHaveTextContent('Billboard Top Music Lawyers')
    expect(within(b).getByRole('link', { name: /2023 list/ })).toHaveAttribute('href', 'https://www.billboard.com/pro/billboard-top-music-lawyers-2023-list/')
    expect(within(b).getByRole('link', { name: /2024 list/ })).toHaveAttribute('href', 'https://www.billboard.com/pro/billboard-top-music-lawyers-2024-list/')
    expect(screen.queryByText(/Top Music Attorney/)).toBeNull()
  })
  it('highlights key phrases in black and never shows raw ** markers', () => {
    const { container } = at('/about')
    const bolds = [...container.querySelectorAll('strong.hl')].map((b) => b.textContent)
    expect(bolds).toEqual(expect.arrayContaining(['Grammy awards', 'Drexel University', 'Brooklyn Nets', 'Black ownership and independent economics']))
    expect(container.textContent).not.toContain('**')
  })
  it('home founder teaser renders the same highlights without raw markers', () => {
    const { container } = at('/')
    expect(container.querySelector('#about strong.hl')).toHaveTextContent('Internationally recognized entertainment lawyer')
    expect(container.textContent).not.toContain('**')
  })
  it('lists Rowan only as a past teaching role, never as current', () => {
    const { container } = at('/about')
    const recog = container.querySelector('.recog')
    const current = within(recog).getByText('Teaching').parentElement
    expect(current).not.toHaveTextContent('Rowan')
    expect(within(recog).getByText('Previously').parentElement).toHaveTextContent('Rowan University')
  })
})

describe('home hero phone portrait', () => {
  it('slide 5 shows the same attorney: a wide shot on desktop and a portrait crop on phones', () => {
    const { container } = at('/')
    fireEvent.click(screen.getByRole('button', { name: 'Show Fractional General Counsel' }))
    const pic = container.querySelector('.hero-carousel picture')
    expect(pic).not.toBeNull()
    expect(pic.querySelector('source')).toHaveAttribute('media', '(max-width: 860px)')
    expect(pic.querySelector('source')).toHaveAttribute('srcset', '/images/hero-fractional-mobile-soul2.webp')
    expect(pic.querySelector('img')).toHaveAttribute('src', '/images/hero-fractional-afro-soul2.webp')
  })
  it('other slides stay a plain image with no phone override', () => {
    const { container } = at('/')
    expect(container.querySelector('.hero-carousel picture')).toBeNull()
    expect(container.querySelector('.hero-carousel img.incoming')).toHaveAttribute('src', '/images/hero-music-soul2.webp')
  })
})

describe('contact form role picker', () => {
  const getForm = () => screen.getByRole('heading', { name: 'Start a conversation' }).closest('form')
  it('is an on-brand dropdown, not a native select, defaulting to the first role', () => {
    at('/')
    const form = getForm()
    expect(form.querySelector('select')).toBeNull()
    const btn = within(form).getByRole('button', { name: /I am a/ })
    expect(btn).toHaveTextContent('Producer or songwriter')
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    expect(new FormData(form).get('role')).toBe('Producer or songwriter')
  })
  it('opens a listbox of all five roles and picking one updates the value sent', () => {
    at('/')
    const form = getForm()
    fireEvent.click(within(form).getByRole('button', { name: /I am a/ }))
    const list = within(form).getByRole('listbox')
    expect(within(list).getAllByRole('option')).toHaveLength(5)
    fireEvent.click(within(list).getByRole('option', { name: 'College athlete or family' }))
    expect(within(form).queryByRole('listbox')).toBeNull()
    expect(within(form).getByRole('button', { name: /I am a/ })).toHaveTextContent('College athlete or family')
    expect(new FormData(form).get('role')).toBe('College athlete or family')
  })
  it('works from the keyboard and Escape closes without changing the value', () => {
    at('/')
    const form = getForm()
    const btn = within(form).getByRole('button', { name: /I am a/ })
    fireEvent.keyDown(btn, { key: 'ArrowDown' })
    const list = within(form).getByRole('listbox')
    fireEvent.keyDown(list, { key: 'ArrowDown' })
    fireEvent.keyDown(list, { key: 'Enter' })
    expect(new FormData(form).get('role')).toBe('Artist')
    fireEvent.keyDown(within(form).getByRole('button', { name: /I am a/ }), { key: 'Enter' })
    fireEvent.keyDown(within(form).getByRole('listbox'), { key: 'End' })
    fireEvent.keyDown(within(form).getByRole('listbox'), { key: 'Escape' })
    expect(within(form).queryByRole('listbox')).toBeNull()
    expect(new FormData(form).get('role')).toBe('Artist')
  })
})

describe('about press story controls', () => {
  it('shows a live counter with arrows that step through the stories and stop at the ends', () => {
    at('/about')
    const press = screen.getByTestId('press')
    const count = press.querySelector('.px-count')
    const prev = within(press).getByRole('button', { name: 'Previous story' })
    const next = within(press).getByRole('button', { name: 'Next story' })
    const n = press.querySelectorAll('.px-features li').length
    expect(count).toHaveTextContent(`01 / ${String(n).padStart(2, '0')}`)
    expect(prev).toBeDisabled()
    fireEvent.click(next)
    expect(count).toHaveTextContent(`02 / ${String(n).padStart(2, '0')}`)
    expect(prev).toBeEnabled()
    for (let k = 0; k < n + 2; k++) fireEvent.click(next)
    expect(count).toHaveTextContent(`${String(n).padStart(2, '0')} / ${String(n).padStart(2, '0')}`)
    expect(next).toBeDisabled()
  })
})

describe('about press story controls follow a swipe', () => {
  it('updates the counter and the rail from the scroll position in real time', () => {
    let queue = []
    const raf = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => { queue.push(cb); return queue.length })
    const flush = () => { const q = queue; queue = []; act(() => { for (const cb of q) cb(0) }) }
    try {
    at('/about')
    const press = screen.getByTestId('press')
    const ol = press.querySelector('.px-features')
    const lis = [...ol.querySelectorAll('li')]
    const n = lis.length
    const card = 266, gap = 12
    for (const li of lis) li.getBoundingClientRect = () => ({ width: card, height: 200, top: 0, left: 0, right: card, bottom: 200, x: 0, y: 0 })
    const max = (card + gap) * (n - 1)
    Object.defineProperty(ol, 'scrollWidth', { configurable: true, value: max + 390 })
    Object.defineProperty(ol, 'clientWidth', { configurable: true, value: 390 })
    const swipe = (x) => { ol.scrollLeft = x; fireEvent.scroll(ol); flush() }
    const count = press.querySelector('.px-count')
    const rail = () => parseFloat(press.querySelector('.px-rail span').style.transform.replace(/[^0-9.]/g, ''))
    swipe((card + gap) * 2)
    expect(count).toHaveTextContent(`03 / ${String(n).padStart(2, '0')}`)
    const mid = rail()
    swipe((card + gap) * 2 + 60)
    expect(count).toHaveTextContent('03 /')
    expect(rail()).toBeGreaterThan(mid)
    swipe(max)
    expect(count).toHaveTextContent(`${String(n).padStart(2, '0')} / ${String(n).padStart(2, '0')}`)
    expect(rail()).toBe(1)
    expect(within(press).getByRole('button', { name: 'Next story' })).toBeDisabled()
    } finally { raf.mockRestore() }
  })
})

describe('contact message box', () => {
  it('keeps line breaks and spacing, counts characters, and caps length for the mail hand-off', () => {
    at('/')
    const form = screen.getByRole('heading', { name: 'Start a conversation' }).closest('form')
    const box = within(form).getByLabelText('What are you working on?')
    expect(box).toHaveAttribute('maxLength', '2000')
    expect(box).toHaveClass('msg')
    const text = 'Line one\n\n  Indented line three'
    fireEvent.input(box, { target: { value: text } })
    expect(new FormData(form).get('message')).toBe(text)
    expect(form.querySelector('#c-msg-count')).toHaveTextContent(`${text.length} / 2,000`)
    fireEvent.input(box, { target: { value: 'x'.repeat(1900) } })
    expect(form.querySelector('#c-msg-count')).toHaveClass('near')
  })
})

describe('home snippets link out', () => {
  it('practice snippets link to practice pages, clients has View more to /clients, founder teaser links to /about', () => {
    at('/')
    expect(screen.getByTestId('practice-grid').querySelector('a[href="/practice/music-law"]')).toHaveTextContent('Music Law')
    expect(screen.getByRole('link', { name: /See all clients/ })).toHaveAttribute('href', '/clients')
    expect(screen.getByRole('heading', { name: 'Our clients include' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Synthetic' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Next client' }))
    expect(screen.getByRole('heading', { level: 3, name: 'Corbett' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Show Section 8' }))
    expect(screen.getByRole('heading', { level: 3, name: 'Section 8' })).toBeInTheDocument()
    expect(screen.getByText('7×')).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'About' }).some((a) => a.getAttribute('href') === '/about')).toBe(true)
    expect(screen.getByAltText('Karl Fowlkes, Esq.')).toHaveAttribute('src', '/images/karl-portrait.jpg')
    expect(screen.getAllByRole('link', { name: 'LinkedIn' }).some((a) => a.getAttribute('href').includes('linkedin.com/in/karl-fowlkes-esq-6521805b'))).toBe(true)
  })

  it('has no highlights section; the Instagram link sits in the founder teaser', () => {
    at('/')
    expect(screen.queryByRole('heading', { name: /Client & firm highlights/ })).toBeNull()
    expect(document.querySelector('#highlights')).toBeNull()
    const founder = document.querySelector('#about')
    expect(within(founder).getByRole('link', { name: '@fowlkesfirm on Instagram' })).toHaveAttribute('href', expect.stringContaining('instagram.com'))
  })
  it('attributes the founder quote to its source on the home page', () => {
    at('/')
    expect(screen.getByText(/The goal is to protect cultural assets and provide legal strategy/)).toBeInTheDocument()
    expect(screen.getByText('Karl Fowlkes, Esq. · Founder')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Read the Boardroom interview/ })).toHaveAttribute('href', 'https://boardroom.tv/karl-fowlkes-black-history-month/')
  })
})

describe('about page', () => {
  it('is titled About, has portrait + credentials, origin story, no In the room, and no What he does', () => {
    at('/about')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/^About$/)
    expect(screen.getByRole('heading', { name: 'Karl Fowlkes, Esq.' })).toBeInTheDocument()
    expect(screen.getByAltText(/Karl Fowlkes, Esq., founder/)).toHaveAttribute('src', '/images/karl-portrait.jpg')
    expect(screen.getByText(/Top Music Lawyers, 2023 and 2024/)).toBeInTheDocument()
    expect(screen.getByText(/Jersey, and the other side of the table/)).toBeInTheDocument()
    expect(screen.getByText(/launched The Fowlkes Firm in 2019/)).toBeInTheDocument()
    expect(screen.getByText(/bridge the gap/)).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'In the room' })).toBeNull()
    expect(document.querySelector('.room')).toBeNull()
    expect(document.querySelector('img[src="/images/plaque-4x-platinum.jpg"]')).toBeNull()
    expect(screen.queryByRole('heading', { name: 'What he does' })).toBeNull()
  })
})

describe('clients page', () => {
  it('lists producers by default, switches tabs, and filters by artist name', () => {
    at('/clients')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Clients')
    expect(screen.getByRole('link', { name: 'Synthetic' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('tab', { name: /Artists/ }))
    expect(screen.getByRole('link', { name: 'Blxst' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Synthetic' })).toBeNull()
    fireEvent.click(screen.getByRole('tab', { name: /Producers/ }))
    fireEvent.change(screen.getByPlaceholderText(/Search a client/), { target: { value: 'drake' } })
    expect(screen.getByRole('link', { name: 'Kid Masterpiece' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Corbett' })).toBeNull()
    fireEvent.change(screen.getByPlaceholderText(/Search a client/), { target: { value: 'zzzz' } })
    expect(screen.getByText(/No client matches/)).toBeInTheDocument()
  })
  it('shows the certified plaques grid', () => {
    at('/clients')
    expect(screen.getByRole('heading', { name: 'Certified' })).toBeInTheDocument()
    expect(screen.getAllByText('Lil Uzi Vert, Just Wanna Rock').length).toBeGreaterThan(0)
  })
})

describe('practice pages', () => {
  it('renders each practice area at its own route', () => {
    for (const a of practiceAreas) {
      const { unmount } = at(`/practice/${a.slug}`)
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(a.title)
      expect(screen.getAllByText(a.handles[0][0]).length).toBeGreaterThan(0)
      unmount()
    }
  })
  it('music page shows the client catalog with Instagram links', () => {
    at('/practice/music-law')
    expect(screen.getByRole('heading', { name: 'Client catalog' })).toBeInTheDocument()
    const syn = screen.getAllByRole('link', { name: 'Synthetic' })
    expect(syn.length).toBeGreaterThan(0)
    for (const a of syn) expect(a).toHaveAttribute('href', 'https://www.instagram.com/iamsynthetic')
    expect(screen.getByRole('heading', { name: 'Eight plaques, eight clients' })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Practice areas' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument()
  })
  it('music page client catalog is a 16-tile image grid plus a view-all link', () => {
    at('/practice/music-law')
    const grid = screen.getByTestId('client-grid')
    const tiles = grid.querySelectorAll('a.ct')
    expect(tiles.length).toBe(16)
    for (const t of tiles) {
      expect(t.getAttribute('href')).toMatch(/^https:\/\/www\.instagram\.com\//)
      expect(t.querySelector('img')).not.toBeNull()
    }
    expect(screen.getByRole('link', { name: /View all clients/ })).toHaveAttribute('href', '/clients')
  })
  it('fractional GC header swaps the Paris photo for a labelled AI attorney tile', () => {
    const { container } = at('/practice/fractional-general-counsel')
    const tiles = container.querySelectorAll('.phero .collage a')
    expect(tiles.length).toBe(5)
    const srcs = [...tiles].map((a) => a.querySelector('img').getAttribute('src'))
    expect(srcs).not.toContain('/images/karl/17-Cu7EG14LEsu.jpg')
    const ai = container.querySelector('.phero .collage a.ai-tile')
    expect(ai.querySelector('img')).toHaveAttribute('src', '/images/fractional-attorney-tile.jpg')
    expect(ai).not.toHaveAttribute('href')
    expect(ai).toHaveTextContent('AI illustration')
  })
  it('clients page numbers scroll as a looping right-to-left strip', () => {
    const { container } = at('/clients')
    const groups = container.querySelectorAll('.clients-marquee .cm-group')
    expect(groups.length).toBe(2)
    expect(groups[0]).not.toHaveAttribute('aria-hidden')
    expect(groups[1]).toHaveAttribute('aria-hidden', 'true')
    for (const g of groups) expect(g.querySelectorAll('.cm-item').length).toBe(3)
    expect(groups[0]).toHaveTextContent('RIAA certifications posted')
  })
  it('clients roster list resets to the top on group change and marks cover-less rows', () => {
    at('/clients')
    const list = screen.getByTestId('roster-list')
    list.scrollTop = 240
    fireEvent.click(screen.getByRole('tab', { name: /Labels & collectives/ }))
    expect(screen.getByTestId('roster-list').scrollTop).toBe(0)
    const evgle = within(screen.getByTestId('roster-list')).getByText('EVGLE').closest('article')
    expect(evgle).toHaveClass('no-cover')
  })
  it('clients search shows a clear button that empties the search', () => {
    at('/clients')
    const input = screen.getByPlaceholderText(/Search a client/)
    expect(screen.queryByRole('button', { name: 'Clear search' })).toBeNull()
    fireEvent.change(input, { target: { value: 'zzzz' } })
    expect(screen.getByText('No client matches that search.')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }))
    expect(input).toHaveValue('')
    expect(screen.queryByText('No client matches that search.')).toBeNull()
    expect(screen.getAllByRole('tab')).toHaveLength(3)
  })
  it('clients credits ledger covers every wall artist and only credits real clients', async () => {
    const { creditsWall, clientCatalog } = await import('../data/site.js')
    const { headliners, ledger } = await import('../data/credits.js')
    const { container } = at('/clients')
    const section = container.querySelector('#credits')
    for (const name of creditsWall) expect(section.textContent).toContain(name)
    const works = section.querySelectorAll('.cg-work')
    expect(works).toHaveLength(6)
    for (const w of works) expect(w.querySelector('img').getAttribute('src')).toMatch(/^\/images\/(ig|karl)\//)
    expect(screen.getByRole('button', { name: 'Previous work' })).toBeDisabled()
    expect(section.querySelector('.cg-count')).toHaveTextContent('01 / 06')
    fireEvent.click(screen.getByRole('button', { name: 'Next work' }))
    expect(section.querySelector('.cg-count')).toHaveTextContent('02 / 06')
    expect(works[1]).toHaveClass('on')
    const known = new Set(clientCatalog.map((c) => c[0]))
    for (const r of [...headliners, ...ledger]) for (const c of r.clients) expect(known.has(c)).toBe(true)
    const more = screen.getByRole('button', { name: `Show all ${ledger.length} credits` })
    expect(more).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(more)
    expect(screen.getByRole('button', { name: 'Show fewer credits' })).toHaveAttribute('aria-expanded', 'true')
    expect(section.querySelector('.cl-list')).toHaveClass('open')
  })
  it('credits gallery ends with a closing panel naming every wall artist, with next steps', async () => {
    const { creditsWall } = await import('../data/site.js')
    const { container } = at('/clients')
    const section = container.querySelector('#credits')
    const end = section.querySelector('.cg-end')
    expect(end).not.toBeNull()
    expect(end).toHaveTextContent(`${creditsWall.length} marquee artists.`)
    for (const a of creditsWall) expect(end.querySelector('.cg-end-names')).toHaveTextContent(a)
    expect(section.querySelectorAll('.cg-work')).toHaveLength(6)
    expect(section.querySelector('.cg-count')).toHaveTextContent('01 / 06')
    expect(within(end).getByRole('link', { name: 'Start a conversation' })).toHaveAttribute('href', '/#contact')
    fireEvent.click(within(end).getByRole('button', { name: 'See every credit ↓' }))
    expect(section.querySelector('.cl-list')).toHaveClass('open')
  })
  it('header is transparent over the home hero, solid after scrolling, and solid on other pages', () => {
    const { container, unmount } = at('/')
    const nav = container.querySelector('nav.nav')
    expect(nav).toHaveClass('home', 'clear')
    window.scrollY = 200
    fireEvent.scroll(window)
    expect(nav).not.toHaveClass('clear')
    window.scrollY = 0
    fireEvent.scroll(window)
    expect(nav).toHaveClass('clear')
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    expect(nav).not.toHaveClass('clear')
    expect(nav).toHaveClass('glass')
    window.scrollY = 300
    fireEvent.scroll(window)
    expect(nav).not.toHaveClass('glass')
    window.scrollY = 0
    fireEvent.scroll(window)
    unmount()
    const other = at('/clients').container.querySelector('nav.nav')
    expect(other).not.toHaveClass('home')
    expect(other).not.toHaveClass('clear')
  })
  it('phone menu keeps its six items: Home, Practice, Clients, Articles, About, Start a conversation', () => {
    const { container } = at('/clients')
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))
    const items = [...container.querySelectorAll('.nav .drawer a')].map((a) => a.textContent)
    expect(items).toEqual(['Home', 'Practice', 'Clients', 'Articles', 'About', 'Start a conversation'])
  })
  it('NIL page shows the launch note and the three-step section', () => {
    at('/practice/nil-college-sports-law')
    expect(screen.getByText(/Dedicated exclusively to representing college athletes/)).toBeInTheDocument()
    expect(screen.getByText('For athletes and families')).toBeInTheDocument()
  })
  it('unknown slug redirects to music law', () => {
    at('/practice/nope')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Music Law')
  })
})

describe('articles', () => {
  it('shows every category in one page with linked stories, notes, and unique images', () => {
    at('/articles')
    expect(screen.getByRole('link', { name: /AI songs that mimic popular artists/ })).toHaveAttribute('href', expect.stringContaining('abcnews.com/US/ai-songs'))
    expect(screen.getByRole('link', { name: /NIL & College Sports Law Practice/ })).toHaveAttribute('href', expect.stringContaining('fowlkesfirm.com/blog/2026'))
    expect(screen.queryByRole('link', { name: /Honestly, Nevermind/ })).toBeNull()
    expect(document.getElementById('deals')).toBeNull()
    expect(screen.queryByRole('link', { name: /Client deals/ })).toBeNull()
    expect(within(screen.getByTestId('clients-note')).getByRole('link', { name: /See the Clients page/ })).toHaveAttribute('href', '/clients')
    expect(screen.getByRole('navigation', { name: 'On this page' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Firm announcements/ })).toHaveAttribute('href', '#announcements')
    const sections = [...document.querySelectorAll('.story-section')]
    expect(sections).toHaveLength(4)
    const rows = [...document.querySelectorAll('.story-row')]
    const images = rows.map((row) => row.querySelector('img').getAttribute('src'))
    expect(rows.every((row) => row.href.startsWith('https://') && row.querySelector('.story-note')?.textContent)).toBe(true)
    expect(images.every((src) => src?.startsWith('/images/'))).toBe(true)
    expect(new Set(images).size).toBe(images.length)
  })
})

describe('404', () => {
  it('renders not found for unknown routes', () => {
    at('/whatever')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Page not found')
  })
  it('press section: real outlet logos loop right to left with names for screen readers, features stay linked', () => {
    const outlets = ['ABC News', 'CNN', 'Billboard', 'Variety', 'Rolling Stone', 'Bloomberg Law', 'Complex', 'The Source', 'Okayplayer', 'Boardroom']
    const features = [['ABC News Live', 'November 2023', 'AI songs that mimic popular artists', 'On air', 'https://abcnews.go.com/']]
    render(<MemoryRouter><PressSection outlets={outlets} features={features} featuredIn="ABC News, NJBIZ" /></MemoryRouter>)
    const s = screen.getByTestId('press')
    const groups = s.querySelectorAll('.px-group')
    expect(groups).toHaveLength(2)
    expect(groups[1]).toHaveAttribute('aria-hidden', 'true')
    const logos = groups[0].querySelectorAll('img')
    expect(logos).toHaveLength(10)
    for (const img of logos) expect(img.getAttribute('src')).toMatch(/^\/images\/press-logos\/[a-z-]+\.svg$/)
    for (const o of outlets) expect(within(groups[0]).getByText(o)).toHaveClass('sr-only')
    expect(within(s).getByRole('link', { name: /AI songs that mimic/ })).toHaveAttribute('href', 'https://abcnews.go.com/')
    expect(s).toHaveTextContent('Also featured in NJBIZ.')
  })
})
