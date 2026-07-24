import { useState, useEffect, useRef } from "react";
import "./App.css";
import useBooks from "./hooks/useBooks";
import BookCard from "./components/BookCard";
import { Circles } from "react-loader-spinner";
import { FiSearch } from "react-icons/fi";
import bookIllustration from "./assets/openBook.svg";

function App() {
  // Stores the user's search input
  const [search, setSearch] = useState("");

  // Tracks whether the user has performed a search
  const [hasSearched, setHasSearched] = useState(false);

  // Track the current page of search results
  const [page, setPage] = useState(1);

  // Show or hide the Back to Top button
  const [showButton, setShowButton] = useState(false);

  // Reference to the book results section
  const booksRef = useRef(null);

  // Get data and functions from the custom hook
  const { books, totalBooks, loading, error, fetchBooks } = useBooks();

  // Calculate the total number of pages (100 books per page)
  const totalPages = Math.ceil(totalBooks / 100);

  // Show the Back to Top button when the user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    // Listen for scroll events
    window.addEventListener("scroll", handleScroll);

    // Remove the listener when the component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to the book results after new books have loaded
  useEffect(() => {
    if (!loading && books.length > 0 && booksRef.current) {
      booksRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [books, loading]);

  // Fetch books when the Search button is clicked
  const handleSearch = () => {
    if (search.trim() !== "") {
      setHasSearched(true);
      setPage(1);

      // Fetch the first page of books
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
      <header className="hero">
        <div className="hero-text">
          <h1>Book Library Explorer</h1>

          <p className="subtitle">
            Discover millions of books from the Open Library database.
          </p>

          <p className="hero-description">
            Type a title, author, or subject to find your next read.
          </p>
        </div>

        <div className="hero-image">
          <img src={bookIllustration} alt="Books illustration" />
        </div>
      </header>

      {/* Search input and button */}
      <div className="search-container">
        <div className="search-box">
          <FiSearch className="search-icon" />

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
        </div>

        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>

        <button
          disabled={loading}
          onClick={() => {
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
          <Circles
            height="70"
            width="70"
            color="#27292c"
            ariaLabel="loading"
          />
          <p>Loading books...</p>
        </div>
      )}

      {/* Display an error message if the API request fails */}
      {error && <p className="error">{error}</p>}

      {/* Only show this after the user has searched */}
      {hasSearched && !loading && books.length === 0 && (
        <p className="no-results">
          No books found. Try another search.
        </p>
      )}

      {/* Display all books returned by the API */}
      <div ref={booksRef} className="books-container">
        {books.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>

      {/* Next and previous page button */}
      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1 || loading}
        >
          ← Previous
        </button>

        <span className="page-number">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={page === totalPages || loading}
        >
          Next →
        </button>
      </div>

      {/* Back to Top button */}
      {showButton && (
        <button
          className="back-to-top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          ↑ Top
        </button>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>
          <strong>📚 Book Library Explorer</strong>
        </p>

        <p>Search and discover books using the Open Library API.</p>

        <p>Developed by Kazadi Mukendi © 2026</p>
      </footer>
    </div>
  );
}

export default App;