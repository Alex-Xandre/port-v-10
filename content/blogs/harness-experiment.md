---
title: "I wrote my design system as instructions, then had an AI rebuild my site"
date: "2026-08-30"
tags: ["ai", "design", "open-source"]
excerpt: "Not the code — the rules. Then a different portfolio came out the other side, and it was right."
---

I redesigned my portfolio last week. Terminal styling: amber on near-black,
commands as section headers, my career rendered as a `git log`. Somewhere
in the middle of it I stopped writing components and started writing down
why.

That file became `AGENTS.md`. Not documentation of what the code does —
constraints. One accent color. Mono for chrome, sans for reading. Sharp
corners. Every color from a token. Navigation links are always `cd`.
Content images live in window frames, ornament images don't exist. About
forty rules, plus the patterns each page follows and a couple of palette
presets.

Then I did the obvious thing: cloned the repo into an empty folder, gave
an agent the harness and a fake identity — "Sam, backend engineer, use the
green palette" — and asked for the site.

## What came back

The structure was right, which I half expected. Session bar, ticker,
command headers, `drwx——` project rows, the filter flags. That's what the
harness spells out, so transfer there is just careful reading.

The part I didn't expect was the copy. The harness contains no sentences
from my site. It has a rule — dry, specific, first person, never generic
filler — and the generated hero said *the backend is the product*, and
under it, *I build the parts of the product nobody screenshots: queues,
schemas, and the services that keep them honest.* The sample projects had
lines like *the journal is append-only; the reconciler proves both
nightly.*

That isn't my voice copied. It's my rule applied to somebody else's job.

It also made a decision I hadn't thought to specify. My projects page uses
screenshot cards, because my work is client apps and the screenshot is the
evidence. The generated one used plain text rows — because a backend
engineer's projects are queues and CLIs and there is nothing to
photograph. The harness said "cards." The generation was right and the
harness was wrong, so I changed the harness.

## What it got wrong

Dates. The rule was there — build `YYYY-MM` by hand, never
`toLocaleDateString` — and the generated blog index printed
`Thu Jan 08 2026 08:00:00 GMT+0800 (Philippine Standard Time)-undefined`.
Stated once, buried in a bullet, ignored.

Which is the actual lesson. A rule that matters has to be loud, phrased as
the failure it prevents, and sitting where the work happens. The rules
that survived translation were the ones written like warnings. The ones
that read like preferences got treated as preferences.

## Why bother

Because the alternative is that every design decision lives in one
person's head and leaks out one code review at a time. Writing the
constraints down forced me to know which ones were real. Half of what I
thought was taste turned out to be a rule I could state, and the rest
turned out to be habit I couldn't defend.

The repo is public — the harness plus the palettes, [terminal-portfolio](https://github.com/Alex-Xandre/terminal-portfolio).
Point an agent at it and it will build you something related to this site
but not a copy of it, which is the correct outcome. The system transfers.
The jokes shouldn't.