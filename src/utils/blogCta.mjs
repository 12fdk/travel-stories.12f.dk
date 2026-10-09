/**
 * Blog App Store CTAs: topic-aware copy and the mid-article placement rule.
 *
 * Shared by the rehype plugin that renders the mid-article CTA
 * (src/plugins/rehype-inline-cta.mjs) and the post template's end CTA. Plain
 * .mjs on purpose: the rule must be plain Node-readable so the plugin can be
 * unit-tested without a TypeScript step.
 *
 * The subtle-promotion rule (prompt.md §4) is "mention the app once or twice
 * at most" in the body, plus the standard end CTA. The mid-article CTA lives
 * inside that budget, never on top of it:
 *
 *   - "upgrade": the post already has a mention in a mid-article section.
 *     That paragraph is *re-rendered* as the CTA card — same words, plus an
 *     App Store button. Mention count unchanged.
 *   - "insert": the post's only mention sits in its closing section (or in
 *     the frontmatter). A short topic-aware card is added after the section
 *     nearest the middle of the article. It counts as a mention, so this
 *     only happens when the body prose has at most one.
 *   - "none": neither fits. Nothing is added; the end CTA still renders.
 *
 * Frontmatter knobs (all optional):
 *   inlineCta: false        — no mid-article CTA on this post
 *   inlineCtaAfter: "…"     — insert after the H2 whose text contains this
 *   inlineCtaText: "…"      — custom sentence for an inserted card
 */

export const APP_STORE_URL = "https://apps.apple.com/app/id6756801168";

/** Umami event name for the mid-article card (carries the post slug). */
export const INLINE_SURFACE = "blog-inline-cta";
/** Umami event name for the end-of-article box. */
export const END_SURFACE = "blog-cta-end";

/**
 * Copy per topic. Every claim matches the App Store listing: itinerary,
 * packing list, budget, documents, photo memories, offline, iOS 17+, free
 * with a one-time ~$1.99 premium upgrade. The `inline` and `end` sentences
 * differ on purpose — they must not repeat each other.
 */
export const TOPICS = {
  planning: {
    label: "Planning the trip",
    inline:
      "If you'd rather not juggle a notebook and a spreadsheet, Travel Stories keeps the itinerary, budget, and documents for the trip in one offline iPhone app.",
    end: "Planning a trip means juggling a dozen places at once. Travel Stories keeps the itinerary, budget, and documents in one offline iPhone app — free, with no account and no subscription.",
  },
  budget: {
    label: "Keeping the budget",
    inline:
      "If you'd rather not track trip expenses in a spreadsheet, Travel Stories logs each expense against the budget, with a chart of what you have left.",
    end: "Trip budgets drift a taxi ride at a time. Travel Stories keeps the running total on one screen, so an overrun shows up while you can still act on it — free on the App Store.",
  },
  journal: {
    label: "Keeping the memories",
    inline:
      "If you'd rather not sort the camera roll afterwards, Travel Stories builds a dated photo timeline of the trip, so the record holds itself together.",
    end: "A trip is only as well remembered as the record you keep of it. Travel Stories keeps photos, notes, and the itinerary dated on the trip itself — free on the App Store.",
  },
  checklist: {
    label: "Before you leave",
    inline:
      "If you'd rather not re-check a mental list at the door, Travel Stories keeps the packing list and the pre-departure tasks with the trip, checked off as you go.",
    end: "Most pre-trip stress comes from things checked in one place and forgotten in another. Travel Stories keeps the checklist and the tasks on the trip itself — free on the App Store, no account.",
  },
  packing: {
    label: "Packing",
    inline:
      "If you'd rather not rebuild the packing list by hand, Travel Stories keeps it on the trip with suggested items and a running check-off — free in the browser at /packing-list/, and in the app.",
    end: "Packing well is a list kept, not a memory. Travel Stories keeps the list on the trip with suggested items — free in the browser at /packing-list/, and in the app.",
  },
  general: {
    label: "One place for the trip",
    inline:
      "If you'd rather not juggle a notebook, a spreadsheet, and the camera roll, Travel Stories keeps the itinerary, budget, packing list, and memories in one offline iPhone app.",
    end: "Most trip stress comes from information scattered across five places. Travel Stories keeps the itinerary, budget, documents, and memories in one offline iPhone app — free, no account, no subscription.",
  },
};

/** Pick a topic from slug, keyword and tags. Order matters: most specific first. */
export function topicFor({ slug = "", keyword = "", tags = [] } = {}) {
  const hay = [slug, keyword, ...(Array.isArray(tags) ? tags : [])].join(" ").toLowerCase();
  if (/budget|expense|cost|money/.test(hay)) return "budget";
  if (/journal|diary|prompt|document|memor|photo/.test(hay)) return "journal";
  if (/packing|packed/.test(hay)) return "packing";
  if (/checklist|before leaving|depart/.test(hay)) return "checklist";
  if (/plan|itinerary|trip|travel/.test(hay)) return "planning";
  return "general";
}

/** Section headings that are wrap-ups, sources or FAQs — never a mid-article spot. */
const CLOSING = /sources|further reading|wrapping up|bottom line|summary|ready to|putting it together|what's next|frequently asked|\bfaq\b|in short|final thoughts|honest recommendation/i;

/**
 * Decide the mid-article CTA for one post.
 *
 * @param {object} p
 * @param {{heading: string, words: number, mentions: number}[]} p.sections
 *   index 0 = intro before the first H2; then one entry per H2 section.
 *   `mentions` = paragraphs in that section that name Travel Stories or link
 *   the App Store.
 * @param {number} p.proseMentions "Travel Stories" count in the rendered prose
 * @param {object} p.frontmatter
 * @returns {{mode: "upgrade"|"insert"|"none", section: number, reason: string}}
 */
export function planInlineCta({ sections, proseMentions, frontmatter = {} }) {
  const fm = frontmatter ?? {};
  if (fm.inlineCta === false || fm.inlineCta === "false") {
    return { mode: "none", section: -1, reason: "disabled in frontmatter" };
  }
  // The last section that is not Sources/FAQ is the closing one; a mention in
  // it is the closing nudge and sits right above the end CTA box anyway.
  const content = sections
    .map((s, i) => ({ ...s, i }))
    .filter((s) => s.i > 0 && !/sources|further reading|frequently asked|\bfaq\b/i.test(s.heading));
  const lastContent = content.length ? content[content.length - 1].i : -1;
  const eligible = (s) => s.i >= 1 && s.i !== lastContent && !CLOSING.test(s.heading);

  // 1. Upgrade an existing mid-article mention (no change to the count).
  const withMention = content.find((s) => eligible(s) && s.mentions > 0);
  if (withMention && !fm.inlineCtaAfter) {
    return { mode: "upgrade", section: withMention.i, reason: `upgrades the mention in "${withMention.heading}"` };
  }

  // 2. Insert a card — only if it keeps the body at ≤ 2 mentions.
  if (proseMentions > 1) {
    return {
      mode: "none",
      section: -1,
      reason: fm.inlineCtaAfter
        ? `inlineCtaAfter is set but the body already has ${proseMentions} mentions`
        : `body already has ${proseMentions} mentions, none mid-article`,
    };
  }
  if (fm.inlineCtaAfter) {
    const needle = String(fm.inlineCtaAfter).toLowerCase();
    const hit = content.find((s) => s.heading.toLowerCase().includes(needle));
    if (!hit) return { mode: "none", section: -1, reason: `inlineCtaAfter "${fm.inlineCtaAfter}" matches no H2` };
    return { mode: "insert", section: hit.i, reason: `inserted after "${hit.heading}" (frontmatter)` };
  }
  const total = sections.reduce((n, s) => n + s.words, 0);
  let run = 0;
  let best = null;
  sections.forEach((s, i) => {
    run += s.words;
    const at = run / (total || 1);
    // At least two sections in and past 30% — the reader has had real value
    // before anything asks for their attention — and not in the last 20%.
    if (i < 2 || at < 0.3 || at > 0.8 || !eligible({ ...s, i })) return;
    const d = Math.abs(at - 0.5);
    if (!best || d < best.d) best = { i, d, heading: s.heading };
  });
  if (!best) return { mode: "none", section: -1, reason: "no section between 30% and 80% of the article" };
  return { mode: "insert", section: best.i, reason: `inserted after "${best.heading}"` };
}
