import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Accordion from './Accordion';
import { Post } from '../../types';
import { fetchPosts } from '../../features/posts/postsSlice';

const mockStore = configureStore([thunk]);

describe('Accordion', () => {
  let store: ReturnType<typeof mockStore>;
  let posts: Post[];

  beforeEach(() => {
    store = mockStore({
      posts: {
        data: [],
        isLoading: false,
        error: null,
      },
    });

    posts = [
      {
        id: 1,
        title: 'Post 1',
        body: 'Body 1',
      },
      {
        id: 2,
        title: 'Post 2',
        body: 'Body 2',
      },
    ];
  });

  it('renders the loading state correctly', () => {
    store = mockStore({
      posts: {
        data: [],
        isLoading: true,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <Accordion />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the error state correctly', () => {
    const error = 'An error occurred';

    store = mockStore({
      posts: {
        data: [],
        isLoading: false,
        error,
      },
    });

    render(
      <Provider store={store}>
        <Accordion />
      </Provider>
    );

    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('renders the posts correctly', async () => {
    store.dispatch(fetchPosts.fulfilled(posts, ''));

    render(
      <Provider store={store}>
        <Accordion />
      </Provider>
    );

    expect(await screen.findByText(posts[0].title)).toBeInTheDocument();
    expect(await screen.findByText(posts[1].title)).toBeInTheDocument();
  });

  it('toggles the accordion panel when the button is clicked', async () => {
    store.dispatch(fetchPosts.fulfilled(posts, ''));

    render(
      <Provider store={store}>
        <Accordion />
      </Provider>
    );

    const button = await screen.findByText(posts[0].title);
    fireEvent.click(button);

    expect(
      screen.getByRole('region', { name: posts[0].title })
    ).toHaveAttribute('aria-hidden', 'false');
  });

  it('navigates through the accordion buttons using the keyboard', async () => {
    store.dispatch(fetchPosts.fulfilled(posts, ''));

    render(
      <Provider store={store}>
        <Accordion />
      </Provider>
    );

    const button1 = await screen.findByText(posts[0].title);
    const button2 = await screen.findByText(posts[1].title);

    fireEvent.keyDown(button1, { key: 'ArrowDown' });

    expect(document.activeElement).toEqual(button2);

    fireEvent.keyDown(button2, { key: 'ArrowUp' });

    expect(document.activeElement).toEqual(button1);
  });
});
function beforeEach(arg0: () => void) {
  throw new Error('Function not implemented.');
}

function expect(arg0: HTMLElement) {
  throw new Error('Function not implemented.');
}
