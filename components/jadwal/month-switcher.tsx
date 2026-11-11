"use client";

import { useRouter } from "next/navigation";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { JadwalMonthOption } from "@/lib/jadwal";

interface MonthSwitcherProps {
  months: JadwalMonthOption[];
  selected: string;
}

export function MonthSwitcher({ months, selected }: MonthSwitcherProps) {
  const router = useRouter();

  // Months are sorted newest first, so the next item is the older month.
  const index = months.findIndex((month) => month.key === selected);
  const older = index >= 0 ? months[index + 1] : undefined;
  const newer = index >= 0 ? months[index - 1] : undefined;

  const navigate = (key: string) => {
    router.push(`/jadwal-kajian?bulan=${encodeURIComponent(key)}`);
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="rounded-full"
        disabled={!older}
        onClick={() => older && navigate(older.key)}
        aria-label={older ? `Bulan sebelumnya: ${older.label}` : "Tidak ada bulan sebelumnya"}
      >
        <ChevronLeft className="size-4" />
        Sebelumnya
      </Button>

      <div className="flex min-w-0 items-center justify-center gap-2">
        <CalendarDays className="size-4 shrink-0 text-primary" />
        <select
          value={selected}
          onChange={(event) => navigate(event.target.value)}
          aria-label="Pilih bulan jadwal kajian"
          className="h-9 max-w-full rounded-full border border-border/60 bg-background px-3 text-sm font-medium text-foreground outline-none transition-colors hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring"
        >
          {months.map((month) => (
            <option key={month.key} value={month.key}>
              {month.label}
            </option>
          ))}
        </select>
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="rounded-full"
        disabled={!newer}
        onClick={() => newer && navigate(newer.key)}
        aria-label={newer ? `Bulan berikutnya: ${newer.label}` : "Tidak ada bulan berikutnya"}
      >
        Berikutnya
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
