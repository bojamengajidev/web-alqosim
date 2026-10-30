import { BookOpen, GraduationCap, HandCoins, Users } from "lucide-react";

import { Container, Section } from "@/components/craft";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent } from "@/components/ui/card";

import BlogCard from "./blog-card";

const features = [
  {
    icon: BookOpen,
    title: "Kajian",
    description: "Majelis ilmu syar'i untuk menambah pemahaman agama.",
  },
  {
    icon: GraduationCap,
    title: "Pendidikan",
    description: "Lembaga Pendidikan Islam dengan kurikulum yang terarah.",
  },
  {
    icon: Users,
    title: "Komunitas",
    description: "Merajut ukhuwah Islamiyah antar jamaah dan keluarga.",
  },
  {
    icon: HandCoins,
    title: "Sosial",
    description: "Program sosial kemasyarakatan dan kepedulian umat.",
  },
];

export default function ProgramsSection() {
  return (
    <Section>
      <Container>
        {/* <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"> */}
          <div>
            <SectionHeader
              eyebrow="Boja Mengaji"
              title="Ruang tumbuh untuk ilmu, iman, dan ukhuwah"
              description="Kami berfokus memberikan kontribusi terbaik bagi kaum muslimin melalui kajian, pendidikan, komunitas, dan program sosial."
            />

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="group border-border/60 shadow-none transition-colors hover:border-primary/30 hover:bg-primary/3"
                >
                  <CardContent className="flex gap-4 p-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <feature.icon className="size-5" />
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-sm font-semibold text-foreground">
                        {feature.title}
                      </span>
                      <span className="text-xs leading-relaxed text-muted-foreground">
                        {feature.description}
                      </span>
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

         
        {/* </div> */}
      </Container>
    </Section>
  );
}
