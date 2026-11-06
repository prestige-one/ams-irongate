# Vendor registration

Route: /vendor-registration. The shared hero uses the supplied Join Our Vendor Network copy and existing architectural background, DM Sans, corner marks, pill and spacing. The native five-step wizard covers Company, Trades, Contact, Documents and Review. Fields and option values were checked against https://github.com/intruderfr/ams-irongate at revision 7d23c53c27975a0a78d5ecc755974507502563bd.

## Legacy API integration

The old application owns the database, vendor authentication, private document storage and notifications. The new public website uses fixed same-origin POST routes:

- /api/vendor/register forwards the recovered JSON registration contract.
- /api/vendor/documents forwards one multipart document at a time with file, docType and expiryDate.

AMS_VENDOR_API_ORIGIN defaults to https://ams-irongate.vercel.app. Keep that backend deployed separately. When deploying this public site, set the variable to the actual legacy backend origin; it must not be the public site's own host. A recursion guard returns 503 for a self-targeting configuration. No database, signing or SMTP credentials were copied into the frontend. See .env.example.

Only the ams_vendor cookie is forwarded upstream. Registration preserves a host-scoped HttpOnly, SameSite=Lax session cookie; production cookies are Secure. Origin checks use the browser-facing Host because Next may expose an internal localhost request URL. Requests are restricted to the two fixed endpoints and bounded in size. Documents are checked by file signature, allowed extension, size and real expiry date before forwarding. Backend error codes remain visible to the UI without exposing credentials or logging payloads.

## Wizard behavior

Entries survive Back and completed-step navigation. Trade selections are capped at 12. Passwords need at least 10 characters, a confirmation match and a maximum bcrypt-safe byte length. Review allows editing each section, excludes passwords and requires the authorisation declaration. Only the trade licence is required for initial registration; the approval documents may follow later, matching the source API flow.

Files remain native File references without base64 conversion or browser storage. Only eight header bytes are read for client file checks. Uploads run sequentially, and a successfully uploaded File reference is released. A synchronous submission lock prevents duplicate requests. If some uploads fail after account creation, Retry Failed Uploads sends only the remaining files and never creates the account again. Success appears only after confirmed API responses. There is no demo/fake success in this wizard. Contact form behavior remains independently demo-only.

The sign-in link uses the approved /sign-in slug; that page remains the next separate task. Registration stays on its received-application confirmation after submission instead of navigating to an unbuilt portal.

## Validation

Production build and 19 automated tests passed. Browser flows at 1440, 1024, 820, 390 and 320px checked all steps, required validation, maximum trade selection, password mismatch/show-hide, file types/size, dates, editable review, retained values and declaration. API responses were intercepted for success, duplicate accounts, offline errors, upload failures and retries. No passwords/documents are stored in localStorage or sessionStorage. No-JavaScript controls remain disabled to prevent accidental native submission.

A separate local HTTP backend and isolated Next server verified the real route handlers, JSON forwarding, HttpOnly cookie handling, six multipart uploads and upload-only retry. No live application was submitted. The legacy endpoint reachability was checked using GET requests only (405 responses).

Required-field asterisks are red, including document and expiry marks. Checkbox inputs and their declaration/selection labels have pointer cursors. Desktop and mobile screenshots were inspected.
