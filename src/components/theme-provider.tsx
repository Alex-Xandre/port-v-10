"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// Suppress the known React 19 false-positive: next-themes injects an
// anti-FOUC <script> that works correctly during SSR, but React 19 warns
// about any script tag in a component. next-themes is unmaintained, so we
// filter just this one message. Theme switching still works normally.
const originalError = console.error;
console.error = (...args) => {
  if (typeof args[0] === "string" && args[0].includes("script tag")) return;
  originalError(...args);
};

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}