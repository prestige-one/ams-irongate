<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## AMS visual preferences
- Use modest heading sizes. Current approved direction: hero 64px desktop / 40px mobile, section headings 26-36px. Do not return to oversized display text without an explicit request.
- Use DM Sans for every heading, body text, number and UI control (latest user preference).
- Use the supplied AMS logo asset, not a recreated text logo. On dark backgrounds use the existing white CSS treatment.
- White buttons with dark text. The latest approved About direction is a dark architectural split layout with the supplied charcoal-architecture image on the left, silver accents and company figures.
- Preserve the current footer unless the user asks to change it.

- Use the black and silver palette; no blue/cyan neon UI or shader tint. Hero uses monochrome-building with full-width original-aspect framing on desktop.

- Keep the hero building geometry fixed: lighting animation only, no mouse parallax or UV displacement. Keep hero copy legible over bright linework. About figures are 55px with 14px labels; EXPLORE MORE uses the shared primary button style.

- All headings use DM Sans at weight 800. All button labels are uppercase.

## Latest page preferences
- All h1–h6 headings are uppercase. Body text keeps normal casing.
- Kicker labels: #f6a137 and 12px. About figures: weight 700. Shared button arrows are thick rounded chevrons.
- Alternate solid #000 and #0d0f10 section backgrounds from About onward. Use shared responsive section-rhythm.css padding.
- Footer: black, with a static large silver-gradient AMS IRONGATE background watermark inside the footer. Position it lower (96px from the footer top on desktop, 80px on mobile) at 12% opacity. Keep the prominent white back-to-top button fixed at the viewport bottom-right.

- The CTA contains its background photo and action content only. FooterBrandBand belongs inside SiteFooter, behind the content, and has no separate image or animation.

- Main homepage h1/h2 titles use the shared TitleFrame component for four thin silver corner brackets. Keep cards, kicker labels, dialog headings and footer headings unframed. Copyright is centered; contact spacing follows the adjacent footer link row rhythm.

## About Us page
- /about uses the supplied centered hero copy over the same building photo as the homepage CTA. Our Story uses the supplied narrative without an invented founding year. Reuse ArchitecturalSplit with text left/image right, then shared AnimatedFigures. Mobile stacks story before image. Keep shared SiteHeader and SiteFooter; local Home/About links must work across both pages.

## Services page and connected navigation
- /services shares PageHero with /about. Keep its supplied centered hero copy, compact black six-service image rows, then shared Areas of Expertise and CTA before the footer. Use local Home/About/Services links throughout; footer services target actual catalog row IDs.
- Mission/Vision heading exception: 18px !important with .1em letter spacing. Statements use 20px, weight 400, line-height 1.4 and the supplied black-gradient card background on desktop and mobile.

## Contact page
- /contact uses the shared hero and the supplied contact-details/form layout. Keep the office/phone/hours placeholders as supplied. The form is explicitly demo-only: display a confirmation with a 24-hour response message; never send or store the entered data. Header enquiry actions and all consultation/profile CTAs use this page.

- Our Landmarks remains plain text in the menu and footer. Vendors now links to /vendors; its registration action uses /vendor-registration and its sign-in action uses /sign-in.
- TitleFrame desktop inset is -10px -30px; retain the compact mobile frame spacing to prevent overflow.

- Brand spelling is AMS Irongate (IRONGATE as one word), including copyright, copy, headings, metadata and accessible labels. Footer Contact uses more separation above (24px desktop column gap) and an 8px gap below its title.

## Vendors overview
- /vendors contains the shared hero, four-step approval roadmap using ProcessStage, then the document preparation checklist. Use supplied copy verbatim, the existing black/charcoal theme, modest DM Sans headings and shared corner/pill styling.
- The overview is complete. /vendor-registration now has the real five-step wizard connected to the legacy APIs. /sign-in remains the next separate page. Do not fake registration success; use mocked/local backends for automated tests instead of creating live applications.

## Registration and About refinements
- The registration wizard uses the recovered legacy field/API contract. Keep AMS_VENDOR_API_ORIGIN on a separately deployed legacy backend; a self-targeting origin is rejected. Contact remains demo-only, while registration performs real API writes when a visitor submits.
- Required asterisks on registration are red; checkbox inputs and labels use pointer cursors. About story copy has no bottom rule. Figures have matching space above and below: 80px desktop, 64px tablet and 56px mobile.

## Vendor sign in
- /sign-in and /forgot-password use shared PageHero and a reusable black vendor auth card. Login preserves the old API contract, secure vendor cookie and /vendor redirect.
- The dashboard summary needs the authenticated JSON bridge supplied in integrations/legacy-vendor-dashboard installed on the separately deployed legacy backend. Do not invent vendor status or expose staff/internal data.
