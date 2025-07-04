"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

// Util pour extraire l’ID du livre
const getBookId = (bookKey) => bookKey.replace("/works/", "");

export default function BookResults({ results, query, loading, error }) {
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 9;
  const totalPages = Math.ceil(results.length / resultsPerPage);
  const paginatedResults = results.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  if (error) {
    return (
      <div className="bg-red-500/20 border border-red-500/40 rounded-xl p-6 mb-10 text-center">
        <p className="text-red-100 text-lg">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!loading && results.length === 0) {
    return (
      <motion.div
        className="text-center py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}>
        <div className="inline-block p-6 bg-white/10 backdrop-blur-lg rounded-2xl mb-6">
          <svg
            className="w-16 h-16 mx-auto text-purple-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {query ? "No results found" : "Start your search"}
        </h3>
        <p className="text-purple-200 max-w-md mx-auto">
          {query
            ? "Try different search terms or check your spelling"
            : "Enter a book title, author, or ISBN to begin your search"}
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.h2
        className="text-2xl font-bold text-white mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}>
        Search Results ({results.length})
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show">
        {paginatedResults.map((book) => (
          <motion.div
            key={book.key}
            className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300"
            variants={item}
            whileHover={{ y: -5, scale: 1.02 }}>
            {/* Book cover */}
            {book.cover_i && (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={`Cover of ${book.title}`}
                className="w-full h-60 object-cover rounded-lg mb-4 transition-transform duration-300 group-hover:scale-105"
              />
            )}

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
              {book.title}
            </h3>

            {/* Authors */}
            <p className="text-purple-200 mb-4">
              {book.author_name?.join(", ") || "Unknown author"}
            </p>

            {/* Year */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
              {book.first_publish_year || "Unknown year"}
            </div>

            <div className="mt-auto flex items-center justify-between">
              <div className="flex space-x-2">
                {book.language?.slice(0, 2).map((lang, index) => (
                  <span
                    key={index}
                    className="bg-white/20 text-white text-xs px-2 py-1 rounded">
                    {lang}
                  </span>
                ))}
              </div>

              <Link
                href={`/books/${getBookId(book.key)}`}
                className="inline-flex items-center text-sm font-medium text-white hover:text-purple-300 transition-colors">
                Read More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination Controls */}
      <motion.div
        className="flex flex-wrap justify-center items-center gap-2 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-xl text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-40">
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-2 rounded-xl font-semibold ${
              currentPage === index + 1
                ? "bg-pink-500 text-white"
                : "bg-white/10 text-purple-200 hover:bg-purple-600 hover:text-white"
            }`}>
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-xl text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-40">
          Next
        </button>
      </motion.div>
    </>
  );
}
