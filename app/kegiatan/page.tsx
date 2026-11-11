import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container, Section } from "@/components/craft";
import { SectionHeader } from "@/components/shared/section-header";
import { CalendarDays, HeartHandshake } from "lucide-react";

import {
  getPostsPaginated,
  pickImageUrl,
} from "@/lib/strapi";
import type { StrapiArticle } from "@/lib/strapi.d";

const ACTIVITIES_PER_PAGE = 8;

// Activity slugs that map to Strapi articles
const ACTIVITY_SLUGS = [
  "shalat-berjamaah",
  "shalat-jumat",
  "kajian-rutin",
  "madrasah-diniyah",
  "kelas-tahsin",
  "kelas-bahasa-arab",
  "tebar-qurban",
  "pendidikan-dini-sekolah-dasar",
];

export const metadata: Metadata = {
  title: "Kegiatan",
  description:
    "Lihat berbagai kegiatan, program, dan kegiatan rutin yang dilaksanakan di Masjid Muhammad Al Qosim dan Boja Mengaji.",
};

export const dynamic = "auto";
export const revalidate = 3600;

export default async function KegiatanPage() {
  // Fetch all activities from Strapi, filtering by known activity slugs
  const { data: posts, headers } = await getPostsPaginated(
    1,
    100, // Fetch enough to cover all activities
    {
      // We'll filter client-side by slug since Strapi doesn't have activity-specific filters
      search: "",
    }
  );

  const { total, totalPages } = headers;

  // Map Strapi articles to activity cards - filter by our known activity slugs
  const activities: Array<{
    id: string;
    title: string;
    description: string;
    image: string | null;
    slug: string;
  }> = [];

  if (posts) {
    for (const post of posts) {
      if (ACTIVITY_SLUGS.includes(post.slug)) {
        activities.push({
          id: post.slug,
          title: post.title || "Tanpa judul",
          description: post.excerpt || (post.content ? toPlainText(post.content) : ""),
          image: pickImageUrl(post.cover),
          slug: post.slug,
        });
      }
    }
  }

  // Fallback: if no activities found via slugs, try to get recent articles
  if (activities.length === 0) {
    const { data: fallbackPosts } = await getPostsPaginated(
      1,
      ACTIVITIES_PER_PAGE,
      { search: "" }
    );
    if (fallbackPosts) {
      for (const post of fallbackPosts) {
        activities.push({
          id: post.slug,
          title: post.title || "Tanpa judul",
          description: post.excerpt || (post.content ? toPlainText(post.content) : ""),
          image: pickImageUrl(post.cover),
          slug: post.slug,
        });
        if (activities.length >= ACTIVITIES_PER_PAGE) break;
      }
    }
  }

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
         BENTO GRID - Kegiatan dari Strapi API
       ========================================================================== */}
      <Section className="bg-muted/40">
        <Container>
          <SectionHeader
            eyebrow="Program Kami"
            title="Kegiatan & Program Terbaru"
            description="Ikuti perkembangan kegiatan di Masjid Muhammad Al Qosim."
          />

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {activities.length > 0 ? (
              activities.map((act) => (
                <Card
                  key={act.id}
                  className="flex flex-col h-full border-border/60 shadow-none overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <Image
                    src={act.image ?? "/images/program-wakaf.png"}
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
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <p>Tidak ada program saat ini</p>
                <p className="mt-2">Program akan segera diumumkan</p>
              </div>
            )}
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
              <Link href="/jadwal-kajian">
                <CalendarDays className="size-4" />
                Lihat Jadwal Kajian
              </Link>
            </Button>
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

// Helper function to convert HTML content to plain text
function toPlainText(value?: string | null): string {
  if (!value) return "";

  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/`{1,3}/g, "")
    .replace(/[*_>#~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}