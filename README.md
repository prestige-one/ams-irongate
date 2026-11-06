# AMS Irongate Contracting

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

- Compact 1080px desktop header with centered navigation and a link to Contact Us.
- Immediately visible responsive hero image with subtle WebGL lighting animation. Building geometry stays fixed; there is no mouse parallax.
- About section with a rounded architectural image and animated company figures.
- Four illustrative service cards with sequential orange border drawing, a moving glint, and subtle image zoom on hover.
- Services links open the full image-based Services page.
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

Contact details remain supplied placeholders. The Contact form is demo-only and displays a local 24-hour confirmation. Vendor registration uses the legacy backend through fixed server API routes. Search indexing is disabled in `src/app/layout.tsx`. Configure real business contact details and review indexing before a public launch.

Service imagery illustrates capabilities; it is not presented as a completed-project portfolio.

## Vendor registration backend

The five-step form lives at /vendor-registration. It reuses the existing registration and authenticated document-upload APIs from the legacy application. Keep that application (database, private files and sessions) deployed separately. Configure AMS_VENDOR_API_ORIGIN using .env.example when deploying; it must not point back to this public website. The verified default is https://ams-irongate.vercel.app. No database or signing secrets are needed by this frontend.

Submission creates a real vendor account and uploads documents. Automated browser tests use intercepted responses or an isolated local backend; no live applications were created. Build and 19 automated tests pass. Integration details and verification are in design/vendor-registration/README.md. The /sign-in and /forgot-password pages now use the legacy authentication endpoints. Successful sign-in redirects to /vendor. See integrations/legacy-vendor-dashboard/README.md for the small backend addition required to serve real dashboard data.
