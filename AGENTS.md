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
- Footer: black, with a static large silver-gradient AMS IRON GATE background watermark inside the footer. Position it lower (96px from the footer top on desktop, 80px on mobile) at 12% opacity. Keep the prominent white back-to-top button fixed at the viewport bottom-right.

- The CTA contains its background photo and action content only. FooterBrandBand belongs inside SiteFooter, behind the content, and has no separate image or animation.

- Main homepage h1/h2 titles use the shared TitleFrame component for four thin silver corner brackets. Keep cards, kicker labels, dialog headings and footer headings unframed. Copyright is centered; contact spacing follows the adjacent footer link row rhythm.

## About Us page
- /about uses the supplied centered hero copy over the same building photo as the homepage CTA. Our Story uses the supplied narrative without an invented founding year. Reuse ArchitecturalSplit with text left/image right, then shared AnimatedFigures. Mobile stacks story before image. Keep shared SiteHeader and SiteFooter; local Home/About links must work across both pages.

## Services page and connected navigation
- /services shares PageHero with /about. Keep its supplied centered hero copy, compact black six-service image rows, then shared Areas of Expertise and CTA before the footer. Use local Home/About/Services links throughout; footer services target actual catalog row IDs.
- Mission/Vision heading exception: 18px !important with .1em letter spacing. Statements use 20px, weight 400, line-height 1.4 and the supplied black-gradient card background on desktop and mobile.

## Contact page
- /contact uses the shared hero and the supplied contact-details/form layout. Keep the office/phone/hours placeholders as supplied. The form is explicitly demo-only: display a confirmation with a 24-hour response message; never send or store the entered data. Header enquiry actions and all consultation/profile CTAs use this page.
