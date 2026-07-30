---
title: "Why I keep picking the same stack"
slug: "why-i-keep-picking-the-same-stack"
date: "2026-07-30"
tags: ["stack", "freelance"]
excerpt: "Node and Mongo on almost everything — and the project where that was the wrong call."
---

Look at my projects page and you'll see the same four things over and over. Node,
Express, MongoDB, React.

That looks like someone who knows one stack. It's closer to someone who knows what
client work actually costs.

## Fast beats interesting

On a fixed-price build, the expensive thing is not the code. It's the hours you
spend deciding, or debugging something you've never debugged before, or reading
docs at 11pm because you picked a tool you'd only read about.

I'm fast in Node and Express. Not "I could learn it" fast — I know where things go,
I know what breaks, I know what the error means before I finish reading it. On a
two-month project that's worth more than any advantage a better-suited framework
would give me.

Choosing the interesting tool is a cost you pay in weeks and bill for in nothing.

## Frontend: one real decision

The frontend choice is the one place I actually decide rather than default.

**Next.js** when the app is substantial — routing, multiple roles, anything that
needs server rendering or real SEO. The structure it imposes pays for itself once
there's enough of an app for structure to matter.

**Vite** when it's small. Landing pages, single-purpose tools, anything that's one
or two screens. Next on a landing page is a build system and a mental model you
don't need, in exchange for nothing.

The dividing line isn't complexity exactly — it's whether the thing has *routes*.
If there's meaningfully more than one page and users move between them with state
that has to survive, Next. If it's a page, Vite.

## Where Mongo is the wrong answer

MongoDB is a good default for the projects I usually take. Document-shaped data, one
or two main collections, a schema still moving while the client changes their mind.

It stops being the right answer when the data is genuinely relational — lots of
tables, all referencing each other, and questions that need to join across most of
them.

That happened on a CRM. Consolidating client software, agreements and subscriptions
into one view meant many entities with real relationships between them, and the
reporting queries wanted joins across nearly all of it. Modelling that in documents
means either duplicating data everywhere and keeping the copies in sync yourself, or
doing the joins in application code.

Both are worse than just using Postgres. So we used Postgres.

That's not Mongo being bad. It's Mongo being asked to do the one thing a relational
database exists for.

## My take

Having a default is not a weakness. Having a default you can't argue against is.

The useful question isn't "what's the best stack" — it's "do I know the shape of
project where my default is wrong?" If you can name that case, the repetition on
your projects page is a decision. If you can't, it's a habit.