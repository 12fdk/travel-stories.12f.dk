import { defineConfig } from "astro/config";
import fs from "node:fs";
import path from "node:path";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import { withCampaign } from "./src/utils/appStoreCampaign";

const SITE = "https://travel-stories.12f.dk";

/**
 * Attribute App Store links written inline in post bodies (#52).
 *
 * There are 22 of them across the blog and they are authored as ordinary
 * markdown, so rewriting them here keeps the provider token in exactly one
 * place instead of pasting it into every post. Hand-rolled walk rather than
 * unist-util-visit, which isn't a direct dependency.
 */
function rehypeAppStoreCampaign() {
  return (tree) => {
    const walk = (node) => {
      if (node.type === "element" && node.tagName === "a") {
        const href = node.properties?.href;
        if (typeof href === "string" && href.startsWith("https://apps.apple.com/")) {
          node.properties.href = withCampaign(href, "blog-body");
        }
      }
      for (const child of node.children ?? []) walk(child);
    };
    walk(tree);
  };
}
const BLOG_DIR = "src/content/blog";

/**
 * lastmod per blog post, read from its own frontmatter (updatedDate if it has
 * one, else publishDate). Google distrusts a sitemap whose lastmod it can't
 * believe, so a date is only emitted when we actually know it — never guessed,
 * never in the future.
 */
function blogLastmod() {
  const dates = new Map();
  const today = new Date();

  for (const file of fs.readdirSync(BLOG_DIR)) {
    if (!file.endsWith(".md")) continue;
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const stamp = (
      raw.match(/^updatedDate:\s*(\S+)/m)?.[1] ??
      raw.match(/^publishDate:\s*(\S+)/m)?.[1]
    )?.replace(/['"]/g, "");
    if (!stamp) continue;

    const date = new Date(stamp);
    if (Number.isNaN(date.valueOf()) || date > today) continue;
    dates.set(`${SITE}/blog/${file.replace(/\.md$/, "")}/`, date);
  }
  return dates;
}

// https://astro.build/config
export default defineConfig({
  site: "https://travel-stories.12f.dk",
  base: "/",
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
    build: {
      // Improve code splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            'framer-motion': ['framer-motion'],
          },
        },
      },
    },
  },
  image: {
    // Enable image optimization with sharp
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },
  markdown: {
    rehypePlugins: [rehypeAppStoreCampaign],
  },
  integrations: [
    react(),
    tailwind(),
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en", da: "da", nb: "nb", sv: "sv", nl: "nl", de: "de",
          fr: "fr", es: "es", it: "it", pt: "pt-BR", ko: "ko", ja: "ja",
        },
      },
      // /app is a redirect stub — it doesn't belong in the index.
      filter: (page) => !page.includes("/app/"),
      serialize(item) {
        if (item.url === `${SITE}/`) {
          item.priority = 1.0;
          item.changefreq = "weekly";
        }
        // The packing list tool is the only surface here built to be found by
        // people who don't know the app exists, so it outranks the blog.
        if (item.url === `${SITE}/packing-list/`) {
          item.priority = 0.8;
          item.changefreq = "monthly";
        } else if (item.url.startsWith(`${SITE}/packing-list/`)) {
          item.priority = 0.7;
          item.changefreq = "monthly";
        }
        if (
          item.url.includes("privacy-policy") ||
          item.url.includes("terms-and-conditions") ||
          item.url.includes("cookies-policy")
        ) {
          item.priority = 0.3;
          item.changefreq = "yearly";
        }

        const posts = blogLastmod();
        const lastmod = posts.get(item.url);
        if (lastmod) {
          item.lastmod = lastmod.toISOString();
        } else if (item.url === `${SITE}/blog/` && posts.size > 0) {
          // The index changes when its newest post does.
          item.lastmod = new Date(
            Math.max(...[...posts.values()].map((d) => d.valueOf()))
          ).toISOString();
        }
        return item;
      },
    }),
  ],
});
