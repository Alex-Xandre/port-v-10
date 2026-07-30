"use client";

import { Container } from "@/components/container";
import { SOCIAL_DATA } from "./links";
import { ArrowUpRight, PhoneIcon, SquareArrowOutUpRight } from "lucide-react";
import Button from "@/components/button";
import CurrentlyCard from "./right-section";

export default function Hero() {
  return (
    <Container className="gap-12 md:py-12 flex-col md:flex-row">
      <div className="flex flex-col flex-1">
        <h1 className="text-xl font-bold text-text-primary font-script md:text-5xl">
          Xandre Micua
        </h1>
        <h2 className="mt-4 max-w-2xl text-base text-text-primary/60 md:text-lg">
          Full-stack engineer — 30+ shipped web & mobile apps since 2021.
          Currently going deep on trading systems and on-chain agent tooling.
          <br />
          <br />I turn rough ideas into things people actually use.
        </h2>

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
            // onClick={redirectProject}
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
      {/* <Globe /> */}
      <CurrentlyCard />
    </Container>
  );
}
