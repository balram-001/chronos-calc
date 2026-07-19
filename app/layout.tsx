import "./globals.css";

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
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
