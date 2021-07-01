import { Home } from "./pages/home";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>2x2 Board</h1>
      <Home />
    </div>
  );
}


import Board from "../Board";

export const Home = () => {
  return (
    <div>
      <Board />
    </div>
  );
};

import React, { useState } from "react";
import Square from "../Square";
import "./board.css";

export const Board = () => {
  const [squares, setSquares] = useState([
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
    { id: 4, value: 0 }
  ]);

  const handleIncrement = (id) => {
    const targetSquare = squares.find((s) => s.id === id);
    targetSquare.value = targetSquare.value + 1;
    setSquares([...squares]);
  };

  return (
    <div className="board">
      {squares.map((s, i) => (
        <Square
          key={i}
          value={s.value}
          increment={() => handleIncrement(s.id)}
        />
      ))}
    </div>
  );
};

// .board {
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-template-rows: auto auto;
// }

export const Square = ({ value, increment }) => {
  return <button onClick={increment}>{value}</button>;
};
