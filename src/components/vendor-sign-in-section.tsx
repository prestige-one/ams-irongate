import { VendorAuthForm } from './vendor-auth-form';

/** Static presentation stays server-rendered; only the existing form hydrates. */
export function VendorSignInSection({ recovery = false }: { recovery?: boolean }) {
  return <section className="ams-signin-section" aria-label="Vendor access">
    <div className="ams-signin-grid">
      <aside className="ams-signin-story" aria-labelledby="ams-signin-story-title">
        <img className="ams-signin-image" src="/images/vendor/ams-vendor-warm-entry-960.webp"
          srcSet="/images/vendor/ams-vendor-warm-entry-480.webp 480w, /images/vendor/ams-vendor-warm-entry-960.webp 960w"
          sizes="(max-width: 900px) 90vw, (max-width: 1240px) 48vw, 568px"
          width="960" height="1200" loading="lazy" decoding="async"
          alt="Stone and timber villa entrance surrounded by greenery, illuminated with warm amber light" />
        <div className="ams-signin-story-shade" aria-hidden="true" />
        <div className="ams-signin-story-intro">
          <p className="ams-signin-eyebrow">A SHARED STANDARD</p>
          <h2 id="ams-signin-story-title">Great partnerships.<br />Lasting foundations.</h2>
          <p>Connect with AMS Irongate and take the next step in building together.</p>
        </div>
        <figure className="ams-signin-testimonial">
          <div className="ams-signin-testimonial-top"><span className="ams-signin-quote-mark" aria-hidden="true">“</span><span>Sample testimonial</span></div>
          <blockquote>“A clear registration process and one place to keep our company information and documents up to date.”</blockquote>
          <figcaption><span className="ams-signin-avatar" aria-hidden="true">VP</span><span><strong>Vendor partner</strong><span>Illustrative feedback</span></span></figcaption>
        </figure>
      </aside>
      <div className="ams-signin-login-panel"><VendorAuthForm recovery={recovery} /></div>
    </div>
  </section>;
}
