import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.jsx'
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

describe('home snippets link out', () => {
  it('practice snippets link to practice pages, clients has View more to /clients, founder teaser links to /about', () => {
    at('/')
    expect(screen.getByRole('link', { name: /Know more about Music Law/ })).toHaveAttribute('href', '/practice/music-law')
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
  it('is titled About, has portrait + credentials, origin story, in the room, and no What he does', () => {
    at('/about')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/^About$/)
    expect(screen.getByRole('heading', { name: 'Karl Fowlkes, Esq.' })).toBeInTheDocument()
    expect(screen.getByAltText(/Karl Fowlkes, Esq., founder/)).toHaveAttribute('src', '/images/karl-portrait.jpg')
    expect(screen.getByText(/Top Music Attorney, 2023 and 2024/)).toBeInTheDocument()
    expect(screen.getByText(/Jersey, and the other side of the table/)).toBeInTheDocument()
    expect(screen.getByText(/launched The Fowlkes Firm in 2019/)).toBeInTheDocument()
    expect(screen.getByText(/bridge the gap/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'In the room' })).toBeInTheDocument()
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
    expect(screen.getByRole('link', { name: /Honestly, Nevermind/ })).toHaveAttribute('href', 'https://www.instagram.com/p/CfEmyUsrv7m/')
    expect(screen.getByRole('navigation', { name: 'On this page' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Firm announcements/ })).toHaveAttribute('href', '#announcements')
    const sections = [...document.querySelectorAll('.story-section')]
    expect(sections).toHaveLength(5)
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
})
