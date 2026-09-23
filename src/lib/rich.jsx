// Renders **key phrases** from site copy as <strong>. Text without markers passes through unchanged.
export function Rich({ text }) {
  const parts = String(text).split(/\*\*(.+?)\*\*/g)
  return parts.map((part, i) => (i % 2 ? <strong key={i} className="hl">{part}</strong> : part))
}
