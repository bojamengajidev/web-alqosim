import {
  BookOpen,
  CalendarCheck,
  HandCoins,
  Heart,
  Moon,
  Sparkles,
  Sunrise,
  Users,
} from "lucide-react";

import { Container, Section } from "@/components/craft";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: BookOpen,
    title: "Belajar Al-Qur'an",
    description: "Tahsin, belajar tajwid, dan mentadaburi maknanya.",
  },
  {
    icon: Sparkles,
    title: "Shalat Sunnah Setelah Wudhu",
    description: "Dua rakaat shalat sunnah setelah berwudhu.",
  },
  {
    icon: Heart,
    title: "Dzikir Pagi Petang",
    description: "Membaca dzikir pada waktu pagi dan petang.",
  },
  {
    icon: Sunrise,
    title: "Shalat Dhuha",
    description: "Dua rakaat shalat sunnah di waktu dhuha.",
  },
  {
    icon: CalendarCheck,
    title: "Puasa Sunnah",
    description: "Puasa Senin–Kamis dan Ayyamul Bidh.",
  },
  {
    icon: HandCoins,
    title: "Sedekah",
    description: "Berinfaq dan bersedekah dengan harta.",
  },
  {
    icon: Moon,
    title: "Shalat Rawatib",
    description: "Shalat sunnah yang mengiringi shalat wajib.",
  },
  {
    icon: Users,
    title: "Ukhuwah",
    description: "Menjaga silaturahmi dan kebersamaan jamaah.",
  },
];

export default function AmalanSection() {
  return (
    <Section className="bg-muted/40">
      <Container>
        <SectionHeader
          align="center"
          eyebrow="Amalan Sunnah"
          title="Menjaga amal, menyempurnakan ibadah"
          description="Semoga Allah Ta'ala memudahkan kita untuk memperhatikan amal ibadah sunnah setelah menyempurnakan ibadah yang wajib."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group h-full border-border/60 bg-card/80 shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-sm"
            >
              <CardContent className="flex h-full flex-col gap-3 p-5">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="size-5" />
                </span>
                <span className="text-sm font-semibold leading-snug text-foreground">
                  {feature.title}
                </span>
                <span className="text-xs leading-relaxed text-muted-foreground">
                  {feature.description}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
