---
title: "One app, many academies: walling off data in Postgres"
slug: "building-steadly"
date: "2026-11-04"
tags: ["trading", "engineering"]
excerpt:
  "Steadly runs many trading academies on one database. The database, not the app, decides who sees what."
---

Steadly is a platform for trading academies. A mentor gets their own academy —
their brand color, their subdomain, their courses — and their students journal
trades, check them against prop firm rules, and send them in for review.

One app, one database, many academies. Which means the most important feature
is one nobody sees: a student in one academy must never see a single row from
another.

The usual way to do that is a `where academy_id = ?` on every query. That works
until the one query where someone forgets it. So in Steadly, the app doesn't get
a vote. Postgres row-level security does.

## The policies that enforced nothing

Supabase makes row-level security easy to turn on. What it doesn't make obvious
is that the server talks to Postgres through the pooler, as a role that skips
RLS entirely.

So you can write every policy correctly, enable them all, and have them protect
nothing.

The fix: every query runs through one helper, `asActor`. It sets who the user is
and switches to the `authenticated` role — for that transaction only. In SQL
terms, each transaction opens with something like:

```sql
select
  set_config('request.jwt.claims', '{"sub":"<user id>"}', true),
  set_config('role', 'authenticated', true);
```

The `true` makes both settings local to the transaction, so they can't leak into
the next request on the same pooled connection. And it's one statement, not
two, because from the Philippines every round trip to the database in Seoul
costs about 70 ms.

## Rules the app can't forget

Once the policies actually apply, they can carry rules the app would otherwise
have to remember everywhere:

- **Removed means removed.** Every policy checks that the person's membership is
  active. Remove a student and their access ends on every screen at once. The
  membership row stays, because deleting it would orphan their trades and
  comments.
- **No pointing across academies.** A trade reaches its account through
  `(account, academy, user)`, not just an account id. Even if the app sends a
  wrong id, a trade can't land on someone else's account.
- **Seat limits live in a trigger.** A plan's seat count is checked by the
  database, not the app. Invite link, approval or restore — no path gets past
  it, and when seats are full, people wait instead of getting an error.
- **Only a mentor can mark a trade reviewed.** A trigger sets it when a mentor
  comments, so a student can't review their own trade.

## Links get forwarded

Invite links end up in Discord. That's not a bug report, it's a fact about
trading communities.

So approval is on by default: anyone with a link can ask to join, and a mentor
approves them. A forwarded link creates a request, never access. Only a hash of
each code is stored, so a database leak doesn't hand out working links.

Mentor invites are stricter — one use, seven days — because a mentor sees every
student's trades.

## The command that deletes your security

`drizzle-kit push` is the fast way to sync a schema. It also drops RLS policies.

So Steadly never pushes. Drizzle generates the SQL, the RLS policies are written
by hand as custom migrations, and every database gets the same reviewed SQL.

And because a bug here leaks students' data, the policies have their own test
suite — 544 checks — plus app tests that run as real users. Always against a
throwaway database, never production.

## My Take

In a multi-tenant app, the database is the only layer that can't be skipped.
App code changes every week. A policy doesn't forget.

The other security decision was about scope, not code. The MVP imports trades
from CSV only — no exchange API sync — so there are no exchange keys to store,
leak or rotate. Steadly is education only, and it never places a trade.

The safest data is the data you never ask for.
