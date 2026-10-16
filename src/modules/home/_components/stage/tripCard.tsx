import { withBase } from "../../../../utils/basePath";

export interface TripSettings {
  /** Index into home.useCases.cards. */
  type: number;
  departsIn: number;
  remindBefore: number;
  length: number;
}

export interface TripCardLabels {
  tripName: string;
  typeName: string;
  daysToGo: string;
  remind: string;
  day: string;
  nDays: string;
  nDaysBefore: string;
}

interface Props {
  trip: TripSettings;
  labels: TripCardLabels;
  /** Set after mount only, so the static HTML never carries a stale date. */
  today: Date | null;
  lang: string;
}

const DAY_MS = 86_400_000;
const MAX_DAY_ROWS = 6;

export const fill = (pattern: string, n: number) => pattern.replace("{n}", String(n));

/**
 * The trip as the app lists it: cover, name, dates, the countdown and the
 * departure reminder, then the days of the itinerary. Built in HTML at true
 * size so the visitor's own choices show up in it.
 */
function TripCard({ trip, labels, today, lang }: Props) {
  const start = today ? new Date(today.getTime() + trip.departsIn * DAY_MS) : null;
  const end = start ? new Date(start.getTime() + (trip.length - 1) * DAY_MS) : null;
  const reminder = start ? new Date(start.getTime() - trip.remindBefore * DAY_MS) : null;
  const short = new Intl.DateTimeFormat(lang, { day: "numeric", month: "short" });
  const weekday = new Intl.DateTimeFormat(lang, { weekday: "short", day: "numeric", month: "short" });

  const rows = Math.min(trip.length, MAX_DAY_ROWS);
  const rest = trip.length - rows;

  return (
    <div data-ui className="ts-ui ts-trip-card" aria-live="polite">
      <img
        src={withBase("/images/world/lisbon-se.webp")}
        alt="Tram 28 passing Lisbon Cathedral, used as the trip's cover photo"
        width={900}
        height={1098}
        loading="lazy"
        className="ts-trip-card__cover"
      />
      <div className="ts-trip-card__body">
        <div className="ts-trip-card__title-row">
          <p className="ts-trip-card__name">{labels.tripName}</p>
          <span className="ts-trip-card__chip">{labels.typeName}</span>
        </div>
        <p className="ts-trip-card__dates tabular">
          {start && end ? `${short.format(start)} – ${short.format(end)}` : fill(labels.nDays, trip.length)}
        </p>

        <div className="ts-trip-card__countdown">
          <span className="ts-trip-card__count tabular">{trip.departsIn}</span>
          <span className="ts-trip-card__count-label">{labels.daysToGo}</span>
        </div>

        <p className="ts-trip-card__reminder">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm7-5-1.6-1.6V11a5.4 5.4 0 0 0-4.4-5.3V5a1 1 0 1 0-2 0v.7A5.4 5.4 0 0 0 6.6 11v4.4L5 17v1h14v-1Z"
            />
          </svg>
          <span>{labels.remind}</span>
          <span className="ts-trip-card__reminder-value tabular">
            {reminder ? weekday.format(reminder) : fill(labels.nDaysBefore, trip.remindBefore)}
          </span>
        </p>

        <ol className="ts-trip-card__days">
          {Array.from({ length: rows }, (_, i) => (
            <li key={i}>
              <span className="ts-trip-card__day">
                {labels.day} {i + 1}
              </span>
              <span className="tabular">
                {start ? weekday.format(new Date(start.getTime() + i * DAY_MS)) : ""}
              </span>
            </li>
          ))}
          {rest > 0 && <li className="ts-trip-card__more">+ {fill(labels.nDays, rest)}</li>}
        </ol>
      </div>
    </div>
  );
}

export default TripCard;
