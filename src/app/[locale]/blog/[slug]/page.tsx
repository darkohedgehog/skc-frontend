"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { BlogSlugType } from "../../../../../types";
import { ParallaxScrollBlog } from "@/components/blog/ParallaxScrollBlog";

import { IoReturnDownBackOutline, IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FiCalendar } from "react-icons/fi";

async function fetchBlogBySlug(slug: string, locale: string): Promise<BlogSlugType | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?filters[slug][$eq]=${slug}&locale=${locale}&populate=*`
    );
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();
    return data.data?.[0] || null;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

type LightboxState = {
  open: boolean;
  index: number;
  images: string[];
  alt?: string;
};

const BlogDetail = () => {
  const t = useTranslations("BlogDetail");
  const [blog, setBlog] = useState<BlogSlugType | null>(null);

  const { slug } = useParams() as { slug: string };
  const locale = useLocale();
  const router = useRouter();

  const [lightbox, setLightbox] = useState<LightboxState>({
    open: false,
    index: 0,
    images: [],
    alt: "",
  });

  useEffect(() => {
    if (!slug) return;

    const getBlogDetail = async () => {
      const blogData = await fetchBlogBySlug(slug, locale);
      if (blogData) setBlog(blogData);
      else console.error(`No blog found for slug: ${slug} and locale: ${locale}`);
    };

    getBlogDetail();
  }, [slug, locale]);

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const thumbnailUrl =
    blog?.image?.formats?.medium?.url || blog?.image?.formats?.small?.url || blog?.image?.url;

  // Sve slike za lightbox (thumbnail + gallery)
  const allImages = useMemo(() => {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "";
    const main = thumbnailUrl ? `${base}${thumbnailUrl}` : null;

    const gallery = (blog?.gallery || []).map(
      (img) => `${base}${img.formats?.medium?.url || img.url}`
    );

    return main ? [main, ...gallery] : gallery;
  }, [blog?.gallery, thumbnailUrl]);

  const openLightboxAt = (index: number) => {
    if (!allImages.length) return;
    setLightbox({ open: true, index, images: allImages, alt: blog?.title || "" });
  };

  const closeLightbox = () => setLightbox((s) => ({ ...s, open: false }));

  const nextImage = () => {
    setLightbox((s) => ({
      ...s,
      index: s.images.length ? (s.index + 1) % s.images.length : 0,
    }));
  };

  const prevImage = () => {
    setLightbox((s) => ({
      ...s,
      index: s.images.length ? (s.index - 1 + s.images.length) % s.images.length : 0,
    }));
  };

  // ESC + strelice u lightboxu
  useEffect(() => {
    if (!lightbox.open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox.open, lightbox.images.length]);

  if (!blog) {
    return (
      <div className="flex items-center justify-center text-accent h-screen mt-40">
        {t("loading")}
      </div>
    );
  }

  return (
    <div className="px-6 md:px-20 py-10">
      <div className="mx-auto max-w-5xl rounded-3xl border border-gray/30 bg-white/40 dark:bg-black/10 backdrop-blur-sm shadow-sm">
        {/* Header */}
        <div className="p-6 md:p-10">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-accent dark:text-accentDark text-center">
            {blog.title}
          </h1>

          {/* Meta row */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Published badge */}
            <div className="inline-flex items-center gap-2 rounded-2xl border border-gray/30 bg-white/60 dark:bg-black/30 backdrop-blur px-4 py-2">
              <FiCalendar className="h-4 w-4 text-blue-500 dark:text-accentDark" />
              <span className="text-sm text-neutral-800 dark:text-gray font-semibold">
                {t("published")}:
              </span>
              <span className="text-sm text-darkblue dark:text-blue-500 font-semibold">
                {formatDate(blog.published)}
              </span>
            </div>

            {/* Category badges */}
            {blog.category && blog.category.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                {blog.category.map((cat) => (
                  <span
                    key={cat.id}
                    className="text-xs uppercase tracking-wide px-3 py-2 rounded-full border border-gray/40 text-blue-500 dark:text-accentDark bg-white/50 dark:bg-black/20"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Hero image */}
        <div className="px-6 md:px-10 pb-6 md:pb-10">
          {thumbnailUrl ? (
            <button
              type="button"
              onClick={() => openLightboxAt(0)}
              className="group relative w-full overflow-hidden rounded-3xl border border-gray/20 shadow-md shadow-accent focus:outline-none"
              aria-label="Otvori sliku u punoj veličini"
            >
              <div className="relative h-[260px] sm:h-[340px] md:h-[420px] lg:h-[520px]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${thumbnailUrl}`}
                  alt={blog.title}
                  fill
                  priority
                  loading="eager"
                  sizes="(min-width: 1024px) 900px, 100vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              {/* overlay hint */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 right-4 rounded-2xl bg-white/70 dark:bg-black/40 backdrop-blur px-4 py-2 border border-gray/30 text-sm text-neutral-800 dark:text-gray">
                  {t("button1")}
                </div>
              </div>
            </button>
          ) : (
            <div className="w-full h-[300px] bg-gray-200 rounded-3xl" />
          )}

          {/* Markdown content */}
          <div className="mt-10">
            <article
              className="
                prose prose-lg max-w-none
                prose-headings:text-accent dark:prose-headings:text-accentDark
                prose-p:text-neutral-800 dark:prose-p:text-zinc-400
                prose-strong:text-neutral-900 dark:prose-strong:text-white
                prose-a:text-blue-500 dark:prose-a:text-accentDark
                prose-blockquote:border-l-accent dark:prose-blockquote:border-l-accentDark
              "
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {blog.content || ""}
              </ReactMarkdown>
            </article>
          </div>

          {/* Gallery */}
          {blog.gallery && blog.gallery.length > 0 && (
            <div className="mt-12">
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-gray mb-4">
                {t("gallery")}
              </h3>

              <ParallaxScrollBlog
                gallery={blog.gallery}
                onImageClick={(idx) => openLightboxAt(thumbnailUrl ? idx + 1 : idx)}
              />
            </div>
          )}

          {/* Localizations */}
          {blog.localizations && blog.localizations.length > 0 && (
            <div className="mt-12">
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-gray mb-4">
                {t("language")}:
              </h3>
              <div className="flex flex-col gap-2">
                {blog.localizations.map((loc) => (
                  <Link key={loc.id} href={`/${loc.locale}/blog/${loc.slug}`}>
                    <span className="inline-flex items-center gap-2 text-accent dark:text-accentDark hover:underline">
                      <strong className="uppercase">{loc.locale}</strong>
                      <span className="text-neutral-800 dark:text-gray">— {loc.title}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back button */}
          <div className="flex items-center justify-center my-14">
            <button
              className="flex space-x-2 items-center group bg-gradient-to-b from-indigo-500 to-blue-600 px-5 py-3 rounded-2xl text-white shadow-[0px_3px_0px_0px_rgba(255,255,255,0.1)_inset]"
              onClick={() => router.back()}
            >
              <span className="text-white uppercase text-sm flex items-center justify-center gap-2">
                <IoReturnDownBackOutline className="w-5 h-5" />
                {t("button")}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.open && lightbox.images.length > 0 && (
        <div
          className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute -top-12 right-0 inline-flex items-center gap-2 rounded-2xl bg-white/80 dark:bg-black/50 backdrop-blur px-4 py-2 border border-gray/30 text-neutral-800 dark:text-gray"
            >
              <IoClose className="h-5 w-5" />
              <span className="text-sm font-semibold">Zatvori</span>
            </button>

            <div className="relative w-full overflow-hidden rounded-3xl border border-gray/20 bg-black">
              <div className="relative h-[65vh]">
                <Image
                  src={lightbox.images[lightbox.index]}
                  alt={lightbox.alt || "image"}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {lightbox.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-2xl bg-white/70 dark:bg-black/40 backdrop-blur px-3 py-3 border border-gray/30"
                    aria-label="Prethodna slika"
                  >
                    <IoChevronBack className="h-6 w-6 text-neutral-900 dark:text-gray" />
                  </button>

                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-2xl bg-white/70 dark:bg-black/40 backdrop-blur px-3 py-3 border border-gray/30"
                    aria-label="Sledeća slika"
                  >
                    <IoChevronForward className="h-6 w-6 text-neutral-900 dark:text-gray" />
                  </button>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-2xl bg-white/70 dark:bg-black/40 backdrop-blur px-4 py-2 border border-gray/30 text-sm text-neutral-800 dark:text-gray">
                    {lightbox.index + 1} / {lightbox.images.length}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;