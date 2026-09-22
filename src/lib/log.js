// Always-on client logger. Logs to console and keeps a rolling buffer in
// localStorage so failures survive a reload. Never gated behind a debug flag.
const KEY = 'fowlkes.log'
const MAX = 200

function persist(entry) {
  try {
    const buf = JSON.parse(localStorage.getItem(KEY) || '[]')
    buf.push(entry)
    localStorage.setItem(KEY, JSON.stringify(buf.slice(-MAX)))
  } catch {
    // storage unavailable (private mode, quota): console still has it
  }
}

function emit(level, msg, data) {
  const entry = { t: new Date().toISOString(), level, msg, ...(data ? { data } : {}) }
  const fn = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log
  fn(`[fowlkes] ${entry.t} ${level.toUpperCase()} ${msg}`, data ?? '')
  persist(entry)
}

export const log = {
  info: (msg, data) => emit('info', msg, data),
  warn: (msg, data) => emit('warn', msg, data),
  error: (msg, data) => emit('error', msg, data),
  dump: () => {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
  },
}

export function installGlobalHandlers() {
  window.addEventListener('error', (e) => log.error('uncaught error', { message: e.message, file: e.filename, line: e.lineno }))
  window.addEventListener('unhandledrejection', (e) => log.error('unhandled rejection', { reason: String(e.reason) }))
  log.info('app start', { env: import.meta.env.MODE, url: location.href, ua: navigator.userAgent })
}
