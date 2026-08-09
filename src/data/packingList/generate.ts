import { RULES } from "./rules";
import {
  CATEGORY_IDS,
  CATEGORY_TITLES,
  CLIMATE_LABELS,
  CLIMATES,
  DEFAULT_OPTIONS,
  TRIP_TYPE_LABELS,
  TRIP_TYPES,
  type Climate,
  type PackingItem,
  type PackingOptions,
  type PackingSection,
  type Rule,
  type TripType,
} from "./types";

function matches(rule: Rule, o: PackingOptions): boolean {
  const w = rule.when;
  if (!w) return true;
  if (w.types && !w.types.includes(o.type)) return false;
  if (w.climates && !w.climates.includes(o.climate)) return false;
  if (w.minDays !== undefined && o.days < w.minDays) return false;
  if (w.maxDays !== undefined && o.days > w.maxDays) return false;
  if (w.carryOnOnly !== undefined && w.carryOnOnly !== o.carryOnOnly) return false;
  if (w.checkedBag !== undefined && w.checkedBag !== o.checkedBag) return false;
  if (w.kids !== undefined && w.kids !== o.kids) return false;
  return true;
}

/**
 * Build the list for a set of options.
 *
 * Pure and deterministic — the same options always produce the same list, which
 * is what lets a curated page pre-render its list at build time and the island
 * re-derive the identical one after hydration.
 *
 * `extras` are appended last so a curated page can add destination-specific
 * items without them being de-duplicated away by a generic rule of the same id.
 */
export function buildPackingList(
  options: PackingOptions,
  extras: readonly PackingItem[] = [],
): PackingSection[] {
  const seen = new Map<string, PackingItem>();
  const byCategory = new Map<string, PackingItem[]>();

  const add = (item: PackingItem, override = false) => {
    const existing = seen.get(item.id);
    if (existing) {
      // First rule to claim an id wins, so the trip-type note beats the
      // generic climate one. A curated page's own version overrides in place,
      // keeping its position rather than appearing twice further down.
      if (override) Object.assign(existing, item);
      return;
    }
    seen.set(item.id, item);
    const list = byCategory.get(item.category);
    if (list) list.push(item);
    else byCategory.set(item.category, [item]);
  };

  for (const rule of RULES) {
    if (!matches(rule, options)) continue;
    for (const spec of rule.items) {
      const note = typeof spec.note === "function" ? spec.note(options) : spec.note;
      add({
        id: spec.id,
        category: spec.category,
        label: typeof spec.label === "function" ? spec.label(options) : spec.label,
        ...(note ? { note } : {}),
      });
    }
  }
  for (const extra of extras) add({ ...extra }, true);

  return CATEGORY_IDS.map((id) => ({
    id,
    title: CATEGORY_TITLES[id],
    items: byCategory.get(id) ?? [],
  })).filter((section) => section.items.length > 0);
}

export function countItems(sections: readonly PackingSection[]): number {
  return sections.reduce((total, section) => total + section.items.length, 0);
}

/** Human summary of a configuration — used in headings, alt text and exports. */
export function describeOptions(o: PackingOptions): string {
  const parts = [
    `${o.days}-day ${TRIP_TYPE_LABELS[o.type].toLowerCase()}`,
    `${CLIMATE_LABELS[o.climate].toLowerCase()} weather`,
  ];
  if (o.carryOnOnly) parts.push("carry-on only");
  else if (o.checkedBag) parts.push("with a checked bag");
  if (o.kids) parts.push("travelling with kids");
  return parts.join(", ");
}

// ---------------------------------------------------------------------------
// URL state. A configured list has to be shareable, so the options round-trip
// through the query string: ?type=beach&days=7&climate=hot&carryon=1
// ---------------------------------------------------------------------------

export function optionsToQuery(o: PackingOptions): string {
  const params = new URLSearchParams({
    type: o.type,
    days: String(o.days),
    climate: o.climate,
  });
  if (o.carryOnOnly) params.set("carryon", "1");
  if (o.checkedBag) params.set("checked", "1");
  if (o.kids) params.set("kids", "1");
  return params.toString();
}

const isTripType = (v: string | null): v is TripType =>
  !!v && (TRIP_TYPES as readonly string[]).includes(v);
const isClimate = (v: string | null): v is Climate =>
  !!v && (CLIMATES as readonly string[]).includes(v);

/** Anything unparseable falls back to `base` — a bad link still renders a list. */
export function optionsFromQuery(
  query: string | URLSearchParams,
  base: PackingOptions = DEFAULT_OPTIONS,
): PackingOptions {
  const params =
    typeof query === "string" ? new URLSearchParams(query) : query;

  const rawDays = Number.parseInt(params.get("days") ?? "", 10);
  const days = Number.isFinite(rawDays)
    ? Math.min(Math.max(rawDays, 1), 60)
    : base.days;

  const flag = (key: string, fallback: boolean) => {
    const value = params.get(key);
    if (value === null) return fallback;
    return value === "1" || value === "true";
  };

  const carryOnOnly = flag("carryon", base.carryOnOnly);
  return {
    type: isTripType(params.get("type")) ? (params.get("type") as TripType) : base.type,
    days,
    climate: isClimate(params.get("climate"))
      ? (params.get("climate") as Climate)
      : base.climate,
    carryOnOnly,
    // Carry-on only and a checked bag are contradictory; the former wins.
    checkedBag: carryOnOnly ? false : flag("checked", base.checkedBag),
    kids: flag("kids", base.kids),
  };
}

/** Plain-text export, shared by the copy and download actions. */
export function sectionsToText(
  sections: readonly PackingSection[],
  heading: string,
): string {
  const lines: string[] = [heading, "=".repeat(heading.length), ""];
  for (const section of sections) {
    lines.push(section.title.toUpperCase());
    for (const item of section.items) {
      // Middot, not an em dash: the notes contain em dashes of their own.
      lines.push(`[ ] ${item.label}${item.note ? ` · ${item.note}` : ""}`);
    }
    lines.push("");
  }
  lines.push("Generated with Travel Stories — https://travel-stories.12f.dk/packing-list/");
  return lines.join("\n");
}
