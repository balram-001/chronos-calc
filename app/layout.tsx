import "./globals.css";

export const metadata = {
  title: "chronos-calc — Precision Calculation Hub",
  description: "Calculate exact chronological age parameters, track milestone variables, and evaluate financial matrix operations like SIP, EMI, Lumpsum asset indices, and inflation-adjusted commercial returns with absolute numeric precision.",
  icons: {
    icon: "/icon.png",
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
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
