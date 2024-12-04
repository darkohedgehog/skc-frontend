"use client";

import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useTranslations } from 'next-intl';

interface SearchBarBlogProps {
  onSearch: (query: string) => void;
}

const SearchBarBlog: React.FC<SearchBarBlogProps> = ({ onSearch }) => {
  const t = useTranslations('SearchBarBlog');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = () => {
    onSearch(searchQuery); // Poziva funkciju roditelja za pretragu
    setSearchOpen(false); // Zatvara search bar
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setSearchOpen((prev) => !prev)}
        className="text-xl text-gray hover:text-purple-400 transition-colors"
      >
        {searchOpen ? <FaTimes /> : <FaSearch />}
      </button>
      {searchOpen && (
        <div className="ml-4 flex items-center gap-2">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('placeholder')}
            className="placeholder:text-sm text-sm text-neutral-800 dark:text-white placeholder-gray border-b-2 border-purple-500 focus:border-purple-300 outline-none px-2 py-1 rounded-xl"
          />
          <button
            onClick={handleSearchSubmit}
            className="bg-purple-600 text-sm hover:bg-purple-500 text-white px-2 py-1 rounded-2xl transition-colors"
          >
            {t('search')}
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBarBlog;
