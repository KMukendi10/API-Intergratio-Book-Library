import { useState } from "react";
import "./App.css";
import useBooks from "./hooks/useBooks";

function App() {
  const [search, setSearch] = useState("");

  const { books, loading, error, fetchBooks } = useBooks();

  const handleSearch = () => {
    if (search.trim() !== "") {
      fetchBooks(search);
    }
  };

  return (
    <div className="app">
      <h1>📚 Book Search App</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a book..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading books...</p>}

      {error && <p>{error}</p>}
    </div>
  );
}

export default App;