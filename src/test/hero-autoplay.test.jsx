import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HeroCarousel from '../components/HeroCarousel.jsx'

// The hero slideshow must keep moving on its own, on phones too. On a phone a tap fires the
// same mouseenter / focus events a desktop hover does, but never the matching leave / blur,
// so any pause-on-hover logic has to ignore touch or the slideshow freezes after one tap.
const count = (c) => c.querySelector('.hero-slide-count').textContent
const tick = (ms = 2800) => act(() => { vi.advanceTimersByTime(ms) })

describe('hero slideshow autoplay', () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  function setup() {
    const { container } = render(<MemoryRouter><HeroCarousel /></MemoryRouter>)
    return { container, carousel: container.querySelector('.hero-carousel') }
  }

  it('moves to the next slide on its own and wraps after the last', () => {
    const { container } = setup()
    expect(count(container)).toBe('01 / 06')
    tick(); expect(count(container)).toBe('02 / 06')
    tick(); expect(count(container)).toBe('03 / 06')
    for (let i = 0; i < 4; i++) tick()
    expect(count(container)).toBe('01 / 06')
  })

  it('keeps moving after a finger taps the photo (iOS fires mouseenter, never mouseleave)', () => {
    const { container, carousel } = setup()
    fireEvent.pointerEnter(carousel, { pointerType: 'touch' })
    fireEvent.mouseEnter(carousel)
    tick(); expect(count(container)).toBe('02 / 06')
    tick(); expect(count(container)).toBe('03 / 06')
  })

  it('keeps moving after a finger taps the next button (Android focuses it, never blurs)', () => {
    const { container, carousel } = setup()
    const next = screen.getByRole('button', { name: 'Next image' })
    fireEvent.pointerEnter(carousel, { pointerType: 'touch' })
    fireEvent.mouseEnter(carousel)
    act(() => { next.focus() })
    fireEvent.click(next)
    expect(count(container)).toBe('02 / 06')
    tick(); expect(count(container)).toBe('03 / 06')
  })

  it('changes slides in under 3 seconds', () => {
    const { container } = setup()
    tick(2999); expect(count(container)).toBe('02 / 06')
  })

  it('gives a full slide of time after a manual change instead of jumping right away', () => {
    const { container } = setup()
    tick(2000)
    fireEvent.click(screen.getByRole('button', { name: 'Next image' }))
    expect(count(container)).toBe('02 / 06')
    tick(2000); expect(count(container)).toBe('02 / 06')
    tick(800); expect(count(container)).toBe('03 / 06')
  })

  it('keeps moving while a desktop mouse rests on the photo', () => {
    const { container, carousel } = setup()
    fireEvent.pointerEnter(carousel, { pointerType: 'mouse' })
    fireEvent.mouseEnter(carousel)
    tick(); expect(count(container)).toBe('02 / 06')
    tick(); expect(count(container)).toBe('03 / 06')
  })

  it('crossfades on automatic changes, same as manual ones', () => {
    const { container } = setup()
    tick()
    expect(container.querySelector('.hero-carousel img.outgoing')).toHaveAttribute('src', '/images/hero-music-soul2.webp')
  })
})
