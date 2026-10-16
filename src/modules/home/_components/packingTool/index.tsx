import { useContext } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import { withBase } from "../../../../utils/basePath";

const POPULAR = [
  { href: "/packing-list/carry-on-only-packing-list/", title: "Carry-on only", note: "1 bag" },
  { href: "/packing-list/7-day-beach-trip-packing-list/", title: "7-day beach trip", note: "7 days" },
  { href: "/packing-list/what-to-pack-for-japan-in-winter/", title: "Japan in winter", note: "Cold" },
  { href: "/packing-list/3-day-business-trip-packing-list/", title: "3-day business trip", note: "3 days" },
  { href: "/packing-list/family-beach-holiday-packing-list/", title: "Beach with kids", note: "Family" },
  { href: "/packing-list/week-long-ski-trip-packing-list/", title: "A week of skiing", note: "7 days" },
];

/**
 * The path in to /packing-list/ from the site's strongest page.
 *
 * English only: the tool ships in English (#57), and the localised homepages
 * shouldn't send their visitors to a page they can't read.
 */
function PackingTool() {
  const { locale } = useContext(ConfigContext)!;
  if (locale && locale !== "en") return null;

  return (
    <section
      id="packing-list-tool"
      aria-labelledby="packing-tool-heading"
      className="mx-auto max-w-[1440px] px-[var(--gutter)] pt-[clamp(112px,12vw,200px)]"
    >
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <img
          src={withBase("/images/how-it-works/03-organize.webp")}
          alt="A phone, a passport wallet, keys and travel documents laid out for packing"
          width={784}
          height={1168}
          loading="lazy"
          className="aspect-[4/3] w-full rounded-ui object-cover lg:col-span-5 lg:aspect-[4/5]"
          data-reveal-self
        />
        <div className="lg:col-span-6 lg:col-start-7">
          <div data-reveal>
            <h2 id="packing-tool-heading" className="text-head font-light">
              Build your packing list here
            </h2>
            <p className="mt-5 max-w-[48ch] text-body text-ink">
              Pick the trip, the length and the weather, and get a checklist by category that you
              can tick off, print or download. No account, no email address, nothing to install.
            </p>
            <a href="/packing-list/" data-umami-event="home-packing-list-cta" className="ts-button mt-8">
              Open the packing list generator
            </a>
          </div>
          <ul className="mt-12 flex list-none flex-col p-0" data-reveal>
            {POPULAR.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group flex min-h-[44px] items-center justify-between gap-6 py-1 text-body text-ink"
                >
                  <span className="ts-link">{item.title}</span>
                  <span className="text-small text-muted transition-transform duration-300 group-hover:-translate-x-1">
                    {item.note}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default PackingTool;
