import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QueryClientProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


import React, { useState, useRef } from "react";
import RickAndMortyInfo from "./components/RickandMortyInfo";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";
import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

const searchSchema = yup.object().shape({
  rickAndMortyId: yup.number().required().positive().integer()
});

const App = () => {
  const [idQuery, setIdQuery] = useState(0);
  const [rickAndMortyCharacter, setRickAndMortyCharacter] = useState({});
  const queryRef = useRef(null);
  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(searchSchema)
  });

  const getRandomRickAndMortyCharacterId = () => {
    const NUMBER_OF_RICK_AND_MORTY_CHARACTERS = 672;
    const min = Math.ceil(1);
    const max = Math.floor(NUMBER_OF_RICK_AND_MORTY_CHARACTERS);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleRandomFetch = (event) => {
    event.preventDefault();
    const id = getRandomRickAndMortyCharacterId();
    return axios(`https://rickandmortyapi.com/api/character/${id}`).then(
      (res) => {
        setRickAndMortyCharacter(res.data);
      }
    );
  };

  const handleRickAndMortyFetch = () => {
    return axios(`https://rickandmortyapi.com/api/character/${idQuery}`).then(
      (res) => {
        setRickAndMortyCharacter(res.data);
        console.log(getRandomRickAndMortyCharacterId());
      }
    );
  };

  const { loading, error } = useQuery("rickandmorty", handleRickAndMortyFetch, {
    refetchOnWindowFocus: false,
    enabled: false,
    useErrorBoundary: true
  });

  console.log(watch(rickAndMortyCharacter));

  return (
    <div>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          setIdQuery("");
          queryRef.current.focus();
        }}
        resetKeys={[idQuery]}
      >
        <div>
          <form onSubmit={handleSubmit(handleRickAndMortyFetch)}>
            <label htmlFor="Rick and Morty">Rick and Morty</label>
            <input
              type="number"
              name="rickAndMortyId"
              placeholder="Type ID"
              ref={register}
              onChange={(event) => setIdQuery(event.target.value)}
            />
            {errors.rickAndMortyId && <span>This field is required</span>}
            {error && <p>Error occurred: {error.message}</p>}
            <button type="submit">Search Character</button>
          </form>
          <form onSubmit={handleRandomFetch}>
            <button type="submit">Random</button>
          </form>
        </div>
        <div>
          {loading && <p>Loading...</p>}
          <RickAndMortyInfo rickAndMortyCharacter={rickAndMortyCharacter} />
        </div>
        <ReactQueryDevtools initialIsOpen={true} />
      </ErrorBoundary>
    </div>
  );
};

export default App;


import React from "react";
import PropTypes from "prop-types";

const RickandMortyInfo = ({ rickAndMortyCharacter }) => {
  return (
    <div>
      {rickAndMortyCharacter ? (
        <div>
          <p>{rickAndMortyCharacter.name}</p>
          <img src={rickAndMortyCharacter.image} alt="character" />
        </div>
      ) : (
        <p>No Character yet, please submit a Rick and Morty Character!</p>
      )}
    </div>
  );
};

RickandMortyInfo.propTypes = {
  rickAndMortyCharacter: PropTypes.object
};

export default RickandMortyInfo;
