"use client";

import React, { useState, useEffect } from "react";
import Pagination from "../pagination/Pagination";
import SearchBar from "../header/SearchBar";

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
  const [searchQuery, setSearchQuery] = useState<string>(""); // Drži trenutni termin pretrage

  const booksPerPage = 6;

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

  if (loading) {
    return <p className="text-center text-gray-500">Loading books...</p>;
  }

  if (books.length === 0) {
    return <p className="text-center text-gray">No books available.</p>;
  }

  return (
    <div className="px-10 md:px-20 my-20">
      <div className="flex items-center justify-end">
      <SearchBar onSearch={handleSearch} /> {/* Prosleđuje funkciju pretrage */}
      </div>
      <h1 className="text-center text-3xl font-bold mb-10 text-purple-700">
        Biblioteka
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="border rounded-lg p-4 shadow-md bg-white dark:bg-gray"
          >
            <h2 className="text-xl font-semibold mb-2 text-purple-700">
              {book.skupina1}
            </h2>
            <p className="text-sm text-neutral-800">
              <strong>Godina:</strong> {book.godina || "N/A"}
            </p>
            <p className="text-sm text-neutral-800">
              <strong>ISBN:</strong> {book.isbn || "N/A"}
            </p>
            <p className="text-sm text-neutral-800">
              <strong>Inventurni broj:</strong> {book.invbroj || "N/A"}
            </p>
            <p className="text-sm text-neutral-800">
              <strong>Potpis:</strong> {book.signatura || "N/A"}
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
