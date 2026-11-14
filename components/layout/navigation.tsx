"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ClientOnly } from "@/components/utils/client-only";
import { MobileNav } from "@/components/nav/mobile-nav";
import { NavScroll } from "@/components/nav/nav-scroll";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import GradientButton from "@/components/ui/gradientbutton";

import { mainMenu, type MenuItem } from "@/lib/menu.config";
import { cn } from "@/lib/utils";

import Logo from "@/public/icons/bojamengaji.ico";
import YKBM from "@/public/icons/ykbm-logo.ico";
import Alqosim from "@/public/icons/alqosim-logo.ico";

interface NavProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

function isActive(href: string, pathname: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

function isMenuItemActive(item: MenuItem, pathname: string) {
  return (
    isActive(item.href, pathname) ||
    (item.items?.some((child) => isActive(child.href, pathname)) ?? false)
  );
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
              <NavigationMenu
                viewport={false}
                className="max-w-none flex-none justify-start"
              >
                <NavigationMenuList className="space-x-1">
                  {mainMenu.map((item) => {
                    const active = isMenuItemActive(item, pathname);

                    if (!item.items?.length) {
                      return (
                        <NavigationMenuItem key={item.href}>
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className={cn(
                              "rounded-full px-3 text-sm text-muted-foreground hover:bg-transparent hover:text-primary focus:bg-transparent focus:text-primary",
                              active &&
                                "bg-transparent text-primary hover:bg-transparent hover:text-primary",
                            )}
                          >
                            <Link
                              href={item.href}
                              aria-current={active ? "page" : undefined}
                            >
                              {item.label}
                            </Link>
                          </Button>
                        </NavigationMenuItem>
                      );
                    }

                    return (
                      <NavigationMenuItem
                        key={item.href}
                        className="relative"
                      >
                        <NavigationMenuTrigger
                          className={cn(
                            "h-9 rounded-full bg-transparent px-3 text-sm font-medium text-muted-foreground hover:bg-transparent hover:text-primary focus:bg-transparent focus:text-primary data-[state=open]:bg-transparent data-[state=open]:text-primary",
                            active &&
                              "bg-transparent text-primary hover:bg-transparent hover:text-primary",
                          )}
                        >
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="absolute left-0 top-full pt-5">
                          <ul className="flex w-52 flex-col gap-1 rounded-sm border border-border/60 bg-popover p-2 shadow-lg">
                            {item.items.map((child) => {
                              const childActive = isActive(child.href, pathname);

                              return (
                                <li key={child.href}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={child.href}
                                      aria-current={
                                        childActive ? "page" : undefined
                                      }
                                      className={cn(
                                        "flex w-full items-center rounded-xl px-3 py-2 text-sm textforeground transition-colors hover:bg-transparent hover:text-muted-foreground/80 focus:bg-transparent focus:text-muted-foreground/80",
                                        childActive &&
                                          "bg-transparent text-foreground",
                                      )}
                                    >
                                      {child.label}
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              );
                            })}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
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
