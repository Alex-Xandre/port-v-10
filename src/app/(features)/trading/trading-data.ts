import type { IconType } from "react-icons";
import {
  CandlestickChart,
  LineChart,
  Trophy,
  type LucideIcon,
} from "lucide-react";

export type TradingPlatform = {
  name: string;
  note: string;
  group: "Forex" | "Crypto" | "Prop";
  icon?: IconType | LucideIcon;
};

// fallback glyph per group for platforms without a brand icon
export const GROUP_ICONS: Record<TradingPlatform["group"], LucideIcon> = {
  Forex: CandlestickChart,
  Crypto: LineChart,
  Prop: Trophy,
};

export const PLATFORMS: TradingPlatform[] = [
  {
    name: "XM Global",
    note: "main forex broker",
    group: "Forex",
  },
  {
    name: "Dupoin",
    note: "secondary account",
    group: "Forex",
  },
  {
    name: "OKX",
    note: "spot + futures",
    group: "Crypto",
  },
  {
    name: "Bitget",
    note: "copy trading experiments",
    group: "Crypto",
  },
  {
    name: "The5ers",
    note: "funded account",
    group: "Prop",
  },
];

export const SETUP = [
  { k: "Markets", v: "Forex majors · NQ · Gold · Oil · BTC, ETH" },
  { k: "Style", v: "Day trades, some swing, some scalp" },
  { k: "Edge", v: "Journaling + custom automation" },
];

export const BUILT = [
  {
    name: "Journal automation",
    desc: "Python script that pulls fills into a spreadsheet and tags setups automatically.",
  },
  {
    name: "Alert relay",
    desc: "TradingView webhooks piped to Telegram with position-size math included.",
  },
];
