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
- Optional `&to=<internal path>` lands on a specific page (only same-origin
  paths starting with `/` are allowed; anything else falls back to `/`).

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

## Caveats

- **In-app browsers send no referrer** — that is exactly why the explicit
  `src` exists; without the `/go` hop this traffic is invisible.
- A reload or back-navigation to a `?src=` page re-fires
  `social-landing-home`; that is accepted for simplicity.
- If an ad blocker or in-app browser blocks Umami, the hop still redirects and
  that visit simply is not counted.
