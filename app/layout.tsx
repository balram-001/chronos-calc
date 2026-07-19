import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "chronos-calc",
  description: "Calculate exact chronological age, absolute day variance, time duration gaps, birthday countdowns, and track baby growth indexes with precision metrics.",
  icons: {
    icon: "/logo.png",
  },
  verification: {
    google: "LszHai97qEfh9K7c6xRrjjGcBsOwQbIrGzQhwEYWOOo",
  },
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
