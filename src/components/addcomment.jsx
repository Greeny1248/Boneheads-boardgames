import { useState } from "react";
import { postComment } from "../api";

const AddComment = ({ setComments, review_id }) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    postComment(review_id, newComment).then((commentFromApi) => {
      setComments((currentComments) => {
        return [commentFromApi, ...currentComments];
      });
    });
  };
  return (
    <form className="comment" onSubmit={handleSubmit}>
      <label htmlFor="newComment"></label>
      <br />
      <textarea
        className="commentBody"
        htmlFor="comment"
        type="text"
        value={newComment}
        placeholder="Write your comment here..."
        onChange={(event) => setNewComment(event.target.value)}
        required
      />
      <br />
      <button>Submit</button>
    </form>
  );
};

export default AddComment;
