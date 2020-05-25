// filename: Alert.js
// import into App to render
import React, {useState, useEffect} from 'react';
import './Alert.css';

const Alert = props => {
	const [isShown, setIsShown] = useState(false);
	const [isLeaving, setIsLeaving] = useState(false);

	let timeoutId = null;
	// hook to update the value of isShown to true and clear interval
	// .. by using timeoutId when component is unmounted
	useEffect(() => {
    setIsShown(true);
		return () => {
			clearTimeout(timeoutId);
		}
  }, [props.isShown, props.timeout, timeoutId]);

	// to set the component to be removed from DOM
	const closeAlert = () => {
		setIsLeaving(true);
		// to keep the timer instance from clearing on component unmount
		timeoutId = setTimeout(() => {
			setIsLeaving(false);
			setIsShown(false);
		}, 250)
	}

	// renders the alert component with user defined message
	// .. and a close button to remove the component from DOM.
	return isShown && (
		// chaining .alert with either '.warning or .error or .leaving' AND conditional
		<div className={`alert ${props.type}${isLeaving ? 'leaving' : ''}`}>
			{props.message}
			<button className="close" onClick={closeAlert} />
		</div>
	)
}

export default Alert;

/* <Alert type="info" message="Activated Account" />
<Alert type="info" message="Registered Account" />
<Alert type="info" message="Updated Account" />
<Alert type="info" message="Suspended Account" />
<Alert type="info" message="Deactivate Account" /> */