import React, { useState } from "react";
import PropTypes from "prop-types";

const EmployeesList = ({ employees }) => {
  const [name, setName] = useState("");
  return (
    <div>
      <div>
        <input
          type="text"
          onChange={event => setName(event.target.value)}
          data-testid="filter-input"
        />
      </div>
      <ul>
        {employees
          ? employees
              .filter(employee =>
                employee.name.toLowerCase().includes(name.toLowerCase())
              )
              .map(employee => (
                <li key={employee.name} data-testid="employee">
                  {employee.name}
                </li>
              ))
          : null}
      </ul>
    </div>
  );
};

EmployeesList.propTypes = {
  employees: PropTypes.array
};

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
