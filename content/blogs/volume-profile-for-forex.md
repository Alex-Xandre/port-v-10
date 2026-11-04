---
title: "Borrowing futures volume for forex charts"
slug: "volume-profile-for-forex"
date: "2026-11-04"
tags: ["trading"]
excerpt:
  "Spot forex has no real volume. CME futures do — once you invert them, shift them, and flip the delta."
---

A volume profile shows where trading actually happened at each price. The POC
is where the most changed hands, the value area is the band around it, and the
thin spots are where price tends to move fast.

It's a great tool with one problem on forex: there's no volume to profile.

Spot FX has no central exchange. What your broker calls volume is tick volume
— how many times the price changed, at that one broker. A profile built from it
is a profile of quote updates.

So I wrote my own TradingView indicator, Volume Profile Pro. The profile math
is the easy part. The interesting part is where the volume comes from.

## Borrowing the volume

EUR/USD also trades as a futures contract on the CME — 6E — and futures volume
is real: contracts, counted by the exchange. The indicator can pull that volume
onto a spot chart. It takes three corrections to make it line up.

**Some contracts are upside down.** 6E is quoted in dollars per euro, same as
EURUSD. But 6J is dollars per yen — around 0.0066 — while USDJPY is yen per
dollar. So when the chart's base currency is USD, every futures price gets
inverted:

```pine
conv(float p) =>
    float x = p * srcMult
    invertOn ? (x != 0.0 ? 1.0 / x : na) : x
```

**Inverting the price flips the delta.** Buying 6J is buying yen, which is
selling USDJPY. Miss that and the delta theme paints buyers as sellers on every
USD-base pair:

```pine
float d = sc > so ? v : sc < so ? -v : 0.0
d := invertOn ? -d : d
```

**Futures don't trade at spot.** There's a small premium or discount — the
basis — set by the interest rate gap between the two currencies. Plot futures
levels as they are and the POC sits a few pips away from where price actually
reacts. So the indicator tracks spot minus futures, smooths it over 50 bars, and
shifts every level by that amount.

## Where inside the bar the volume went

A bar gives you its volume and its high and low — not where in between the
volume traded. The profile has to guess.

Spreading it evenly across the range is fine on a 1-minute bar. On a 1-hour bar
it smears an hour of trading over the whole range, and the profile goes flat.

So the indicator reads lower-timeframe bars underneath each chart bar — 1-minute
data under a 15-minute chart, 5-minute under an hour — and spreads each small
bar instead. One guard on top: if a single small bar still spans more than 50
price rows, its volume goes to its typical price. A news spike shouldn't paint a
stripe down the whole profile.

## Scalping without rebuilding

Daily and custom sessions — London, New York — build a profile, then close it.
Rolling mode is different: the last N bars, for scalping, so every new bar
pushes the oldest one out.

Rebuilding 120 bars of profile on every bar is wasteful. Instead, each bar's
contribution is stored when it's added and subtracted when it leaves the window.
The price range only gets recomputed when the row that emptied was the top or
the bottom one.

## Working inside TradingView's limits

Pine Script allows 500 boxes and won't draw more than 500 bars past the last
candle. So the histogram is drawn once, on the last bar, and redrawn from
scratch on every update. The gap and width are capped so the right edge never
asks for more room than the chart allows.

Completed sessions stay behind as levels. A POC that price never revisits stays
on the chart as a naked POC until something touches it — then it stops, fades,
and fires an alert.

## My Take

Futures volume isn't all of forex volume. Most FX trades over the counter and
never touches an exchange. But it's real volume from one real venue, which beats
counting price changes at one broker.

Two catches I'd rather state than hide. Real-time CME data on TradingView needs
their data add-on — without it the futures feed runs about ten minutes behind,
which is fine for yesterday's levels and useless for a scalp. And the basis is
smoothed, so on a day it jumps, the levels take a while to catch up.

A tool that tells you where it's wrong is one you can actually use.
