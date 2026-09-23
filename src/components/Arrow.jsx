// Drawn arrow icon. Text arrow characters render as emoji-style glyphs on phones,
// so every arrow on the site uses this instead: thin strokes, inherits the text color and size.
const PATHS = {
  right: 'M1.5 8h13M9.5 3l5 5-5 5',
  left: 'M14.5 8h-13M6.5 3l-5 5 5 5',
  down: 'M8 1.5v13M3 9.5l5 5 5-5',
  'up-right': 'M3.5 12.5l9-9M5.5 3.5h7v7',
  'down-right': 'M3.5 3.5l9 9M12.5 5.5v7h-7',
}

export default function Arrow({ dir = 'right' }) {
  return (
    <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d={PATHS[dir]} />
    </svg>
  )
}
