"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { BlogType } from "../../../types";
import Pagination from "../pagination/Pagination";
import SearchBarBlog from "../header/SearchBarBlog";
import { FiCalendar } from "react-icons/fi";

const Blog = () => {
  const t = useTranslations("Blog");
  const locale = useLocale();

  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?locale=${locale}&populate=image&populate=category&pagination[page]=${page}&pagination[pageSize]=${limit}&sort=publishedAt:${order}${searchFilter}`
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
      const blogData = await fetchBlogs(locale, currentPage, blogsPerPage, searchQuery, sortOrder);

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
    setCurrentPage(1);
  };

  return (
    <div className="px-10 md:px-20 my-10">
      <div className="flex items-center justify-between">
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

      <div className="flex items-center justify-end my-6">
        <SearchBarBlog onSearch={handleSearch} />
      </div>

      <hr className="mb-6 border-gray" />

      {/* Blogovi */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => {
          const imageUrl =
            blog.image?.formats?.medium?.url ||
            blog.image?.formats?.small?.url ||
            blog.image?.url;

          // --- Meta: kategorije (max 2) + "+N"
          const categories = blog.category ?? [];
          const shownCats = categories.slice(0, 2);
          const remainingCats = Math.max(0, categories.length - shownCats.length);

          return (
            <div
              key={blog.id}
              className="border-y-2 border-accent dark:border-accentDark rounded-lg shadow-xl shadow-slate-500 dark:shadow-gray p-5 h-[400px] w-full sm:w-[400px] overflow-auto mx-auto"
            >
              {/* Slika + Meta traka */}
              {imageUrl && (
                <div className="relative w-full overflow-hidden rounded-lg h-56 mx-auto shadow-md shadow-accent">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${imageUrl}`}
                    alt={blog.image?.alternativeText || blog.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 320px, (min-width: 768px) 33vw, 100vw"
                    className="object-cover object-center"
                  />

                  {/* gradient overlay radi čitljivosti */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 via-black/25 to-transparent dark:from-black/65" />

                  {/* META TRAKA (uvek ista visina) */}
                  <div className="absolute left-3 right-3 bottom-3">
                    <div
                      className="
                        h-10
                        flex items-center gap-2
                        rounded-xl bg-white/70 dark:bg-black/40
                        backdrop-blur-md px-3
                        border border-gray/30
                      "
                    >
                      {/* Datum */}
                      <span className="inline-flex items-center gap-2 text-sm text-darkblue dark:text-blue-500 shrink-0">
                        <FiCalendar className="h-4 w-4" />
                        {formatDate(blog.published)}
                      </span>

                      {/* Separator (diskretan) */}
                      <span className="h-4 w-px bg-gray/60" />

                      {/* Kategorije (truncate da ne razvali traku) */}
                      <div className="min-w-0 flex items-center gap-2">
                        {shownCats.length > 0 ? (
                          <>
                            {shownCats.map((cat) => (
                              <span
                                key={cat.id}
                                className="text-xs uppercase tracking-wide px-2 py-1 rounded-full border border-gray/40 text-blue-500 dark:text-accentDark whitespace-nowrap"
                              >
                                {cat.name}
                              </span>
                            ))}

                            {remainingCats > 0 && (
                              <span className="text-xs uppercase tracking-wide px-2 py-1 rounded-full border border-gray/40 text-blue-500 dark:text-accentDark whitespace-nowrap">
                                +{remainingCats}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-xs text-gray dark:text-accentDark truncate">
                            {/* Ako hoćeš, može i t("uncategorized") */}
                            —
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
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