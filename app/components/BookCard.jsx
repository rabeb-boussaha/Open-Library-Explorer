"use client";
import Link from "next/link";

const getBookId = (bookKey) => bookKey.replace("/works/", "");

export default function BookCard({ book }) {
  return (
    <div
      tabIndex={0}
      role="group"
      aria-label={`Book: ${book.title}`}
      className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
      {book.cover_i && (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
          alt={`Book cover: ${book.title}`}
          className="w-full h-60 object-cover rounded-lg mb-4 transition-transform duration-300 group-hover:scale-105"
        />
      )}

      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
        {book.title}
      </h3>

      <p className="text-purple-200 mb-4">
        {book.author_name?.join(", ") || "Unknown author"}
      </p>

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
            fill="currentColor"
            role="img"
            aria-label="Arrow right">
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
