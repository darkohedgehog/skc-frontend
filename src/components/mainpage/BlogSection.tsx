"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { BlogType } from "../../../types";
import { IoNewspaperOutline } from "react-icons/io5";
import { usePathname } from 'next/navigation';

const BlogSection = () => {
  const t = useTranslations("BlogSection");
  const locale = useLocale();
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
    const pathSegments = pathname.split('/');
    const currentLocale = pathSegments[1] || 'sr-Latn';
    const localizedPathBlog = `/${currentLocale}${'/blog'}`;

  // Funkcija za preuzimanje blogova
  async function fetchBlogs(locale: string): Promise<{ data: BlogType[] } | null> {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?locale=${locale}&sort=publishedAt:desc&populate=image`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return await res.json();
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  }

  useEffect(() => {
    const getBlogs = async () => {
      const blogData = await fetchBlogs(locale);
      if (blogData?.data) {
        // Prikazujemo samo 4 najnovija bloga
        setBlogs(blogData.data.slice(0, 4));
      } else {
        console.error(`No blogs available for locale: ${locale}`);
      }
      setLoading(false);
    };

    getBlogs();
  }, [locale]);

  if (loading) {
    return <p className="flex items-center justify-center text-accent dark:text-accentDark">
      {t("loading")}
      </p>;
  }

  if (blogs.length === 0) {
    return <p className="flex items-center justify-center text-accent dark:text-accentDark">
      {t("no_blogs")}</p>;
  }

  return (
    <section className="my-16">
      <div className="container px-6 py-10 mx-auto">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-darkpurple uppercase lg:text-4xl dark:text-accentDark">
            {t('title')}
          </h1>
        </div>

        <hr className="my-8 border-gray" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {blogs.map((blog) => {
            const imageUrl =
              blog.image?.formats?.medium?.url ||
              blog.image?.formats?.small?.url ||
              blog.image?.url;

            return (
              <div key={blog.id}>
                {imageUrl && (
                  <Image
                    className="object-cover object-center w-full h-64 rounded-xl shadow-md shadow-gray lg:h-80"
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${imageUrl}`}
                    alt={blog.title}
                    width={500}
                    height={300}
                    priority
                  />
                )}
                <div className="mt-8">
                  <span className="dark:text-darkpurple text-blue-500 uppercase">{blog.title}</span>
                  <p className="mt-2 text-gray dark:text-gray-400">
                    {blog.description}
                  </p>
                  <div className="flex items-center justify-start mt-4">
                    <Link
                      href={`/${locale}/blog/${blog.slug}`}
                      className="inline-block text-blue-500 dark:text-accentDark underline hover:text-blue-400 hover:dark:text-accent"
                    >
                      Više
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-center my-16">
      <Link 
            href={localizedPathBlog}>
            <button className="flex space-x-2 items-center group bg-gradient-to-b from-indigo-500 to-blue-600 px-4 py-2 rounded-2xl text-white shadow-[0px_3px_0px_0px_rgba(255,255,255,0.1)_inset]">
              <span>{t('button')}</span>{" "}
              <IoNewspaperOutline className="text-white group-hover:translate-x-1 stroke-[1px] h-3 w-3 mt-0.5 transition-transform duration-200" />
            </button>
     </Link>
    </div>
    </section>
  );
};

export default BlogSection;
