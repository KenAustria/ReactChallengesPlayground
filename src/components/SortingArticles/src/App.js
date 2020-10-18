import React, { useReducer } from 'react';
import './App.css';
import 'h8k-components';
import Articles from './components/Articles';
import { initialState, sortReducer } from './sortReducer';

const title = "Sorting Articles";

const App = () => {
	const [state, sortDispatch] = useReducer(sortReducer, initialState);

	const upvoteSortHandler = () => {
		sortDispatch({ type: 'UPVOTE_SORT'})
	}

	const dateSortHandler = () => {
		sortDispatch({ type: 'DATE_SORT'})
	}

	return (
		<div className="App">
			<h8k-navbar header={title}></h8k-navbar>
			<div className="layout-row align-items-center justify-content-center my-20 navigation">
				<label className="form-hint mb-0 text-uppercase font-weight-light">Sort By</label>
				<button data-testid="most-upvoted-link" className="small" onClick={upvoteSortHandler}>Most Upvoted</button>
				<button data-testid="most-recent-link" className="small" onClick={dateSortHandler}>Most Recent</button>
			</div>
			<Articles articles={state.articles}/>
		</div>
	);
}

export default App;
