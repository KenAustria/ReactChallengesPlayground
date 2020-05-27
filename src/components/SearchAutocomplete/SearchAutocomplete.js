import React, {useState, useEffect, useRef} from 'react'
// import './SearchAutocomplete.css'

const SearchAutocomplete = () => {
	const [loading, setLoading] = useState(false)
	const [results, setResults] = useState([])
	const [search, setSearch] = useState('')
	const wrapperRef = useRef(null)

	// api request
	useEffect(() => {
    const pokemon = []; // host arr for results
    const promises = new Array(20)
      .fill()
      .map((v, i) => fetch(`https://pokeapi.co/api/v2/pokemon-form/${i + 1}`)); // no pokemon 0, so start at 1
    Promise.all(promises).then(pokemonArr => {
      return pokemonArr.map(value =>
        value
          .json()
          .then(({ name, sprites: { front_default: sprite } }) =>
            pokemon.push({ name, sprite })
          )
      );
    });
    setResults(pokemon);
	}, []);

	// listen for user clicks
	useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
	});

	const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setLoading(false);
    }
	};

	const onOutsideClick = result => {
		setSearch(result)
		setLoading(false)
	}

	return (
		<div ref={wrapperRef}>
			<input
				type='text'
				value={search} // input to acquire value of the clicked result
				onChange={event => setSearch(event.target.value)}
				onClick={() => setLoading(!setLoading)} // toggle loading when clicking on input
			/>
			{loading && (
				<div>
					{results
						.filter(({ name }) => name.indexOf(search.toLowerCase()) > -1) // case for sensitie character casing
						.map((result, index) => {
							return (
								<div key={index} onClick={() => onOutsideClick(result.name)}>
									<span>{result.name}</span>
									<img src={result.sprite} alt='result'/>
								</div>
							)
						})
					}
				</div>
			)}
		</div>
	)
}

export default SearchAutocomplete;