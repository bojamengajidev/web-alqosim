"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ClientOnly } from "@/components/utils/client-only";
import { MobileNav } from "@/components/nav/mobile-nav";
import { NavScroll } from "@/components/nav/nav-scroll";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import GradientButton from "@/components/ui/gradientbutton";

import { mainMenu } from "@/lib/menu.config";
import { cn } from "@/lib/utils";

import Logo from "@/public/icons/bojamengaji.ico";
import YKBM from "@/public/icons/ykbm-logo.ico";
import Alqosim from "@/public/icons/alqosim-logo.ico";

interface NavProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export default function Navigation({ className, children, id }: NavProps) {
  const pathname = usePathname();

  return (
    <NavScroll>
      <nav
        id={id}
        aria-label="Navigasi utama"
        className={cn("border-b border-border/60", className)}
      >
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Beranda Masjid Muhammad Al Qosim"
            className="group flex min-w-0 items-center gap-3 transition-opacity hover:opacity-80"
          >
            <span className="flex shrink-0 items-center gap-1.5">
              <Image
                src={Alqosim}
                alt="Logo Masjid Muhammad Al Qosim"
                width={96}
                height={96}
                className="w-9 h-auto"
              />
              <Image
                src={YKBM}
                alt="Logo Yayasan Kajian Boja Mengaji"
                width={96}
                height={96}
                className="w-12 h-auto"
              />
              <Image
                src={Logo}
                alt="Logo Boja Mengaji"
                width={96}
                height={96}
                className="w-14 h-auto"
              />
            </span>

            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-semibold tracking-tight text-foreground">
                Masjid Muhammad Al Qosim
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                Yayasan Kajian Boja Mengaji
              </span>
            </span>
          </Link>

          {children}

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 md:flex">
              {Object.entries(mainMenu).map(([label, href]) => {
                const active =
                  href === "/" ? pathname === "/" : pathname.startsWith(href);

                return (
                  <Button
                    key={href}
                    asChild
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "rounded-full px-3 text-sm text-muted-foreground hover:text-foreground",
                      active &&
                        "bg-secondary text-secondary-foreground hover:bg-secondary",
                    )}
                  >
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                    >
                      {label.charAt(0).toUpperCase() + label.slice(1)}
                    </Link>
                  </Button>
                );
              })}
            </div>

            <ThemeToggle />

            <GradientButton />

            <ClientOnly>
              <MobileNav />
            </ClientOnly>
          </div>
        </div>
      </nav>
    </NavScroll>
  );
}
