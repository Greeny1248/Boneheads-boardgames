import { useState } from "react";
import { postComment } from "../api";

const AddComment = ({ setComments, review_id }) => {
  const [newComment, setNewComment] = useState("");
  const [err, setErr] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    postComment(review_id, newComment)
      .then((commentFromApi) => {
        setComments((currentComments) => {
          return [commentFromApi, ...currentComments];
        });
        setNewComment("");
      })
      .catch((error) => {
        console.log(error);
        setErr(error);
      });
  };

  if (err) {
    return (
      <section className="errorText">
        <p>Oops, something went wrong ☹</p>
        <img
          src="https://pbs.twimg.com/media/CQuQ_IpWoAE0eM9.jpg"
          alt="errorteapot"
          className="errorteapot"
        />
        <iframe
          title="hello4"
          width="110"
          height="200"
          src="https://www.myinstants.com/instant/lionel-richie-hello-is-it-me/embed/"
          frameborder="0"
          scrolling="no"
        ></iframe>
      </section>
    );
  }
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
