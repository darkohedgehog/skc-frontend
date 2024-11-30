"use client";

import { ParallaxScroll } from "../ui/parallax-scroll";

export function ParallaxScrollBlog({ gallery }: { gallery: { url: string; formats?: { medium?: { url: string } } }[] }) {
  if (!gallery || gallery.length === 0) {
    return null; // Opcionalno: prikažite poruku "Nema slika"
  }

  // Transform the gallery into an array of URLs
  const images = gallery.map((image) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}${image.formats?.medium?.url || image.url}`
  );

  return <ParallaxScroll images={images} />;
}
