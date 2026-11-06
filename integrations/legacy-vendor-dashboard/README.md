# Vendor sign-in integration

The public site calls the legacy backend through fixed server-side proxy routes:
- POST /api/vendor/login — email/password, vendor HttpOnly cookie, legacy 401/429 errors.
- POST /api/vendor/forgot — email only, generic confirmation.
- POST /api/vendor/logout — clears the local vendor cookie, matching the legacy stateless logout.
- Successful login redirects to /vendor, matching the old site.

Set AMS_VENDOR_API_ORIGIN to the separately deployed legacy backend. It must not point to this public site's own deployment. No database or auth secrets belong in the browser.

## Dashboard backend addition required
The original dashboard reads Prisma directly and has no JSON read endpoint.
Copy integrations/legacy-vendor-dashboard/route.ts.txt into the OLD repository as
src/app/api/vendor/dashboard/route.ts and deploy that backend.
It reuses currentVendor(), scopes every query to the authenticated vendor, excludes internal events and returns only dashboard fields.
The new /vendor page forwards only the vendor cookie server-side, never caches private data, redirects unauthorized visitors to /sign-in and shows an honest unavailable state until the endpoint is installed.
This update contains the application/document status summary; company editing, document management and account settings from the old portal are not migrated.

Recovery email generation remains with the old backend. Its SITE_URL must point to that backend's functioning /vendor/reset page.

## Validation
npm test
npm run build
Use a mock backend for login/recovery tests. Do not create real accounts or send real reset emails during automated QA.
