import Link from "next/link";
import { ArrowLeft, BookOpen, Home, MapPin } from "lucide-react";

import { Container, Section } from "@/components/craft";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section>
      <Container>
        <div className="mx-auto flex min-h-[55vh] max-w-2xl flex-col items-center justify-center gap-6 text-center">
          <Badge variant="soft">404</Badge>

          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Halaman tidak ditemukan
          </h1>

          <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Maaf, halaman yang Anda cari mungkin sudah dipindahkan atau tidak
            pernah ada. Silakan kembali ke beranda atau jelajahi artikel kami.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full">
              <Link href="/">
                <Home className="size-4" />
                Kembali ke Beranda
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/posts">
                <BookOpen className="size-4" />
                Baca Artikel
              </Link>
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5 text-primary" />
              Boja, Kendal
            </span>
            <Link
              href="/kegiatan"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              Lihat kegiatan
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
