export const PALETTES: Record<string, Record<string, string>> = {
  amber: {
    "--background": "#0d0b07",
    "--foreground": "#e9e1d2",
    "--text-primary": "#e9e1d2",
    "--text-secondary": "#8f8574",
    "--border": "#2b2317",
    "--secondary-background": "#151109",
    "--secondary-background-hover": "#1c1710",
    "--secondary-border": "#3a2f1e",
    "--accent": "#f2a33c",
    "--accent-hover": "#ffb654",
    "--accent-muted": "#9a7440",
    "--positive": "#5fbf77",
    "--negative": "#d96a5a",
    "--glow-accent": "0 0 18px rgb(242 163 60 / 0.35)",
    "--glow-positive": "0 0 8px rgb(95 191 119 / 0.6)",
  },
  green: {
    "--background": "#070b08",
    "--foreground": "#d8e8dc",
    "--text-primary": "#d8e8dc",
    "--text-secondary": "#7d9184",
    "--border": "#17281c",
    "--secondary-background": "#0b120d",
    "--secondary-background-hover": "#101a13",
    "--secondary-border": "#1f3a28",
    "--accent": "#4ade80",
    "--accent-hover": "#6ef29e",
    "--accent-muted": "#3a7d55",
    "--positive": "#4ade80",
    "--negative": "#e06c5f",
    "--glow-accent": "0 0 18px rgb(74 222 128 / 0.35)",
    "--glow-positive": "0 0 8px rgb(74 222 128 / 0.6)",
  },
  blue: {
    "--background": "#06090d",
    "--foreground": "#dbe6ee",
    "--text-primary": "#dbe6ee",
    "--text-secondary": "#7c8b99",
    "--border": "#16222d",
    "--secondary-background": "#0a1017",
    "--secondary-background-hover": "#0f1720",
    "--secondary-border": "#22384a",
    "--accent": "#56b6f2",
    "--accent-hover": "#7cc8ff",
    "--accent-muted": "#3d7196",
    "--positive": "#5fbf77",
    "--negative": "#d96a5a",
    "--glow-accent": "0 0 18px rgb(86 182 242 / 0.35)",
    "--glow-positive": "0 0 8px rgb(95 191 119 / 0.6)",
  },
};

export const applyPalette = (name: string) => {
  const p = PALETTES[name];
  if (!p) return false;
  const root = document.documentElement;
  Object.entries(p).forEach(([k, v]) => root.style.setProperty(k, v));
  return true;
};
