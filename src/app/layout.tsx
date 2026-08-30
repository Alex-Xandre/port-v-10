import type { Metadata } from "next";

import "./globals.css";

import Appbar from "./(features)/sidebar";
import { Caveat, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { SiteFooter } from "./(features)/footer";
import { Analytics } from "@vercel/analytics/next";
import { getGithubStats } from "@/lib/github";
import Shell from "./(features)/shell";

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-plex-mono",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-sans",
  display: "swap",
});

const SITE_URL = "https://xandremicua.vercel.app";
const CLD = "https://res.cloudinary.com/dfhhkd04c/image/upload";
const IMG =
  "v1753756678/519598439_1493608591625050_6725044023529033978_n_cdcy56.jpg";

const OG_IMAGE = `${CLD}/c_fill,g_face,w_1200,h_630,q_auto/${IMG}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Xandre Micua — Full-Stack Engineer",
    template: "%s — Xandre Micua",
  },
  description:
    "Full-stack engineer building modern web & mobile apps, working at the intersection of trading and AI. 30+ shipped projects since 2021.",
  keywords: [
    "full-stack developer",
    "React developer",
    "Next.js",
    "Node.js",
    "python",
    "freelance developer Philippines",
  ],
  authors: [{ name: "Xandre Micua", url: SITE_URL }],
  icons: {
    icon: `${CLD}/c_fill,g_face,w_48,h_48,r_max,q_auto,f_png/${IMG}`,
    apple: `${CLD}/c_fill,g_face,w_180,h_180,q_auto,f_png/${IMG}`,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Xandre Micua",
    title: "Xandre Micua — Full-Stack Engineer",
    description:
      "Full-stack engineer building modern web & mobile apps. 30+ shipped projects since 2021.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Xandre Micua — Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xandre Micua — Full-Stack Engineer",
    description:
      "Full-stack engineer building modern web & mobile apps. 30+ shipped projects since 2021.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gh = await getGithubStats();
  return (
    <html
      lang="en"
      className={`dark ${caveat.variable} ${plexMono.variable} ${plexSans.variable}`}
    >
      <body>
        <Shell />
        <Analytics />
        <div className="scanlines fixed inset-0 z-0" aria-hidden="true" />
        <main className="relative z-10 flex h-screen flex-1 flex-col overflow-hidden font-mono">
          <Appbar gh={gh} />
          <div className="mt-16 flex-1 overflow-y-auto">
            {children}
            <SiteFooter />
          </div>
        </main>
      </body>
    </html>
  );
}
