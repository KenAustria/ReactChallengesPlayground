import React, { useState, useReducer } from "react";

const TextEditorReducer = (textArr, action) => {
  switch (action.type) {
    case "append":
      return [...textArr, action.text];
    case "undo":
      return textArr.slice(0, -1);
    default:
      throw new Error();
  }
};

const TextEditor = props => {
  const [text, setText] = useState("");
  const [textArr, dispatch] = useReducer(TextEditorReducer, []);

  const appendHandler = event => {
    dispatch({ type: "append", text });
    setText("");
  };

  const undoHandler = event => {
    dispatch({ type: "undo" });
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={text}
          onChange={event => setText(event.target.value)}
        />
        <button onClick={appendHandler} disabled={text === ""}>
          Append
        </button>
        <button onClick={undoHandler} disabled={textArr.length === 0}>
          Undo
        </button>
      </div>
      <div>{textArr.join(" ")}</div>
    </>
  );
};

export default TextEditor;
