import { Position } from "../types";

export const ARC_COLORS = ["#ffffff", "#d4d4d4", "#a3a3a3"];
const HUB = { lat: 14.5995, lng: 120.9842 };
export const CLIENT_ARCS: Position[] = [
  {
    order: 1,
    startLat: HUB.lat,
    startLng: HUB.lng,
    endLat: 37.7749,
    endLng: -122.4194,
    arcAlt: 0.5,
    color: ARC_COLORS[0],
  },
  {
    order: 2,
    startLat: HUB.lat,
    startLng: HUB.lng,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.4,
    color: ARC_COLORS[0],
  },
  {
    order: 3,
    startLat: HUB.lat,
    startLng: HUB.lng,
    endLat: 52.3676,
    endLng: 4.9041,
    arcAlt: 0.3,
    color: ARC_COLORS[0],
  },
  {
    order: 4,
    startLat: HUB.lat,
    startLng: HUB.lng,
    endLat: 24.7136,
    endLng: 46.6753,
    arcAlt: 0.2,
    color: ARC_COLORS[0],
  },
  {
    order: 5,
    startLat: HUB.lat,
    startLng: HUB.lng,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.3,
    color: ARC_COLORS[0],
  },
];
