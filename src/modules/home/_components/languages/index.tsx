import { useContext } from "react";
import { ConfigContext } from "../../../../utils/configContext";

/** The app's own languages, each written in itself. Keep in sync with the app. */
const APP_LANGUAGES: { name: string; lang: string; dir?: "rtl" }[] = [
  { name: "English", lang: "en" },
  { name: "Deutsch", lang: "de" },
  { name: "Français", lang: "fr" },
  { name: "Español", lang: "es" },
  { name: "Italiano", lang: "it" },
  { name: "Nederlands", lang: "nl" },
  { name: "Português", lang: "pt" },
  { name: "Svenska", lang: "sv" },
  { name: "Norsk", lang: "nb" },
  { name: "日本語", lang: "ja" },
  { name: "한국어", lang: "ko" },
  { name: "繁體中文", lang: "zh-Hant" },
  { name: "العربية", lang: "ar", dir: "rtl" },
  { name: "עברית", lang: "he", dir: "rtl" },
];

/** Plain names in columns: the proof behind "14 languages". */
function Languages() {
  const {
    home: { capabilities },
  } = useContext(ConfigContext)!;
  const card = capabilities?.cards[4];
  if (!card) return null;

  return (
    <section
      aria-labelledby="languages-heading"
      className="mx-auto grid max-w-[1440px] gap-10 px-[var(--gutter)] py-[clamp(112px,12vw,200px)] lg:grid-cols-12"
    >
      <div className="lg:col-span-3" data-reveal>
        <h2 id="languages-heading" className="text-head font-light">
          {card.title}
        </h2>
        <p className="mt-4 max-w-[28ch] text-body text-muted">{card.subtitle}</p>
      </div>
      <ul
        className="m-0 list-none columns-2 gap-8 p-0 text-lead text-ink sm:columns-3 lg:col-span-8 lg:col-start-5 lg:columns-4"
        data-reveal
      >
        {APP_LANGUAGES.map((l) => (
          <li key={l.lang} lang={l.lang} dir={l.dir} className="break-inside-avoid py-1 text-left">
            {l.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Languages;
