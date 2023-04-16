import { useState } from 'react';
import { Post } from '../../types';

export const useKeyboardEvents = (posts: { data: Post[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const { key } = event;
    const numButtons = posts.data.length;

    switch (key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        setActiveIndex(
          activeIndex === null ? 0 : (numButtons + activeIndex - 1) % numButtons
        );
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        setActiveIndex(
          activeIndex === null ? 0 : (activeIndex + 1) % numButtons
        );
        break;
      case 'Tab':
        event.preventDefault();
        setActiveIndex(
          activeIndex === null ? 0 : (activeIndex + 1) % numButtons
        );
        break;
      default:
        break;
    }
  };

  return { activeIndex, handleKeyDown };
};
