---
title: "The Free Travel Budget Template (PDF + Google Sheet)"
description: "Free travel budget template with six categories, sheet formulas, and a worked $2,400 example. Copy it to Google Sheets or print the PDF before you book."
lede: "A travel budget template is six categories — transport, accommodation, food and drink, activities, local transit, and a buffer — with three columns: Planned, Actual, and Left (Planned minus Actual). Copy the rows into Google Sheets with the SUMIF formulas below, or print the blank PDF, then replace every sample figure with a quote for your own trip. In the worked example, a $2,400 trip for two starts $140 over and lands on $2,400 after two specific cuts."
keyword: "travel budget template"
cover: "/blog/travel-budget-template.png"
coverAlt: "Overhead of a pale marble table with mixed coins, a closed green notebook, a fountain pen, reading glasses, and a small empty cup"
publishDate: 2026-10-07
author: Robert Jensen
tags: ["budgeting", "templates", "trip planning"]
tldr:
  - "A travel budget template is six categories — transport, accommodation, food and drink, activities, local transit, and a buffer — with columns for Planned, Actual, and Left."
  - "Left equals Planned minus Actual. Actual is a SUMIF from a daily log, so the category name in the log has to match the sheet exactly."
  - "The worked example is a $2,400 trip for two. The first quotes total $2,540. Cutting $70 of checked bags and $70 of taxis lands the plan on $2,400."
  - "After three days, food in the example is $195 against a $180 pace. The remaining five days get $57 a day instead of $60."
  - "Download the blank CSV for Google Sheets, or the one-page PDF. Fill your own numbers, then use File → Download → PDF if you want those numbers on paper."
faq:
  - question: "What should a travel budget template include?"
    answer: "Six spending categories and three money columns. The categories are transport, accommodation, food and drink, activities, local transit, and a buffer of about 10-15% of the trip cap. The columns are Planned (what you allowed), Actual (what you have spent), and Left (Planned minus Actual). A daily log that feeds Actual matters as much as the category list. Without the log, the template is only a wish list."
  - question: "How do I use a travel budget template in Google Sheets?"
    answer: "Use two tabs named Budget and Log. On Budget, put the six categories in column A, starting at row 2, and put TOTAL on row 8. In C2 enter =SUMIF(Log!B:B,A2,Log!C:C) so Actual adds the log rows for that category. In D2 enter =B2-C2 so Left is Planned minus Actual. Fill those two formulas down through row 7. On the Log tab, record the date, the exact category name, and the amount for every purchase. Category text has to match exactly, including spaces."
  - question: "Can I print a travel budget template as a PDF?"
    answer: "Yes. This page has a blank one-page PDF with the six categories and a short daily log. If you want your own numbers on paper, fill Planned in Google Sheets, then choose File, Download, PDF Document. Paper does not update itself, so each evening write the new Actual and Left figures, or type the day's purchases into the Log tab when you are back at the sheet."
  - question: "How much buffer belongs in a travel budget template?"
    answer: "About 10-15% of the trip cap, in its own row, not promised to a category in advance. In the $2,400 example the buffer is $240, which is 10% (0.10 times 2,400). At 5%, one surprise spends the reserve. Well above 15%, you have padded the other lines and hidden the real plan. If quotes do not fit, cut a specific category. Do not shrink the buffer to force the total."
  - question: "Should each traveler get a separate travel budget template?"
    answer: "Use one sheet for money you spend together. Add a Who paid column on the log if you need to settle up, and use SUMIFS to total one person's rows for a category. Separate sheets help only when people have separate caps. For a per-person figure, divide the shared cap by the number of people. In the example, $2,400 divided by 2 is $1,200 each."
  - question: "What if my quotes are higher than the cap in the template?"
    answer: "Subtract the buffer from the cap first, then compare your quotes with what is left. In the example the cap is $2,400 and the buffer is $240, so categories may total $2,160. The first quotes totaled $2,300, which is $140 over. Dropping checked bags saved $70 (transport went from $760 to $690). Replacing most taxis with transit passes saved another $70 (local transit went from $160 to $90). The category total became $2,160, and $2,160 plus the $240 buffer equals the $2,400 cap."
ctaHeading: "Keep the Actual column on your phone"
ctaBody: "Fill this travel budget template at your desk. On the trip, Travel Stories logs each expense against your budget on an iPhone, offline and with no account, so you can see what is left. Free for one trip. Premium Lifetime is about $1.99 (19 DKK) once, not a subscription."
ctaButton: "Get Travel Stories free"
relatedPackingLists:
  - "carry-on-only-packing-list"
relatedSlugs: ["how-to-budget-for-a-trip", "how-to-plan-a-trip-step-by-step", "travel-checklist-before-leaving"]
draft: false
---

## What belongs in a travel budget template

A travel budget template fails when it only holds one number. Split the trip into six categories before you type a price:

1. **Transport.** Fares to and from the destination, baggage fees, and the transfer between the terminal and the place you are staying.
2. **Accommodation.** The nightly rate plus taxes and fees you can already see in the total.
3. **Food and drink.** Every meal, coffee, and snack, for every day, for every person.
4. **Activities.** Entry fees, tours, and anything you would be sorry to skip.
5. **Local transit.** Passes, local rides, and parking. The long ride to get there belongs in Transport, not here.
6. **Buffer.** About 10-15% of the cap, assigned to nothing. The reason for that range is in [how to budget for a trip](/blog/how-to-budget-for-a-trip/). This page is the grid.

Add a seventh row only for a large prepaid cost that fits nowhere else, such as insurance or a visa. If you insert that row, extend the total formula so the new row is inside the sum.

Three columns do the rest of the work:

| Column | What you put there | The question it answers |
|---|---|---|
| Planned | The amount you are allowing, from a real quote | What did we agree? |
| Actual | What you have spent in that category | What is already gone? |
| Left | Planned minus Actual | What is still available? |

Use one currency for the whole sheet. This example uses US dollars. When a price arrives in another currency, convert it with one rate, write that rate in Notes, and enter dollars. Mixed currencies make the total meaningless.

## Copy this blank travel budget template

Two downloads, same categories. The [CSV](/downloads/travel-budget-template.csv) is for Google Sheets. The [PDF](/downloads/travel-budget-template.pdf) is the one-page paper version.

**Budget tab**

| Category | Planned | Actual | Left | Notes |
|---|---|---|---|---|
| Transport | | | | |
| Accommodation | | | | |
| Food and drink | | | | |
| Activities | | | | |
| Local transit | | | | |
| Buffer | | | | |
| TOTAL | | | | |

**Log tab.** One row every time money leaves.

| Date | Category | Amount | Note | Who paid |
|---|---|---|---|---|
| | | | | |

The category on the log has to be identical to the category on the budget, including spaces. `Food and drink` matches. `Food` does not, and the Actual cell will stay at zero while the money is gone.

## How do you build the travel budget template in Google Sheets?

1. Create a spreadsheet and rename the first tab `Budget`.
2. Add a second tab named exactly `Log`.
3. On Budget, row 1 is the header: Category, Planned, Actual, Left, Notes. Put the six category names in A2:A7 and `TOTAL` in A8.
4. On Log, row 1 is Date, Category, Amount, Note, Who paid. Amounts go in column C. Categories go in column B.
5. In Budget cell C2, the Actual for Transport, paste this formula. [SUMIF](https://support.google.com/docs/answer/3093583) adds column C on the log only where column B matches the category in A2:

```
=SUMIF(Log!B:B,A2,Log!C:C)
```

6. In D2, Left is Planned minus Actual:

```
=B2-C2
```

7. Fill C2 and D2 down through row 7.
8. Row 8 holds the totals:

```
=SUM(B2:B7)
=SUM(C2:C7)
=B8-C8
```

The CSV already has those formulas in the Actual and Left columns. In Google Sheets choose **File → Import → Upload**, then import as a new spreadsheet. Add the Log tab yourself. The tab must be named `Log`, or SUMIF has nothing to read and shows an error. If a formula lands as plain text, click the cell and press Enter so Sheets runs it.

SUMIF checks text exactly. After your first logged purchase, if Actual is still 0, compare the spelling on the two tabs before you change the formula.

For a shared trip, this second formula totals one person's rows. It keeps a log row only when the category matches and Who paid matches the name:

```
=SUMIFS(Log!C:C,Log!B:B,A2,Log!E:E,"Alex")
```

Change `Alex` to the name you actually type in column E.

## How do you print the travel budget template as a PDF?

The [blank PDF](/downloads/travel-budget-template.pdf) is one page: a line for the cap, the six categories, and a short daily log. Print it and use a pencil if you will not carry a laptop.

If the paper should show your numbers, fill Planned in Google Sheets first, then choose **File → Download → PDF Document**. Paper does not recalculate. Each evening, add the day's purchases to the log and write the new Actual and Left on the printout, or type them into the Log tab the next time you open the sheet. Either way, Left has to be visible before the next day starts.

## A worked example: fitting a trip into $2,400

Two adults, seven nights, eight days. One shared cap of **$2,400**. One sheet, in US dollars. No separate sheet per person.

The buffer is 10% of the cap, and it stays unassigned:

```
0.10 × 2,400 = 240
```

The buffer row is **$240**. Every other category together has to fit in the rest:

```
2,400 − 240 = 2,160
```

### First quotes, before any cuts

**Transport is $760.**

```
2 × 310 = 620    two fares
2 × 35  = 70     two checked bags
70               transfers at both ends
620 + 70 + 70 = 760
```

**Accommodation is $700.**

```
7 × 100 = 700
```

The $100 is the full nightly price, taxes included, so the last morning does not add a fee you never planned.

**Food and drink is $480.**

```
8 × 60 = 480
```

That $60 is the couple's day, which is $30 each (`60 / 2 = 30`). One way to split the $60:

```
10 + 18 + 26 + 6 = 60
```

Breakfast $10, lunch $18, dinner $26, snacks $6.

**Activities are $200.**

```
16 × 2 = 32    first museum
14 × 2 = 28    second museum
22 × 2 = 44    a walking tour
48 × 2 = 96    a day outing
32 + 28 = 60
60 + 44 = 104
104 + 96 = 200
```

**Local transit is $160.**

```
4 × 40 = 160
```

That is four taxi rides and no pass.

**Add the categories.**

```
760 + 700 = 1,460
1,460 + 480 = 1,940
1,940 + 200 = 2,140
2,140 + 160 = 2,300
```

The quotes total **$2,300**. The room for categories is **$2,160**.

```
2,300 − 2,160 = 140
```

The first pass is **$140 over**. Counting the buffer does not change the gap:

```
2,300 + 240 = 2,540
2,540 − 2,400 = 140
```

Same $140. Do not "fix" it by cutting the buffer from $240 to $100. The quotes are still $140 too high. You have only made the reserve look smaller.

### Two cuts that land on $2,400

**Cut 1: drop the checked bags. Save $70.**

A [carry-on only packing list](/packing-list/carry-on-only-packing-list/) is what makes the cut real, because the bags were the fee. Transport becomes:

```
760 − 70 = 690
```

Still over by:

```
140 − 70 = 70
```

**Cut 2: keep one taxi and buy passes for the rest. Save $70.**

```
22 × 2 = 44    two weekly passes
46             one taxi left in reserve
44 + 46 = 90
160 − 90 = 70  saved
```

Local transit is now **$90**. The remaining gap is:

```
70 − 70 = 0
```

### The plan that equals the cap

| Category | Planned |
|---|---|
| Transport | $690 |
| Accommodation | $700 |
| Food and drink | $480 |
| Activities | $200 |
| Local transit | $90 |
| Buffer | $240 |
| TOTAL | $2,400 |

Check the category subtotal, then add the buffer back:

```
690 + 700 = 1,390
1,390 + 480 = 1,870
1,870 + 200 = 2,070
2,070 + 90 = 2,160
2,160 + 240 = 2,400
```

Per person, the shared cap is `2,400 / 2 = 1,200`.

The starting percentages did not survive contact with the quotes, and they should not. Transport is `690 / 2,400 = 0.2875`, or **28.75%** of the cap, not the 30% guess. Accommodation is `700 / 2,400`, a bit over **29%**, not the 25% guess. The rule of thumb only exists to get the first numbers onto the page. The quotes are the plan.

### Day 3: food is $15 ahead of pace

Food is $480 across eight days:

```
480 / 8 = 60
```

The log after three days, category typed exactly as `Food and drink`:

| Day | Amount |
|---|---|
| 1 | $58 |
| 2 | $72 |
| 3 | $65 |

```
58 + 72 = 130
130 + 65 = 195
```

SUMIF returns **195**. Three days at the planned pace would have been:

```
3 × 60 = 180
195 − 180 = 15
```

Food is **$15 over pace**. What is left in the category:

```
480 − 195 = 285
```

Five days are left:

```
285 / 5 = 57
```

The new daily food number is **$57**, which is $3 under the original $60:

```
15 / 5 = 3
60 − 3 = 57
```

You do not spend the buffer to absorb $15. You eat a slightly smaller dinner. If a later day goes past $57, you either move money out of Activities on purpose or log the extra with the category `Buffer`, so Left on the buffer row falls in the open.

Card fees belong in the same habit. A foreign transaction fee is money your card issuer adds when a purchase is in another currency, happens outside the United States, or goes to a foreign merchant. The Consumer Financial Protection Bureau defines that charge as a finance charge in [Regulation Z](https://www.consumerfinance.gov/rules-policy/regulations/1026/4). At 3%:

```
0.03 × 100 = 3
```

A $100 purchase costs $103. On $1,000 of card spending, `0.03 × 1,000 = 30`, so the fee is **$30**. Put that estimate in the category you will actually charge, or leave it inside the buffer on purpose. This example is in US dollars for a card that prices the fee that way. If your card is issued somewhere else, read that card's fee and convert it into the currency of the sheet before you type it.

## Keep the Actual column current while you are away

Write each amount the day it happens. You will not rebuild Tuesday from memory on Friday, and the $15 food gap is invisible if you only see it at home.

The pencil log on the PDF is enough when you will use the pencil. The Log tab is enough when you will open it.

If what you have with you is your phone, [Travel Stories](https://apps.apple.com/app/id6756801168?ct=blog-travel-budget-template&mt=8) lets you set a budget for the trip and log each expense against it on an iPhone, offline, with no account. The free download includes expense tracking for one trip. Premium Lifetime is about $1.99 (19 DKK) once, not a subscription.

## Where a travel budget template usually goes wrong

- **One total and no rows.** $2,400 with no categories cannot tell you that food is the line that slipped.
- **A buffer you already spent in your head.** If the $240 is secretly the expensive dinner, you do not have a buffer. You have a seventh category with a vague name.
- **Names that do not match.** `Transit` on the log and `Local transit` on the budget. SUMIF returns 0. The purchase was real. The sheet disagrees.
- **Prepaid costs left off.** Insurance, a visa, an eSIM, bags you paid when you bought the fare. Enter them in the right category when you pay, or the trip looks cheaper than it is.
- **A new currency on every row.** Convert first, write the rate in Notes, then enter one currency.

Set the cap when you [plan the trip step by step](/blog/how-to-plan-a-trip-step-by-step/), and look at Left again during the week you [run through the list before you leave](/blog/travel-checklist-before-leaving/). The template is finished when every category has a Planned number, the total equals the cap, and you know which version — sheet, PDF, or both — you will update on day two.
