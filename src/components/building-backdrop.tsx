/** Shared responsive building photograph for the CTA and About hero. */
export function BuildingBackdrop({ priority = false }: { priority?: boolean }) {
  return <div className="ams-building-backdrop" aria-hidden="true">
    <img src="/images/cta/ams-build-with-us-1672.webp"
      srcSet="/images/cta/ams-build-with-us-720.webp 720w, /images/cta/ams-build-with-us-1280.webp 1280w, /images/cta/ams-build-with-us-1672.webp 1672w"
      sizes="100vw" width="1672" height="941" loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined} decoding="async" alt="" />
  </div>;
}
