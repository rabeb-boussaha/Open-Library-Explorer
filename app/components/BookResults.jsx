"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import BookCard from "./BookCard";
import Pagination from "./Pagination";
import ErrorMessage from "./ErrorMessage";
import NoResults from "./NoResults";
import LoadingSpinner from "./LoadingSpinner";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function BookResults({ results, query, loading, error }) {
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 9;
  const totalPages = Math.ceil(results.length / resultsPerPage);
  const paginatedResults = results.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  if (error) return <ErrorMessage message={error} />;
  if (loading) return <LoadingSpinner />;
  if (!loading && results.length === 0) return <NoResults query={query} />;

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
        animate="show"
        role="list">
        {paginatedResults.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </motion.div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
