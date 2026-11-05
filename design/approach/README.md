# AMS approach section

The current design is an image-free four-stage roadmap on a plain dark background. A centered introduction sits above Plan, Engineer, Build and Handover. Numbered nodes and thin connecting rules show the order without enclosing the content in cards.

## Implementation

ApproachSection and the reusable ProcessStage component are server-rendered. Four columns become two at 1000px, then a single vertical flow at 600px. The section has no sticky area, horizontal scrolling, accordion or extra animation library.

The shared EntranceMotion component provides one-shot staggered reveals. This compact end-of-page section uses an explicitly selected full-viewport observer so lower tablet steps cannot remain hidden behind the usual inset reveal threshold. Other sections retain their existing timing. Reduced-motion and JavaScript-disabled views expose all text.

## Verification

Production build and six automated tests passed. Chromium checks at 1440x900, 1024x768, 820x1180, 390x844 and 320x600 confirmed 4/4/2/1/1 columns, correct stage order, successful reveals for every stage, DM Sans and weight-800 headings, zero section image elements or background-image requests, no horizontal overflow and no page errors. Reduced-motion and JavaScript-disabled views were checked.

## Archived background assets

The prior architectural assets remain available for future use but are no longer referenced by this section.

## Final prompt

Use case: photorealistic architectural background for a premium construction company's immersive scroll-zoom website section. A wide cinematic architectural photograph of a monumental contemporary concrete and brushed dark steel atrium in Dubai at dusk, repeating rectangular structural portals receding into a central vanishing point, an elegant glass tower at the far end, polished stone reflections, restrained warm amber lighting, charcoal shadows and silver highlights. Perfectly centered eye-level tilt-shift photography, straight verticals, detailed materials, dark areas for overlaid white type. No people, machinery, text, logo, watermark or neon wireframes.

## Background image assets

- public/images/ams-approach-atrium-720.webp — 38,538 bytes
- public/images/ams-approach-atrium-1280.webp — 103,216 bytes
- public/images/ams-approach-atrium-1920.webp — 171,796 bytes

The source image remains at C:/Users/sumith/.codex/generated_images/01a1a1b6-d9a8-7233-85d3-49cbd29a2e49/exec-96547af1-7d2c-4172-addf-47288062d49e.png.
