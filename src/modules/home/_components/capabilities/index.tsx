import { useContext } from "react";
import { ConfigContext } from "../../../../utils/configContext";

/** Capabilities that need the one-time Premium purchase (index into cards). */
const PREMIUM = new Set([2]);
/** "14 languages" gets its own section with the names, so it is left out here. */
const SHOWN_ELSEWHERE = new Set([4]);

/**
 * The small things around the edges, as two-ended rows: what it does on the
 * left, which plan it comes with on the right.
 */
function Capabilities() {
  const {
    home: { capabilities, pricing },
  } = useContext(ConfigContext)!;
  if (!capabilities) return null;

  const free = pricing?.plans?.[0]?.title ?? "Free";
  const premium = pricing?.plans?.[1]?.title ?? "Premium";

  return (
    <section
      id={capabilities.id}
      aria-labelledby="capabilities-heading"
      className="mx-auto max-w-[1440px] px-[var(--gutter)] pt-[clamp(112px,12vw,200px)]"
    >
      <div className="mx-auto max-w-[620px] lg:ml-[22%]">
        <div data-reveal>
          <h2 id="capabilities-heading" className="text-lead font-medium">
            {capabilities.title}
          </h2>
          {capabilities.subtitle && <p className="mt-2 text-body text-muted">{capabilities.subtitle}</p>}
        </div>
        <ul className="mt-8 flex list-none flex-col p-0" data-reveal>
          {capabilities.cards.map((cap, i) =>
            SHOWN_ELSEWHERE.has(i) ? null : (
              <li key={cap.title} className="flex items-baseline justify-between gap-6 py-3">
                <span>
                  <span className="block text-body text-ink">{cap.title}</span>
                  <span className="block text-small text-muted">{cap.subtitle}</span>
                </span>
                <span className="shrink-0 text-small text-muted">{PREMIUM.has(i) ? premium : free}</span>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}

export default Capabilities;
