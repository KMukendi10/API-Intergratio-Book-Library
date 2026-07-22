import { useState, useEffect } from "react";

function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchBooks(search) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${search}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch books.");
      }

      const data = await response.json();
      setBooks(data.docs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    books,
    loading,
    error,
    fetchBooks,
  };
}

export default useBooks;