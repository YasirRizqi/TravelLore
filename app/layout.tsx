import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Logo from "@/components/Logo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TravelLore AI | Story-based AI Travel Planner",
  description: "Turn any city into your personal adventure story guided by Loro, your mystical AI travel spirit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-cream text-brand-navy">
        {/* Navbar */}
        <header className="sticky top-0 z-50 bg-brand-cream/80 backdrop-blur-md border-b border-brand-navy/10 py-4 px-6 md:px-12 flex items-center justify-between">
          <Logo variant="light" />
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center w-full">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-brand-navy text-brand-cream py-12 px-6 md:px-12 flex flex-col items-center text-center">
          <Logo variant="dark" className="mb-4 opacity-90" />
          <p className="opacity-70 text-sm max-w-md">
            TravelLore AI transforms ordinary itineraries into cinematic, story-driven journeys.
          </p>
          <div className="mt-8 text-xs opacity-50">
            &copy; {new Date().getFullYear()} TravelLore AI. All rights reserved. MVP Demo.
          </div>
        </footer>
      </body>
    </html>
  );
}
