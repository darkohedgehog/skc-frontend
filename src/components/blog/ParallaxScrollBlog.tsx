"use client";

import Image from "next/image";

type GalleryItem = { url: string; formats?: { medium?: { url: string } } };

export function ParallaxScrollBlog({
  gallery,
  onImageClick,
}: {
  gallery: GalleryItem[];
  onImageClick?: (index: number) => void;
}) {
  if (!gallery || gallery.length === 0) return null;

  const images = gallery.map((image) => ({
    src: `${process.env.NEXT_PUBLIC_BASE_URL}${image.formats?.medium?.url || image.url}`,
  }));

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((img, idx) => (
        <button
          key={img.src}
          type="button"
          onClick={() => onImageClick?.(idx)}
          className="group relative overflow-hidden rounded-2xl border border-gray/20 bg-white/40 dark:bg-black/10 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
          aria-label="Otvori sliku"
        >
          <div className="relative h-32 md:h-40">
            <Image
              src={img.src}
              alt="gallery"
              fill
              priority
              loading="eager"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(min-width: 768px) 25vw, 50vw"
            />
          </div>
        </button>
      ))}
    </div>
  );
}