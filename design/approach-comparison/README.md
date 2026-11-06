# Render vs reality preview

/home-preview reuses the full HomePage composition with a comparison approach section. The main / page now uses the approved comparison variant too. The original ApproachSection roadmap remains available for other pages. Both read shared construction stage content.

Supplied source assets: actual-image.webp and render-image.webp from the AMS images folder. Optimized 640/1280px WebP variants are lazy-loaded from public/images/comparison.

ImageComparison uses a native range control for keyboard support and pointer capture for mouse/touch dragging, with vertical touch scrolling preserved. It changes one CSS custom property without React state updates, animation loops, dependencies or global listeners. Both images retain the same fixed frame; only the reveal clip and divider move.

## Verification
Production build and 24 existing tests passed. Browser verified at 1440, 1024, 820, 390 and 320px: no overflow, image alignment, mouse dragging, native keyboard Home/End/arrows, real touch dragging and preserved vertical touch scrolling. The main homepage now renders the approved comparison; the original roadmap component remains intact for reuse.
