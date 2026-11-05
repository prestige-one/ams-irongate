# Services page

Route: /services. PageHero is shared with About Us and retains the responsive CTA building photograph, centered DM Sans heading, orange emphasized line, corner marks, viewport reveals and shared navigation/enquiry dialog. Supplied hero text reads From concept / to completion.

After the hero, ServicesCatalog renders six ServiceRow entries using the supplied detailed copy. The desktop row layout is number / image / copy, with subtle horizontal separators on black. Mobile stacks each image above its numbered copy. Row padding is 24px. The centered catalog wrapper is capped at 1200px, with equal section padding of 80px desktop / 64px tablet / 56px mobile. The rule before General Contracting is removed. No inert arrows are rendered. Images zoom slightly on hover.

Image sources: foundations.webp for General Contracting, actual-image.webp for Design & Build, about-our-story.webp for Structural & Civil Works, mechanical-plantroom-with-ducts-and-pipes.webp for MEP, warm-timber-and-stone-corner.webp for Interior Fit-Out, and expertise--master-communities.webp for Project Management. Each has optimized 320px and native-limited larger WebP versions, lazy-loaded with accurate dimensions and responsive sizes.

Shared ExpertiseSection follows the catalog, then CtaSection directly before SiteFooter. Section spacing is tightened on Services only. The original Expertise imagery and CSS expansion/swipe behavior are reused.

Header Home, About and Services links use local routes on all three pages. Home Explore More links to /about; Explore our services and All services link to /services; Discover our approach links to /about#ams-values. Footer service links target actual catalog rows. Home process/FAQ and current-page CTA/top anchors resolve to existing sections. Enquiry, consultation and profile actions retain the shared contact dialogs.

Mission/Vision styles: 18px headings with .1em tracking; 20px statements at weight 400 and line-height 1.4; requested black gradient background, including mobile.

Validation: production build and six automated checks passed. Chromium checks at 1440, 1024, 820, 390 and 320px confirmed centered clear hero text, all six images loading, black catalog, compact row stacking, correct section order, local navigation/service anchors, unique IDs and no page overflow/errors. Header and both CTA dialogs work. Normal-motion row reveals and Expertise expansion/swipe were tested; page content remains visible without JavaScript. Exact Mission/Vision styles passed at desktop and mobile sizes.

Latest spacing: Services hero uses the shared About hero sizing/padding without overrides. Areas of Expertise has equal 80/64/56px top and bottom spacing, matching the service catalog. CTA retains its compact spacing.
