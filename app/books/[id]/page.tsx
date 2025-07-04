import BookDetailClient from "./BookDetailClient";

export const dynamic = "force-dynamic";

async function fetchBookData(id) {
  try {
    const bookRes = await fetch(`https://openlibrary.org/works/${id}.json`, {
      next: { revalidate: 60 },
    });
    if (!bookRes.ok) throw new Error("Livre non trouvé");
    const bookData = await bookRes.json();

    let desc = "";
    if (bookData.description) {
      desc =
        typeof bookData.description === "string"
          ? bookData.description
          : bookData.description.value || "";
    }

    let editionData = {};
    if (bookData.covers?.length > 0) {
      const editionRes = await fetch(
        `https://openlibrary.org/books/OL${bookData.covers[0]}M.json`
      );
      if (editionRes.ok) editionData = await editionRes.json();
    }

    return {
      id,
      title: bookData.title,
      authors: bookData.authors?.map((a) => a.author.key) || [],
      authorNames: bookData.authors?.map((a) =>
        a.author.key.split("/").pop().replace(/_/g, " ")
      ) || ["Auteur inconnu"],
      firstPublished: bookData.first_publish_date,
      description: desc,
      isbn:
        editionData.isbn_13?.[0] ||
        editionData.isbn_10?.[0] ||
        "Non disponible",
      coverId: bookData.covers?.[0] || null,
      subjects: bookData.subjects || [],
      pages: editionData.number_of_pages || "Inconnu",
    };
  } catch (err) {
    return { error: err.message };
  }
}

export default async function BookDetailPage({ params }) {
  const book = await fetchBookData(params.id);

  if (book.error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-100 bg-black">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Erreur</h2>
          <p className="mb-4">{book.error}</p>
          <a href="/" className="text-blue-300 hover:underline">
            Retour aux résultats
          </a>
        </div>
      </div>
    );
  }

  return <BookDetailClient book={book} />;
}
