import { useState, useEffect } from "react";

const useStickyState = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
};

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