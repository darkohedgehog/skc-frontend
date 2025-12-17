"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { BlogType } from "../../../types";
import { IoNewspaperOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { FiCalendar } from "react-icons/fi";
import { GiBinoculars } from "react-icons/gi";

const BlogSection = () => {
  const t = useTranslations("BlogSection");
  const locale = useLocale();
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const currentLocale = pathSegments[1] || "sr-Latn";
  const localizedPathBlog = `/${currentLocale}/blog`;

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  async function fetchBlogs(
    locale: string
  ): Promise<{ data: BlogType[] } | null> {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?locale=${locale}&sort=publishedAt:desc&populate[0]=image&populate[1]=category`
      );
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  }

  useEffect(() => {
    const getBlogs = async () => {
      const blogData = await fetchBlogs(locale);
      if (blogData?.data) setBlogs(blogData.data.slice(0, 4));
      else console.error(`No blogs available for locale: ${locale}`);
      setLoading(false);
    };
    getBlogs();
  }, [locale]);

  if (loading) {
    return (
      <p className="flex items-center justify-center text-accent dark:text-accentDark">
        {t("loading")}
      </p>
    );
  }

  if (blogs.length === 0) {
    return (
      <p className="flex items-center justify-center text-accent dark:text-accentDark">
        {t("no_blogs")}
      </p>
    );
  }

  return (
    <section className="my-16">
      <div className="container lg:px-10 px-4 py-10 mx-auto">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-4">
            <span className="text-blue-500 dark:text-accentDark">
              <IoNewspaperOutline className="h-6 w-6 lg:h-10 lg:w-10" />
            </span>
            <h1 className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-6xl my-6">
              {t("title")}
            </h1>
          </div>
          <div className="mx-auto h-px w-24 bg-gray opacity-60" />
        </div>
        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {blogs.map((blog) => {
            const imageUrl =
              blog.image?.formats?.medium?.url ||
              blog.image?.formats?.small?.url ||
              blog.image?.url;

            return (
              <article
                key={blog.id}
                className="group rounded-2xl border border-gray/30 bg-white/40 dark:bg-black/10 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow dark:border-gray/50 dark:shadow-gray/30  "
              >
                {/* Image */}
                {imageUrl && (
                  <div
                    className="relative overflow-hidden rounded-2xl h-[240px] md:h-[280px] lg:h-[350px] xl:h-[420px] mx-2 my-2"
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}${imageUrl}`}
                      alt={blog.title}
                      width={400}
                      height={300}
                      priority
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02] w-full h-auto mx-2 my-2 rounded-xl"
                    />

                    {/* blur overlay da meta bude čitljiv, ali da deluje kulturno/neutralno */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 via-black/20 to-transparent dark:from-black/60" />

                    {/* Meta strip: u granicama slike */}
                    <div className="absolute left-4 right-4 bottom-4">
                      <div className="flex flex-wrap items-center gap-2 rounded-xl bg-white/70 dark:bg-black/40 backdrop-blur-md px-3 py-2 border border-gray/30">
                        <span className="inline-flex items-center gap-2 text-sm text-darkblue dark:text-blue-500">
                          <FiCalendar className="h-4 w-4" />
                          {formatDate(blog.published)}
                        </span>

                        {blog.category && blog.category.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {blog.category.map((cat) => (
                              <span
                                key={cat.id}
                                className="text-xs uppercase tracking-wide px-2 py-1 rounded-full border border-gray/40 text-blue-500 dark:text-accentDark"
                              >
                                {cat.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h2 className="text-lg md:text-xl font-semibold leading-snug text-darkblue dark:text-blue-500">
                    {blog.title}
                  </h2>

                  {/* Description */}
                  <p className="mt-3 text-gray leading-relaxed line-clamp-4">
                    {blog.description}
                  </p>

                  {/* Link */}
                  <div className="mt-6">
                    <Link
                      href={`/${locale}/blog/${blog.slug}`}
                      aria-label={`${t("link")}: ${blog.title}`}
                    >
                      <button 
                      type="button"
                      className="rounded-full text-zinc-100 bg-blue-500 border border-blue-400 px-4 py-2 hover:bg-blue-500 hover:text-zinc-300 transition flex items-center gap-3 justify-center shadow-md hover:shadow-lg">
                        {t("link")}
                        <span>
                          <GiBinoculars />
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="flex items-center justify-center mt-14">
          <Link href={localizedPathBlog}>
            <button
              aria-label="Idi na stranicu Vesti"
              className="flex space-x-2 items-center group bg-gradient-to-b from-indigo-500 to-blue-600 px-5 py-3 rounded-2xl text-white shadow-[0px_3px_0px_0px_rgba(255,255,255,0.1)_inset]"
            >
              <span className="font-medium tracking-wide">{t("button")}</span>
              <IoNewspaperOutline className="text-white group-hover:translate-x-1 stroke-[1px] h-4 w-4 transition-transform duration-200" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
