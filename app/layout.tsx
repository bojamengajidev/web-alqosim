import "./globals.css";
import type { Metadata, Viewport } from "next";

import { fontArabic, fontDisplay, fontSans } from "@/lib/fonts";
import { siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/utils";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Masjid Muhammad Al Qosim",
    template: `%s | ${siteConfig.site_name}`,
  },
  description: "Website Resmi Masjid Muhammad Al Qosim | Boja Mengaji",
  metadataBase: new URL(siteConfig.site_domain),
  openGraph: {
    title: siteConfig.site_name,
    description: "Website Resmi Masjid Muhammad Al Qosim | Boja Mengaji",
    siteName: siteConfig.site_name,
    locale: "id_ID",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FCFAF5" },
    { media: "(prefers-color-scheme: dark)", color: "#0E1512" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.className,
          fontSans.variable,
          fontDisplay.variable,
          fontArabic.variable,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
