import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      "3xs": "350px",
      "2xs": "400px",
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        // One family does all the work: light for display, regular for text.
        sans: ["Work Sans", ...defaultTheme.fontFamily.sans],
      },
      // The five type steps of the site. Nothing else sets a size.
      fontSize: {
        small: ["var(--step-small)", { lineHeight: "1.45" }],
        body: ["var(--step-body)", { lineHeight: "1.55" }],
        lead: ["var(--step-lead)", { lineHeight: "1.35" }],
        head: ["var(--step-head)", { lineHeight: "1.04", letterSpacing: "-0.035em" }],
        display: ["var(--step-display)", { lineHeight: "0.9", letterSpacing: "-0.045em" }],
      },
      colors: {
        ground: "var(--bg)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        field: "var(--field)",
        "field-ink": "var(--field-ink)",
        "field-muted": "var(--field-muted)",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        ui: "var(--radius)",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: [
      // Stone and blueprint: stone paper, near-black ink, one blue for the
      // action. Shared by every page through daisyUI's base/primary roles.
      {
        travel: {
          "primary": "#2456d6",
          "primary-content": "#ffffff",
          "secondary": "#26251e",
          "secondary-content": "#dfdedb",
          "accent": "#2456d6",
          "accent-content": "#ffffff",
          "neutral": "#26251e",
          "neutral-content": "#dfdedb",
          "base-100": "#dfdedb",
          "base-200": "#d3d2ce",
          "base-300": "#c6c5c0",
          "base-content": "#26251e",
          "info": "#2456d6",
          "success": "#2f7a3e",
          "warning": "#9a5b00",
          "error": "#b3261e",
          "--rounded-box": "12px",
          "--rounded-btn": "12px",
          "--rounded-badge": "12px",
          "--animation-btn": "0.15s",
          "--animation-input": "0.15s",
          "--btn-focus-scale": "0.98",
          "--border-btn": "0px",
          "--tab-border": "0px",
          "--tab-radius": "12px",
        },
      },
      {
        "travel-dark": {
          "primary": "#7d9dff",
          "primary-content": "#0c1433",
          "secondary": "#e6e4de",
          "secondary-content": "#191915",
          "accent": "#7d9dff",
          "accent-content": "#0c1433",
          "neutral": "#0f0f0c",
          "neutral-content": "#e6e4de",
          "base-100": "#191915",
          "base-200": "#23221d",
          "base-300": "#2f2e28",
          "base-content": "#e6e4de",
          "info": "#7d9dff",
          "success": "#6fc27f",
          "warning": "#e0a54a",
          "error": "#ff8a80",
          "--rounded-box": "12px",
          "--rounded-btn": "12px",
          "--rounded-badge": "12px",
          "--animation-btn": "0.15s",
          "--animation-input": "0.15s",
          "--btn-focus-scale": "0.98",
          "--border-btn": "0px",
          "--tab-border": "0px",
          "--tab-radius": "12px",
        },
      },
    ],
  },
};
