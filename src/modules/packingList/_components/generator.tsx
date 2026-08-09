import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  buildPackingList,
  countItems,
  describeOptions,
  optionsFromQuery,
  optionsToQuery,
  sectionsToText,
  CLIMATES,
  CLIMATE_LABELS,
  DURATION_CHOICES,
  TRIP_TYPES,
  TRIP_TYPE_LABELS,
  type Climate,
  type PackingItem,
  type PackingOptions,
  type TripType,
} from "../../../data/packingList";
import ListView from "./listView";
import { withCampaign } from "../../../utils/appStoreCampaign";

interface Props {
  /** Server-rendered configuration. The URL query overrides it after mount. */
  initialOptions: PackingOptions;
  /** Scenario-specific items from a curated page. */
  extras?: PackingItem[];
  /** Curated pages already have their own H1/intro and hide the controls' heading. */
  heading?: string;
  /** Where the App Store CTA points. Optional, as it is in the site config. */
  appStoreLink?: string;
  storageKey: string;
}

type Action = "copy" | "download" | null;

const TOGGLES: { key: "carryOnOnly" | "checkedBag" | "kids"; label: string }[] = [
  { key: "carryOnOnly", label: "Carry-on only" },
  { key: "checkedBag", label: "Checked bag" },
  { key: "kids", label: "Travelling with kids" },
];

function Generator({
  initialOptions,
  extras = [],
  heading,
  appStoreLink,
  storageKey,
}: Props) {
  const [options, setOptions] = useState<PackingOptions>(initialOptions);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [confirmation, setConfirmation] = useState<Action>(null);
  const [hydrated, setHydrated] = useState(false);
  const confirmationTimer = useRef<number>();

  // Read shared state out of the URL and any previous progress out of storage.
  // Deliberately in an effect rather than during render: the server has no
  // access to either, and reading them during render would make the first
  // client render disagree with the HTML it is hydrating.
  useEffect(() => {
    setHydrated(true);
    const query = window.location.search;
    if (query.length > 1) {
      setOptions(optionsFromQuery(query, initialOptions));
    }
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) setChecked(JSON.parse(saved));
    } catch {
      // Private browsing, or someone hand-edited the value. Start fresh.
    }
    // initialOptions is a build-time constant for this page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(checked));
    } catch {
      // Storage full or blocked — the list still works, it just won't persist.
    }
  }, [checked, hydrated, storageKey]);

  const sections = useMemo(
    () => buildPackingList(options, extras),
    [options, extras],
  );
  const total = countItems(sections);
  const packed = sections.reduce(
    (sum, section) =>
      sum + section.items.filter((item) => checked[item.id]).length,
    0,
  );

  const summary = describeOptions(options);
  const listTitle = heading ?? `Packing list — ${summary}`;

  const update = useCallback(
    (patch: Partial<PackingOptions>) => {
      setOptions((current) => {
        const next = { ...current, ...patch };
        // Carry-on only and a checked bag contradict each other; whichever the
        // visitor just touched wins, so the toggles never both read as true.
        if (patch.carryOnOnly) next.checkedBag = false;
        if (patch.checkedBag) next.carryOnOnly = false;
        // Shareable: the configuration lives in the query string. Written with
        // replaceState so the canonical URL stays clean until something changes.
        if (typeof window !== "undefined") {
          window.history.replaceState(
            null,
            "",
            `${window.location.pathname}?${optionsToQuery(next)}`,
          );
        }
        return next;
      });
    },
    [],
  );

  const toggle = useCallback((id: string) => {
    setChecked((current) => ({ ...current, [id]: !current[id] }));
  }, []);

  const flash = (action: Action) => {
    setConfirmation(action);
    window.clearTimeout(confirmationTimer.current);
    confirmationTimer.current = window.setTimeout(
      () => setConfirmation(null),
      2500,
    );
  };
  useEffect(() => () => window.clearTimeout(confirmationTimer.current), []);

  const asText = () => sectionsToText(sections, listTitle);

  const copy = async () => {
    const text = asText();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard API needs a secure context and a permission the browser may
      // withhold. The old execCommand path still works where it doesn't.
      const area = document.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }
    flash("copy");
  };

  const download = () => {
    const blob = new Blob([asText()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `packing-list-${options.type}-${options.days}-day.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    flash("download");
  };

  const reset = () => setChecked({});

  return (
    <div>
      <form
        className="packing-list-controls rounded-box border border-base-300 bg-base-200/60 p-5 sm:p-6"
        onSubmit={(event) => event.preventDefault()}
        aria-label="Packing list options"
      >
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label
              htmlFor="trip-type"
              className="mb-1.5 block text-sm font-semibold"
            >
              Trip type
            </label>
            <select
              id="trip-type"
              className="select select-bordered w-full bg-base-100"
              value={options.type}
              onChange={(event) =>
                update({ type: event.target.value as TripType })
              }
            >
              {TRIP_TYPES.map((type) => (
                <option key={type} value={type}>
                  {TRIP_TYPE_LABELS[type]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="trip-days"
              className="mb-1.5 block text-sm font-semibold"
            >
              How long
            </label>
            <select
              id="trip-days"
              className="select select-bordered w-full bg-base-100"
              value={options.days}
              onChange={(event) =>
                update({ days: Number(event.target.value) })
              }
            >
              {DURATION_CHOICES.map((days) => (
                <option key={days} value={days}>
                  {days} days
                </option>
              ))}
              {!DURATION_CHOICES.includes(
                options.days as (typeof DURATION_CHOICES)[number],
              ) && (
                <option value={options.days}>{options.days} days</option>
              )}
            </select>
          </div>

          <div>
            <label
              htmlFor="trip-climate"
              className="mb-1.5 block text-sm font-semibold"
            >
              Climate
            </label>
            <select
              id="trip-climate"
              className="select select-bordered w-full bg-base-100"
              value={options.climate}
              onChange={(event) =>
                update({ climate: event.target.value as Climate })
              }
            >
              {CLIMATES.map((climate) => (
                <option key={climate} value={climate}>
                  {CLIMATE_LABELS[climate]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <fieldset className="mt-5">
          <legend className="mb-2 text-sm font-semibold">Also</legend>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {TOGGLES.map(({ key, label }) => (
              <label
                key={key}
                htmlFor={`opt-${key}`}
                className="flex cursor-pointer items-center gap-2 text-sm font-medium"
              >
                <input
                  type="checkbox"
                  id={`opt-${key}`}
                  className="checkbox checkbox-primary checkbox-sm"
                  checked={options[key]}
                  onChange={(event) =>
                    update({ [key]: event.target.checked } as Partial<PackingOptions>)
                  }
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
      </form>

      <div className="packing-list-summary mt-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="m-0 text-2xl font-bold">Your list</h2>
          <p className="m-0 mt-1 text-base-content/70">
            {/* first-letter, not `capitalize` — that title-cases every word. */}
            <span className="inline-block first-letter:uppercase">{summary}</span> ·{" "}
            <span aria-live="polite">
              {packed} of {total} packed
            </span>
          </p>
        </div>
        <div className="packing-list-actions flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-sm border-base-300 bg-base-100 hover:bg-base-200"
            onClick={() => window.print()}
          >
            Print
          </button>
          <button
            type="button"
            className="btn btn-sm border-base-300 bg-base-100 hover:bg-base-200"
            onClick={copy}
          >
            {confirmation === "copy" ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            className="btn btn-sm border-base-300 bg-base-100 hover:bg-base-200"
            onClick={download}
          >
            {confirmation === "download" ? "Downloaded" : "Download .txt"}
          </button>
          {packed > 0 && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={reset}
            >
              Clear ticks
            </button>
          )}
        </div>
      </div>

      <p className="sr-only" role="status">
        {confirmation === "copy" && "List copied to the clipboard."}
        {confirmation === "download" && "List downloaded as a text file."}
      </p>

      {/* Paper only — the printed sheet still needs to say what it is. */}
      <h2 className="packing-list-print-title">{listTitle}</h2>
      <p className="packing-list-print-meta">
        {total} items · {summary} · travel-stories.12f.dk/packing-list/
      </p>

      <div className="mt-6">
        <ListView sections={sections} checked={checked} onToggle={toggle} />
      </div>

      {appStoreLink && (
      <aside className="packing-list-cta mt-4 rounded-box border border-primary/20 bg-primary/5 p-6 sm:p-8">
        <h2 className="m-0 text-xl font-bold sm:text-2xl">
          Take this list with you
        </h2>
        <p className="mb-5 mt-2 max-w-2xl text-base-content/75">
          A printed list stays at home in the drawer. Travel Stories keeps the
          same checklist on your phone next to the itinerary, the bookings and
          the budget — offline, free, and reusable on the next trip so you never
          start from a blank page again.
        </p>
        <a
          href={withCampaign(appStoreLink, "packing-list")}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="packing-list-app-cta"
          className="btn border-none bg-primary text-primary-content shadow-md shadow-primary/30 hover:brightness-110"
        >
          Open this list in Travel Stories — free
        </a>
      </aside>
      )}
    </div>
  );
}

export default Generator;
