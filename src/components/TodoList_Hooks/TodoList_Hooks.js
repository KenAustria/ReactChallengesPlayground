import React, { useState, useReducer, useContext, createContext } from "react";
import { v4 as uuidv4 } from "uuid";

const TodoContext = createContext(null);

const initialTodos = [];

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_ALL":
      return "ALL";
    case "SHOW_COMPLETE":
      return "COMPLETE";
    case "SHOW_INCOMPLETE":
      return "INCOMPLETE";
    default:
      throw new Error();
  }
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case "DO_TODO":
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true };
        } else {
          return todo;
        }
      });
    case "UNDO_TODO":
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false };
        } else {
          return todo;
        }
      });
    case "ADD_TODO":
      return state.concat({
        task: action.task,
        id: uuidv4(),
        complete: false
      });
    default:
      throw new Error();
  }
};

const TodoList_Hook = () => {
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);
  const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");

  const filteredTodos = todos.filter(todo => {
    if (filter === "ALL") {
      return true;
    }

    if (filter === "COMPLETE" && todo.complete) {
      return true;
    }

    if (filter === "INCOMPLETE" && !todo.complete) {
      return true;
    }

    return false;
  });

  return (
    <TodoContext.Provider value={dispatchTodos}>
      <Form />
      <TodoList todos={filteredTodos} />
      <Filter dispatch={dispatchFilter} />
    </TodoContext.Provider>
  );
};

const Form = () => {
  const dispatch = useContext(TodoContext);
  const [task, setTask] = useState("");

  const handleInputChange = event => {
    setTask(event.target.value);
  };

  const handleSubmitTask = event => {
    if (task) {
      dispatch({ type: "ADD_TODO", task });
    }
    setTask("");
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmitTask}>
      <input type="text" value={task} onChange={handleInputChange} />
      <button type="submit">Submit Task</button>
    </form>
  );
};

const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </ul>
);

const TodoItem = ({ todo }) => {
  const dispatch = useContext(TodoContext);

  const handleChangeCheckBox = () => {
    dispatch({
      type: todo.complete ? "UNDO_TODO" : "DO_TODO",
      id: todo.id
    });
  };

  return (
    <li key={todo.id}>
      <label>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleChangeCheckBox}
        />
        {todo.task}
      </label>
    </li>
  );
};

const Filter = ({ dispatch }) => {
  const handleShowAll = () => {
    dispatch({ type: "SHOW_ALL" });
  };

  const handleShowComplete = () => {
    dispatch({ type: "SHOW_COMPLETE" });
  };

  const handleShowIncomplete = () => {
    dispatch({ type: "SHOW_INCOMPLETE" });
  };

  return (
    <div>
      <button type="button" onClick={handleShowAll}>
        Show All
      </button>
      <button type="button" onClick={handleShowComplete}>
        Show Complete
      </button>
      <button type="button" onClick={handleShowIncomplete}>
        Show Incomplete
      </button>
    </div>
  );
};

export default TodoList_Hook;
