import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );

  return rss({
    title: "Travel Stories Blog — Trip Planning Guides & Tips",
    description:
      "Practical, no-fluff guides on planning trips, packing smart, budgeting, and keeping travel memories.",
    site: context.site ?? "https://travel-stories.12f.dk",
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/blog/${post.slug}/`,
      author: post.data.author,
      categories: [post.data.keyword, ...post.data.tags],
    })),
    customData: `<language>en</language>`,
  });
}
