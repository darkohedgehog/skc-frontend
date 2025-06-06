"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { BlogType } from "../../../types";
import Pagination from "../pagination/Pagination";
import SearchBarBlog from "../header/SearchBarBlog";

const Blog = () => {
  const t = useTranslations("Blog");
  const locale = useLocale();

  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Dodajemo state za pretragu
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const blogsPerPage = 6;

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  async function fetchBlogs(
    locale: string,
    page: number,
    limit: number,
    search: string,
    order: "asc" | "desc"
  ): Promise<{ data: BlogType[]; meta: { pagination: { pageCount: number } } } | null> {
    try {
      const searchFilter = search
        ? `&filters[$or][0][title][$containsi]=${encodeURIComponent(
            search
          )}&filters[$or][1][description][$containsi]=${encodeURIComponent(search)}`
        : "";

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?locale=${locale}&populate=image&pagination[page]=${page}&pagination[pageSize]=${limit}&sort=publishedAt:${order}${searchFilter}`
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
      setLoading(true);
      const blogData = await fetchBlogs(
        locale,
        currentPage,
        blogsPerPage,
        searchQuery,
        sortOrder
      );
      if (blogData?.data) {
        setBlogs(blogData.data);
        setTotalPages(blogData.meta.pagination.pageCount);
      } else {
        console.error(`No blogs available for locale: ${locale}`);
      }
      setLoading(false);
    };

    getBlogs();
  }, [locale, currentPage, searchQuery, sortOrder]);

  if (loading) {
    return (
      <p className="flex items-center justify-center text-accent dark:text-accentDark mt-40">
        {t("loading")}
      </p>
    );
  }

  if (blogs.length === 0) {
    return (
      <p className="flex items-center justify-center text-accent dark:text-accentDark mt-40">
        {t("no_blogs")}
      </p>
    );
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Resetuje paginaciju na prvu stranu pri pretrazi
  };

  return (
    <div className="px-10 md:px-20 my-10">
      <div className="flex items-center justify-between">
        {/* Sortiranje i filtriranje */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <button
              onClick={() => setSortOrder("desc")}
              className={`mr-4 px-4 py-2 rounded-2xl ${
                sortOrder === "desc" ? "bg-accent text-white text-sm" : "bg-gray"
              }`}
            >
              {t("newest")}
            </button>
            <button
              onClick={() => setSortOrder("asc")}
              className={`px-4 py-2 rounded-2xl ${
                sortOrder === "asc" ? "bg-accent text-white text-sm" : "bg-gray"
              }`}
            >
              {t("oldest")}
            </button>
          </div>
        </div>
      </div>
      <h1 className="flex items-center justify-center mb-8 text-xl lg:text-3xl font-semibold text-accent dark:text-accentDark">
        {t("title")}
      </h1>
       {/* SearchBar */}
      <div className="flex items-center justify-end my-6">
          <SearchBarBlog onSearch={handleSearch} /> {/* Prosleđuje funkciju pretrage */}
        </div>
      <hr className="mb-6 border-gray" />

      {/* Blogovi */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
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
              <p className="flex items-center justify-start">
                {blog.category && blog.category.length > 0 && (
                  <div className="mt-14">
                    <h3 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-gray">
                      {t("category")}:
                    </h3>
                    <ul>
                      {blog.category.map((cat) => (
                        <li key={cat.id} className="text-accent dark:text-accentDark">
                          {cat.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </p>
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
              <Link
                href={`/${locale}/blog/${blog.slug}`}
                locale={locale}
                prefetch={false}
              >
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

      {/* Pagination */}
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
