"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";

import Footer from "@/components/layout/footer";
import Navigation from "@/components/layout/navigation";
import { ThemeProvider } from "@/components/theme/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Lewati ke konten
      </a>

      <Navigation />
      <main id="main" className="min-h-[60vh]">
        {children}
      </main>
      <Footer />

      <Analytics />
      <SpeedInsights />
      <Toaster position="top-center" richColors closeButton />
    </ThemeProvider>
  );
}
