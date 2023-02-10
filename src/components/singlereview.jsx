import { getSingleReview, patchReviewVote } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Comments } from "./comments";

export const SingleReview = ({ loggedInUsername }) => {
  const [singleReview, setSingleReview] = useState({});
  const [votes, setVotes] = useState(singleReview.votes);
  const [isClicked, setIsClicked] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const { review_id } = useParams();

  useEffect(() => {
    getSingleReview(review_id)
      .then((review) => {
        setSingleReview(review);
        setVotes(review.votes);
        setLoading(false);
      })
      .catch((error) => {
        setErr(error);
      });
  }, [review_id]);

  const handleClick = () => {
    setIsClicked(!isClicked);
    let voteChange = 1;
    setMessage("You Voted!");
    if (isClicked) {
      setMessage("");
      voteChange = -1;
    }

    setVotes((currentVotes) => {
      let upvote = currentVotes + voteChange;
      return upvote;
    })

    patchReviewVote(review_id, voteChange)
      .then(() => {
        setErr(false);
      })
      .catch((err) => {
        setErr(err);
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
  if (err) {
    return (
      <section>
        <p>Oops, something went wrong ☹</p>
      </section>
    );
  }
  return (
    <main>
      <section className="item">
        <h3>{singleReview.title}</h3>
        <br></br>
        <img src={singleReview.review_img_url} alt={`${singleReview.title}`} />
        <br></br>
        <strong>
          Posted at {singleReview.created_at} by {singleReview.owner}{" "}
        </strong>
        <br></br>
        Category:{singleReview.category}
        <br></br>
        {singleReview.review_body}
        <br></br>
        {err ? <p>Network Error... Your vote may not have updated</p> : null}
        <p>{message}</p>
        <button onClick={handleClick}>
          <span>{`UpVote`}</span>
        </button>
        <br></br>
        <strong>UpVotes: {votes}</strong>
        <br></br>
        {singleReview.comment_count} Comments
      </section>
      <Comments
        singleReview={singleReview}
        loggedInUsername={loggedInUsername}
      />
    </main>
  );
};
