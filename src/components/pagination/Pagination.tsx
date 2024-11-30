import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useTranslations } from 'next-intl';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  
  const t = useTranslations('Pagination');

  return (
    <div className="mt-8 flex justify-center items-center space-x-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-4 py-2 bg-purple-700 text-white rounded ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-purple-600"
        }`}
      >
        <FaArrowLeft /> {/* Previous button icon */}
      </button>
      <span className="text-gray">
        {t('page')} {currentPage} {t('of')} {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages || currentPage > totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-4 py-2 bg-purple-700 text-white rounded ${
          currentPage === totalPages || currentPage > totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-purple-600"
        }`}
      >
        <FaArrowRight /> {/* Next button icon */}
      </button>
    </div>
  );
};

export default Pagination;