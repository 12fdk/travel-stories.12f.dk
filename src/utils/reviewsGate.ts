/**
 * Minimum usable written reviews before the reviews section renders at all.
 * Kept apart from appStoreData.ts, which reads process.env at module load
 * and so must never be imported into browser code.
 */
export const MIN_REVIEWS_TO_SHOW = 3;
