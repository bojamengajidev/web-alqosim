import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { stripHtml, truncateHtml } from "@/lib/metadata";
import type { Post } from "@/lib/wordpress.d";

export function PostCard({ post }: { post: Post }) {
  const media = post._embedded?.["wp:featuredmedia"]?.[0] ?? null;
  const category = post._embedded?.["wp:term"]?.[0]?.[0] ?? null;

  const title = stripHtml(post.title?.rendered || "Tanpa judul");
  const excerpt = post.excerpt?.rendered
    ? truncateHtml(post.excerpt.rendered, 18)
    : "Belum ada ringkasan untuk artikel ini.";

  const date = new Date(post.date).toLocaleDateString("id-ID", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={`/posts/${post.slug}`} className="group block h-full">
      <Card className="flex h-full flex-col overflow-hidden border-border/60 shadow-none transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary/25 group-hover:shadow-md">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
          {media?.source_url ? (
            <img
              src={media.source_url}
              alt={title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
              Gambar belum tersedia
            </div>
          )}

          {category ? (
            <Badge
              variant="secondary"
              className="absolute left-3 top-3 bg-background/90 backdrop-blur"
            >
              {category.name}
            </Badge>
          ) : null}
        </div>

        <CardHeader className="gap-2 p-5 pb-3">
          <CardTitle className="text-lg leading-snug transition-colors group-hover:text-primary">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-3">
            {excerpt}
          </CardDescription>
        </CardHeader>

        <CardFooter className="mt-auto justify-between border-t border-border/60 p-5 pt-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            {date}
          </span>
          <span className="inline-flex items-center gap-1 font-medium text-primary">
            Baca
            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
