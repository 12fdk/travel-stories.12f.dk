/**
 * App Store campaign attribution (#52).
 *
 * Apple credits an install to this site only when the link carries a provider
 * token (`pt`) plus a campaign token (`ct`). Without them every referred
 * install is folded into the Discovery report's generic "App Store search"
 * row, which is why the July 2026 report showed `App referrer = 0` despite the
 * site sending traffic.
 *
 * `ct` is what splits the report by placement, so each button gets its own.
 */

/**
 * From App Store Connect → Analytics → Sources → Campaigns (needs account
 * owner access; see #52).
 *
 * While this is empty every link is returned untouched, so the site behaves
 * exactly as it did before attribution existed. Filling it in is the only
 * change needed to switch attribution on everywhere.
 */
export const PROVIDER_TOKEN = "";

/**
 * Where the tap came from. Values mirror the existing Umami event names so the
 * two analytics systems can be read side by side.
 */
export type Placement =
  | "navbar"
  | "hero"
  | "pricing"
  | "sticky"
  | "app-banner"
  | "section-cta"
  | "blog"
  | "blog-body"
  | "packing-list"
  | "404"
  | "app-redirect";

/**
 * Add campaign parameters to an App Store URL.
 *
 * Merges rather than appends, so the Custom Product Page `ppid` that
 * packing-list traffic carries (#60) survives untouched. Anything that isn't a
 * parseable absolute URL is returned as-is rather than mangled.
 */
export function withCampaign<T extends string | undefined>(
  url: T,
  placement: Placement,
): T {
  if (!url || !PROVIDER_TOKEN) return url;
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("pt", PROVIDER_TOKEN);
    parsed.searchParams.set("ct", `website-${placement}`);
    // Legacy media type: 8 = mobile software. Apple's own campaign links still
    // include it and it costs nothing to match them.
    parsed.searchParams.set("mt", "8");
    return parsed.toString() as T;
  } catch {
    return url;
  }
}

/**
 * Same treatment for App Store URLs embedded in an HTML string — the TL;DR
 * items, which come out of post frontmatter and are injected with `set:html`
 * rather than going through the markdown pipeline.
 */
export function withCampaignInHtml(html: string, placement: Placement): string {
  if (!PROVIDER_TOKEN) return html;
  return html.replace(
    /https:\/\/apps\.apple\.com\/[^"'\s<>]+/g,
    (url) => withCampaign(url, placement),
  );
}
