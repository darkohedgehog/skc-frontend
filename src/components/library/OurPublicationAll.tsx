"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import Pagination from "../pagination/Pagination";

type Book = {
  id: number;
  documentId: string;
  title: string;
  author: string;
  year: string;
  cover_image?: {
    formats?: {
      medium?: { url: string };
      thumbnail?: { url: string };
    };
    url: string;
  };
};

const OurPublicationAll = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const t = useTranslations("OurPublicationAll");
  const locale = useLocale();
  const booksPerPage = 12;

  const booksSectionRef = useRef<HTMLDivElement | null>(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/books?locale=${locale}&populate=cover_image&filters[ourPublication][$eq]=true&pagination[page]=${currentPage}&pagination[pageSize]=${booksPerPage}&sort=createdAt:desc`
      );
  
      const data = await res.json();
  
      const mappedBooks = data.data.map((item: any) => ({
        id: item.id,
        documentId: item.documentId,
        title: item.title,
        author: item.author,
        year: item.year,
        cover_image: item.cover_image,
      }));
  
      setBooks(mappedBooks);
      setTotalPages(data.meta.pagination.pageCount);
    } catch (err) {
      console.error("Greška pri fetchovanju publikacija:", err);
    } finally {
      setLoading(false);
    }
  }, [locale, currentPage, booksPerPage]);
  
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);
  

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (booksSectionRef.current) {
      booksSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <p className="text-center text-accent dark:text-accentDark mt-10">
        {t("loading")}
      </p>
    );
  }

  if (books.length === 0) {
    return (
      <p className="text-center text-accent dark:text-accentDark mt-10">
        {t("available")}
      </p>
    );
  }

  return (
    <div ref={booksSectionRef} className="px-10 md:px-20 my-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-700 dark:text-accentDark mb-10">
        {t("title")}
      </h2>
      <p className="flex items-center justify-center mb-16 text-center text-xl md:text-2xl text-gray">
        {t("paragraph")}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => {
          const imageUrl = book.cover_image?.formats?.medium?.url || book.cover_image?.url;

          return (
            <div key={book.id} className="border rounded-xl p-4 shadow-md dark:border-accentDark hover:scale-105 transition-transform duration-300">
              {imageUrl && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}${imageUrl}`}
                  alt={book.title}
                  width={300}
                  height={200}
                  className="rounded-xl object-cover w-full h-60"
                />
              )}
              <h3 className="dark:text-darkpurple text-blue-500 mt-2 uppercase">{book.title}</h3>
              <p className="mt-2 text-sm text-darkblue dark:text-blue-500">{book.author}</p>
              <p className="text-sm dark:text-darkpurple text-gray">
                {t("godina")}: {book.year}
              </p>
              <Link
                href={`/${locale}/knjige/${book.documentId}`}
                locale={locale}
                prefetch={false}
                className="inline-block text-blue-500 dark:text-accentDark underline hover:text-blue-400 hover:dark:text-accent"
              >
                {t("link")}
              </Link>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="my-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default OurPublicationAll;
