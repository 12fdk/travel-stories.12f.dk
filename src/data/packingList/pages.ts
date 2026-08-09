import type { PackingItem, PackingOptions } from "./types";

/**
 * The curated long-tail pages under /packing-list/.
 *
 * Deliberately hand-written and deliberately finite. The cartesian product of
 * type × duration × climate is several hundred near-identical pages, which is
 * exactly the doorway-page pattern Google demotes — so a combination only earns
 * a page when it has advice a generic list genuinely does not contain.
 *
 * Server-only: nothing here is imported by the client island, so this file
 * never reaches the browser bundle.
 */

export interface AdviceBlock {
  heading: string;
  body: string;
}

export interface CuratedPage {
  slug: string;
  /** <title>. Distinct from every other page, including the blog. */
  title: string;
  h1: string;
  description: string;
  /** One-paragraph answer, up top, before anything else. */
  lede: string;
  options: PackingOptions;
  advice: AdviceBlock[];
  /** Items unique to this scenario, appended after the generated ones. */
  extras: PackingItem[];
  /** Blog slugs to link to for depth. */
  related: string[];
}

const p = (page: CuratedPage) => page;

export const CURATED_PAGES: CuratedPage[] = [
  // ------------------------------------------------- destination + season ---
  p({
    slug: "what-to-pack-for-japan-in-winter",
    title: "What to Pack for Japan in Winter: The Complete List",
    h1: "What to pack for Japan in winter",
    description:
      "A winter Japan packing list built around what actually catches visitors out: constant shoe removal, cash-only counters, brutal indoor heating, and tiny hotel rooms.",
    lede: "Japan in winter is cold outside and genuinely hot inside, and you will take your shoes off several times a day. Pack thin layers you can shed, slip-on shoes, socks without holes, and more cash than feels normal.",
    options: { type: "city", days: 10, climate: "cold", carryOnOnly: false, checkedBag: true, kids: false },
    advice: [
      {
        heading: "Layers, not one big coat",
        body: "Tokyo and Kyoto sit around 2–10°C in January, which sounds manageable — and it is. What catches people out is the other side: shops, trains, and restaurants are heated hard, often to 24°C or more. A single heavy parka means you spend the day carrying it. Three thin layers under a windproof shell lets you strip down at the door and stay comfortable in both worlds.",
      },
      {
        heading: "Your shoes come off constantly",
        body: "Temples, ryokan, many restaurants, some museums, and a fair number of shops and clinics all expect bare or socked feet. Lace-up boots turn that into a two-minute production every time. Bring shoes you can step out of, and bring socks you would be happy for a stranger to look at — this is the trip where the pair with the hole gets noticed.",
      },
      {
        heading: "Cash is still king in a surprising number of places",
        body: "Cards are widely accepted in cities, but small restaurants, temple entries, shrine charms, older ryokan and rural buses are frequently cash-only. Withdraw from a 7-Eleven or Japan Post ATM — those reliably accept foreign cards when bank ATMs sometimes don't. A coin purse stops matter more than it sounds: the ¥100 and ¥500 coins accumulate fast and are what vending machines and lockers want.",
      },
      {
        heading: "Pack smaller than you think",
        body: "Business hotel rooms are compact enough that a large suitcase may not open fully on the floor. Shinkansen oversized-luggage spaces need a free reservation in advance. If you're moving between cities, the takkyubin luggage-forwarding service will send your case hotel-to-hotel overnight for a modest fee — which means you travel with a day bag and your case meets you there.",
      },
    ],
    extras: [
      { id: "jp-slip-ons", category: "clothing", label: "Slip-on shoes", note: "You'll remove them at temples, ryokan, and plenty of restaurants." },
      { id: "jp-socks", category: "clothing", label: "Socks you'd show a stranger", note: "Because you will, several times a day." },
      { id: "jp-coin-purse", category: "documents", label: "Coin purse", note: "¥100 and ¥500 coins pile up fast and run the vending machines and lockers." },
      { id: "jp-suica", category: "tech", label: "Suica or Pasmo added to Apple Wallet", note: "Set it up before you land; it covers trains, buses and most convenience stores." },
      { id: "jp-handkerchief", category: "gear", label: "A small hand towel", note: "Public toilets are immaculate and very often have no dryer or paper towels." },
      { id: "jp-rubbish-bag", category: "gear", label: "A bag for your own rubbish", note: "Street bins are rare; you carry your litter until you find one." },
      { id: "hand-warmers", category: "gear", label: "Hand warmers", note: "Or buy hokkairo stick-on ones from any convenience store for pocket change." },
    ],
    related: ["packing-list-for-international-travel", "how-to-plan-a-trip-step-by-step"],
  }),

  p({
    slug: "what-to-pack-for-iceland-in-summer",
    title: "What to Pack for Iceland in Summer: A Realistic List",
    h1: "What to pack for Iceland in summer",
    description:
      "Icelandic summer means 10°C, sideways rain, and daylight at 2am. Here's the packing list for the weather Iceland actually has, not the one the photos suggest.",
    lede: "Summer in Iceland averages 10–13°C with wind and rain that arrive without warning. Pack waterproof trousers as well as a jacket, an eye mask for the midnight sun, and swimwear you can reach easily.",
    options: { type: "hiking", days: 7, climate: "mild", carryOnOnly: false, checkedBag: true, kids: false },
    advice: [
      {
        heading: "Wind is the story, not cold",
        body: "Ten degrees is fine. Ten degrees with a 20 m/s crosswind carrying rain horizontally is a different proposition, and it is a normal Tuesday. The single most useful item is a genuinely windproof, genuinely waterproof shell — and the item most people wish they'd brought is waterproof over-trousers. A jacket alone means arriving at a waterfall dry on top and soaked from the waist down.",
      },
      {
        heading: "The midnight sun is not a metaphor",
        body: "In June it never properly gets dark. Curtains in guesthouses are often thin, campervans have none worth the name, and your body will not volunteer to sleep at 11pm in broad daylight. An eye mask is a small item that decides whether the trip is restful. Earplugs help too if you're near a campsite or a road.",
      },
      {
        heading: "Swimwear lives near the top of the bag",
        body: "Geothermal pools are the national pastime and every town has one. Bring swimwear, flip-flops, and a quick-dry towel — and know that pool etiquette requires a thorough naked shower before you enter, in an open communal area. This is non-negotiable and enforced. Knowing it in advance is the difference between a good afternoon and an awkward one.",
      },
      {
        heading: "Skip the cash, bring the sunglasses",
        body: "Iceland is close to cashless — cards work at fuel pumps, toilets, and remote cafés, so exchanging money is largely wasted effort. Do bring sunglasses: the sun stays low even at midday, and low-angle glare off wet roads and glaciers is constant. And buy alcohol at the arrivals duty-free before you leave the airport, unless you enjoy paying triple.",
      },
    ],
    extras: [
      { id: "is-overtrousers", category: "clothing", label: "Waterproof over-trousers", note: "The item most people regret leaving at home." },
      { id: "is-eyemask", category: "gear", label: "Eye mask", note: "It does not get dark in June, and curtains rarely help." },
      { id: "is-swim", category: "clothing", label: "Swimwear and flip-flops", note: "Every town has a geothermal pool; a naked pre-shower is required and enforced." },
      { id: "is-buff", category: "clothing", label: "Buff or neck gaiter", note: "Wind-driven rain finds the gap between collar and hood." },
      { id: "is-carsick", category: "health", label: "Motion sickness tablets", note: "The Ring Road plus gravel side roads plus a boat tour is a lot of movement." },
      { id: "is-dutyfree", category: "documents", label: "Duty-free plan for alcohol", note: "Buy on arrival at Keflavík; state-monopoly prices in town are roughly triple." },
    ],
    related: ["packing-list-for-international-travel", "how-to-budget-for-a-trip"],
  }),

  p({
    slug: "what-to-pack-for-thailand",
    title: "What to Pack for Thailand: A Two-Week Backpacking List",
    h1: "What to pack for Thailand",
    description:
      "A Thailand packing list that assumes you'll buy half of it there. Temple dress codes, the heat, the rain, and the things that are genuinely worth carrying from home.",
    lede: "Pack light for Thailand — clothes, toiletries and most gear are cheap and everywhere. What's worth carrying from home is sunscreen, repellent you trust, and one outfit that covers shoulders and knees.",
    options: { type: "backpacking", days: 14, climate: "tropical", carryOnOnly: false, checkedBag: true, kids: false },
    advice: [
      {
        heading: "Temple dress code is enforced, not suggested",
        body: "Shoulders and knees covered, for everyone. The Grand Palace in Bangkok is the strictest and turns away people daily; sarongs are sometimes available to rent at the gate, sometimes not. One pair of light long trousers and one shirt with sleeves solves it for the whole trip, and doubles as protection on the days the sun is unreasonable.",
      },
      {
        heading: "Buy it there — with three exceptions",
        body: "Clothing, flip-flops, toiletries, and a beach towel all cost less in any Thai 7-Eleven or market than the space they take in your bag. Three things are worth carrying: sunscreen (expensive locally and frequently mixed with skin-whitening agents), a repellent you already know works, and any medication you rely on. Thai pharmacies are excellent and cheap for everything else.",
      },
      {
        heading: "Rain is a daily event, not a ruined day",
        body: "In the wet season, expect a heavy downpour most afternoons that clears within the hour. That calls for a light rain shell and dry bags for electronics — not for cancelling plans. If you're taking ferries between islands, bags get loaded on open decks: a waterproof cover or a liner bag inside your pack is the difference between damp and destroyed.",
      },
      {
        heading: "Feet and scooters",
        body: "You'll be in sandals almost permanently, which is fine until a long temple day; one pair of closed shoes earns its place. If you plan to ride a scooter, wear a helmet that actually fastens and cover your legs — road rash from a low-speed slide on hot tarmac is the single most common injury travellers bring home from Thailand, and travel insurance often refuses claims without the correct licence.",
      },
    ],
    extras: [
      { id: "th-modest", category: "clothing", label: "Light long trousers and a sleeved shirt", note: "Temple dress code, enforced at the door." },
      { id: "th-sunscreen", category: "toiletries", label: "Sunscreen brought from home", note: "Local versions are pricey and often contain whitening agents." },
      { id: "th-drybag", category: "gear", label: "Dry bag or pack liner", note: "Ferry bags ride on open decks in the rain." },
      { id: "th-closed-shoes", category: "clothing", label: "One pair of closed shoes", note: "For long temple days and anywhere with steps." },
      { id: "th-insurance-licence", category: "documents", label: "Motorcycle licence, if you plan to ride", note: "Insurers routinely reject scooter claims without one." },
      { id: "th-power", category: "tech", label: "Type A/B/C adapter", note: "Thai sockets take all three; a universal adapter is fine." },
    ],
    related: ["packing-list-for-international-travel", "how-to-budget-for-a-trip"],
  }),

  p({
    slug: "what-to-pack-for-italy-in-summer",
    title: "What to Pack for Italy in Summer: Cities, Churches & Heat",
    h1: "What to pack for Italy in summer",
    description:
      "An Italian summer packing list built around three realities: church dress codes, cobblestones, and 35°C afternoons. Includes what to wear and what to leave home.",
    lede: "Italy in summer means heat, cobblestones and dress codes. Pack a light scarf or shawl for churches, shoes with real soles, and a refillable bottle — the public fountains are drinkable and everywhere.",
    options: { type: "city", days: 7, climate: "hot", carryOnOnly: false, checkedBag: true, kids: false },
    advice: [
      {
        heading: "Churches turn people away every day",
        body: "St Peter's Basilica, the Duomo in Florence, and hundreds of smaller churches require covered shoulders and knees, and they employ people at the door specifically to enforce it. In 35°C heat you will not want to dress for it all day — so carry a light scarf or linen shawl in your bag and a pair of trousers or a longer skirt for any day with a cathedral on it. It weighs nothing and saves the queue you already stood in.",
      },
      {
        heading: "The cobblestones are the real terrain",
        body: "Rome's sampietrini, Florence's flagstones, and Venice's bridges are unforgiving. Thin-soled fashion sneakers leave your feet aching by day three, and cheap suitcase wheels genuinely break. Pack shoes with a proper sole and, if you're moving between cities, a bag you're willing to carry up a staircase rather than drag.",
      },
      {
        heading: "Water is free; the fountains are safe",
        body: "Rome's nasoni run continuously with cold, drinkable water, and most Italian cities have equivalents. A refillable bottle saves several euros a day and a lot of plastic. Restaurants charge for bottled water and it is normal to be asked whether you want it — 'acqua del rubinetto' is tap and is fine.",
      },
      {
        heading: "August is quieter than you expect, in the wrong way",
        body: "Mid-August is when Italians take their own holidays. Cities empty, but so do the good restaurants and small shops — many close for two or three weeks. If you're going then, plan around it, and expect the heat to peak. Dress a shade smarter than you would at home: Italy notices, and the difference between beachwear and city clothes matters inland.",
      },
    ],
    extras: [
      { id: "it-shawl", category: "clothing", label: "Light scarf or linen shawl", note: "Covers shoulders at church doors; weighs nothing in a day bag." },
      { id: "it-soles", category: "clothing", label: "Shoes with a proper sole", note: "Cobblestones punish thin-soled sneakers by day three." },
      { id: "it-bottle", category: "gear", label: "Refillable bottle", note: "Rome's nasoni fountains run cold, free and drinkable all day." },
      { id: "it-crossbody", category: "gear", label: "Crossbody bag that zips", note: "Pickpockets work the same three streets in every Italian city." },
      { id: "it-mosquito", category: "health", label: "Mosquito repellent", note: "Venice and Florence at dusk in August are worse than most people expect." },
    ],
    related: ["packing-list-for-international-travel", "how-to-plan-a-trip-step-by-step"],
  }),

  p({
    slug: "what-to-pack-for-a-safari",
    title: "What to Pack for a Safari: Colours, Weight Limits & Dust",
    h1: "What to pack for a safari",
    description:
      "A safari packing list covering the two rules that catch people out: which colours to avoid and why, and the strict soft-bag weight limits on light aircraft transfers.",
    lede: "Safari packing has two hard rules: neutral colours only — no blue or black, no camouflage — and a soft-sided bag, because light aircraft transfers cap luggage at around 15kg with no hard cases allowed.",
    options: { type: "hiking", days: 7, climate: "hot", carryOnOnly: false, checkedBag: true, kids: false },
    advice: [
      {
        heading: "Colour is a practical rule, not a dress code",
        body: "Khaki, olive, beige and brown. Avoid dark blue and black — tsetse flies are drawn to them and their bite is memorable. Avoid white, which shows the dust within an hour. And avoid camouflage entirely: it is illegal for civilians in several African countries, including Zimbabwe, Zambia and Botswana, and confiscation at the airport does happen.",
      },
      {
        heading: "The weight limit is real and the bag shape matters",
        body: "Light aircraft transfers between camps typically allow 15kg total, including hand luggage, in a soft-sided duffel — hard-shell suitcases will not fit in the hold and get refused. Weigh your bag at home. Most camps include daily laundry, so pack three or four days of clothes for a week and stop worrying about it.",
      },
      {
        heading: "Dawn drives are genuinely cold",
        body: "A game drive leaves before sunrise in an open vehicle at speed. Even in a hot climate, that is a fleece-and-beanie proposition for the first two hours, after which you'll be in a t-shirt by ten. Layers you can peel off and stuff in a bag are the entire wardrobe strategy. A blanket is usually provided; a windproof layer is usually not.",
      },
      {
        heading: "Dust, optics and power",
        body: "Dust gets into everything, cameras first — a dry bag or a sealed pouch for lenses is worth its space. Bring binoculars per person rather than one pair to share, because the moment does not wait. Camp power is often generator or solar with limited hours, so a power bank matters more than a wall charger. Leave the drone at home: they are banned in most national parks and the fines are not small.",
      },
    ],
    extras: [
      { id: "sf-neutrals", category: "clothing", label: "Neutral clothing — khaki, olive, beige", note: "No dark blue or black (tsetse flies), no white (dust), no camouflage (illegal in several countries)." },
      { id: "sf-duffel", category: "gear", label: "Soft-sided duffel, under 15kg", note: "Light aircraft transfers refuse hard cases and enforce the weight." },
      { id: "sf-fleece", category: "clothing", label: "Fleece and beanie for dawn drives", note: "Open vehicle, before sunrise, at speed. It's cold." },
      { id: "sf-binoculars", category: "gear", label: "Binoculars, one pair per person", note: "Sharing means missing it." },
      { id: "sf-camera-dust", category: "tech", label: "Sealed pouch for camera and lenses", note: "Dust is the main cause of safari camera failure." },
      { id: "sf-malaria", category: "health", label: "Malaria prophylaxis and a prescription copy", note: "Start the course before you travel, per your doctor's schedule." },
      { id: "sf-torch", category: "gear", label: "Head torch", note: "Camps power down at night and paths between tents are unlit." },
    ],
    related: ["packing-list-for-international-travel", "how-to-plan-a-trip-step-by-step"],
  }),

  p({
    slug: "what-to-pack-for-new-york-in-winter",
    title: "What to Pack for New York in Winter: A 4-Day List",
    h1: "What to pack for New York in winter",
    description:
      "A winter New York packing list for a long weekend: wind tunnels, slush at every crossing, overheated interiors, and the fact that you'll be carrying your coat indoors.",
    lede: "New York in winter is a walking city with wind funnelled between towers and slush at every kerb. Pack waterproof boots with grip, a hat that covers your ears, and layers you can strip off the moment you step inside.",
    options: { type: "city", days: 4, climate: "cold", carryOnOnly: false, checkedBag: true, kids: false },
    advice: [
      {
        heading: "You will walk further than you plan to",
        body: "Twenty blocks looks like nothing on a map and takes twenty minutes on foot, and you'll do that several times a day. Whatever you'd normally consider a comfortable shoe needs to be one step more comfortable — and waterproof. Kerbside slush pools are ankle-deep at crossings for days after snow, and fashion boots with smooth soles are genuinely hazardous on the polished-marble lobby floors that follow.",
      },
      {
        heading: "The wind between buildings is the coldest part",
        body: "Avenues run north–south and funnel wind straight down them; the temperature on your face on Sixth Avenue bears little relation to the forecast. A hat that covers your ears and a scarf you can pull up over your chin do more than a heavier coat. Gloves you can use a touchscreen through save you taking them off forty times a day.",
      },
      {
        heading: "Indoors is 24°C and you're carrying the coat",
        body: "Restaurants, subway cars, museums and shops are heated hard. Every layer you wear must be one you're happy to be seen in, and you need somewhere to put the coat — a bag with a bit of give, or a coat you don't mind draping over a chair back. This is the main argument for two mid layers instead of one enormous parka.",
      },
      {
        heading: "Pack lighter than usual, deliberately",
        body: "Anything you forget is available within a ten-minute walk, at any hour. That makes New York the wrong city to pack contingencies for. Bring a smart-casual outfit if you have a restaurant or a show booked — plenty of places still care — and leave the rest of the 'just in case' pile at home.",
      },
    ],
    extras: [
      { id: "winter-boots", category: "clothing", label: "Waterproof boots with grip", note: "Kerbside slush is ankle-deep for days, and lobby floors are polished stone." },
      { id: "ny-earhat", category: "clothing", label: "A hat that covers your ears", note: "The avenues funnel wind straight at you." },
      { id: "ny-touch-gloves", category: "clothing", label: "Touchscreen gloves", note: "You'll be checking directions constantly." },
      { id: "ny-smart-outfit", category: "clothing", label: "One smart-casual outfit", note: "Enough restaurants and theatres still have a dress code." },
      { id: "ny-metro-card", category: "documents", label: "A contactless card for OMNY", note: "Tap straight in at the turnstile; no ticket machine queue." },
    ],
    related: ["packing-list-for-international-travel", "travel-checklist-before-leaving"],
  }),

  p({
    slug: "what-to-pack-for-bali",
    title: "What to Pack for Bali: A 10-Day List",
    h1: "What to pack for Bali",
    description:
      "A Bali packing list covering temple sarongs, reef-safe sunscreen, scooter safety, and why laundry at a dollar a kilo means you should pack for four days, not ten.",
    lede: "Pack four days of clothes for ten days in Bali — laundry costs about a dollar a kilo and comes back the next morning. What's worth carrying is a sarong, reef-safe sunscreen, and a stomach kit you trust.",
    options: { type: "beach", days: 10, climate: "tropical", carryOnOnly: false, checkedBag: true, kids: false },
    advice: [
      {
        heading: "A sarong is the single most useful item",
        body: "Temples require a sarong and sash for everyone, regardless of what else you're wearing. Larger sites lend them, smaller ones don't, and the lent ones have been worn by a lot of people in a humid climate. Buying your own for a few dollars on day one means you can visit anything on impulse — and it doubles as a beach towel, a shoulder cover, and a shade for a bus window.",
      },
      {
        heading: "Pack for four days, not ten",
        body: "Laundry services are everywhere at roughly a dollar a kilo, usually returned within 24 hours. Packing a full ten days of clothes into a humid climate means carrying a heavier bag so you can wear damp clothes. Bring quick-dry fabrics, expect nothing cotton to fully dry, and accept the wash.",
      },
      {
        heading: "Scooters are how Bali moves, and how people get hurt",
        body: "If you're going to ride, wear a helmet that fastens, cover your legs, and check your travel insurance covers you — most policies require a licence valid for the engine size, and most claims that get refused are scooter claims. Long trousers and closed shoes on a scooter is not caution, it's the difference between a wobble and a skin graft.",
      },
      {
        heading: "The stomach kit and the sunscreen",
        body: "Bring rehydration sachets, an anti-diarrheal, and the confidence to use them, because a couple of rough days is common enough to have a nickname. Drink bottled or filtered water and skip ice only where the place looks improvised. Sunscreen is expensive locally and reef-safe versions are scarce — several Indonesian dive sites now ask for it, so bring your own.",
      },
    ],
    extras: [
      { id: "bl-sarong", category: "clothing", label: "Your own sarong and sash", note: "Required at every temple; the lent ones are much-used in a humid climate." },
      { id: "bl-reef-safe", category: "toiletries", label: "Reef-safe sunscreen from home", note: "Expensive and hard to find locally." },
      { id: "bl-scooter-kit", category: "clothing", label: "Long trousers and closed shoes for riding", note: "Road rash is the most common travel injury here." },
      { id: "bl-rehydration", category: "health", label: "Rehydration sachets and anti-diarrheal", note: "Common enough that locals have a name for it." },
      { id: "bl-repellent", category: "health", label: "DEET or picaridin repellent", note: "Dengue is present year-round." },
      { id: "bl-cash", category: "documents", label: "Rupiah in cash", note: "Warungs, temple donations and small drivers are cash-only." },
    ],
    related: ["packing-list-for-international-travel", "how-to-budget-for-a-trip"],
  }),

  p({
    slug: "what-to-pack-for-a-cruise",
    title: "What to Pack for a Cruise: Cabin Storage, Dress Codes & Ports",
    h1: "What to pack for a cruise",
    description:
      "A cruise packing list built around the cabin: vertical storage on magnetic steel walls, scarce outlets, banned surge protectors, and the bag that arrives four hours after you do.",
    lede: "A cruise cabin is small, its walls are magnetic steel, and its power outlets are few. Pack magnetic hooks, a non-surge USB charger, and a carry-on with your swimwear — your main bag may not arrive for hours.",
    options: { type: "beach", days: 7, climate: "hot", carryOnOnly: false, checkedBag: true, kids: false },
    advice: [
      {
        heading: "Storage goes up, because the floor is taken",
        body: "Cabin walls and doors are steel, so magnetic hooks turn blank vertical surfaces into storage for hats, lanyards, and wet swimwear. An over-the-door shoe organiser holds the entire contents of a bathroom shelf that doesn't exist. Suitcases usually slide under the bed, which is the only reason a hard case is manageable at all.",
      },
      {
        heading: "Power is the most-confiscated category",
        body: "Almost every cruise line bans surge-protected extension leads outright, as a fire risk, and security screens for them at embarkation. What is permitted is a simple non-surge USB charging cube or a cruise-approved multi-port block. Bring one, plus longer cables than usual, because outlets are frequently on the far side of the desk from the bed.",
      },
      {
        heading: "Your bag arrives hours after you do",
        body: "You board, the cabin may not be ready, and checked luggage is delivered to the door any time up to dinner. Put swimwear, sunscreen, medication and anything you need for the first afternoon in a small carry-on you keep with you. The alternative is watching the pool from a deck chair in the clothes you travelled in.",
      },
      {
        heading: "Dress codes and shore days",
        body: "Most lines run one or two 'formal' or 'elegant' evenings per week; the standard is a jacket or a cocktail dress rather than black tie, but turning up in shorts means dining elsewhere. For ports, pack a small day bag, small-denomination cash for local vendors and tips, and remember your ship card and passport requirements differ per port — check before each stop rather than assuming.",
      },
    ],
    extras: [
      { id: "cr-magnets", category: "gear", label: "Magnetic hooks", note: "Cabin walls are steel; this is where your vertical storage comes from." },
      { id: "cr-charger", category: "tech", label: "Non-surge USB charging cube", note: "Surge-protected extension leads are banned and confiscated at embarkation." },
      { id: "cr-day-one-bag", category: "gear", label: "Day-one carry-on with swimwear and meds", note: "Checked bags can arrive at the cabin hours later." },
      { id: "cr-formal", category: "clothing", label: "One formal-night outfit", note: "Jacket or cocktail dress; shorts get you sent to the buffet." },
      { id: "cr-lanyard", category: "gear", label: "Lanyard for your ship card", note: "It's your room key, your wallet and your boarding pass at every port." },
      { id: "cr-seasickness", category: "health", label: "Motion sickness tablets or bands", note: "Take them before you feel it, not after." },
      { id: "cr-small-bills", category: "documents", label: "Small-denomination cash", note: "For port taxis, tips and market stalls." },
    ],
    related: ["packing-list-for-international-travel", "how-to-plan-a-trip-step-by-step"],
  }),

  p({
    slug: "what-to-pack-for-vietnam",
    title: "What to Pack for Vietnam: North to South in Two Weeks",
    h1: "What to pack for Vietnam",
    description:
      "Vietnam runs 1,600km north to south and Hanoi in winter is genuinely cold. A packing list for a two-week trip that crosses climates, sleeper buses and tailors.",
    lede: "Vietnam is two climates in one country: Hanoi in January needs a proper jacket while Saigon never drops below warm. Pack layers, a rain poncho rather than an umbrella, and leave space in the bag for Hoi An.",
    options: { type: "backpacking", days: 14, climate: "tropical", carryOnOnly: false, checkedBag: true, kids: false },
    advice: [
      {
        heading: "The north is not the south",
        body: "Most Vietnam packing lists assume tropical heat throughout, and travellers arrive in Hanoi in January in shorts. Northern winters run 10–15°C with damp grey drizzle and buildings that have no heating, which feels colder than the number suggests. If your route covers the whole country, pack a warm layer and a rain shell for the north and accept that they'll be dead weight in the Mekong Delta.",
      },
      {
        heading: "A poncho beats an umbrella",
        body: "Rain in Vietnam frequently arrives while you're on the back of a scooter or a motorbike taxi, and an umbrella is useless there. The cheap plastic poncho sold on every street corner is what locals use — it covers you and the bag on your back. Buy one there rather than carrying one.",
      },
      {
        heading: "Sleeper buses and overnight trains have their own kit",
        body: "Overnight transport is how most people cover the distance, and the berths are short, the lights stay on, and bags travel below or beside you. An eye mask, earplugs and a small padlock make it survivable. Slip-on shoes matter here too — shoes come off on sleeper buses and at most family homestays.",
      },
      {
        heading: "Leave room for what you'll have made",
        body: "Hoi An's tailors will make clothing to measure in 24–48 hours at prices that make it worth planning around. If that's on your itinerary, arrive with space in the bag or an empty foldable duffel. Bring a photo of what you want — describing a garment across a language gap goes better with a picture.",
      },
    ],
    extras: [
      { id: "vn-warm-layer", category: "clothing", label: "A warm layer for the north", note: "Hanoi in winter is 10–15°C and buildings are unheated." },
      { id: "vn-poncho", category: "clothing", label: "Rain poncho", note: "Works on the back of a scooter, which an umbrella does not." },
      { id: "vn-slip-ons", category: "clothing", label: "Slip-on shoes", note: "Off at homestays, temples and on sleeper buses." },
      { id: "vn-mask", category: "health", label: "A face mask for traffic", note: "Hanoi and Saigon air quality regularly hits unhealthy levels." },
      { id: "vn-foldable-duffel", category: "gear", label: "Foldable duffel", note: "For the Hoi An tailoring you didn't plan to buy." },
      { id: "vn-cash", category: "documents", label: "Small dong notes", note: "Rural buses, markets and street food are cash-only." },
    ],
    related: ["packing-list-for-international-travel", "how-to-budget-for-a-trip"],
  }),

  // ----------------------------------------------------- duration + type ---
  p({
    slug: "7-day-beach-trip-packing-list",
    title: "7-Day Beach Trip Packing List (With Quantities)",
    h1: "7-day beach trip packing list",
    description:
      "A week at the beach, itemised with real quantities: two swimsuits, five outfits, and how much sunscreen a week actually takes. Print it or check it off online.",
    lede: "A week at the beach needs less than you think, in the right combinations: two swimsuits so one is always dry, five outfits rather than seven, and considerably more sunscreen than one bottle.",
    options: { type: "beach", days: 7, climate: "hot", carryOnOnly: false, checkedBag: true, kids: false },
    advice: [
      {
        heading: "Two swimsuits is the rule that matters",
        body: "One dries while you wear the other. Pulling on a cold, damp swimsuit at nine in the morning is the small daily misery that a second one removes for almost no weight. If you're swimming twice a day, make it three.",
      },
      {
        heading: "You will wear less than you pack",
        body: "Beach days are swimwear and a cover-up. The clothes only matter in the evening, which means five outfits covers a week with room to repeat. The category people genuinely under-pack is the evening layer: air conditioning indoors and a sea breeze after sunset make a light long-sleeve the most-worn item of the trip.",
      },
      {
        heading: "How much sunscreen a week actually needs",
        body: "A full-body application for one adult is roughly 30–35ml — about a shot glass. Applied twice a day for seven days, that's around 500ml per person, and most travel bottles hold 100ml. Buy the big bottle and decant, or plan to buy more at the destination and accept resort pricing. Running out on day four is the most common way a beach holiday turns painful.",
      },
      {
        heading: "Sand gets into everything",
        body: "A zip pouch for phone, cards and keys keeps sand out of charging ports, which is the failure mode that ends holidays for electronics. A quick-dry towel packs smaller than a hotel towel and, unlike the hotel's, is allowed to leave the property.",
      },
    ],
    extras: [
      { id: "b7-sunscreen-volume", category: "toiletries", label: "About 500ml of sunscreen per person", note: "35ml per full application, twice a day, seven days." },
      { id: "b7-evening-layer", category: "clothing", label: "A light long-sleeve for evenings", note: "Air conditioning and the after-dark breeze; the most-worn item of the week." },
      { id: "b7-zip-pouch", category: "gear", label: "Zip pouch for phone and cards", note: "Sand in a charging port is how beach holidays kill electronics." },
    ],
    related: ["packing-list-for-international-travel", "how-to-plan-a-trip-step-by-step"],
  }),

  p({
    slug: "weekend-city-break-packing-list",
    title: "Weekend City Break Packing List: One Bag, Two Nights",
    h1: "Weekend city break packing list",
    description:
      "A two-night city break packed into one cabin bag. What a 48-hour wardrobe actually looks like, and why checking a bag costs you a quarter of the trip.",
    lede: "A two-night city break fits in one cabin bag, and should: checking luggage costs you roughly an hour at each end, which is a real fraction of a 48-hour trip.",
    options: { type: "city", days: 3, climate: "mild", carryOnOnly: true, checkedBag: false, kids: false },
    advice: [
      {
        heading: "The maths argues for one bag",
        body: "Bag drop at departure and the carousel on arrival cost somewhere between forty minutes and an hour and a half, each way. On a two-week holiday that's noise. On a 48-hour weekend it's a meal, a museum, or the difference between arriving in time for dinner and arriving in time for bed.",
      },
      {
        heading: "A 48-hour wardrobe is three tops and two bottoms",
        body: "Wear one set, pack the rest. One pair of shoes on your feet, and only add a second if a specific booking demands it. The bulkiest jacket goes on your body through the airport. That leaves the bag mostly empty, which is exactly the margin you want for whatever you buy while you're there.",
      },
      {
        heading: "The shoes decide the weekend",
        body: "A city break is a walking holiday that doesn't announce itself as one — 20,000 steps a day is normal. Whatever you wear needs to already be broken in. Blister plasters packed in advance cost nothing; finding a pharmacy in an unfamiliar city on a Sunday costs an afternoon.",
      },
      {
        heading: "Check the bag policy before the museum, not at it",
        body: "A surprising number of major museums and galleries refuse backpacks of any size and make you queue for a cloakroom. A crossbody or tote goes straight through. If your itinerary is museum-heavy, the day bag you choose is worth thirty seconds of thought.",
      },
    ],
    extras: [
      { id: "wc-crossbody", category: "gear", label: "Crossbody bag rather than a backpack", note: "Many museums refuse backpacks and send you to a cloakroom queue." },
      { id: "wc-charge-night-before", category: "tech", label: "Everything charged the night before", note: "Two days is short enough to skip the chargers entirely if you're disciplined." },
    ],
    related: ["packing-list-for-international-travel", "travel-checklist-before-leaving"],
  }),

  p({
    slug: "3-day-business-trip-packing-list",
    title: "3-Day Business Trip Packing List (Carry-On Only)",
    h1: "3-day business trip packing list",
    description:
      "Three days of meetings in one cabin bag: one suit worn twice, two shirts, and the reason your presentation needs to exist in two places that aren't the cloud.",
    lede: "Three days of meetings fits in a cabin bag: one suit worn throughout, two or three shirts, and a comfortable pair of shoes for everything that isn't the meeting itself.",
    options: { type: "business", days: 3, climate: "mild", carryOnOnly: true, checkedBag: false, kids: false },
    advice: [
      {
        heading: "Carry-on only is a risk decision, not a convenience one",
        body: "A delayed checked bag on a leisure trip is annoying. On a business trip it means presenting in the clothes you flew in. Three days of business wear genuinely fits in a cabin bag, and the certainty is worth more than the extra space.",
      },
      {
        heading: "One suit, worn repeatedly, hung properly",
        body: "Nobody is auditing whether the jacket is the same one. Two or three shirts rotate underneath it. Hang the suit in the bathroom during your first shower and most travel creases fall out in ten minutes — faster and safer than the hotel iron, which will find the one synthetic thing you own.",
      },
      {
        heading: "Two pairs of shoes, and the second is for walking",
        body: "Dress shoes for the meeting, something comfortable for the airport, the evening, and the twenty minutes between the hotel and the office. Wear the heavier pair on the plane. This is one of the few packing decisions where the second item genuinely earns its space.",
      },
      {
        heading: "Your presentation needs to survive the conference Wi-Fi",
        body: "Cloud storage is not a backup when the venue's network fails at 8:55am. Carry the deck on a USB stick and keep a copy on the laptop itself, not just synced. Bring the adapters for whatever the room might have — HDMI and USB-C at minimum. And put a spare shirt in the laptop bag: the coffee incident happens on the way to the meeting, never after it.",
      },
    ],
    extras: [
      { id: "bt-usb-deck", category: "tech", label: "Presentation on a USB stick and stored locally", note: "Cloud-only is not a backup when the venue Wi-Fi fails." },
      { id: "bt-adapters", category: "tech", label: "HDMI and USB-C display adapters", note: "Assume the meeting room has neither of the ports your laptop has." },
      { id: "bt-spare-shirt", category: "clothing", label: "A spare shirt in the laptop bag", note: "The coffee incident always happens on the way there." },
      { id: "bt-steam", category: "toiletries", label: "The bathroom-steam trick instead of an iron", note: "Hang the suit during your first shower; creases drop in ten minutes." },
    ],
    related: ["packing-list-for-international-travel", "travel-checklist-before-leaving"],
  }),

  p({
    slug: "weekend-hiking-packing-list",
    title: "Weekend Hiking Packing List: Two Days, One Pack",
    h1: "Weekend hiking packing list",
    description:
      "A two-day hiking list organised by weight: the big three that dominate your pack, the layering system that works, and the items you carry precisely because you hope not to use them.",
    lede: "On a weekend hike you carry everything, so pack by weight rather than by category. Your pack, sleep system and shelter decide the load; everything else is grams around the edges.",
    options: { type: "hiking", days: 2, climate: "mild", carryOnOnly: false, checkedBag: false, kids: false },
    advice: [
      {
        heading: "The big three decide your weekend",
        body: "Pack, sleep system and shelter typically account for more than half your carried weight. Trimming 200g off your toiletries while carrying a four-kilo tent is optimising the wrong end. If you're borrowing or buying anything, that's where the decision matters — and where it's worth going out for a night close to home before committing to a real route.",
      },
      {
        heading: "Layering, and never cotton",
        body: "Base layer to move moisture, mid layer to hold warmth, shell to stop wind and rain. Cotton absorbs sweat, stays wet, and then actively cools you — which is a comfort problem on a warm day and a genuine safety problem on a cold one. Merino or synthetic throughout, including socks and underwear.",
      },
      {
        heading: "Plan food per meal, not as 'snacks'",
        body: "Two days is four or five eating occasions. Name each one and pack for it, and you'll carry the right amount instead of the vague amount. Add one emergency ration that stays in the bag no matter what — the day that runs long is exactly the day you've eaten everything.",
      },
      {
        heading: "Carry the things you hope to waste",
        body: "A head torch on a day hike, a first-aid kit you don't open, a whistle, a fully charged phone with offline maps, and a note of your route left with someone at home. These are the items whose value is entirely in the scenario where the walk goes wrong — which is why they get cut first and matter most.",
      },
    ],
    extras: [
      { id: "wh-sleep-system", category: "gear", label: "Sleeping bag and mat rated for the night, not the day", note: "Ground conducts heat away faster than air; the mat's R-value matters as much as the bag." },
      { id: "wh-stove", category: "gear", label: "Stove, fuel and a lighter", note: "Plus a backup ignition source that isn't the same lighter." },
      { id: "wh-emergency-ration", category: "gear", label: "One emergency ration you don't plan to eat", note: "For the day the walk runs three hours long." },
      { id: "wh-route-note", category: "documents", label: "Your route, left with someone at home", note: "With the time you expect to be back." },
    ],
    related: ["packing-list-for-international-travel", "how-to-plan-a-trip-step-by-step"],
  }),

  p({
    slug: "two-week-europe-packing-list",
    title: "Two-Week Europe Packing List for Multiple Cities",
    h1: "Two-week Europe packing list",
    description:
      "A multi-city Europe list built around the bag you carry up a fourth-floor walk-up: one laundry stop, three plug types, and 15°C of variation between north and south.",
    lede: "For two weeks across several European cities, pack one week of clothes and plan a laundry stop. The binding constraint isn't the wardrobe — it's the bag you'll carry up a fourth-floor walk-up with no lift.",
    options: { type: "city", days: 14, climate: "mild", carryOnOnly: false, checkedBag: true, kids: false },
    advice: [
      {
        heading: "The bag moves, so choose it for the stairs",
        body: "A multi-city trip means your luggage gets lifted onto train racks, dragged over cobblestones, and carried up the staircase of an apartment whose listing did not mention the lift. A bag you can carry for ten minutes beats a bag you can only wheel. This is the single decision that shapes the whole trip.",
      },
      {
        heading: "One wash, not two wardrobes",
        body: "Seven days of clothes plus one laundry stop covers fourteen. Almost every European city has self-service laundrettes, and most apartment rentals have a machine. Budget two hours in the middle of the trip on a day you'd have spent walking anyway, and carry half the weight for the entire fortnight.",
      },
      {
        heading: "Three plug types, not one",
        body: "Type C two-pin covers most of the continent, but the UK and Ireland use Type G and Switzerland uses Type J, which the standard European plug does not fit. If your route crosses those borders, a universal adapter or a second plug is the difference between a charged phone and a hunt for a shop.",
      },
      {
        heading: "North to south is a 15-degree swing",
        body: "Stockholm and Seville in the same fortnight is a real range, and the shoulder seasons make it wider. Pack a layering system rather than a season: t-shirts, a mid layer, and a light rain jacket handles almost everything, with a scarf that covers church shoulders and cold train carriages equally.",
      },
    ],
    extras: [
      { id: "eu-carryable-bag", category: "gear", label: "A bag you can carry, not just wheel", note: "Fourth-floor walk-ups and cobbled streets are the norm, not the exception." },
      { id: "eu-adapters", category: "tech", label: "Adapters for Type C, G and J", note: "The standard European plug does not fit UK, Irish or Swiss sockets." },
      { id: "eu-laundry-stop", category: "clothing", label: "A laundry stop pencilled into the itinerary", note: "Two hours mid-trip halves the weight you carry for the other thirteen days." },
      { id: "eu-scarf", category: "clothing", label: "A scarf", note: "Church shoulders, cold trains, and the plane. Earns its space three ways." },
    ],
    related: ["packing-list-for-international-travel", "how-to-plan-a-trip-step-by-step", "how-to-budget-for-a-trip"],
  }),

  p({
    slug: "10-day-backpacking-packing-list",
    title: "10-Day Backpacking Packing List Under 10kg",
    h1: "10-day backpacking packing list",
    description:
      "Ten days out of one backpack: a four-day clothing rotation, packing cubes as an organisation system, and the dorm kit that decides whether you sleep.",
    lede: "Ten days of backpacking is a four-day clothing rotation plus laundry, packed into a bag you can carry a kilometre in the rain. Aim for under 10kg and pack the dorm kit first.",
    options: { type: "backpacking", days: 10, climate: "mild", carryOnOnly: false, checkedBag: true, kids: false },
    advice: [
      {
        heading: "Pack for four days, wash twice",
        body: "Ten days of clothing is a fantasy weight. Four days plus a sink wash or a laundrette covers it, and the clothes you actually re-wear are the ones you chose deliberately. Quick-dry fabrics make the sink wash viable: roll a wet garment in a towel and stand on it before hanging, and it's dry by morning.",
      },
      {
        heading: "Under 10kg is the target, and it's achievable",
        body: "Weigh the packed bag at home. Above about 10kg, walking from a station to a hostel stops being a walk and becomes a chore that shapes your decisions — you take taxis you didn't need and skip the place up the hill. The savings come from clothing volume and from not carrying 'just in case' gear you can buy anywhere.",
      },
      {
        heading: "Packing cubes are an organisation system, not a compression trick",
        body: "You'll open your bag on a bunk, in a dorm, with the lights off, next to someone asleep. One cube per category means retrieving a t-shirt without unpacking everything you own onto a shared floor. That's the actual benefit; the space saving is minor.",
      },
      {
        heading: "The dorm kit",
        body: "Earplugs, an eye mask, a head torch, a padlock, and flip-flops for the shower. Every one of them addresses a specific and near-certain event: someone packing at 4am, a light left on, a late arrival, an unlockable locker, a shared bathroom floor. Pack these first and the rest is negotiable.",
      },
    ],
    extras: [
      { id: "bp-weigh", category: "gear", label: "Weigh the packed bag before you go", note: "Above 10kg, the walk from the station starts shaping your decisions." },
      { id: "bp-towel-roll", category: "toiletries", label: "Sink-wash routine", note: "Roll the wet garment in a towel and stand on it before hanging; dry by morning." },
      { id: "bp-hostel-sheet", category: "gear", label: "A sleep sheet", note: "For the hostel where the linen costs extra or looks like it should." },
    ],
    related: ["packing-list-for-international-travel", "how-to-budget-for-a-trip"],
  }),

  p({
    slug: "week-long-ski-trip-packing-list",
    title: "Ski Trip Packing List for a Week on the Mountain",
    h1: "Ski trip packing list for a week",
    description:
      "A week of skiing: what to rent and what to bring, why your boots belong in the cabin, and the sunburn nobody plans for. Includes après and travel-day items.",
    lede: "Rent the skis, bring the helmet and goggles — fit is the part rental can't get right. And if you bring your own boots, they travel in the cabin with you, because nothing else on the trip is harder to replace.",
    options: { type: "ski", days: 7, climate: "cold", carryOnOnly: false, checkedBag: true, kids: false },
    advice: [
      {
        heading: "Rent skis, own the things that touch your body",
        body: "Rental skis are fine and getting them serviced is someone else's problem. Helmets and goggles are different: a helmet needs to fit your head, and rental goggles are scratched, fogged, and shared. A week of helmet rental usually costs more than a decent helmet anyway. If you own boots, bring them — badly fitted boots ruin a week faster than bad snow does.",
      },
      {
        heading: "Boots go in the cabin",
        body: "If your bag is delayed, everything in it can be replaced or rented at the resort — except boots moulded to your feet. Carry them on. It looks absurd at the gate and it is the correct decision, and it also means you're wearing or carrying the heaviest item rather than paying for it in the hold.",
      },
      {
        heading: "The sunburn nobody plans for",
        body: "Snow reflects up to 80% of UV back upward, and altitude adds roughly 4% more UV per 300m. The result is burnt nostrils, a burnt chin, and burnt lips — the surfaces facing the ground. SPF 50 in the morning, an SPF lip balm in your jacket pocket, and goggles rather than sunglasses on the mountain, because the tan line from goggles is the good outcome.",
      },
      {
        heading: "Ski clothes are heavy; check the allowance",
        body: "Salopettes, jacket, boots and helmet add up fast. Most airlines sell a discounted ski-bag allowance if booked in advance and charge punitively at the desk if not. Wear the jacket and the heaviest layer to the airport. And pack fewer après clothes than instinct suggests — the evenings are a fleece and jeans, not a wardrobe.",
      },
    ],
    extras: [
      { id: "sk-boots-cabin", category: "gear", label: "Ski boots as your cabin bag", note: "The one item a delayed suitcase makes unreplaceable." },
      { id: "sk-ski-allowance", category: "documents", label: "Ski-bag allowance booked in advance", note: "Airlines charge several times as much at the desk." },
      { id: "sk-boot-dryer", category: "gear", label: "Boot dryer or newspaper", note: "Wet liners on day two make every remaining day worse." },
      { id: "sk-apres", category: "clothing", label: "One après outfit, not five", note: "Evenings are a fleece and jeans." },
    ],
    related: ["packing-list-for-international-travel", "how-to-budget-for-a-trip"],
  }),

  // ------------------------------------------------------------ carry-on ---
  p({
    slug: "carry-on-only-packing-list",
    title: "Carry-On Only Packing List: What Actually Fits",
    h1: "Carry-on only packing list",
    description:
      "Travelling with hand luggage only: the liquids bag is the real constraint, not the clothes. Solid swaps, the roll method, and the two things that never leave your body.",
    lede: "Carry-on only is usually a volume problem, not a weight problem — and the volume is mostly toiletries. Swap your bulkiest liquids for solids and the rest of the bag stops being tight.",
    options: { type: "city", days: 5, climate: "mild", carryOnOnly: true, checkedBag: false, kids: false },
    advice: [
      {
        heading: "The liquids bag is the binding constraint",
        body: "One clear resealable bag, containers of 100ml or less, and the container's stated size is what counts — a half-empty 200ml bottle is confiscated. That bag is small, and shampoo, conditioner, sunscreen and shower gel will fill it before you've thought about toothpaste. Solve this first and the clothing follows easily.",
      },
      {
        heading: "Solids don't count against it",
        body: "A shampoo bar, toothpaste tablets, a solid deodorant and a stick sunscreen all travel outside the liquids bag entirely. Swapping four bottles for four solids frees the whole bag for the things that have no solid equivalent — contact lens solution, medication, anything liquid you actually need.",
      },
      {
        heading: "Check your specific airline's dimensions",
        body: "Cabin bag allowances vary by several centimetres and several kilos between carriers, and budget airlines charge more at the gate than the flight cost. Measure your bag including wheels and handles. Many airlines also allow a separate 'personal item' that goes under the seat — a bag that fits that slot effectively adds a third of your capacity for free.",
      },
      {
        heading: "Roll, wear the bulk, and buy the rest",
        body: "Rolling saves space and creases less than folding for most fabrics. The heaviest jacket and shoes go on your body through the airport, where they cost nothing. And whatever you forget, you buy — the one hard rule is that medication and documents travel on you, in the cabin, always, because those are the only two categories a destination can't sell you.",
      },
    ],
    extras: [
      { id: "co-personal-item", category: "gear", label: "A personal item that fits under the seat", note: "Most airlines allow one free; it's a third more capacity." },
      { id: "co-measure", category: "gear", label: "Measure your bag with wheels and handles", note: "Gate sizers include them; airline websites sometimes don't mention it." },
    ],
    related: ["packing-list-for-international-travel", "travel-checklist-before-leaving"],
  }),

  p({
    slug: "hand-luggage-only-week-packing-list",
    title: "Hand Luggage Only: A One-Week Packing List",
    h1: "Hand luggage only packing list for a week",
    description:
      "Seven days in a cabin bag, done by packing four days of clothes and washing once. The sink-wash routine, the fabrics that make it work, and the one-pair-of-shoes rule.",
    lede: "Seven days fits in hand luggage if you pack four days of clothes and wash once. That single decision, not clever folding, is what makes a week of carry-on travel comfortable rather than tight.",
    options: { type: "city", days: 7, climate: "mild", carryOnOnly: true, checkedBag: false, kids: false },
    advice: [
      {
        heading: "Four days of clothes, one wash",
        body: "Seven days of outfits does not fit in a cabin bag with any comfort. Four does, easily. A sink wash mid-week takes twenty minutes and turns the bag from stuffed to half-empty — which is also the margin you need for anything you buy while you're there.",
      },
      {
        heading: "The sink-wash routine, so it's dry by morning",
        body: "Wash in the evening, rinse, then lay the garment flat on a dry towel, roll the towel up tightly with the garment inside, and stand on it. That removes far more water than wringing and does less damage. Hang it after and most fabrics are dry by morning; a hotel's bathroom towel rail is often heated, which helps.",
      },
      {
        heading: "Fabric choice is what makes it work",
        body: "Merino wool resists odour for days of wear and dries fast; technical synthetics dry faster still. Cotton does neither and is why most people's carry-on attempts fail. You need fewer merino t-shirts than cotton ones to cover the same week, which is where the volume saving actually comes from.",
      },
      {
        heading: "One pair of shoes on your feet",
        body: "Shoes are the bulkiest thing in any bag. Wear the substantial pair and, if you need a second, make it something flat and packable that fills the gaps around everything else. Two pairs of shoes in a cabin bag for a week is possible; three is not, and isn't necessary.",
      },
    ],
    extras: [
      { id: "hl-merino", category: "clothing", label: "Merino or technical fabrics, not cotton", note: "Resists odour, dries overnight, and you need fewer of them." },
      { id: "hl-wash", category: "toiletries", label: "A tube of travel wash", note: "Solid or under 100ml. Twenty minutes mid-week halves what you carry." },
      { id: "hl-flat-shoes", category: "clothing", label: "One packable flat pair, worn substantial pair", note: "Shoes are the bulkiest thing in any bag." },
    ],
    related: ["packing-list-for-international-travel", "travel-checklist-before-leaving"],
  }),

  p({
    slug: "long-haul-flight-carry-on-essentials",
    title: "Long-Haul Flight Carry-On Essentials: What to Keep at Your Seat",
    h1: "Long-haul flight carry-on essentials",
    description:
      "What belongs in the bag at your feet on a ten-hour flight: hydration, compression socks, the last-hour reset kit, and the seat-back pocket rule that saves your passport.",
    lede: "On a long-haul flight, the bag at your feet matters more than the one in the locker. Pack for hydration, sleep, and the twenty minutes before landing when you want to feel human again.",
    options: { type: "city", days: 10, climate: "mild", carryOnOnly: true, checkedBag: false, kids: false },
    advice: [
      {
        heading: "Cabin air is drier than most deserts",
        body: "Relative humidity at altitude sits around 10–20%, which is drier than the Sahara. That's the reason for the headache, the sore throat and the shrivelled contact lenses. An empty bottle filled after security, lip balm, moisturiser, and glasses instead of lenses for the flight itself deal with almost all of it. Alcohol and coffee make it worse, whatever the drinks trolley suggests.",
      },
      {
        heading: "Compression socks for anything over eight hours",
        body: "Sitting still for long periods raises the risk of deep vein thrombosis, and graduated compression socks measurably reduce it. They're cheap, they take no space, and the discomfort is minimal compared to the alternative. Walk the aisle every couple of hours regardless.",
      },
      {
        heading: "The last-hour reset",
        body: "A toothbrush, a face wipe, deodorant and a clean t-shirt in your seat bag turn the final hour into something restorative rather than endured. It matters most on the flights that land in the morning and expect you to function — which is most long-haul eastbound routes.",
      },
      {
        heading: "The seat-back pocket rule",
        body: "Anything in the seat-back pocket gets left on the plane. Passports, phones and glasses have all ended their journeys there. Use the pocket for a book and nothing else, and keep the irreplaceable items in a zipped bag at your feet. Also: medication times shift with time zones — work out the schedule before you fly, not at 3am over Greenland.",
      },
    ],
    extras: [
      { id: "lh-compression", category: "health", label: "Compression socks", note: "For any flight over eight hours; measurably lowers DVT risk." },
      { id: "lh-reset-kit", category: "toiletries", label: "Last-hour reset kit", note: "Toothbrush, face wipe, deodorant, clean t-shirt." },
      { id: "lh-glasses", category: "health", label: "Glasses instead of contact lenses", note: "Cabin humidity runs 10–20% — drier than the Sahara." },
      { id: "lh-med-schedule", category: "health", label: "Your medication schedule across time zones", note: "Work it out before you fly, not at 3am over the Atlantic." },
      { id: "lh-downloads", category: "tech", label: "Everything downloaded in advance", note: "In-flight Wi-Fi is slow, expensive, or absent." },
      { id: "lh-seatback", category: "gear", label: "Nothing valuable in the seat-back pocket", note: "It is where passports go to be left behind." },
    ],
    related: ["packing-list-for-international-travel", "travel-checklist-before-leaving"],
  }),

  // -------------------------------------------------------------- family ---
  p({
    slug: "family-beach-holiday-packing-list",
    title: "Family Beach Holiday Packing List (With Kids)",
    h1: "Family beach holiday packing list",
    description:
      "A week at the beach with children: UV swimsuits instead of endless sunscreen reapplication, the shade you have to bring yourself, and the wet bag that saves the car.",
    lede: "With children at the beach, sun protection is most of the job — and a UV swimsuit does more of it than any amount of chasing a wet child with a sunscreen bottle.",
    options: { type: "beach", days: 7, climate: "hot", carryOnOnly: false, checkedBag: true, kids: true },
    advice: [
      {
        heading: "Cover them with fabric, not just cream",
        body: "A long-sleeved UV swimsuit blocks sun continuously without needing reapplication every eighty minutes to a child who is in the sea. Sunscreen still goes on faces, hands and feet, but the surface area you're responsible for drops enormously. Add a wide-brimmed hat with a chin strap, because the ones without get lost on day one.",
      },
      {
        heading: "Bring your own shade",
        body: "Most beaches have none, and hiring a parasol isn't always possible. A pop-up beach tent gives a baby somewhere to nap and everyone else somewhere to retreat at midday, when the UV index peaks and small children stop enjoying themselves. It's bulky and it is consistently the item families say they'd bring again.",
      },
      {
        heading: "Sand and water need a logistics answer",
        body: "A wet bag for swimwear keeps the rest of the beach bag dry and the hire car survivable. Baby powder is the standard trick for getting sand off skin — it dries the moisture the sand is clinging to and it brushes straight off. Bring more towels than seems reasonable; they're never dry when you need the next one.",
      },
      {
        heading: "Medication, dosing and the travel day",
        body: "Children's paracetamol and ibuprofen dose by weight, and formulations differ between countries — bring what you already know how to use, plus a thermometer. For the flight, pack a change of clothes per child in the cabin bag and a spare top for whichever adult is holding them. Downloaded shows, not streamed ones.",
      },
    ],
    extras: [
      { id: "fb-uv-suits", category: "kids", label: "Long-sleeved UV swimsuits", note: "Continuous protection without chasing a wet child with a bottle." },
      { id: "fb-beach-tent", category: "kids", label: "Pop-up beach tent", note: "Most beaches have no shade, and midday UV is when it stops being fun." },
      { id: "fb-wet-bag", category: "kids", label: "Wet bag for swimwear", note: "Keeps the beach bag and the hire car survivable." },
      { id: "fb-baby-powder", category: "kids", label: "Baby powder", note: "The standard trick for getting sand off skin — it brushes straight off." },
      { id: "fb-chin-strap-hat", category: "kids", label: "Sun hats with chin straps", note: "The ones without get lost on the first day." },
      { id: "fb-armbands", category: "kids", label: "Armbands or float vests you trust", note: "Rental gear at the pool is a lottery on both fit and condition." },
    ],
    related: ["packing-list-for-international-travel", "how-to-plan-a-trip-step-by-step"],
  }),

  p({
    slug: "family-city-break-packing-list",
    title: "Family City Break Packing List: Four Days With Kids",
    h1: "Family city break packing list",
    description:
      "A city break with children: the carrier-versus-stroller decision on metro stairs, the photo you take every morning, and why snacks are a crowd-control tool.",
    lede: "A city break with kids lives or dies on transport and queues. Decide carrier versus stroller before you book, take a photo of each child every morning, and carry more snacks than the day appears to need.",
    options: { type: "city", days: 4, climate: "mild", carryOnOnly: false, checkedBag: true, kids: true },
    advice: [
      {
        heading: "Carrier or stroller is a route decision",
        body: "Older European metro systems are stairs, cobblestones and narrow pavements, and a stroller becomes something you carry rather than push. A carrier handles all of that and frees both hands, at the cost of your back. Check whether your specific stations have lifts before deciding — many networks publish exactly that map, and it changes the answer city by city.",
      },
      {
        heading: "The morning photo",
        body: "Take a picture of each child at the start of every day. If they get separated from you in a crowd, you can show someone precisely what they're wearing rather than describing it. Pair it with a card in their pocket carrying your phone number with the country code — old technology, works without a battery, and works when the child is too upset to recite a number.",
      },
      {
        heading: "Snacks are crowd control",
        body: "Museum queues, delayed trains and restaurants that don't serve until eight are the actual difficulty of travelling with children, and being hungry turns every one of them into a bad hour. Carry more than the day looks like it needs. A refillable bottle each removes the second half of the same problem.",
      },
      {
        heading: "One thing a day, and a change of clothes in the day bag",
        body: "The itinerary that works with children has one anchor activity and a lot of slack around it. Whatever else happens, the day succeeded. And the spare clothes belong in the bag you're carrying, not back at the hotel — the moment you need them, the hotel is forty minutes away.",
      },
    ],
    extras: [
      { id: "fc-morning-photo", category: "kids", label: "A photo of each child, taken that morning", note: "Shows exactly what they're wearing if you get separated." },
      { id: "fc-contact-card", category: "kids", label: "A card in each pocket with your number", note: "With the country code. Works without a battery." },
      { id: "fc-carrier", category: "kids", label: "Carrier or stroller — decided by the metro map", note: "Older networks are stairs; check whether your stations have lifts." },
      { id: "fc-day-bag-change", category: "kids", label: "Spare clothes in the day bag", note: "Not at the hotel, which is always forty minutes away." },
    ],
    related: ["packing-list-for-international-travel", "how-to-plan-a-trip-step-by-step"],
  }),

  // ------------------------------------------------------------ activity ---
  p({
    slug: "camping-packing-list",
    title: "Camping Packing List: Shelter, Sleep, Cook",
    h1: "Camping packing list",
    description:
      "A camping list organised by the three systems that matter — shelter, sleep and cook — plus the R-value most people ignore and the tarp that doubles your usable space.",
    lede: "Camping packing has three systems: shelter, sleep and cook. Get those right and everything else is comfort. The most commonly underestimated item is the sleeping mat, not the sleeping bag.",
    options: { type: "hiking", days: 3, climate: "mild", carryOnOnly: false, checkedBag: false, kids: false },
    advice: [
      {
        heading: "The mat matters more than the bag",
        body: "Cold nights are usually a mat problem. The ground conducts heat away from your body far faster than the air does, and a sleeping bag compresses to nothing underneath you, so it insulates you from nothing. A mat's R-value is the number to check: roughly 2 for summer, 4 or more for cold shoulder-season nights. People spend on the bag and shiver on a cheap mat.",
      },
      {
        heading: "Pitch it once at home first",
        body: "The first time you put up a new tent should not be in the dark, in the rain, in front of an audience. Pitch it in a garden or a park, confirm every pole and peg is in the bag, and time yourself. This also catches the missing guyline that the shop packed without.",
      },
      {
        heading: "A tarp doubles your usable space",
        body: "Rain turns a tent into a two-person box you sit inside. A cheap tarp strung over the entrance creates a dry area to cook, take boots off, and sit — which is the difference between waiting out the weather and enjoying the trip. It weighs a few hundred grams and is the most consistently recommended optional item.",
      },
      {
        heading: "Water, fire and what you take home",
        body: "Know before you go how you'll carry water and whether you need to treat it. Check the fire rules for the site and the season — many places ban open fires outright in summer, and a stove is the reliable answer regardless. And pack out everything you brought in, including food waste, which means carrying a rubbish bag you planned for rather than one you improvise.",
      },
    ],
    extras: [
      { id: "cp-tent", category: "gear", label: "Tent, pitched once at home first", note: "Confirms every pole, peg and guyline is actually in the bag." },
      { id: "cp-mat", category: "gear", label: "Sleeping mat with the right R-value", note: "About 2 for summer, 4+ for cold nights. This is what keeps you warm." },
      { id: "cp-tarp", category: "gear", label: "Tarp", note: "Turns a rainy day from waiting-it-out into a dry place to cook and sit." },
      { id: "cp-stove", category: "gear", label: "Stove, fuel, and two ways to light it" },
      { id: "cp-water-plan", category: "gear", label: "Water carrying and treatment sorted", note: "Check the site's supply before you arrive, not after." },
      { id: "cp-rubbish", category: "gear", label: "Rubbish bags", note: "Everything you brought in comes out with you, food waste included." },
    ],
    related: ["packing-list-for-international-travel", "how-to-plan-a-trip-step-by-step"],
  }),

  p({
    slug: "road-trip-packing-list",
    title: "Road Trip Packing List: The Car, the Bags & the Documents",
    h1: "Road trip packing list",
    description:
      "A road trip list for the trip where you can overpack: the overnight bag that saves you unloading the boot, the documents police ask for, and the offline map that works in the canyon.",
    lede: "A road trip removes the weight limit, which is exactly the trap. Pack a separate overnight bag so you're not unloading the whole boot at every motel, and download the maps before you lose signal.",
    options: { type: "city", days: 7, climate: "mild", carryOnOnly: false, checkedBag: true, kids: false },
    advice: [
      {
        heading: "The overnight bag is the whole trick",
        body: "On a multi-stop road trip you'll check into somewhere new most nights. Without a small bag holding a change of clothes and your toiletries, you unload the entire boot every evening and repack it every morning. One small bag that lives on top, restocked from the big one every couple of days, removes the single most tedious part of driving holidays.",
      },
      {
        heading: "The documents a roadside stop asks for",
        body: "Driving licence, and an International Driving Permit where required — several countries insist on one even for EU or US licences. Vehicle registration, insurance documentation, and breakdown cover details you can find without signal. If you're crossing borders in a hire car, check the rental agreement actually permits it; plenty don't, and the insurance voids at the frontier.",
      },
      {
        heading: "Offline maps and a phone mount",
        body: "Coverage disappears in canyons, mountains and long rural stretches — exactly the places you're driving to. Download the region in advance. A phone mount and a charger per person avoid the two most common in-car arguments, and a paper map or written route as a backup costs nothing and works when the phone overheats on the dashboard, which it will.",
      },
      {
        heading: "The boot is not a hotel room",
        body: "No weight limit means people pack six pairs of shoes and a coffee machine. Keep the categories the same as any other trip and use the extra capacity for the things that genuinely improve a drive: a cooler with cold drinks, real snacks, a blanket, and a sunshade for when the car is parked in the sun all afternoon.",
      },
    ],
    extras: [
      { id: "rt-overnight-bag", category: "gear", label: "A separate overnight bag", note: "So you're not unloading the entire boot at every stop." },
      { id: "rt-idp", category: "documents", label: "IDP, registration, insurance and breakdown cover", note: "Findable offline; several countries require the IDP even for EU and US licences." },
      { id: "rt-cross-border", category: "documents", label: "Confirm the hire car may cross borders", note: "Many agreements forbid it and void the insurance if you do." },
      { id: "rt-mount", category: "tech", label: "Phone mount and a charger per person" },
      { id: "rt-offline-maps", category: "tech", label: "Maps downloaded for the whole route", note: "Canyons and mountain passes are exactly where coverage stops." },
      { id: "rt-cooler", category: "gear", label: "Cooler, snacks and a blanket" },
      { id: "rt-sunshade", category: "gear", label: "Windscreen sunshade", note: "For the afternoon the car spends in a car park at 35°C." },
    ],
    related: ["packing-list-for-international-travel", "how-to-plan-a-trip-step-by-step"],
  }),

  p({
    slug: "festival-packing-list",
    title: "Festival Packing List: Three Days, No Plug Sockets",
    h1: "Festival packing list",
    description:
      "A festival list for the conditions rather than the photos: mud, no charging, no shade, banned glass, and a tent you have to find again at 2am.",
    lede: "Assume mud, no power, no shade and no signal. A festival list is mostly about staying dry, keeping your phone alive, and being able to find your own tent in the dark.",
    options: { type: "backpacking", days: 3, climate: "mild", carryOnOnly: false, checkedBag: false, kids: false },
    advice: [
      {
        heading: "Everything gets wet, so plan the recovery",
        body: "Wellies and waterproofs are obvious. What's less obvious is spare socks — more pairs than days — and a dry bag holding one complete change of clothes that never comes out until you genuinely need it. Wet feet for three days is how a good weekend turns miserable, and it's entirely preventable with two hundred grams of spare socks.",
      },
      {
        heading: "You will not charge anything",
        body: "Charging tents exist, have queues measured in hours, and cost money. Bring a power bank sized for the whole weekend, put the phone in low-power mode from the start, and agree a physical meeting point and time with your group — because signal at a festival site collapses under the load regardless of how many bars the phone shows.",
      },
      {
        heading: "Find your tent again",
        body: "Ten thousand identical tents in a field look exactly the same at 2am. A flag, a tall inflatable, or a distinctive object on a pole makes yours findable. Take a photo of the nearest landmark and note the row when you pitch. This sounds trivial until it's raining and you've been walking the same field for forty minutes.",
      },
      {
        heading: "The rules and the cash",
        body: "Almost every festival bans glass entirely, and many restrict bag sizes at arena entrances — check both before you pack rather than at the gate, where confiscation is the only option offered. Bring some cash: card readers at independent food stalls fail regularly when the site network is saturated. And sunscreen, because a field has no shade and people forget that a cloudy festival still burns.",
      },
    ],
    extras: [
      { id: "fs-wellies", category: "clothing", label: "Wellies and waterproofs", note: "Plus more pairs of socks than days." },
      { id: "fs-dry-change", category: "clothing", label: "One complete change of clothes in a dry bag", note: "It stays sealed until you actually need it." },
      { id: "fs-power-bank", category: "tech", label: "A power bank sized for the whole weekend", note: "Charging tents have hour-long queues and charge for the privilege." },
      { id: "fs-flag", category: "gear", label: "A flag or tall marker for your tent", note: "Ten thousand identical tents look identical at 2am." },
      { id: "fs-no-glass", category: "gear", label: "Nothing glass", note: "Banned at essentially every festival; confiscated at the gate." },
      { id: "fs-cash", category: "documents", label: "Cash", note: "Independent stalls' card readers fail when the site network saturates." },
      { id: "fs-earplugs", category: "gear", label: "Earplugs — for sleeping and for the front row" },
      { id: "fs-bin-bags", category: "gear", label: "Bin bags", note: "A poncho, a groundsheet, and a way to take your rubbish home." },
    ],
    related: ["packing-list-for-international-travel", "how-to-budget-for-a-trip"],
  }),

  p({
    slug: "honeymoon-packing-list",
    title: "Honeymoon Packing List: Names, Dress Codes & Two Weeks",
    h1: "Honeymoon packing list",
    description:
      "A honeymoon packing list including the thing that ruins them: booking in a married name your passport doesn't have yet. Plus resort dress codes and the certificate worth carrying.",
    lede: "Book and travel in the name printed in your passport, whatever you've changed it to since. Beyond that, a honeymoon packs like a beach holiday with two more evenings that matter.",
    options: { type: "beach", days: 10, climate: "hot", carryOnOnly: false, checkedBag: true, kids: false },
    advice: [
      {
        heading: "The name on the ticket must match the passport",
        body: "This is the single most common way honeymoons go wrong before they start. If you've changed your name but not yet your passport, book every flight, hotel and transfer in your current passport name. Airlines routinely refuse boarding on a mismatch and treat a name change as a rebooking, at full fare. Change the passport first or travel in the old name — not half of each.",
      },
      {
        heading: "Carry a copy of the marriage certificate",
        body: "Not because anyone demands it, but because resorts, airlines and restaurants hand out upgrades, free champagne and better tables to honeymooners, and a fair number ask for something to back it up. A photo on your phone is enough. Mention it at booking too, not just on arrival — that's when the room allocation is actually decided.",
      },
      {
        heading: "Plan for more than one good evening",
        body: "The usual advice — one nice outfit for the week — doesn't hold here. Two or three evenings will be occasions, and plenty of resort restaurants enforce a dress code after six, which frequently means no shorts and closed shoes for men. Check the resort's stated code before packing; it's usually on their website and it's usually stricter than people expect.",
      },
      {
        heading: "Leave space, and split the bags",
        body: "You will buy things. Pack the outbound bags at about 80% and the return journey stops being a negotiation. And split each person's clothes across both suitcases: if one bag is delayed, you both still have something to wear, which is a better first evening than one of you in the clothes you flew in.",
      },
    ],
    extras: [
      { id: "hm-name-match", category: "documents", label: "Every booking in your passport name", note: "A mismatch is refused boarding, treated as a rebooking at full fare." },
      { id: "hm-certificate", category: "documents", label: "A photo of the marriage certificate", note: "Resorts hand out upgrades and often ask for something to back it up." },
      { id: "hm-two-evenings", category: "clothing", label: "Two or three evening outfits", note: "Resort restaurants commonly enforce a dress code after six." },
      { id: "hm-split-bags", category: "clothing", label: "Split your clothes across both suitcases", note: "One delayed bag then leaves you both with something to wear." },
      { id: "hm-space", category: "gear", label: "Pack the outbound bags to 80%", note: "The return journey is where the space runs out." },
    ],
    related: ["packing-list-for-international-travel", "how-to-plan-a-trip-step-by-step"],
  }),

  p({
    slug: "digital-nomad-packing-list",
    title: "Digital Nomad Packing List: Work Setup in a Carry-On",
    h1: "Digital nomad packing list",
    description:
      "A packing list for working while travelling: the desk setup that fits a cabin bag, one charger instead of four, connectivity with a real fallback, and the documents borders ask for.",
    lede: "Working while travelling means the desk comes with you: laptop, stand, keyboard, and one charger that runs everything. The clothes are a four-day rotation — the setup is what needs thought.",
    options: { type: "city", days: 21, climate: "mild", carryOnOnly: true, checkedBag: false, kids: false },
    advice: [
      {
        heading: "One charger, not four",
        body: "A single multi-port GaN charger of 65W or more runs a laptop, phone, headphones and tablet from one socket and one brick. It replaces four power supplies and, more usefully, means one plug adapter rather than a pile. This is the highest-value swap on the list for both weight and daily friction.",
      },
      {
        heading: "The stand is the difference between a week and a month",
        body: "A laptop on a café table puts your neck at the wrong angle for eight hours a day. A folding stand plus a compact keyboard weighs under a kilo and turns any surface into a workstation you can use for months rather than days. If you're working full-time on the road, this is not an accessory.",
      },
      {
        heading: "Connectivity needs a second answer",
        body: "One eSIM is a plan; two providers is a fallback. Café Wi-Fi fails, apartment internet is slower than advertised, and a call you cannot take costs more than the data. Check the phone allows hotspot use on the plan you buy, and test the backup before the day you need it. Noise-cancelling headphones are working equipment here, not entertainment.",
      },
      {
        heading: "Documents and backups",
        body: "Some countries ask for proof of onward travel at check-in or immigration, and some digital nomad visas require proof of income and health insurance. Have them in a folder that works offline. For the work itself: cloud sync plus an encrypted physical drive, because the failure you're insuring against — a stolen laptop in a café — takes out both the machine and the local copy.",
      },
    ],
    extras: [
      { id: "dn-gan", category: "tech", label: "One 65W+ multi-port GaN charger", note: "Replaces four bricks and, more usefully, three plug adapters." },
      { id: "dn-stand", category: "tech", label: "Folding laptop stand and compact keyboard", note: "Under a kilo, and the reason you can work for months rather than a week." },
      { id: "dn-esims", category: "tech", label: "Two eSIM providers, one tested as backup", note: "Confirm hotspot use is allowed on the plan you buy." },
      { id: "dn-anc", category: "tech", label: "Noise-cancelling headphones", note: "Working equipment, not entertainment." },
      { id: "dn-onward", category: "documents", label: "Proof of onward travel and insurance, offline", note: "Asked for at check-in and immigration more often than you'd expect." },
      { id: "dn-encrypted-drive", category: "tech", label: "Encrypted backup drive, kept separately", note: "A stolen laptop takes out the machine and the local copy at once." },
    ],
    related: ["packing-list-for-international-travel", "trip-planner-app-no-subscription"],
  }),
];

export const CURATED_BY_SLUG = new Map(CURATED_PAGES.map((page) => [page.slug, page]));
