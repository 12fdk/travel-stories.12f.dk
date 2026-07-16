import { motion } from "framer-motion";
import { useContext } from "react";
import AnimatedText from "../../../../components/animatedText";
import { ConfigContext } from "../../../../utils/configContext";

function UseCases() {
  const {
    home: { useCases },
  } = useContext(ConfigContext)!;
  if (!useCases) return null;

  return (
    <section id={useCases.id} className="bg-base-200/60 border-y border-base-300">
      <div className="mx-auto max-w-screen-lg px-4 py-16 md:py-24">
        <div className="mb-12 max-w-none flex flex-col items-center prose prose-lg text-center">
          <h2 className="mb-0">
            <AnimatedText text={useCases.title} />
          </h2>
          {useCases.subtitle && (
            <motion.p
              initial={{ y: "50%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              className="text-xl max-w-lg text-base-content"
            >
              {useCases.subtitle}
            </motion.p>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.cards.map((useCase, index) => (
            <motion.article
              key={useCase.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: (index % 3) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative overflow-hidden rounded-box border border-base-300 bg-base-100 p-6 shadow-sm"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <span className="text-4xl" role="img" aria-label={useCase.title}>
                {useCase.emoji}
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-base-content">
                {useCase.title}
              </h3>
              <p className="mt-2 text-base-content/70">{useCase.subtitle}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UseCases;
