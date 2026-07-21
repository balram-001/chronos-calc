import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://chronos-calc.vercel.app"),
  title: "chronos-calc — Precision Calculation Hub",
  applicationName: "chronos-calc",
  description: "Calculate exact chronological age parameters, track milestone variables, and evaluate financial matrix operations like SIP, EMI, Lumpsum asset indices, and inflation-adjusted commercial returns with absolute numeric precision.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://chronos-calc.vercel.app",
    siteName: "chronos-calc",
  },
  verification: {
    google: "LszHai97qEfh9K7c6xRrjjGcBsOwQbIrGzQhwEYWOOo",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "chronos-calc",
  alternateName: "Chronos Calc",
  url: "https://chronos-calc.vercel.app/",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
