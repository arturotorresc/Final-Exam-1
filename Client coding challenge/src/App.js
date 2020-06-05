import React, { useState } from "react";
import "./App.css";
import Book from "./Book";
import BookForm from "./BookForm";

function App(props) {
  const [books, setBooks] = useState([]);
  return (
    <div>
      <h1>Client Coding Challenge</h1>
      <h2>By Arturo Torres - A01176590</h2>
      <BookForm setBooks={setBooks} />
      <Book books={books} />
    </div>
  );
}

export default App;
