function BookCard({ book }) {
  return (
    <div className="book-card">
      <div className="book-top">

        {/* Display the book cover or a placeholder if none is available */}
        {book.cover_i ? (
          <img
            className="book-cover"
            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}

            /* Only load the image when it is close to the screen */
            loading="lazy"

            /* Let the browser decode the image in the background */
            decoding="async"

            alt={book.title}
          />
        ) : (
          <div className="book-cover no-cover">
            No Cover
          </div>
        )}

        <div className="book-info">

          {/* Display the book language */}
          <p className="book-language">
            {book.language
              ? book.language[0].toUpperCase()
              : "Unknown"}
          </p>

          {/* Display the book title */}
          <h3 className="book-title" title={book.title}>
            {book.title}
          </h3>

          {/* Display the first author or a default name */}
          <p className="book-author">
            {book.author_name ? book.author_name[0] : "Unknown Author"}
          </p>
        </div>
      </div>

      <div className="book-divider"></div>

      <div className="book-footer">

        {/* Display the first published year */}
        <span>{book.first_publish_year || "N/A"}</span>

        {/* Display the number of editions */}
        <span>
          {book.edition_count
            ? `${book.edition_count} editions`
            : "1 edition"}
        </span>
      </div>
    </div>
  );
}

export default BookCard;