---
title: "I wrote down my design system, then checked whether it survived being read"
date: "2026-08-30"
tags: ["ai", "design", "open-source"]
excerpt: "I built the site by hand. The interesting part was writing the rules down afterwards, and finding out they transfer."
---

I rebuilt this portfolio by hand last week. Terminal styling: amber on
near-black, commands as section headers, my career rendered as a
`git log`. Every component written and argued with one at a time, the
normal way.

Then I wanted to open-source it, and hit the problem every template has.
Handing someone the code hands them my decisions without the reasons. They
get a working site and no idea which parts are load-bearing — so the first
fork adds a logo grid and a light mode and the thing quietly stops being a
design.

So instead of writing documentation, I wrote the constraints. That file
became `AGENTS.md`. One accent color. Mono for chrome, sans for reading.
Sharp corners. Every color from a token. Navigation links are always `cd`.
Content images live in window frames, ornament images don't exist. About
forty rules, plus the pattern each page follows and a few palette presets.

Then the obvious question: does any of it actually transfer, or did I just
describe my own site to myself? Only one way to find out. Empty folder,
the harness, a fake identity — "Sam, backend engineer, use the green
palette" — and an agent.

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

Because writing the constraints down forced me to know which ones were
real. Half of what I thought was taste turned out to be a rule I could
state in one sentence. The rest turned out to be habit I couldn't defend,
and some of it I dropped.

The repo is public — the harness plus the palettes,
[terminal-portfolio](https://github.com/Alex-Xandre/terminal-portfolio).
Point an agent at it and it builds something related to this site but not
a copy of it, which is the correct outcome. The system transfers. The
jokes shouldn't.