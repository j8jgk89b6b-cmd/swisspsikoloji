# Swiss Psikoloji

Static HTML website hosted on GitHub Pages at https://swisspsikoloji.com/.

## Structure
- Seven content pages plus a custom 404 page.
- Shared CSS and deferred JavaScript in `assets/`.
- Original WebP branding assets are separate, reusable files.
- Turkish/English home-page language switch; reciprocal hreflang on translated privacy and KVKK pages.
- Contact form posts to the existing FormSubmit email endpoint. Do not send real test submissions without permission.
- Domain and Google verification files must be retained.

## Validate
Run `node scripts/check-site.mjs` with Node.js 22 or later before publishing.
Also check desktop and narrow screens, all three navigation menus, keyboard Escape,
Turkish/English switching, form validation without submission, and the 404 page.

## Deployment
GitHub Pages publishes the configured main branch. No framework or build dependencies are required.
`.nojekyll` serves the static assets directly. A full source update should be one atomic commit.
Keep sitemap lastmod dates aligned with meaningful page changes.

## Hosting boundaries
DNS, TLS certificate issuance and HTTP cache/security headers are managed by the hosting provider.
Do not add ineffective server-config files to a GitHub Pages repository.
Search Console indexing requests and search ranking are separate from source publication.
