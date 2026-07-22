import { useState } from "react";
import "./App.css";
import useBooks from "./hooks/useBooks";
import BookCard from "./components/BookCard";

function App() {
  // Stores the user's search input
  const [search, setSearch] = useState("");

  // NEW: Tracks whether the user has performed a search
  const [hasSearched, setHasSearched] = useState(false);

  // Get data and functions from the custom hook
  const { books, loading, error, fetchBooks } = useBooks();

  // Fetch books when the Search button is clicked
  const handleSearch = () => {
    if (search.trim() !== "") {
      setHasSearched(true);
      fetchBooks(search);
    }
  };

  return (
    <div className="app">
      <h1>📚 Book Search App</h1>

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
      </div>

      {/* Display loading message while fetching data */}
      {loading && <p>Loading books...</p>}

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
    </div>
  );
}

export default App;