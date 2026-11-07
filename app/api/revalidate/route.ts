import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

/**
 * Strapi webhook handler for content revalidation.
 *
 * Configure in Strapi Admin -> Settings -> Webhooks:
 *   URL: https://<your-site>/api/revalidate
 *   Header: x-webhook-secret: <STRAPI_WEBHOOK_SECRET>
 *   Events: entry.create, entry.update, entry.delete, entry.publish, entry.unpublish
 *   Content types: article, category, tag, author
 */

interface StrapiWebhookPayload {
  event?: string;
  model?: string;
  uid?: string;
  entry?: {
    id?: number;
    documentId?: string;
    slug?: string;
  } | null;
}

const MODEL_TAGS: Record<string, string[]> = {
  article: ["articles"],
  category: ["categories", "articles"],
  tag: ["tags", "articles"],
  author: ["authors", "articles"],
};

export async function POST(request: NextRequest) {
  try {
    const secret =
      request.headers.get("x-webhook-secret") ??
      request.nextUrl.searchParams.get("secret");
    const expectedSecret = process.env.STRAPI_WEBHOOK_SECRET;

    if (!expectedSecret || secret !== expectedSecret) {
      console.error("Invalid webhook secret");
      return NextResponse.json(
        { message: "Invalid webhook secret" },
        { status: 401 },
      );
    }

    const body = (await request
      .json()
      .catch(() => ({}))) as StrapiWebhookPayload;

    const model = (
      body.model ||
      body.uid?.split(".").pop() ||
      ""
    ).toLowerCase();
    const slug = body.entry?.slug;

    revalidateTag("strapi", { expire: 0 });

    const tags = MODEL_TAGS[model] ?? ["articles"];
    for (const tag of tags) {
      revalidateTag(tag, { expire: 0 });
    }

    if (model === "article" && slug) {
      revalidateTag(`article-${slug}`, { expire: 0 });
      revalidatePath(`/posts/${slug}`);
    }

    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      event: body.event ?? null,
      model: model || null,
      slug: slug ?? null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      {
        revalidated: false,
        message: "Error revalidating content",
        error: (error as Error).message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
