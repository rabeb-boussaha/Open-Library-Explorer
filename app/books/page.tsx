"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BookResults from "../components/BookResults";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Animation for the results
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

  const searchBooks = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setResults(data.docs || []);
    } catch (err) {
      console.error("Search error:", err);
      setError("An error occurred while searching. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour extraire l'ID du livre de la clé Open Library
  const getBookId = (bookKey) => {
    // Exemple de clé: "/works/OL82565W"
    return bookKey.replace("/works/", "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            Find your next book
          </motion.h1>
          <motion.p
            className="text-xl text-purple-200 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}>
            Search effortlessly by title, author, publication date, or even by
            book cover to find exactly what you’re looking for.
          </motion.p>
        </header>

        {/* Search form */}
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-16 border border-white/20 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}>
          <form onSubmit={searchBooks}>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Book title, author..."
                  className="w-full px-6 py-4 text-lg bg-white/90 rounded-xl border-0 focus:ring-4 focus:ring-purple-400 focus:outline-none shadow-lg"
                />
                <svg
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-lg rounded-xl hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-400 shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center">
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </>
                ) : (
                  "Search"
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Search results */}
        <BookResults
          results={results}
          query={query}
          loading={loading}
          error={error}
        />

        {/* Footer */}
        <footer className="mt-20 pt-10 border-t border-white/10 text-center">
          <p className="text-purple-200">
            Open Library Explorer: Powered by BOUSSAHA Rabeb
          </p>
        </footer>
      </div>
    </div>
  );
}
