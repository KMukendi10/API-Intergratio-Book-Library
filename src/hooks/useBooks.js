import { useState, useEffect } from "react";

function useBooks() {
  const [books, setBooks] = useState([]);  
  const [totalBooks, setTotalBooks] = useState(0); // Storing total number of books
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
      setTotalBooks(data.numFound); // Update total number of books
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
      fetchBooks("react");
    }, []);

  return {
    books,
    totalBooks, // Return total number of books
    loading,
    error,
    fetchBooks,
  };
}

export default useBooks;