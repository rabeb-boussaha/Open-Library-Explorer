"use client";

export default function LoadingSpinner() {
  return (
    <div
      className="flex justify-center py-20"
      aria-busy="true"
      aria-live="polite">
      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
