import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

/**
 * Strapi webhook handler for on-demand revalidation.
 *
 * Configure in Strapi admin:
 *   Settings → Webhooks → Create new webhook
 *   URL: https://masjidalqosim.com/api/revalidate
 *   Header: x-webhook-secret = STRAPI_WEBHOOK_SECRET
 *
 * Strapi sends a payload shaped like:
 *   { event, model, uid, entry, createdAt }
 */

interface StrapiWebhookPayload {
  event?: string;
  model?: string;
  uid?: string;
  entry?: {
    slug?: string;
    documentId?: string;
    publishedAt?: string | null;
  } | null;
}

const MODEL_TAGS: Record<string, string[]> = {
  article: ["articles"],
  category: ["categories", "articles"],
  tag: ["tags", "articles"],
  author: ["authors", "articles"],
  "jadwal-kajian": ["jadwal-kajian"],
};

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-webhook-secret");

  if (!secret || secret !== process.env.STRAPI_WEBHOOK_SECRET) {
    console.error("Invalid Strapi webhook secret");
    return NextResponse.json(
      { message: "Invalid webhook secret" },
      { status: 401 },
    );
  }

  let payload: StrapiWebhookPayload = {};

  try {
    payload = await request.json();
  } catch {
    // Strapi may send an empty body on manual test.
  }

  const model = payload.model ?? "";
  const slug = payload.entry?.slug;

  try {
    revalidateTag("strapi", { expire: 0 });

    for (const tag of MODEL_TAGS[model] ?? []) {
      revalidateTag(tag, { expire: 0 });
    }

    if (slug) {
      revalidateTag(`article:${slug}`, { expire: 0 });
    }

    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      event: payload.event ?? null,
      model: model || null,
      slug: slug ?? null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error revalidating Strapi content:", error);

    return NextResponse.json(
      {
        revalidated: false,
        message: "Failed to revalidate content",
        error: (error as Error).message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
