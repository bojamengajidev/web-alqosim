import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";

import BackButton from "@/components/back";
import { Container, Section } from "@/components/craft";
import { EmptyState } from "@/components/shared/empty-state";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent } from "@/components/ui/card";

interface ArchiveListProps<T> {
  title: string;
  eyebrow?: string;
  description?: string;
  items: T[];
  getItemHref: (item: T) => string;
  getItemLabel: (item: T) => string;
  emptyMessage: string;
}

export function ArchiveList<T extends { id: number | string }>({
  title,
  eyebrow,
  description,
  items,
  getItemHref,
  getItemLabel,
  emptyMessage,
}: ArchiveListProps<T>) {
  return (
    <Section>
      <Container className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <SectionHeader eyebrow={eyebrow} title={title} description={description} />
          <div>
            <BackButton />
          </div>
        </div>

        {items.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Link key={item.id} href={getItemHref(item)} className="group block h-full">
                <Card className="h-full border-border/60 shadow-none transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary/25 group-hover:shadow-md">
                  <CardContent className="flex h-full items-start gap-4 p-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <FileText className="size-5" />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="line-clamp-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                        {getItemLabel(item)}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        Buka halaman
                        <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState title="Belum ada halaman" description={emptyMessage} />
        )}
      </Container>
    </Section>
  );
}
