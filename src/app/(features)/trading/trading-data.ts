export type TradingPlatform = {
  name: string;
  note: string;
  group: "Forex" | "Crypto" | "Prop";
};

export const PLATFORMS: TradingPlatform[] = [
  { name: "XM Global", note: "main forex broker", group: "Forex" },
  { name: "Dupoin", note: "secondary account", group: "Forex" },
  { name: "OKX", note: "spot + futures", group: "Crypto" },
  { name: "Bitget", note: "copy trading experiments", group: "Crypto" },
  { name: "The5ers", note: "funded account", group: "Prop" },
];

export const SETUP = [
  { k: "Markets", v: "Forex majors · NQ · Gold · Oil · BTC, ETH" },
  { k: "Style", v: "Day trades, some swing, some scalp" },
  { k: "Edge", v: "Journaling + custom automation" },
];

export const BUILT = [
  {
    name: "Steadly",
    liveUrl: "https://steadly.vercel.app/",
    desc: "A white-label platform for trading academies: mentors run courses and review trades, and students track their prop firm rules and journal every trade.",
  },
  {
    name: "Position Size Calculator",
    desc: "Chrome side-panel extension that sizes a trade from risk and stop, warns before a loss would breach the daily cap, and journals it to Google Sheets.",
  },
  {
    name: "Volume Profile Pro",
    desc: "TradingView indicator with a live session profile, draggable ranges, naked POCs, and CME futures volume mapped onto forex charts.",
  },
  {
    name: "Journal automation",
    desc: "Python script that pulls fills into a spreadsheet and tags setups automatically.",
  },
  {
    name: "Alert relay",
    desc: "TradingView webhooks piped to Telegram with position-size math included.",
  },
];