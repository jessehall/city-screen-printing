/**
 * bigDrumUtilities.js
 * ===================
 * Small, dependency-free enhancements for this static GitHub Pages website.
 *
 * HOW CLEAN URLS WORK
 * -------------------
 * GitHub Pages serves about/index.html when someone visits /about/. Real
 * directories—not history.pushState tricks—make bookmarks, refreshes, search
 * engines, and navigation with JavaScript disabled work reliably.
 *
 * HOW THE CROSSFADE WORKS
 * ----------------------
 * This script installs CSS that opts each page into the browser's native
 * cross-document View Transition API. The browser snapshots the old and new
 * pages and overlaps their opacity animations during ordinary navigation.
 * There is no AJAX router, cloned page, click interception, or extra library.
 * Back/Forward, modifier-clicks, external links, and downloads stay native.
 * Browsers without cross-document transitions simply navigate normally.
 *
 * INSTALLATION
 * ------------
 * Load this file in <head>, WITHOUT async or defer, on every page. The transition
 * rules must exist before the browser first renders the incoming document.
 * Paths to this file are relative to each page, so the site works under the
 * /city-screen-printing/ GitHub Pages prefix or at a custom domain's root.
 */
(() => {
  'use strict';

  // Change this one value to tune the fade. Around 250–350 ms feels subtle
  // without making navigation feel slow. Both snapshots use the same timing.
  const FADE_DURATION_MS = 300;

  // Keep previously shared .html URLs useful. The full legacy HTML pages remain
  // in the repository as a no-JavaScript fallback, but JS visitors go directly
  // to the canonical directory URL. Only known filenames are rewritten.
  const legacyPages = new Set(['about.html', 'services.html', 'contact.html']);
  const destination = new URL(window.location.href);
  const filename = destination.pathname.split('/').pop();

  if (legacyPages.has(filename) || filename === 'index.html') {
    destination.pathname = destination.pathname.replace(
      /[^/]+$/,
      filename === 'index.html' ? '' : `${filename.slice(0, -5)}/`
    );
    // replace() avoids an extra Back-button entry and preserves query/hash.
    window.location.replace(destination.href);
    return;
  }

  // Guard against accidentally including this utility twice in a template.
  if (document.getElementById('big-drum-page-transitions')) return;

  const style = document.createElement('style');
  style.id = 'big-drum-page-transitions';
  style.textContent = `
    /* The browser animates only same-origin document navigations where BOTH
       documents opt in. External sites continue to open normally. */
    @view-transition { navigation: auto; }

    /* Root snapshots cover the entire viewport, including the header/footer.
       Plus-lighter blending avoids a dark dip while the two images overlap. */
    ::view-transition-old(root) {
      animation: big-drum-fade-out ${FADE_DURATION_MS}ms ease-in-out both;
      mix-blend-mode: plus-lighter;
    }
    ::view-transition-new(root) {
      animation: big-drum-fade-in ${FADE_DURATION_MS}ms ease-in-out both;
      mix-blend-mode: plus-lighter;
    }
    @keyframes big-drum-fade-out {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    @keyframes big-drum-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    /* Accessibility: disable the transition altogether when the visitor asks
       for reduced motion. This media query also responds to setting changes. */
    @media (prefers-reduced-motion: reduce) {
      @view-transition { navigation: none; }
      ::view-transition-old(root), ::view-transition-new(root) {
        animation: none;
      }
    }
  `;
  document.head.appendChild(style);
})();
