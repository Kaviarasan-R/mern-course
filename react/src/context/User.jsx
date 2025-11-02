import React, { useContext } from "react";
import UserContext from "./userContext";
import PostContext from "./postContext";

function Users(props) {
  const { id } = props;
  const { users, userLength } = useContext(UserContext);
  const { posts, postLength } = useContext(PostContext);

  if (users.length === 0) return <p>Loading users...</p>;

  return (
    <>
      <h2>User Context Hook</h2>
      {id && users.length && users && (
        <li>{userLength + " - " + users[id].firstName}</li>
      )}
      {id && posts.length && posts && (
        <li>{postLength + " - " + posts[id].title}</li>
      )}
    </>
  );
}

export default Users;
