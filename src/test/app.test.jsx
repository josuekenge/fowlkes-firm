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
    expect(screen.getByText('$80M+')).toBeInTheDocument()
    expect(screen.getByText(/Negotiated for artists/i)).toBeInTheDocument()
    expect(practiceAreas).toHaveLength(5)
    expect(screen.queryByText(/Executive Representation/)).toBeNull()
    for (const a of practiceAreas) expect(screen.getAllByText(a.title).length).toBeGreaterThan(0)
  })
  it('hero image is in color (no grayscale filter anywhere)', () => {
    const { container } = at('/')
    const img = screen.getByAltText('Artist looking upward')
    expect(img).toHaveAttribute('src', '/images/hero-lookup.jpg')
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
    expect(screen.getByRole('link', { name: /View more/ })).toHaveAttribute('href', '/clients')
    expect(screen.getAllByRole('link', { name: 'About' }).some((a) => a.getAttribute('href') === '/about')).toBe(true)
    expect(screen.getByAltText('Karl Fowlkes, Esq.')).toHaveAttribute('src', '/images/karl-portrait.jpg')
    expect(screen.getAllByRole('link', { name: 'LinkedIn' }).some((a) => a.getAttribute('href').includes('linkedin.com/in/karl-fowlkes-esq-6521805b'))).toBe(true)
  })
  it('press renders as a year roadmap, newest first', () => {
    at('/')
    const years = [...document.querySelectorAll('.roadmap .year')].map((e) => e.textContent)
    expect(years[0]).toBe('2026')
    expect(years).toContain('2021')
    expect(screen.getByText(/They've Got Next/)).toBeInTheDocument()
  })
  it('testimonial stays on the home page', () => {
    at('/')
    expect(screen.getByText(/CLIENT TESTIMONIAL/)).toBeInTheDocument()
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
  it('renders sections from the markdown and links entries with URLs', async () => {
    const md = '# Articles\n\n## 1. Press\n\n- **2023-02-28 · Boardroom · Build & Transcend** — interview. — https://boardroom.tv/x\n- **2021-07-14 · Bloomberg Law · 40 Under 40** — inaugural. — [link needed]\n'
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: true, text: async () => md })
    at('/articles')
    expect(await screen.findByText('Build & Transcend')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Build & Transcend/ })).toHaveAttribute('href', 'https://boardroom.tv/x')
    expect(screen.getByText('40 Under 40').closest('a')).toBeNull()
  })
  it('shows an error and logs when the markdown fails to load', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 })
    at('/articles')
    expect(await screen.findByRole('alert')).toHaveTextContent(/unavailable/i)
    const logs = JSON.parse(localStorage.getItem('fowlkes.log'))
    expect(logs.some((l) => l.level === 'error' && /articles load failed/.test(l.msg))).toBe(true)
  })
})

describe('404', () => {
  it('renders not found for unknown routes', () => {
    at('/whatever')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Page not found')
  })
})
