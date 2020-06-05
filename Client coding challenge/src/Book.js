import React from "react";

function Book(props) {
  const { books } = props;
  if (!books) {
    return <h1>No se encontraron resultados.</h1>;
  }
  if (books.length === 0) {
    return <h3>Busca un libro!</h3>;
  }
  return (
    <div style={{ textAlign: "center" }}>
      <h3>{books.length} results found!</h3>
      {books.map((book) => {
        return (
          <div key={book.id} className="search-item">
            <img
              alt={`imagen de ${book.title}`}
              src={book.images && book.images.smallThumbnail}
            ></img>
            <h3>{book.title}</h3>
            <p>Autor@s:</p>
            <div>
              {book.authors && book.authors.map((author) => <p>{author}</p>)}
            </div>
            <p>Descripción:</p>
            <p>{book.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Book;
