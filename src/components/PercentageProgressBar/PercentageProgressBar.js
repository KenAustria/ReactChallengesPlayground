import React, {useState} from 'react';
import {ProgressBar} from 'react-bootstrap';
import axios from 'axios';

const PercentageProgressBar = () => {
	const [uploadPercentage, setUploadPercentage] = useState(0)

	const onFileUpload = ({target: {files}}) => {
		console.log(files[0])
		let data = new FormData()
		data.append('file', files[0])

		const options = {
			onUploadProgress: (progressEvent) => {
				const {loaded, total} = progressEvent;

				let percent = Math.floor((loaded*100) / total)
				console.log( `${loaded}kb of ${total}kb | ${percent}%` )

				if (percent < 100) {
					setUploadPercentage(percent)
				}

			}
		}

		axios
			.post('https://www.mocky.io/v2/5cc8019d300000980a055e76', data, options)
			.then(res => {
				console.log(res)
				setUploadPercentage(100)
				setTimeout(() => {
					setUploadPercentage(0)
			}, 1000)
    })
	}

	return (
		<div>
			<input type='file' onChange={onFileUpload}/>
			{ uploadPercentage > 0 && <ProgressBar animated now={uploadPercentage} active label={`${uploadPercentage}%`} /> }
		</div>
	)
}

export default PercentageProgressBar;