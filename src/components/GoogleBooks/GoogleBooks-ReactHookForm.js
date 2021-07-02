import { SearchPage } from './pages/searchPage';
import './styles.css';

export const App = () => {
  return (
    <div className='App'>
      <h1>Google Books</h1>
      <SearchPage />
    </div>
  );
};

import React, { useState } from 'react';
import BookSearchForm from '../components/BookSearchForm';
import BookList from '../components/BookList';

export const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState({ items: [] });

  return (
    <div>
      <BookSearchForm setQuery={setQuery} setBooks={setBooks} />
      <BookList books={books} />
    </div>
  );
};

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const API_BASE_URL = `https://www.googleapis.com/books/v1/volumes`;
const schema = yup.object().shape({
  book: yup.string().required(),
});

export const BookSearchForm = ({ setQuery, setBooks }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleBookFetch = async data => {
    try {
      const result = await axios.get(`${API_BASE_URL}?q=${data.book}`);
      console.log(data.book);
      console.log(result);
      setBooks(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleBookFetch)}>
        <label name='book'>
          Search the world's most comprehensive index of full-text books.
        </label>
        <div>
          <input
            type='text'
            name='book'
            onChange={event => setQuery(event.target.value)}
            {...register('book')}
          />
          <p>{errors.book?.message}</p>
          <button type='submit'>Search</button>
        </div>
      </form>
    </div>
  );
};

import Book from '../Book';

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
