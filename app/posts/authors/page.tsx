import type { Metadata } from "next";

import { ArchiveList } from "@/components/archive-list";
import { getAllAuthors } from "@/lib/wordpress";
import type { Author } from "@/lib/wordpress.d";

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
    <ArchiveList<Author>
      eyebrow="Blog"
      title="Semua Penulis"
      description="Kenali para penulis yang berkontribusi di blog kami."
      items={authors}
      getItemHref={(a) => `/posts?author=${a.id}`}
      getItemLabel={(a) => a.name}
      emptyMessage="Penulis akan tampil di sini setelah tersedia."
    />
  );
}
