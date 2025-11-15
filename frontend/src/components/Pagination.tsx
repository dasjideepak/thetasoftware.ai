import React from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Pagination component displays page numbers with ellipsis for large page counts.
 *
 * @param {PaginationProps} props - Component props
 * @returns {JSX.Element | null} The pagination component or null if only one page
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  /**
   * Generates an array of page numbers to display, including ellipsis for large ranges.
   *
   * @returns {(number | string)[]} Array of page numbers and ellipsis strings
   */
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 9;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 6) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i);
        }
        if (totalPages > maxVisible + 2) {
          pages.push('ellipsis');
        }
        if (totalPages > maxVisible) {
          pages.push(totalPages - 1);
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 5) {
        pages.push(1);
        pages.push(2);
        if (totalPages > maxVisible + 2) {
          pages.push('ellipsis');
        }
        for (let i = totalPages - (maxVisible - 2); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(2);
        pages.push('ellipsis');
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages - 1);
        pages.push(totalPages);
      }
    }

    return pages;
  };

  /**
   * Handles navigation to the previous page.
   */
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  /**
   * Handles navigation to the next page.
   */
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-1 py-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-8 h-8 rounded transition-colors ${
          currentPage === 1
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-600 hover:bg-gray-100 cursor-pointer'
        }`}
        aria-label="Previous page"
      >
        <IconChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-1">
        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-gray-900 text-sm"
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
              className={`flex items-center justify-center min-w-[32px] h-8 px-2 rounded text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gray-200 text-gray-900 cursor-default'
                  : 'text-gray-900 hover:bg-gray-50 cursor-pointer'
              }`}
              aria-label={`Go to page ${pageNum}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-8 h-8 rounded transition-colors ${
          currentPage === totalPages
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-600 hover:bg-gray-100 cursor-pointer'
        }`}
        aria-label="Next page"
      >
        <IconChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
