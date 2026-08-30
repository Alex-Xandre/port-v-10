export type CommandResult = {
  lines: OutLine[];
  navigate?: string;
  clear?: boolean;
  close?: boolean;
  theme?: string;
};

export type OutLine = {
  text: string;
  tone?: "default" | "dim" | "muted" | "error" | "ok" | "sans";
  href?: string;
};

const l = (text: string, tone?: OutLine["tone"]): OutLine => ({ text, tone });

export const COMMANDS = [
  "help",
  "projects",
  "blog",
  "stack",
  "whoami",
  "contact",
  "hire",
  "clear",
  "theme",
  "exit",
] as const;

const HELP_DESC: Record<string, string> = {
  projects: "what I've shipped",
  blog: "what I've written",
  stack: "what I build with",
  whoami: "the short version",
  contact: "how to reach me",
  hire: "book 30 minutes",
  clear: "clear the screen",
  exit: "close the shell",
  theme: "recolor the terminal",
};

export function runCommand(raw: string): CommandResult {
  const cmd = raw.trim();
  if (!cmd) return { lines: [] };

  const [name, ...args] = cmd.split(/\s+/);
  const arg = args.join(" ");
  const flag = arg.replace(/^--/, "");

  switch (name) {
    case "help":
      return {
        lines: [
          ...Object.entries(HELP_DESC).map(([c, d]) =>
            l(`${c.padEnd(12)}${d}`, "muted"),
          ),
          l("flags work too — try  projects --postgres", "dim"),
        ],
      };

    case "projects":
      if (flag) {
        return {
          lines: [
            l(`searching projects for --${flag} …`, "dim"),
            l(`opening /projects?tech=${flag}`, "dim"),
          ],
          navigate: `/projects?tech=${encodeURIComponent(flag)}`,
        };
      }
      return {
        lines: [l("opening /projects …", "dim")],
        navigate: "/projects",
      };

    case "blog":
      if (flag) {
        return {
          lines: [l(`opening /blogs?tag=${flag}`, "dim")],
          navigate: `/blogs?tag=${encodeURIComponent(flag)}`,
        };
      }
      return { lines: [l("opening /blogs …", "dim")], navigate: "/blogs" };

    case "stack":
      return {
        lines: [
          l(
            "core/  typescript · react · next.js · node.js · postgres",
            "muted",
          ),
          l("full tree at /stacks", "dim"),
        ],
        navigate: "/stacks",
      };

    case "experience":
      return {
        lines: [l("opening /experiences …", "dim")],
        navigate: "/experiences",
      };

    case "trading":
      return { lines: [l("opening /trading …", "dim")], navigate: "/trading" };

    case "whoami":
      return {
        lines: [
          l(
            "Full-stack engineer. 30+ apps since 2021, usually the only engineer on the thing. Currently Sr. Full-Stack at Uptic · IAC.AI.",
            "sans",
          ),
        ],
      };

    case "contact":
      return {
        lines: [
          {
            text: "email    xndrmcua22@gmail.com",
            tone: "muted",
            href: "mailto:xndrmcua22@gmail.com",
          },
          {
            text: "meeting  calendly.com/xndrmcua22/30min",
            tone: "muted",
            href: "https://calendly.com/xndrmcua22/30min",
          },
          {
            text: "github   github.com/Alex-Xandre",
            tone: "muted",
            href: "https://github.com/Alex-Xandre",
          },
        ],
      };
    case "theme": {
      const name = arg.trim().toLowerCase();
      if (!name)
        return { lines: [l("usage: theme <amber|green|blue>", "dim")] };
      if (!["amber", "green", "blue"].includes(name))
        return { lines: [l(`theme: ${name}: no such palette`, "error")] };
      return { lines: [l(`palette set to ${name}`, "ok")], theme: name };
    }
    case "hire":
      return {
        lines: [
          l("granted.", "ok"),
          {
            text: "thirty minutes, no pitch — calendly.com/xndrmcua22/30min",
            tone: "sans",
            href: "https://calendly.com/xndrmcua22/30min",
          },
        ],
      };

    case "sudo":
      if (/hire/.test(arg)) return runCommand("hire");
      return { lines: [l(`sudo: ${arg || "…"}: permission denied`, "error")] };

    case "rm":
      return {
        lines: [l("rm: nice try. this portfolio is immutable.", "error")],
      };

    case "pet":
      return /cat/.test(arg)
        ? { lines: [l("ᓚᘏᗢ  mrrp", "muted")] }
        : { lines: [l("pet what?", "dim")] };

    case "vim":
    case "vi":
    case "nano":
      return { lines: [l("you're already trapped. type exit.", "dim")] };

    case "ls":
      return {
        lines: [l("projects/  blog/  stack/  experience/  trading/", "muted")],
      };

    case "cd": {
      const dir = arg.replace(/[^a-z]/gi, "");
      if (!dir || dir === "~")
        return { lines: [l("opening / …", "dim")], navigate: "/" };
      return { lines: [l(`opening /${dir} …`, "dim")], navigate: `/${dir}` };
    }

    case "clear":
      return { lines: [], clear: true };

    case "exit":
      return { lines: [], close: true };

    default:
      return {
        lines: [l(`bash: ${name}: command not found — try help`, "error")],
      };
  }
}
