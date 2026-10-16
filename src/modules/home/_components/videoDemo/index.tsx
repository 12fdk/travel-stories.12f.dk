import { useContext, useEffect, useRef } from "react";
import { ConfigContext } from "../../../../utils/configContext";
import { withBase } from "../../../../utils/basePath";

/**
 * "See it in action": the real App Store preview video on the dark field,
 * the one place the page breaks out of the split at full width. Muted, plays
 * only while in view, never autoplays under prefers-reduced-motion.
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
    <section
      id={videoDemo.id}
      aria-labelledby="demo-heading"
      className="bg-field text-field-ink"
    >
      <div className="mx-auto grid max-w-[1440px] items-end gap-12 px-[var(--gutter)] py-[clamp(96px,11vw,176px)] lg:grid-cols-12">
        <div className="lg:col-span-6 lg:pb-8" data-reveal>
          <h2 id="demo-heading" className="text-head font-light">
            {videoDemo.title}
          </h2>
          {videoDemo.subtitle && (
            <p className="mt-6 max-w-[34ch] text-lead text-field-muted">{videoDemo.subtitle}</p>
          )}
        </div>
        <div className="lg:col-span-5 lg:col-start-8" data-reveal-self>
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            poster={withBase(videoDemo.poster)}
            aria-label={videoDemo.videoAriaLabel ?? "App demo video"}
            width={590}
            height={1279}
            className="mx-auto block h-auto w-full max-w-[340px] rounded-ui lg:mr-0"
          >
            <source src={withBase(videoDemo.video)} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}

export default VideoDemo;
