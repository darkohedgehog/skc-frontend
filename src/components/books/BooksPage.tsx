"use client";

import React, { useState, useEffect, useRef } from "react";
import Pagination from "../pagination/Pagination";
import SearchBar from "../header/SearchBar";
import { useTranslations } from 'next-intl';
import LibraryIntro from "./LibraryIntro";


interface BookType {
  id: number;
  knjigaId: number;
  razina: string;
  invbroj: string;
  zbirka: string;
  signatura: string;
  skupina1: string;
  skupina1a: string;
  skupina2: string;
  skupina4: string;
  godina: string;
  isbn: string;
}

const BooksPage = () => {
  const t = useTranslations('BooksPage');
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Drži trenutni termin pretrage

  const booksPerPage = 24;

  // Ref za sekciju sa knjigama
  const booksSectionRef = useRef<HTMLDivElement | null>(null);

  const fetchBooks = async (page: number, limit: number, search?: string) => {
    try {
      setLoading(true);
      const searchFilter = search
        ? `&filters[$or][0][skupina1][$containsi]=${encodeURIComponent(
            search
          )}&filters[$or][1][signatura][$containsi]=${encodeURIComponent(
            search
          )}`
        : "";

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/knjiges?pagination[page]=${page}&pagination[pageSize]=${limit}${searchFilter}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setBooks(data?.data || []);
      setTotalPages(data?.meta?.pagination?.pageCount || 1);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage, booksPerPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Resetuje paginaciju na prvu stranu
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);

    // Skroluj do sekcije sa knjigama
    if (booksSectionRef.current) {
      booksSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return <p className="text-center text-accent dark:text-accentDark flex items-center justify-center mt-20">
      {t('loading')}
      </p>;
  }

  if (books.length === 0) {
    return <p className="text-center text-accent dark:text-accentDark flex items-center justify-center mt-20">
     {t('available')}
      </p>;
  }

  return (
    <>
      <LibraryIntro />
      <div ref={booksSectionRef} className="px-10 md:px-20 my-20">
        <div className="flex items-center justify-end">
          <SearchBar onSearch={handleSearch} /> {/* Prosleđuje funkciju pretrage */}
        </div>
        <h1 className="flex items-center justify-center text-center text-3xl lg:text-4xl font-bold mb-10 text-purple-700 dark:text-accentDark">
          {t('title1')} <br /> {t('title2')}
        </h1>
        <p className="flex items-center justify-center text-clip text-neutral-800 dark:text-gray">
          {t('paragraph')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-20">
          {books.map((book) => (
            <div
              key={book.id}
              className="border rounded-xl p-4 shadow-lg shadow-gray dark:shadow-accentDark bg-white dark:bg-gray"
            >
              <h2 className="text-xl font-semibold mb-2 text-purple-700">
                {book.skupina1}
              </h2>
              <p className="text-sm text-neutral-800">
                <strong>{t('godina')}:</strong> {book.godina || "N/A"}
              </p>
              <p className="text-sm text-neutral-800">
                <strong>{t('ISBN')}:</strong> {book.isbn || "N/A"}
              </p>
              <p className="text-sm text-neutral-800">
                <strong>{t('inventurni_broj')}:</strong> {book.invbroj || "N/A"}
              </p>
              <p className="text-sm text-neutral-800">
                <strong>{t('signatura')}:</strong> {book.signatura || "N/A"}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default BooksPage;
