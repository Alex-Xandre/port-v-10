import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

import { DottedBackground } from "@/components/dotted-background";
import Appbar from "./(features)/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="flex flex-1 font-sans h-screen flex-col overflow-hidden">
            <Appbar />
            <div className="flex-1 mt-16 overflow-y-auto ">
              <DottedBackground />
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
