const STATS: { label: string; value: string; up?: boolean }[] = [
  { label: "PROJECTS", value: "30+", up: true },
  { label: "SHIPPING SINCE", value: "2021" },
  { label: "CLIENTS", value: "US · EU · ME · AU" },
  { label: "REPLY TIME", value: "<24H", up: true },
  { label: "MEETINGS-TO-PITCH RATIO", value: "1:0" },
  { label: "CURRENT", value: "SR. FULL-STACK @ UPTIC · IAC.AI" },
];

const Row = () => (
  <>
    {STATS.map((s) => (
      <span
        key={s.label}
        className="flex flex-none items-baseline gap-1.5 text-xs text-text-secondary"
      >
        {s.label} <b className="font-medium text-text-primary">{s.value}</b>
        {s.up && <span className="text-positive">▲</span>}
      </span>
    ))}
  </>
);

const Ticker = () => (
  <div
    aria-hidden="true"
    className="overflow-hidden border-t border-border bg-secondary-background"
  >
    <div className="ticker-track flex w-max gap-11 whitespace-nowrap py-2">
      {/* content twice for a seamless -50% loop */}
      <Row />
      <Row />
    </div>
  </div>
);

export default Ticker;
