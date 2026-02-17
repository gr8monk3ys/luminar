import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://luminar.dev";

export const metadata: Metadata = {
  title: {
    default: "Luminar — Interactive STEM Learning",
    template: "%s | Luminar",
  },
  description:
    "Master math, physics, computer science, and machine learning through interactive problem-solving. 100+ hands-on lessons — no passive videos, just deep understanding.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    siteName: "Luminar",
    title: "Luminar — Interactive STEM Learning",
    description:
      "Master math, physics, computer science, and machine learning through interactive problem-solving.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luminar — Interactive STEM Learning",
    description:
      "Master math, physics, computer science, and machine learning through interactive problem-solving.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <AuthProvider>
          <ThemeProvider>
            <AnalyticsProvider>{children}</AnalyticsProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
