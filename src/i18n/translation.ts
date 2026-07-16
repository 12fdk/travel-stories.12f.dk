import type { TemplateConfig, UiStrings } from "../utils/configType";
import { homepageAlternates, localeHref } from "./locales";

/**
 * The full set of translatable homepage strings, in one flat shape (#22).
 * English is the base config itself; every other locale is a translation of
 * this shape. Non-text config (icons, images, emoji, ids, hrefs, screenshots,
 * featured flags) is NOT here — it comes from the base config unchanged.
 *
 * Card/step/row/QA arrays must have the SAME length and order as the base
 * config — applyTranslation zips them positionally.
 */
export interface Translation {
  seo: { title: string; description: string };
  nav: { cta: string; links: string[] };
  header: {
    headline: string;
    subtitle: string;
    /** Word-index range [start, end) to highlight, or null to disable. */
    headlineMark: [number, number] | null;
  };
  ui: UiStrings;
  facts: { label: string; value: string }[];
  features: { title: string; subtitle: string; cards: { title: string; subtitle: string }[] };
  capabilities: { title: string; subtitle: string; cards: { title: string; subtitle: string }[] };
  videoDemo: { title: string; subtitle: string };
  useCases: { title: string; subtitle: string; cards: { title: string; subtitle: string }[] };
  howItWorks: { title: string; subtitle: string; steps: { title: string; subtitle: string }[] };
  comparison: {
    title: string;
    subtitle: string;
    columns: { them: string; us: string };
    rows: { aspect: string; them: string; us: string }[];
  };
  pricing: {
    title: string;
    subtitle: string;
    actionText: string;
    plans: { title: string; price: string; rows: string[] }[];
  };
  faq: { title: string; qa: { question: string; answer: string }[] };
  appBanner: { title: string; subtitle: string };
}

/** Overlay a Translation onto the base config, preserving non-text fields. */
export function applyTranslation(
  base: TemplateConfig,
  t: Translation,
  code: string,
): TemplateConfig {
  const home = base.home;
  const homeHref = localeHref(code);
  // "/#anchor" links must stay on the localized homepage, not jump to "/".
  const localizeHref = (href: string) =>
    href.startsWith("/#") ? `${homeHref}${href.slice(1)}` : href;
  // Footer nav shares the navbar's titles — translate by href lookup.
  const navTitleByHref = new Map(
    base.topNavbar.links.map((link, i) => [link.href, t.nav.links[i]]),
  );
  return {
    ...base,
    locale: code,
    homeHref,
    localeAlternates: homepageAlternates(),
    seo: t.seo,
    ui: t.ui,
    topNavbar: {
      ...base.topNavbar,
      cta: t.nav.cta,
      links: base.topNavbar.links.map((link, i) => ({
        ...link,
        href: localizeHref(link.href),
        title: t.nav.links[i] ?? link.title,
      })),
    },
    footer: {
      ...base.footer,
      links: base.footer.links.map((link) => ({
        ...link,
        href: localizeHref(link.href),
        title: navTitleByHref.get(link.href) ?? link.title,
      })),
    },
    appBanner: base.appBanner && {
      ...base.appBanner,
      title: t.appBanner.title,
      subtitle: t.appBanner.subtitle,
    },
    home: {
      ...home,
      seo: t.seo,
      header: {
        ...home.header,
        headline: t.header.headline,
        subtitle: t.header.subtitle,
        headlineMark: t.header.headlineMark ?? undefined,
      },
      facts: home.facts?.map((f, i) => t.facts[i] ?? f),
      features: home.features && {
        ...home.features,
        title: t.features.title,
        subtitle: t.features.subtitle,
        cards: home.features.cards.map((c, i) => ({
          ...c,
          title: t.features.cards[i]?.title ?? c.title,
          subtitle: t.features.cards[i]?.subtitle ?? c.subtitle,
        })),
      },
      capabilities: home.capabilities && {
        ...home.capabilities,
        title: t.capabilities.title,
        subtitle: t.capabilities.subtitle,
        cards: home.capabilities.cards.map((c, i) => ({
          ...c,
          title: t.capabilities.cards[i]?.title ?? c.title,
          subtitle: t.capabilities.cards[i]?.subtitle ?? c.subtitle,
        })),
      },
      videoDemo: home.videoDemo && {
        ...home.videoDemo,
        title: t.videoDemo.title,
        subtitle: t.videoDemo.subtitle,
      },
      useCases: home.useCases && {
        ...home.useCases,
        title: t.useCases.title,
        subtitle: t.useCases.subtitle,
        cards: home.useCases.cards.map((c, i) => ({
          ...c,
          title: t.useCases.cards[i]?.title ?? c.title,
          subtitle: t.useCases.cards[i]?.subtitle ?? c.subtitle,
        })),
      },
      howItWorks: home.howItWorks && {
        ...home.howItWorks,
        title: t.howItWorks.title,
        subtitle: t.howItWorks.subtitle,
        steps: home.howItWorks.steps.map((s, i) => ({
          ...s,
          title: t.howItWorks.steps[i]?.title ?? s.title,
          subtitle: t.howItWorks.steps[i]?.subtitle ?? s.subtitle,
        })),
      },
      comparison: home.comparison && {
        ...home.comparison,
        title: t.comparison.title,
        subtitle: t.comparison.subtitle,
        columns: t.comparison.columns,
        rows: home.comparison.rows.map((r, i) => t.comparison.rows[i] ?? r),
      },
      pricing: home.pricing && {
        ...home.pricing,
        title: t.pricing.title,
        subtitle: t.pricing.subtitle,
        actionText: t.pricing.actionText,
        plans: home.pricing.plans?.map((p, i) => ({
          ...p,
          title: t.pricing.plans[i]?.title ?? p.title,
          price: t.pricing.plans[i]?.price ?? p.price,
          rows: t.pricing.plans[i]?.rows ?? p.rows,
        })),
      },
      faq: home.faq && {
        ...home.faq,
        title: t.faq.title,
        qa: home.faq.qa.map((item, i) => t.faq.qa[i] ?? item),
      },
    },
  };
}
