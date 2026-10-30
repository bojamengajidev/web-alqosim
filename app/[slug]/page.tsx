import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BackButton from "@/components/back";
import { Article, Container, Section } from "@/components/craft";

import { stripHtml } from "@/lib/metadata";
import { getPageBySlug } from "@/lib/wordpress";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {};
  }

  return {
    title: stripHtml(page.title.rendered),
    description: stripHtml(page.excerpt?.rendered || ""),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <Section>
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <BackButton />

          <header className="flex flex-col gap-3 border-b border-border/60 pb-6">
            <h1
              className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl"
              dangerouslySetInnerHTML={{ __html: page.title?.rendered || "" }}
            />
            {page.excerpt?.rendered ? (
              <p className="text-base leading-relaxed text-muted-foreground">
                {stripHtml(page.excerpt.rendered)}
              </p>
            ) : null}
          </header>

          <Article
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: page.content?.rendered || "",
            }}
          />
        </div>
      </Container>
    </Section>
  );
}
