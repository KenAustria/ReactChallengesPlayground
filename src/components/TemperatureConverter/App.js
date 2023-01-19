import { useState } from "react";
import "./styles.css";

function format(number) {
	return /\.\d{5}/.test(number) ? Number(number).toFixed(4) : number;
}

export default function App() {
	const [celsius, setCelsius] = useState("");
	const [fahrenheit, setFahrenheit] = useState("");

	function convert(value, setDestination, calculateValue) {
		// converts a value into a number
		const numericValue = Number(value);
		// determine if the value is a number
		const isValid = !Number.isNaN(numericValue) && Boolean(value);
		setDestination(isValid ? format(calculateValue(numericValue)) : "");
	}

	function handleCelsiusToFahrenheit(event) {
		const newValue = event.target.value;
		setCelsius(newValue);
		convert(newValue, setFahrenheit, (value) => (value * 9) / 5 + 32);
	}

	function handleFahrenheitToCelsius(event) {
		const newValue = event.target.value;
		setFahrenheit(newValue);
		convert(newValue, setCelsius, (value) => ((value - 32) * 5) / 9);
	}

	return (
		<div className="temperature-converter">
			<label className="temperature-converter-column">
				<input
					className="temperature-converter-column-top-row"
					type="text"
					value={celsius}
					onChange={handleCelsiusToFahrenheit}
				/>
				<div className="temperature-converter-column-bottom-row">Celsius</div>
			</label>
			<div className="temperature-converter-column">
				<div className="temperature-converter-column-top-row">=</div>
			</div>
			<label className="temperature-converter-column">
				<input
					className="temperature-converter-column-top-row"
					type="text"
					value={fahrenheit}
					onChange={handleFahrenheitToCelsius}
				/>
				<div className="temperature-converter-column-bottom-row">
					Fahrenheit
				</div>
			</label>
		</div>
	);
}
