import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/a11y";

import AnimatedText from "../../../../components/animatedText";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import { Autoplay, A11y, Keyboard } from "swiper/modules";

function Testimonials() {
  const {
    home: { testimonials },
  } = useContext(ConfigContext)!;
  if (!testimonials) return null;

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="max-w-screen-lg mx-auto px-4 py-12"
    >
      <div className="mb-6 max-w-none flex flex-col items-center prose prose-lg text-center">
        <h2 id="testimonials-heading" className="mb-0">
          <AnimatedText text={testimonials.title} />
        </h2>
        <motion.p
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: true }}
          className="text-xl max-w-lg text-base-content"
        >
          {testimonials.subtitle}
        </motion.p>
      </div>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
      >
        <Swiper
          loop
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          a11y={{
            enabled: true,
            prevSlideMessage: "Previous testimonial",
            nextSlideMessage: "Next testimonial",
            slideLabelMessage: "Testimonial {{index}} of {{slidesLength}}",
          }}
          keyboard={{ enabled: true, onlyInViewport: true }}
          modules={[Autoplay, A11y, Keyboard]}
          spaceBetween={32}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          slidesPerView={1}
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
        >
          {testimonials.cards.map(({ name, comment }, index) => (
            <SwiperSlide className="!h-[22rem] my-2" key={index}>
              <figure
                role="group"
                aria-roledescription="slide"
                aria-label={`Testimonial ${index + 1} of ${testimonials.cards.length}`}
                className="h-full card shadow-lg bg-primary transition-transform duration-300 hover:scale-[1.015]"
              >
                <div className="p-6 card-body">
                  <div
                    className="flex mb-4"
                    role="img"
                    aria-label="Rated 5 out of 5 stars"
                  >
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          aria-hidden="true"
                          className="h-6 w-6 mask mask-star-2 bg-primary-content"
                        />
                      ))}
                  </div>
                  <blockquote className="text-primary-content m-0 p-0 border-0 not-italic before:content-none after:content-none">
                    {comment}
                  </blockquote>
                  <figcaption className="card-title text-primary-content mt-auto">
                    — {name}
                  </figcaption>
                </div>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
}

export default Testimonials;
