import clsx from "clsx";
import { useContext } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import { withCampaign } from "../../../../utils/appStoreCampaign";

/**
 * Two plans as two full-height fields that meet at a hard edge. Premium gets
 * the wider, darker field; the width says which matters more, no badge.
 */
function Pricing() {
  const {
    appStoreLink,
    ui,
    home: { pricing },
  } = useContext(ConfigContext)!;
  if (!pricing) return null;
  const plans = pricing.plans ?? [];

  return (
    <section id={pricing.id} aria-labelledby="pricing-heading" className="pt-[clamp(112px,12vw,200px)]">
      <div className="mx-auto max-w-[1440px] px-[var(--gutter)] pb-12" data-reveal>
        <h2 id="pricing-heading" className="text-lead font-light sm:text-head">
          {pricing.title}
        </h2>
        {pricing.subtitle && <p className="mt-5 max-w-[46ch] text-body text-muted">{pricing.subtitle}</p>}
      </div>

      <div className="grid lg:grid-cols-12">
        {plans.map((plan) => (
          <div
            key={plan.title}
            className={clsx(
              "flex min-h-[70svh] flex-col justify-between gap-12 px-[var(--gutter)] py-10 lg:min-h-[86svh] lg:px-10",
              plan.featured
                ? "order-first bg-field text-field-ink lg:order-none lg:col-span-7"
                : "bg-surface text-ink lg:col-span-5",
            )}
          >
            <div data-reveal>
              <h3 className="text-head font-light">{plan.title}</h3>
              <ul
                className={clsx(
                  "m-0 mt-6 flex list-none flex-col gap-1 p-0 text-body",
                  plan.featured ? "text-field-muted" : "text-muted",
                )}
              >
                {plan.rows.map((row) => (
                  <li key={row}>{row}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
              <p className="text-display font-light tabular">{plan.price}</p>
              {pricing.actionText && appStoreLink && (
                <a
                  href={withCampaign(appStoreLink, "pricing")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event={`pricing-cta-${plan.featured ? "premium" : "free"}`}
                  className="ts-button w-full sm:w-auto"
                >
                  {pricing.actionText}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="mx-auto max-w-[1440px] px-[var(--gutter)] pt-6 text-small text-muted">
        {ui?.pricingFootnote ??
          "Prices shown in USD; your App Store storefront sets the exact local price. No subscription: Premium is a single purchase, yours forever."}
      </p>
    </section>
  );
}

export default Pricing;
