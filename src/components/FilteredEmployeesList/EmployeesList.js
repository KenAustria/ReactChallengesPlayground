import React, {useState} from 'react';

const EmployeesList = props => {
	const [name, setName] = useState("")
	return (
		<>
			<div>
				<input type="text" onChange={(event) => setName(event.target.value)} />
			</div>
			<ul>
				{props.employees
				.filter(employee => employee.name.toLowerCase().includes(name.toLowerCase()))
				.map(employee => (
					<li key={employee.name}>{employee.name}</li>
				))}
			</ul>
		</>
	);
}

export default EmployeesList;

// const employeesArr = [
// 	{ name: "Parker Green" },
// 	{ name: "Jordan Richards" },
// 	{ name: "Alex Stevens" },
// 	{ name: "Avery Scott" },
// 	{ name: "Riley Miller" },
// 	{ name: "Charlie Green" }
// ];

// <EmployeesList employees={employeesArr} />