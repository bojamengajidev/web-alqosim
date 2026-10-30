import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Section } from "@/components/craft";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/posts/post-card";

import { getRecentPosts } from "@/lib/wordpress";

export default async function ArticlesSection() {
  const posts = await getRecentPosts();
  const latestPosts = posts.slice(0, 3);

  if (latestPosts.length === 0) {
    return null;
  }

  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Artikel"
            title="Kabar & ilmu terbaru"
            description="Baca artikel dan berita terbaru seputar kegiatan, kajian, dan informasi dari Masjid Muhammad Al Qosim dan Boja Mengaji."
          />

          <Button
            asChild
            variant="outline"
            className="w-fit rounded-full"
          >
            <Link href="/posts">
              Semua Artikel
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
