import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Countdown = ({ seconds }) => {
  let [time, setTime] = useState(seconds);

  useEffect(() => {
    if (!time) return;

    let intervalId = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <div>
      <h1>{time}</h1>
    </div>
  );
};

Countdown.propTypes = {
  seconds: PropTypes.number
};

export default Countdown;
