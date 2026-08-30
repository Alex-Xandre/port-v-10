"use client";

import { useEffect, useRef } from "react";


const FRAMES = {
  E: [
    [-3, 0],
    [-3, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  idle: [[-3, -3]],
} as const;

const SPEED = 8; 
const TICK = 150; 
const EDGE_REST = 12; 

export default function FooterCat() {
  const catRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cat = catRef.current;
    const track = trackRef.current;
    if (!cat || !track) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {

      cat.style.right = "24px";
      cat.style.backgroundPosition = "-96px -96px"; 
      return;
    }

    let x = -32;
    let dir: 1 | -1 = 1;
    let frame = 0;
    let resting = 0;

    const id = setInterval(() => {
      const max = track.clientWidth - 32;

      if (resting > 0) {
        resting--;
        const [fx, fy] = FRAMES.idle[0];
        cat.style.backgroundPosition = `${fx * 32}px ${fy * 32}px`;
        if (resting === 0) dir = dir === 1 ? -1 : 1;
        return;
      }

      x += SPEED * dir;
      if (x >= max) {
        x = max;
        resting = EDGE_REST;
      } else if (x <= 0) {
        x = 0;
        resting = EDGE_REST;
      }

      frame = (frame + 1) % 2;
      const set = dir === 1 ? FRAMES.E : FRAMES.W;
      const [fx, fy] = set[frame];
      cat.style.backgroundPosition = `${fx * 32}px ${fy * 32}px`;
      cat.style.transform = `translateX(${x}px)`;
    }, TICK);

    return () => clearInterval(id);
  }, []);

  return (
    <div
      ref={trackRef}
      className="pointer-events-none relative h-8 w-full overflow-hidden -mt-5 lg:-mt-10 "
      aria-hidden="true"
    >
      <div
        ref={catRef}
        className="absolute bottom-0 h-8 w-8"
        style={{
          backgroundImage: "url(/oneko.gif)",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}