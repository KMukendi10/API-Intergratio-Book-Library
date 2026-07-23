import { useState } from "react";
import "./App.css";
import useBooks from "./hooks/useBooks";
import BookCard from "./components/BookCard";
import { Circles } from "react-loader-spinner";

function App() {
  // Stores the user's search input
  const [search, setSearch] = useState("");

  // Tracks whether the user has performed a search
  const [hasSearched, setHasSearched] = useState(false);

  // Track the current page of search results
  const [page, setPage] = useState(1);

  // Get data and functions from the custom hook
  const { books, totalBooks, loading, error, fetchBooks } = useBooks();

  // Calculate the total number of pages (100 books per page)
  const totalPages = Math.ceil(totalBooks / 100);

  // Fetch books when the Search button is clicked
  const handleSearch = () => {
    if (search.trim() !== "") {
      setHasSearched(true);
      setPage(1);
      fetchBooks(search, 1);
    }
  };

  // Go to the next page
  const handleNextPage = () => {
    const nextPage = page + 1;

    setPage(nextPage);
    fetchBooks(search || "react", nextPage);
  };

  // Go to the previous page
  const handlePreviousPage = () => {
    if (page > 1) {
      const previousPage = page - 1;

      setPage(previousPage);
      fetchBooks(search || "react", previousPage);
    }
  };

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <h1>📚 Book Library Explorer</h1>
        
        <p className="subtitle">
          Search millions of books using the Open Library API.<br></br>
          Type a title, author, or subject below.
        </p>      
      </header>

      {/* Search input and button */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a book..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            // Search when the Enter key is pressed
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button onClick={handleSearch}>Search</button>

        <button onClick={() => {
          setSearch("");
          setHasSearched(false);
          setPage(1);
          fetchBooks("react", 1);
        }}
        >
          Clear
        </button>
      </div>

      {/* Count the number of books found */}
      {books.length > 0 && (
        <p className="results-count">
          Showing {books.length} of {totalBooks.toLocaleString()} books for{" "}
          <strong>"{search || "react"}"</strong>
        </p>
      )}

      {/* Display loading message while fetching data */}
      {loading && (
        <div className="loader">
          <Circles height="70" width="70" color="#2563eb" ariaLabel="loading"/>
        </div>
      )}

      {/* Display an error message if the API request fails */}
      {error && <p className="error">{error}</p>}

      {/* NEW: Only show this after the user has searched */}
      {hasSearched && !loading && books.length === 0 && (
        <p className="no-results">
          No books found. Try another search.
        </p>
      )}

      {/* Display all books returned by the API */}
      <div className="books-container">
        {books.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>

      {/* Next and previous page button */}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          ← Previous
        </button>

        <span className="page-number">
          Page {page} of {totalPages}
        </span>

        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next →
        </button>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>Developed by Kazadi Mukendi © 2026</p>
      </footer>

    </div>
  );
}

export default App;