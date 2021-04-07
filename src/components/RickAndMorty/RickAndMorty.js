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
			<ReactQueryDevtools initialIsOpen={true} />
    </div>
  );
};

export default App;


import React from "react";
import SearchForm from "../SearchForm"
import RickAndMortyInfo from "../RickAndMortyInfo";
import Cache from "../Cache"
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import PropTypes from "prop-types"

const Home = ({ idQuery, setIdQuery}) => {
  const queryClient = useQueryClient();
  const characterData = queryClient.getQueryData(["rickandmorty", idQuery])

	const cacheData = queryClient.getQueryCache(["rickandmorty", idQuery], {
		exact: false,
		enabled: false
	})

  const cachedCharacters = Object.values(
    cacheData.queriesMap
  ).map((character, index) => (
    <>
      {character.state.data ? (
        <button key={`${character.state.data.name}${index}`}>
          {character.state.data.name}
        </button>
      ) : null}
    </>
  ));

  const delay = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  }

	const handleRickAndMortyFetch = () => {
    return delay()
      .then(() => axios(`https://rickandmortyapi.com/api/character/${idQuery}`))
			.then((res) => res.data);
  };

	const { data, error, isLoading } = useQuery(
    ["rickandmorty", idQuery],
    handleRickAndMortyFetch,
    {
			cacheTime: 1000 * 60 * 60 * 24,
      enabled: false || idQuery !== 0,
      onError: (error) => console.log(error),
      retry: false,
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60 * 60 * 24,
      useErrorBoundary: true
    }
  );

  const handleFetchOnInputChange = event => {
    setIdQuery(event.target.value, () => {
      handleRickAndMortyFetch()
    })
	}

  return (
    <div>
      <SearchForm
        error={error}
        cacheData={cacheData}
        characterData={characterData}
        handleFetchOnInputChange={handleFetchOnInputChange}
        idQuery={idQuery}
        isLoading={isLoading}
        queryClient={queryClient}
        setIdQuery={setIdQuery}
      />
      <RickAndMortyInfo rickAndMortyCharacter={data} />
      <Cache cachedCharacters={cachedCharacters} />
    </div>
  )
}

Home.propTypes = {
  setIdQuery: PropTypes.func
}

export default Home


import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const searchSchema = yup.object().shape({
  rickAndMortyId: yup.number().required().positive().integer()
});

const SearchForm = ({ cacheData, cachedCharacters, error, handleFetchOnInputChange, idQuery, isLoading, queryClient, refetch, setIdQuery }) => {
  const { register, handleSubmit, errors, setValue, watch } = useForm({
    resolver: yupResolver(searchSchema)
  });
  const formId = watch("rickAndMortyId");
  const disable = isLoading || parseFloat(formId) === idQuery || !idQuery || cachedCharacters;

  const handleSubmitForm = (formData) => setIdQuery(formData.rickAndMortyId);
  const handleCacheClear = () => queryClient.removeQueries("rickandmorty")
  const handleLogCache = () => {
		console.log(cacheData.queriesMap)
		console.log(Object.values(cacheData.queriesMap))
	}

  const getRandomRickAndMortyCharacterId = () => {
    const NUMBER_OF_RICK_AND_MORTY_CHARACTERS = 672;
    const min = Math.ceil(1);
    const max = Math.floor(NUMBER_OF_RICK_AND_MORTY_CHARACTERS);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div>
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


import React from 'react'

const Cache = ({ cachedCharacters }) => {
  return (
    <div>
			{cachedCharacters}
		</div>
  )
}

export default Cache
