import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

// solution to component unmounting before api call is completed
const FetchCancelv2 = ({ url }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let source = axios.CancelToken.source();

    const loadData = async () => {
      try {
        const res = await axios.get(url, {
          cancelToken: source.token
        });
        console.log("response received");
        setData(res.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("cancellation received");
        } else {
          throw err;
        }
      }
    };
    loadData();

    return () => {
      console.log("unmounted");
      source.cancel();
    };
  }, [url]);

  if (!data) {
    return <div>Loading data from {url}</div>;
  }

  return <div>{data}</div>;
};

FetchCancelv2.propTypes = {
  url: PropTypes.string
};

export default FetchCancelv2;

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
//           <FetchCancelv2 url={url} />
//         </>
//       )}
//     </div>
//   );
// };