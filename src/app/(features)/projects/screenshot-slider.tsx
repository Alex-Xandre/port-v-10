"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  name: string;
  host?: string;
  labels?: string[];
};

const pad = (n: number) => String(n).padStart(2, "0");

export function ScreenshotSlider({ images, name, host, labels }: Props) {
  const [index, setIndex] = useState(0);
  if (images.length === 0) return null;

  const count = images.length;
  const many = count > 1;
  const go = (i: number) => setIndex((i + count) % count);
  const label = (i: number) => labels?.[i] ?? `screen-${pad(i + 1)}.png`;

  return (
    <figure className="w-full">
      <div className="border border-border bg-secondary-background">
        {/* title bar: dots · tabs · host · counter */}
        <div className="flex items-stretch gap-3 border-b border-border px-3.5">
          <span className="flex items-center gap-1.5 py-3" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-negative/70" />
            <span className="h-2 w-2 rounded-full bg-accent/70" />
            <span className="h-2 w-2 rounded-full bg-positive/70" />
          </span>

          <div className="flex min-w-0 flex-1 overflow-x-auto pl-2">
            {many &&
              images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => go(i)}
                  aria-pressed={i === index}
                  className={[
                    "min-h-11 shrink-0 border-b-2 px-3.5 text-[12px] transition-colors",
                    i === index
                      ? "border-accent bg-background text-text-primary"
                      : "border-transparent text-text-secondary hover:text-text-primary",
                  ].join(" ")}
                >
                  {label(i)}
                </button>
              ))}
          </div>

          {host && (
            <span className="hidden items-center text-[11px] text-text-secondary sm:flex">
              {host}
            </span>
          )}
          {many && (
            <span className="flex items-center text-[11px] tabular-nums text-text-secondary">
              {pad(index + 1)} / {pad(count)}
            </span>
          )}
        </div>

        {/* stage: every image is mounted so switching is instant and cross-fades */}
        <div className="group relative aspect-video overflow-hidden bg-background">
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${name} screenshot ${i + 1} of ${count}`}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 976px, 100vw"
              aria-hidden={i !== index}
              className={[
                "object-cover object-left-top brightness-[0.8] transition-[opacity,filter] duration-300 group-hover:brightness-100",
                i === index ? "opacity-100" : "opacity-0",
              ].join(" ")}
            />
          ))}

          {many && (
            <>
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous screenshot"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-border bg-background/80 text-text-primary transition-colors hover:border-secondary-border hover:text-accent"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next screenshot"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-border bg-background/80 text-text-primary transition-colors hover:border-secondary-border hover:text-accent"
              >
                <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            </>
          )}
        </div>
      </div>

      {many && (
        <div className="mt-3 flex flex-wrap gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show ${label(i)}`}
              aria-pressed={i === index}
              className={[
                "relative aspect-video w-32 overflow-hidden border bg-secondary-background transition-colors",
                i === index
                  ? "border-accent"
                  : "border-border hover:border-secondary-border",
              ].join(" ")}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="128px"
                className={[
                  "object-cover object-left-top transition-[filter] duration-300",
                  i === index
                    ? "brightness-90"
                    : "brightness-50 hover:brightness-75",
                ].join(" ")}
              />
            </button>
          ))}
        </div>
      )}
    </figure>
  );
}
