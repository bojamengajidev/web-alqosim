"use client";

import * as React from "react";
import Image from "next/image";
import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, HeartHandshake, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import { contentMenu, mainMenu } from "@/lib/menu.config";
import { siteConfig } from "@/lib/site.config";
import { cn } from "@/lib/utils";

import Alqosim from "@/public/icons/alqosim-logo.ico";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full md:hidden"
          aria-label="Buka menu navigasi"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="flex w-[88%] flex-col p-0 sm:max-w-sm">
        <SheetHeader className="border-b border-border/60 px-6 py-5 text-left">
          <SheetTitle className="flex items-center gap-3 text-left">
            <Image
              src={Alqosim}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="flex flex-col">
              <span className="text-sm font-semibold">{siteConfig.site_name}</span>
              <span className="text-xs font-normal text-muted-foreground">
                Boja Mengaji
              </span>
            </span>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Menu navigasi situs Masjid Muhammad Al Qosim
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6 py-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <p className="px-2 pb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Menu
              </p>
              {Object.entries(mainMenu).map(([label, href]) => (
                <MobileLink key={href} href={href} onOpenChange={setOpen}>
                  {label.charAt(0).toUpperCase() + label.slice(1)}
                </MobileLink>
              ))}
            </div>

            <Separator />

            <div className="flex flex-col gap-1">
              <p className="px-2 pb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Blog
              </p>
              {Object.entries(contentMenu).map(([label, href]) => (
                <MobileLink key={href} href={href} onOpenChange={setOpen}>
                  {label.charAt(0).toUpperCase() + label.slice(1)}
                </MobileLink>
              ))}
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="border-t border-border/60 p-6">
          <Button asChild variant="accent" className="w-full rounded-full">
            <Link
              href="/wakaf/peluang-jariyah"
              onClick={() => setOpen(false)}
            >
              <HeartHandshake className="size-4" />
              Dukung Wakaf Jariyah
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();

  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(
        "flex items-center justify-between rounded-xl px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-secondary",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRight className="size-4 text-muted-foreground" />
    </Link>
  );
}
