import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { render } from '@testing-library/react'
import Arrow from '../components/Arrow.jsx'

// Phones draw text arrows (↗ → ← ↓) as emoji-style glyphs, so the site must only use the drawn <Arrow /> icon.
function sourceFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return name === 'test' ? [] : sourceFiles(path)
    return /\.(jsx?|css)$/.test(name) ? [path] : []
  })
}

describe('arrows', () => {
  it('no source file uses a text arrow character', () => {
    const offenders = sourceFiles('src').filter((file) => /[↗↘↙↖→←↑↓➔➝⟶]/.test(readFileSync(file, 'utf8')))
    expect(offenders).toEqual([])
  })

  it.each(['right', 'left', 'down', 'up-right', 'down-right'])('draws a %s arrow as a hidden svg', (dir) => {
    const { container } = render(<Arrow dir={dir} />)
    const svg = container.querySelector('svg.arrow')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg.querySelector('path').getAttribute('d')).toBeTruthy()
  })
})
