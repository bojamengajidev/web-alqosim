import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-1rem)] items-end overflow-hidden">
      <Image
        src="/images/viewdrone-2.webp"
        alt="Foto Masjid Muhammad Al Qosim diambil dari udara"
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/35 to-black/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.35)_100%)]" />

      <div className="container relative z-10 pb-20 pt-32 sm:pb-24 lg:pb-42">
        <div className="max-w-3xl">
          <Badge
            variant="outline"
            className="mb-6 border-white/25 bg-white/10 text-white backdrop-blur"
          >
            <Sparkles className="size-3.5 text-accent" />
            Masjid Muhammad Al Qosim · Boja
          </Badge>

          <h1 className="text-balance text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Menebarkan Sunnah Rasulullah ﷺ, Membangun Umat
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-sm leading-relaxed text-white/80 sm:text-base">
            Masjid Muhammad Al Qosim menjadi pusat pembinaan umat melalui
            dakwah dan pendidikan Islam berdasarkan Al-Qur&apos;an dan Sunnah.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-primary hover:bg-white/90"
            >
              <Link href="/tentang-kami">
                Selengkapnya
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white"
            >
              <Link href="/kegiatan">Lihat Kegiatan</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/70 sm:text-sm">
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-accent" />
              Boja, Kendal, Jawa Tengah
            </span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" />
            <span>Dakwah · Pendidikan · Sosial</span>
          </div>
        </div>
      </div>
    </section>
  );
}
