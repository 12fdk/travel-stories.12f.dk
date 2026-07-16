import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const DAYS = [
  { day: "Day 1", emoji: "✈️", text: "Land in Lisbon · check in" },
  { day: "Day 2", emoji: "🏛️", text: "Old town · tram 28 · viewpoint" },
  { day: "Day 3", emoji: "🏖️", text: "Cascais day trip · beach" },
];

const BUDGET_SPENT = 0.62;

/**
 * The "show the real thing" hero widget: a sample day-by-day itinerary with
 * a budget bar, clearly labelled as a sample. The travel counterpart of
 * home-stories' BudgetRail / event-stories' RunOfShow.
 */
function ItineraryRail() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6, ease: [...EASE] }}
      aria-label="Sample itinerary preview"
      className="not-prose mt-6 w-full max-w-md rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm"
    >
      <div className="flex items-baseline justify-between">
        <p className="m-0 text-sm font-semibold text-base-content">
          Porto &amp; Lisbon
        </p>
        <p className="m-0 text-[10px] uppercase tracking-widest text-base-content/40">
          Sample trip
        </p>
      </div>
      <ol className="m-0 mt-3 flex list-none flex-col gap-2 p-0">
        {DAYS.map(({ day, emoji, text }, index) => (
          <motion.li
            key={day}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + index * 0.15, duration: 0.4, ease: [...EASE] }}
            className="flex items-center gap-3 text-sm"
          >
            <span className="w-11 shrink-0 text-[10px] font-semibold uppercase tracking-widest text-primary">
              {day}
            </span>
            <span aria-hidden="true">{emoji}</span>
            <span className="truncate text-base-content/75">{text}</span>
          </motion.li>
        ))}
      </ol>
      <div className="mt-3 border-t border-base-300 pt-3">
        <div className="flex items-baseline justify-between text-xs">
          <span className="text-base-content/50">Budget</span>
          <span className="font-medium text-base-content">
            €496 <span className="text-base-content/50">of €800</span>
          </span>
        </div>
        <div
          className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-base-300"
          role="img"
          aria-label="Sample budget: €496 spent of €800"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${BUDGET_SPENT * 100}%` }}
            transition={{ delay: 1.7, duration: 0.8, ease: [...EASE] }}
            className="h-full rounded-full bg-primary"
          />
        </div>
      </div>
    </motion.aside>
  );
}

export default ItineraryRail;
