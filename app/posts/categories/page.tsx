import type { Metadata } from "next";

import { ArchiveList } from "@/components/archive-list";
import { getAllCategories } from "@/lib/strapi";
import type { Category } from "@/lib/strapi.d";

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
      getItemHref={(c) => `/posts?category=${c.slug}`}
      getItemLabel={(c) => c.name}
      emptyMessage="Kategori akan tampil di sini setelah tersedia."
    />
  );
}
