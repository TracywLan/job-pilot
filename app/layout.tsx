import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

import "./globals.css";
import { PostHogIdentify } from "./PostHogIdentify";
import { PostHogPageView } from "./PostHogPageView";
import { PHProvider } from "./providers";

// use a dedicated CSS variable for next/font to avoid colliding with the
// design token `--font-sans` used by the Tailwind theme
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "JobPilot",
  description: "AI-powered job hunting assistant for technical job seekers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <PHProvider>
          <Suspense>
            <PostHogPageView />
          </Suspense>
          <PostHogIdentify />
          {children}
        </PHProvider>
      </body>
    </html>
  );
}
