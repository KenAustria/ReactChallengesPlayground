// filename: Alert.js
// import into App to render
import React, { useState, useEffect } from "react";
import "./Alert.css";
import PropTypes from "prop-types";

const Alert = ({ isDefaultShown, timeout, type, message }) => {
  const [isShown, setIsShown] = useState(isDefaultShown);
  const [isLeaving, setIsLeaving] = useState(false);

  // instance for clearing on component unmount.
  let timeoutId = null;

  // hook to update the value of isShown to true and clear interval
  // .. by using timeoutId when component is unmounted
  useEffect(() => {
    setIsShown(true);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isDefaultShown, timeout, timeoutId]);

  // to set the component to be removed from DOM
  const closeAlert = () => {
    setIsLeaving(true);
    timeoutId = setTimeout(() => {
      setIsLeaving(false);
      setIsShown(false);
    }, timeout);
  };

	// chaining .alert with either '.warning or .error AND conditional for .leaving
	// ternaries instead of && `https://kentcdodds.com/blog/use-ternaries-rather-than-and-and-in-jsx`
  return (
    <div>
      {isShown ? (
        <div
          className={`alert ${type}${isLeaving ? "leaving" : ""}`}
          role="alert"
          data-testid="alert"
        >
          <button className="close" onClick={closeAlert} />
          {message}
        </div>
      ) : null}
    </div>
  );
};

Alert.propTypes = {
  isDefaultShown: PropTypes.bool,
  timeout: PropTypes.number,
  type: PropTypes.string,
  message: PropTypes.string
};

export default Alert;

{/* <Alert isDefaultShown="true" timeout="250" type="warning" message="Are you sure?" /> */}
