# Travel Stories — Marketing Plan (living doc)

Owner: Robert · Maintained by: Hermes (social pipeline agent) · Last updated: 2026-10-14

## 1. What this is & how it's updated

- Hermes owns this file and runs every step in it. Robert reviews it and owns
  the decisions marked *Robert* in §9.
- Pipeline (Appwrite db `marketing` on app.12f.dk):
  - Weekly cron (Monday) renders the images on the spark (`comfy-gen`) and creates the post with `marketing-post` as `status=ready` (media uploaded by the CLI, spark#125); `publish-social` publishes once `scheduledAt` has passed. `queue-comfyui` is not used: the platform has no renderer and needs no ComfyUI URL.
  - Function `publish-social` (every 15 min) publishes to IG and FB; enforces a 20h minimum gap.
  - Function `collect-metrics` (every 2h) writes IG/FB engagement into the post docs.
  - Function `optimize-guidelines` (monthly) — **dormant**.
- The Monday cron also runs the §7 review and appends rows to §8.
- Editing rules for this file:
  - Append-only to §8: never delete or rewrite past log rows.
  - Plan changes go in §6, plus a §8 row that says why.
  - §3 and §4 change only on Robert's say-so.
  - Update the `Last updated` line on every edit.
  - Never put secrets, API keys or tokens in this file.

## 2. Product & funnel

- Product (iOS trip planner, pre-launch): AI trip planning, offline maps,
  day-by-day plans, itinerary saving/sharing, budget tracking, live travel
  updates. Site in en/de/fr/pt-BR.
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

- Product-first visuals: real product UI footage (assets in `/workspace/motion`)
  or real destination stills.
- Never AI-generated people with visible faces.
- Phones may appear; phone **screens** must not.
- One product message per post.
- The hook sells the product within the first 1–2 seconds.
- Pre-launch CTA, verbatim: "Get notified in the App Store."
- At most 5 hashtags per post, always including `#afterstories`.
- One video per episode.
- Music: rotate the 6 variants (`music.mjs` ids 0–5 = c-major, a-major, g-min,
  e-min, d-major, c-min) with no repeat within any 6 consecutive reels.
- Use copy verbatim from the live site where possible, e.g. "keeps your
  itinerary, packing list, budget, and memories in one offline iPhone app".
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
| Reel | Reach to non-followers (+36% vs carousels) | Reels are the top-of-funnel format at our size | Product UI in second 0–1; use a music variant |
| Carousel | Earns saves (+109% engagement per person reached) | Saves are the retention signal | Slide 1 = concrete destination + concrete problem (best-history pattern); last slide = CTA |
| Single image | Historically our best format | Baseline below | Not in the steady mix; its lesson goes to carousel covers |

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

## 6. Content plan (next 4 weeks)

| Week of | # | Format | Feature / message | Hook (first 1–2 s) | Music |
|---|---|---|---|---|---|
| Oct 19 | 1 | Reel | Offline maps | "No signal in Lisbon's Alfama? Your map still works." | v1 a-major |
| Oct 19 | 2 | Carousel | Day-by-day plans | "3 days in Lisbon, planned day by day." | — |
| Oct 26 | 1 | Reel | AI trip planning | "10 days in Thailand — planned in one tap." | v4 d-major |
| Oct 26 | 2 | Carousel | Budget tracking | "10 days in Thailand. Real receipts, tracked." | — |
| Oct 26 | 3 | Reel | Itinerary sharing | "One Rome plan. Everyone in the group sees it." | v5 c-min |
| Nov 2 | 1 | Reel | AI trip planning | "Road trip down the Algarve — route planned for you." | v0 c-major |
| Nov 2 | 2 | Carousel | Day-by-day plans | "Tokyo, 5 days: what to do each morning." | — |
| Nov 2 | 3 | Reel | Budget tracking | "Barcelona weekend: see what you've spent, in your currency." | v3 e-min |
| Nov 2 | 4 | Carousel | Itinerary saving | "Bag didn't arrive? Your bookings are still on your phone, offline." | — |
| Nov 9 | 1 | Reel | Itinerary sharing | "Paris with friends: one shared day-by-day plan." | v2 g-min |
| Nov 9 | 2 | Reel | Offline maps | "Hiking Madeira's levadas without signal." | v1 a-major |
| Nov 9 | 3 | Carousel | AI trip planning | "First time in Japan? A 7-day plan in seconds." | — |
| Nov 9 | 4 | Carousel | Budget tracking | "Lisbon long weekend: every euro, tracked." | — |

- Music ids are `music.mjs` variant numbers (0–5). The 2026-10-14 reel used
  v2 g-min; the rotation above continues from there with no repeat within 6
  consecutive reels.
- Every post ends with "Get notified in the App Store."
- The Monday cron may swap a row only per a §7 verdict, and must log the swap
  in §8.

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

## 9. Open questions & watch items

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
- **CTA mismatch** (owner: Robert): the site says "free on the App Store"
  while the pre-launch CTA is "Get notified". Switch the CTA at launch.
