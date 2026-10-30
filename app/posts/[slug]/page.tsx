import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, UserRound } from "lucide-react";

import BackButton from "@/components/back";
import { Article, Container, Section } from "@/components/craft";
import { Badge } from "@/components/ui/badge";

import { generateContentMetadata, stripHtml } from "@/lib/metadata";
import { getAllPostSlugs, getPostBySlug } from "@/lib/wordpress";

export async function generateStaticParams() {
  return await getAllPostSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return generateContentMetadata({
    title: stripHtml(post.title.rendered),
    description: stripHtml(post.excerpt.rendered),
    slug: post.slug,
    basePath: "posts",
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Ambil data dari embed agar tidak perlu fetch ulang.
  const author = post._embedded?.author?.[0];
  const terms = post._embedded?.["wp:term"] ?? [];
  const categories =
    terms.find((group) => group[0]?.taxonomy === "category") ?? [];
  const category = categories[0];
  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];

  const date = new Date(post.date).toLocaleDateString("id-ID", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Section>
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <BackButton />

          <header className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {category ? (
                <Link href={`/posts?category=${category.id}`}>
                  <Badge variant="soft">{category.name}</Badge>
                </Link>
              ) : null}
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarDays className="size-3.5" />
                {date}
              </span>
              {author ? (
                <Link
                  href={`/posts?author=${author.id}`}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <UserRound className="size-3.5" />
                  {author.name}
                </Link>
              ) : null}
            </div>

            <h1
              className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </header>

          {featuredMedia?.source_url ? (
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted">
              <img
                src={featuredMedia.source_url}
                alt={stripHtml(post.title.rendered)}
                className="h-auto w-full object-cover"
              />
            </div>
          ) : null}

          <Article
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          <div className="border-t border-border/60 pt-6">
            <BackButton />
          </div>
        </div>
      </Container>
    </Section>
  );
}
