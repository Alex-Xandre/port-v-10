#!/usr/bin/env bash
# make-template.sh — builds the public terminal-portfolio template
# from your personal repo, scrubbed and filled with placeholder data.
#
# Usage:  bash make-template.sh [path-to-your-repo] [output-dir]
# Defaults: source = current dir, output = ../terminal-portfolio

set -euo pipefail

SRC="${1:-.}"
OUT="${2:-../terminal-portfolio}"

if [ ! -f "$SRC/package.json" ]; then
  echo "!! $SRC doesn't look like the repo root (no package.json). Run from port-v-10 or pass the path."
  exit 1
fi
if [ -e "$OUT" ]; then
  echo "!! $OUT already exists — delete it or pick another output dir."
  exit 1
fi

warn() { echo "  !! $1"; }
ok()   { echo "  ok $1"; }

echo "== copying source (excluding node_modules/.next/.git) =="
mkdir -p "$OUT"
rsync -a \
  --exclude node_modules --exclude .next --exclude .git \
  --exclude tsconfig.tsbuildinfo --exclude .vercel \
  "$SRC"/ "$OUT"/
ok "copied"

cd "$OUT"

FEAT="src/app/(features)"

echo "== writing placeholder identity: src/lib/site.ts =="
mkdir -p src/lib
cat > src/lib/site.ts <<'EOF'
// src/lib/site.ts — single source of identity.
// Components read from here; nothing hardcodes these values.
// EDIT THIS FILE FIRST.

export const NAME = "Your Name";
export const HANDLE = "yourname";
export const SHELL = `${HANDLE}@sh:~`;

export const SITE_URL = "https://your-site.example.com";
export const EMAIL = "you@example.com";
export const CALENDLY = "https://calendly.com/yourname/30min";

export const SOCIALS = [
  { key: "github", label: "github.com/yourname", href: "https://github.com/yourname" },
  { key: "linkedin", label: "linkedin.com/in/yourname", href: "https://www.linkedin.com/in/yourname/" },
] as const;
EOF
ok "site.ts"

echo "== placeholder data files =="

PROJ="$FEAT/projects/project-data.ts"
if [ -f "$PROJ" ]; then
cat > "$PROJ" <<'EOF'
export type ProjectEntry = {
  title: string;
  banner: string[];
  web_link: string;
  stack: string[];
  description: string;
  features: string[];
  type: string;
  year?: number;
  testAccount?: [string, string];
  github?: string;
};

export const PROJECT_DATA: ProjectEntry[] = [
  {
    title: "Sample SaaS",
    banner: ["https://placehold.co/1200x675/151109/f2a33c?text=sample-saas"],
    web_link: "https://example.com",
    stack: ["Next.js", "Postgres", "Tailwind CSS"],
    description: "A short, specific sentence about what this ships and for whom.",
    features: [
      "The one feature that makes it worth using",
      "The second most important thing it does",
      "A constraint you handled well",
    ],
    type: "Web",
    year: 2026,
    github: "https://github.com/yourname/sample-saas",
  },
  {
    title: "CLI Tool",
    banner: ["https://placehold.co/1200x675/151109/f2a33c?text=cli-tool"],
    web_link: "",
    stack: ["Node.js", "TypeScript"],
    description: "Second sample project — no live link, so its window frame falls back to a local path.",
    features: ["Does one thing well"],
    type: "Tooling",
    year: 2025,
    github: "https://github.com/yourname/cli-tool",
  },
];
EOF
  ok "project-data.ts"
else
  warn "not found: $PROJ — scrub it by hand"
fi

STACKS="$FEAT/stacks/stacks-data.ts"
if [ -f "$STACKS" ]; then
cat > "$STACKS" <<'EOF'
export type StackItem = {
  name: string;
  note?: string;
  group: "core" | "comfortable" | "tools";
};

export const STACK_DATA: StackItem[] = [
  { name: "TypeScript", note: "on everything", group: "core" },
  { name: "React", note: "the default", group: "core" },
  { name: "Next.js", note: "incl. this site", group: "core" },
  { name: "Node.js", note: "every backend", group: "core" },
  { name: "Postgres", note: "when it matters", group: "core" },

  { name: "Python", group: "comfortable" },
  { name: "Redis", group: "comfortable" },

  { name: "Docker", group: "tools" },
  { name: "Git / GitHub", group: "tools" },
  { name: "Vercel", group: "tools" },
];
EOF
  ok "stacks-data.ts"
else
  warn "not found: $STACKS — scrub it by hand"
fi

TIMELINE="$FEAT/experiences/timeline-data.ts"
if [ -f "$TIMELINE" ]; then
cat > "$TIMELINE" <<'EOF'
export type TimelineEntry = {
  title: string;
  company: string;
  client?: string;
  date: string;
  endYear: number | null; // null = current role (renders as HEAD)
  description: string;
};

export const TIMELINE_DATA: TimelineEntry[] = [
  {
    title: "Senior Engineer",
    company: "Current Co",
    date: "Jan 2026 - Present",
    endYear: null,
    description: "What you own now, in one or two dry, specific sentences.",
  },
  {
    title: "Engineer",
    company: "Previous Co",
    date: "2024 - 2025",
    endYear: 2025,
    description: "What you shipped there and what it taught you.",
  },
  {
    title: "First Freelance Project",
    company: "Self",
    date: "2023",
    endYear: 2023,
    description: "Milestone entries render as hollow-dot tags. Add your own titles to MILESTONES in the experience page.",
  },
];
EOF
  ok "timeline-data.ts"
else
  warn "not found: $TIMELINE — scrub it by hand"
fi

TRADING="$FEAT/trading"
if [ -d "$TRADING" ]; then
  warn "trading route exists at $TRADING — personal to the original author."
  warn "   Either delete it (rm -rf '$TRADING' + remove nav item) or rewrite its data."
fi

echo "== sample blog post =="
POSTS_DIR=""
for d in content/posts src/content/posts posts src/posts; do
  if [ -d "$d" ]; then POSTS_DIR="$d"; break; fi
done
if [ -n "$POSTS_DIR" ]; then
  find "$POSTS_DIR" -name "*.md" -delete
cat > "$POSTS_DIR/hello-world.md" <<'EOF'
---
title: "Hello, world"
date: "2026-01-15"
tags: ["meta"]
excerpt: "A sample post so the blog renders. Replace me."
---

## Why this post exists

So the blog index and post page render on first run. Delete it and write
your own.

Inline `code` gets amber chips, and blocks get the left border:

```ts
const shipped = true;
```

## The rules

One accent color. Mono for chrome, sans for reading. The rest is in
AGENTS.md.
EOF
  ok "$POSTS_DIR/hello-world.md"
else
  warn "couldn't find a posts directory — add a sample post by hand where lib/posts.ts reads from"
fi

echo "== LICENSE =="
YEAR=$(date +%Y)
cat > LICENSE <<EOF
MIT License

Copyright (c) $YEAR

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
EOF
ok "LICENSE (add your name to the copyright line)"

echo "== leftover identity scan =="
LEFTOVERS=$(grep -rln --exclude-dir=node_modules --exclude=README.md \
  "xandre\|xndrmcua\|Alex-Xandre\|micua" . 2>/dev/null || true)
if [ -n "$LEFTOVERS" ]; then
  warn "personal identity still present in:"
  echo "$LEFTOVERS" | sed 's/^/       /'
  warn "these are components/metadata still hardcoding identity —"
  warn "point them at src/lib/site.ts before publishing."
else
  ok "no personal identity found outside README"
fi

echo "== git init =="
rm -rf .git
git init -q
ok "fresh history"

echo ""
echo "== done: $OUT =="
echo "Next steps:"
echo "  1. Fix every file the leftover scan listed (import from src/lib/site.ts)"
echo "  2. Drop in README.md + AGENTS.md (+ CLAUDE.md containing '@AGENTS.md')"
echo "  3. npm install && npm run dev — verify it renders with placeholder data"
echo "  4. Take screenshots for the README TODO slots"
echo "  5. git add -A && git commit -m 'terminal-portfolio template v1'"
echo "  6. Push to GitHub, Settings -> check 'Template repository'"
