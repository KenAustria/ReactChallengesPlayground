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

	let onTodoSubmit = event => {
		event.preventDefault()
		setTodoItem('')
		setList([...list, todoItem])
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
				<button onClick={onTodoSubmit}>Submit</button>
			</div>
			<div>
				<ul>
					{list.map((todoitem, index) => <li key={index}>{todoitem}</li>)}
				</ul>
			</div>
		</>
	)
}

ReactDOM.render(<TodoList />, document.getElementById('root'));