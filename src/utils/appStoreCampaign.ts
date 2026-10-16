/**
 * App Store campaign attribution (#62).
 *
 * Apple's Campaign column is filled from the `ct` query parameter. `ct` is
 * free text, at most 40 characters. `mt=8` is the legacy "mobile software"
 * media type Apple's own campaign links still include.
 *
 * Token scheme, shared with the sister sites:
 * - homepage and site chrome: `site-travel-stories`
 * - a blog post: `blog-<post-slug>`, truncated to 40 characters
 * - `llms.txt` / `ai.txt`: `llms-travel-stories`
 *
 * `pt` (provider token) is not added here. Issue #62: ship `ct` first and only
 * add `pt` if the Campaign column stays empty. An existing `pt` on a URL is
 * left in place. `PROVIDER_TOKEN` stays empty until that check says otherwise;
 * filling it is what switches `pt` on.
 */

/** App Store Connect provider token. Empty until campaign reports show `ct` alone is not enough. */
export const PROVIDER_TOKEN = "";

export const CT_MAX_LENGTH = 40;

export const SITE_CAMPAIGN = "site-travel-stories";
export const LLMS_CAMPAIGN = "llms-travel-stories";

const BLOG_PLACEMENTS = new Set(["blog", "blog-body"]);

/**
 * `blog-<slug>`, truncated so the whole token stays within Apple's 40-character `ct` limit.
 */
export function blogCampaignToken(slug: string): string {
  const cleaned = slug.trim().replace(/^\/+|\/+$/g, "").replace(/\.mdx?$/, "");
  if (!cleaned) {
    throw new Error("App Store blog campaign requires a post slug");
  }
  return `blog-${cleaned}`.slice(0, CT_MAX_LENGTH);
}

/**
 * Blog posts get `blog-<slug>`. Every other page (home, packing list, blog
 * index) is site chrome.
 */
export function campaignForPathname(pathname: string): string {
  const match = pathname.match(/\/blog\/([^/]+)\/?$/);
  if (!match) return SITE_CAMPAIGN;
  return blogCampaignToken(decodeURIComponent(match[1]));
}

/**
 * Smart App Banner campaign parameter. No `pt` — see the file header.
 * Callers put this in the `content` attribute; the template escapes `&`.
 */
export function appleItunesAppContent(campaign: string): string {
  const token = campaign.slice(0, CT_MAX_LENGTH);
  return `app-id=6756801168, affiliate-data=ct=${token}&mt=8`;
}

function resolveCampaign(campaignOrPlacement: string, slug?: string): string {
  if (BLOG_PLACEMENTS.has(campaignOrPlacement)) {
    return blogCampaignToken(slug ?? "");
  }
  if (
    campaignOrPlacement === SITE_CAMPAIGN ||
    campaignOrPlacement === LLMS_CAMPAIGN ||
    campaignOrPlacement.startsWith("blog-")
  ) {
    return campaignOrPlacement.slice(0, CT_MAX_LENGTH);
  }
  // navbar, hero, pricing, sticky, and the other chrome placements share one token.
  return SITE_CAMPAIGN;
}

/**
 * Add `ct` and `mt=8` to an App Store URL.
 *
 * Merges rather than appends, so an existing Custom Product Page `ppid`
 * (packing-list traffic) and an existing `pt` survive. Anything that is not
 * an `apps.apple.com` URL is returned unchanged.
 */
export function withCampaign<T extends string | undefined>(
  url: T,
  campaignOrPlacement: string,
  slug?: string,
): T {
  if (!url) return url;
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "apps.apple.com") return url;
    const token = resolveCampaign(campaignOrPlacement, slug);
    if (PROVIDER_TOKEN) parsed.searchParams.set("pt", PROVIDER_TOKEN);
    parsed.searchParams.set("ct", token);
    parsed.searchParams.set("mt", "8");
    return parsed.toString() as T;
  } catch {
    return url;
  }
}

/**
 * Same treatment for App Store URLs embedded in an HTML string — the TL;DR
 * items, which are authored as HTML in frontmatter and injected with `set:html`.
 */
export function withCampaignInHtml(html: string, campaignOrPlacement: string, slug?: string): string {
  return html.replace(
    /https:\/\/apps\.apple\.com\/[^"'\s<>]+/g,
    (raw) => {
      const tagged = withCampaign(raw.replace(/&amp;/g, "&"), campaignOrPlacement, slug);
      return tagged.replace(/&/g, "&amp;");
    },
  );
}
