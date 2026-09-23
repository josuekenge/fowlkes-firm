import { readFileSync } from 'node:fs'

// The site is a preview for Karl; it must stay out of search engines until he approves it.
describe('search engine blocking', () => {
  it('index.html tells crawlers not to index or follow', () => {
    const html = readFileSync('index.html', 'utf8')
    expect(html).toMatch(/<meta name="robots" content="noindex, nofollow" \/>/)
  })

  it('Cloudflare sends X-Robots-Tag noindex on every path', () => {
    const headers = readFileSync('public/_headers', 'utf8')
    expect(headers).toMatch(/^\/\*\n\s+X-Robots-Tag: noindex, nofollow$/m)
  })
})
