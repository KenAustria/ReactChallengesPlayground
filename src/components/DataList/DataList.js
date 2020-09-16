import React from "react";
import PropTypes from "prop-types";
// import { v4 as uuidv4 } from "uuid";

// 1st Attempt
// const DataList = ({ data }) => {
//   return data.map(value => <li key={uuidv4()}>{value}</li>);
// };

// 2nd Attempt
// const DataList = ({ data }) => {
//   const list = data.map(value => <li key={uuidv4()}>{value}</li>);
//   return <ol>{list}</ol>;
// };

// 3rd Attempt
// const DataList = ({ isOrdered, data }) => {
//   const list = data.map(value => (
//     <li key={uuidv4()}>{value}</li>
//   ));
//   return (
//     <div>
//       {isOrdered ? (
//         <ol>{list}</ol>
// 			) : <ul>{list}</ul>}
//     </div>
//   );
// }

// 4th Attempt: no uuid
const DataList = ({ isOrdered, data }) => {
  const list = data.map((value, index) => (
    <li key={`${index}_${value}`}>{value}</li>
  ));
  return isOrdered ? <ol>{list}</ol> : <ul>{list}</ul>;
};

export default DataList;

DataList.propTypes = {
  isOrdered: PropTypes.bool,
  data: PropTypes.array
};

// const names = ['John', 'Paul', 'Mary'];
// <DataList data={names} isOrdered />
