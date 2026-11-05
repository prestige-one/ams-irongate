# AMS Iron Gate Contracting

A responsive Next.js construction website with a black and silver architectural design, self-hosted DM Sans variable fonts, and the supplied AMS logo.

## Run locally

Requirements: Node.js 20.9 or newer and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3200/ . For a production preview, run `npm run build` followed by `npm start`. Stop any existing server on port 3200 first.

## Checks

```sh
npm run build
npm test
```

The production build includes TypeScript validation. Automated checks cover hero asset budgets and in-page navigation destinations.

## Website features

- Compact 900px desktop header with centered navigation and an enquiry dialog.
- Immediately visible responsive hero image with subtle WebGL lighting animation. Building geometry stays fixed; there is no mouse parallax.
- About section with a rounded architectural image and animated company figures.
- Four illustrative service cards with sequential orange border drawing, a moving glint, and subtle image zoom on hover.
- Centered services button opens an accessible overview dialog.
- Responsive layouts and reduced-motion support.

## Performance

The hero uses one texture, one draw call and two triangles. Its renderer caps device pixel ratio and frame rate and pauses when offscreen or hidden. A static image remains available if WebGL fails. Service images load lazily; their border effects use CSS and SVG, with no animation library.

## Project structure

- `src/components/`: reusable hero, About, service cards, counters, branding and dialogs.
- `src/lib/holographic-renderer.ts`: lightweight hero renderer.
- `src/app/globals.css`: responsive styles, using the `ams-` prefix.
- `public/`: local fonts and image assets.
- `design/capabilities/`: original illustrative asset archive.
- `tests/`: automated checks.

## Preview status

Contact information is explicitly labelled as sample data. There is no form submission backend. Search indexing is disabled in `src/app/layout.tsx`. Configure real business contact details and review indexing before a public launch.

Service imagery illustrates capabilities; it is not presented as a completed-project portfolio.
