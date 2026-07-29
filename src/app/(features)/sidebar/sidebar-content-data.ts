import {
  FolderKanban,
  PenLine,
  Layers,
  Briefcase,
  Star,
  type LucideIcon,
  CandlestickChart,
} from "lucide-react";

type SidebarItem = {
  text: string;
  href?: string;
  icon: LucideIcon;
};

export const SIDEBAR_MENU: SidebarItem[] = [
  {
    text: "Projects",
    icon: FolderKanban,
    href: "/projects",
  },

  {
    text: "Blog",
    icon: PenLine,
    href: "/blogs",
  },
  {
    text: "Stack",
    icon: Layers,
    href: "/stacks",
  },
  {
    text: "Experience",
    icon: Briefcase,
    href: "/experiences",
  },
  {
    text: "Trading",
    icon: CandlestickChart,
    href: "/trades",
  },
  {
    text: "Recommendations",
    icon: Star,
    href: "/recommendations",
  },
];
