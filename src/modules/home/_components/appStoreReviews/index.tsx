import { motion } from "framer-motion";
import AnimatedText from "../../../../components/animatedText";
import {
  MIN_REVIEWS_TO_SHOW,
  type AppStoreReview,
} from "../../../../utils/appStoreData";

interface Props {
  reviews: AppStoreReview[];
}

/**
 * Social proof from REAL App Store reviews only (#33). Trust-gated: renders
 * nothing until enough real written reviews exist — never invented quotes.
 * Each card is attributed to the reviewer's public App Store nickname and
 * storefront, quoted verbatim.
 */
function AppStoreReviews({ reviews }: Props) {
  if (reviews.length < MIN_REVIEWS_TO_SHOW) return null;

  const shown = reviews.slice(0, 6);

  return (
    <section id="reviews" className="mx-auto max-w-screen-lg px-4 py-16 md:py-24">
      <div className="mb-12 max-w-none flex flex-col items-center prose prose-lg text-center">
        <h2 className="mb-0">
          <AnimatedText text="What travelers say" />
        </h2>
        <motion.p
          initial={{ y: "50%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true }}
          className="text-xl max-w-lg text-base-content"
        >
          Real reviews from the App Store, quoted as written.
        </motion.p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((review, index) => (
          <motion.figure
            key={`${review.name}-${index}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: (index % 3) * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="m-0 flex flex-col rounded-box border border-base-300 bg-base-100 p-6 shadow-sm"
          >
            <div
              className="flex text-yellow-400"
              aria-label={`${review.rating} out of 5 stars`}
              role="img"
            >
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 fill-current ${i < review.rating ? "" : "opacity-25"}`}
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            {review.title && (
              <p className="mt-3 mb-0 font-semibold text-base-content">{review.title}</p>
            )}
            <blockquote className="mt-2 flex-1 text-base-content/75">
              “{review.content}”
            </blockquote>
            <figcaption className="mt-4 text-sm text-base-content/50">
              {review.name} · App Store review ({review.country})
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

export default AppStoreReviews;
