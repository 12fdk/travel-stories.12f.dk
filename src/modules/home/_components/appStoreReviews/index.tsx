import type { AppStoreReview } from "../../../../utils/appStoreData";
import { MIN_REVIEWS_TO_SHOW } from "../../../../utils/reviewsGate";

interface Props {
  reviews: AppStoreReview[];
}

/**
 * Social proof from REAL App Store reviews only (#33). Trust-gated: renders
 * nothing until enough real written reviews exist, never invented quotes.
 * Each quote is attributed to the reviewer's public App Store nickname and
 * storefront, quoted verbatim.
 */
function AppStoreReviews({ reviews }: Props) {
  if (reviews.length < MIN_REVIEWS_TO_SHOW) return null;

  const shown = reviews.slice(0, 6);

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="mx-auto max-w-[1440px] px-[var(--gutter)] pt-[clamp(112px,12vw,200px)]"
    >
      <div className="mx-auto max-w-[620px] lg:ml-[22%]">
        <div data-reveal>
          <h2 id="reviews-heading" className="text-head font-light">
            What travelers say
          </h2>
          <p className="mt-4 text-body text-muted">Real reviews from the App Store, quoted as written.</p>
        </div>
        <div className="mt-14 flex flex-col gap-12" data-reveal>
          {shown.map((review, index) => (
            <figure key={`${review.name}-${index}`} className="m-0">
              <p className="sr-only">{review.rating} out of 5 stars</p>
              {review.title && <p className="text-body font-medium text-ink">{review.title}</p>}
              <blockquote className="mt-2 text-lead text-ink">“{review.content}”</blockquote>
              <figcaption className="mt-3 text-small text-muted">
                {review.name}, App Store review ({review.country}), {review.rating} of 5
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AppStoreReviews;
