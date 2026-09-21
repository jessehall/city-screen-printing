# City Screen Print

Static HTML/CSS website hosted by GitHub Pages from `main`, repository root.

## Pages

- `/` → `index.html`
- `/about/` → `about/index.html`
- `/services/` → `services/index.html`
- `/contact/` → `contact/index.html`

Edit these canonical files. The top-level `about.html`, `services.html`, and
`contact.html` are compatibility copies for old links; keep their content in sync
if editing page content. JavaScript redirects these old URLs to the clean ones.

## Page transitions

`bigDrumUtilities.js` is intentionally documented in detail. It installs native
cross-document view-transition styles with a 300 ms crossfade. Load it in each
page's head without async/defer. Change `FADE_DURATION_MS` to adjust the timing.
Reduced-motion users and unsupported browsers get normal navigation. The site
still works with JavaScript disabled; clean URLs use real directories.

Preview: `python3 -m http.server 4173`, then open http://localhost:4173/.
No dependencies or build step are required.
