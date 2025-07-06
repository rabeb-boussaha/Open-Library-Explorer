"use client";
import { motion } from "framer-motion";

export default function NoResults({ query }) {
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
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="No results icon">
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
          : "Begin your search"}
      </p>
    </motion.div>
  );
}
