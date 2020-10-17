import React, { useReducer } from 'react'
import slideshowReducer from '../slideshowReducer'

const initialState = { currSlide: 0}

const Slides = ({slides}) => {
	const [state, dispatchSlideshow] = useReducer(slideshowReducer, initialState)

	const restartHandler = () => {
		dispatchSlideshow({ type: 'RESTART'})
	}

	const prevHandler = () => {
		dispatchSlideshow({ type: 'PREV'})
	}

	const nextHandler = () => {
		dispatchSlideshow({ type: 'NEXT'})
	}

	return (
		<div>
			<div id="navigation" className="text-center">
				<button
					data-testid="button-restart"
					className="small outlined"
					disabled={state.currSlide === 0}
					onClick={restartHandler}
					>
						Restart
				</button>
				<button
					data-testid="button-prev"
					className="small"
					disabled={state.currSlide === 0}
					onClick={prevHandler}
					>
						Prev
				</button>
				<button
					data-testid="button-next"
					className="small"
					disabled={state.currSlide === slides.length - 1}
					onClick={nextHandler}
					>
						Next
				</button>
			</div>
			<div id="slide" className="card text-center">
			<h1 data-testid="title">{slides[state.currSlide].title}</h1>
			<p data-testid="text">{slides[state.currSlide].text}</p>
			</div>
		</div>
	);
}

export default Slides;
