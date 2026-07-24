function BookCard({ book }) {
  return (
    <div className="book-card">
      <div className="book-top">
        <img
          className="book-cover"
          src={
            book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
              : "https://via.placeholder.com/90x130?text=No+Cover"
          }
          /* Only load the image when it is close to the screen */
          loading="lazy"
          
          /* Let the browser decode the image in the background */
          decoding="async"

          alt={book.title}
        />

        <div className="book-info">
          <p className="book-rating">★ 289 • H</p>

          <h3 className="book-title" title={book.title}>
            {book.title}
          </h3>

          <p className="book-author">
            {book.author_name ? book.author_name[0] : "Unknown Author"}
          </p>
        </div>
      </div>

      <div className="book-divider"></div>

      <div className="book-footer">
        <span>{book.first_publish_year || "N/A"}</span>

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