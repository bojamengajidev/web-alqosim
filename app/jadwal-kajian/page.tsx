import type { Metadata } from "next";

import { Container, Section } from "@/components/craft";
import { ScheduleList } from "@/components/jadwal/schedule-list";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";

import {
  getTodayKey,
  sortSessions,
  groupSessions,
} from "@/lib/jadwal";
import { getAllJadwalKajian } from "@/lib/strapi";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Jadwal Kajian",
  description:
    "Jadwal kajian rutin dan khusus di Masjid Muhammad Al Qosim, Boja, Kendal.",
  alternates: {
    canonical: "/jadwal-kajians",
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ bulan?: string }>;
}) {
  // Accessing searchParams keeps this route dynamic.
  await searchParams;

  // Fetch ALL sessions from CMS (flat list, no month grouping)
  const allSessions = await getAllJadwalKajian();

  // Sort all sessions by date and time
  const sortedSessions = sortSessions(allSessions);

  const today = getTodayKey();

  // Group sessions by date for display
  const groups = groupSessions(sortedSessions);

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
            </p>
          </header>

          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Semua Jadwal Kajian
              </h2>
              {allSessions.length > 0 ? (
                <p className="text-sm text-muted-foreground">
                  {allSessions.length} sesi kajian
                </p>
              ) : null}
            </div>

            {groups.length > 0 ? (
              <ScheduleList sessions={sortedSessions} today={today} />
            ) : (
              <EmptyState
                title="Belum ada jadwal"
                description="Belum ada jadwal kajian yang tersedia. Silakan cek lagi nanti."
              />
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}