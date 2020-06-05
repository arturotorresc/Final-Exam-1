import React from "react";

function handleSubmit(setBooks) {
  let url = "https://www.googleapis.com/books/v1/volumes?q=";
  const input = document.getElementById("title-book");
  url += input.value + "+intitle";
  const options = {
    method: "GET",
  };
  fetch(url, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then((jsonData) => {
      console.log(jsonData);
      if (!jsonData || jsonData.length === 0 || jsonData.totalItems === 0) {
        setBooks(false);
        return;
      }
      let elems = [];
      jsonData.items.forEach((book) => {
        elems.push({
          authors: book.volumeInfo.authors,
          title: book.volumeInfo.title,
          description: book.searchInfo
            ? book.searchInfo.textSnippet
            : "No description available",
          images: book.volumeInfo.imageLinks,
          id: book.id,
        });
      });
      setBooks(elems);
    })
    .catch((err) => {
      console.log(err);
    });
}

function BookForm(props) {
  return (
    <>
      <h3>Book Form</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(props.setBooks);
        }}
        className="get-form"
      >
        <label htmlFor="title-book">
          Book title
          <input id="title-book" placeholder="Write the name of the book" />
        </label>
        <input className="btn-submit" type="submit" />
      </form>
    </>
  );
}

export default BookForm;
