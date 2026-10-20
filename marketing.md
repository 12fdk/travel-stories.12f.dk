# Travel Stories — Marketing Plan (living doc)

Owner: Robert · Maintained by: Hermes (social pipeline agent) · Last updated: 2026-10-21 (nightly run)

## 1. What this is & how it's updated

- Hermes owns this file and runs every step in it. Robert reviews it and owns
  the decisions marked *Robert* in §9.
- Pipeline (Appwrite db `marketing`, app slug `travel-stories`, on app.12f.dk):
  - Nightly job (`travel-stories-social-content`, shared `social-post` template, channel
    platform): builds the next due §6 row — media rendered on the spark (`comfy-gen`,
    `motion-render`), created with `marketing-post` as `status=ready` at the time it picks
    (Hermes owns the schedule, marketing#97); `publish-social` publishes it then.
  - Before it picks a row, the job removes §6 plan rows whose post is published
    (`plan_prune.py`, spark#138). History lives in §8 and in Appwrite, not in §6.
  - Function `publish-social` (every 15 min) publishes to IG and FB; enforces a 20h minimum gap.
  - Function `collect-metrics` (every 2h) writes IG/FB engagement into the post docs.
  - Function `optimize-guidelines` (monthly) — **dormant**.
- The nightly job also runs the §7 review and appends rows to §8.
- Editing rules for this file:
  - Append-only to §8: never delete or rewrite past log rows.
  - Plan changes go in §6, plus a §8 row that says why.
  - §3 and §4 change only on Robert's say-so.
  - Update the `Last updated` line on every edit.
  - Never put secrets, API keys or tokens in this file.

## 2. Product & funnel

- Product (LIVE iOS trip planner, organizer and journal; on the App Store
  since 2026-01-06, free; optional Premium Lifetime upgrade, a one-time
  purchase): day-by-day itineraries with interactive maps, budget tracking,
  smart packing lists, booking storage, offline access, a travel diary,
  reminders + a countdown widget, calendar export and trip sharing (Premium).
  It does not book flights or hotels. iPhone only, iOS 17+, no account, data
  stays on the iPhone. App in 14 languages; site in 12 (en, da, no, sv, nl,
  de, fr, es, it, pt-BR, ko, ja). Feature wording for posts: the §5 claim sheet.
- Funnel: profile bio → `https://travel-stories.12f.dk/go/?src=instagram`
  (or `?src=facebook`) → `/go` hop fires Umami event `social-landing {src}` →
  landing page (`social-landing-home`) → App Store tap
  (`appstore-click`, `hero-app-store-click`, …, all tagged `src`) →
  App Store id6756801168
  `https://apps.apple.com/app/travel-stories-trip-planner/id6756801168`.
- The direct-to-store bio variant appends `&to=<encoded App Store URL>` and
  gets a distinct `src` slug, e.g. `instagram-store`.
- Details: `docs/social-source-links.md` and the README (attribution PR #85,
  App Store hop PR #86).
- Downloads are counted in App Store Connect, not Umami.

## 3. Content rules

- Text-slide colours: background #2d1b2e · text #f8f0e3 · accent #e8a87c
  (carousel text slides; `marketing-post --colors-from` reads this line, so
  keep its format. Robert's decision 2026-10-14, spark#129.)
- Real-looking travel photography and footage only (photographic destination
  and travel scenes, never illustration), shot fresh for every post: new
  stills/clips generated for that post (`comfy-gen`, LTX), never reused from an
  earlier post (Robert, spark#133).
- The one allowed reuse is real app UI footage
  (`/workspace/motion/assets/travel-stories/footage-tour.mp4`): use a different
  moment of it from recent reels, cut around new b-roll. It is the only place
  app UI may appear.
- Every post looks new: a different setting, light, colour mood and composition
  from the app's recent posts (`marketing-post looks --app travel-stories`);
  for a reel also a different reel look and music. §6's Look column gives each
  row its own scene as a starting point.
- Never AI-generated people with visible faces (a small silhouette or a figure
  from behind is fine).
- No phone screens, and never app UI in generated images; phones may appear
  face-down or in a pocket.
- One product message per post.
- The hook sells the product within the first 1–2 seconds: a concrete
  destination + a concrete planning problem.
- CTA (the app is live), verbatim from the app record's ctaOptions: "Download
  Travel Stories free". Carousels may add "Save this for your next trip";
  reels about shared trips may add "Tag your travel buddy". Never "Get
  notified".
- At most 5 hashtags per post, always including `#TravelStories`. The rest come
  from the brand list (`#TripPlanner`, `#TravelPlanning`, `#TravelTips`,
  `#Travel`, `#Wanderlust`, `#TravelGram`, `#Vacation`, `#Adventure`,
  `#ExploreMore`, `#firsttrip`, `#internationaltravel`, `#packinglist`,
  `#packingtips`) plus at most one tag for the §6 calendar moment (e.g.
  `#ChristmasMarkets`, `#CherryBlossom`).
- One video per episode.
- Music: rotate the 6 variants (`music.mjs` ids 0–5 = c-major, a-major, g-min,
  e-min, d-major, c-min) with no repeat within any 6 consecutive reels.
- Use copy verbatim from the live site where possible, e.g. "Travel Stories is
  a free iPhone trip planner, organizer, and journal." The §5 claim sheet lists
  what each feature may say.
- A post that breaks any rule is not published: set it back from `ready` and
  log why in §8.

## 4. Cadence

- Owner decision 2026-10-14 (Buffer ~2M-post study, Hootsuite, SocialCal).
- Ramp:

  | Week of | Posts |
  |---|---|
  | Oct 19 | 2 |
  | Oct 26 | 3–4 |
  | From Nov 2 | steady 4–5/week (2–3 reels + 1–2 carousels) |

- Floor: never below 3/week at steady state.
- Consistency beats bursts: if a week can't be filled, spread posts out
  instead of batching.
- Per-platform targets: Instagram 5–7/week Reels-led; Facebook 3–5/week
  Reels-priority. The shared pipeline posts every post to both, so the
  pipeline count is what each platform gets. Instagram at 4–5/week sits below
  its 5–7 target; accepted until the ramp is done.
- Avoid FB link posts.
- The 20h gap allows ~8 posts/week, so 4–5 fits.

## 5. Format playbook

| Format | Job | Evidence | Rules |
|---|---|---|---|
| Reel (15–45 s) | Reach to non-followers (+36% vs carousels) | Reels are the top-of-funnel format at our size | Destination b-roll shot fresh for the post + a new moment of the real app footage in second 0–1; use the next music variant |
| Carousel (6–10 slides) | Earns saves (+109% engagement per person reached) | Saves are the retention signal; packing lists, budgets and day plans are the most saveable | Slide 1 = concrete destination + concrete problem (best-history pattern); last slide = CTA |

**Carousels are photo-led (Robert, 2026-10-15):** most slides are
photographic; at most 2–3 short text slides (hook + one CTA). The 2026-10-15
carousels shipped "2 photos + 7 text" and read flat — rebuild as ≥6 rendered
photos + 1–2 text slides. Every photo slide is a fresh `comfy-gen` render
(photographic, no phone screens, no visible faces); the caption still carries
the saveable content, the slides carry the look.
| Stories | Polls, countdowns, tips | Brand profile wants them daily | Pipeline is feed-only today — decision in §9 |
| Single image | Historically our best format | Baseline below | Not in the steady mix; its lesson goes to carousel covers |

Brand-profile pillar split: travel tips/hacks 30%, destination inspiration
25%, app features 20%, packing/budget advice 15%, community 10%. Voice: "Your
most organized travel friend" — casual, warm, globally inclusive, never
condescending about messy planning; avoid US-centric references (so US-only
moments get at most one or two rows, see §6).

Baseline (131 posts, 93 with metrics; median reach 2–4; weak signal, but the
direction is real):

- **Best, Apr–May** story/advice image posts — reach 5–8, likes 3–5, saves on
  the advice ones: "Lisbon isn't a maybe. It's a must.", "Your bag didn't
  arrive. Stay calm. 72h playbook", "Road trip season", "12-hour layover",
  "10 days in Thailand. Real receipts."
- **Worst, Jul–Aug** carousels — reach 0–1, score ~1: "Your next trip is going
  to be chaotic…" and similar generic-pain openers.
- **Read:** concrete destination + concrete problem solved wins; generic
  pain-point openers lose. Banned opener pattern: "Your next trip…" or any
  opener with no place and no specific problem.

### Claim sheet — what each §6 feature may say (added 2026-10-15)

Verbatim from the live site (homepage and `llms.txt`, read 2026-10-15;
`llms-full.txt` returns 404, see §9). Use these lines, not paraphrased numbers
or promises. If a line here and the site disagree, the site wins.

| §6 feature | Verbatim line(s) |
|---|---|
| Day-by-day itineraries | "Create detailed trip plans with interactive maps to visualize your journey. Add activities, attractions, and reservations for each day." · "Day-by-day timeline with maps, times, and reminders." |
| Budget tracking | "Monitor your travel expenses with visual breakdowns by category. Set budgets and stay on track throughout your trip." · "Expenses logged in seconds, charted by category." · "Track spending in the currency you actually think in." |
| Packing lists | "Never forget essentials with 100+ suggested items. Customize lists for each trip type and check off items as you pack." · "Smart lists with 100+ suggestions, reused per trip type." |
| Bookings | "Every flight, hotel, and tour stored with its details." · "Manage bookings for flights, hotels, and car rentals." · The app "does not book flights or hotels." |
| Save from any app | "Share bookings, links, and tips into the right trip from Mail or Safari." |
| Offline access | "Access your itineraries, bookings, and travel diary even without internet. Perfect for remote destinations." · "Everything works offline — built for airplane mode." |
| Reminders / countdown | "Departure alerts 1–30 days ahead, plus task and booking reminders." · "A Home Screen widget counts down the days to departure." |
| Calendar export (Premium) | "Send your itinerary straight to Apple Calendar with Premium." |
| Trip sharing (Premium) | "trip sharing and exports are part of the Premium Lifetime upgrade, so you can send your plan to travel companions." |
| Travel diary | "A travel diary that ties photos and notes to each day." · "Take photos and create a digital travel diary to remember every adventure, even offline." |
| Search / archive | "Find any booking, expense, or note across all your trips." · "Completed trips stay organized and searchable for reference." |
| Trip types | "Road trip — Map the route, plan the stops, and log expenses while someone else drives." · "Business travel — Bookings and confirmation numbers in one place, expenses tracked for the report back home." · "Family holiday — Shared tasks before departure, everyone's packing lists, and a diary of the memories." |
| Price / account | "Free download" · "No account needed" · "Premium is a one-time purchase — not a subscription." Never quote a price in a post (the storefront sets it). |

Never claim: AI trip planning or generated itineraries; booking, deals or fare
alerts in the app; live travel updates or flight status; offline **maps** (the
site promises offline itineraries, bookings, lists and diary, not maps); real-
time group editing or iCloud sync (the site says data stays on the iPhone;
sharing = sending the plan, Premium); splitting bills between travellers; an
Android or iPad version; any user count, rating, statistic or testimonial
(including the percentages in the app record's targetAudience).

## 6. Content plan (week of Oct 19, 2026 – week of Feb 22, 2027)

### Calendar hooks — the moments this plan piggybacks on (added 2026-10-15)

A trip planner wins the moment people PLAN or BOOK the trip, which is weeks
before the trip itself. Post ~1–3 weeks before the planning peak (the "Post by"
column), then use in-trip angles (offline, bookings, diary) while people are
travelling. The hook names the destination AND a concrete problem — "Christmas
markets season is here!" alone is the banned generic opener (§5). The moment
also gives the post its look (light, weather, palette), which keeps every post
new. The app does not book or sell trips: a deals moment is an angle for
"now organize what you booked", never a deal claim.

| Moment | Date | Post by | Angle | §6 rows |
|---|---|---|---|---|
| **UK October half-term** | Mon Oct 26 – Fri Oct 30, 2026 (most English councils; Scotland was Oct 12–16) | window passed (families planned in Sept) | not used as a hook; noted for the Feb half-term | — |
| **Christmas markets** | Vienna Rathausplatz Nov 13 – Dec 26, 2026; Strasbourg Nov 26 – Dec 24 (unconfirmed); Copenhagen/Tivoli not verified | Nov 6 for booking; in-trip angles to mid-Dec | what to book, the cold packing list, which market on which day | Oct 26 #4, Nov 16 #1, Nov 23 #4, Dec 7 #1, Dec 14 #3 |
| **Ski season start** | Alpine resorts open late Nov – mid Dec (pattern; per resort, not verified); ski weeks peak Christmas → Feb half-term | Nov 13 | the ski packing list, three confirmations, the ski-week budget | Nov 2 #5, Nov 16 #2, Nov 30 #4, Dec 7 #4, Jan 11 #5 |
| **US Thanksgiving travel** (US-only, one row) | Thu Nov 26, 2026 | Nov 19 | the flight home, the confirmation number buried in email | Nov 9 #5 |
| **Black Friday / Cyber Monday / Travel Tuesday** | Fri Nov 27, Mon Nov 30, Tue Dec 1, 2026 | Nov 27 | you grabbed a fare — now set the budget and keep the confirmations | Nov 23 #2, #3, Nov 30 #1 |
| **Christmas travel home** | Fri Dec 25, 2026; travel peaks the week before | Dec 14 | connections, offline bookings, departure reminders, flying with kids | Nov 30 #3, Dec 7 #2, #5, Dec 14 #1 |
| **New Year's Eve city trips** | Thu Dec 31, 2026 | Dec 10 (booking); Dec 28 (in-trip) | 3 days around midnight, the cold packing list, no signal at midnight | Nov 30 #2, Dec 7 #3, Dec 14 #2, #4, Dec 21 #1 |
| **January planning season** | all of January (brand profile: "resolution trips"); US National Plan for Vacation Day = Tue Jan 26, 2027 (last Tuesday of January) | Jan 26 | the year's trips in one app, budget before booking, the 3-2-1 months timeline | Dec 21 #2–#3, Dec 28 #1, Jan 4 #1–#4, Jan 25 #1 |
| **Venice Carnival** | Sat Jan 30 – Tue Feb 9, 2027 | Jan 15 | 3 days, which island on which day | Dec 28 #2, Jan 18 #3 |
| **Lunar New Year** | Sat Feb 6, 2027 (Year of the Goat); travel rush ~Jan 25 – Feb 17 (commercial estimate) | Jan 25 | trains, hotel and the family dinner as one trip; the city-break budget | Jan 18 #1, Jan 25 #4 |
| **Rio Carnival** | Sambadrome parades ~Fri Feb 5 – Tue Feb 9, 2027 (Ash Wednesday Feb 10); official schedule not yet published | Jan 15 | 5 days around the parades; tickets offline when the network jams | Jan 11 #2, Feb 1 #2 |
| **Valentine's weekend getaways** | Sun Feb 14, 2027 (weekend Fri 12 – Sun 14) | Jan 31 | a 2-day plan, the train reminder, carry-on only | Jan 18 #4, Jan 25 #3, Feb 1 #4 |
| **February half-term (England)** | Mon Feb 15 – Fri Feb 19, 2027 (most councils; some Feb 8–12) | Jan 31 | family city break and ski week with kids: packing, sharing the plan, the budget | Jan 4 #5, Jan 18 #2, Jan 25 #5, Feb 1 #1, #5 |
| **Spring break 2027** | US colleges and schools, mostly March (varies by school — a pattern, no single date) | Feb 15 | beach and road-trip plans, the packing list, the budget | Jan 18 #5, Feb 1 #3, Feb 8 #3–#4, Feb 15 #2, Feb 22 #4 |
| **Easter 2027** | Sun Mar 28, 2027 (Good Friday Mar 26, Easter Monday Mar 29) | Mar 7 | what to book 7 weeks out, family beach week, the hike without signal | Feb 8 #2, Feb 15 #1, #4, Feb 22 #3 |
| **Cherry blossom, Japan** | Tokyo/Kyoto/Osaka roughly late Mar – early Apr 2027 (travel-site estimate; the official JMA forecast comes Dec–Jan) | plan by Feb | 10 days Tokyo → Kyoto, packing for spring, yen in your currency, the last checklist | Dec 21 #3, Jan 4 #1, Jan 25 #2, Feb 8 #1, #5, Feb 15 #3, Feb 22 #2 |
| **Summer booking season** | Mar – Apr (brand profile) | from Feb 22; peak in the next plan | islands, ferries, one day-by-day plan | Feb 22 #1 |

Dates checked 2026-10-15 by web search: UK half-terms (Oct 2026, Feb 2027),
Vienna and Strasbourg Christmas markets, Travel Tuesday 2026, National Plan
for Vacation Day 2027, Venice and Rio Carnival 2027, Lunar New Year 2027 and
the travel rush, cherry-blossom 2027 estimates. Computed from fixed rules:
Thanksgiving (4th Thursday of Nov), Black Friday, Cyber Monday, Easter 2027.
Not verified (marked above): Strasbourg 2026, Tivoli, ski-resort openings,
the official Rio schedule, the official cherry-blossom forecast, spring-break
weeks. Hooks never state an unverified date or any statistic.

### The plan

| Week of | # | Format | Feature / message | Hook (first 1–2 s) | Music | Look / scene (start point; must differ from recent looks) | Status |
|---|---|---|---|---|---|---|---|
| Oct 19 | 2 | Carousel | Day-by-day plans | "3 days in Lisbon, planned day by day." | — | — | published 2026-10-15 6acffaab023c7d3cf05f (text-heavy, superseded) |
| Oct 26 | 3 | Reel | Trip sharing (Premium) | "Rome with three friends and three different plans? Send one." | v5 c-min | Roman cobbled side street at blue hour, ivy and a parked Vespa, cool blue with warm window glow | built 2026-10-21 6ad7fbeaf21b007e23dc |
| Oct 26 | 4 | Carousel | Day-by-day + bookings | "Vienna Christmas markets weekend: what to book before November ends." | — | snowy Ringstrasse with a red tram at dusk, red and gold, telephoto | queued |
| Nov 2 | 1 | Reel | Day-by-day with maps (road trip) | "Algarve road trip: 6 beaches, 5 days — the route on one map." | v0 c-major | coastal cliff road from above, ochre cliffs, Atlantic teal, late golden light | queued |
| Nov 2 | 2 | Carousel | Day-by-day plans | "Tokyo, 5 days: what to do each morning." | — | Tokyo backstreet at dawn, vending-machine glow, wet asphalt, muted pastels | queued |
| Nov 2 | 3 | Reel | Budget tracking (your currency) | "Barcelona weekend: see what you've spent, in your currency." | v3 e-min | tapas-bar counter, tiles and copper pans, warm tungsten, macro | queued |
| Nov 2 | 4 | Carousel | Bookings, offline | "Bag didn't arrive? Your bookings are still on your phone, offline." | — | empty baggage carousel in a fluorescent arrivals hall, cold greens | queued |
| Nov 2 | 5 | Reel | Packing list (ski) | "First ski week in the Alps: a packing list you won't rebuild next year." | v2 g-min | ski boots and gloves on a chalet floor, snow light through the window, white and pale wood | queued |
| Nov 9 | 1 | Reel | Trip sharing (Premium) | "Paris with friends: send everyone the same day-by-day plan." | v1 a-major | Paris zinc rooftops and chimneys at sunrise, pink haze | queued |
| Nov 9 | 2 | Reel | Offline access | "Hiking Madeira's levadas without signal: your day plan still opens." | v4 d-major | misty laurel forest, moss green, waterfall, diffused light, phone in a backpack pocket | queued |
| Nov 9 | 3 | Carousel | Packing list | "First time in Japan in winter? The packing list, slide by slide." | — | snowed-in mountain village at night, lit windows, deep blue | queued |
| Nov 9 | 4 | Carousel | Budget tracking | "Lisbon long weekend: every euro, tracked." | — | azulejo-tiled stairway after rain, teal and white, overcast | queued |
| Nov 9 | 5 | Reel | Bookings + save from Mail | "Thanksgiving flight home to Chicago: confirmation number buried in your email?" | v5 c-min | terminal window at dawn, a de-icing truck, orange and steel | queued |
| Nov 16 | 1 | Reel | Reminders | "Strasbourg Christmas market trip, train at 7:12 — the departure reminder is set." | v0 c-major | half-timbered houses on a canal at dusk, lights on the water, cold violet | queued |
| Nov 16 | 2 | Carousel | Bookings (ski) | "Ski week in the Dolomites: lift pass, ski hire, chalet — 3 confirmations, one trip." | — | Dolomite peaks at alpenglow, pink rock over snow | queued |
| Nov 16 | 3 | Reel | Day-by-day (business travel) | "3-day business trip to Frankfurt: hotel, taxis, meetings — one timeline." | v3 e-min | glass tower lobby at night, rain streaks, cool steel blue | queued |
| Nov 16 | 4 | Carousel | Travel diary | "Iceland ring road, 10 days of photos: tied to the day you took them." | — | black-sand beach and basalt columns, grey-silver light | queued |
| Nov 16 | 5 | Reel | Save from any app | "New York in December: 12 restaurant tips in 12 screenshots? Share them into the trip." | v2 g-min | Manhattan street steam at night, taxi-light bokeh, red-amber | queued |
| Nov 23 | 1 | Reel | Offline access | "Lapland in December, no signal on the husky trail: your day plan still opens." | v1 a-major | snow forest under a green aurora sky, deep night | queued |
| Nov 23 | 2 | Carousel | Budget tracking | "Grabbed a Black Friday fare to Marrakech? Now set the trip budget." | — | spice-souk stalls, saffron and paprika colours, shafts of light | queued |
| Nov 23 | 3 | Reel | Bookings | "Cyber Monday: flight, hotel and car for Sicily — three confirmations, one trip." | v4 d-major | honey-stone baroque town at sunset, empty steps | queued |
| Nov 23 | 4 | Carousel | Packing list | "Christmas markets in Prague: the cold-weather packing list." | — | frosty Old Town rooftops in morning fog, copper green | queued |
| Nov 30 | 1 | Reel | Budget tracking | "Travel Tuesday deal on Bali: will the whole trip stay under budget?" | v5 c-min | rice terraces at sunrise, mist, emerald | queued |
| Nov 30 | 2 | Carousel | Day-by-day plans | "New Year's Eve in Edinburgh: 3 days, what happens each day." | — | castle on the rock in winter mist, dark slate and gold | queued |
| Nov 30 | 3 | Reel | Bookings, offline | "Christmas flight home, connection in Amsterdam: the booking opens in airplane mode." | v0 c-major | airport window at dusk, planes taxiing (no logos), deep blue | queued |
| Nov 30 | 4 | Carousel | Tasks + reminders (ski) | "Ski week in Austria in January: the to-dos before you go, with reminders." | — | Tyrolean village church in snow at blue hour | queued |
| Nov 30 | 5 | Reel | Search / trip archive | "Which hotel did we love in Kyoto last spring? Search every past trip." | v3 e-min | temple steps under autumn maples in soft rain, red-orange | queued |
| Dec 7 | 1 | Reel | Day-by-day plans | "Cologne Christmas markets: 5 markets, 2 days — in what order?" | v2 g-min | cathedral spires above market roofs in fog, amber stall lights | queued |
| Dec 7 | 2 | Carousel | Packing list (family) | "Flying home to Dublin for Christmas with two kids: the carry-on list." | — | Georgian doors with wreaths in the rain, red and green | queued |
| Dec 7 | 3 | Reel | Calendar export (Premium) | "New Year's Eve in Berlin: every booking and the 9 pm dinner, in your calendar." | v1 a-major | TV tower at night in frost, cold neon | queued |
| Dec 7 | 4 | Carousel | Budget tracking (ski) | "A week of skiing in Chamonix: where the money goes, by category." | — | high peaks at sunrise, cold blue turning pink | queued |
| Dec 7 | 5 | Reel | Offline access | "Christmas Eve train through the Swiss Alps, tunnels and no signal: the bookings still open." | v4 d-major | red train on a snowy viaduct, telephoto, white and red | queued |
| Dec 14 | 1 | Reel | Reminders | "Flying to Toronto for Christmas: the departure reminder fires before you forget." | v5 c-min | frozen lake shoreline at dawn, ice blue | queued |
| Dec 14 | 2 | Carousel | Day-by-day plans | "New Year's Eve in Sydney: where to be at midnight, and the days around it." | — | harbour at golden dusk from a ferry, water reflections | queued |
| Dec 14 | 3 | Reel | Travel diary | "Vienna Christmas market crawl: which stall had the best punch? Note it on the day." | v0 c-major | yellow palace facade in snow, steaming mugs close-up (no faces) | queued |
| Dec 14 | 4 | Carousel | Packing list | "New Year's in Reykjavik: the packing list for 4 hours of daylight." | — | colourful roofs under snow, dim blue midday light | queued |
| Dec 21 | 1 | Reel | Offline access | "New Year's Eve in Amsterdam, network jammed at midnight: the plan still opens." | v3 e-min | canal at night, frost on a bike, fireworks bokeh | queued |
| Dec 21 | 2 | Carousel | Several trips, one app | "2027: Porto in March, Croatia in June, Japan in autumn — where do the plans live?" | — | paper atlas and passport flat-lay, crisp white January sun | queued |
| Dec 21 | 3 | Reel | Countdown widget | "Japan in April, 100 days away: the countdown widget does the waiting." | v2 g-min | a snow-capped volcano over a still lake, crisp blue sky | queued |
| Dec 21 | 4 | Carousel | Travel diary / archive | "Thailand, Madeira, Lisbon: every 2026 trip's photos and notes, kept by day." | — | postcards and ticket stubs on dark wood, warm lamp light | queued |
| Dec 28 | 1 | Reel | Budget tracking | "Croatia in June on €1,500: set the budget before you book anything." | v1 a-major | walled sea town in winter sun, empty, cool turquoise | queued |
| Dec 28 | 2 | Carousel | Day-by-day plans | "Venice for Carnival (Jan 30 – Feb 9): 3 days, day by day." | — | gondolas in fog by the lagoon, silver light | queued |
| Dec 28 | 3 | Reel | Bookings + expenses (business) | "Business trip to Singapore in January: flight, hotel, client dinners — the expenses for the report." | v4 d-major | bay skyline at night in rain, purple-teal reflections | queued |
| Dec 28 | 4 | Carousel | Packing list | "January sun in the Canaries: the 7-day beach packing list." | — | black lava fields and white houses, hard sun | queued |
| Jan 4 | 1 | Reel | Day-by-day with maps | "Japan for cherry blossom: 10 days, Tokyo to Kyoto, day by day." | v5 c-min | bamboo grove in winter, cold green, early light | queued |
| Jan 4 | 2 | Carousel | Tasks + reminders | "Summer in Greece: what to do 3, 2 and 1 months out." | — | white domes off-season, empty lanes, cool blue | queued |
| Jan 4 | 3 | Reel | Budget tracking (your currency) | "A week in Mexico City: pay in pesos, see it in your currency." | v0 c-major | cobalt and pink colonial walls, bougainvillea, midday | queued |
| Jan 4 | 4 | Carousel | Save from any app | "New Zealand road trip: 9 bookings across 4 apps — share them into one trip." | — | road winding to mountains through summer-gold grass | queued |
| Jan 4 | 5 | Reel | Packing list (family ski) | "February half-term ski week in Austria with kids: the list that's ready next year too." | v3 e-min | kids' ski helmets on a bench (no people), bright snow glare | queued |
| Jan 11 | 1 | Reel | Offline access | "Northern lights in Tromsø, no signal on the fjord: the tour booking still opens." | v2 g-min | fjord at night, green aurora over black water | queued |
| Jan 11 | 2 | Carousel | Day-by-day plans | "Rio for Carnival: 5 days around the Sambadrome, day by day." | — | granite peak over the bay at dusk, purple sky | queued |
| Jan 11 | 3 | Reel | Trip sharing (Premium) | "Family week in Mallorca, three generations: send everyone the same plan." | v1 a-major | stone finca among olive trees, soft winter sun | queued |
| Jan 11 | 4 | Carousel | Budget tracking | "Backpacking Vietnam for 3 weeks: the budget, by category." | — | limestone karsts in mist, jade water | queued |
| Jan 11 | 5 | Reel | Calendar export (Premium) | "Ski week in Niseko: lessons, transfers, onsen — every time in your Apple Calendar." | v4 d-major | powder-laden trees, deep snow, blue shadows | queued |
| Jan 18 | 1 | Reel | Bookings | "Lunar New Year in Taipei: train, hotel, family dinner — three confirmations, one trip." | v5 c-min | temple courtyard with lanterns at night, red and gold | queued |
| Jan 18 | 2 | Carousel | Packing list (family) | "February half-term city break in Bath with kids: the family packing list." | — | honey-stone crescent in frost, low winter sun | queued |
| Jan 18 | 3 | Reel | Day-by-day plans | "Venice in Carnival week: Burano, Murano, San Marco — which day for which?" | v0 c-major | coloured island houses reflected in a canal, saturated pastels | queued |
| Jan 18 | 4 | Carousel | Day-by-day plans | "Valentine's weekend in Bruges, Feb 12–14: two days, day by day." | — | canal with swans at dawn, mist, soft rose | queued |
| Jan 18 | 5 | Reel | Budget tracking | "Spring break in Cancún: set the budget now, track it on the beach." | v3 e-min | Caribbean lagoon, white sand, noon glare, palm shadows | queued |
| Jan 25 | 1 | Reel | Several trips, one app | "Croatia, Iceland, Japan in 2027 — three plans in one app, not three notes." | v2 g-min | three folded paper maps with pins, kraft paper and ink, daylight | queued |
| Jan 25 | 2 | Carousel | Packing list | "Japan for cherry blossom: the spring packing list." | — | early plum blossom in a park, pale pink, overcast | queued |
| Jan 25 | 3 | Reel | Reminders | "Valentine's getaway to the Scottish Highlands, train Friday at 17:30 — reminder set." | v1 a-major | loch with a castle ruin, low cloud, moody purple | queued |
| Jan 25 | 4 | Carousel | Budget tracking | "Lunar New Year in Hong Kong: the 4-day budget, by category." | — | neon street in the rain at night, red and cyan | queued |
| Jan 25 | 5 | Reel | Offline access | "Half-term in the Lake District, no signal on the fells: the day plan still opens." | v4 d-major | frosty fells, dry-stone wall, low sun | queued |
| Feb 1 | 1 | Reel | Trip sharing (Premium) | "Half-term in Copenhagen with the grandparents: send them the plan." | v5 c-min | colourful harbour houses in winter, wet cobbles | queued |
| Feb 1 | 2 | Carousel | Bookings, offline | "Rio Carnival: parade tickets, hotel, transfers — offline when the network jams." | — | wave-pattern promenade at night, street lights | queued |
| Feb 1 | 3 | Reel | Day-by-day plans | "Spring break in Puerto Rico: 6 days, beaches and rainforest, day by day." | v0 c-major | rainforest waterfall, lush green, humid haze | queued |
| Feb 1 | 4 | Carousel | Packing list | "Valentine's weekend in Florence: the carry-on-only packing list." | — | terracotta dome at golden hour, river reflection | queued |
| Feb 1 | 5 | Reel | Budget tracking (ski) | "Half-term ski week in Andorra: lift passes, hire, food — the budget on the slope." | v3 e-min | bright noon slopes, primary-colour piste markers | queued |
| Feb 8 | 1 | Reel | Day-by-day plans | "Cherry blossom in Kyoto: 3 days — which temples on which morning?" | v2 g-min | canal path lined with bare cherry trees in early spring, pale light | queued |
| Feb 8 | 2 | Carousel | Tasks + reminders | "Easter in Seville (Mar 28): what to book 7 weeks out." | — | cathedral bell tower at night, incense-like haze, amber | queued |
| Feb 8 | 3 | Reel | Offline access | "Spring-break road trip through Utah's parks, no signal between towns: the bookings still open." | v1 a-major | red-rock canyon road, long shadows, deep orange | queued |
| Feb 8 | 4 | Carousel | Packing list | "Spring break in Costa Rica: the 7-day packing list." | — | cloud-forest hanging bridge in green fog | queued |
| Feb 8 | 5 | Reel | Save from any app | "Japan in April: 30 saved tips from Safari, shared straight into the trip." | v4 d-major | Osaka canal at night, neon reflections | queued |
| Feb 15 | 1 | Reel | Bookings | "Easter in Rome, Mar 26–29: flights, hotel, the Vatican slot — one trip." | v5 c-min | empty colonnaded square at early morning, pale spring sun | queued |
| Feb 15 | 2 | Carousel | Day-by-day plans | "Spring break in New Orleans: 4 days, day by day." | — | iron balconies with ferns, pastel facades | queued |
| Feb 15 | 3 | Reel | Budget tracking (your currency) | "Japan in cherry-blossom season: pay in yen, see it in your currency." | v0 c-major | river lined with lanterns at dusk, pink-lilac | queued |
| Feb 15 | 4 | Carousel | Packing list (family) | "Easter week in Crete with kids: the family beach packing list." | — | pink-sand lagoon from above, clear shallows | queued |
| Feb 22 | 1 | Reel | Day-by-day plans | "Greek islands this summer: 4 islands, 3 ferries, one day-by-day plan." | v3 e-min | white volcanic-rock coves from above, saturated blue | queued |
| Feb 22 | 2 | Carousel | Tasks + reminders | "Japan in 5 weeks: the checklist before cherry blossom." | — | tatami room, shoji-screen morning light | queued |
| Feb 22 | 3 | Reel | Offline access | "Easter hike on the Amalfi Coast's Path of the Gods, no signal: the day plan still opens." | v2 g-min | terraced lemon groves on cliffs, hazy spring sun | queued |
| Feb 22 | 4 | Carousel | Budget tracking | "Spring break in Iceland: the 5-day budget, by category." | — | glacier lagoon icebergs, blue ice, overcast | queued |

Plan totals (by week-of month): 85 posts — Oct 6 (2 built + 4 queued), Nov 24, Dec 17, Jan 20, Feb 18. Reels 48, carousels 37.

- Music ids are `music.mjs` variant numbers (0–5). The 2026-10-14 reel used
  v2 g-min and Oct 19 #1 v1 a-major; the rotation above continues in the fixed
  order v4, v5, v0, v3, v2, v1, so no variant repeats within 6 consecutive
  reels. If a row is swapped or skipped, keep the order and check the last 6
  reels in `marketing-post looks`.
- Every post ends with "Download Travel Stories free"; carousels may add
  "Save this for your next trip".
- The Look column is a starting point, not a script: the nightly job still
  checks `marketing-post looks` and changes anything that repeats a recent
  post. Hooks may be tightened; the destination + problem must stay. Reels
  open on a new moment of the real app footage, cut around the new b-roll.
- Hooks name dates only when the date is in the calendar hooks table and is
  verified there. Numbers in hooks (6 ferry bookings, €1,500) are the
  scenario, not a statistic; never present them as facts about users or prices.
- The nightly job may swap a row only per a §7 verdict, and must log the swap
  in §8.
- **Status** (spark#136): `queued` → `built <date> <postId>` (created, scheduled)
  → `posted <date> <postId>`. The nightly job builds the first `queued` row whose
  week starts within 7 days, one row per night, and writes its status here.
  Rows leave this table once their post is published (spark#138).
- Extend the plan by ~4 weeks when fewer than 4 weeks of `queued` rows remain
  (next: March 2027 — spring break, Easter Mar 28, cherry blossom in-trip,
  summer booking season), using the calendar hooks table; log it in §8.

## 7. 7-day review procedure

1. Every Monday, select posts with `status=published` published 7–13 days ago
   that do not yet have a §8 learnings-log row (Appwrite db `marketing`, posts
   collection). The 1-day grace covers posts published on other weekdays.
2. For each post, read the metrics `collect-metrics` wrote into the post doc:
   reach, likes, comments, saves, shares (IG and FB). Note the doc's
   last-collected time.
3. Read Umami for the 7 days after publish: event `social-landing` grouped by
   `src` (instagram, facebook) plus the App Store click events grouped by
   `src`. Record as funnel context; they are not tied to a single post.
4. Compute **reach = IG reach + FB reach** and
   **eng = likes + comments + saves + shares** (summed across both platforms).
5. Verdict:
   - **PASS**: reach ≥ 5, or saves ≥ 1, or shares ≥ 1.
   - **FAIL**: reach ≤ 1 and eng = 0.
   - **HOLD**: anything else.
   - **NO-DATA**: metrics missing, or last-collected time > 24h old. Rerun
     next week; do not judge the post.
6. Actions:
   - PASS: keep the format + message; add one more similar post (same feature,
     new destination) to §6 within 2 weeks.
   - HOLD: no change.
   - FAIL: rewrite the next planned §6 row with the same failure pattern
     (e.g. generic opener) to use a concrete destination + problem hook.
   - Rotate out: a format+message combo that FAILs 2 reviews in a row is
     replaced in next week's plan by the best PASS combo.
   - The §4 cadence floor always holds.
7. Re-baseline: when the median reach of the last 8 reviewed posts is ≥ 20,
   propose new thresholds in §9 for Robert. Do not change them without his
   approval.
8. Append one row per post to §8, using this template:

   ```
   | YYYY-MM-DD | <post id> "<hook>" (<format>, <feature>) | IG r/l/c/s/sh · FB r/l/c/s/sh · Umami 7d ig/fb landings, store taps | PASS/HOLD/FAIL/NO-DATA | <change made, or "none"> |
   ```

## 8. Learnings log

Append-only. Newest at bottom. Never edit or delete rows.

| Date | Post | Numbers | Verdict | Change |
|---|---|---|---|---|
| 2026-10-14 | BASELINE: 131 posts (93 with metrics) | median reach 2–4; best (Apr–May story/advice images) reach 5–8, likes 3–5, saves on advice posts; worst (Jul–Aug generic-pain carousels) reach 0–1, score ~1 | BASELINE | Concrete destination + concrete problem hooks; no generic-pain openers. First auto-published reel 2026-10-14 = first post in new system; review due ~2026-10-21. |
| 2026-10-14 | REVIEW RUN: no posts published 7–13 days ago (only the 2026-10-14 reel `9d7e141a9148`, review due ~2026-10-21) | — | NO-DATA | Window empty, nothing judged. Footage note: `footage-tour.mp4` has no street-map frame (full-res + per-second pixel scan); the 'Download offline maps' task is on screen at t≈35–38 s. Week 2026-10-19 posts created ready: reel `6acffaa9e525281e1a9b` (offline maps, 2026-10-19 15:00Z), carousel `6acffaab023c7d3cf05f` (day-by-day plans, 2026-10-22 15:00Z). |

| 2026-10-19 | REVIEW RUN: no posts published 7–13 days ago (window Oct 6–12; nearest published posts are 2026-10-14/15, their reviews due ~2026-10-21/22) | — | NO-DATA | Window empty, nothing judged. Built §6 Oct 26 #1 (reel, day-by-day itinerary + bookings, Krabi at hard noon): post `6ad558d0102476c9eb4f` ready at 2026-10-26T15:00Z; reel ts-social-20261019-1 (bold coral/sand look, music v4 d-major, footage moment 17.0 s = itinerary day-list with Day 1 bookings; fresh Krabi stills + 2 fresh LTX clips, 17.5 s; design task 20261019-0042, review PASS round 1). |
- 2026-10-15 — plan format: §6 got a Status column and the content job runs nightly (one due row per night) instead of Monday-weekly (Robert; spark#136). Rows Oct 19 #1–#2 were built by the earlier weekly runs.
- 2026-10-15 — plan expanded (Robert's request: bring the plan up to date the same way as Event Stories): §6 now runs week of Oct 19, 2026 – week of Feb 22, 2027 (85 rows: Oct 6, Nov 24, Dec 17, Jan 20, Feb 18; 48 reels, 37 carousels; 83 queued) with a Calendar hooks table (Christmas markets, ski season, US Thanksgiving, Black Friday / Cyber Monday / Travel Tuesday, Christmas travel, NYE city trips, January planning, Venice and Rio Carnival, Lunar New Year, Valentine's, Feb half-term, spring break, Easter Mar 28, cherry blossom) and a Look column so each row starts from a distinct scene (spark#133); music rotation continues in the fixed order v4, v5, v0, v3, v2, v1. §5 got a claim sheet of verbatim site lines and a never-claim list. Changed queued rows (claims not on the live site): Oct 26 #1, Nov 2 #1 and Nov 9 #3 were "AI trip planning" — the site has no AI planning — now day-by-day + bookings (Thailand), route on a map (Algarve) and the Japan-in-winter packing list; Nov 9 #2 "Offline maps" → offline access (the site promises offline itineraries/bookings/diary, not maps); Oct 26 #3 and Nov 9 #1 sharing hooks no longer imply live group sync (sharing = sending the plan, Premium). Added Oct 26 #4 (ramp 3–4), Nov 2 #5, Nov 9 #5. Oct 19 #1–#2 unchanged (built). §2: the app is LIVE (App Store since 2026-01-06, free + one-time Premium), not pre-launch; feature list now matches the site (removed AI trip planning, offline maps, live travel updates); site languages corrected. §1: added the prune step (spark#138). §3 (Robert's say-so; all implied by his rules or this request): hashtag rule fixed from the After Stories brand tag (a copy-paste error from that app) to `#TravelStories` + the app record's brandHashtags; visuals line now follows the fresh-shoot rule (only the real app footage may be reused, other moments, around new b-roll); no app UI in generated images; CTA changed from the pre-launch "Get notified in the App Store." to "Download Travel Stories free" (ctaOptions) because the app is live and the site says "Download free". §4 unchanged.

- 2026-10-15 — Housekeeping: row Oct 16 #1 (carousel "3 days in Lisbon, planned day by day.", post 6ad0ba765a0b80ce0cf5) — the post is published (2026-10-15 12:38 UTC); status normalized from the legacy "scheduled 06:00 UTC …" to `posted 2026-10-15 6ad0ba765a0b80ce0cf5` so the next plan_prune removes it. §7 review not run today (Thursday; the review runs Monday, and there are no unreviewed posts published 7–13 days ago). No §6 row due tonight: the first `queued` row is week of Oct 26 (starts in 11 days, outside the 7-day window).
| 2026-10-20 | Built §6 Oct 26 #2 "10 days in Thailand. Real receipts, tracked." (carousel, budget tracking) — post `6ad6a92db0f1d4658a1f` | — | BUILT | ready at 2026-10-26T15:00Z. Look: Bangkok night market and lantern-lit khlong, neon pink and green, overhead flat-lays and close-ups, one night series. 7 fresh comfy-gen stills (ts-social-20261020); re-render rounds removed legible signage, a US-dollar note, coin inscriptions, a watermark, plate text and a visible face. Slot Oct 26 15:00Z free because #1 reel `6ad558d0102476c9eb4f` published 2026-10-19 13:35Z (row pruned by plan_prune). Design 20261020-0046 (review round 1 FAIL: image defects + plan/post-id pending, all fixed); Gate 1 PASS. |
| 2026-10-21 | 9d7e141a9148 "Your trip is 14 open tabs and one very full spreadsheet." (reel, all-in-one) | IG r0/l0/c0/s0/sh0 · FB r—/l—/c0/s—/sh0 (fbLikes/fbSaves absent; metricsUpdatedAt 2026-10-14 12:00Z, $updatedAt 2026-10-18 03:00Z) · Umami 7d ig=3/fb=1 profile taps, 0 site landings, 1 store tap | NO-DATA | Metrics last collected >24h ago; re-run next week, not judged. |
| 2026-10-21 | Built §6 Oct 26 #3 "Rome with three friends and three different plans? Send one." (reel, trip sharing Premium) — post `6ad7fbeaf21b007e23dc` | — | BUILT | ready at 2026-10-27T15:00Z (Oct 27 is a Tuesday; the auto-observed active day Thursday would be Oct 29 — kept the design's slot, 24h from the Oct 26 15:00Z carousel). Look: Roman cobbled side street at blue hour, ivy and a parked Vespa, cool blue ink with warm window glow, low ground-level framing; editorial reel look (last two reels clean/bold); music v5 c-min. 18 s: footage moment t=41–44.5 s (trip overview dashboard WITH share icon; the designed 24–35 s window turned out to be the packing-list screen at t=24–29, so it could not be met — stated per the design's risk note; the moment is pre-cropped to 9:16 because the reel template center-crops the 1320x2868 footage and would clip the header) + 5 fresh Rome blue-hour shots (ts-social-20261021: 2 new LTX clips, 3 stills; the three-lane fork still failed 3 renders on signage/fork and shipped as a clean lane-to-dome still with Ken Burns after its LTX clip showed a morphing bush). Design 20261021-0046 (review round 1 FAIL: share-icon header cropped + hook contrast; fixed via 9:16 pre-crop, frame 0 + held frames re-verified readable, hook measured 9/10 over scrim); Gate 1 PASS. |
## 9. Open questions & watch items

- **Oct 19 #1 claims offline maps** (owner: Robert) — the built reel
  `6acffaa9e525281e1a9b` (scheduled 2026-10-19 15:00Z) hooks on "Your map still
  works", but the site does not promise offline maps (§5 never-claim) and the
  app footage has no map frame (§8, 2026-10-14). Decide before it publishes:
  let it run, or edit the caption to "Your day plan still opens."
- **Launch status** (resolved 2026-10-15) — the app is live (App Store since
  2026-01-06, current version 1.8.7, free). The CTA is now "Download Travel
  Stories free"; the old "CTA mismatch" item is closed.
- **`llms-full.txt` is a 404** (owner: Robert) — the site serves `llms.txt`
  and `ai.txt` only. The claim sheet uses the homepage + `llms.txt`.
- **Conversion events still deploying** (owner: Hermes). Until live, treat
  Umami store taps as incomplete.
- **Umami ingestion lag** (owner: Hermes). Do not read the Saturday funnel
  report as final for the last 24–48h.
- **Stories (IG/FB)?** (owner: Robert) decide after the week of Nov 9.
- **Review window** (resolved 2026-10-14): the selection is "published 7–13
  days ago, not yet reviewed" (§7 step 1), so posts published on any weekday
  are caught by the next Monday run.
- **`optimize-guidelines` is dormant** (owner: Robert): decide whether to
  enable once §8 has ≥ 4 weeks of logs.
- **IG target vs pipeline** (owner: Robert): IG target is 5–7/week, pipeline
  runs 4–5/week. Revisit after the ramp.
- **Log growth** (owner: Robert): decide archiving when §8 passes ~60 rows.
- **Unverified dates** (owner: Hermes) — re-check before building the rows
  that use them: Strasbourg Christmas market 2026 (Nov 26 – Dec 24 reported,
  not confirmed by the city; Nov 16 #1 does not name a date), Copenhagen/Tivoli
  (not found), ski-resort openings (pattern only), the official Rio Carnival
  schedule (Riotur/LIESA; Jan 11 #2 and Feb 1 #2 name no date), the official
  cherry-blossom forecast (JMA, Dec–Jan; hooks name no bloom date), the
  spring-break weeks (vary by school). Lunar New Year travel-rush window is a
  commercial estimate.
- **Audience markets unknown** (owner: Robert) — the brand tone says "globally
  inclusive — avoid US-centric references", so the plan is mostly European and
  global, with UK half-terms and two US-only moments (Thanksgiving Nov 9 #5,
  spring break). Check the IG/FB audience by country and swap rows if it is
  concentrated somewhere else.
- **October half-term not used** — Oct 26–30, 2026 (England) is too late to
  hook planning posts; the February half-term (Feb 15–19, 2027) is used.
- **App record vs site** (owner: Robert) — the brand record lists "iCloud
  trip sharing" as a differentiator and "7+ languages", while the site says
  data stays on the iPhone, sharing is a Premium export, and the app has 14
  languages. Posts follow the site; consider updating the record. The
  targetAudience percentages (45%, 58%) are not to be used in posts.
- **More CTAs in the brand record** (owner: Robert) — ctaOptions also has
  "Plan your next adventure", "Where are you traveling next? Comment below",
  "Share with your travel crew" and "Start planning in seconds". §3 lists
  three; decide whether to add the others.
