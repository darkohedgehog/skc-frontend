import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useTranslations } from "next-intl";
import Link from "next/link";

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
  const t = useTranslations("Pagination");

  if (totalPages === 0) {
    return <p className="text-gray-500">{t("no_pages")}</p>;
  }

  return (
    <div className="mt-8 flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
      <Link href={`?page=${currentPage - 1}`}>
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
      </Link>
      <span className="text-gray">
        {t("page")} {currentPage} {t("of")} {totalPages}
      </span>
      <Link href={`?page=${currentPage + 1}`}>
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
      </Link>
    </div>
  );
};

export default Pagination;
