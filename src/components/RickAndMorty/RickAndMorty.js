import React, { useState } from "react";
import Home from "./components/Home"
import { QueryErrorResetBoundary } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ReactQueryDevtools } from "react-query/devtools";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

const App = () => {
  const [idQuery, setIdQuery] = useState(0);

	// VARIABLES
	// const previousCharacters = Object.values(cacheData.queriesMap).map(character => (
	// 	// TypeError: Cannot read property name of undefined
	// 	// ..because state is undefined from initial fetch on mount ["rickandmorty",0]
	// 	// disable fetch on mount to solve
	// 	<button>{character.state.data.name}</button>
	// ))

  return (
    <div>
			<QueryErrorResetBoundary>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            setIdQuery(0)
          }}
          resetKeys={[idQuery]}
        >
					<Home idQuery={idQuery} setIdQuery={setIdQuery} />
				</ErrorBoundary>
      </QueryErrorResetBoundary>
			<div>
				{/* {previousCharacters} */}
			</div>
			<ReactQueryDevtools initialIsOpen={true} />
    </div>
  );
};

export default App;


import React from "react";
import SearchForm from "../SearchForm"
import RickAndMortyInfo from "../RickAndMortyInfo/";
import axios from "axios";
import { useQuery } from "react-query";
import PropTypes from "prop-types"

const Home = ({ idQuery, setIdQuery}) => {
  const delay = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }

	const handleRickAndMortyFetch = () => {
    return delay()
			// No 'catch' method because React Query expects unresolved promise
      .then(() => axios(`https://rickandmortyapi.com/api/character/${idQuery}`))
      // hand off response to React Query
			.then((res) => res.data);
  };

	const { isLoading, error, data } = useQuery(
    ["rickandmorty", idQuery],
    handleRickAndMortyFetch,
    {
			retry: false,
      refetchOnWindowFocus: true,
      enabled: idQuery !== 0, // don't fetch on mount AND enable fetch only when input is not empt
      useErrorBoundary: true,
			onError: (error) => console.log(error)
    }
  );

  const handleFetchOnInputChange = event => {
		setIdQuery(event.target.value, () => {
			handleRickAndMortyFetch()
		})
	}


  return (
    <div>
      <SearchForm idQuery={idQuery} setIdQuery={setIdQuery} isLoading={isLoading} error={error} handleFetchOnInputChange={handleFetchOnInputChange} />
      <RickAndMortyInfo rickAndMortyCharacter={data} />
    </div>
  )
}

Home.propTypes = {
  idQuery: PropTypes.number,
  setIdQuery: PropTypes.func
}

export default Home

import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQueryClient } from "react-query";

const SearchForm = ({ idQuery, setIdQuery, isLoading, error, handleFetchOnInputChange }) => {

  const queryClient = useQueryClient();

  const searchSchema = yup.object().shape({
    rickAndMortyId: yup.number().required().positive().integer()
  });
  const { register, handleSubmit, errors, setValue, watch } = useForm({
    resolver: yupResolver(searchSchema)
  });
  const formId = watch("rickAndMortyId");
  const disable = isLoading || parseFloat(formId) === idQuery || !idQuery;
  /* const cacheData = queryClient.getQueryData(["rickandmorty", idQuery], {
	   	exact: false,
	 	  enabled:
	  })
  */
	const cacheData = queryClient.getQueryCache(["rickandmorty", idQuery], {
		exact: false,
		enabled: false
	})

  const handleSubmitForm = (formData) => setIdQuery(formData.rickAndMortyId);
  const handleCacheClear = () => queryClient.removeQueries("rickandmorty")
  const handleLogCache = () => {
		console.log(cacheData.queriesMap)
		console.log(Object.values(cacheData.queriesMap)) // returns [{}, {{{ }}}]
		// console.log(Object.values(cacheData.queriesMap["[\"rickandmorty\",\"1\"]"].state.data.name).join(""))
	}

  const getRandomRickAndMortyCharacterId = () => {
    const NUMBER_OF_RICK_AND_MORTY_CHARACTERS = 672;
    const min = Math.ceil(1);
    const max = Math.floor(NUMBER_OF_RICK_AND_MORTY_CHARACTERS);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div>
      <div></div>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <h3>Rick and Morty</h3>
          <input
            type="number"
            name="rickAndMortyId"
            placeholder="Between 1 and 671"
            ref={register}
            disabled={isLoading}
            onChange={handleFetchOnInputChange}
          />
          {errors.rickAndMortyId && <span>This field is required</span>}
          {error && <p>Error occurred: {error.message}</p>}
          <button type="submit" disabled={disable}>
            Search Character
          </button>
        </form>
        <button
          onClick={() => {
            const randomId = getRandomRickAndMortyCharacterId();
            setValue("rickAndMortyId", randomId);
            setIdQuery(randomId);
          }}
        >
          Random
        </button>
        <button onClick={handleLogCache}>Log cache from last request</button>
				<button onClick={handleCacheClear}>Clear Cache</button>
    </div>
  )
}

SearchForm.propTypes = {
  idQuery: PropTypes.number,
  setIdQuery: PropTypes.func,
  handleRickAndMortyFetch: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.object
}

export default SearchForm


import React from "react";
import PropTypes from "prop-types";

const RickandMortyInfo = ({ rickAndMortyCharacter }) => {
  return (
    <div>
      {rickAndMortyCharacter?.name ? (
        <div>
          <h1>{rickAndMortyCharacter.name}</h1>
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
