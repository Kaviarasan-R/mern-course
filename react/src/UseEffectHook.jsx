import { useEffect, useState } from "react";

function UseEffectHook(prop) {
  const { value } = prop; // prop.value

  let a = 0; // reset when re-render

  const [counter, setCounter] = useState(0); // persist
  const [posts, setPosts] = useState(null); // undefined
  const [loading, setLoading] = useState(true);

  // console.log("Component Initialized!");

  useEffect(() => {
    a = a + 1;
    // Mount
    console.log("Use Effect Mount!", a, counter);

    return () => {
      // Unmount
      console.log("Use Effect Unmount!");
    };
  }, [counter]);

  useEffect(() => {
    fetch(`https://dummyjson.com/posts`) // `https://dummyjson.com/posts/${value}`
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data.posts?.slice(0, 5));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []); // value

  if (loading)
    return (
      <>
        <h3>Loading posts...</h3>
      </>
    );

  const postData =
    !loading &&
    posts?.length && // null?.length
    posts?.map((post, index) => (
      <li key={index} style={{ marginBottom: "15px" }}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <small>Likes: {post.reactions.likes}</small>
        {" & "}
        <small>Dislikes: {post.reactions.dislikes}</small>
      </li>
    ));

  return (
    <div
      id=""
      className=""
      style={{
        width: "100%",
        display: "flex",
        margin: "auto",
        flexDirection: "column",
      }}
    >
      <h2>Effect Hook</h2>
      <br />
      {postData}

      {/* {!loading && posts && posts.reactions && (
        <li style={{ marginBottom: "15px" }}>
          <h3>{posts?.title}</h3>
          <p>{posts?.body}</p>
          <small>Likes: {posts?.reactions?.likes}</small>
          {" & "}
          <small>Dislikes: {posts?.reactions?.dislikes}</small>
        </li>
      )} */}
    </div>
  );
}

export default UseEffectHook;
