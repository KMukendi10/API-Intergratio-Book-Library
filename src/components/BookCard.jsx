function BookCard({ book }) {
  return (
    <div className="book-card">
      <img
        src={
          book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "https://via.placeholder.com/150x220?text=No+Cover"
        }
        alt={book.title}
      />

      <h3>{book.title}</h3>

      <p>
        <strong>Author:</strong>{" "}
        {book.author_name ? book.author_name[0] : "Unknown"}
      </p>

      <p>
        <strong>First Published:</strong>{" "}
        {book.first_publish_year || "N/A"}
      </p>
    </div>
  );
}

export default BookCard;