"use client";

import React, { useState, useEffect } from "react";
import Pagination from "../pagination/Pagination";


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
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const booksPerPage = 6;

  const fetchBooks = async (page: number, limit: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/knjiges?pagination[page]=${page}&pagination[pageSize]=${limit}`
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
    setLoading(true);
    fetchBooks(currentPage, booksPerPage);
  }, [currentPage]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading books...</p>;
  }

  if (books.length === 0) {
    return <p className="text-center text-gray-500">No books available.</p>;
  }

  return (
    <div className="px-10 md:px-20 mb-10">
      <h1 className="text-center text-3xl font-bold mb-6 text-purple-700">
        Books Library
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="border rounded-lg p-4 shadow-md bg-white dark:bg-gray-800"
          >
            <h2 className="text-xl font-semibold mb-2 text-purple-700">
              {book.skupina1}
            </h2>
            <p className="text-sm text-gray-600">
              <strong>Year:</strong> {book.godina || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>ISBN:</strong> {book.isbn || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Inventory No:</strong> {book.invbroj || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Signature:</strong> {book.signatura || "N/A"}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(newPage) => setCurrentPage(newPage)}
      />
    </div>
  );
};

export default BooksPage;
