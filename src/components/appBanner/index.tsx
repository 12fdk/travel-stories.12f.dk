import { useContext } from "react";
import { ConfigContext } from "../../utils/configContext";
import { withBase } from "../../utils/basePath";
import Spill from "./svgs/spill";
import IphoneFrame from "../../components/iphoneFrame";
import { motion } from "framer-motion";
import clsx from "clsx";

function AppBanner() {
  const { googlePlayLink, appStoreLink, appBanner } =
    useContext(ConfigContext)!;

  if (!appBanner) return null;
  return (
    <motion.section
      id={appBanner.id}
      aria-labelledby="app-banner-heading"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="relative max-w-screen-lg mx-auto px-4 -mb-6 z-10 md:-mb-10 lg:-mb-14"
    >
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            scale: 0.9,
          },
          visible: {
            opacity: 1,
            scale: 1,
          },
        }}
        transition={{
          mass: 0.4,
          type: "spring",
          duration: 0.2,
        }}
      >
        <div className="p-4 bg-primary text-primary-content rounded-t-[var(--rounded-box)] flex flex-col items-center md:flex-row">
          <div className="flex-1 flex flex-col items-center justify-center min-h-full">
            <motion.h2
              id="app-banner-heading"
              initial={{ opacity: 0, y: "-100%" }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-0 mb-4 text-4xl md:text-6xl"
            >
              {appBanner.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-primary-content/90 whitespace-pre-wrap text-left m-0 mt-1 md:text-lg"
            >
              {appBanner.subtitle}
            </motion.p>
            <motion.ul
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="list-none flex gap-4 my-6 p-0 w-full"
            >
              {googlePlayLink && (
                <li className="m-0 p-0">
                  <a
                    href={googlePlayLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="footer-banner-google-play-click"
                    aria-label="Download Travel Stories on Google Play"
                    className="inline-block transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <img
                      className="h-14"
                      alt="Get it on Google Play"
                      src={withBase("/stores/google-play.svg")}
                      width={168}
                      height={56}
                    />
                  </a>
                </li>
              )}
              {appStoreLink && (
                <li className="m-0 p-0">
                  <a
                    href={appStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="footer-banner-app-store-click"
                    aria-label="Download Travel Stories on the Apple App Store"
                    className="inline-block transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <img
                      className="h-14"
                      alt="Download on the App Store"
                      src={withBase("/stores/app-store.svg")}
                      width={168}
                      height={56}
                    />
                  </a>
                </li>
              )}
            </motion.ul>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="relative flex-1 flex justify-center"
          >
            {appBanner.screenshots.map((src, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: {
                    scale: index > 0 ? 0.9 : 1,
                    opacity: 0,
                    rotate: 0,
                  },
                  visible: {
                    scale: index > 0 ? 0.9 : 1,
                    opacity: 1,
                    rotate: index === 0 ? 0 : index === 1 ? "-30deg" : "30deg",
                  },
                }}
                transition={{
                  stiffness: 150,
                  mass: 0.5,
                  type: "spring",
                  delay: index > 0 ? 0.8 : 0.5,
                }}
                className={clsx(
                  "h-[30rem]",
                  index === 0 && "relative z-20 block",
                  index === 1 && "absolute origin-bottom-left hidden xl:block",
                  index === 2 && "absolute origin-bottom-right hidden xl:block"
                )}
              >
                <IphoneFrame src={withBase(src)} />
              </motion.div>
            ))}
          </motion.div>
        </div>
        <Spill className="-translate-y-1"/>
      </motion.div>
    </motion.section>
  );
}

export default AppBanner;
