import { motion } from "framer-motion";

export default function SearchForm({ query, setQuery, searchBooks, loading }) {
  return (
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
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
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
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
  );
}
