# Vendors overview

Route: /vendors. The supplied hero copy uses PageHero and the same background photograph, padding, typography, 8px 30px pill and corner marks as the other inner pages. Shared PageHero now accepts optional action content without adding client state. Actions point to /vendor-registration and /sign-in.

How It Works uses the existing ProcessStage roadmap component: Register, Review, Approval and Stay Current, with the supplied descriptions. Four columns become two on tablet and one on phones; connectors follow the existing home roadmap rules. Existing viewport reveals are reused.

Before You Start uses a centered 1200px split wrapper. Copy and accepted PDF/JPG/PNG format tags sit beside a framed document checklist. The supplied four required documents and two optional documents use distinct status badges; these are static requirements, not upload controls. Mobile stacks the panel and keeps status labels readable.

The Vendors menu item now links to this page, while Our Landmarks remains unlinked. Footer registration uses the approved next-step slug; vendor enquiries lead to the existing Contact form with a vendor-message prefill. The overview was completed first. Registration has since been implemented at /vendor-registration using the legacy APIs; /sign-in remains the next separate task.

Validation: production build and six automated checks passed. Chromium checks at 1440, 1024, 820, 390 and 320px confirmed hero clearance and button fit, responsive roadmap/checklist columns, accurate document labels/counts, section colors, unique IDs and no overflow/errors. Normal-motion reveals, the unchanged home roadmap, active Vendors navigation and vendor-enquiry prefill passed. Content remains readable with JavaScript disabled. Desktop and mobile screenshots were visually reviewed.
