import React from "react";
import useStickyState from "../../hooks/useStickyState";

const Greeting = ({ initialName }) => {
  const [name, setName] = useStickyState(initialName, "name");

  return (
    <>
      <form>
        <label>Name</label>
        <input type="text" onChange={(event) => setName(event.target.value)} />
      </form>
      {name ? <strong>Hello {name}</strong> : "Please type your name"}
    </>
  );
};

export default Greeting;