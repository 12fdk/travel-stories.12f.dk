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
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="mx-auto max-w-[1440px] px-[var(--gutter)] pt-[clamp(112px,12vw,200px)]"
    >
      <div className="mx-auto max-w-[620px] lg:ml-[22%]">
        <div className="flex flex-wrap items-baseline justify-between gap-4" data-reveal>
          <h2 id="blog-heading" className="text-lead font-medium">
            {ui?.fromTheBlog.heading ?? "Guides for better trips"}
          </h2>
          <a href="/blog/" className="ts-link text-body text-ink" data-umami-event="home-blog-all-posts">
            {ui?.fromTheBlog.allPosts ?? "All posts"}
          </a>
        </div>
        <ul className="mt-8 flex list-none flex-col gap-2 p-0" data-reveal>
          {posts.map((post) => (
            <li key={post.slug}>
              <a href={`/blog/${post.slug}/`} className="group flex items-baseline justify-between gap-6 py-2">
                <span className="text-body text-ink">
                  <span className="ts-link">{post.title}</span>
                </span>
                <span className="shrink-0 text-small text-muted tabular">
                  {post.date} · {post.minutes} {ui?.fromTheBlog.minutes ?? "min"}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default FromTheBlog;
