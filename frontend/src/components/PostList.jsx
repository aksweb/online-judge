// src/components/PostList.js
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
// import "./PostList.css"; // Import CSS file for styling
import LogoutButton from "./LogoutButton";

const PostList = () => {
  const { auth, posts } = useContext(AuthContext);

  if (!auth || auth.role !== "user") {
    return <Navigate to="/login" />;
  }

  return (
    <div className="post-list-container">
      <h1>Posts</h1>
      <Link to="/create-post" className="create-post-link">
        Create Post
      </Link>
      <div className="posts">
        {posts?.map((post) => (
          <div key={post._id} className="post">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>By: {post.author.username}</p>
            <hr />
          </div>
        ))}
      </div>
      <LogoutButton />
    </div>
  );
};

export default PostList;
