import React, { useContext } from "react";
import PostContext from "./postContext";

function Posts(props) {
  const { id } = props;
  const { posts, postLength } = useContext(PostContext);

  if (posts.length === 0) return <p>Loading posts...</p>;

  return (
    <>
      <h2>Post Context Hook</h2>
      {/* {posts &&
        posts.slice(0, 5).map((post, idx) => (
          <li key={post.id}>
            {idx + 1}. {post.title}
          </li>
        ))} */}
      {id && posts.length && posts && (
        <li>{postLength + " - " + posts[id].title}</li>
      )}
    </>
  );
}

export default Posts;
