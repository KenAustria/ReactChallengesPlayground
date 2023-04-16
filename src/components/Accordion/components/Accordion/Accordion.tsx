import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../features/posts/postsSlice';
import { RootState, AppDispatch } from '../../store';
import { Post } from '../../types';
import { useKeyboardEvents } from './keyboardEvents';
import './Accordion.css';
import React from 'react';

interface Props {}

const Accordion: React.FC<Props> = () => {
  // Get the Redux dispatch function
  const dispatch: AppDispatch = useDispatch();

  // Define the stateful variables
  const [expanded, setExpanded] = useState<number | null>(null);

  // Selectors for the Redux store
  const posts = useSelector((state: RootState) => state.posts);
  const isLoading = useSelector((state: RootState) => state.posts.isLoading);
  const error = useSelector((state: RootState) => state.posts.error);

  // Get the keyboard events
  const { activeIndex, handleKeyDown } = useKeyboardEvents(posts);

  // Function to toggle an accordion panel
  const handleToggle = (index: number) => {
    setExpanded((expanded) => (expanded === index ? null : index));
  };

  // Fetch posts from the API
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Update expanded state when active index changes
  useEffect(() => {
    if (activeIndex !== null) {
      setExpanded(activeIndex);
    }
  }, [activeIndex]);

  // Render loading message if data is still being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render error message if there was an error fetching data
  if (error) {
    return <div>{error}</div>;
  }

  // Render the accordion component
  return (
    <div>
      {/* Check if there are any posts to display */}
      {posts.data.length > 0 &&
        // Loop through each post and create an accordion item
        posts.data.map((post: Post, index: number) => (
          <article key={post.id}>
            {/* Create the accordion button */}
            <button
              className="AccordionButton"
              // Handle the click event on the button
              onClick={() => handleToggle(index)}
              // Handle the keydown event on the button
              onKeyDown={handleKeyDown}
              // Set the aria-expanded attribute based on whether the item is expanded or not
              aria-expanded={expanded === index}
              // Set the aria-controls attribute to the corresponding panel
              aria-controls={`accordion-panel-${index}`}
              // Set the tabindex to 0 if the item is active, -1 otherwise
              tabIndex={activeIndex === index ? 0 : -1}
            >
              {post.title}
            </button>
            {/* Create the panel */}
            <div
              // Set the id to match the corresponding button
              id={`accordion-panel-${index}`}
              // Set the hidden attribute based on whether the item is expanded or not
              hidden={expanded !== index}
              // Set the aria-hidden attribute based on whether the item is expanded or not
              aria-hidden={expanded !== index}
            >
              <p>{post.body}</p>
            </div>
          </article>
        ))}
    </div>
  );
};

export default Accordion;
