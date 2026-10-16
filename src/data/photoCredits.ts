/**
 * Found photographs used on the homepage, with the credit their licence asks
 * for. Source of truth for the footer credit line; the full record (licence
 * URL, original size, download date) is in public/images/world/credits.json.
 */
export interface PhotoCredit {
  title: string;
  creator: string;
  license: string;
  page: string;
}

export const PHOTO_CREDITS: PhotoCredit[] = [
  {
    title: "Lisbon Tram 28",
    creator: "Sonse",
    license: "CC BY 2.0",
    page: "https://commons.wikimedia.org/w/index.php?curid=97188959",
  },
  {
    title: "Tram 28 passing by Sé de Lisboa",
    creator: "Vernaccia",
    license: "CC BY 2.0",
    page: "https://commons.wikimedia.org/w/index.php?curid=73559190",
  },
  {
    title: "Rabelo boats and Ribeira seen from Cais de Gaia",
    creator: "Jakub Hałun",
    license: "CC BY 4.0",
    page: "https://commons.wikimedia.org/wiki/File:Rabelo_boats_and_Ribeira_seen_from_Cais_de_Gaia,_20250605_1623_9879.jpg",
  },
];
