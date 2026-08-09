import type { PackingOptions, Rule } from "./types";

/**
 * The rule set behind every generated list.
 *
 * Order matters: rules are applied top to bottom and the first rule to claim an
 * item id wins, so a trip-type-specific note ("SPF 50 — snow reflects most of it
 * straight back at you") beats the generic climate one. Give two rules the same
 * id when they mean the same object and you want that de-duplication.
 *
 * This module is imported by the client island, so keep it data — no imports
 * beyond types, no helpers that pull in dependencies.
 */

/** Clothing counts. Capped, because past a week the answer is laundry. */
const perDay = (days: number, cap: number, extra = 0) =>
  Math.min(days, cap) + extra;

const tops = (o: PackingOptions) =>
  o.days <= 3 ? o.days : Math.min(Math.ceil(o.days * 0.7), 7);
const bottoms = (o: PackingOptions) =>
  Math.max(2, Math.min(Math.ceil(o.days / 2), 4));

export const RULES: readonly Rule[] = [
  // ---------------------------------------------------------------- base ---
  {
    items: [
      {
        id: "passport",
        category: "documents",
        label: "Passport",
        note: "Valid at least 6 months beyond your return date — many countries refuse entry otherwise.",
      },
      {
        id: "visa",
        category: "documents",
        label: "Visa or entry authorisation",
        note: "Check the rules even for visa-free travel; several regions now want an online pre-authorisation.",
      },
      {
        id: "boarding-passes",
        category: "documents",
        label: "Boarding passes",
        note: "Plus a screenshot, for when the airline app can't reach the internet.",
      },
      {
        id: "insurance",
        category: "documents",
        label: "Travel insurance policy",
        note: "Policy number and the 24-hour emergency line, saved offline.",
      },
      {
        id: "bookings",
        category: "documents",
        label: "Accommodation confirmations",
        note: "Some border officers ask for proof of where you're staying.",
      },
      {
        id: "licence",
        category: "documents",
        label: "Driving licence",
        note: "Add an International Driving Permit if you're renting — plenty of countries require one.",
      },
      {
        id: "doc-copies",
        category: "documents",
        label: "Copies of your passport",
        note: "One photo on your phone, one on paper packed separately from the original.",
      },
      {
        id: "cards",
        category: "documents",
        label: "Two payment cards on different networks",
        note: "Carried in different bags, so one loss isn't total.",
      },
      {
        id: "cash",
        category: "documents",
        label: "A small amount of local cash",
        note: "For the taxi, the locker, and the place that has been cash-only since 1974.",
      },

      {
        id: "underwear",
        category: "clothing",
        label: (o) => `Underwear × ${perDay(o.days, 7, 1)}`,
      },
      {
        id: "socks",
        category: "clothing",
        label: (o) => `Socks × ${perDay(o.days, 7, 1)}`,
        // Cold trips used to get a second "wool socks" line on top of this
        // one, which added up to thirteen pairs for ten days.
        note: (o) =>
          o.climate === "cold"
            ? "Wool, not cotton. The pair that's damp at lunchtime is why your feet are cold at four."
            : undefined,
      },
      {
        id: "tops",
        category: "clothing",
        label: (o) => `Tops × ${tops(o)}`,
        note: "Built around one or two base colours, so every top works with every bottom.",
      },
      {
        id: "bottoms",
        category: "clothing",
        label: (o) => `Bottoms × ${bottoms(o)}`,
      },
      {
        id: "layers",
        category: "clothing",
        label: "Two layers",
        note: "A sweater or hoodie plus a jacket suited to where you're going.",
      },
      { id: "sleepwear", category: "clothing", label: "Sleepwear" },
      {
        id: "nice-outfit",
        category: "clothing",
        label: "One outfit for a nice evening",
        note: "One. Anything you can't name the occasion for stays home.",
      },
      {
        id: "shoes",
        category: "clothing",
        label: "Shoes — walking, casual, and one dressier pair",
        note: "Three pairs maximum. Wear the heaviest onto the plane.",
      },

      {
        id: "toothbrush",
        category: "toiletries",
        label: "Toothbrush and toothpaste",
      },
      { id: "deodorant", category: "toiletries", label: "Deodorant" },
      {
        id: "shampoo",
        category: "toiletries",
        label: "Travel-size shampoo and soap",
        note: "Or skip them entirely and use whatever the hotel provides.",
      },
      { id: "razor", category: "toiletries", label: "Razor and shaving kit" },
      {
        id: "skincare",
        category: "toiletries",
        label: "Skincare basics",
        note: "The products you actually use daily — not the full bathroom shelf.",
      },
      { id: "hairbrush", category: "toiletries", label: "Hairbrush or comb" },
      {
        id: "contacts",
        category: "toiletries",
        label: "Contact lenses, solution, and backup glasses",
      },

      {
        id: "prescriptions",
        category: "health",
        label: "Prescription medication in its original packaging",
        note: "In your carry-on, with a few days spare in case you're delayed getting home.",
      },
      {
        id: "prescription-copy",
        category: "health",
        label: "A copy of the prescription",
        note: "For anything controlled or injectable — some countries do check.",
      },
      { id: "painkillers", category: "health", label: "Painkillers" },
      {
        id: "plasters",
        category: "health",
        label: "Plasters and blister care",
      },
      {
        id: "stomach-kit",
        category: "health",
        label: "Anti-diarrheal and rehydration sachets",
      },
      { id: "antihistamines", category: "health", label: "Antihistamines" },

      { id: "phone", category: "tech", label: "Phone and charger" },
      {
        id: "adapter",
        category: "tech",
        label: "Power adapter for your destination's plug type",
        note: "Modern chargers take 100–240V, so you need the plug shape, rarely a voltage converter.",
      },
      {
        id: "power-bank",
        category: "tech",
        label: "Power bank",
        note: "Carry-on only, and most airlines cap it at 100Wh (about 27,000 mAh).",
      },
      {
        id: "spare-cable",
        category: "tech",
        label: "A spare charging cable",
        note: "For the device you'd most hate to lose the use of.",
      },
      { id: "headphones", category: "tech", label: "Headphones" },
      {
        id: "esim",
        category: "tech",
        label: "Data sorted before you fly",
        note: "An eSIM for your destination or a roaming plan you've confirmed — not airport Wi-Fi roulette.",
      },

      {
        id: "daypack",
        category: "gear",
        label: "A daypack or crossbody bag that zips",
      },
      {
        id: "water-bottle",
        category: "gear",
        label: "Empty water bottle",
        note: "Fill it after security.",
      },
      {
        id: "pen",
        category: "gear",
        label: "A pen",
        note: "Paper arrival cards still exist in plenty of countries.",
      },
      {
        id: "laundry-bag",
        category: "gear",
        label: "A bag for worn clothes",
      },
    ],
  },

  // ----------------------------------------------------------- trip type ---
  {
    when: { types: ["beach"] },
    items: [
      {
        id: "swimsuits",
        category: "clothing",
        label: "Two swimsuits",
        note: "One dries while you wear the other.",
      },
      { id: "sandals", category: "clothing", label: "Flip-flops or sandals" },
      { id: "cover-up", category: "clothing", label: "A light cover-up" },
      { id: "sun-hat", category: "clothing", label: "Wide-brimmed sun hat" },
      {
        id: "sunglasses",
        category: "gear",
        label: "Sunglasses",
        note: "Polarised, if you'll be near water all week.",
      },
      {
        id: "sunscreen",
        category: "toiletries",
        label: "Reef-safe SPF 50",
        note: "Several beach destinations now ban oxybenzone sunscreens outright.",
      },
      { id: "after-sun", category: "toiletries", label: "After-sun or aloe" },
      {
        id: "dry-bag",
        category: "gear",
        label: "Dry bag for phone and cards",
      },
      {
        id: "quick-dry-towel",
        category: "gear",
        label: "Quick-dry towel",
        note: "Hotel pool towels generally aren't allowed to leave the property.",
      },
      {
        id: "beach-shoes",
        category: "clothing",
        label: "Water shoes",
        note: "Only if you're going somewhere rocky or reefy — otherwise skip them.",
      },
    ],
  },
  {
    when: { types: ["city"] },
    items: [
      {
        id: "walking-shoes",
        category: "clothing",
        label: "Your most broken-in walking shoes",
        note: "This is the entire trip. Nothing new, nothing you're 'sure will be fine'.",
      },
      {
        id: "smart-casual",
        category: "clothing",
        label: "A smart-casual layer",
        note: "Enough restaurants still have a dress code to make this worth the space.",
      },
      { id: "umbrella", category: "gear", label: "Compact umbrella" },
      {
        id: "blister-plasters",
        category: "health",
        label: "Blister plasters",
        note: "Packed before you need them, not bought in a foreign pharmacy at 9pm.",
      },
      {
        id: "transit-card",
        category: "documents",
        label: "A contactless card you've checked works abroad",
        note: "Most metro systems now take tap-to-pay; some only take local cards.",
      },
    ],
  },
  {
    when: { types: ["hiking"] },
    items: [
      {
        id: "boots",
        category: "clothing",
        label: "Broken-in hiking boots or trail shoes",
        note: "Never new. A first-day blister ruins the other six.",
      },
      {
        id: "base-layers",
        category: "clothing",
        label: "Merino or synthetic base layers",
        note: "Cotton holds sweat, stays wet, and cools you down when you least want it.",
      },
      {
        id: "shell",
        category: "clothing",
        label: "Waterproof shell jacket",
      },
      {
        id: "hiking-socks",
        category: "clothing",
        label: (o) => `Hiking socks × ${perDay(o.days, 5, 1)}`,
        note: "Keep one pair sealed and dry no matter what the day does.",
      },
      {
        id: "head-torch",
        category: "gear",
        label: "Head torch and spare batteries",
      },
      {
        id: "offline-maps",
        category: "tech",
        label: "Offline maps downloaded",
        note: "Do it on hotel Wi-Fi. Trailheads are where signal goes to die.",
      },
      {
        id: "water-capacity",
        category: "gear",
        label: "Two litres of water capacity",
        note: "Bottles or a bladder — whichever you'll actually drink from while moving.",
      },
      { id: "trail-snacks", category: "gear", label: "Trail snacks" },
      {
        id: "blister-kit",
        category: "health",
        label: "Blister kit — tape, plasters, a needle",
      },
      {
        id: "sunscreen",
        category: "toiletries",
        label: "Sunscreen and SPF lip balm",
        note: "Burn risk climbs roughly 4% for every 300m of altitude.",
      },
      {
        id: "paper-map",
        category: "gear",
        label: "Paper map and a whistle",
        note: "The backup that doesn't have a battery.",
      },
    ],
  },
  {
    when: { types: ["business"] },
    items: [
      {
        id: "suit",
        category: "clothing",
        label: "Suit or equivalent",
        note: "Folded over tissue paper, or in a garment bag if the airline lets you.",
      },
      {
        id: "dress-shoes",
        category: "clothing",
        label: "Dress shoes, plus a comfortable pair for transit",
      },
      { id: "laptop", category: "tech", label: "Laptop and charger" },
      {
        id: "presentation-backup",
        category: "tech",
        label: "Your presentation backed up twice",
        note: "Cloud plus a USB stick. Conference Wi-Fi fails at exactly the wrong moment.",
      },
      { id: "business-cards", category: "documents", label: "Business cards" },
      {
        id: "wrinkle-spray",
        category: "toiletries",
        label: "Wrinkle-release spray",
        note: "Or plan ten minutes with the hotel iron the evening you arrive.",
      },
      {
        id: "expenses",
        category: "documents",
        label: "Somewhere to keep receipts",
        note: "A physical envelope or a photo-per-receipt habit. Reimbursement is easier same-day.",
      },
    ],
  },
  {
    when: { types: ["ski"] },
    items: [
      {
        id: "ski-jacket",
        category: "clothing",
        label: "Ski jacket and salopettes",
      },
      {
        id: "thermals",
        category: "clothing",
        label: "Two sets of thermal base layers",
        note: "One on, one drying.",
      },
      {
        id: "ski-socks",
        category: "clothing",
        label: (o) => `Ski socks × ${perDay(o.days, 7)}`,
        note: "Tall, thin, and never cotton. Two pairs at once causes blisters, not warmth.",
      },
      {
        id: "gloves",
        category: "clothing",
        label: "Gloves or mittens, plus thin liners",
      },
      {
        id: "goggles",
        category: "gear",
        label: "Goggles",
        note: "Bring a low-light lens too if you have one — flat light is the norm, not the exception.",
      },
      {
        id: "helmet",
        category: "gear",
        label: "Helmet",
        note: "A week of rental costs more than most helmets, and yours actually fits.",
      },
      { id: "neck-gaiter", category: "clothing", label: "Neck gaiter or buff" },
      {
        id: "sunscreen",
        category: "toiletries",
        label: "SPF 50 and SPF lip balm",
        note: "Snow reflects up to 80% of UV straight back up at your face.",
      },
      {
        id: "apres-boots",
        category: "clothing",
        label: "Après boots with actual grip",
        note: "Resort villages are compacted ice by Wednesday.",
      },
      {
        id: "lift-pass-pocket",
        category: "gear",
        label: "Lift-pass holder or armband pocket",
      },
      { id: "hand-warmers", category: "gear", label: "Hand warmers" },
    ],
  },
  {
    when: { types: ["backpacking"] },
    items: [
      {
        id: "backpack",
        category: "gear",
        label: "Backpack with a rain cover",
        note: "Fitted to your torso length, not your height.",
      },
      {
        id: "padlock",
        category: "gear",
        label: "Padlock for hostel lockers",
      },
      {
        id: "quick-dry-towel",
        category: "gear",
        label: "Quick-dry travel towel",
        note: "Hostels charge for towels roughly as often as they don't.",
      },
      {
        id: "sink-laundry",
        category: "toiletries",
        label: "Universal sink plug and travel wash",
      },
      {
        id: "shower-sandals",
        category: "clothing",
        label: "Flip-flops for shared showers",
      },
      {
        id: "earplugs",
        category: "gear",
        label: "Earplugs and an eye mask",
        note: "The dorm survival kit. Someone will pack at 4am.",
      },
      {
        id: "packing-cubes",
        category: "gear",
        label: "Packing cubes",
        note: "One per category, so you're not unpacking the whole bag on a bunk.",
      },
      {
        id: "head-torch",
        category: "gear",
        label: "Head torch",
        note: "For late arrivals and dorms with the lights already off.",
      },
      {
        id: "emergency-snacks",
        category: "gear",
        label: "A day's worth of snacks",
        note: "For the bus that leaves four hours after it said it would.",
      },
    ],
  },

  // ------------------------------------------------------------- climate ---
  {
    when: { climates: ["hot"] },
    items: [
      {
        id: "light-fabrics",
        category: "clothing",
        label: "Loose, light-coloured natural fabrics",
        note: "Linen and cotton move air. Synthetics trap it.",
      },
      { id: "sunscreen", category: "toiletries", label: "SPF 50 sunscreen" },
      { id: "sun-hat", category: "clothing", label: "Sun hat" },
      { id: "sunglasses", category: "gear", label: "Sunglasses" },
      {
        id: "electrolytes",
        category: "health",
        label: "Electrolyte tablets",
        note: "Cheaper and lighter than the day you lose to heat exhaustion.",
      },
      { id: "insect-repellent", category: "health", label: "Insect repellent" },
    ],
  },
  {
    when: { climates: ["tropical"] },
    items: [
      {
        id: "insect-repellent",
        category: "health",
        label: "Insect repellent with DEET or picaridin",
        note: "Citronella wristbands do not work in a dengue zone.",
      },
      {
        id: "rain-shell",
        category: "clothing",
        label: "Lightweight rain shell",
        note: "Tropical rain arrives hard and leaves fast — you need shedding, not insulation.",
      },
      {
        id: "quick-dry-clothing",
        category: "clothing",
        label: "Quick-dry clothing",
        note: "At 90% humidity, cotton simply never dries.",
      },
      {
        id: "foot-powder",
        category: "health",
        label: "Anti-fungal foot powder",
      },
      {
        id: "water-treatment",
        category: "health",
        label: "A filter bottle or purification tablets",
        note: "Also spares you a fortnight of single-use plastic.",
      },
      { id: "sunscreen", category: "toiletries", label: "SPF 50 sunscreen" },
      {
        id: "modest-layer",
        category: "clothing",
        label: "Shoulders-and-knees layer",
        note: "Temples and religious sites across the tropics enforce it, often at the door.",
      },
    ],
  },
  {
    when: { climates: ["mild"] },
    items: [
      {
        id: "evening-layer",
        category: "clothing",
        label: "One warm layer for the evening",
        note: "Mild days still lose 8–10°C after dark.",
      },
      { id: "rain-jacket", category: "clothing", label: "Light rain jacket" },
    ],
  },
  {
    when: { climates: ["cold"] },
    items: [
      {
        id: "thermals",
        category: "clothing",
        label: "Thermal base layers, top and bottom",
      },
      {
        id: "insulated-jacket",
        category: "clothing",
        label: "Insulated jacket",
        note: "Down packs smaller; synthetic keeps working when it's wet.",
      },
      {
        id: "hat-gloves-scarf",
        category: "clothing",
        label: "Hat, gloves, and scarf",
      },
      {
        id: "winter-boots",
        category: "clothing",
        label: "Waterproof boots with grip",
      },
      {
        id: "moisturiser",
        category: "toiletries",
        label: "Heavy moisturiser and lip balm",
        note: "Indoor heating dries skin faster than the cold outside does.",
      },
      { id: "hand-warmers", category: "gear", label: "Hand warmers" },
    ],
  },

  // ------------------------------------------------------------ duration ---
  {
    when: { maxDays: 3 },
    items: [
      {
        id: "one-bag",
        category: "gear",
        label: "One bag, cabin-sized",
        note: "Three days genuinely fits. Checking a bag costs you an hour at both ends.",
      },
    ],
  },
  {
    when: { minDays: 8 },
    items: [
      {
        id: "laundry-plan",
        category: "clothing",
        label: "A laundry stop, planned in",
        note: "The counts above cover two weeks with one wash. Packing more clothes is the wrong fix.",
      },
      {
        id: "travel-detergent",
        category: "toiletries",
        label: "Travel detergent or laundry sheets",
      },
    ],
  },
  {
    when: { minDays: 14 },
    items: [
      {
        id: "grooming-extras",
        category: "toiletries",
        label: "Nail clippers and a small sewing kit",
        note: "Two weeks is long enough for both to matter.",
      },
      {
        id: "repeat-prescription",
        category: "health",
        label: "Check your prescriptions cover the whole trip",
        note: "Plus a week. Refilling abroad ranges from expensive to impossible.",
      },
    ],
  },

  // --------------------------------------------------------------- flags ---
  {
    when: { carryOnOnly: true },
    items: [
      {
        id: "liquids-bag",
        category: "toiletries",
        label: "Liquids in one clear resealable bag",
        note: "100ml per container maximum, whatever the bottle is only part-full to.",
      },
      {
        id: "solid-toiletries",
        category: "toiletries",
        label: "Solid swaps for your bulkiest liquids",
        note: "Shampoo bar, toothpaste tabs, stick sunscreen — none of them count against the liquids bag.",
      },
      {
        id: "cabin-dimensions",
        category: "documents",
        label: "Your airline's cabin bag dimensions, checked",
        note: "They vary by several centimetres between carriers, and gate staff do measure.",
      },
      {
        id: "wear-the-bulk",
        category: "clothing",
        label: "Wear your bulkiest jacket and shoes onto the plane",
      },
      {
        id: "no-sharps",
        category: "gear",
        label: "Nothing sharp in the bag",
        note: "Full-size scissors, loose razor blades, and multi-tools all get confiscated.",
      },
    ],
  },
  {
    when: { checkedBag: true },
    items: [
      {
        id: "carry-on-change",
        category: "clothing",
        label: "One full change of clothes in your carry-on",
        note: "Covers the 24–48 hours a delayed bag typically takes to catch up.",
      },
      { id: "luggage-lock", category: "gear", label: "TSA-approved lock" },
      {
        id: "luggage-tag",
        category: "gear",
        label: "Luggage tag outside, contact details inside",
        note: "Tags get torn off; the sheet of paper on top of your clothes doesn't.",
      },
      {
        id: "bag-tracker",
        category: "tech",
        label: "A tracker in the bag",
        note: "Airlines now act on a passenger showing them exactly which terminal the bag is in.",
      },
      {
        id: "weigh-bag",
        category: "gear",
        label: "Weigh the bag at home",
        note: "Excess baggage at the desk is priced to hurt.",
      },
    ],
  },
  {
    when: { kids: true },
    items: [
      {
        id: "kids-passports",
        category: "documents",
        label: "A passport for each child",
        note: "Plus a consent letter if they're travelling without both parents — increasingly asked for.",
      },
      {
        id: "kids-snacks",
        category: "kids",
        label: "More snacks than you think",
        note: "Then the same again for the journey home.",
      },
      {
        id: "kids-water",
        category: "kids",
        label: "Refillable water bottles",
      },
      {
        id: "kids-change",
        category: "kids",
        label: "A change of clothes per child in the carry-on",
        note: "And a spare top for whichever adult is holding them.",
      },
      {
        id: "kids-wipes",
        category: "kids",
        label: "Wipes, and nappies plus half again",
      },
      {
        id: "kids-medicine",
        category: "kids",
        label: "Children's paracetamol, ibuprofen, and a thermometer",
        note: "Dosing by weight differs between countries; bring what you already know how to use.",
      },
      {
        id: "kids-entertainment",
        category: "kids",
        label: "Downloaded shows and games, on a charged tablet",
        note: "Downloaded. Plane Wi-Fi is not a plan.",
      },
      {
        id: "kids-headphones",
        category: "kids",
        label: "Kid-sized volume-limited headphones",
      },
      {
        id: "kids-comfort",
        category: "kids",
        label: "One comfort item each",
        note: "The single item that cannot be replaced. Consider a spare of the crucial one.",
      },
      {
        id: "kids-car-seat",
        category: "kids",
        label: "Car seat or booster, if you're renting a car",
        note: "Rental seats are a lottery on both fit and cleanliness.",
      },
      {
        id: "kids-sunscreen",
        category: "kids",
        label: "Kids' SPF 50 and sun hats",
      },
    ],
  },
];
