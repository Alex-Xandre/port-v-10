"use client";

import { Container } from "@/components/container";
import { SOCIAL_DATA } from "./links";
import { ArrowUpRight, PhoneIcon, SquareArrowOutUpRight } from "lucide-react";
import Button from "@/components/button";
import { Globe } from "@/components/globe/globe";

export default function Hero() {
  return (
    <Container className="gap-12 py-12 flex-col lg:flex-row md:items-center bg-background">
      <div className="flex flex-col flex-1">
        <h1 className="max-w-xl text-2xl leading-snug text-neutral-900 dark:text-neutral-100 md:text-3xl italic">
          Xandre Micua
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-text-primary md:text-lg">
          30-odd web and mobile apps since 2021, usually as the only engineer on
          the thing. Lately I build trading tooling that runs without me
          watching it.
        </p>

        <p className="mt-4 flex items-center gap-2 text-sm text-text-primary/60">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Open to freelance — I reply inside a day.
        </p>

        <div className="mt-6 flex items-center gap-4">
          {SOCIAL_DATA.map((x, index: number) => (
            <a
              key={index}
              href={x.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-0.5 text-sm text-text-primary/60 transition-colors hover:text-text-primary"
            >
              {x.name}
              <ArrowUpRight
                size={14}
                className="opacity-0 transition-opacity group-hover:opacity-100"
              />
            </a>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-start gap-3">
          <Button
            variant="primary"
            href="/projects"
            icon={<SquareArrowOutUpRight />}
          >
            Browse projects
          </Button>
          <Button
            href="https://calendly.com/xndrmcua22/30min"
            icon={<PhoneIcon />}
          >
            Book a meeting
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center">
        <div className="relative h-70 w-full max-w-105 md:h-100">
          <Globe />
        </div>
        <p className="mt-2 text-center text-sm text-text-primary/60">
          Clients in Europe, US and other parts of the world
        </p>
      </div>
    </Container>
  );
}
