# Sign-in presentation

Two-column section below the shared hero: warm architectural story/testimonial at left, existing login form at right. Below 900px, the login form comes first. One testimonial is clearly labelled as sample/illustrative feedback. Auth behavior is unchanged.

## Image
Generated with the built-in image_gen tool. Original archived here; optimized 480px and 960px WebP variants are in public/images/vendor. Static server-rendered image and content; no animation library or image parallax.

## Generation prompt
Use case: photorealistic-natural. Create one photoreal architectural editorial photograph for a premium Dubai construction company's vendor sign-in panel. Portrait 4:5 composition. A refined contemporary low-rise villa entrance, warm orange amber interior light glowing through floor-to-ceiling glass, honey toned timber soffit and wall cladding, pale natural travertine, mature green trees and textured tropical foliage framing edges, an inviting path and a small garden, photographed at blue hour just after sunset. Realistic architectural photography, restrained exposure, imperfect natural leaves, realistic glass reflections and material grain, believable straight structural geometry and buildable architectural details, natural shadows, subtle film grain. Warm orange effect comes from practical interior lighting, not an orange filter. Keep lower third slightly quieter and dark enough for a text overlay added separately in HTML. Fill the frame with architecture and garden, no sky dominance. Absolutely no people, no text, no logos, no quotation card, no UI. Avoid CGI/3D render gloss, neon, science fiction, over-symmetry, oversaturated orange, exaggerated bloom, plastic surfaces and invented impossible geometry.

## Verification
Production build passed. Browser checked at 1440, 1024, 820, 390 and 320px: desktop column alignment, mobile order, no horizontal overflow, image loading, one sample quote, login error handling and recovery/register links. No live credentials or vendor submissions used.

No real vendor testimonial or completed project is implied.

## Shared wrapper refinement
Both columns now sit flush inside a single rounded, bordered wrapper. Inner panels have no independent border, radius or shadow; a subtle divider separates them. Mobile retains the same shared container with the form above the image.

## Inline recovery
Forgot password switches the existing right-hand panel to email recovery without leaving the page. Back to sign in restores the login panel. The direct /forgot-password URL also uses the same two-column wrapper.
