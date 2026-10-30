import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container, Section } from "@/components/craft";
import { SectionHeader } from "@/components/shared/section-header";
import { HeartHandshake } from "lucide-react";

const activities = [
  {
    id: "shalat-berjamaah",
    title: "Shalat Berjamaah",
    description:
      "Kumpulan jamaah shalat lima waktu berjamaah setiap hari di Masjid Muhammad Al Qosim.",
    image: "/images/program-wakaf.png",
  },
  {
    id: "shalat-jumat",
    title: "Shalat Jumat",
    description:
      "Khutbah dan shalat Jumat berjamaah setiap Jumat hari, dilengkapi ceramah pendek.",
    image: "/images/program-wakaf.png",
  },
  {
    id: "kajian-rutin",
    title: "Kajian Rutin",
    description:
      "Majelis ilmu syar'i harian dan mingguan untuk menjalin ilmu dan pemahaman agama.",
    image: "/images/program-wakaf.png",
  },
  {
    id: "madrasah-diniyah",
    title: "Madrasah Diniyah Anak-Anak",
    description:
      "Program pendidikan awal untuk anak-anak dengan kurikulum yang menyenangkan dan interaktif.",
    image: "/images/program-wakaf.png",
  },
  {
    id: "kelas-tahsin",
    title: "Kelas Belajar Tahsin",
    description:
      "Pelatihan membaca Al-Qur'an dengan tata tajweed yang benar untuk semua usia.",
    image: "/images/program-wakaf.png",
  },
  {
    id: "kelas-bahasa-arab",
    title: "Kelas Belajar Bahasa Arab",
    description:
      "Mengajarkan dasar-dasar bahasa Arab untuk memahami Al-Qur'an dan bacaan shalat.",
    image: "/images/program-wakaf.png",
  },
  {
    id: "tebar-qurban",
    title: "Tebar Qurban",
    description:
      "Program distribusi qurban secara berkala kepada perluas umat dan orang fakir miskin.",
    image: "/images/program-wakaf.png",
  },
  {
    id: "pendidikan-dini-sekolah-dasar",
    title: "Pendidikan Dini & SD Islam",
    description:
      "Sekolah dasar Islam yang menyelenggarakan pengembangan akademik dan ibadah seiring bersama.",
    image: "/images/program-wakaf.png",
  },
];

export const metadata: Metadata = {
  title: "Kegiatan",
  description:
    "Lihat berbagai kegiatan, program, dan kegiatan rutin yang dilaksanakan di Masjid Muhammad Al Qosim dan Boja Mengaji.",
};

export default function KegiatanPage() {
  return (
    <>
      {/* ==========================================================================
           HERO SECTION - Gambar utama + judul
         ========================================================================== */}
      <Section className="pt-0 pb-6">
        <Container className="max-w-4xl mx-auto">
          <div className="relative h-48 md:h-64 bg-secondary/60 rounded-2xl overflow-hidden mb-6">
            <Image
              src="/images/drone-2.webp"
              alt="Foto udara Masjid Muhammad Al Qosim area kegiatan"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <Badge variant="soft">Kegiatan</Badge>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Kegiatan & Program
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Jelajahi berbagai kegiatan dan program yang dilaksanakan secara rutin
              maupun khusus di Masjid Muhammad Al Qosim.
            </p>
          </div>
        </Container>
      </Section>

      {/* ==========================================================================
           BENTO GRID - 8 Kegiatan
         ========================================================================== */}
      <Section className="bg-muted/40">
        <Container>
          <SectionHeader
            eyebrow="Program Kami"
            title="Kegiatan & Program Terbaru"
            description="Ikuti perkembangan kegiatan di Masjid Muhammad Al Qosim."
          />

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {activities.map((act) => (
              <Card
                key={act.id}
                className="flex flex-col h-full border-border/60 shadow-none overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <Image
                  src={act.image}
                  alt={act.title}
                  width={400}
                  height={250}
                  sizes="(min-width: 1024px) 360px, 100vw"
                  className="h-24 md:h-32 w-full object-cover rounded-t-md"
                />

                <CardContent className="flex flex-col flex-1 p-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {act.title}
                  </span>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-foreground flex-1">
                    {act.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ==========================================================================
           TOMBOL NAVIGASI PENUTUP
         ========================================================================== */}
      <Section className="pt-8 pb-6">
        <Container className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-primary text-primary-foreground"
          >
            <Link href="/tentang-kami">
              Kembali ke Tentang Kami
            </Link>
          </Button>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full"
            >
              <Link href="/wakaf/peluang-jariyah">
                <Badge variant="accent" className="size-3.5">
                  <HeartHandshake className="size-3.5" />
                </Badge>
                Dukung Wakaf
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
