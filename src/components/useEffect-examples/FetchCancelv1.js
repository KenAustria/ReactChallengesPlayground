import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

// solution to component unmounting before api call is completed
const FetchCancelv1 = ({ url }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let mounted = true;
    axios.get(url).then(res => {
      console.log("response received");
      if (mounted) {
        setData(res.data);
      }
    });

    return () => {
      console.log("unmounting");
      mounted = false;
    };
  }, [url]);

  if (!data) {
    return <div>Loading data from {url}</div>;
  }

  return <div>{data}</div>;
};

FetchCancelv1.propTypes = {
  url: PropTypes.string
};

export default FetchCancelv1;

// const App = () => {
//   const [mounted, setMounted] = useState(true);
//   const url = `https://reqres.in/api/users/1?delay=2`;

//   useEffect(() => {
//     setTimeout(() => {
//       setMounted();
//     }, 1000);
//   });

//   return (
//     <div>
//       {mounted && (
//         <>
//           <FetchCancelv1 url={url} />
//         </>
//       )}
//     </div>
//   );
// };
