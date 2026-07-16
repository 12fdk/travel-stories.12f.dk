import { motion } from "framer-motion";
import { useContext } from "react";
import type { BlogTeaser } from "../../../../content/blog";
import { ConfigContext } from "../../../../utils/configContext";

interface Props {
  posts: BlogTeaser[];
}

/**
 * Links the newest posts from the homepage so the blog cluster has a path in
 * from the site's strongest page.
 */
function FromTheBlog({ posts }: Props) {
  const { ui } = useContext(ConfigContext)!;
  if (!posts.length) return null;

  return (
    <section id="blog" className="mx-auto max-w-screen-lg px-4 py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="m-0 flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-base-content/50">
            <span className="inline-block h-0.5 w-8 bg-primary" />
            {ui?.fromTheBlog.title ?? "From the blog"}
          </p>
          <h2 className="mb-3 mt-5 text-3xl font-extrabold leading-[1.05] md:text-4xl">
            {ui?.fromTheBlog.heading ?? "Guides for better trips"}
          </h2>
        </div>
        <a
          href="/blog/"
          className="shrink-0 border-b-2 border-primary pb-1 text-sm font-semibold text-base-content transition-colors hover:text-primary"
          data-umami-event="home-blog-all-posts"
        >
          {ui?.fromTheBlog.allPosts ?? "All posts"}
        </a>
      </div>

      <ul className="mt-12 list-none divide-y divide-base-300 border-y border-base-300 p-0">
        {posts.map((post, index) => (
          <motion.li
            key={post.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.45,
              delay: index * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="m-0 p-0"
          >
            <a
              href={`/blog/${post.slug}/`}
              className="group flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:gap-8"
            >
              <span className="shrink-0 text-sm text-base-content/40 md:w-40">
                {post.date} · {post.minutes} {ui?.fromTheBlog.minutes ?? "min"}
              </span>
              <span className="flex-1">
                <span className="block text-xl font-bold text-base-content transition-colors group-hover:text-primary md:text-2xl">
                  {post.title}
                </span>
                <span className="mt-1 block text-base-content/70">
                  {post.description}
                </span>
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

export default FromTheBlog;
