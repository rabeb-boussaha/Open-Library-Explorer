"use client";

export default function ErrorMessage({ message }) {
  return (
    <div
      role="alert"
      className="bg-red-500/20 border border-red-500/40 rounded-xl p-6 mb-10 text-center">
      <p className="text-red-100 text-lg">{message}</p>
    </div>
  );
}
