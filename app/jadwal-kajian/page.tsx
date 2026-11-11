import type { Metadata } from "next";

import { Container, Section } from "@/components/craft";
import { MonthSwitcher } from "@/components/jadwal/month-switcher";
import { ScheduleList } from "@/components/jadwal/schedule-list";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";

import {
  formatMonthLabel,
  getCurrentMonthKey,
  getTodayKey,
  pickDefaultMonth,
  type JadwalMonthOption,
} from "@/lib/jadwal";
import { getJadwalKajianByMonth, getJadwalKajianMonths } from "@/lib/strapi";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Jadwal Kajian",
  description:
    "Jadwal kajian rutin dan khusus di Masjid Muhammad Al Qosim, Boja, Kendal.",
  alternates: {
    canonical: "/jadwal-kajian",
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ bulan?: string }>;
}) {
  const { bulan } = await searchParams;

  const months = await getJadwalKajianMonths();

  const requestedMonth =
    bulan && /^\d{4}-\d{2}$/.test(bulan) ? bulan : null;

  const selectedMonth =
    requestedMonth ??
    pickDefaultMonth(
      months.map((month) => month.key),
      getCurrentMonthKey(),
    );

  const jadwal = await getJadwalKajianByMonth(selectedMonth);
  const sessions = jadwal?.sesi
    ? jadwal.sesi
    : jadwal?.sesi?.[0]
    ? [
        {
          tanggal: jadwal.sesi[0].tanggal,
          waktuMulai: jadwal.sesi[0].waktuMulai,
          waktuSelesai: jadwal.sesi[0].waktuSelesai,
          judul: jadwal.sesi[0].judul,
        },
      ]
    : [];
  const today = getTodayKey();

  const switcherMonths = buildSwitcherMonths(months, selectedMonth);

  return (
    <Section>
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <header className="flex flex-col gap-3">
            <Badge variant="soft" className="w-fit">
              Jadwal
            </Badge>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
              Jadwal Kajian
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Jadwal kajian rutin dan khusus di Masjid Muhammad Al Qosim.
              Pilih bulan untuk melihat daftar sesi kajian.
            </p>
          </header>

          {switcherMonths.length > 0 ? (
            <MonthSwitcher months={switcherMonths} selected={selectedMonth} />
          ) : null}

          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                {formatMonthLabel(selectedMonth)}
              </h2>
              {sessions.length > 0 ? (
                <p className="text-sm text-muted-foreground">
                  {sessions.length} sesi kajian
                </p>
              ) : null}
            </div>

            {sessions.length > 0 ? (
              <ScheduleList sessions={sessions} today={today} />
            ) : (
              <EmptyState
                title="Belum ada jadwal"
                description={`Belum ada jadwal kajian untuk bulan ${formatMonthLabel(
                  selectedMonth,
                )}. Silakan cek bulan lain atau kembali lagi nanti.`}
              />
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Months come sorted newest first. If the requested month has no entry yet,
 * add it to the switcher so the select keeps a valid value.
 */
function buildSwitcherMonths(
  months: JadwalMonthOption[],
  selectedMonth: string,
): JadwalMonthOption[] {
  if (months.some((month) => month.key === selectedMonth)) {
    return months;
  }

  return [
    ...months,
    { key: selectedMonth, label: formatMonthLabel(selectedMonth) },
  ].sort((a, b) => b.key.localeCompare(a.key));
}
