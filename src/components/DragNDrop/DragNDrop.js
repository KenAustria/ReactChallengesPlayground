import React from 'react'
import styled from 'styled-components';

const WrapperDiv = styled.div`
	width: 100%;
	padding: 32px;
	display: flex;
	justify-content: center;
`

const Item = styled.div`
	padding: 8px;
	margin: 5px;
	color: #fff;
	background-color: #FF8C00;
	border-radius: 3px;
`

const droppableStye = {
	backgroundColor: '#6495ED',
	width: '250px',
	height: '400px',
	margin: '32px'
}

export const DroppableDiv = (props) => {
	const drop = (event) => {
		event.preventDefault()
		const data = event.dataTransfer.getData('transfer')
		event.target.appendChild(document.getElementById(data))
	}

	const allowDrop = (event) => {
		event.preventDefault()
	}

	return (
		<div id={props.id} onDrop={drop} onDragOver={allowDrop} style={props.style}>
			{props.children}
		</div>
	)
}

export const DraggableItem = (props) => {
	const drag = (event) => {
		event.dataTransfer.setData('transfer', event.target.id)
	}

	const noAllowDrop = (event) => {
		event.stopPropagation()
	}

	return (
		<div id={props.id} draggable='true' onDragStart={drag} onDragOver={noAllowDrop} style={props.style}>
			{props.children}
		</div>
	)
}

export const DragNDrop = () => {
	return (
		<WrapperDiv>
			<DroppableDiv id='drp1' style={droppableStye}>
				<DraggableItem id='drg1'><Item>Foo</Item></DraggableItem>
				<DraggableItem id='drg2'><Item>Bar</Item></DraggableItem>
			</DroppableDiv>
			<DroppableDiv id='drp2' style={droppableStye}>

			</DroppableDiv>
		</WrapperDiv>
	)
}

export default DragNDrop;