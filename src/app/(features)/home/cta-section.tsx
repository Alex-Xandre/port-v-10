import { Phone } from "lucide-react";
import { Container } from "@/components/container";
import Button from "@/components/button";

const CALENDLY = "https://calendly.com/xndrmcua22/30min";

export default function HomeCta() {
  return (
    <Container className="h-auto flex-col items-start md:pt-24 pb-16">
      <p className="max-w-xl text-2xl leading-snug text-neutral-900 dark:text-neutral-100 md:text-3xl">
        If you need one engineer who can take a rough idea and ship the whole
        thing, that&apos;s the work I do.
      </p>
      <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
        Thirty minutes, no pitch — tell me what you&apos;re building and
        I&apos;ll tell you whether I&apos;m the right fit.
      </p>
      <div className="mt-6">
        <Button variant="primary" href={CALENDLY} icon={<Phone />}>
          Book a meeting
        </Button>
      </div>
    </Container>
  );
}
