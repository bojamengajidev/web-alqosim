"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export function NavScroll({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        "supports-[backdrop-filter]:bg-background/75 bg-background/90 backdrop-blur-md",
        scrolled
          ? "border-border/70 shadow-[0_1px_0_rgb(28_38_33/0.04)]"
          : "border-transparent",
        className,
      )}
    >
      {children}
    </div>
  );
}
