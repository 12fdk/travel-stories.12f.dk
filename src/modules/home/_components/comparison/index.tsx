import { useContext } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import { withBase } from "../../../../utils/basePath";

/** Shallow scallops along the sheet's top and bottom edge. */
function Scallops({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      className={`block h-[10px] w-full text-[var(--paper)] ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id={`scallop-${flip ? "b" : "t"}`} width="20" height="10" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="10" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="10" fill={`url(#scallop-${flip ? "b" : "t"})`} />
    </svg>
  );
}

/**
 * The real competitor isn't another app; it's the notes app, the spreadsheet
 * and the group chat. Set as one printed sheet over a photograph of the
 * river the sample trip ends on.
 */
function Comparison() {
  const {
    home: { comparison },
  } = useContext(ConfigContext)!;
  if (!comparison) return null;

  return (
    <section id={comparison.id} aria-labelledby="comparison-heading" className="relative overflow-hidden">
      <img
        src={withBase("/images/world/porto-rabelo.webp")}
        srcSet={`${withBase("/images/world/porto-rabelo-900.webp")} 900w, ${withBase("/images/world/porto-rabelo.webp")} 1920w`}
        sizes="100vw"
        alt="Rabelo boats on the Douro river in front of the Ribeira quarter of Porto"
        width={1920}
        height={1281}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative mx-auto grid max-w-[1440px] px-[10px] py-[clamp(72px,10vw,160px)] sm:px-[var(--gutter)] lg:grid-cols-12">
        <div className="lg:col-span-6 lg:col-start-7" data-reveal-self>
          <Scallops />
          <div className="bg-[var(--paper)] px-5 py-12 text-center sm:px-16 sm:py-16">
            <h2 id="comparison-heading" className="mx-auto text-lead">
              {comparison.title}
            </h2>
            {comparison.subtitle && (
              <p className="mx-auto mt-5 max-w-[40ch] text-body text-muted">{comparison.subtitle}</p>
            )}
            <dl className="mt-14 flex flex-col gap-11">
              {comparison.rows.map((row) => (
                <div key={row.aspect}>
                  <dt className="text-lead text-ink">{row.aspect}</dt>
                  <dd className="mx-auto mt-2 max-w-[38ch] text-body text-ink">{row.us}</dd>
                  <dd className="mx-auto mt-1 max-w-[38ch] text-small text-muted">
                    {comparison.columns.them}: {row.them}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-14 text-small text-muted">
              {comparison.columns.us}
              <br />
              {comparison.columns.them}
            </p>
          </div>
          <Scallops flip />
        </div>
      </div>
    </section>
  );
}

export default Comparison;
