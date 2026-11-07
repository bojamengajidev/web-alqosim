import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, UserRound } from "lucide-react";

import BackButton from "@/components/back";
import { RichText } from "@/components/content/rich-text";
import { Container, Section } from "@/components/craft";
import { Badge } from "@/components/ui/badge";

import { generateContentMetadata } from "@/lib/metadata";
import {
  getAllPostSlugs,
  getPostBySlug,
  pickImageUrl,
  toPlainText,
} from "@/lib/strapi";

export const revalidate = 3600;

export async function generateStaticParams() {
  return await getAllPostSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPostBySlug(slug);

  if (!article) {
    return {};
  }

  const title = article.seo?.metaTitle || article.title;
  const description =
    article.seo?.metaDescription ||
    toPlainText(article.excerpt) ||
    toPlainText(article.content).slice(0, 160);

  return generateContentMetadata({
    title,
    description,
    slug: article.slug,
    basePath: "posts",
    image:
      pickImageUrl(article.seo?.shareImage) ?? pickImageUrl(article.cover),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getPostBySlug(slug);

  if (!article) {
    notFound();
  }

  const { author, category } = article;
  const tags = article.tags ?? [];
  const cover = pickImageUrl(article.cover);

  const date = new Date(article.publishedAt).toLocaleDateString("id-ID", {
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
                <Link href={`/posts?category=${category.slug}`}>
                  <Badge variant="soft">{category.name}</Badge>
                </Link>
              ) : null}
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <CalendarDays className="size-3.5" />
                {date}
              </span>
              {author ? (
                <Link
                  href={`/posts?author=${author.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <UserRound className="size-3.5" />
                  {author.name}
                </Link>
              ) : null}
            </div>

            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {article.title}
            </h1>
          </header>

          {cover ? (
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cover}
                alt={article.cover?.alternativeText || article.title}
                className="h-auto w-full object-cover"
              />
            </div>
          ) : null}

          <RichText content={article.content} />

          {tags.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2 border-t border-border/60 pt-6">
              {tags.map((tag) => (
                <Link key={tag.documentId} href={`/posts?tag=${tag.slug}`}>
                  <Badge variant="secondary">#{tag.name}</Badge>
                </Link>
              ))}
            </div>
          ) : null}

          <div className="border-t border-border/60 pt-6">
            <BackButton />
          </div>
        </div>
      </Container>
    </Section>
  );
}
