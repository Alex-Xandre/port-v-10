export type StackItem = {
  name: string;
  note?: string;
  group: "core" | "comfortable" | "tools";
};

export const STACK_DATA: StackItem[] = [
  // Core
  { name: "TypeScript", note: "since 2022", group: "core" },
  { name: "JavaScript", note: "where it started", group: "core" },
  { name: "React", note: "10+ projects", group: "core" },
  { name: "Vite", note: "10+ projects", group: "core" },
  { name: "Next.js", note: "incl. this site", group: "core" },
  { name: "Node.js", note: "every backend", group: "core" },
  { name: "Express", note: "10+ projects", group: "core" },
  { name: "MongoDB", note: "10+ projects", group: "core" },
  { name: "Postgres", note: "at Uptic", group: "core" },
  { name: "Tailwind", note: "10+ projects", group: "core" },
  { name: "Python", note: "Trading projects", group: "core" },

  // Comfortable
  { name: "React Native", group: "comfortable" },
  { name: "MySQL", group: "comfortable" },
  { name: "Redux", group: "comfortable" },
  { name: "Sass", group: "comfortable" },
  { name: "C# / ASP.NET", group: "comfortable" },
  { name: "Jest", group: "comfortable" },

  // Tools
  { name: "Docker", group: "tools" },
  { name: "Git / GitHub", group: "tools" },
  { name: "Vercel", group: "tools" },
  { name: "Figma", group: "tools" },
];