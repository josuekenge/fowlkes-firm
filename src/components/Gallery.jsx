// Shared image grids fed by src/data/gallery.js. Every figure links back to its Instagram post.

export function Fig({ item, ratio = '1', eager = false, showSub = true }) {
  return (
    <figure className="fig">
      <a href={item.url} target="_blank" rel="noreferrer" aria-label={`${item.title} on Instagram`}>
        <img src={item.src} alt={item.title} loading={eager ? 'eager' : 'lazy'} style={{ aspectRatio: ratio }} />
      </a>
      <figcaption>
        <span className="t">{item.outlet ? `${item.outlet} · ${item.title}` : item.title}</span>
        {showSub && item.sub && <span className="s">{item.sub}</span>}
      </figcaption>
    </figure>
  )
}

export function Grid({ items, cols = 4, ratio = '1', className = '' }) {
  return (
    <div className={`gallery cols-${cols} ${className}`.trim()}>
      {items.map((it) => <Fig key={it.n} item={it} ratio={ratio} />)}
    </div>
  )
}
