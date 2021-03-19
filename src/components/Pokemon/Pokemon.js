import React, {useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import axios from "axios";

const searchSchema = yup.object().shape({
  pokemonName: yup.string().required()
});

const App = () => {
	const [query, setQuery] = useState("")
	const [pokemon, setPokemon] = useState({})
	const { register, handleSubmit, watch, errors } = useForm({
	  resolver: yupResolver(searchSchema)
	});

	console.log(watch(pokemon));

	const handlePokemonFetch = query => {
		// event.preventDefault()
		const getPokemon = async () => {
			return await axios(`https://pokeapi.co/api/v2/pokemon/${query}`)
			.then(res => {
				console.log(res)
				// setPokemon(res.data)
				// console.log(pokemon)
			}).catch(err => {
				console.log(err)
			})
		}
		getPokemon()
	}

	const { isLoading, isError, data, error } = useQuery('pokemon', handlePokemonFetch)

	if (isLoading) return <span>Loading...</span>
	if (isError) return <span>Error: {error.message}</span>

  return (
		<div>
			<div>
				<form onSubmit={handleSubmit(handlePokemonFetch)}>
					<div>
						<label htmlFor="Pokemon">Pokémon Character</label>
						<input type="text" name="pokemonName" value={query} ref={register} onChange={event => setQuery(event.target.value)}/>
						{errors.pokemonName && <span>This field is required</span>}
						{error && <p>Network error or Pokemon does not exist</p>}
					</div>
					<button type="submit">Search Pokémon</button>
				</form>
			</div>
			<div>
				{data ? <p>data</p> : <p>No Pokemon yet, please submit a Pokemon!</p>}
			</div>
			<ReactQueryDevtools initialIsOpen={true} />
		</div>
  );
}

export default App;

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