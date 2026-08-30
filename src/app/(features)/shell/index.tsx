"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { COMMANDS, runCommand, type OutLine } from "./shell-commands";
import { applyPalette } from "@/lib/palletes";

type Entry = { kind: "cmd"; text: string } | { kind: "out"; line: OutLine };

const TONE: Record<NonNullable<OutLine["tone"]>, string> = {
  default: "text-text-primary",
  dim: "text-text-secondary",
  muted: "text-accent-muted",
  error: "text-negative",
  ok: "text-positive",
  sans: "font-sans text-text-secondary",
};

const BOOT: Entry[] = [
  {
    kind: "out",
    line: { text: "GNU bash, xandre-portfolio 1.0", tone: "dim" },
  },
  {
    kind: "out",
    line: { text: "Last login: today from a browser near you", tone: "dim" },
  },
  { kind: "out", line: { text: "type help to get started", tone: "dim" } },
];

export default function Shell() {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<Entry[]>(BOOT);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const close = useCallback(() => {
    setOpen(false);
    setValue("");
  }, []);

  // global hotkeys: "/" opens, Escape closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const typing =
        el instanceof HTMLElement &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  // focus input and pin scroll when opened / on new output
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [entries]);

  const submit = () => {
    const raw = value;
    const result = runCommand(raw);

    if (raw.trim()) {
      setHistory((h) => [raw, ...h]);
      setHIdx(-1);
    }

    if (result.clear) {
      setEntries([]);
    } else {
      setEntries((e) => [
        ...e,
        { kind: "cmd", text: raw },
        ...result.lines.map((line) => ({ kind: "out" as const, line })),
      ]);
    }

    setValue("");

    if (result.close) close();
    if (result.theme) applyPalette(result.theme);
    if (result.navigate) {
      const to = result.navigate;
      setTimeout(() => {
        close();
        router.push(to);
      }, 450);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
    if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(value) && c !== value);
      if (match) setValue(match);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hIdx < history.length - 1) {
        const next = hIdx + 1;
        setHIdx(next);
        setValue(history[next]);
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx > 0) {
        const next = hIdx - 1;
        setHIdx(next);
        setValue(history[next]);
      } else {
        setHIdx(-1);
        setValue("");
      }
    }
  };

  const ghost = (() => {
    if (!value) return "";
    const m = COMMANDS.find((c) => c.startsWith(value) && c !== value);
    return m ? m.slice(value.length) : "";
  })();

  useEffect(() => {
    const openShell = () => setOpen(true);
    window.addEventListener("open-shell", openShell);
    return () => window.removeEventListener("open-shell", openShell);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open interactive shell"
        className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 border border-accent bg-background px-3 py-2 font-mono text-xs text-accent transition-all hover:bg-accent hover:text-background hover:[box-shadow:var(--glow-accent)]"
      >
        ▮ open shell
        <kbd className="border border-current px-1 text-[10px] opacity-70">
          /
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 backdrop-blur-[2px] md:items-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            role="dialog"
            aria-label="Interactive shell"
            className="flex max-h-[80vh] w-full max-w-2xl flex-col border border-secondary-border bg-secondary-background"
          >
            <div className="flex flex-none items-center gap-2 border-b border-border px-3 py-2 text-[11px] text-text-secondary">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-negative/70" />
                <span className="h-2 w-2 rounded-full bg-accent/70" />
                <span className="h-2 w-2 rounded-full bg-positive/70" />
              </span>
              <span className="mx-auto">xandre@sh — bash</span>
              <button
                onClick={close}
                className="border border-border px-1.5 text-[10px] transition-colors hover:border-accent-muted hover:text-accent"
              >
                esc
              </button>
            </div>

            <div ref={bodyRef} className="flex-1 overflow-y-auto p-3.5 text-sm">
              {entries.map((entry, i) =>
                entry.kind === "cmd" ? (
                  <p key={i} className="mt-2 leading-7">
                    <span className="text-accent-muted">$</span>{" "}
                    <span className="text-accent">{entry.text}</span>
                  </p>
                ) : entry.line.href ? (
                  <p key={i} className="whitespace-pre-wrap leading-7">
                    <a
                      href={entry.line.href}
                      target={
                        entry.line.href.startsWith("http")
                          ? "_blank"
                          : undefined
                      }
                      rel="noopener noreferrer"
                      className={`${TONE[entry.line.tone ?? "default"]} underline decoration-dotted underline-offset-2 hover:text-accent`}
                    >
                      {entry.line.text}
                    </a>
                  </p>
                ) : (
                  <p
                    key={i}
                    className={`whitespace-pre-wrap leading-7 ${TONE[entry.line.tone ?? "default"]}`}
                  >
                    {entry.line.text}
                  </p>
                ),
              )}
            </div>

            <div
              className="flex flex-none items-center gap-2 border-t border-border px-3.5 py-2.5"
              onClick={() => inputRef.current?.focus()}
            >
              <span className="flex-none text-accent-muted">xandre@sh:~ $</span>
              <span className="relative flex flex-1 items-center">
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="command"
                  className="relative z-10 w-full bg-transparent font-mono text-sm text-text-primary caret-transparent outline-none"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 z-0 font-mono text-sm text-text-secondary"
                >
                  <span className="invisible">{value}</span>
                  {ghost}
                  <span className="cursor-block" />
                </span>
              </span>
            </div>

            <div className="flex flex-none flex-wrap gap-3.5 border-t border-border px-3.5 py-1.5 text-[11px] text-text-secondary">
              <span>
                <kbd className="border border-border px-1 text-accent-muted">
                  tab
                </kbd>{" "}
                complete
              </span>
              <span>
                <kbd className="border border-border px-1 text-accent-muted">
                  ↑↓
                </kbd>{" "}
                history
              </span>
              <span>
                <kbd className="border border-border px-1 text-accent-muted">
                  esc
                </kbd>{" "}
                close
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
