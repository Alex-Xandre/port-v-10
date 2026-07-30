export default function Highlights({ isHome }: { isHome?: boolean }) {
  const stats = [
    { k: "5+", v: "years coding" },
    { k: "10+", v: "countries" },
    { k: "30+", v: "projects shipped" },
    ...(isHome
      ? [
          { k: "850+", v: "commits this year" },
          { k: "<1 day", v: "reply time" },
        ]
      : []),
  ];

  return (
    <dl
      className={`grid w-full gap-3 ${
        isHome
          ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
          : "max-w-md grid-cols-3"
      }`}
    >
      {stats.map(({ k, v }, i) => (
        <div
          key={v}
          className={`rounded-xl border border-neutral-200 px-4 py-5 text-center dark:border-neutral-800 ${
            isHome && i === stats.length - 1 ? "col-span-2 sm:col-span-1" : ""
          }`}
        >
          <dt className="text-2xl font-medium tabular-nums text-neutral-900 dark:text-neutral-100">
            {k}
          </dt>
          <dd className="mt-1 text-xs leading-tight text-neutral-600 dark:text-neutral-400">
            {v}
          </dd>
        </div>
      ))}
    </dl>
  );
}