import React, {useState} from 'react'
import {ProgressBar} from 'react-bootstrap';
import axios from 'axios'

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
					setUploadPercentage({percent})
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
			{ uploadPercentage > 0 && <ProgressBar now={uploadPercentage} active label={`${uploadPercentage}%`} /> }
		</div>
	)
}

export default PercentageProgressBar;

// import React, {useState} from 'react'
// import axios from 'axios'
// // Material-UI
// import { makeStyles } from '@material-ui/core/styles';
// import LinearProgress from '@material-ui/core/LinearProgress';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';

// function LinearProgressWithLabel(props) {
//   return (
//     <Box display="flex" alignItems="center">
//       <Box width="100%" mr={1}>
//         <LinearProgress variant="determinate" {...props} />
//       </Box>
//       <Box minWidth={35}>
//         <Typography variant="body2" color="textSecondary">{`${Math.round(
//           props.value,
//         )}%`}</Typography>
//       </Box>
//     </Box>
//   );
// }

// const useStyles = makeStyles({
//   root: {
//     width: '100%',
//   },
// });

// const ProgressBar = () => {
// 	const [uploadPercentage, setUploadPercentage] = useState(0)

// 	const onFileUpload = ({target: {files}}) => {
// 		console.log(files[0])
// 		let data = new FormData()
// 		data.append('file', files[0])

// 		const options = {
// 			onUploadProgress: (progressEvent) => {
// 				const {loaded, total} = progressEvent;

// 				let percent = Math.floor((loaded*100) / total)
// 				console.log( `${loaded}kb of ${total}kb | ${percent}%` )

// 				if (percent < 100) {
// 					setUploadPercentage({percent})
// 				}

// 			}
// 		}

// 		axios
// 			.post('https://www.mocky.io/v2/5cc8019d300000980a055e76', data, options)
// 			.then(res => {
// 				console.log(res)
// 				setUploadPercentage(100)
// 				setTimeout(() => {
// 					setUploadPercentage(0)
// 			}, 1000)
//     })
// 	}

// 	return (
// 		<div>
// 			<input type='file' onChange={onFileUpload}/>
// 			{ uploadPercentage > 0 && <LinearProgressWithLabel value={uploadPercentage} /> }
// 		</div>
// 	)
// }

// export default ProgressBar;