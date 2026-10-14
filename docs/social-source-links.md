# Social source links — Travel Stories

## Purpose

The Instagram / Facebook profile bio link is the only clickable path from a
social profile to this site, and in-app browsers send no referrer — so Umami
records that traffic as "direct" and we cannot tell it apart from other
direct visits. These links route through a small source-attribution hop so the
**profile → landing page → App Store** funnel is countable per source.

## The rule

Always use the **trailing-slash** form:

    https://travel-stories.12f.dk/go/?src=<slug>

- The trailing slash avoids GitHub Pages' extra 301 from `/go` to `/go/`.
- `<slug>` is lowercase `a-z0-9_-`, at most 40 characters. Anything else is
  recorded as `src: none` and the visitor lands without a source tag.
- Optional `&to=` lands on a specific page or **straight at the App Store**:
  it accepts a same-origin path starting with `/`, or an App Store URL on
  exactly `https://apps.apple.com` / `https://itunes.apple.com`. Anything
  else falls back to `/` (with `?src=` kept). This exact-origin whitelist
  means `/go` can never become an open redirect.

## Source URLs to use in profile bios

| Source   | Bio / link URL                                            | Lands on          |
|----------|-----------------------------------------------------------|-------------------|
| Instagram| `https://travel-stories.12f.dk/go/?src=instagram`        | `/?src=instagram` |
| Facebook | `https://travel-stories.12f.dk/go/?src=facebook`         | `/?src=facebook`  |
| TikTok   | `https://travel-stories.12f.dk/go/?src=tiktok`           | `/?src=tiktok`    |
| X        | `https://travel-stories.12f.dk/go/?src=x`                | `/?src=x`         |
| Threads  | `https://travel-stories.12f.dk/go/?src=threads`         | `/?src=threads`   |

Examples:

- Danish homepage: `https://travel-stories.12f.dk/go/?src=instagram&to=/da/`
- A specific blog post (e.g. a story post):
  `https://travel-stories.12f.dk/go/?src=instagram-story&to=/blog/<slug>/`

The hop is a few hundred milliseconds; it never blocks the redirect for more
than 1.5 s even if the tracker fails to load.

## Events

| Event                 | Properties     | Where it fires                          |
|-----------------------|----------------|-----------------------------------------|
| `social-landing`      | `src`          | the `/go` hop (one per profile tap)     |
| `social-landing-home` | `src`, `path`  | any page opened with a valid `?src=`    |
| every existing click  | gains `src`    | e.g. `appstore-click`, `hero-app-store-click`, `navbar-cta-click`, `footer-banner-app-store-click`, `sticky-download-click` |

No cookies, no `localStorage`/`sessionStorage`, no new third parties — Umami
is the only tracker.

## Reading the funnel in Umami

1. **Profile taps:** Events → `social-landing`, grouped by property `src`.
2. **Landing-page landings from social:** Events →
   `social-landing-home`, grouped by `src` (and by `path` to split
   homepage vs blog landings).
3. **App Store taps from social:** the App Store click events
   (`appstore-click`, `hero-app-store-click`, `navbar-cta-click`,
   `sticky-download-click`, `footer-banner-app-store-click`) filtered or
   grouped by property `src`.
4. **Conversion:** `social-landing-home` (denominator) → App Store clicks
   (numerator), per `src`.

## Straight to the App Store (bio link)

The profile bio link can point at the App Store **and** be tracked. The hop
fires `social-landing {src}` and then `location.replace()`s straight to the
store (no landing page in between).

- App Store URL: `https://apps.apple.com/app/travel-stories-trip-planner/id6756801168`
- Bio link recipe:

      https://travel-stories.12f.dk/go/?src=instagram&to=https%3A%2F%2Fapps.apple.com%2Fapp%2Ftravel-stories-trip-planner%2Fid6756801168

  (The URL above has no `?`/`&`, so the unencoded `&to=https://apps.apple.com/...`
  form also works. If the store URL ever gains query params such as `?l=da`,
  use the encoded form — `goUrl("instagram", APP_STORE_URL)` produces it.)
- What gets counted: `social-landing` counts the **bio tap**, grouped by `src`.
  The download itself happens in the App Store, which Umami cannot see after
  the redirect. `social-landing-home` and the `src`-tagged click events do
  **not** fire for this path, so the conversion ratio in "Reading the funnel"
  only applies to bio links that land on the site. Download attribution comes
  from App Store Connect, not Umami.
- `src` is **not** appended to the App Store URL.
- If you use both link styles (landing page and direct-to-store), consider a
  distinct slug (e.g. `instagram-store`) so the two stay comparable.

## Caveats


- **In-app browsers send no referrer** — that is exactly why the explicit
  `src` exists; without the `/go` hop this traffic is invisible.
- A reload or back-navigation to a `?src=` page re-fires
  `social-landing-home`; that is accepted for simplicity.
- If an ad blocker or in-app browser blocks Umami, the hop still redirects and
  that visit simply is not counted.
- `/go` shares the site stylesheet (the cached `_astro` CSS the landing
  page loads next), so the extra cost on the hop is essentially a preload.
