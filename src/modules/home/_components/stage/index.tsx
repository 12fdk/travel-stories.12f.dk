import { useContext, useEffect, useRef, useState } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import { withBase } from "../../../../utils/basePath";
import { withCampaign } from "../../../../utils/appStoreCampaign";
import { getLocale, DEFAULT_LOCALE } from "../../../../i18n/locales";
import AppleGlyph from "../../../../components/appleGlyph";
import TripCard, { fill, type TripSettings } from "./tripCard";

/** The app screen that stands on the photograph for each part of the story. */
const HERO_SCREEN = "/screenshots/trips-list.webp";
const FEATURE_SCREENS = [
  "/screenshots/itinerary.webp",
  "/screenshots/budget-overview.webp",
  "/screenshots/packing-list.webp",
  "/screenshots/trip-detail.webp",
];
const STEP_SCREENS = [
  "/screenshots/create-trip.webp",
  "/screenshots/itinerary.webp",
  "/screenshots/booking-detail.webp",
  "/screenshots/budget-overview.webp",
  "/screenshots/cover-photo.webp",
];
const ALL_SCREENS = Array.from(new Set([HERO_SCREEN, ...FEATURE_SCREENS, ...STEP_SCREENS]));

const SCREEN_ALT: Record<string, string> = {
  "/screenshots/trips-list.webp": "Travel Stories trips list with three upcoming trips and their budgets",
  "/screenshots/itinerary.webp": "Day-by-day itinerary with bookings and events",
  "/screenshots/budget-overview.webp": "Trip detail with the budget overview chart",
  "/screenshots/packing-list.webp": "Packing list with progress and categories",
  "/screenshots/trip-detail.webp": "Trip detail screen, available offline",
  "/screenshots/create-trip.webp": "Create trip screen with destination and dates",
  "/screenshots/booking-detail.webp": "Booking detail with confirmation number",
  "/screenshots/cover-photo.webp": "Choosing a cover photo for the trip",
};

const DEFAULT_TRIP: TripSettings = { type: 0, departsIn: 45, remindBefore: 7, length: 5 };

/**
 * The split stage (design direction, #88). On wide screens the left half is
 * one photograph of a real street that never moves, with the app screen
 * standing on it; the right column reads down the trip and the screen
 * changes to match. On a phone the stage is the top of the hero, and each
 * section carries its own picture.
 */
function SplitStage() {
  const {
    appStoreLink,
    ui,
    locale = DEFAULT_LOCALE,
    home: { header, features, howItWorks, useCases, capabilities, facts },
  } = useContext(ConfigContext)!;

  const [stage, setStage] = useState<string>("hero");
  const [feature, setFeature] = useState(0);
  const [trip, setTrip] = useState<TripSettings>(DEFAULT_TRIP);
  const [today, setToday] = useState<Date | null>(null);
  const columnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const now = new Date();
    now.setHours(12, 0, 0, 0);
    setToday(now);
  }, []);

  // Whichever block crosses the middle of the viewport owns the stage.
  useEffect(() => {
    const column = columnRef.current;
    if (!column || !("IntersectionObserver" in window)) return;
    const blocks = column.querySelectorAll<HTMLElement>("[data-stage]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setStage(entry.target.getAttribute("data-stage")!);
        });
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  const screenFor = (key: string) => {
    if (key === "feature") return FEATURE_SCREENS[feature] ?? HERO_SCREEN;
    if (key.startsWith("step-")) return STEP_SCREENS[Number(key.slice(5))] ?? HERO_SCREEN;
    return HERO_SCREEN;
  };
  const activeScreen = screenFor(stage);
  const showCard = stage === "live";

  const lang = getLocale(locale)?.hreflang ?? "en";
  const live = ui?.live ?? {
    departs: "Departs in",
    length: "Trip length",
    remind: "Reminder",
    nDays: "{n} days",
    nDaysBefore: "{n} days before",
    daysToGo: "days to go",
    tripName: "Porto & Lisbon",
  };
  const cardLabels = {
    tripName: live.tripName,
    typeName: useCases?.cards[trip.type]?.title ?? "",
    daysToGo: live.daysToGo,
    remind: live.remind,
    day: ui?.sampleTrip.day ?? "Day",
    nDays: live.nDays,
    nDaysBefore: live.nDaysBefore,
  };

  const card = <TripCard trip={trip} labels={cardLabels} today={today} lang={lang} />;
  const set = (patch: Partial<TripSettings>) => setTrip((t) => ({ ...t, ...patch }));

  return (
    <div className="ts-split">
      {/* The fixed half. Decorative on its own: every screen it shows is
          also described in the column beside it. */}
      <div className="ts-split__stage" aria-hidden="true">
        <div className="ts-stage">
          <img
            src={withBase("/images/world/lisbon-tram.webp")}
            srcSet={`${withBase("/images/world/lisbon-tram-640.webp")} 640w, ${withBase("/images/world/lisbon-tram.webp")} 1100w`}
            sizes="(max-width: 1023px) 100vw, 47vw"
            alt=""
            width={1100}
            height={1450}
            {...{ fetchpriority: "high" }}
            className="ts-stage__photo ts-drift"
          />
          <div className={`ts-stage__screens${showCard ? " is-hidden" : ""}`}>
            {ALL_SCREENS.map((src) => (
              <img
                key={src}
                src={withBase(src)}
                alt=""
                width={1206}
                height={2622}
                loading={src === HERO_SCREEN ? "eager" : "lazy"}
                className={`ts-stage__screen${src === activeScreen ? " is-active" : ""}`}
              />
            ))}
          </div>
          <div className={`ts-stage__card${showCard ? " is-active" : ""}`}>{card}</div>
        </div>
      </div>

      <div className="ts-split__column" ref={columnRef}>
        {/* ---------------------------------------------------------------- Hero */}
        <section id={header.id} aria-labelledby="hero-headline" className="ts-hero" data-stage="hero">
          <div className="ts-hero__text" data-reveal>
            <h1 id="hero-headline" className="text-head font-light text-ink">
              {header.headline}
            </h1>
            <p className="max-w-[36ch] text-lead text-ink" data-speakable>
              {header.subtitle}
            </p>
            {appStoreLink && (
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <a
                  href={withCampaign(appStoreLink, "hero")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="hero-app-store-click"
                  aria-label={`${ui?.downloadFree ?? "Download free"}: Travel Stories on the App Store`}
                  className="ts-button"
                >
                  <AppleGlyph className="h-5 w-5" />
                  {ui?.downloadFree ?? "Download free"}
                </a>
                <span className="text-small text-muted">
                  {(ui?.trustRow ?? []).join(" · ")}
                </span>
              </div>
            )}
          </div>
          <p className="ts-wordmark ts-wordmark-shrink" aria-hidden="true">
            <span>travel</span>
            <span>stories</span>
          </p>
        </section>

        {/* -------------------------------------------------------- At a glance */}
        {facts?.length ? (
          <section aria-label="At a glance" className="ts-block ts-block--tight" data-stage="hero">
            <dl className="ts-facts" data-reveal>
              {facts.map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-small text-muted">{label}</dt>
                  <dd className="text-lead text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {/* ------------------------------------------------------- Showcase */}
        {features && (
          <section
            id={features.id}
            aria-labelledby="features-heading"
            className="ts-block"
            data-stage="feature"
          >
            <h2 id="features-heading" className="sr-only">
              {features.title}
            </h2>
            <div data-reveal>
              {features.subtitle && <p className="max-w-[40ch] text-lead text-muted">{features.subtitle}</p>}
              <div className="ts-index" role="group" aria-label={features.title}>
                {features.cards.map((card, i) => (
                  <button
                    key={card.title}
                    type="button"
                    aria-pressed={feature === i}
                    onClick={() => setFeature(i)}
                    onMouseEnter={() => setFeature(i)}
                    onFocus={() => setFeature(i)}
                    className="ts-index__item text-head font-light"
                  >
                    {card.title}
                  </button>
                ))}
              </div>
              <p className="ts-index__note max-w-[46ch] text-body text-ink" aria-live="polite">
                {features.cards[feature]?.subtitle}
              </p>
              <div className="ts-inline-stage lg:hidden">
                <img
                  src={withBase(FEATURE_SCREENS[feature])}
                  alt={SCREEN_ALT[FEATURE_SCREENS[feature]] ?? ""}
                  width={1206}
                  height={2622}
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        )}

        {/* --------------------------------------------------- How it works */}
        {howItWorks && (
          <section
            id={howItWorks.id}
            aria-labelledby="how-it-works-heading"
            className="ts-block"
          >
            <div data-reveal>
              <h2 id="how-it-works-heading" className="text-head font-light">
                {howItWorks.title}
              </h2>
              {howItWorks.subtitle && <p className="mt-5 max-w-[40ch] text-lead text-muted">{howItWorks.subtitle}</p>}
            </div>
            <ol className="ts-steps" role="list">
              {howItWorks.steps.map((step, i) => (
                <li key={step.title} data-stage={`step-${i}`} data-reveal>
                  <p className="text-body text-muted">
                    <strong className="font-medium text-ink">{step.title}.</strong> {step.subtitle}
                  </p>
                  <img
                    src={withBase(step.image)}
                    alt={step.title}
                    width={784}
                    height={1168}
                    loading="lazy"
                    className="ts-steps__evidence"
                  />
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* ------------------------------------------------- The live trip */}
        {useCases && (
          <section
            id={useCases.id}
            aria-labelledby="use-cases-heading"
            className="ts-block ts-live"
            data-stage="live"
          >
            <div data-reveal>
              <h2 id="use-cases-heading" className="text-head font-light">
                {useCases.title}
              </h2>
              {useCases.subtitle && <p className="mt-5 max-w-[40ch] text-lead text-muted">{useCases.subtitle}</p>}
            </div>

            <div className="ts-live__inline lg:hidden">{card}</div>

            <div className="ts-live__block" data-reveal>
              <p className="text-lead text-ink">{useCases.cards[trip.type]?.title}</p>
              <p className="text-body text-muted" aria-live="polite">
                {useCases.cards[trip.type]?.subtitle}
              </p>
              <div className="ts-choice" role="group" aria-label={useCases.title}>
                {useCases.cards.map((c, i) => (
                  <button
                    key={c.title}
                    type="button"
                    aria-pressed={trip.type === i}
                    onClick={() => set({ type: i })}
                    className="ts-choice__item"
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            </div>

            {capabilities?.cards[0] && (
              <div className="ts-live__block" data-reveal>
                <p className="text-lead text-ink">{capabilities.cards[0].title}</p>
                <p className="text-body text-muted">{capabilities.cards[0].subtitle}</p>
                <Range
                  label={live.departs}
                  value={trip.departsIn}
                  min={1}
                  max={180}
                  display={fill(live.nDays, trip.departsIn)}
                  onChange={(v) => set({ departsIn: v, remindBefore: Math.min(trip.remindBefore, v) })}
                />
              </div>
            )}

            {capabilities?.cards[1] && (
              <div className="ts-live__block" data-reveal>
                <p className="text-lead text-ink">{capabilities.cards[1].title}</p>
                <p className="text-body text-muted">{capabilities.cards[1].subtitle}</p>
                <Range
                  label={live.remind}
                  value={trip.remindBefore}
                  min={1}
                  max={Math.min(30, trip.departsIn)}
                  display={fill(live.nDaysBefore, trip.remindBefore)}
                  onChange={(v) => set({ remindBefore: v })}
                />
              </div>
            )}

            {features?.cards[0] && (
              <div className="ts-live__block" data-reveal>
                <p className="text-lead text-ink">{features.cards[0].title}</p>
                <p className="text-body text-muted">{features.cards[0].subtitle}</p>
                <Range
                  label={live.length}
                  value={trip.length}
                  min={1}
                  max={21}
                  display={fill(live.nDays, trip.length)}
                  onChange={(v) => set({ length: v })}
                />
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}

interface RangeProps {
  label: string;
  value: number;
  min: number;
  max: number;
  display: string;
  onChange: (value: number) => void;
}

function Range({ label, value, min, max, display, onChange }: RangeProps) {
  return (
    <label className="ts-range">
      <span className="ts-range__row">
        <span className="text-small text-muted">{label}</span>
        <span className="tabular text-body text-ink">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.currentTarget.value))}
      />
    </label>
  );
}

export default SplitStage;
