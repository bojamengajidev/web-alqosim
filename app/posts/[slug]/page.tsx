import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, Tag, UserRound } from "lucide-react";

import BackButton from "@/components/back";
import { ArticleContent } from "@/components/content/blocks-renderer";
import { Article, Container, Section } from "@/components/craft";
import { Badge } from "@/components/ui/badge";

import { generateContentMetadata } from "@/lib/metadata";
import {
  blocksToPlainText,
  formatArticleDate,
  getAllArticleSlugs,
  getArticleBySlug,
  getStrapiMediaUrl,
  truncateText,
} from "@/lib/strapi";

export async function generateStaticParams() {
  return await getAllArticleSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  const description =
    article.seo?.metaDescription ||
    article.excerpt ||
    truncateText(blocksToPlainText(article.content), 32);

  return generateContentMetadata({
    title: article.seo?.metaTitle || article.title,
    description,
    slug: article.slug,
    basePath: "posts",
    image:
      getStrapiMediaUrl(article.seo?.shareImage) ??
      getStrapiMediaUrl(article.cover),
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { author, category, cover, tags } = article;
  const coverUrl = getStrapiMediaUrl(cover);
  const date = formatArticleDate(article.publishedAt ?? article.createdAt);

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

            {article.excerpt ? (
              <p className="text-base leading-relaxed text-muted-foreground">
                {article.excerpt}
              </p>
            ) : null}
          </header>

          {coverUrl ? (
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted">
              <Image
                src={coverUrl}
                alt={cover?.alternativeText || article.title}
                width={cover?.width || 1200}
                height={cover?.height || 800}
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="h-auto w-full object-cover"
              />
            </div>
          ) : null}

          <Article className="prose max-w-none">
            <ArticleContent content={article.content} />
          </Article>

          {tags && tags.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2 border-t border-border/60 pt-6">
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Tag className="size-3.5" />
                Tag
              </span>
              {tags.map((tag) => (
                <Link key={tag.documentId} href={`/posts?tag=${tag.slug}`}>
                  <Badge variant="secondary">{tag.name}</Badge>
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
