import { ExternalLink, MapPin, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  formatSessionDate,
  formatTimeRange,
  groupSessions,
  isSafeHttpUrl,
  kategoriLabel,
} from "@/lib/jadwal";
import type { StrapiKajianSession } from "@/lib/strapi.d";
import { cn } from "@/lib/utils";

interface ScheduleListProps {
  sessions: StrapiKajianSession[];
  today: string;
}

export function ScheduleList({ sessions, today }: ScheduleListProps) {
  const groups = groupSessions(sessions);

  return (
    <div className="flex flex-col gap-8">
      {groups.map((group) => {
        const isPast = group.date < today;

        return (
          <section key={group.date} className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {formatSessionDate(group.date)}
            </h3>

            <div className="flex flex-col gap-3">
              {group.sessions.map((session, index) => (
                <SessionCard
                  key={`${group.date}-${session.waktuMulai}-${index}`}
                  session={session}
                  isPast={isPast}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function SessionCard({
  session,
  isPast,
}: {
  session: StrapiKajianSession;
  isPast: boolean;
}) {
  const time = formatTimeRange(session.waktuMulai, session.waktuSelesai);
  const kategori = kategoriLabel(session.kategori);
  const link = isSafeHttpUrl(session.linkKajian)
    ? session.linkKajian
    : null;

  return (
    <Card
      className={cn(
        "border-border/60 shadow-none transition-colors",
        isPast && "opacity-60",
      )}
    >
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="soft">
              {time ? `${time} WIB` : "Waktu menyusul"}
            </Badge>
            {kategori ? <Badge variant="secondary">{kategori}</Badge> : null}
          </div>

          <h4 className="text-base font-semibold leading-snug text-foreground">
            {session.judul}
          </h4>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {session.narasumber ? (
              <span className="inline-flex items-center gap-1.5">
                <UserRound className="size-4" />
                {session.narasumber}
              </span>
            ) : null}

            {session.lokasi ? (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4" />
                {session.lokasi}
              </span>
            ) : null}
          </div>
        </div>

        {link ? (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="shrink-0 rounded-full"
          >
            <a href={link} target="_blank" rel="noreferrer noopener">
              Buka Kajian
              <ExternalLink className="size-4" />
            </a>
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}
