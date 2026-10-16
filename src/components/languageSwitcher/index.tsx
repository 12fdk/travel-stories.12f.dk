import { useContext } from "react";
import { ConfigContext } from "../../utils/configContext";
import { LOCALES, localeHref, DEFAULT_LOCALE } from "../../i18n/locales";

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21C9.5 18.5 8.2 15.3 8.2 12S9.5 5.5 12 3Z" />
  </svg>
);

/**
 * Jumps between the localized homepages. Only the homepage is translated, so
 * every option points at that locale's root; from any other page this returns
 * the reader to a homepage they can read. (#22)
 */
function LanguageSwitcher() {
  const { locale = DEFAULT_LOCALE } = useContext(ConfigContext)!;
  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <details className="dropdown dropdown-end">
      <summary
        className="flex min-h-[44px] cursor-pointer items-center gap-1.5 px-1 text-small text-ink"
        aria-label="Language"
      >
        <GlobeIcon />
        <span>{current.label}</span>
      </summary>
      <ul className="menu dropdown-content z-[60] mt-2 max-h-80 w-48 flex-nowrap overflow-y-auto rounded-ui bg-surface p-2 text-small text-ink">
        {LOCALES.map((l) => (
          <li key={l.code}>
            <a
              href={localeHref(l.code)}
              hrefLang={l.hreflang}
              lang={l.hreflang}
              aria-current={l.code === locale ? "true" : undefined}
              className={l.code === locale ? "active font-medium" : ""}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

export default LanguageSwitcher;
