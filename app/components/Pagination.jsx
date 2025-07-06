"use client";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <nav
      className="flex flex-wrap justify-center items-center gap-2 mt-10"
      role="navigation"
      aria-label="Pagination">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        aria-disabled={currentPage === 1}
        className="px-3 py-2 rounded-xl text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-40">
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={currentPage === page ? "page" : undefined}
            aria-label={`Go to page ${page}`}
            className={`px-3 py-2 rounded-xl font-semibold ${
              currentPage === page
                ? "bg-pink-500 text-white"
                : "bg-white/10 text-purple-200 hover:bg-purple-600 hover:text-white"
            }`}>
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        aria-disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-xl text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-40">
        Next
      </button>
    </nav>
  );
}
