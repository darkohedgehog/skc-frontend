"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Pagination from "../pagination/Pagination";
import Link from "next/link";
import SearchBar from "../header/SearchBar";

type Book = {
    id: number;
    documentId: string;
    title: string;
    author: string;
    description: string;
    year: string;
    cover_image?: {
      id: number;
      documentId: string;
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats?: {
        medium?: { url: string };
        thumbnail?: { url: string };
      };
      url: string;
    };
  };

const Books = () => {
  const t = useTranslations("Books");
  const locale = useLocale();

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Drži trenutni termin pretrage
  const booksPerPage = 24;

  // Ref za sekciju sa knjigama
  const booksSectionRef = useRef<HTMLDivElement | null>(null);


  // ✅ Memoizovana funkcija koja neće biti redefinisana na svakom renderu
  const fetchBooks = useCallback(async () => {
    setLoading(true); // važno je staviti ovde kako bi loading bio konzistentan
    try {
      const filters = searchQuery
        ? `&filters[$or][0][title][$containsi]=${encodeURIComponent(
            searchQuery
          )}&filters[$or][1][author][$containsi]=${encodeURIComponent(
            searchQuery
          )}&filters[$or][2][year][$containsi]=${encodeURIComponent(
            searchQuery
          )}`
        : "";

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/books?locale=${locale}&populate=cover_image&pagination[page]=${currentPage}&pagination[pageSize]=${booksPerPage}&sort=createdAt:desc${filters}`
      );

      const data = await res.json();

      setBooks(
        data.data.map((item: any) => ({
          id: item.id,
          documentId: item.documentId,
          title: item.title,
          author: item.author,
          description: item.description,
          year: item.year,
          cover_image: item.cover_image,
        }))
      );

      setTotalPages(data.meta.pagination.pageCount);
    } catch (err) {
      console.error("Greška pri fetchovanju knjiga:", err);
    } finally {
      setLoading(false);
    }
  }, [locale, currentPage, searchQuery, booksPerPage]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (booksSectionRef.current) {
      booksSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <p className="text-center text-accent dark:text-accentDark flex items-center justify-center mt-20">
        {t("loading")}
      </p>
    );
  }


  if (books.length === 0) {
    return <p className="text-center text-accent dark:text-accentDark flex items-center justify-center mt-20">
     {t('available')}
      </p>;
  }

  return (
    <div ref={booksSectionRef} className="px-10 md:px-20 my-10">
        <h1 className="flex items-center justify-center text-center text-3xl lg:text-4xl font-bold mb-10 text-purple-700 dark:text-accentDark">
          {t('title1')} <br /> {t('title2')}
        </h1>
        <div className="flex items-center justify-end mt-24 md:mt-8 lg:mt-6">
          <SearchBar onSearch={handleSearch} /> {/* Prosleđuje funkciju pretrage */}
        </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {books.map((book) => {
  // U Strapi 5, URL je direktno dostupan na cover_image objektu
  const imageUrl = book.cover_image?.url;
  // Ili ako postoje formati, možete koristiti njih
  const mediumUrl = book.cover_image?.formats?.medium?.url;
  const finalUrl = mediumUrl || imageUrl;
  
 // console.log("Book:", book.title, "Image URL:", finalUrl);
  
  return (
    <div key={book.id} className="border rounded-xl p-4 shadow-md shadow-accent dark:shadow-accentDark dark:border-accentDark transition duration-300 ease-in-out transform hover:scale-105">
      {finalUrl && (
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${finalUrl}`}
          alt={book.title}
          width={300}
          height={200}
          className="rounded-xl object-cover w-full h-60"
        />
      )}
      
      <h2 className="dark:text-darkpurple text-blue-500 mt-2 uppercase">{book.title}</h2>
      <p className="mt-2 text-sm text-darkblue dark:text-blue-500">{book.author}</p>
      <p className="text-sm dark:text-darkpurple text-blue-500">{t('godina')}: {book.year}</p>
      <Link
      href={`/${locale}/knjige/${book.documentId}`}
      locale={locale}
      prefetch={false}
      className="inline-block text-blue-500 dark:text-accentDark underline hover:text-blue-400 hover:dark:text-accent">
       {t('link')}
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

export default Books;
