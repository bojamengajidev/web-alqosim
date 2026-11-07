import type { Metadata } from "next";

import { ArchiveList } from "@/components/archive-list";
import { getAllAuthors } from "@/lib/strapi";
import type { StrapiAuthor } from "@/lib/strapi.d";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Semua Penulis",
  description: "Jelajahi penulis artikel blog Masjid Muhammad Al Qosim.",
  alternates: {
    canonical: "/posts/authors",
  },
};

export default async function Page() {
  const authors = await getAllAuthors();

  return (
    <ArchiveList<StrapiAuthor>
      eyebrow="Blog"
      title="Semua Penulis"
      description="Kenali para penulis yang berkontribusi di blog kami."
      items={authors}
      getItemHref={(a) => `/posts?author=${a.slug}`}
      getItemLabel={(a) => a.name}
      emptyMessage="Penulis akan tampil di sini setelah tersedia."
    />
  );
}
