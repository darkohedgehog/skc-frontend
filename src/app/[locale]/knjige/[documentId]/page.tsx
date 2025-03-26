"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';

type Book = {
  id: number;
  documentId: string;
  title: string;
  author: string;
  description: string;
  year: string;
  cover_image?: {
    url: string;
    alternativeText?: string;
    formats?: {
      medium?: { url: string };
      thumbnail?: { url: string };
    };
  };
};

const BookDetailsPage = () => {
  const { documentId } = useParams() as { documentId: string };
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("BookDetailsPage");

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/books?locale=${locale}&filters[documentId][$eq]=${documentId}&populate=cover_image`
        );
        const data = await res.json();

        if (data?.data?.length > 0) {
          const item = data.data[0];
          setBook({
            id: item.id,
            documentId: item.documentId,
            title: item.title,
            author: item.author,
            description: item.description,
            year: item.year,
            cover_image: item.cover_image,
          });
        } else {
          setBook(null);
        }
      } catch (error) {
        console.error("Greška pri fetchovanju knjige:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [documentId, locale]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-40 text-accent">
        {t("loading")}
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center mt-40 text-accent">
        {t("available")}
      </div>
    );
  }

  const imageUrl =
    book.cover_image?.formats?.medium?.url || book.cover_image?.url;

  return (
    <div className="px-10 md:px-20 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {imageUrl && (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${imageUrl}`}
            alt={book.cover_image?.alternativeText || book.title}
            width={400}
            height={600}
            className="rounded-xl shadow-gray shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold text-accent dark:text-accentDark mb-4">
            {book.title}
          </h1>
          <p className="text-2xl mb-2 text-neutral-700 dark:text-slate-400">
            <strong>{t("author")}:</strong> {book.author}
          </p>
          <p className="text-lg mb-2 text-neutral-700 dark:text-neutral-400">
            <strong>{t("godina")}:</strong> {book.year}
          </p>
          <p className="text-xl text-neutral-700 dark:text-neutral-400 mt-6">
            {book.description}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center my-20">
      <button className='flex space-x-2 items-center group bg-gradient-to-b from-indigo-500 to-blue-600 px-4 py-2 rounded-2xl text-white shadow-[0px_3px_0px_0px_rgba(255,255,255,0.1)_inset]"'
        onClick={() => router.back()}>
          <span className='text-white uppercase text-sm flex items-center justify-center gap-2'>
          <IoReturnDownBackOutline className='w-5 h-5' />
          {t("button")}
            </span>
        </button>
        </div>
    </div>
  );
};

export default BookDetailsPage;
