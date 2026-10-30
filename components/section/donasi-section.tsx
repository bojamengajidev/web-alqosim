import Image from "next/image";

import { Container, Section } from "@/components/craft";
import { SectionHeader } from "@/components/shared/section-header";
import { Card } from "@/components/ui/card";

import DonasiCard from "@/components/donasi/donasi-card";

export default function DonasiSection() {
  return (
    <Section className="bg-secondary/40">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Donasi"
              title="Sudah persiapkan investasi akhirat Anda hari ini?"
              description="Mari salurkan kebaikan dengan infaq terbaik hari ini. Setiap kontribusi akan menjadi amal jariyah yang terus mengalir."
            />

            <Card className="mt-8 overflow-hidden border-border/60 p-0 shadow-soft">
              <Image
                src="/images/program-wakaf.png"
                alt="Poster program wakaf jariyah Masjid Muhammad Al Qosim"
                width={720}
                height={1280}
                sizes="(min-width: 1024px) 480px, 100vw"
                className="h-auto w-full object-cover"
              />
            </Card>
          </div>

          <DonasiCard />
        </div>
      </Container>
    </Section>
  );
}
