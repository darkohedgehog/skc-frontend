"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { IoLibraryOutline } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import { MdOutlineLocalLibrary } from "react-icons/md";

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

const OurPublication = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("OurPublication");
  const locale = useLocale();
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const currentLocale = pathSegments[1] || 'sr-Latn';
  const localizedPathLibrary = `/${currentLocale}${'/biblioteka'}`;

  useEffect(() => {
    const fetchOurBooks = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/books?locale=${locale}&populate=cover_image&filters[ourPublication][$eq]=true&sort=createdAt:desc&pagination[limit]=4`
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
      } catch (err) {
        console.error("Greška pri fetchovanju publikacija:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOurBooks();
  }, [locale]);

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
    <div className="px-10 md:px-20 my-16">
      {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center gap-4">
                  <span className="text-blue-500 dark:text-accentDark">
                    <MdOutlineLocalLibrary className="h-6 w-6 lg:h-10 lg:w-10" />
                  </span>
                  <h1 className="bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-6xl my-6">
                    {t("title")}
                  </h1>
                </div>
                <div className="mx-auto h-px w-24 bg-gray opacity-60" />
              </div>
      <p className="flex items-center justify-center mb-16 text-center text-2xl md:text-4xl text-gray">
        {t("paragraph")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      <Link 
            href={localizedPathLibrary}
            className="flex items-center justify-center my-20">
            <button aria-label='Idi na stranicu' className="flex space-x-2 items-center group bg-gradient-to-b from-indigo-500 to-blue-600 px-4 py-2 rounded-2xl text-white shadow-[0px_3px_0px_0px_rgba(255,255,255,0.1)_inset]">
              <span>{t('button')}</span>{" "}
              <IoLibraryOutline className="text-white group-hover:translate-x-1 stroke-[1px] h-3 w-3 mt-0.5 transition-transform duration-200" />
            </button>
     </Link>
    </div>
  );
};

export default OurPublication;
