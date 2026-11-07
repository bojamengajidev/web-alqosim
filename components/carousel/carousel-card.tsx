import Link from "next/link";

import { pickImageUrl, toPlainText, truncateText } from "@/lib/strapi";
import type { StrapiArticle } from "@/lib/strapi.d";
import { cn } from "@/lib/utils";

export function CarouselCard({ post }: { post: StrapiArticle }) {
  const media = pickImageUrl(post.cover);

  return (
    <Link
      href={`/posts/${post.slug}`}
      className={cn(
        "h-full flex flex-col", // 👈 penting
        "min-w-65 max-w-65", // 👈 penting
        "border p-4 bg-accent/30 rounded-xl",
        "hover:bg-accent/75 transition",
      )}
    >
      <div className="flex flex-col gap-4 flex-1">
        <div className="relative w-full aspect-video overflow-hidden rounded-md border bg-muted">
          {media ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={media}
              alt={post.cover?.alternativeText || post.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </div>

        <div className="text-lg font-semibold line-clamp-2">{post.title}</div>
        <div className="text-sm text-muted-foreground line-clamp-3">
          {toPlainText(post.excerpt)
            ? truncateText(toPlainText(post.excerpt), 12)
            : "No excerpt available"}
        </div>
      </div>

      <div className="pt-4 border-t flex justify-between text-xs mt-auto">
        <hr />
        <div className="flex justify-between items-center text-xs">
          <p>Baca Selengkapnya</p>
        </div>
      </div>
    </Link>
  );
}
