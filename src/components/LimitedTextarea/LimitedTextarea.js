import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Textarea = styled.textarea`
  width: 400px;
  height: 150px;
  border: 2px solid #808080;
  border-radius: 10px;
  padding: 7px;
  margin: 7px;
  font-family: Arial, sans-serif;
`;

const LimitedTextarea = ({ value = "Cheers! 🍻", limit = "20" }) => {
  const [content, setContent] = useState(value);

  const setFormattedContent = text => {
    text.length > limit ? setContent(text.slice(0, limit)) : setContent(text);
  };

  useEffect(() => {
    setFormattedContent(content);
  }, []);

  return (
    <div>
      <Textarea
        value={content}
        placeholder="10 Character Limit"
        data-testid="textarea"
        onChange={event => setFormattedContent(event.target.value)}
      />
      <p>
        {content.length}/{limit}
      </p>
    </div>
  );
};

LimitedTextarea.propTypes = {
  limit: PropTypes.number,
  value: PropTypes.string
};

export default LimitedTextarea;

// 1st Attempt
// const LimitedTextarea = ({ limit }) => {
//   const [text, setText] = useState("");

//   return (
//     <form>
// 			<label>Handle</label>
//       <input type="text" name="handle" value="text" onChange={event => setText(event.target.value)} />
//     </form>
//   );
// };

// 2nd Attempt
// const LimitedTextarea = ({ limit }) => {
// const [text, setText] = useState({ handle: "", location: ""});

//   const inputChangeHandler = event => {
//     const value = event.target.value;
//     // extract value from event object and assign to dynamic key
//     setText({ ...text, [event.target.name]: value });
//   };

//   return (
//     <form>
//       <label>Handle</label>
//       <input type="text" name="handle" value={text.handle} onChange={inputChangeHandler} />
//       <label>Location</label>
//       <input type="text" name="location" value={text.location} onChange={inputChangeHandler}/>
//     </form>
//   );
// };

// 3rd Attempt
// const LimitedTextarea = ({ limit }) => {
//   const [text, setText] = useState({
//     handle: "",
//     location: ""
//   });

//   const inputChangeHandler = event => {
//     const value = event.target.value;
//     if (value < limit) {
//       setText({ ...text, [event.target.name]: value });
//     }
//   };

//   return (
//     <form>
//       <label>Handle</label>
//       <input
//         type="text"
//         name="handle"
//         value={text.handle}
//         onChange={inputChangeHandler}
//       />
//       <label>Location</label>
//       <input
//         type="text"
//         name="location"
//         value={text.location}
//         onChange={inputChangeHandler}
//       />
//     </form>
//   );
// };
