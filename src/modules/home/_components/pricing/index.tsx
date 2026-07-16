import AnimatedText from "../../../../components/animatedText";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ConfigContext } from "../../../../utils/configContext";

function Pricing() {
  const config = useContext(ConfigContext)!;
  const {
    appStoreLink,
    ui,
    home: { pricing },
  } = config;
  if (!pricing) return null;

  return (
    <section
      id={pricing.id}
      className="overflow-hidden max-w-screen-lg mx-auto px-4 py-12"
    >
      <div className="mb-12 max-w-none flex flex-col items-center prose prose-lg text-center">
        <h2 className="mb-0">
          <AnimatedText text={pricing.title} />
        </h2>
        {pricing.subtitle && (
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl max-w-lg text-base-content"
          >
            {pricing.subtitle}
          </motion.p>
        )}
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col max-w-none gap-8 md:flex-row md:justify-center"
      >
        {pricing.plans?.map((plan, index) => (
          <motion.div
            key={index}
            transition={{ delay: 0.25 + index * 0.25 }}
            className="md:w-2/5 flex relative"
            variants={{
              hidden: { y: 40, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
          >
            <div
              className={clsx(
                "flex-1 card p-8 shadow-md bg-base-100 z-10 overflow-hidden border-2",
                plan.featured ? "border-primary" : "border-primary/10"
              )}
            >
              {plan.featured && (
                <div className="badge badge-primary absolute top-4 right-4">
                  One-time
                </div>
              )}
              <div className="card-body p-0">
                <h3 className="text-xl font-bold my-1">{plan.title}</h3>
                <p className="text-3xl font-extrabold my-1">{plan.price}</p>
                <ul className="mt-4 mb-6 space-y-3 list-none p-0">
                  {plan.rows.map((row, rowIndex) => (
                    <li key={rowIndex} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 mt-0.5 shrink-0 text-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span className="flex-1 text-left">{row}</span>
                    </li>
                  ))}
                </ul>
                {pricing.actionText && (
                  <a
                    href={appStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event={`pricing-cta-${plan.featured ? "premium" : "free"}`}
                    className={clsx(
                      "btn no-animation w-full text-lg mt-auto",
                      plan.featured ? "btn-primary !text-white" : "btn-outline"
                    )}
                  >
                    {pricing.actionText}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <p className="text-center text-sm text-base-content/60 mt-6">
        {ui?.pricingFootnote ??
          "Prices shown in USD; your App Store storefront sets the exact local price. No subscription — Premium is a single purchase, yours forever."}
      </p>
    </section>
  );
}

export default Pricing;
