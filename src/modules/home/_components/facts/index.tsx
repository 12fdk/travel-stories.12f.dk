import { useContext } from "react";
import { ConfigContext } from "../../../../utils/configContext";

/**
 * The things a person actually wants to know before they tap download,
 * stated as verifiable facts rather than benefits. This is the site's
 * trust layer now that invented testimonials are gone.
 */
function Facts() {
  const {
    home: { facts },
  } = useContext(ConfigContext)!;

  if (!facts?.length) return null;

  return (
    <section aria-label="At a glance" className="border-y border-base-300 bg-base-200/60">
      <dl className="mx-auto grid max-w-screen-lg grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
        {facts.map(({ label, value }) => (
          <div key={label} className="px-4 py-5 md:px-6 text-center">
            <dt className="text-xs uppercase tracking-widest text-base-content/50">
              {label}
            </dt>
            <dd className="mt-1 text-lg font-bold tracking-tight text-base-content">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default Facts;
