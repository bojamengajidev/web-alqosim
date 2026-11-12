"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Play } from "lucide-react";

type YouTubeLiteProps = {
  videoId: string;
  title: string;
  poster: StaticImageData;
};

export default function YouTubeLite({
  videoId,
  title,
  poster,
}: YouTubeLiteProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
      <Image
        src={poster}
        alt=""
        fill
        loading="lazy"
        sizes="(min-width: 1024px) 896px, 100vw"
        className="object-cover"
      />

      <button
        type="button"
        onClick={() => setIsPlaying(true)}
        aria-label={`Putar video: ${title}`}
        className="group absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-white/95 text-primary shadow-lg transition-transform group-hover:scale-105 group-focus-visible:scale-105 sm:size-20">
          <Play className="ml-1 size-7 fill-current sm:size-8" />
        </span>
      </button>
    </div>
  );
}
