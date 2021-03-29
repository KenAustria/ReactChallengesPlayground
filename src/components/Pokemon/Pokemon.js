// import { QueryClient, QueryClientProvider } from 'react-query'

// const queryClient = new QueryClient()

// ReactDOM.render(
// 	<QueryClientProvider client={queryClient}>
// 		<React.StrictMode>
// 			<App />
// 		</React.StrictMode>
// 	</QueryClientProvider>,
//   document.getElementById('root')
// );

import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import PokemonInfo from "./components/PokemonInfo";
import { QueryErrorResetBoundary } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>The Pokemon is not in the database.</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
      <p>This error was caught by React Error Boundary!</p>
    </div>
  );
};

const App = () => {
  const [query, setQuery] = useState("");
  const [pokemonCharacter, setPokemonCharacter] = useState({});

  return (
    <div>
      <QueryErrorResetBoundary>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            setQuery("");
          }}
          resetKeys={[query]}
        >
          <SearchForm
            query={query}
            setQuery={setQuery}
            pokemonCharacter={pokemonCharacter}
            setPokemonCharacter={setPokemonCharacter}
          />
        </ErrorBoundary>
      </QueryErrorResetBoundary>
      <PokemonInfo pokemonCharacter={pokemonCharacter} />
      <ReactQueryDevtools initialIsOpen={true} />
    </div>
  );
};

export default App;

import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery } from "react-query";
import axios from "axios";

const searchSchema = yup.object().shape({
  pokemonName: yup.string().required()
});

const SearchForm = ({
  query,
  setQuery,
  pokemonCharacter,
  setPokemonCharacter
}) => {
  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(searchSchema)
  });

  const { loading, error } = useQuery(
    "pokemon",
    () =>
      axios(`https://pokeapi.co/api/v2/pokemon/${query}`).then((res) => {
        setPokemonCharacter(res.data);
      }),
    {
      retry: true, // resets app, no error boundary trigger
      // retry: false, // triggers error boundary, no app reset
      refetchOnWindowFocus: false,
      enabled: !!query,
      useErrorBoundary: true,
      onError: (error) => console.log(error)
    }
  );

  console.log(watch(pokemonCharacter));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="Pokemon">Pokémon Character</label>
        <input
          type="text"
          name="pokemonName"
          ref={register}
          onChange={(event) => setQuery(event.target.value)}
        />
        {errors.pokemonName && <span>This field is required</span>}
        {error && <p>Error occurred: {error.message}</p>}
        <button type="submit">Search Pokémon</button>
      </form>
      {loading && <p>Loading...</p>}
    </div>
  );
};

SearchForm.propTypes = {
  setQuery: PropTypes.func,
  pokemonCharacter: PropTypes.object
};

export default SearchForm;


import React from "react";
import PropTypes from "prop-types";

const PokemonInfo = ({ pokemonCharacter }) => {
  return (
    <div>
      {pokemonCharacter.name ?
        <div>
          <p>{pokemonCharacter.name}</p>
          <img src={pokemonCharacter.sprites.front_default} alt="pokemon" />
        </div>
      : <p>No Pokemon yet, please submit a Pokemon!</p>}
    </div>
  );
};

PokemonInfo.propTypes = {
  pokemonCharacter: PropTypes.object
};

export default PokemonInfo;