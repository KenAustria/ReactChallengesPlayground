import React from 'react'

const DataList = ({isOrdered, data}) => {
	const list = data.map((value, index) => <li key={`${index}_${value}`}>{value}</li>)
	return isOrdered ? <ol>{list}</ol> : <ul>{list}</ul>
}

export default DataList;

// const names = ['John', 'Paul', 'Mary'];
// <DataList data={names} />
// <DataList data={names} isOrdered />