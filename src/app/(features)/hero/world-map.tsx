"use client";

import { CLIENT_ARCS } from "@/app/data/client-arcs";
import { WorldMap } from "@/components/world-map";

export function Globe() {
  const routes = CLIENT_ARCS.map((a) => ({
    start: { lat: a.startLat, lng: a.startLng },
    end: { lat: a.endLat, lng: a.endLng },
  }));

  return (
    <div className=" py-20 dark:bg-black bg-white w-full">
      <WorldMap dots={routes} />
      <p className="mt-2 text-center text-sm text-text-primary/60">
        Clients in the US, Europe, the Middle East and Australia
      </p>
    </div>
  );
}
