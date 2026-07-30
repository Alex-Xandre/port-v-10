---
title: "Automating my trade journal with Python"
slug: "automating-trade-journal"
date: "2026-07-25"
tags: ["trading"]
excerpt:
  "Every fill, pulled into a spreadsheet and tagged by setup — no manual entry."
---

Every trader gets told to journal. Almost nobody keeps it up.

The problem isn't discipline. It's that manual journaling asks you to do data
entry right after a loss — the exact moment you least want to. So you skip a
day, then a week. Now your spreadsheet covers your good stretch and none of your
bad ones.

That's worse than nothing, because you'll draw conclusions from it anyway.

So I wrote a Python script. One command, and every closed trade lands in a
spreadsheet with the context already attached.

## The thing that broke my first version

I assumed one trade equals one row.

It doesn't. MT5 doesn't store trades — it stores **deals**, meaning individual
fills. Scale into a position with two orders, take profit in two pieces, and
that one trade is four deals in the database. They share a `position_id`, but
nothing marks them as one idea.

My first version treated each deal as a trade. It reported roughly double my
trade count, and a badly wrong win rate — the scale-in fills all showed zero
profit, so they got counted as scratches.

The fix is grouping by `position_id`, then splitting on the `entry` field: `0`
opens or adds, `1` closes or reduces.

```python
for position_id, group in deals.groupby("position_id"):
    opens = group[group["entry"] == 0]
    closes = group[group["entry"] == 1]
```

Once you're grouping, entry price stops being obvious too. Two fills at 2310.5
and 2311.5 means your entry is 2311.0 — not 2310.5, which is what you get
reading the first fill. So prices are volume-weighted.

## Open positions will wreck your stats

If you pull the last 30 days, some positions in that window are still open. They
have an opening deal and no closing deal.

Group them naively and you get a trade with a real entry, no exit, and zero P&L
— which lands in the sheet as a flat loss. Every open position quietly drags
your win rate down.

```python
if opens.empty or closes.empty:
    continue
```

Two lines. Same check catches the reverse: positions you closed inside the
window but opened before it.

## The automation isn't the point

Pulling the data is plumbing. The labels are the product.

For each trade the script derives session, hold-time bucket, asset class, and
outcome. That's what turns a flat list into something you can pivot on — and a
pivot table is a mirror:

- Am I actually better in London, or does it just feel that way?
- Do my scalps make money, or do a few swings carry them?
- Is gold my edge or my ego?

None of those are answerable from a list of trades. All of them are answerable
from a list of _labelled_ trades.

## My Take

The script removes the excuse. It doesn't do the work.

It still only sees what I did, never why — no note on the setup, no record of
what I was thinking. Those are the fields that make a journal actually useful,
and they're the ones that can't be automated.

Which is probably the honest lesson. Automate the bookkeeping so you have no
reason left to skip the thinking.
