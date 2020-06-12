import React, { useEffect } from "react";
import PropTypes from "prop-types";

const useClickInside = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

useClickInside.propTypes = {
  ref: PropTypes.ref,
  callback: PropTypes.func
};

export default useClickInside;
