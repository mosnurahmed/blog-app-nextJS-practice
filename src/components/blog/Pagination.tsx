// src/components/blog/Pagination.tsx
"use client";

import { PaginationInfo } from "@/lib/blog/utils";

interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pagination,
  onPageChange,
}: PaginationProps) {
  const {
    currentPage,
    totalPages,
    hasPrevPage,
    hasNextPage,
    totalPosts,
    postsPerPage,
  } = pagination;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show current page and neighbors
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Info */}
      <div className="text-center text-sm text-gray-600 mb-4">
        Showing {(currentPage - 1) * postsPerPage + 1} -{" "}
        {Math.min(currentPage * postsPerPage, totalPosts)} of {totalPosts} posts
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all
            ${
              hasPrevPage
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          ← Previous
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-400"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg scale-110"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all
            ${
              hasNextPage
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          Next →
        </button>
      </div>

      {/* Quick Jump */}
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
}
