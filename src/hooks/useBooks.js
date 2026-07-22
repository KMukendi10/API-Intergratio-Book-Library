import { useState, useEffect } from "react";

function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return {
    books,
    loading,
    error,
  };
}

export default useBooks;