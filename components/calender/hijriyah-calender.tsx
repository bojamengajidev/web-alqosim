"use client";

import * as React from "react";
import { CalendarDays, MoonStar } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { getHijriDate } from "@/lib/hijri";
import { useMounted } from "@/lib/hooks/use-mounted";
import { cn } from "@/lib/utils";

type HijriCalendarProps = {
  className?: string;
};

type HijriDate = {
  day: string | number;
  month: { en: string; ar?: string; number?: number };
  year: string | number;
};

export function HijriCalendar({ className }: HijriCalendarProps) {
  const mounted = useMounted();

  const [date, setDate] = React.useState<Date>();
  const [hijri, setHijri] = React.useState<HijriDate | null>(null);
  const [isAyyamulBidh, setIsAyyamulBidh] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    if (!mounted) return;
    setDate(new Date());
  }, [mounted]);

  React.useEffect(() => {
    if (!date) return;

    let active = true;

    setHasError(false);

    getHijriDate(date)
      .then((res) => {
        if (!active) return;
        setHijri(res);
        const hijriDay = Number(res.day);
        setIsAyyamulBidh([13, 14, 15].includes(hijriDay));
      })
      .catch(() => {
        if (!active) return;
        setHijri(null);
        setIsAyyamulBidh(false);
        setHasError(true);
      });

    return () => {
      active = false;
    };
  }, [date]);

  if (!mounted) {
    return <Skeleton className={cn("h-[23rem] w-full max-w-md", className)} />;
  }

  return (
    <Card
      className={cn(
        "w-full max-w-md overflow-hidden border-border/60 shadow-soft",
        className,
      )}
    >
      <CardContent className="flex flex-col items-center gap-3 p-4 sm:p-5">
        <div className="flex w-full items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
            <CalendarDays className="size-4 text-primary" />
            Kalender Hijriyah
          </span>
          <Badge variant="soft" className="gap-1">
            <MoonStar className="size-3" />
            {date?.toLocaleDateString("id-ID", { month: "long" })}
          </Badge>
        </div>

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-full rounded-xl"
        />

        {hijri ? (
          <div
            className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-foreground"
            aria-live="polite"
          >
            <span>
              {hijri.day} {hijri.month.en} {hijri.year} H
            </span>

            {isAyyamulBidh ? (
              <Badge variant="accent" className="gap-1">
                🌕 Ayyamul Bidh
              </Badge>
            ) : null}
          </div>
        ) : hasError ? (
          <p className="text-xs text-muted-foreground" aria-live="polite">
            Tanggal hijriyah tidak tersedia saat ini.
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
