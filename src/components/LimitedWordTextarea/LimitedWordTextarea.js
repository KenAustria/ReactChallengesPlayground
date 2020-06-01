/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

const LimitedWordTextarea = ({ rows, cols, value, limit }) => {
  const [content, setContent] = useState(value);
  const [wordCount, setWordCount] = useState(0);

  // only render what's within limit
  const setFormattedContent = text => {
    let words = text.split(" ");
    // removing falsey entries from an array
    if (words.filter(Boolean).length > limit) {
      setContent(
        text
          .split(" ")
          .slice(0, limit)
          .join(" ")
      );
      setWordCount(limit);
    } else {
      setContent(text);
      setWordCount(words.filter(Boolean).length);
    }
  };

  useEffect(() => {
    setFormattedContent(content);
  }, []);

  return (
    <div>
      <textarea
        rows={rows}
        cols={cols}
        value={content}
        onChange={event => setContent(event.target.value)}
      />
      <p>
        {wordCount} / {limit}
      </p>
    </div>
  );
};

export default LimitedWordTextarea;

/* <LimitedWordTextarea value="hi hello hey" limit={5} /> */