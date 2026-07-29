"use client";

import dynamic from "next/dynamic";

// three-globe touches `window` at import time, so the heavy module must be
// loaded client-only. This wrapper is the only thing you import elsewhere.
const GlobeInner = dynamic(
  () => import("./globe-inner").then((m) => m.GlobeInner),
  { ssr: false },
);

export function Globe() {
  return <GlobeInner />;
}
