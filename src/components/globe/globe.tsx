"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

function Dots() {
  return (
    <div
      className="flex items-center gap-1.5"
      role="status"
      aria-label="Loading globe"
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 dark:bg-neutral-600"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}

const GlobeInner = dynamic(
  () => import("./globe-inner").then((m) => m.GlobeInner),
  { ssr: false },
);

const MIN_LOADER_MS = 400;
const FADE_MS = 900;

export function Globe() {
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let alive = true;
    const start = performance.now();

    import("./globe-inner").then(() => {
      if (!alive) return;
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_LOADER_MS - elapsed);
      setTimeout(() => {
        if (!alive) return;
        setMounted(true);

        requestAnimationFrame(() =>
          requestAnimationFrame(() => alive && setShown(true)),
        );
      }, wait);
    });

    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <div
        className=" flex items-center justify-center transition-opacity ease-out"
        style={{ opacity: shown ? 0 : 1, transitionDuration: `${FADE_MS}ms` }}
        aria-hidden={shown}
      >
        <Dots />
      </div>

      {mounted && <GlobeInner />}
    </>
  );
}
