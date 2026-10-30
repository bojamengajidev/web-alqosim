import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  HeartHandshake,
  MapPin,
  MessageCircle,
  Users,
  Youtube,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container, Section } from "@/components/craft";
import { SectionHeader } from "@/components/shared/section-header";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Tentang Masjid Muhammad Al Qosim dan Boja Mengaji — pusat dakwah, pendidikan, dan kehidupan komunal di Boja, Kendal.",
};

/* ==========================================================================
   CONTENT — SEMUA DIATAS DI SINI (STATIC, TANPA WORDPRESS)
   ========================================================================== */

const intro = {
  badge: "Tentang Kami",
  title: "Masjid Muhammad Al Qosim",
  subtitle: "Boja Mengaji",
  paragraph:
    "Masjid Muhammad Al Qosim adalah Tempat ibadah, pusat dakwah, dan pendidikan bagi umat di Boja, Kendal, Jawa Tengah. Kami hadir sebagai ruang lahirnya semangat Al-Qur'an dan Sunnah, tempat nilai-nilai agama diterjemahkan menjadi kehidupan bermakna bagi umat.",
};

const profileItems = [
  {
    icon: MapPin,
    label: "Alamat",
    value: "Boja, Kendal, Jawa Tengah",
  },
  {
    icon: CalendarDays,
    label: "Tahun Berdiri",
    value: "2026",
  },
  {
    icon: Users,
    label: "Luas Lahan",
    value: "± 1.000 m²",
  },
  {
    icon: BookOpen,
    label: "Pengelola",
    value: "Yayasan Kajian Boja Mengaji",
  },
];

const vision = {
  title: "Visi",
  text: "Membangun masyarakat muslimin Boja yang berpegang teguh kepada Al-Qur'an dan Sunnah, memiliki ilmu, dan menjalankan ibadah dengan khusyu’.",
};

const missions = [
  "Menyebarkan dakwah melalui kajian rutin, ceramah, dan kegiatan keagamaan.",
  "Menyediakan pendidikan Islam yang bermutu, mulai dari PAUD hingga sekolah dasar.",
  "Mengembangkan kehidupan komunal Islamiyah melalui ukhuwah dan persaudaraan.",
  "Menjaga amalan jariyah melalui sedekah, wakaf, dan bantuan sosial.",
];

const timeline = [
  {
    year: "Awal Pembangunan",
    title: "Rencana & Pembangunan",
    description:
      "Awal mula pembangunan kompleks masjid di Boja, Kendal sebagai pusat dakwah dan pendidikan umat.",
  },
  {
    year: "Pembangunan Masjid",
    title: "Inisiatif Pembangunan",
    description:
      "Pembangunan fisik Masjid Muhammad Al Qosim dilaksanakan secara bertahap hingga siap digunakan.",
  },
  {
    year: "Operasional",
    title: "Kegiatan Berjalan",
    description:
      "Berjalannya kajian rutin, ibadah, pendidikan Islam, dan kegiatan sosial di kompleks masjid.",
  },
  {
    year: "Siaran Daring",
    title: "Live Streaming",
    description:
      "Siaran kajian secara daring melalui YouTube Boja Mengaji hadir sebagai kelanjutan dakwah.",
  },
];

const leaders = [
  {
    initials: "YK",
    name: "Yayasan Kajian Boja Mengaji",
    position: "Pengurus & Pengelola Masjid",
  },
  {
    initials: "PM",
    name: "Pengurus Operasional",
    position: "Pengurus Masjid Muhammad Al Qosim",
  },
  {
    initials: "PD",
    name: "Pengurus Dakwah",
    position: "Koordinator Bidang Dakwah",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ==========================================================================
           PEMBUKA — Judul + Paragraf Singkat
         ========================================================================== */}
      <Section className="pb-0">
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <Badge variant="accent">{intro.badge}</Badge>

            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {intro.title}
              </h1>
              <p className="font-display text-xl font-semibold text-primary sm:text-2xl">
                {intro.subtitle}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              {intro.paragraph}
            </p>
          </div>
        </Container>
      </Section>

      {/* ==========================================================================
           PROFIL SINGKAT — Alamat, Tahun Berdiri, Kapasitas, Pengelola
         ========================================================================== */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Profil Singkat"
            title="Data awal masjid"
            description="Berikut profil singkat dari Masjid Muhammad Al Qosim dan Boja Mengaji."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {profileItems.map((item) => (
              <Card
                key={item.label}
                className="border-border/60 bg-card shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
              >
                <CardContent className="flex items-start gap-4 p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="size-5" />
                  </span>
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {item.value}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ==========================================================================
           VISI DAN MISI
         ========================================================================== */}
      <Section className="bg-muted/40">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Visi & Misi"
            title="Arah & Tujuan Kami"
            description="Kami bergerak dengan visi yang jelas dan misi yang terarah."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Card className="overflow-hidden border-border/60 shadow-soft">
              <CardContent className="flex flex-col gap-4 p-6 sm:p-8">
                <Badge variant="accent">Visi</Badge>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                  {vision.title}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {vision.text}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/60 shadow-soft">
              <CardContent className="flex flex-col gap-4 p-6 sm:p-8">
                <Badge variant="soft">Misi</Badge>
                <ul className="flex flex-col gap-3">
                  {missions.map((mission, index) => (
                    <li
                      key={mission}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base"
                    >
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        {index + 1}
                      </span>
                      <span>{mission}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ==========================================================================
           PERJALANAN KAMI — Timeline
         ========================================================================== */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Perjalanan Kami"
            title="Dari Awal Pembangunan Hingga Siaran Daring"
            description="Narahawan perjalanan Masjid Muhammad Al Qosim hingga hadirnya siaran daring Boja Mengaji."
          />

          <div className="relative mx-auto mt-12 max-w-3xl pl-8">
            <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />

            <ol className="flex flex-col gap-10">
              {timeline.map((item) => (
                <li key={item.title} className="relative">
                  <span className="-left-6 top-1 absolute size-4 rounded-full border-4 border-background bg-primary" />

                  <Badge variant="soft">{item.year}</Badge>
                  <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* ==========================================================================
           PENGGRUS — Kartu Nama & Jabatan
         ========================================================================== */}
      <Section className="bg-muted/40">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Pengurus"
            title="Pengurus & Pengelola"
            description="Kenali pengurus yang menjaga kelangsungan masjid, dakwah, dan pendidikan di Boja."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {leaders.map((leader) => (
              <Card
                key={leader.name}
                className="border-border/60 bg-card text-center shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md"
              >
                <CardContent className="flex flex-col items-center gap-3 p-6">
                  <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 font-display text-2xl font-semibold text-primary">
                    {leader.initials}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-semibold text-foreground">
                      {leader.name}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {leader.position}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ==========================================================================
           PENUTUP — Alamat, Kontak, Tombol ke Kegiatan & Wakaf
         ========================================================================== */}
      <Section>
        <Container>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <Badge variant="accent">Kontak & Aksi</Badge>

            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Mari Berkontribusi & Berkunjung
            </h2>

            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Kami selalu terbuka untuk kehadiran jamaah, relawan, dan teman
              baik yang ingin belajar, mengunjungi, atau mendukung misi masjid
              melalui wakaf jariyah.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/kegiatan">
                  Lihat Kegiatan
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full"
              >
                <Link href="/wakaf/peluang-jariyah">
                  <HeartHandshake className="size-4" />
                  Dukung Wakaf
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5 text-primary" />
                Boja, Kendal, Jawa Tengah
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MessageCircle className="size-3.5 text-primary" />
                WhatsApp Admin
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Youtube className="size-3.5 text-primary" />
                YouTube Boja Mengaji
              </span>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
