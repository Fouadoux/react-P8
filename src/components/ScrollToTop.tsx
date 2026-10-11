import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// How long to keep looking for the hash target before giving up: some sections only exist
// once their data has loaded.
const HASH_RETRY_MS = 100;
const HASH_TIMEOUT_MS = 2000;

// React Router keeps the scroll position when the route changes: clicking a project card at the
// bottom of the home page used to open the detail page already scrolled down (or clamped to its
// bottom, since the new page is shorter). Every navigation therefore starts back at the top.
//
// Anchors (/#about) are handled here too: on a full page load the browser tries to scroll to the
// fragment before React has rendered it, so the target is often missed. Waiting for the element
// makes those links deterministic.
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      // 'instant' bypasses the smooth scrolling set on <html>, so the new page never animates in.
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    const targetId = decodeURIComponent(hash.slice(1));
    const scrollNow = () => {
      const element = document.getElementById(targetId);
      // scroll-margin-top on section[id] keeps the sticky header from covering the heading.
      if (element) element.scrollIntoView({ behavior: 'instant' });
      return Boolean(element);
    };

    if (scrollNow()) return;

    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      if (scrollNow()) {
        window.clearInterval(timer);
        return;
      }
      if (Date.now() - startedAt >= HASH_TIMEOUT_MS) {
        window.clearInterval(timer);
        // Never found it: a broken anchor still deserves a page that starts at the top.
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }, HASH_RETRY_MS);

    return () => window.clearInterval(timer);
  }, [pathname, hash]);

  return null;
}
