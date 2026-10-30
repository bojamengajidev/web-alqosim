import type { Metadata } from "next";

import { ArchiveList } from "@/components/archive-list";
import { stripHtml } from "@/lib/metadata";
import { getAllPages } from "@/lib/wordpress";
import type { Page as WPPage } from "@/lib/wordpress.d";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Semua Halaman",
  description: "Jelajahi seluruh halaman situs Masjid Muhammad Al Qosim.",
  alternates: {
    canonical: "/pages",
  },
};

export default async function Page() {
  const pages = await getAllPages();

  return (
    <ArchiveList<WPPage>
      eyebrow="Halaman"
      title="Semua Halaman"
      description="Jelajahi seluruh halaman situs Masjid Muhammad Al Qosim dan Boja Mengaji."
      items={pages}
      getItemHref={(p) => `/${p.slug}`}
      getItemLabel={(p) => stripHtml(p.title.rendered)}
      emptyMessage="Halaman akan tampil di sini setelah dipublikasikan."
    />
  );
}
