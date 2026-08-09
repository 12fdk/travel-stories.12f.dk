/**
 * Types for the packing list generator.
 *
 * Kept in their own module so both the server-rendered curated pages and the
 * client-side island import the same definitions — the two can never drift.
 */

export const TRIP_TYPES = [
  "beach",
  "city",
  "hiking",
  "business",
  "ski",
  "backpacking",
] as const;
export type TripType = (typeof TRIP_TYPES)[number];

export const CLIMATES = ["hot", "tropical", "mild", "cold"] as const;
export type Climate = (typeof CLIMATES)[number];

export const CATEGORY_IDS = [
  "documents",
  "clothing",
  "toiletries",
  "health",
  "tech",
  "gear",
  "kids",
] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];

export interface PackingOptions {
  type: TripType;
  /** Nights away. Drives clothing quantities and the laundry threshold. */
  days: number;
  climate: Climate;
  carryOnOnly: boolean;
  checkedBag: boolean;
  kids: boolean;
}

/** A single line on the finished list. */
export interface PackingItem {
  /** Stable across option changes, so checkbox state survives a re-generate. */
  id: string;
  label: string;
  /** The reason it's on the list. Short — this is a checklist, not an essay. */
  note?: string;
  category: CategoryId;
}

/**
 * An item as authored in the rules, before quantities are resolved. Label and
 * note may both depend on the options — a count that scales with duration, or
 * advice that only applies in the cold.
 */
export interface ItemSpec extends Omit<PackingItem, "label" | "note"> {
  label: string | ((o: PackingOptions) => string);
  note?: string | ((o: PackingOptions) => string | undefined);
}

/** Conditions under which a rule's items join the list. All must match. */
export interface RuleCondition {
  types?: readonly TripType[];
  climates?: readonly Climate[];
  minDays?: number;
  maxDays?: number;
  carryOnOnly?: boolean;
  checkedBag?: boolean;
  kids?: boolean;
}

export interface Rule {
  when?: RuleCondition;
  items: readonly ItemSpec[];
}

export interface PackingSection {
  id: CategoryId;
  title: string;
  items: PackingItem[];
}

export const CATEGORY_TITLES: Record<CategoryId, string> = {
  documents: "Documents & money",
  clothing: "Clothing",
  toiletries: "Toiletries",
  health: "Health & medication",
  tech: "Tech",
  gear: "Gear & extras",
  kids: "Travelling with kids",
};

export const TRIP_TYPE_LABELS: Record<TripType, string> = {
  beach: "Beach holiday",
  city: "City break",
  hiking: "Hiking",
  business: "Business trip",
  ski: "Ski trip",
  backpacking: "Backpacking",
};

export const CLIMATE_LABELS: Record<Climate, string> = {
  hot: "Hot and dry",
  tropical: "Hot and humid",
  mild: "Mild",
  cold: "Cold",
};

/** Durations offered in the hub. Curated pages may use any number. */
export const DURATION_CHOICES = [2, 3, 4, 5, 7, 10, 14, 21] as const;

export const DEFAULT_OPTIONS: PackingOptions = {
  type: "city",
  days: 7,
  climate: "mild",
  carryOnOnly: false,
  checkedBag: true,
  kids: false,
};
