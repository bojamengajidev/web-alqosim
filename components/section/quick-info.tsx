import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  HandCoins,
  MapPin,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/craft";

const items = [
  {
    icon: MapPin,
    title: "Lokasi",
    description: "Boja, Kendal, Jawa Tengah",
    href: "/tentang-kami",
  },
  {
    icon: BookOpen,
    title: "Kajian",
    description: "Majelis ilmu syar'i",
    href: "/kegiatan",
  },
  {
    icon: GraduationCap,
    title: "Pendidikan",
    description: "TK & SD Islam",
    href: "/kegiatan",
  },
  {
    icon: HandCoins,
    title: "Donasi",
    description: "Infaq & wakaf jariyah",
    href: "/wakaf/peluang-jariyah",
  },
];

export default function QuickInfo() {
  return (
    <section className="relative z-10 -mt-12 pb-4">
      <Container>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <Link key={item.title} href={item.href} className="group">
              <Card className="h-full border-border/60 bg-card/95 shadow-soft backdrop-blur transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md">
                <CardContent className="flex items-start gap-4 p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="size-5" />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {item.title}
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                    <span className="text-xs leading-relaxed text-muted-foreground">
                      {item.description}
                    </span>
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
