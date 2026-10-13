/**
 * Source attribution for the social → landing → App Store funnel.
 *
 * The profile bio link points at /go/?src=<slug>. /go fires the Umami event
 * `social-landing` (property `src`) *before* redirecting to the app homepage
 * with the `src` param preserved. Any page opened with a valid `?src=` then
 * fires `social-landing-home` (properties `src`, `path`) and tags its click
 * events with `src`, so App Store taps can be grouped by source.
 *
 * Plain .mjs on purpose: the logic is pure and Node-readable so it can be
 * unit-tested without a TypeScript step (see blogCta.mjs precedent). Astro
 * processed <script> tags import from it, so it is bundled once.
 *
 * `src` lives in the URL only — no cookies, no localStorage, no sessionStorage.
 */

/** Query param that carries the source slug. */
export const SOURCE_PARAM = "src";

/** Production origin, used to validate the `to` target and build /go URLs. */
export const SITE_ORIGIN = "https://travel-stories.12f.dk";

/**
 * Known sources, documentation only. Any slug that passes normalizeSource is
 * accepted and recorded, so a new source needs no code change.
 */
export const KNOWN_SOURCES = [
  "instagram",
  "facebook",
  "tiktok",
  "x",
  "threads",
  "youtube",
  "pinterest",
];

/** Lowercase start, then alphanumerics, `_`, `-`. Max 40 chars. */
export const SOURCE_PATTERN = /^[a-z0-9][a-z0-9_-]{0,39}$/;

/**
 * @param {unknown} raw
 * @returns {string | null} normalized slug, or null when invalid.
 */
export function normalizeSource(raw) {
  if (typeof raw !== "string") return null;
  const s = raw.trim().toLowerCase();
  return SOURCE_PATTERN.test(s) ? s : null;
}

/**
 * Validate a `to` target: must be a same-origin internal path. Anything else
 * (external host, protocol-relative, javascript:, protocol, /go loop) becomes
 * the homepage "/".
 *
 * @param {unknown} raw
 * @returns {string} a safe internal path, "/?" and "/#" included.
 */
export function safeTarget(raw) {
  if (
    typeof raw !== "string" ||
    !raw.startsWith("/") ||
    raw.startsWith("//") ||
    raw.startsWith("/\\") ||
    raw.includes("\\") ||
    /[\s\u0000-\u001f]/.test(raw)
  ) {
    return "/";
  }
  let url;
  try {
    url = new URL(raw, SITE_ORIGIN);
  } catch {
    return "/";
  }
  if (url.origin !== SITE_ORIGIN) return "/";
  const p = url.pathname;
  if (p === "/go" || p.startsWith("/go/")) return "/"; // no redirect loops
  return url.pathname + url.search + url.hash;
}

/**
 * Resolve the /go destination from a search string.
 *
 * @param {string} search e.g. "?src=instagram&to=/da/"
 * @returns {{ src: (string | null), path: string }}
 */
export function buildDestination(search) {
  const params = new URLSearchParams(search);
  const src = normalizeSource(params.get(SOURCE_PARAM));
  const url = new URL(safeTarget(params.get("to")), SITE_ORIGIN);
  if (src) url.searchParams.set(SOURCE_PARAM, src);
  return { src, path: url.pathname + url.search + url.hash };
}

/**
 * Build the public source-attributed URL to put in a profile bio link.
 *
 * @param {string} src
 * @param {string} [to] optional internal landing path (must be safe)
 * @returns {string}
 */
export function goUrl(src, to) {
  if (normalizeSource(src) !== src) {
    throw new Error(`Invalid source slug: ${JSON.stringify(src)}`);
  }
  let url = `${SITE_ORIGIN}/go/?src=${encodeURIComponent(src)}`;
  if (to !== undefined) {
    if (safeTarget(to) === to) url += `&to=${encodeURIComponent(to)}`;
  }
  return url;
}

/**
 * Drive the /go hop: load the tracker, fire `social-landing`, then redirect
 * exactly once — never before the event unless the timeout hits first.
 *
 * @param {{
 *   search: string,
 *   loadTracker: () => Promise<((n: string, d: object) => any) | null>,
 *   redirect: (path: string) => void,
 *   timeoutMs?: number,
 *   setTimer?: (fn: () => void, ms: number) => any,
 * }} opts
 * @returns {{ src: (string | null), path: string }}
 */
export function runGo({
  search,
  loadTracker,
  redirect,
  timeoutMs = 1500,
  setTimer = setTimeout,
}) {
  const dest = buildDestination(search);
  let done = false;
  const finish = () => {
    if (!done) {
      done = true;
      redirect(dest.path);
    }
  };
  setTimer(finish, timeoutMs);
  Promise.resolve()
    .then(() => loadTracker())
    .then((track) =>
      track ? track("social-landing", { src: dest.src ?? "none" }) : undefined
    )
    .then(finish, finish);
  return dest;
}

/**
 * Tag the nearest [data-umami-event] element with the source slug on click.
 *
 * Registered on `window` in the capture phase so it runs before Umami's
 * document-level click listener, whatever the script load order (Umami is
 * injected async). Tagging at click time also covers elements rendered later
 * (sticky bar, mobile menu, banners).
 *
 * @param {EventTarget & { addEventListener: (t: string, fn: (e: any) => void, capture: boolean) => void }} target
 * @param {string} src
 */
export function attachSourceToClicks(target, src) {
  target.addEventListener(
    "click",
    (e) => {
      const t = e && e.target;
      const el =
        t && typeof t.closest === "function"
          ? t.closest("[data-umami-event]")
          : null;
      if (el && !el.hasAttribute("data-umami-event-src")) {
        el.setAttribute("data-umami-event-src", src);
      }
    },
    true
  );
}

/**
 * Poll until window.umami is ready, then resolve with a track wrapper.
 *
 * @param {any} win
 * @param {number} [timeoutMs]
 * @param {number} [intervalMs]
 * @returns {Promise<((name: string, data: object) => any) | null>}
 */
export function waitForUmami(win, timeoutMs = 5000, intervalMs = 100) {
  return new Promise((resolve) => {
    const ok = () =>
      win && win.umami && typeof win.umami.track === "function";
    if (ok()) {
      resolve((name, data) => win.umami.track(name, data));
      return;
    }
    const id = setInterval(() => {
      if (ok()) {
        clearInterval(id);
        resolve((name, data) => win.umami.track(name, data));
      }
    }, intervalMs);
    setTimeout(() => {
      clearInterval(id);
      if (ok()) {
        resolve((name, data) => win.umami.track(name, data));
      } else {
        resolve(null);
      }
    }, timeoutMs);
  });
}
