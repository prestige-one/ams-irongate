# Areas of Expertise

ExpertiseSection follows the supplied five-panel reference, with a centered heading and the exact sector descriptions. It sits after OUR APPROACH and before the unchanged footer.

## Image mapping

| Panel | Supplied image |
| --- | --- |
| Branded Residences | expertise--branded-residential.webp |
| Master Communities | expertise--master-communities.webp |
| Residential | expertise--residential.webp |
| Commercial | expertise--commercial.webp |
| Mixed-Use | expertise--mixed-use.webp |

Responsive 480px and 800px WebP versions live in public/images/expertise. The images load lazily and retain the supplied composition. The files are user-provided illustrative imagery.

## Interaction

The reusable ExpertisePanel component renders a focusable list item with a heading and description. CSS flex growth expands each panel on desktop hover or keyboard focus, with a small image zoom and warm border highlight. There are no arrows, links, extra animation libraries or per-frame JavaScript updates.

At 1000px and below, the row uses native horizontal scrolling with scroll snap. Panels are 44% of the row on tablets and 86% on phones. A swipe hint is visible. Reduced motion removes animated transitions.

## Verification

Production build and six automated tests passed. Chromium checks verified exact image-to-panel mapping and loaded images, centered heading, every panel expanding by approximately 49%, keyboard expansion, final-panel reachability, unclipped text, no arrows or links, no horizontal page overflow and no page errors at 1440x900, 1024x768, 820x1180, 390x844 and 320x600. Reduced-motion and JavaScript-disabled views retained access to all five panels.
