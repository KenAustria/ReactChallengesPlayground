import React, { useState, useEffect } from 'react';

function Slides({slides}) {
	const [currSlide, setCurrSlide] = useState(0)

	useEffect(() => {
    setCurrSlide(currSlide)
  }, [currSlide]);

	const nextSlideHandler = () => {
		setCurrSlide(currSlide + 1)
	}

	const prevSlideHandler = () => {
		setCurrSlide(currSlide - 1)
	}

	const restartHandler = () => {
		setCurrSlide(0)
	}

	return (
		<div>
			<div id="navigation" className="text-center">
				<button data-testid="button-restart" className="small outlined" disabled={currSlide === 0} onClick={restartHandler}>Restart</button>
				<button data-testid="button-prev" className="small" disabled={currSlide === 0} onClick={prevSlideHandler}>Prev</button>
				<button data-testid="button-next" className="small" disabled={currSlide === slides.length - 1}  onClick={nextSlideHandler}>Next</button>
			</div>
			<div id="slide" className="card text-center">
				<h1 data-testid="title">{slides[currSlide].title}</h1>
				<p data-testid="text">{slides[currSlide].text}</p>
			</div>
		</div>
	);
}

export default Slides;
