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
import { useBooksFetch } from "../hooks/useBooksFetch/useBooksFetch";

const API_BASE_URL = `https://www.googleapis.com/books/v1/volumes`;

export const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [
    { data, isLoading, isError },
    setUrl
  ] = useBooksFetch(`${API_BASE_URL}?q=${query}`, { items: [] });

  const handleBooksFetch = (event) => {
    event.preventDefault();
    setUrl(`${API_BASE_URL}?q=${query}`);
  };

  return (
    <div>
      <BookSearchForm
        query={query}
        setQuery={setQuery}
        handleBooksFetch={handleBooksFetch}
      />
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <Loader query={query} isLoading={isLoading} />
      ) : (
        <BookList books={data} />
      )}
    </div>
  );
};

import { useState, useEffect } from "react";
import axios from "axios";

export const useBooksFetch = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (isError) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchBooks();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

export const BookSearchForm = ({ query, setQuery, handleBooksFetch }) => {
  return (
    <div>
      <form onSubmit={handleBooksFetch}>
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

export const Loader = ({ query, isLoading }) => {
  return (
    <>
      {isLoading && (
        <div style={{ color: `green` }}>
          fetching books for "<strong>{query}</strong>"
        </div>
      )}
    </>
  );
};

import Book from "../Book";

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
