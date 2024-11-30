"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { BlogType } from "../../../types";
import Pagination from "../pagination/Pagination";
import SearchBar from "../header/SearchBar";

const Blog = () => {
  const t = useTranslations("Blog");
  const locale = useLocale();
  const searchParams = useSearchParams(); // Čitanje search parametra
  const searchQuery = searchParams.get("search")?.toLowerCase() || ""; // Pretraživa reč

  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const blogsPerPage = 6;

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  async function fetchBlogs(
    locale: string,
    page: number,
    limit: number
  ): Promise<{ data: BlogType[]; meta: { pagination: { pageCount: number } } } | null> {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?locale=${locale}&populate=image&pagination[page]=${page}&pagination[pageSize]=${limit}&sort=publishedAt:desc`
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
        setTotalPages(blogData.meta.pagination.pageCount);
      } else {
        console.error(`No blogs available for locale: ${locale}`);
      }
      setLoading(false);
    };

    getBlogs();
  }, [locale, currentPage]);

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

  // Filtriranje blogova prema searchQuery
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery) ||
    blog.description.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="px-10 md:px-20 mb-10">
      {/* Dodavanje SearchBar komponente */}
      <div className="flex items-center justify-end w-full mb-4">
      <SearchBar /> 
      </div>
      <h1 className="text-2xl lg:text-3xl uppercase font-bold mb-14 flex items-center justify-center text-accent text-center">
        {t("title")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {filteredBlogs.map((blog) => {
          const imageUrl =
            blog.image?.formats?.medium?.url ||
            blog.image?.formats?.small?.url ||
            blog.image?.url;

          return (
            <div
              key={blog.id}
              className="border-y-2 border-accent dark:border-accentDark rounded-lg shadow-xl shadow-slate-500 dark:shadow-gray p-5 h-[400px] w-full sm:w-[400px] overflow-auto mx-auto"
            >
              <p className="mb-2 text-sm text-darkblue dark:text-blue-500">
                {formatDate(blog.published)}
              </p>
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
                <p className="text-sm font-semibold my-4 text-gray dark:text-accentDark flex justify-start mx-auto">
                  {blog.description}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="my-20">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
      </div>
    </div>
  );
};

export default Blog;
