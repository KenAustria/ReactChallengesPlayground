/* eslint-disable react/prop-types */
import React, { useState } from "react";

const PasswordRevealer = ({ value }) => {
  const [shown, setShown] = useState(false);

  return (
    <div>
      <input
        type={shown ? "text" : "password"}
        value={value}
        onChange={() => {}}
      />
      <button onClick={() => setShown(!shown)}>Hide/Show</button>
    </div>
  );
};

export default PasswordRevealer;
