import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="text-center mb-16">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-white mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        Find your book
      </motion.h1>
      <motion.p
        className="text-xl text-purple-200 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}>
        Search effortlessly by title, author, publication date to find exactly
        what you’re looking for.
      </motion.p>
    </header>
  );
}
