import { motion } from "framer-motion";
import { useContext } from "react";
import AnimatedText from "../../../../components/animatedText";
import { withBase } from "../../../../utils/basePath";
import { ConfigContext } from "../../../../utils/configContext";

function Capabilities() {
  const {
    home: { capabilities },
  } = useContext(ConfigContext)!;
  if (!capabilities) return null;

  return (
    <section
      id={capabilities.id}
      className="mx-auto max-w-screen-lg px-4 py-16 md:py-24"
    >
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
            <img
              src={withBase(cap.image)}
              alt=""
              aria-hidden="true"
              width={72}
              height={72}
              loading="lazy"
              className="h-[72px] w-[72px] rounded-2xl bg-white object-contain"
            />
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
