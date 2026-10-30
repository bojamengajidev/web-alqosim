import type { Metadata } from "next";

import Hero from "@/components/hero/hero";
import QuickInfo from "@/components/section/quick-info";
import ProgramsSection from "@/components/masjid/blog-section";
import CalendarAndHadith from "@/components/section/sub-section";
import AmalanSection from "@/components/masjid/feature-section";
import MediaSection from "@/components/section/media-section";
import DonasiSection from "@/components/section/donasi-section";
import ArticlesSection from "@/components/section/articles-section";
import ClosingHadith from "@/components/section/amalan-section";

export const metadata: Metadata = {
  title: { absolute: "Masjid Muhammad Al Qosim | Boja Mengaji" },
  description:
    "Masjid Muhammad Al Qosim di Kecamatan Boja sebagai pusat dakwah dan pendidikan Islam.",
};

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Hero />
      <QuickInfo />
      <ProgramsSection />
      <CalendarAndHadith />
      <AmalanSection />
      <MediaSection />
      <DonasiSection />
      <ArticlesSection />
      <ClosingHadith />
    </>
  );
}
