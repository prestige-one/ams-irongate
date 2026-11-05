# Contact Us page

Route: /contact. The shared PageHero has the same building photograph, padding, heading treatment and 8px 30px pill as About and Services. The section below uses the supplied two-column reference: contact details on the left and a dark Start a Project form on the right, within a centered 1200px wrapper. Tablet stacks the panels; phone fields become one column.

Contact placeholders match the supplied reference and are stored in src/lib/contact-details.ts for reuse in the footer. Full name, company, email, phone, project type and message have associated labels and autocomplete where applicable. Required text rejects whitespace-only input. Names/emails/messages have length limits.

The user explicitly requested demo-only submission. The form prevents native submission and only displays the requested local confirmation: an agent will contact the visitor within 24 hours. No request, email, browser storage or backend write occurs. Controls are disabled until JavaScript hydrates, preventing an accidental native GET fallback; a no-script explanation is provided. Confirmation has a live status and receives focus. Editing clears the confirmation and re-enables submission.

Shared header enquiry links, the homepage hero action, consultation/profile CTAs and footer Contact Us links point to /contact. Company-profile enquiries prefill the message and choose Other. These are ordinary server-rendered links, and the shared heroes/CTA action block no longer need contact dialog state. The navigation menu retains its original five items.

Build and six automated tests passed. Chromium checks at 1440, 1024, 820, 390 and 320px verified the supplied details, centered hero, panel/field responsive columns, labels, unique IDs, existing hash destinations, no overflow, validation and local-only confirmation. Network/storage checks confirmed no sending or persistence. Cross-page enquiry links and hydrated profile prefill passed.
