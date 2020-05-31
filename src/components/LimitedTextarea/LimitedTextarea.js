import React, {useState, useEffect} from 'react'

const LimitedTextarea = ({rows, cols, value, limit}) => {
	const [content, setContent] = useState(value)

	// trims the content of the input if it's longer than limit
	const setFormattedContent = (text) => {
		text.length > limit ? setContent(text.splice(0, limit)) : setContent(text)
	}

	useEffect(() => {
		setFormattedContent(content)
	}, [])

	return (
		<div>
			<textarea
				rows={rows}
				cols={cols}
				value={content}
				onChange={event => setFormattedContent(event.target.value)}
			/>
			<p>{content.length} / {limit}</p>
		</div>
	)
}

export default LimitedTextarea;

{/* <LimitedTextarea value='supdawg' limit={50} /> */}