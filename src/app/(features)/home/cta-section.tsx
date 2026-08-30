import { Container } from "@/components/container";
import Button from "@/components/button";

const CALENDLY = "https://calendly.com/xndrmcua22/30min";

export default function HomeCta() {
  return (
    <Container className="flex-col pb-20 pt-16 md:pt-24" animate={false}>
      <p className="text-sm text-accent-muted">
        xandre@sh:~ $ <span className="text-accent">./contact --no-pitch</span>
      </p>

      <p className="mt-6 max-w-xl text-2xl leading-snug text-text-primary md:text-3xl">
        If you need one engineer who can take a rough idea and ship the whole
        thing, that&apos;s the work I do.
      </p>
      <p className="mt-4 max-w-xl font-sans text-sm text-text-secondary">
        Thirty minutes, no pitch — tell me what you&apos;re building and
        I&apos;ll tell you whether I&apos;m the right fit.
      </p>
      <div className="mt-8">
        <Button variant="primary" href={CALENDLY}>
          ./book-meeting --30min
        </Button>
      </div>
    </Container>
  );
}
