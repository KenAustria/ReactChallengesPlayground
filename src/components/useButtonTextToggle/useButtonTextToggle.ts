import { useState, useCallback } from 'react';

// a hook to toggle button text

// Usage
function App() {
  // call the hook which returns, current value and the toggler function
  const [isButtonTextChanged, setIsButtonTextChanged] = useButtonTextToggle();
  // return button with conditional text
  return (
    <button onClick={setButtonTextToggle}>
      {isButtonTextChanged ? 'Toggled' : 'Click to Toggle'}
    </button>
  );
}

// Hook
// parameter is the boolean, with default "false" value
const useButtonTextToggle = (initialState: boolean = false): [boolean, any] => {
  // initialize the state
  const [state, useState] = useState<boolean>(initialState);

  // define and memorize toggler function in case we pass down the component,
  // this function change the boolean value to it's opposite value
  const toggleButtonTextHandler = useCallback(
    (): void => setState(state => !state),
    []
  );

  return [state, toggleButtonTextHandler];
};
