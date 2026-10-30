import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageCircle, Youtube } from "lucide-react";

import { Container, Section } from "@/components/craft";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { contentMenu, mainMenu } from "@/lib/menu.config";
import { siteConfig } from "@/lib/site.config";

import Alqosim from "@/public/icons/alqosim-logo.ico";
import Logo from "@/public/icons/bojamengaji.ico";
import YKBM from "@/public/icons/ykbm-logo.ico";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div className="flex flex-col gap-5">
              <Link
                href="/"
                aria-label="Beranda Masjid Muhammad Al Qosim"
                className="flex items-center gap-3"
              >
                <span className="flex items-center gap-2">
                  <Image
                    src={Alqosim}
                    alt="Logo Masjid Muhammad Al Qosim"
                    width={96}
                height={96}
                className="w-12 h-auto"
                  />
                  <Image
                    src={YKBM}
                    alt="Logo Yayasan Kajian Boja Mengaji"
                    width={96}
                height={96}
                className="w-16 h-auto"
                  />
                  <Image
                    src={Logo}
                    alt="Logo Boja Mengaji"
                   width={96}
                height={96}
                className="w-20 h-auto"
                  />
                </span>
              </Link>

              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                {siteConfig.site_description}. Pusat dakwah, pendidikan, dan
                pembinaan umat berdasarkan Al-Qur&apos;an dan Sunnah.
              </p>

              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4 shrink-0 text-primary" />
                  Boja, Kendal, Jawa Tengah
                </span>
              </div>
            </div>

            <FooterColumn title="Website" items={mainMenu} />
            <FooterColumn title="Blog" items={contentMenu} />

            <div className="flex flex-col gap-4 text-sm">
              <h2 className="text-sm font-semibold text-foreground">Terhubung</h2>
              <div className="flex flex-col gap-2 text-muted-foreground">
                <Link
                  href="https://www.youtube.com/@bojamengaji"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Youtube className="size-4 text-primary" />
                  YouTube Boja Mengaji
                </Link>
                <Link
                  href="https://api.whatsapp.com/send/?phone=6285156245768&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <MessageCircle className="size-4 text-primary" />
                  WhatsApp Admin
                </Link>
              </div>

              <Button asChild variant="outline" size="sm" className="mt-2 w-fit rounded-full">
                <Link href="/wakaf/peluang-jariyah">Dukung Wakaf</Link>
              </Button>
            </div>
          </div>

          <Separator className="my-10" />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} {siteConfig.site_name}. Seluruh
              hak dilindungi.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">
                Dikembangkan Oleh AHSAN CREATIVE
              </span>
            </div>
          </div>
        </Container>
      </Section>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: Record<string, string>;
}) {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <div className="flex flex-col gap-2 text-muted-foreground">
        {Object.entries(items).map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="w-fit transition-colors hover:text-foreground"
          >
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </Link>
        ))}
      </div>
    </div>
  );
}
