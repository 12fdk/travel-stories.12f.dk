/**
 * Every locale the marketing homepage is published in (#22). `code` is both
 * the URL segment (/de/, /ja/, …) and config.locale; English is the default
 * and lives at the site root with no prefix. The set mirrors the app's own
 * localizations and the top ASO markets from the issue.
 */
export interface LocaleDef {
  /** URL segment and config.locale value. */
  code: string;
  /** Native name shown in the language switcher. */
  label: string;
  /** BCP-47 tag for hreflang, og:locale and <html lang>. */
  hreflang: string;
}

export const DEFAULT_LOCALE = "en";

export const SITE = "https://travel-stories.12f.dk";

export const LOCALES: LocaleDef[] = [
  { code: "en", label: "English", hreflang: "en" },
  { code: "da", label: "Dansk", hreflang: "da" },
  { code: "nb", label: "Norsk", hreflang: "nb" },
  { code: "sv", label: "Svenska", hreflang: "sv" },
  { code: "nl", label: "Nederlands", hreflang: "nl" },
  { code: "de", label: "Deutsch", hreflang: "de" },
  { code: "fr", label: "Français", hreflang: "fr" },
  { code: "es", label: "Español", hreflang: "es" },
  { code: "it", label: "Italiano", hreflang: "it" },
  { code: "pt", label: "Português (BR)", hreflang: "pt-BR" },
  { code: "ko", label: "한국어", hreflang: "ko" },
  { code: "ja", label: "日本語", hreflang: "ja" },
];

/** Locales other than English — the ones that get a prefixed route. */
export const NON_DEFAULT_LOCALES = LOCALES.filter((l) => l.code !== DEFAULT_LOCALE);

export function getLocale(code: string): LocaleDef | undefined {
  return LOCALES.find((l) => l.code === code);
}

/** Root-relative home path for a locale: "/" for English, "/<code>/" otherwise. */
export function localeHref(code: string): string {
  return code === DEFAULT_LOCALE ? "/" : `/${code}/`;
}

/** hreflang alternates for the homepage, including x-default → English root. */
export function homepageAlternates(): { hreflang: string; href: string }[] {
  return [
    ...LOCALES.map((l) => ({ hreflang: l.hreflang, href: SITE + localeHref(l.code) })),
    { hreflang: "x-default", href: SITE + "/" },
  ];
}
