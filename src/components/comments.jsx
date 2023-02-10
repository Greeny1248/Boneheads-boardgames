import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCommentsByReviewId, deleteComment } from "../api";
import AddComment from "./addcomment";
import { UserContext } from "../contexts/userContext";
import { useContext } from "react";

export const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const userValue = useContext(UserContext);
  const { review_id } = useParams();

  useEffect(() => {
    setErr(null);
    setLoading(true);
    getCommentsByReviewId(review_id)
      .then((commentsApi) => {
        setComments(commentsApi);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setErr(error);
        setLoading(false);
      });
  }, [review_id]);
  const handleDeleteComment = (comment_id) => {
    deleteComment(comment_id)
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== comment_id)
        );
      })
      .catch((error) => {
        console.log(error);
        setErr("Error deleting comment");
        setLoading(false);
      });
  };

  if (loading && !err) {
    return (
      <section>
        <h2>Loading... </h2>
        <img
          src="https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e4747e7sqmacwz8lz2ms1i1icw1hv2744tybd05g959&rid=giphy.gif&ct=g"
          alt="loading"
        />
      </section>
    );
  }
  if (comments.length === 0) {
    return (
      <section>
        <h2> Be the first to comment!</h2>
        <AddComment review_id={review_id} setComments={setComments} />
      </section>
    );
  }

  if (err) {
    return (
      <section className="errorText">
        <p>Oops, something went wrong ☹... {err}</p>
        <img
          src="https://pbs.twimg.com/media/CQuQ_IpWoAE0eM9.jpg"
          alt="errorteapot"
          className="errorteapot"
        />
      </section>
    );
  }

  return (
    <section>
      <AddComment review_id={review_id} setComments={setComments} />
      <ul>
        {comments.map((comment) => {
          return (
            <li className="commentli" key={comment.comment_id}>
              <strong>
                Written by {comment.author} on {comment.created_at}
              </strong>
              <br></br>
              {comment.body}
              <br></br>
              {comment.votes} Vote
              {comment.author === userValue.loggedInUsername.name ? (
                <button onClick={() => handleDeleteComment(comment.comment_id)}>
                  Delete
                </button>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
