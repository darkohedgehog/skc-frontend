"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { BlogType } from "../../../types";
import Pagination from "../pagination/Pagination";


const Blog = () => {
  const t = useTranslations("Blog");
  const locale = useLocale();
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const blogsPerPage = 6; // Broj blogova po stranici

  async function fetchBlogs(
    locale: string,
    page: number,
    limit: number
  ): Promise<{ data: BlogType[]; meta: { pagination: { pageCount: number } } } | null> {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?locale=${locale}&populate=image&pagination[page]=${page}&pagination[pageSize]=${limit}`
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
      const blogData = await fetchBlogs(locale, currentPage, blogsPerPage);
      if (blogData?.data) {
        setBlogs(blogData.data);
        setTotalPages(blogData.meta.pagination.pageCount); // Postavi ukupno stranica
      } else {
        console.error(`No blogs available for locale: ${locale}`);
      }
      setLoading(false);
    };

    getBlogs();
  }, [locale, currentPage]);

  if (loading) {
    return <p>{t("loading")}</p>;
  }

  if (blogs.length === 0) {
    return <p>{t("no_blogs")}</p>;
  }

  return (
    <div className="px-10 md:px-20 mb-10">
      <h1 className="text-2xl lg:text-3xl uppercase font-bold my-8 flex items-center justify-center text-accent text-center">
        {t("title")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {blogs.map((blog) => {
          const imageUrl =
            blog.image?.formats?.medium?.url ||
            blog.image?.formats?.small?.url ||
            blog.image?.url;

          return (
            <div
              key={blog.id}
              className="border-y-2 border-accent dark:border-accentDark rounded-lg shadow-xl shadow-slate-500 dark:shadow-gray p-5 h-[400px] w-full sm:w-[400px] overflow-auto mx-auto"
            >
              {imageUrl && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${imageUrl}`}
                  alt={blog.image?.alternativeText || blog.title}
                  width={300}
                  height={200}
                  priority
                  className="rounded-lg object-cover h-40 w-full mx-auto shadow-md shadow-accent"
                />
              )}
              <Link href={`/${locale}/blog/${blog.slug}`} locale={locale} prefetch={false}>
                <h2 className="text-[18px] font-semibold my-8 text-darkpurple flex items-center justify-center mx-auto text-center">
                  {blog.title}
                </h2>
                <p className="text-sm font-semibold my-4 text-gray dark:text-white flex justify-start mx-auto">
                  {blog.description}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  );
};

export default Blog;
