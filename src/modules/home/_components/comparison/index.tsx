import { motion } from "framer-motion";
import { useContext } from "react";
import AnimatedText from "../../../../components/animatedText";
import { ConfigContext } from "../../../../utils/configContext";

/**
 * The real competitor isn't another app — it's the notes-app / spreadsheet /
 * group-chat chaos people already use. One honest table, no named rivals.
 */
function Comparison() {
  const {
    home: { comparison },
  } = useContext(ConfigContext)!;
  if (!comparison) return null;

  return (
    <section id={comparison.id} className="border-y border-base-300 bg-base-200/60">
      <div className="mx-auto max-w-screen-lg px-4 py-16 md:py-24">
        <div className="mb-10 max-w-none flex flex-col items-center prose prose-lg text-center">
          <h2 className="mb-0">
            <AnimatedText text={comparison.title} />
          </h2>
          {comparison.subtitle && (
            <motion.p
              initial={{ y: "50%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              className="text-xl max-w-lg text-base-content"
            >
              {comparison.subtitle}
            </motion.p>
          )}
        </div>

        {/* Mobile: one stacked card per aspect — no horizontal scroll. */}
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="divide-y divide-base-300 border-y border-base-300 md:hidden"
        >
          {comparison.rows.map((row) => (
            <div key={row.aspect} className="py-5">
              <dt className="text-xs uppercase tracking-widest text-base-content/50">
                {row.aspect}
              </dt>
              <dd className="m-0 mt-2 text-sm leading-relaxed text-base-content/60">
                <span className="mr-2 text-xs uppercase tracking-widest text-base-content/40">
                  {comparison.columns.them}
                </span>
                {row.them}
              </dd>
              <dd className="m-0 mt-2 text-sm font-medium leading-relaxed text-base-content">
                <span className="mr-2 text-xs uppercase tracking-widest text-primary">
                  {comparison.columns.us}
                </span>
                {row.us}
              </dd>
            </div>
          ))}
        </motion.dl>

        {/* Desktop: the honest three-column table. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block"
        >
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-base-300">
                <th className="w-40 py-3 pr-4 text-left align-bottom" aria-label="Aspect" />
                <th className="py-3 pr-4 text-left align-bottom font-normal">
                  <span className="text-xs uppercase tracking-widest text-base-content/50">
                    {comparison.columns.them}
                  </span>
                </th>
                <th className="py-3 text-left align-bottom font-normal">
                  <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-base-content">
                    <span className="inline-block h-0.5 w-4 bg-primary" aria-hidden="true" />
                    {comparison.columns.us}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-300">
              {comparison.rows.map((row) => (
                <tr key={row.aspect}>
                  <td className="py-4 pr-4 align-top">
                    <span className="text-xs uppercase tracking-widest text-base-content/50">
                      {row.aspect}
                    </span>
                  </td>
                  <td className="py-4 pr-4 align-top leading-relaxed text-base-content/60">
                    {row.them}
                  </td>
                  <td className="py-4 align-top font-medium leading-relaxed text-base-content">
                    {row.us}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

export default Comparison;
