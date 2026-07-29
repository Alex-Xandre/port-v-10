import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiSolidity,
  SiMysql,
  SiRedux,
  SiSass,
  SiDotnet,
  SiPython,
  SiJest,
  SiDocker,
  SiGithub,
  SiVercel,
  SiFigma,
  SiCloudinary,
  SiVscodium,
} from "react-icons/si";

export type StackItem = {
  name: string;
  icon: IconType;
  note?: string;
  group: "core" | "comfortable" | "tools";
};

export const STACK_DATA: StackItem[] = [
  // Core
  { name: "TypeScript", icon: SiTypescript, note: "since 2022", group: "core" },
  {
    name: "JavaScript",
    icon: SiJavascript,
    note: "where it started",
    group: "core",
  },
  { name: "React", icon: SiReact, note: "10+ projects", group: "core" },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    note: "incl. this site",
    group: "core",
  },
  { name: "Node.js", icon: SiNodedotjs, note: "every backend", group: "core" },
  { name: "Express", icon: SiExpress, note: "10+ projects", group: "core" },
  { name: "MongoDB", icon: SiMongodb, note: "10+ projects", group: "core" },
  { name: "Postgres", icon: SiPostgresql, note: "at Uptic", group: "core" },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
    note: "10+ projects",
    group: "core",
  },

  // Comfortable
  {
    name: "React Native",
    icon: SiReact,
    group: "comfortable",
  },
  { name: "MySQL", icon: SiMysql, group: "comfortable" },
  { name: "Redux", icon: SiRedux, group: "comfortable" },
  { name: "Sass", icon: SiSass, group: "comfortable" },
  { name: "C# / ASP.NET", icon: SiDotnet, group: "comfortable" },
  { name: "Python", icon: SiPython, group: "comfortable" },
  { name: "Jest", icon: SiJest, group: "comfortable" },

  // Tools
  { name: "Docker", icon: SiDocker, group: "tools" },
  { name: "Git / GitHub", icon: SiGithub, group: "tools" },
  { name: "Vercel", icon: SiVercel, group: "tools" },
  { name: "Figma", icon: SiFigma, group: "tools" },
];
