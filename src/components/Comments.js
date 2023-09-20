import React, { useState, useEffect } from "react";

function Comments(props) {
  const [commentText, setCommentText] = useState("");
  const [commentColor, setCommentColor] = useState("#000000");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const savedComments = localStorage.getItem(`comments_${props.itemId}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      setComments([]);
    }
  }, [props.itemId]);

  useEffect(() => {
    localStorage.setItem(`comments_${props.itemId}`, JSON.stringify(comments));
  }, [comments, props.itemId]);

  const handleAddComment = () => {
    if (commentText.trim()) {
      setComments([...comments, { text: commentText, color: commentColor }]);
      setCommentText("");
    }
  };

  return (
    <div className="react-comments">
      <h1 style={{ color: commentColor }}>
        Comments #{props.itemId} - Color: {commentColor}
      </h1>
      {comments.map((comment, index) => (
        <div className="react-comment">
          <div className="card">
            <div
              className="card-color"
              style={{ background: comment.color }}
            ></div>
            <div className="card-body">
              <pre className="card-text">{comment.text}</pre>
            </div>
          </div>
        </div>
      ))}
      <form className="comment-form" onSubmit={(e) => e.preventDefault()}>
        <div className="color-selector">
          <input
            type="color"
            className="form-control color-input"
            value={commentColor}
            onChange={(e) => setCommentColor(e.target.value)}
          />
        </div>
        <textarea
          className="form-control comment-textarea"
          placeholder="Type comment here..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          required
        ></textarea>
        <button
          className="btn btn-primary button-add"
          type="button"
          onClick={handleAddComment}
        >
          Add New
        </button>
      </form>
    </div>
  );
}

export default Comments;
