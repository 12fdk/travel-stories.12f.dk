#!/usr/bin/env python3
"""reddit-topics.py — what travellers are actually asking about planning a trip,
packing, money, documents, and keeping the trip once it is over.

Feeds the weekly blog job (see prompt.md §2) with real reader demand instead of
whatever the model imagines a traveller worries about. Each theme in the digest
also lists the matching *unwritten* keywords from BLOG_CONTENT_PLAN.md §3, so the
post can take its topic from Reddit and its target keyword from the plan.

    python3 tools/reddit-topics.py                 # ranked digest, ~60 lines
    python3 tools/reddit-topics.py --json          # same data, machine-readable
    python3 tools/reddit-topics.py --refresh       # ignore the cache

WHY RSS AND NOT THE JSON API: reddit.com/r/<sub>/top.json returns 403 to both a
datacenter IP and a home IP now. The Atom feed at /r/<sub>/top/.rss is still
served, so that is what this uses. It is rate-limited though: hammer it and you
get 429s, which is why requests are paced, retried with backoff, and cached to
.cache/ for most of a day.

WHY A SCRIPT AND NOT A FEW CURL COMMANDS IN THE BRIEF: the Hermes agent's
terminal blocks `-c` / `-e` flags, so `python3 -c '...'` and clever one-liners
fail at runtime with BLOCKED. And raw feeds are ~50 KB each — a dozen of them
would bury the model's context. A plain command that prints a small digest
survives both constraints.

Failure is not fatal: if every feed fails, this exits 2 having printed a clear
message, and the brief falls back to the calendar in BLOG_CONTENT_PLAN.md.

Stdlib only — it runs inside the Hermes container, where there is no pip.
Ported from bike-stories.12f.dk/tools/reddit-topics.py. Tests:
`python3 -m unittest discover -s tools -p 'test_*.py'`.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / ".cache" / "reddit-topics"
POSTS = ROOT / "src" / "content" / "blog"
PLAN = ROOT / "BLOG_CONTENT_PLAN.md"

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36")
ATOM = {"a": "http://www.w3.org/2005/Atom"}

# ORDER MATTERS. Reddit rate-limits hard and the time budget truncates the tail,
# so this is a priority list, highest-value first. r/TravelNoPics and
# r/TravelHacks are text-only question subs; r/solotravel and r/travel are the
# big general ones (r/travel's /top is mostly photos, so it yields less than its
# size suggests); r/onebag and r/HerOneBag are nothing but packing; r/Shoestring
# is money. r/Journaling and r/scrapbooking are the memory cluster (Tier D of
# the plan) and are filtered to travel titles only — see CONTEXT_SUBS.
SUBREDDITS = [
    "TravelNoPics", "TravelHacks", "solotravel", "travel", "onebag",
    "Shoestring", "HerOneBag", "Journaling", "scrapbooking", "roadtrip",
    "europetravel", "JapanTravel",
]
WINDOWS = ["month", "year"]

# Subreddits that are not about travel. A title from one of these only counts
# if it mentions travel at all — otherwise r/Journaling would make "journal"
# the top theme every week on posts about therapy notebooks.
TRAVEL_WORDS = ["travel", "traveling", "travelling", "trip", "vacation", "holiday",
                "abroad", "journey", "backpacking", "road trip", "honeymoon",
                "overseas", "itinerary"]
CONTEXT_SUBS = {"journaling": TRAVEL_WORDS, "scrapbooking": TRAVEL_WORDS}

# Theme buckets. A title can land in several; each is counted once per theme.
# Lowercase; short words match on word boundaries (see _matches). There are
# deliberately NO booking themes (flights, hotels, deals) and no destination
# themes: BLOG_CONTENT_PLAN.md §10 bans both, so the tool never ranks them.
THEMES: dict[str, tuple[str, list[str]]] = {
    "itinerary": ("Building an itinerary: how many days, what order, too much?", [
        "itinerary", "day by day", "day-by-day", "how many days", "too ambitious",
        "too much for", "is this doable", "is this realistic", "rough plan",
        "route", "plan my trip", "planning my trip", "plan a trip", "planning a trip",
        "trip planning", "how to plan"]),
    "planning-tools": ("Apps, spreadsheets and templates for organising a trip", [
        "app", "tripit", "wanderlog", "google maps", "notion", "spreadsheet",
        "google sheets", "excel", "template", "planner", "organizer", "organiser",
        "organize my trip", "organise my trip", "keep track", "keep everything",
        "all in one place"]),
    "packing": ("Packing lists, carry-on only and what to bring", [
        "pack", "packing", "carry on", "carry-on", "personal item", "luggage",
        "suitcase", "what to bring", "what should i bring", "one bag", "onebag",
        "packing list", "packing cubes", "checked bag", "overpack", "toiletries"]),
    "money": ("Trip budget, cash, cards and what a trip really costs", [
        "budget", "cash", "money", "atm", "currency", "credit card", "debit card",
        "exchange rate", "how much does", "how much should i", "how much will",
        "cost", "spend", "spending", "tipping", "fee", "expense", "per day"]),
    "documents": ("Passports, visas, insurance and the documents you need", [
        "passport", "visa", "documents", "esta", "etias", "entry requirements",
        "travel insurance", "insurance", "id card", "copies of", "renew",
        "boarding pass", "vaccination"]),
    "timeline": ("When to plan what: how far in advance, last-minute trips", [
        "how far in advance", "months before", "weeks before", "months out",
        "weeks out", "last minute", "last-minute", "timeline", "when should i start",
        "how early", "too early to"]),
    "before-leaving": ("The checklist before you leave home", [
        "before leaving", "before you leave", "before a trip", "before my trip",
        "before traveling", "before travelling", "checklist", "leaving home",
        "house sitter", "pet sitter", "forget to", "forgot to", "don't forget"]),
    "offline-phone": ("Phone, data, eSIM and staying organised offline", [
        "esim", "sim card", "roaming", "offline", "no signal", "wifi", "wi-fi",
        "data plan", "phone plan", "mobile data", "screenshot"]),
    "journal": ("Keeping a travel journal or diary that you finish", [
        "journal", "journaling", "journalling", "diary", "travel log", "travelogue",
        "write about", "writing about", "notes from", "document your",
        "documenting"]),
    "photos": ("Organising, backing up and actually using travel photos", [
        "photo", "picture", "camera roll", "google photos", "icloud", "backup",
        "back up", "video", "photo book"]),
    "memories": ("Keeping the trip afterwards: scrapbooks, souvenirs, memories", [
        "scrapbook", "scrapbooking", "memento", "ticket stub", "souvenir",
        "keepsake", "memories", "remember the trip", "remembering", "memory"]),
    "post-trip": ("Coming home: post-trip admin, jet lag and the travel blues", [
        "post trip", "post-trip", "post travel", "back home", "after a trip",
        "after the trip", "after my trip", "coming home", "came home", "got home",
        "travel blues", "jet lag", "jetlag"]),
    "first-trip": ("First trip, first solo trip, first time abroad", [
        "first time", "first trip", "first solo", "first international",
        "never traveled", "never travelled", "nervous", "anxious", "anxiety",
        "overwhelmed"]),
    "group-trips": ("Planning with friends, family or kids", [
        "group trip", "with friends", "split costs", "splitting costs", "split the",
        "with family", "with kids", "with a toddler", "family trip", "family vacation",
        "travel partner", "with my partner", "with my parents"]),
    "road-trip": ("Road trips: routes, stops and driving days", [
        "road trip", "roadtrip", "rental car", "car rental", "driving", "campervan",
        "camper van", "rv", "stops along"]),
}

# Titles that are jokes, photos, brag-posts or venting. On travel subs the
# "my photo from X" and "trip report" posts dominate /top and carry no query.
NOISE = [
    "haha", "lol", "lmao", "meme", "rate my", "my setup", "look what", "found this",
    "haul", "unboxing", "day in the life", "psa:", "just wanted to share",
    "guess the", "who else", "relatable", "me when", "pov", "before and after",
    "update:", "trip report", "photo dump", "pics from", "i built", "look at this",
    "[oc]", "sunset", "sunrise", "view from", "shot on", "captured",
    "is it just me", "am i the only", "anyone else feel", "does anyone else feel",
    "my favourite part", "my favorite part", "best perks", "perks of being",
    "rant", "vent", "unpopular opinion", "am i wrong", "aita", ", right?",
    "why do you", "why do people", "so tired of", "i'm done with", "im done with",
    "the audacity", "you won't believe", "you wont believe",
]

TAG_QUESTION = re.compile(
    r"\b(right|isn'?t it|aren'?t they|am i wrong|or is it just me)\s*[?!]+\s*$")
QUESTION_WORDS = [
    "how", "what", "why", "when", "which", "anyone", "does", "do you", "should",
    "tips", "advice", "help", "is it", "can i", "any way", "best way", "struggl",
    "cant", "can't", "trouble", "problem", "recommend", "worth", " vs ",
    "need", "looking for", "suggestions",
]


def cache_path(sub: str, window: str) -> Path:
    return CACHE / f"{sub}-{window}.xml"


def read_cache(path: Path) -> str | None:
    try:
        return path.read_text(encoding="utf-8")
    except OSError:
        return None


def save_cache(path: Path, body: str, verbose: bool) -> None:
    """Best effort. A read-only checkout must not cost us a fetched feed."""
    try:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(body, encoding="utf-8")
    except OSError as e:
        if verbose:
            print(f"  (cache not written: {e.__class__.__name__})", file=sys.stderr)


def fetch(sub: str, window: str, pace: float, ttl: int, refresh: bool,
          verbose: bool, deadline: float) -> tuple[str | None, bool]:
    """Return (xml, from_cache). None means this feed is unavailable.

    Reddit rate-limits anonymous RSS hard — 429 is the normal response to any
    enthusiasm — so requests are paced, backed off, and finally given up on.
    Progress goes to stderr on every feed: a scheduled run is killed after 600s
    of silence, and the backoffs alone can exceed that.
    """
    path = cache_path(sub, window)
    if not refresh and path.exists() and (time.time() - path.stat().st_mtime) < ttl:
        cached = read_cache(path)
        if cached:
            if verbose:
                print(f"  r/{sub:<16} [{window}] cached", file=sys.stderr)
            return cached, True

    url = f"https://www.reddit.com/r/{sub}/top/.rss?t={window}"
    for attempt in range(4):
        if time.time() > deadline:
            if verbose:
                print(f"  r/{sub:<16} [{window}] skipped (time budget spent)", file=sys.stderr)
            break
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA,
                                                       "Accept": "application/atom+xml"})
            with urllib.request.urlopen(req, timeout=25) as r:
                body = r.read().decode("utf-8", "replace")
            save_cache(path, body, verbose)
            if verbose:
                print(f"  r/{sub:<16} [{window}] ok", file=sys.stderr)
            time.sleep(pace)
            return body, False
        except urllib.error.HTTPError as e:
            if e.code in (429, 503) and attempt < 3:
                wait = 30 * (attempt + 1)
                if verbose:
                    print(f"  r/{sub:<16} [{window}] {e.code} — waiting {wait}s",
                          file=sys.stderr)
                time.sleep(min(wait, max(0.0, deadline - time.time())))
                continue
            if verbose:
                print(f"  r/{sub:<16} [{window}] unavailable (HTTP {e.code})", file=sys.stderr)
            break
        except Exception as e:                                    # network, DNS, timeout
            if verbose:
                print(f"  r/{sub:<16} [{window}] unavailable ({type(e).__name__})",
                      file=sys.stderr)
            break

    stale = read_cache(path) if path.exists() else None            # stale beats nothing
    if stale:
        if verbose:
            print(f"  r/{sub:<16} [{window}] using stale cache", file=sys.stderr)
        return stale, True
    return None, False


def titles_from(xml: str) -> list[str]:
    try:
        root = ET.fromstring(xml)
    except ET.ParseError:
        return []
    out = []
    for entry in root.findall("a:entry", ATOM):
        node = entry.find("a:title", ATOM)
        if node is not None and node.text:
            out.append(re.sub(r"\s+", " ", node.text).strip())
    return out


# Reddit titles are full of smart punctuation. Normalise it before matching, or
# a pattern like ", right?" misses «Being "Abused," Right?» purely on quote style.
_SMART = str.maketrans({"‘": "'", "’": "'", "“": '"', "”": '"',
                        "–": "-", "—": "-", "…": "..."})


def normalise(title: str) -> str:
    return title.translate(_SMART)


# Short keywords must match on word boundaries, with an optional plural "s".
# Plain substring matching put "rant" inside "restaurants" and would put "app"
# inside "happy" — so short words match whole, while multi-word phrases and
# long words stay substring matches, since those are specific enough already.
_BOUNDARY_CACHE: dict[str, re.Pattern] = {}


def _matches(word: str, low: str) -> bool:
    if " " in word or len(word) > 9:
        return word in low
    pat = _BOUNDARY_CACHE.get(word)
    if pat is None:
        pat = _BOUNDARY_CACHE[word] = re.compile(rf"(?<![a-z]){re.escape(word)}s?(?![a-z])")
    return bool(pat.search(low))


def in_context(title: str, sub: str) -> bool:
    """False for an off-topic title from a non-travel subreddit."""
    needed = CONTEXT_SUBS.get(sub.lower())
    if not needed:
        return True
    low = f" {normalise(title).lower()} "
    return any(_matches(w, low) for w in needed)


def is_useful(title: str) -> bool:
    low = f" {normalise(title).lower()} "
    if len(title) < 20:
        return False
    if any(_matches(n, low) for n in NOISE):
        return False
    if TAG_QUESTION.search(low):
        return False
    # All-caps venting posts carry no query intent.
    if sum(c.isupper() for c in title) > len(title) * 0.6:
        return False
    return any(_matches(w, low) for w in QUESTION_WORDS) or "?" in title


def themes_of(text: str) -> list[str]:
    low = f" {normalise(text).lower()} "
    return [key for key, (_, words) in THEMES.items()
            if any(_matches(w, low) for w in words)]


def frontmatter(text: str) -> dict[str, str]:
    """The flat top-level `key: value` lines of a post's YAML front matter."""
    if not text.startswith("---"):
        return {}
    head = text[3:].split("\n---", 1)[0]
    out = {}
    for line in head.split("\n"):
        if ":" in line and not line.startswith((" ", "\t", "-")):
            k, v = line.split(":", 1)
            out[k.strip()] = v.strip().strip('"').strip("'")
    return out


def existing_posts(posts_dir: Path = POSTS) -> list[dict[str, str]]:
    """[{slug, title, keyword}] for every post in the blog content collection."""
    out = []
    if not posts_dir.is_dir():
        return out
    for path in sorted(list(posts_dir.glob("*.md")) + list(posts_dir.glob("*.mdx"))):
        fm = frontmatter(path.read_text(encoding="utf-8"))
        out.append({"slug": path.stem, "title": fm.get("title", ""),
                    "keyword": fm.get("keyword", "")})
    return out


def covered_themes(posts: list[dict[str, str]]) -> dict[str, list[str]]:
    """Map theme -> [slugs] for themes an existing post already addresses.

    Matched against the title, the target keyword and the slug only — a lede
    that mentions photos in passing is not a post about organising photos.
    """
    out: dict[str, list[str]] = {}
    for p in posts:
        subject = f"{p['title']} {p['keyword']} {p['slug'].replace('-', ' ')}"
        for key in themes_of(subject):
            out.setdefault(key, []).append(p["slug"])
    return out


_PLAN_ROW = re.compile(r"^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|")


def plan_keywords(plan_text: str, posts: list[dict[str, str]]) -> list[dict]:
    """Unwritten keywords from the plan's keyword tables (§3 only).

    A row counts as written when it carries ✅ OR when an existing post targets
    that keyword or uses it as its slug — the plan's ticks lag behind the posts
    (posts 9, 10, 17, 18, 23 and 25 shipped with their rows still unticked), so
    both are checked.
    """
    section = re.split(r"\n## 3\.", plan_text, maxsplit=1)
    section = re.split(r"\n## 4", section[1], maxsplit=1)[0] if len(section) > 1 else ""
    written = {p["keyword"].lower() for p in posts if p["keyword"]}
    slugs = {p["slug"] for p in posts}
    out, seen = [], set()
    for line in section.split("\n"):
        m = _PLAN_ROW.match(line)
        if not m:
            continue
        num, cell = m.group(1), m.group(2)
        if "✅" in cell:
            continue
        kw = re.sub(r"\s*\(.*?\)\s*", " ", cell).strip().lower()
        if not kw or kw in seen or kw in written or kw.replace(" ", "-") in slugs:
            continue
        seen.add(kw)
        out.append({"num": int(num), "keyword": kw, "themes": themes_of(cell)})
    return out


def build_digest(entries: list[tuple[str, str, int]], posts: list[dict[str, str]],
                 plan_text: str, examples: int) -> tuple[list[dict], int]:
    """Rank themes from (title, sub, rank) entries. Returns (themes, useful_count)."""
    useful = [(t, s, r) for t, s, r in entries if in_context(t, s) and is_useful(t)]
    covered = covered_themes(posts)
    open_kws = plan_keywords(plan_text, posts)
    buckets: dict[str, dict] = {}
    for title, sub, rank in useful:
        for key in themes_of(title):
            b = buckets.setdefault(key, {
                "key": key, "label": THEMES[key][0], "count": 0, "weight": 0.0,
                "titles": [], "covered_by": covered.get(key, []),
                "plan_keywords": [f"#{k['num']} {k['keyword']}" for k in open_kws
                                  if key in k["themes"]]})
            b["count"] += 1
            b["weight"] += 1.0 / (rank + 3)           # higher in /top = stronger demand
            b["titles"].append(title)
    ranked = sorted(buckets.values(), key=lambda b: (b["weight"], b["count"]), reverse=True)
    for b in ranked:
        b["weight"] = round(b["weight"], 2)
        b["titles"] = sorted(b["titles"], key=len)[-examples * 3:][::-1][:examples]
    return ranked, len(useful)


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--subs", help="comma-separated subreddits (default: the travel set)")
    ap.add_argument("--windows", default=",".join(WINDOWS), help="top windows: month,year")
    ap.add_argument("--pace", type=float, default=8.0, help="seconds between requests")
    ap.add_argument("--max-seconds", type=float, default=600.0,
                    help="total time budget; stops fetching and reports what it has")
    ap.add_argument("--ttl", type=int, default=20 * 3600, help="cache lifetime in seconds")
    ap.add_argument("--refresh", action="store_true", help="ignore the cache")
    ap.add_argument("--themes", type=int, default=8, help="how many themes to report")
    ap.add_argument("--examples", type=int, default=3, help="example titles per theme")
    ap.add_argument("--json", action="store_true", dest="as_json")
    ap.add_argument("--quiet", action="store_true", help="no progress on stderr")
    a = ap.parse_args()

    subs = [s.strip() for s in (a.subs.split(",") if a.subs else SUBREDDITS) if s.strip()]
    windows = [w.strip() for w in a.windows.split(",") if w.strip()]
    verbose = not a.quiet

    if verbose:
        print(f"Reading {len(subs)} subreddits x {len(windows)} windows "
              f"(~{a.pace:.0f}s apart, cached {a.ttl // 3600}h, "
              f"{a.max_seconds:.0f}s budget)...", file=sys.stderr)

    deadline = time.time() + a.max_seconds
    seen: set[str] = set()
    entries: list[tuple[str, str, int]] = []          # (title, sub, rank)
    ok = cached = failed = 0
    # Windows outer, subs inner: with a budget that truncates, every subreddit
    # should get its "month" feed before any subreddit gets its "year".
    for window in windows:
        for sub in subs:
            xml, from_cache = fetch(sub, window, a.pace, a.ttl, a.refresh, verbose, deadline)
            if xml is None:
                failed += 1
                continue
            ok += 1
            cached += 1 if from_cache else 0
            for rank, title in enumerate(titles_from(xml)):
                key = re.sub(r"[^a-z0-9]+", "", title.lower())[:60]
                if key in seen:
                    continue
                seen.add(key)
                entries.append((title, sub, rank))

    if not entries:
        print("reddit-topics: every feed failed (Reddit is blocking or offline).\n"
              "Fall back to the calendar in BLOG_CONTENT_PLAN.md (prompt.md §2, "
              "fallback) — that is expected and fine.", file=sys.stderr)
        return 2

    posts = existing_posts()
    try:
        plan_text = PLAN.read_text(encoding="utf-8")
    except OSError:
        plan_text = ""
    ranked, useful_count = build_digest(entries, posts, plan_text, a.examples)
    fresh_themes = [b for b in ranked if not b["covered_by"]]
    done_themes = [b for b in ranked if b["covered_by"]]

    if a.as_json:
        print(json.dumps({
            "feeds_ok": ok, "feeds_failed": failed, "feeds_from_cache": cached,
            "posts_seen": len(entries), "posts_useful": useful_count,
            "themes": ranked,
        }, indent=2, ensure_ascii=False))
        return 0

    print(f"REDDIT DEMAND — {ok} feeds ({cached} cached, {failed} unavailable), "
          f"{len(entries)} posts, {useful_count} carrying a real question")
    print()
    print("UNCOVERED THEMES — strongest demand first")
    if not fresh_themes:
        print("  (every theme is already covered — see prompt.md §2 step 3)")
    for i, b in enumerate(fresh_themes[:a.themes], 1):
        print(f"{i:2}. {b['label']}  [{b['key']}]  {b['count']} posts, weight {b['weight']}")
        for t in b["titles"]:
            print(f"      · {t[:110]}")
        kws = b["plan_keywords"][:3]
        print(f"      plan keyword: {', '.join(kws) if kws else '(none open)'}")
    print()
    print("ALREADY COVERED — a new post here needs a question the existing one skips")
    for b in done_themes[:8]:
        extra = f"  | open: {', '.join(b['plan_keywords'][:2])}" if b["plan_keywords"] else ""
        print(f"  - [{b['key']}] {b['label']} ({b['count']}, weight {b['weight']}) → "
              f"{', '.join(sorted(set(b['covered_by'])))}{extra}")
    print()
    print("TOP QUESTION TITLES VERBATIM — the reader's own words, use them")
    on_topic = [e for e in entries if in_context(e[0], e[1]) and is_useful(e[0])
                and themes_of(e[0])]
    for title, sub, rank in sorted(on_topic, key=lambda e: e[2])[:15]:
        print(f"  · [r/{sub}] {title[:110]}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
