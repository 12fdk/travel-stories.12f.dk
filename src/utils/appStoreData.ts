// App Store data fetcher for build-time data loading
// Fetches app metadata from iTunes Lookup API

export interface AppStoreData {
  trackName: string;
  description: string;
  version: string;
  artworkUrl512: string;
  artworkUrl100: string;
  artworkUrl60: string;
  averageUserRating: number;
  userRatingCount: number;
  price: number;
  formattedPrice: string;
  minimumOsVersion: string;
  fileSizeBytes: string;
  releaseDate: string;
  currentVersionReleaseDate: string;
  sellerName: string;
  primaryGenreName: string;
}

interface AppStoreApiResponse {
  resultCount: number;
  results: AppStoreData[];
}

const APP_ID = "6756801168";
// US storefront: the largest review pool, so the trust-gated rating unlocks
// as early as possible (see #17). Override with APP_STORE_COUNTRY if needed.
const COUNTRY = process.env.APP_STORE_COUNTRY ?? "us";
const API_URL = `https://itunes.apple.com/lookup?id=${APP_ID}&country=${COUNTRY}`;

export async function fetchAppStoreData(): Promise<AppStoreData | null> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      console.warn(`App Store API returned ${response.status}`);
      return null;
    }

    const data: AppStoreApiResponse = await response.json();

    if (data.resultCount === 0 || !data.results[0]) {
      console.warn("No app found in App Store API response");
      return null;
    }

    return data.results[0];
  } catch (error) {
    console.error("Failed to fetch App Store data:", error);
    return null;
  }
}

// Fallback data for when API fails
export const fallbackAppStoreData: AppStoreData = {
  trackName: "Travel Stories - Trip Planner",
  description:
    "Your all-in-one travel companion for planning, organising, and remembering every adventure.",
  version: "1.0.0",
  artworkUrl512: "/logo.svg",
  artworkUrl100: "/logo.svg",
  artworkUrl60: "/logo.svg",
  averageUserRating: 0,
  userRatingCount: 0,
  price: 0,
  formattedPrice: "Free",
  minimumOsVersion: "17.0",
  fileSizeBytes: "0",
  releaseDate: "",
  currentVersionReleaseDate: "",
  sellerName: "Robert Jensen",
  primaryGenreName: "Travel",
};

// Metadata structure for use in config
export interface AppStoreMetadata {
  version: string;
  rating: number;
  ratingCount: number;
  price: string;
  minimumOsVersion: string;
  lastUpdated: string;
  appIconUrl: string;
  description: string;
}

// Convert API data to config-friendly metadata
export function toAppStoreMetadata(data: AppStoreData): AppStoreMetadata {
  return {
    version: data.version,
    rating: data.averageUserRating,
    ratingCount: data.userRatingCount,
    price: data.formattedPrice,
    minimumOsVersion: data.minimumOsVersion,
    lastUpdated: data.currentVersionReleaseDate,
    appIconUrl: data.artworkUrl512,
    description: data.description,
  };
}

// ---------------------------------------------------------------------------
// Real customer reviews (#33). Fetched at build time from Apple's public
// review RSS feeds across major storefronts. The testimonials section is
// trust-gated: it renders only when there are enough real, positive written
// reviews — never invented quotes.
// ---------------------------------------------------------------------------

export interface AppStoreReview {
  /** Reviewer's App Store nickname, as published by Apple. */
  name: string;
  rating: number;
  title: string;
  content: string;
  /** Uppercase storefront code the review was left in (US, GB, ...). */
  country: string;
}

const REVIEW_STOREFRONTS = ["us", "gb", "ca", "au", "de", "dk", "nl", "se", "no"];
/** Minimum usable written reviews before the section renders at all. */
export const MIN_REVIEWS_TO_SHOW = 3;
/** Only quote clearly positive reviews. */
const MIN_REVIEW_RATING = 4;

export async function fetchAppStoreReviews(): Promise<AppStoreReview[]> {
  const results = await Promise.allSettled(
    REVIEW_STOREFRONTS.map(async (country) => {
      const res = await fetch(
        `https://itunes.apple.com/${country}/rss/customerreviews/id=${APP_ID}/sortby=mostrecent/json`,
      );
      if (!res.ok) return [];
      const data = await res.json();
      let entries = data?.feed?.entry ?? [];
      if (!Array.isArray(entries)) entries = [entries];
      return entries
        .filter((e: any) => e?.["im:rating"]?.label && e?.content?.label)
        .map((e: any): AppStoreReview => ({
          name: e.author?.name?.label ?? "App Store user",
          rating: Number(e["im:rating"].label),
          title: e.title?.label ?? "",
          content: e.content.label,
          country: country.toUpperCase(),
        }));
    }),
  );

  const reviews = results
    .filter(
      (r): r is PromiseFulfilledResult<AppStoreReview[]> =>
        r.status === "fulfilled",
    )
    .flatMap((r) => r.value)
    .filter((r) => r.rating >= MIN_REVIEW_RATING)
    // Keep quotes readable on a card.
    .filter((r) => r.content.length >= 20 && r.content.length <= 400);

  // De-dupe (same nickname + text can appear under multiple storefronts).
  const seen = new Set<string>();
  return reviews.filter((r) => {
    const key = `${r.name}|${r.content}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
