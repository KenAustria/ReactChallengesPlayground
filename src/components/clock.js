
// filename: clock.js
// this file must be named index.js
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const clock = {
	width: '20rem',
	height: '20rem',
	borderStyle: 'solid',
	borderRadius: '50%',
	position: 'relative'
}

const x = '100'
const clockFace = {
	width: '100%',
	height: '100%',
	transform: `translate(${x}px)`,
	position: 'absolute',
	left: '-30%'
}
const hours = {
	position: 'absolute',
	top: '50%',
	width: '50%',
	height: '6px',
	transformOrigin: '100%',
	transform: [{ rotate: '90deg'}],
	background: 'linear-gradient(to right, rgba(255, 0, 0, 0) 0%, rgba(255, 0, 0, 0) 30%, black 30%, black 30%, black 100%)'
}

const minutes = {
	position: 'absolute',
	top: '50%',
	width: '50%',
	height: '6px',
	transformOrigin: '100%',
	transform: [{ rotate: '90deg'}],
	background: 'linear-gradient(to right, rgba(255, 0, 0, 0) 0%, rgba(255, 0, 0, 0) 10%, black 30%, black 10%, black 100%)'
}

const seconds = {
	position: 'absolute',
	top: '50%',
	width: '50%',
	height: '6px',
	transformOrigin: '100%',
	transform: [{ rotate: '90deg'}],
	background: 'linear-gradient(to right, rgba(255, 0, 0, 0) 0%, rgba(255, 0, 0, 0) 10%, black 30%, black 10%, black 100%)'
}

class Clock extends Component {
	constructor(props) {
    super(props);
		this.secondsElement = React.createRef('.seconds');
		this.minutesElement = React.createRef('.minutes');
		this.hoursElement = React.createRef('.hours');
	}

	componentDidMount() {
		setInterval(this.updateClockHandsToCurrentTimeHandler, 1000);
  }

	updateClockHandsToCurrentTimeHandler = () => {
		// get the current time
		const now = new Date();

		// break it down to hours, minutes and seconds
		const seconds = now.getSeconds();
		const minutes = now.getMinutes();
		const hours = now.getHours();

		// calculate the rotation of each clock hand in degrees
		const secondsRotationDegrees = (seconds / 60) * 360; // (60/60) * 360
		const minutesRotationDegrees = (minutes / 60) * 360 + (seconds/60) * 6; // ((60/60) * 360) + ((60/60) * 6 )
		const hoursRotationDegrees = (hours/ 12) * 360 + (minutes / 60) * 30;

		this.secondsElement.current.style.transform = `rotate(${secondsRotationDegrees+90}deg)`;
		this.minutesElement.current.style.transform = `rotate(${minutesRotationDegrees+90}deg)`;
		this.hoursElement.current.style.transform = `rotate(${hoursRotationDegrees+90}deg)`;
	}

	render() {
		return (
			<div style={clock}>
				<div style={clockFace}>
					<div ref={this.hoursElement} style={hours}></div>
					<div ref={this.minutesElement} style={minutes}></div>
					<div ref={this.secondsElement} style={seconds}></div>
				</div>
      </div>
		);
	}
}

ReactDOM.render(<Clock />, document.getElementById('root'));