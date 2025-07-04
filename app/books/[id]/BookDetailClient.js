"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Fetches the description of a book from the Open Library API
 * @param {string} olId - The Open Library ID of the book (e.g. "OL12345W")
 * @returns {Promise<string|null>} Description or null if not available
 */
async function fetchBookDescription(olId) {
  if (!olId) return null;
  try {
    const res = await fetch(`https://openlibrary.org/works/${olId}.json`);
    if (!res.ok) throw new Error("Error while fetching the book description");
    const data = await res.json();
    if (!data.description) return null;
    return typeof data.description === "string"
      ? data.description
      : data.description.value;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function BookDetailClient({ book }) {
  const [description, setDescription] = useState(book.description || "");

  useEffect(() => {
    if (!book.description && book.olId) {
      fetchBookDescription(book.olId).then((desc) => {
        setDescription(desc || "No description available.");
      });
    }
  }, [book.description, book.olId]);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}>
      <div className="max-w-4xl mx-auto text-white">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 break-words">
          {book.title || "Unknown Title"}
        </h1>
        <p className="text-purple-300 italic mb-2 break-words">
          {(book.authorNames?.length && book.authorNames.join(", ")) ||
            "Unknown Author"}
        </p>
        <p className="mb-4 text-base sm:text-lg text-justify">
          {description || "No description available."}
        </p>
        <p className="mb-2 text-base">
          <strong>Published:</strong> {book.firstPublished || "Unknown Date"}
        </p>
        <p className="mb-2 text-base">
          <strong>ISBN:</strong> {book.isbn || "Not available"}
        </p>

        {book.coverId && (
          <img
            src={`https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`}
            alt={`Book cover of ${book.title}`}
            className="rounded-xl mt-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xs xl:max-w-sm mx-auto"
          />
        )}

        {book.subjects?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Subjects:</h3>
            <div className="flex flex-wrap gap-2">
              {book.subjects.slice(0, 10).map((subject, i) => (
                <span
                  key={i}
                  className="bg-purple-700 px-3 py-1 rounded-full text-sm">
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:from-pink-600 hover:to-purple-700 transition-colors duration-300">
            ← Back to Search
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
