// src/app/(features)/trading/trading-data.ts
import type { IconType } from "react-icons";
import { SiOkx } from "react-icons/si";
import {
  CandlestickChart,
  LineChart,
  Trophy,
  type LucideIcon,
} from "lucide-react";

export type TradingPlatform = {
  name: string;
  href: string;
  code?: string;
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
    href: "https://www.xmglobal.com/referral?token=TnLo7OYMFjcLUiudhcxpLw",
    note: "main forex broker",
    group: "Forex",
  },
  {
    name: "Dupoin",
    href: "https://dupoin.me/mdvstr5c8",
    note: "secondary account",
    group: "Forex",
  },
  {
    name: "OKX",
    href: "https://okx.ac/join/92239010",
    code: "92239010",
    note: "spot + futures",
    group: "Crypto",
  },
  {
    name: "Bitget",
    href: "https://www.bitget.com/referral/register?clacCode=NQPFY7LN&from=%2Fevents%2Freferral-all-program&source=events&utmSource=PremierInviter",
    note: "copy trading experiments",
    group: "Crypto",
  },
  {
    name: "The5ers",
    href: "https://www.the5ers.com/?afmc=1dxl",
    code: "7P5SL9E",
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
    desc: "Node script that pulls fills into a spreadsheet and tags setups automatically.",
  },
  {
    name: "Alert relay",
    desc: "TradingView webhooks piped to Telegram with position-size math included.",
  },
];
