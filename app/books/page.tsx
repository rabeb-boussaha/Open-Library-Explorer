"use client";

import { useState } from "react";
import Header from "../components/Header";
import SearchForm from "../components/SearchForm";
import BookResults from "../components/BookResults";
import Footer from "../components/Footer";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Header />
        <SearchForm
          query={query}
          setQuery={setQuery}
          searchBooks={searchBooks}
          loading={loading}
        />
        <BookResults
          results={results}
          query={query}
          loading={loading}
          error={error}
        />
        <Footer />
      </div>
    </div>
  );
}
