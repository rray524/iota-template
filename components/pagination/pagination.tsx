"use client";
import React, { useEffect, useState } from "react";

export const Pagination = ({
  currentPage,
  totalPages,
  paginate,
}: {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}) => {
  const [pagesToShow, setPagesToShow] = useState(4);

  useEffect(() => {
    const updatePagesToShow = () => {
      if (window.innerWidth < 400) {
        setPagesToShow(1);
      } else {
        setPagesToShow(4);
      }
    };

    updatePagesToShow();

    window.addEventListener("resize", updatePagesToShow);

    return () => window.removeEventListener("resize", updatePagesToShow);
  }, []);

  let startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  let endPage = Math.min(totalPages, currentPage + Math.floor(pagesToShow / 2));

  if (startPage <= 1) {
    endPage = Math.min(pagesToShow, totalPages);
  } else if (endPage >= totalPages) {
    startPage = Math.max(1, totalPages - pagesToShow + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center flex-wrap space-x-2 gap-1 md:gap-2 my-7">
      {currentPage > 1 && (
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-1 py-2 border rounded-full bg-white text-bgColors hover:bg-blue-100 text-xs md:text-lg w-7 h-7 md:w-10 md:h-10 flex items-center justify-center"
        >
          &lt;
        </button>
      )}
      {startPage > 1 && (
        <>
          <button
            onClick={() => paginate(1)}
            className="px-1 py-2 border rounded-full bg-white text-green-500 hover:bg-blue-100 text-xs md:text-lg w-7 h-7 md:w-10 md:h-10 flex items-center justify-center"
          >
            1
          </button>
          {startPage > 2 && (
            <span className="px-1 py-2 dark:text-white">...</span>
          )}
        </>
      )}

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`px-1 py-2 border rounded-full transition-colors text-xs md:text-lg w-7 h-7 md:w-10 md:h-10 flex items-center justify-center ${
            currentPage === number
              ? "bg-black text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          {number}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-1 py-2 dark:text-white">...</span>
          )}
          <button
            onClick={() => paginate(totalPages)}
            className="px-1 py-2 border rounded-full bg-white text-green-500 hover:bg-blue-100 text-xs md:text-lg w-7 h-7 md:w-10 md:h-10 flex items-center justify-center"
          >
            {totalPages}
          </button>
        </>
      )}
      {currentPage < totalPages && (
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-1 py-2 border rounded-full bg-white text-bgColors hover:bg-blue-100 text-xs md:text-md w-7 h-7 md:w-10 md:h-10 flex items-center justify-center"
        >
          &gt;
        </button>
      )}
    </div>
  );
};
