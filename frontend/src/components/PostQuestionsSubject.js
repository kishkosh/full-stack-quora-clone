import React from "react";
import "./css/Post.css";
import "react-responsive-modal/styles.css";
import "react-quill/dist/quill.snow.css";

function Post({ post }) {
 
  return (
    <div className="post">
        <div className="post__project">
          <p>{post?.questionsSubject}</p>
        </div> 
    </div>
  );
}

export default Post;
