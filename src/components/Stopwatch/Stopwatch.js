import React, { useState, useEffect } from "react";

const Stopwatch = props => {
  let [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId = setInterval(() => {
      setTime(time + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  const clearHandler = () => setTime(0);

  return (
    <>
      <div>
        <h1>{time}</h1>
      </div>
      <div>
        <button onClick={clearHandler}>Clear</button>
      </div>
    </>
  );
};

export default Stopwatch;
