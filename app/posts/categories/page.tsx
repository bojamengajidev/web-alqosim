import type { Metadata } from "next";

import { ArchiveList } from "@/components/archive-list";
import { getAllCategories } from "@/lib/wordpress";
import type { Category } from "@/lib/wordpress.d";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Semua Kategori",
  description: "Jelajahi kategori artikel blog Masjid Muhammad Al Qosim.",
  alternates: {
    canonical: "/posts/categories",
  },
};

export default async function Page() {
  const categories = await getAllCategories();

  return (
    <ArchiveList<Category>
      eyebrow="Blog"
      title="Semua Kategori"
      description="Pilih kategori untuk menemukan artikel yang sesuai."
      items={categories}
      getItemHref={(c) => `/posts?category=${c.id}`}
      getItemLabel={(c) => c.name}
      emptyMessage="Kategori akan tampil di sini setelah tersedia."
    />
  );
}
