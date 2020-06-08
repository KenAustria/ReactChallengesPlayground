import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./FileDrop.css";

const FileDrop = props => {
  const [drag, setDrag] = useState(false);
  const [filename, setFilename] = useState("");
  const dropRef = useRef();
  let dragCounter = useState(0);

  useEffect(() => {
    let div = dropRef.current;
    div.addEventListener("dragenter", handleDragIn);
    div.addEventListener("dragleave", handleDragOut);
    div.addEventListener("dragover", handleDrag);
    div.addEventListener("drop", handleDrop);
    return function cleanup() {
      div.removeEventListener("dragenter", handleDragIn);
      div.removeEventListener("dragleave", handleDragOut);
      div.removeEventListener("dragover", handleDrag);
      div.removeEventListener("drop", handleDrop);
    };
  });

  const handleDrag = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragIn = event => {
    event.preventDefault();
    event.stopPropagation();
    dragCounter++;
    if (event.dataTransfer.items && event.dataTransfer.length > 0)
      setDrag(true);
  };

  const handleDragOut = event => {
    event.preventDefault();
    event.stopPropagation();
    dragCounter--;
    if (dragCounter === 0) setDrag(false);
  };

  const handleDrop = event => {
    event.preventDefault();
    event.stopPropagation();
    setDrag(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      props.handleDrop(event.dataTransfer.files[0]);
      setFilename(event.dataTransfer.files[0].name);
      event.dataTransfer.clearData();
      dragCounter = 0;
    }
  };

  return (
    <div
      ref={dropRef}
      className={
        drag ? "filedrop drag" : filename ? "filedrop ready" : "filedrop"
      }
    >
      {filename && !drag ? <p>{filename}</p> : <div>Drop files here..</div>}
    </div>
  );
};

FileDrop.propTypes = {
  handleDrop: PropTypes.func
};

export default FileDrop;

{/* <FileDrop handleDrop={console.log} /> */}