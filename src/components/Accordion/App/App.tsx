import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import Accordion from '../components/Accordion/Accordion';

const App = () => {
  return (
    <Provider store={store}>
      <Accordion />
    </Provider>
  );
};

export default App;
