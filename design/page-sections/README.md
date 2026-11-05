# Final page sections and UI

The page uses DM Sans throughout. Headings are uppercase at weight 800; body text retains normal casing. Kicker labels are #f6a137 at 12px. About figures use weight 700 and remain 55px.

## Palette and spacing

Starting at About, content sections alternate black (#000) and charcoal (#0d0f10): About / Capabilities / Difference / Services / Approach / Expertise / FAQ / CTA. The CTA overlays its charcoal base with the supplied render-image.webp, optimized into responsive 720/1280/1672px WebPs. The footer is black.

Shared section padding is 80px on desktop, 64px at 1100px and below, and 56px at 760px and below. Horizontal page wrappers remain intact. Navigation links turn black on white when hovered; the About CTA reads EXPLORE MORE.

## FAQ

Four questions match the reference and all four answers match the supplied text. FaqItem uses native exclusive details elements, so it works without JavaScript and with keyboard input. CSS ::details-content plus scoped interpolate-size supplies smooth opening and closing in supporting browsers; other browsers retain a functional native disclosure. Reduced motion removes the transition. Shared entrance effects reveal the section when visited.

## CTA

The CTA uses a white shared primary button and a transparent white-outline secondary button. Both open the shared SiteOverlay with consultation/profile-specific copy. Dialog headings have unique AMS-prefixed IDs. Sample contact details remain in place; no message is automatically sent.

## Footer

The black footer uses the original AMS logo, company/services/vendors/contact columns, and a large static silver-gradient AMS IRON GATE background watermark inside its markup. FooterBrandBand is absolutely positioned behind the content at 12% opacity, 96px below the footer top (80px on mobile). There is no wordmark animation, separate image or duplicate text.

The prominent white back-to-top circle remains fixed at the bottom-right: 52px desktop / 48px mobile. It uses the requested thick rounded chevron, rotated upward. All shared button arrows use the same new chevron. Footer service links target real service rows from shared src/lib/services.ts data.

## Verification

Production build and six automated tests passed. Chromium checks covered 1440x900, 1024x768, 820x1180, 390x844 and 320x600: exact section palette/padding, uppercase headings without clipping, 700-weight figures, 12px orange kickers, menu hover colors, EXPLORE MORE, native FAQ interaction and exact answer copy, smoothly interpolated FAQ height, both CTA dialogs, unique IDs, actual service anchor navigation and no page overflow/errors. The final static silver wordmark and fixed top button were checked at four sizes. Native FAQ behavior was checked with JavaScript disabled and reduced motion.

Latest footer checks at 1440x900, 820x1180, 390x844 and 320x600 confirmed that the watermark is inside the black footer, absent from the CTA, static at 12% opacity, offset by 96px/80px, and fits without page overflow. Visual screenshots confirmed readable foreground content. The fixed back-to-top button remains visible and works at both the footer and page top. Production build and all six automated tests passed.

## Heading corners and footer alignment

Nine primary homepage titles share TitleFrame: four fine silver architectural corner brackets rendered with a CSS pseudo-element and gradients, with smaller marks on mobile. Existing heading text, sizes and entrance effects remain intact. Dialog and card titles are excluded. Footer copyright is centered, and Contact uses a reduced heading gap and matching link-row line height. Production build and six tests passed. Browser checks at 1440, 1024, 820, 390 and 320px confirmed heading text/corners fit, no page overflow, centered copyright without back-to-top overlap, and aligned desktop contact rows.
