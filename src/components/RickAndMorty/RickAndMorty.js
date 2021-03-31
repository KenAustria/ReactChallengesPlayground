import React, { useState, useRef } from "react";
import RickAndMortyInfo from "./components/RickAndMortyInfo";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery, useQueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";
import { ErrorBoundary } from "react-error-boundary";

function delay() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

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

const getRandomRickAndMortyCharacterId = () => {
  const NUMBER_OF_RICK_AND_MORTY_CHARACTERS = 672;
  const min = Math.ceil(1);
  const max = Math.floor(NUMBER_OF_RICK_AND_MORTY_CHARACTERS);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const App = () => {
  const [idQuery, setIdQuery] = useState(0);
  const queryRef = useRef(null);
  const queryClient = useQueryClient();
  const { register, handleSubmit, errors, setValue, watch } = useForm({
    resolver: yupResolver(searchSchema)
  });
  const formId = watch("rickAndMortyId");

  const handleRickAndMortyFetch = () => {
    return delay()
			// No catch method because React Query expects unresolved promise
      .then(() => axios(`https://rickandmortyapi.com/api/character/${idQuery}`))
      // hand off response to React Query
			.then((res) => res.data);
  };

	const cacheData = queryClient.getQueryData(["rickandmorty", idQuery], {
		exact: false
	})

	// makes request upon input change
	const onInputChange = event => {
		setIdQuery(event.target.value, () => {
			handleRickAndMortyFetch()
		})
	}

  const { isLoading, error, data } = useQuery(
    ["rickandmorty", idQuery],
    handleRickAndMortyFetch,
    {
      refetchOnWindowFocus: false,
      enabled: idQuery !== 0,
      useErrorBoundary: true
    }
  );

	// if loading or if the character corresponding to id in input is currently loaded
  const disable = isLoading || parseFloat(formId) === idQuery || !idQuery;
  const onSubmit = (formData) => {
    setIdQuery(formData.rickAndMortyId);
  };
  const onLogCache = () => {
    console.log(cacheData);
  };

  return (
    <div>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          queryRef.current.focus();
        }}
        resetKeys={[idQuery]}
      >
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Rick and Morty</h3>
            <input
              type="number"
              name="rickAndMortyId"
              placeholder="Between 1 and 671"
              ref={register}
              disabled={isLoading}
							onChange={onInputChange}
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
        </div>
        <button onClick={onLogCache}>Log cache from last request</button>
        <div>
          {isLoading && <p>Loading...</p>}
          <RickAndMortyInfo rickAndMortyCharacter={data} />
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
      {rickAndMortyCharacter.name ? (
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
