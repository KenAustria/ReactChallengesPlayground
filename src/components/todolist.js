// filename: todolist.js
// this file must be named index.js
import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const TodoList = () => {
	const [todoItem, setTodoItem] = useState('')
	const [list, setList] = useState([])

	let onChangeHandler = event => {
		setTodoItem(event.target.value)
	}

	let addTodoHandler = event => {
		event.preventDefault()
		setTodoItem('')
		setList([...list, todoItem])
	}

	let deleteTodoHandler = index => {
		let newList = list.filter((_, todoIndex) => todoIndex !== index)
		setList(newList)
	}

	return (
		<>
			<div>
				<input 
					name='todo' 
					value={todoItem} 
					placeholder='Add a To Do Item' 
					onChange={onChangeHandler}
					autocomplete='off'
				/>
				<button onClick={addTodoHandler}>Submit</button>
			</div>
			<div>
				<ul>
					{list.map((todoitem, index) => <li key={index} onClick={() => {deleteTodoHandler(index)}}>{todoitem}</li>)}
				</ul>
			</div>
		</>
	)
}

ReactDOM.render(<TodoList />, document.getElementById('root'));