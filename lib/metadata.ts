import { siteConfig } from "@/lib/site.config";
import type { Metadata } from "next";

interface ContentMetadataOptions {
  title: string;
  description: string;
  slug: string;
  basePath: "posts" | "pages";
  image?: string | null;
}

export function generateContentMetadata({
  title,
  description,
  slug,
  basePath,
  image,
}: ContentMetadataOptions): Metadata {
  const ogUrl = new URL(`${siteConfig.site_domain}/api/og`);
  ogUrl.searchParams.append("title", title);
  ogUrl.searchParams.append("description", description);

  const imageUrl = image || ogUrl.toString();
  const ogImage = image
    ? { url: image, alt: title }
    : { url: ogUrl.toString(), width: 1200, height: 630, alt: title };

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${siteConfig.site_domain}/${basePath}/${slug}`,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
