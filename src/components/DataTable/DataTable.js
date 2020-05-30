import React from 'react'

function DataTable({ data }) {
  return (
    <table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Value</th>
				</tr>
			</thead>
			<tbody>
				{data.map((value, index) => (
					<tr key={`${index}_${value}`}>
						<td>{index}</td>
						<td>{value}</td>
					</tr>
				))}
			</tbody>
		</table>
  );
}

export default DataTable;

// const list = ['Random Access Memories', 'Discovery', 'Homework']