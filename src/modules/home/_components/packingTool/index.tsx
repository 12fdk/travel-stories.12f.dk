import { useContext } from "react";
import { motion } from "framer-motion";
import { ConfigContext } from "../../../../utils/configContext";

const POPULAR = [
  { href: "/packing-list/carry-on-only-packing-list/", title: "Carry-on only" },
  { href: "/packing-list/7-day-beach-trip-packing-list/", title: "7-day beach trip" },
  { href: "/packing-list/what-to-pack-for-japan-in-winter/", title: "Japan in winter" },
  { href: "/packing-list/3-day-business-trip-packing-list/", title: "3-day business trip" },
  { href: "/packing-list/family-beach-holiday-packing-list/", title: "Beach with kids" },
  { href: "/packing-list/week-long-ski-trip-packing-list/", title: "A week of skiing" },
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
      className="mx-auto max-w-screen-lg px-4 py-16 md:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-box border border-base-300 bg-base-200/50 p-8 md:p-12"
      >
        <p className="m-0 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-base-content/50">
          <span className="inline-block h-0.5 w-8 bg-primary" />
          Free tool — no install
        </p>
        <h2
          id="packing-tool-heading"
          className="mb-3 mt-5 text-3xl font-extrabold leading-[1.05] md:text-4xl"
        >
          Build your packing list right here
        </h2>
        <p className="m-0 max-w-2xl text-lg leading-relaxed text-base-content/70">
          Pick the trip, the length and the weather, and get a categorised
          checklist you can tick off, print or download. No account, no email
          address, nothing to install.
        </p>

        <a
          href="/packing-list/"
          data-umami-event="home-packing-list-cta"
          className="btn mt-7 border-none bg-primary text-primary-content shadow-md shadow-primary/30 hover:brightness-110"
        >
          Open the packing list generator
        </a>

        <ul className="mt-8 flex list-none flex-wrap gap-2 p-0">
          {POPULAR.map((item) => (
            <li key={item.href} className="m-0">
              <a
                href={item.href}
                className="inline-block rounded-full border border-base-300 bg-base-100 px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}

export default PackingTool;
