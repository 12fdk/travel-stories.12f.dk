/**
 * Island entry point for the packing list generator.
 *
 * The surrounding page — headings, advice, cross-links — stays static Astro so
 * crawlers get the content without executing anything. Only the part that has
 * to respond to a click ships as JavaScript.
 */
export { default } from "./_components/generator";
