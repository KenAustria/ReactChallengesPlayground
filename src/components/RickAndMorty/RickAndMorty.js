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
import SearchForm from "../SearchForm";
import RickAndMortyInfo from "../RickAndMortyInfo";
import Cache from "../Cache";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const searchSchema = yup.object().shape({
  rickAndMortyId: yup.number().required().positive().integer()
});

const Home = ({ idQuery, setIdQuery }) => {
  const queryClient = useQueryClient();
  // check if data exist in cache
  const characterData = queryClient.getQueryData(["rickandmorty", idQuery]);
  // ternary result to be used on 'enabled'
  const charBool = characterData ? true : false;

  const { errors, handleSubmit, register, reset, setValue, watch } = useForm({
    resolver: yupResolver(searchSchema)
  });

  const handleSingleLogCache = () => {
    console.log(characterData) // returns data
    console.log(charBool) // returns true
  }

  const cacheData = queryClient.getQueryCache(["rickandmorty", idQuery], {
    exact: false,
    enabled: false
  });

  const handleRickAndMortyFetch = () => {
    return delay()
      .then(() => axios(`https://rickandmortyapi.com/api/character/${idQuery}`))
      .then((res) => res.data)
      .then(
        console.log(characterData), // returns undefined
        console.log(charBool) // returns false
      );
  };

  const cachedCharacters = Object.values(
    cacheData.queriesMap
    ).map((character, index) => (
      <>
        {character.state.data ? (
          <button
            key={`${character.state.data.name}${index}`}
            style={{ width: "3%", height: "10%"}}
            onClick={() => setIdQuery(character.state.data.id)}
          >
            <img src={character.state.data.image} alt="character" style={{ width: "85%", height: "15%" }} />
          </button>
        ) : null}
      </>
    )
  );

  const delay = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
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

  return (
    <div>
      <SearchForm
        errors={errors}
        handleSubmit={handleSubmit}
        register={register}
        reset={reset}
        setValue={setValue}
        watch={watch}
        error={error}
        cacheData={cacheData}
        characterData={characterData}
        idQuery={idQuery}
        isLoading={isLoading}
        setIdQuery={setIdQuery}
      />
      <button onClick={handleSingleLogCache}>Single Cache Log</button>
      <RickAndMortyInfo rickAndMortyCharacter={data} />
      <Cache
        idQuery={idQuery}
        queryClient={queryClient}
        rickAndMortyCharacter={data}
        cachedCharacters={cachedCharacters}
        reset={reset}
      />
    </div>
  );
};

Home.propTypes = {
  setIdQuery: PropTypes.func
};

export default Home;


import React from "react";
import PropTypes from "prop-types";

const SearchForm = ({
  errors, handleSubmit, register, setValue, watch,
  cacheData,
  error,
  idQuery,
  isLoading,
  setIdQuery
}) => {
  const formId = watch("rickAndMortyId");
  const disable = isLoading || parseFloat(formId) === idQuery

  const handleSubmitForm = (formData) => setIdQuery(formData.rickAndMortyId);
  const handleLogCache = () => {
    console.log(cacheData.queriesMap);
    console.log(Object.values(cacheData.queriesMap));
  };

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
    </div>
  );
};

SearchForm.propTypes = {
  setIdQuery: PropTypes.func,
  handleRickAndMortyFetch: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.object
};

export default SearchForm;


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

const Cache = ({ idQuery, queryClient, reset, rickAndMortyCharacter, cachedCharacters }) => {
  const handleCacheClear = () => {
    queryClient.removeQueries("rickandmorty")
    reset()
  };

  const handleRemoveFromCache = () => queryClient.removeQueries(["rickandmorty", idQuery]);

  return (
    <div>
      <div>
        {rickAndMortyCharacter?.name ? (
          <button onClick={handleRemoveFromCache}>Remove {rickAndMortyCharacter.name} from cache?</button>
        ) : (
          ""
        )}
        <button onClick={handleCacheClear}>Clear Cache</button>
      </div>
      <div>
        {cachedCharacters}
      </div>
		</div>
  )
}

export default Cache