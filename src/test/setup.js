import '@testing-library/jest-dom/vitest'

// Node 25 ships a stub global localStorage that shadows jsdom's. Replace it
// with a real in-memory implementation for tests.
const store = new Map()
const mem = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
  clear: () => store.clear(),
  key: (i) => [...store.keys()][i] ?? null,
  get length() { return store.size },
}
Object.defineProperty(globalThis, 'localStorage', { value: mem, configurable: true })
Object.defineProperty(window, 'localStorage', { value: mem, configurable: true })
