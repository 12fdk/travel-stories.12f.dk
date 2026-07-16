import { motion } from "framer-motion";
import { useContext, useEffect, useRef } from "react";
import AnimatedText from "../../../../components/animatedText";
import { ConfigContext } from "../../../../utils/configContext";
import { withBase } from "../../../../utils/basePath";

/**
 * "See it in action" — the real App Store preview video in a phone-shaped
 * player. Muted, no controls chrome, plays only while scrolled into view,
 * honors prefers-reduced-motion by never autoplaying.
 */
function VideoDemo() {
  const {
    home: { videoDemo },
  } = useContext(ConfigContext)!;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  if (!videoDemo) return null;

  return (
    <section id={videoDemo.id} className="bg-neutral text-neutral-content">
      <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-10 px-4 py-16 md:flex-row md:py-24">
        <div className="flex-1 prose prose-lg">
          <h2 className="text-neutral-content">
            <AnimatedText text={videoDemo.title} />
          </h2>
          {videoDemo.subtitle && (
            <motion.p
              initial={{ y: "50%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              className="text-neutral-content/80"
            >
              {videoDemo.subtitle}
            </motion.p>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-[260px] shrink-0 overflow-hidden rounded-[2.5rem] border-4 border-base-content/20 shadow-2xl"
        >
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            poster={withBase(videoDemo.poster)}
            aria-label={videoDemo.videoAriaLabel ?? "App demo video"}
            className="block h-auto w-full"
          >
            <source src={withBase(videoDemo.video)} type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  );
}

export default VideoDemo;
