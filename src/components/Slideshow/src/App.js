import React from 'react';
import './App.css';
import 'h8k-components';
import { v4 as uuid } from 'uuid';
import Slides from './components/Slides'
const title = "Slideshow App";

const SLIDES = [
	{
		id: uuid(),
		title: "Today's workout plan",
		text: "We're gonna do 3 fundamental exercises."
	},
	{
		id: uuid(),
		title: "First, 10 push-ups",
		text: "Do 10 reps. Remember about full range of motion. Don't rush."
	},
	{
		id: uuid(),
		title: "Next, 20 squats",
		text: "Squats are important. Remember to keep your back straight."
	},
	{
		id: uuid(),
		title: "Finally, 15 sit-ups",
		text: "Slightly bend your knees. Remember about full range of motion."
	},
	{
		id: uuid(),
		title: "Great job!",
		text: "You made it, have a nice day and see you next time!"
	}
];

function App() {
	return (
		<div>
			<h8k-navbar header={title}></h8k-navbar>
			<div className="App">
				<Slides slides={SLIDES} />
			</div>
		</div>
	);
}

export default App;
