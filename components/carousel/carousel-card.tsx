// import Image from "next/image";
import Link from "next/link";

import { Post } from "@/lib/wordpress.d";
import { cn } from "@/lib/utils";
import { truncateHtml } from "@/lib/metadata";

export function CarouselCard({ post }: { post: Post }) {
  // Use embedded data instead of separate API calls
  const media = post._embedded?.["wp:featuredmedia"]?.[0] ?? null;
 

  return (
    <Link
  href={`/posts/${post.slug}`}
  className={cn(
    
    "h-full flex flex-col", // 👈 penting
    "min-w-65 max-w-65", // 👈 penting
    "border p-4 bg-accent/30 rounded-xl",
    "hover:bg-accent/75 transition"
  )}
>

      <div className="flex flex-col gap-4 flex-1">
      <div className="relative w-full aspect-video overflow-hidden rounded-md border bg-muted">
  {media?.source_url ? (
    <img
      src={media.source_url}
      alt={post.title?.rendered || "Post thumbnail"}
      className="absolute inset-0 h-full w-full object-cover"
    />
  ) : (
    <div className="flex h-full items-center justify-center text-muted-foreground">
      No image
    </div>
  )}
</div>

        <div
           dangerouslySetInnerHTML={{ __html: post.title.rendered }}
  className="text-lg font-semibold line-clamp-2"
        ></div>
        <div className="text-sm text-muted-foreground line-clamp-3">
          {post.excerpt?.rendered
            ? truncateHtml(post.excerpt.rendered, 12)
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