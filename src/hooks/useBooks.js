import { useState, useEffect } from "react";

function useBooks() {
  // Store the books returned by the API
  const [books, setBooks] = useState([]);

  // Store the total number of books found
  const [totalBooks, setTotalBooks] = useState(0);

  // Track the loading state
  const [loading, setLoading] = useState(false);

  // Store any error messages
  const [error, setError] = useState("");

  // Fetch books from the Open Library API
  async function fetchBooks(search, page = 1) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${search}&page=${page}`
      );

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to fetch books.");
      }

      const data = await response.json();

      // Save the books returned by the API
      setBooks(data.docs);

      // Save the total number of books found
      setTotalBooks(data.numFound);
    } catch (err) {
      // Display the error message
      setError(err.message);
    } finally {
      // Stop the loading spinner
      setLoading(false);
    }
  }

  // Load some books when the app opens
  useEffect(() => {
    fetchBooks("react", 1);
  }, []);

  // Return the values and function
  return {
    books,
    totalBooks,
    loading,
    error,
    fetchBooks,
  };
}

export default useBooks;