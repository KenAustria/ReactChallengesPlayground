import ProgressBar from "./ProgressBar";
import "./styles.css";

export default function App() {
	return (
		<div className="App">
			<ProgressBar value={-10} />
			<ProgressBar value={0} />
			<ProgressBar value={5} />
			<ProgressBar value={8} />
			<ProgressBar value={13} />
			<ProgressBar value={85} />
			<ProgressBar value={115} />
		</div>
	);
}
