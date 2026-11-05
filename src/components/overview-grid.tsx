type OverviewItem = { id: string; title: string; description: string };

/** Shared separator grid for services and company values. */
export function OverviewGrid({ items, id, label }: { items: readonly OverviewItem[]; id?: string; label: string }) {
  return <ul className="ams-services-overview-grid" id={id} aria-label={label}>
    {items.map((item, index) => <li className="ams-service-overview-card" id={item.id} key={item.id}>
      <div data-ams-reveal="up" data-ams-delay={(index % 3) * 140}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </li>)}
  </ul>;
}
