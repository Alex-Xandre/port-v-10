---
title: "When the payment rails don't reach you"
slug: "manual-payment-verification"
date: "2026-07-29"
tags: ["payments", "philippines"]
excerpt: "Stripe worked fine. The problem was everyone who couldn't use it — and confirming a payment from a screenshot."
---

Stripe was the easy part. I followed the docs, the webhooks arrived, the orders
updated. There is no interesting story in the half that worked.

The interesting half is everyone who couldn't pay that way.

## The gap

Card-first processors are built for markets where most people pay by card. A lot
of my users don't. They pay by GCash, or a bank transfer, and the fees on
small-ticket transactions through an international processor eat a real
percentage of a ₱500 order.

The local answer is PayMongo or Xendit. Both are good. Both also want business
registration, compliance documents, and an onboarding process measured in weeks —
which is fine for a company and hard to justify for a client project that needs
to take payments next month.

So you land where a lot of builds in this country land: bank transfer and GCash,
confirmed by screenshot.

And that's where the engineering problem changes shape.

## Signature to JPEG

A Stripe webhook is signed. You verify it against a secret and you know the event
came from Stripe. Trust is cryptographic and it's someone else's problem.

A GCash receipt is an image a customer uploaded. It could be real. It could be
someone else's receipt. It could be a real receipt with the amount edited in a
photo app, which takes about forty seconds and no skill.

Same business event — "this person paid" — but the confirmation went from a
signed message to a picture, and nothing about it is verifiable by default.

## What I check

Two layers.

First, does the image look untouched. Three checks, cheapest first.

**The status bar.** A real GCash receipt screenshot has a phone status bar across
the top — clock, battery, signal. It's there because someone screenshotted their
phone. Crop the image to hide an edited amount, or export it out of a photo app,
and that strip is usually the first casualty. Looking for it costs almost nothing
and it's the most useful single signal I have.

**Dimensions and crop.** GCash renders the same receipt layout every time, so a
screenshot lands at a predictable size for a given device. An odd aspect ratio, or
a height that doesn't correspond to any plausible screen, means the image was cut
down after the fact.

**Compression.** Re-saving a JPEG after editing recompresses it, and an edited
region often carries different artifacts from the rest of the frame. This is the
weakest of the three. It flags plenty of innocent images that were simply
forwarded through a chat app and recompressed on the way, so it's a reason to look
harder rather than a reason to reject.

Then a check that isn't about the image at all: the name Tesseract reads off the
receipt has to match the account that placed the order. Strictly that's not tamper
detection — but it catches someone submitting a real, unedited receipt that
belongs to a different transaction. Which turned out to be more common than
anybody bothering to forge an amount.

Second, what does it say. Tesseract reads the name and reference number off the
receipt, which works better than OCR usually does because GCash receipts have a
fixed layout — same fonts, same positions, same field labels every time. You're
not reading arbitrary text in the wild, you're reading a form you already know
the shape of.

The reference number is the part that matters. It's the only field on that
screenshot that's supposed to be unique, so it's the only one you can treat as an
identifier. Store it, index it, and a resubmitted receipt collides instead of
paying for a second order.

That's the same problem as a duplicate webhook, arriving through a completely
different door.

## Where it lands

Extracted fields go into the database, not into an inbox for someone to read.
The record is the reference number, the parsed name, the amount, the uploaded
image, and a status. An admin approves or rejects, and the image stays attached
so there's something to point at later when a customer disputes it.

The OCR isn't the decision. It's the thing that makes the decision fast — a human
still approves, they just aren't retyping a reference number off a phone
screenshot.

## My take

Every payment integration tutorial assumes you can use the processor. The
interesting work starts when a meaningful share of your users can't, and the
fallback isn't a worse version of the same thing — it's a different problem with
different failure modes.

Stripe's failure mode is a webhook that doesn't arrive. This one's failure mode is
a receipt that arrives and is a lie.

You can't solve the second one with a better SDK.