/*** REACT, TYPESCRIPT ***/
/* Import the useState and useEffect hooks from the react package. */
import { useState, useEffect } from 'react';

/* Define the Post interface with the same properties as in the original code */
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/*
Define the Accordion component and declare two states:
    posts: an array of Post objects, initially set to an empty array [].
    expanded: a number or null, initially set to null.
*/

const Accordion = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  // ...
};

/*
Use the useEffect hook to fetch the posts data from the API endpoint https://jsonplaceholder.typicode.com/posts. 
Slice the received data to include only the first three posts, and then update the posts state with the new data.
*/
useEffect(() => {
  axios
    .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
      setPosts(response.data.slice(0, 3));
      setIsLoading(false);
    })
    .catch((error) => {
      setError(error.message);
      setIsLoading(false);
    });
}, []);

/*
Define the handleToggle function that will be called when the user clicks on a post title. 
It will receive the index of the post that was clicked and will update the expanded state accordingly.
*/
const handleToggle = (index: number) => {
  setExpanded(expanded === index ? null : index);
};

/*
In the return statement, map through the posts array and render a div for each post. Add a click handler to the h3 tag
that will call the handleToggle function and pass the current index as an argument. Then, conditionally render the p tag
containing the post body using the expanded state to determine whether the post is currently expanded.
*/
return (
  <div>
    {posts.map((post: Post, index: number) => (
      <div key={post.id}>
        <h3 onClick={() => handleToggle(index)}>{post.title}</h3>
        {expanded === index && <p>{post.body}</p>}
      </div>
    ))}
  </div>
);

/* Render loading and error message */
if (isLoading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>{error}</div>;
}

/*********************************************************************************************************************/

/*** REDUX TOOLKIT ***/
