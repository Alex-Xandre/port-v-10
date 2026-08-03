import Link from "next/link";
import { Container } from "@/components/container";

export default function HomeNow() {
  return (
    <Container className="h-auto flex-col ">
      <div className="flex w-full flex-wrap items-baseline justify-between gap-6 border-y border-neutral-200 py-12 dark:border-neutral-800">
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-900 dark:text-neutral-100 inline-flex items-center gap-2">
          {" "}
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="mr-2.5 text-neutral-400 dark:text-neutral-500 inline-fit ">
            Now
          </span>
          Sr. Full Stack Developer at{" "}
          <span className="font-medium">Uptic · IAC.AI</span>
        </p>
        <Link
          href="/experiences"
          className="whitespace-nowrap text-[13px] text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          Full history →
        </Link>
      </div>
    </Container>
  );
}
