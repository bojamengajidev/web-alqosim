import type { Metadata } from "next";

import { ArchiveList } from "@/components/archive-list";
import { getAllTags } from "@/lib/wordpress";
import type { Tag } from "@/lib/wordpress.d";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Semua Tag",
  description: "Jelajahi tag artikel blog Masjid Muhammad Al Qosim.",
  alternates: {
    canonical: "/posts/tags",
  },
};

export default async function Page() {
  const tags = await getAllTags();

  return (
    <ArchiveList<Tag>
      eyebrow="Blog"
      title="Semua Tag"
      description="Temukan artikel berdasarkan topik yang Anda minati."
      items={tags}
      getItemHref={(t) => `/posts?tag=${t.id}`}
      getItemLabel={(t) => t.name}
      emptyMessage="Tag akan tampil di sini setelah tersedia."
    />
  );
}
