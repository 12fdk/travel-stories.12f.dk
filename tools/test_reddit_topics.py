"""Tests for tools/reddit-topics.py — stdlib unittest, no network.

    python3 -m unittest discover -s tools -p 'test_*.py'
"""

import importlib.util
import tempfile
import unittest
from pathlib import Path

_SPEC = importlib.util.spec_from_file_location(
    "reddit_topics", Path(__file__).resolve().parent / "reddit-topics.py")
rt = importlib.util.module_from_spec(_SPEC)
_SPEC.loader.exec_module(rt)

PLAN = """# Plan

## 3. Target keyword list

| # | Keyword | Est. vol/mo |
|---|---|---|
| 1 | best trip planner apps ✅ | 1k |
| 17 | travel documents checklist | 300 |
| 18 | trip planning timeline (what to do 3/2/1 months out) | 100 |
| 19 | how much cash to bring on vacation | 200 |
| 21 | notion travel planner template | 300 |

## 4. Content calendar

| 7 | ★ Freebie | The Free Travel Budget Template | travel budget template |
"""

POSTS = [
    {"slug": "notion-travel-planner-template", "title": "Notion Travel Planner Template",
     "keyword": "notion travel planner template"},
    {"slug": "how-to-budget-for-a-trip", "title": "How to Budget for a Trip",
     "keyword": "travel budget"},
]


class Matching(unittest.TestCase):
    def test_short_words_match_on_boundaries(self):
        self.assertIn("planning-tools", rt.themes_of("Best app for trip planning?"))
        self.assertNotIn("planning-tools", rt.themes_of("So happy with my trip"))
        self.assertNotIn("money", rt.themes_of("Is Atmosphere worth it?"))

    def test_plural_matches(self):
        self.assertIn("planning-tools", rt.themes_of("Which apps do you use?"))
        self.assertIn("photos", rt.themes_of("Where do you keep trip photos?"))

    def test_document_your_travels_is_journal_not_paperwork(self):
        themes = rt.themes_of("how to document your travels")
        self.assertIn("journal", themes)
        self.assertNotIn("documents", themes)

    def test_no_booking_theme(self):
        self.assertEqual(rt.themes_of("Cheap flights and hotel deals to Lisbon"), [])

    def test_smart_quotes_are_normalised(self):
        self.assertEqual(rt.normalise("I’m “done”"), "I'm \"done\"")


class Usefulness(unittest.TestCase):
    def test_question_is_useful(self):
        self.assertTrue(rt.is_useful("How much cash should I bring to Japan for 2 weeks?"))

    def test_photo_and_venting_posts_are_noise(self):
        self.assertFalse(rt.is_useful("Sunset view from my hotel in Santorini [OC]"))
        self.assertFalse(rt.is_useful("Rant: airlines charging for carry on, right?"))
        self.assertFalse(rt.is_useful("Is it just me or is packing the worst part?"))

    def test_short_and_shouty_titles_are_dropped(self):
        self.assertFalse(rt.is_useful("Packing help?"))
        self.assertFalse(rt.is_useful("WHY IS EVERYTHING SO EXPENSIVE NOW?"))

    def test_rant_inside_a_word_is_not_noise(self):
        self.assertTrue(rt.is_useful("How do you pick restaurants on a trip budget?"))

    def test_non_travel_sub_needs_travel_context(self):
        self.assertFalse(rt.in_context("How do I start a daily journal?", "Journaling"))
        self.assertTrue(rt.in_context("How do I journal on a long trip?", "Journaling"))
        self.assertTrue(rt.in_context("How do I start a daily journal?", "solotravel"))


class Coverage(unittest.TestCase):
    def test_covered_themes_from_title_keyword_and_slug(self):
        covered = rt.covered_themes(POSTS)
        self.assertIn("notion-travel-planner-template", covered["planning-tools"])
        self.assertIn("how-to-budget-for-a-trip", covered["money"])
        self.assertNotIn("documents", covered)

    def test_existing_posts_reads_frontmatter(self):
        with tempfile.TemporaryDirectory() as d:
            Path(d, "post-a.md").write_text(
                '---\ntitle: "Passport Checklist"\nkeyword: "travel documents checklist"\n'
                'faq:\n  - question: "title: nested"\n---\nBody title: no\n', encoding="utf-8")
            Path(d, "notes.txt").write_text("ignored", encoding="utf-8")
            posts = rt.existing_posts(Path(d))
        self.assertEqual(posts, [{"slug": "post-a", "title": "Passport Checklist",
                                  "keyword": "travel documents checklist"}])

    def test_existing_posts_missing_dir_is_empty(self):
        self.assertEqual(rt.existing_posts(Path("/nonexistent/blog")), [])


class PlanKeywords(unittest.TestCase):
    def test_open_keywords_skip_ticked_and_written(self):
        kws = {k["keyword"] for k in rt.plan_keywords(PLAN, POSTS)}
        self.assertEqual(kws, {"travel documents checklist", "trip planning timeline",
                               "how much cash to bring on vacation"})

    def test_calendar_rows_are_not_keywords(self):
        kws = {k["keyword"] for k in rt.plan_keywords(PLAN, [])}
        self.assertNotIn("★ freebie", kws)
        self.assertIn("notion travel planner template", kws)

    def test_keyword_themes_come_from_the_full_cell(self):
        row = next(k for k in rt.plan_keywords(PLAN, POSTS) if k["num"] == 18)
        self.assertIn("timeline", row["themes"])

    def test_empty_plan(self):
        self.assertEqual(rt.plan_keywords("", POSTS), [])


class Digest(unittest.TestCase):
    ENTRIES = [
        ("Do I need a visa and what documents for Vietnam?", "TravelNoPics", 0),
        ("What documents should I carry copies of abroad?", "solotravel", 2),
        ("How much cash should I bring to Japan for 2 weeks?", "TravelHacks", 1),
        ("Sunset view from my hotel [OC]", "travel", 0),
        ("How do I start a daily journal habit?", "Journaling", 0),
    ]

    def test_ranks_uncovered_theme_with_plan_keyword(self):
        ranked, useful = rt.build_digest(self.ENTRIES, POSTS, PLAN, examples=3)
        self.assertEqual(useful, 3)
        self.assertEqual(ranked[0]["key"], "documents")
        self.assertEqual(ranked[0]["count"], 2)
        self.assertEqual(ranked[0]["covered_by"], [])
        self.assertEqual(ranked[0]["plan_keywords"], ["#17 travel documents checklist"])

    def test_covered_theme_still_lists_open_plan_keyword(self):
        ranked, _ = rt.build_digest(self.ENTRIES, POSTS, PLAN, examples=3)
        money = next(b for b in ranked if b["key"] == "money")
        self.assertEqual(money["covered_by"], ["how-to-budget-for-a-trip"])
        self.assertIn("#19 how much cash to bring on vacation", money["plan_keywords"])

    def test_off_topic_journal_sub_is_ignored(self):
        ranked, _ = rt.build_digest(self.ENTRIES, POSTS, PLAN, examples=3)
        self.assertNotIn("journal", [b["key"] for b in ranked])

    def test_titles_from_atom(self):
        xml = ('<feed xmlns="http://www.w3.org/2005/Atom"><entry><title>A  b\n c'
               '</title></entry><entry><title>D</title></entry></feed>')
        self.assertEqual(rt.titles_from(xml), ["A b c", "D"])
        self.assertEqual(rt.titles_from("not xml"), [])


if __name__ == "__main__":
    unittest.main()
