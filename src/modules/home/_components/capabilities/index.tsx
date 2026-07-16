import { motion } from "framer-motion";
import { useContext, type ReactNode } from "react";
import AnimatedText from "../../../../components/animatedText";
import { ConfigContext } from "../../../../utils/configContext";

// Inline, stroke-based icons keyed by the `icon` field in config. Adding a
// capability needs no new image asset — just a key that exists below.
const icons: Record<string, ReactNode> = {
  widget: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <circle cx="17.5" cy="17.5" r="3.5" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  share: (
    <>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="m16 6-4-4-4 4M12 2v13" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9S14.5 18.5 12 21C9.5 18.5 8.2 15.3 8.2 12S9.5 5.5 12 3Z" />
    </>
  ),
  coins: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  archive: (
    <>
      <rect x="2" y="3" width="20" height="5" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </>
  ),
};

function Capabilities() {
  const {
    home: { capabilities },
  } = useContext(ConfigContext)!;
  if (!capabilities) return null;

  return (
    <section id={capabilities.id} className="mx-auto max-w-screen-lg px-4 py-16 md:py-24">
      <div className="mb-12 max-w-none flex flex-col items-center prose prose-lg text-center">
        <h2 className="mb-0">
          <AnimatedText text={capabilities.title} />
        </h2>
        {capabilities.subtitle && (
          <motion.p
            initial={{ y: "50%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl max-w-lg text-base-content"
          >
            {capabilities.subtitle}
          </motion.p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.cards.map((cap, index) => (
          <motion.article
            key={cap.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: (index % 4) * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col rounded-box border border-base-300 bg-base-100 p-6 shadow-sm"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {icons[cap.icon] ?? icons.widget}
              </svg>
            </span>
            <h3 className="mt-4 text-lg font-bold tracking-tight text-base-content">
              {cap.title}
            </h3>
            <p className="mt-2 text-sm text-base-content/70">{cap.subtitle}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Capabilities;
