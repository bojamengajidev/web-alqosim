import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { HeartHandshake, MessageCircle, Sparkles } from "lucide-react";

import BackButton from "@/components/back";
import { Container, Section } from "@/components/craft";
import DonasiCard from "@/components/donasi/donasi-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Peluang Wakaf Jariyah",
  description:
    "Dukung program wakaf jariyah Masjid Muhammad Al Qosim untuk pembangunan dan dakwah di Boja, Kendal.",
};

const benefits = [
  {
    title: "Amal yang terus mengalir",
    description:
      "Pahala wakaf jariyah terus mengalir selama manfaatnya dirasakan oleh umat.",
  },
  {
    title: "Mendukung dakwah & pendidikan",
    description:
      "Setiap kontribusi membantu kegiatan kajian, pendidikan, dan pembinaan umat.",
  },
  {
    title: "Investasi akhirat",
    description:
      "Jadikan harta yang Anda titipkan sebagai bekal terbaik menuju akhirat.",
  },
];

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await params;

  return (
    <>
      <Section>
        <Container>
          <div className="mx-auto flex max-w-4xl flex-col gap-6">
            <BackButton />

            <div className="flex flex-col gap-4">
              <Badge variant="accent" className="w-fit gap-1">
                <Sparkles className="size-3.5" />
                Wakaf Jariyah
              </Badge>
              <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Peluang Wakaf Jariyah
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Mari bersama mendukung pembangunan dan program dakwah Masjid
                Muhammad Al Qosim. Setiap kebaikan yang Anda titipkan akan
                menjadi amal jariyah yang terus mengalir.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="flex flex-col gap-6">
              <Card className="overflow-hidden border-border/60 p-0 shadow-soft">
                <Image
                  src="/images/program-wakaf.png"
                  alt="Poster program wakaf jariyah Masjid Muhammad Al Qosim"
                  width={720}
                  height={1280}
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="h-auto w-full object-cover"
                  priority
                />
              </Card>

              <div className="grid gap-3">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="flex gap-3 rounded-2xl border border-border/60 bg-card p-4"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <HeartHandshake className="size-4" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold text-foreground">
                        {benefit.title}
                      </p>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <DonasiCard />

              <Card className="border-border/60 bg-muted/40 p-5 shadow-none">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Ingin berdiskusi mengenai program wakaf atau ingin
                  menyalurkan melalui jalur lain? Silakan hubungi admin kami.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-4 w-full rounded-full"
                >
                  <Link
                    href="https://api.whatsapp.com/send/?phone=6285156245768&text&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle className="size-4" />
                    Hubungi Admin
                  </Link>
                </Button>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
