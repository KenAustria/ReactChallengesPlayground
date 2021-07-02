import { SearchPage } from "./pages/searchPage";
import "./styles.css";

export const App = () => {
  return (
    <div className="App">
      <h1>Google Books</h1>
      <SearchPage />
    </div>
  );
};

import React, { useState } from "react";
import BookSearchForm from "../components/BookSearchForm";
import BookList from "../components/BookList";
import Loader from "../components/Loader";
import axios from "axios";

const API_BASE_URL = `https://www.googleapis.com/books/v1/volumes`;

export const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState({ items: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleBookFetch = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setIsError(false);
    const fetchBooks = async () => {
      try {
        const result = await axios.get(`${API_BASE_URL}?q=${query}`);
        setIsLoading(false);
        setBooks(result.data);
      } catch (isError) {
        setIsError(true);
      }
    };
    fetchBooks();
  };

  return (
    <div>
      <BookSearchForm
        query={query}
        setQuery={setQuery}
        handleBookFetch={handleBookFetch}
      />
      {isLoading ? (
        <Loader query={query} isLoading={isLoading} />
      ) : (
        <BookList books={books} />
      )}
    </div>
  );
};

export const BookSearchForm = ({ query, setQuery, handleBookFetch }) => {
  return (
    <div>
      <form onSubmit={handleBookFetch}>
        <label>
          Search the world's most comprehensive index of full-text books.
        </label>
        <div>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            required
          />
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
};

export const BookList = ({ books }) => {
  return (
    <div>
      <ul>
        {books.items.map((book, index) => {
          return <Book book={book} key={index} />;
        })}
      </ul>
    </div>
  );
};

export const Book = ({ book }) => {
  return (
    <li>
      <div>
        <div>
          <h3>{book.volumeInfo.title}</h3>
        </div>
        <div>
          <img
            alt={`${book.volumeInfo.title} book`}
            src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
          />
        </div>
      </div>
      <hr />
    </li>
  );
};