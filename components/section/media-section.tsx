import Link from "next/link";
import { Youtube } from "lucide-react";

import { Container, Section } from "@/components/craft";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";


export default function MediaSection() {
  return (
    <Section>
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Media"
          title="Taman-taman surga"
          description="Ikuti channel kami untuk mendapatkan pembaruan konten kajian rutin dan siaran langsung dari Boja Mengaji."
        />
        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-xl border border-border/60 shadow-soft">
          <iframe
            className="w-full aspect-video rounded-xl"
            src="https://www.youtube-nocookie.com/embed/c0GkhImWPao"
            loading="lazy"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <div className="mt-8 flex justify-center">
          <Button asChild className="rounded-full">
            <Link
              href="https://www.youtube.com/@bojamengaji"
              target="_blank"
              rel="noreferrer"
            >
              <Youtube className="size-4" />
              Subscribe Boja Mengaji
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
