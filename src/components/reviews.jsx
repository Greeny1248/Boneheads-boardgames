import { getReviews, getQueriedReviews } from "../api";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("Date");
  const [sortDirection, setSortDirection] = useState("asc");
  const [err, setErr] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  const sortByQuery = searchParams.get("category_name");
  const setChosenCategory = (category) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("category_name", category);
    setSearchParams(newParams);
  };

  useEffect(() => {
    if (sortByQuery) {
      getQueriedReviews(sortByQuery)
        .then((reviews) => {
          setReviews(reviews);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          setErr(err);
        });
    }
  }, [sortByQuery, setReviews]);

  useEffect(() => {
    getReviews()
      .then((reviews) => {
        setReviews(reviews);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setErr(err);
        console.log(err);
      });
  }, []);

  const sortReviews = (reviews, sortOption, sortDirection) => {
    if (sortOption === "Date") {
      if (sortDirection === "asc") {
        return reviews.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
      } else {
        return reviews.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      }
    } else if (sortOption === "Comments") {
      if (sortDirection === "asc") {
        return reviews.sort((a, b) => a.comment_count - b.comment_count);
      } else {
        return reviews.sort((a, b) => b.comment_count - a.comment_count);
      }
    } else if (sortOption === "Votes") {
      if (sortDirection === "asc") {
        return reviews.sort((a, b) => a.votes - b.votes);
      } else {
        return reviews.sort((a, b) => b.votes - a.votes);
      }
    }
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
      </section>
    );
  }
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

  return (
    <section>
      <section>
        <button onClick={() => setChosenCategory("hidden-roles")}>
          Hidden-roles
        </button>
        <button onClick={() => setChosenCategory("dexterity")}>
          Dexterity
        </button>
        <button onClick={() => setChosenCategory("strategy")}>strategy</button>
        <button onClick={() => setChosenCategory("deck-building")}>
          Deck-building
        </button>
        <button onClick={() => setChosenCategory("engine-building")}>
          Engine-building
        </button>
        <button onClick={() => setChosenCategory("push-your-luck")}>
          Push-your-luck
        </button>
        <button onClick={() => setChosenCategory("roll-and-write")}>
          Roll-and-write
        </button>
        <Link to="/">
          <button
            onClick={() =>
              getReviews().then((reviews) => {
                setReviews(reviews);
              })
            }
          >
            Clear Filter
          </button>
        </Link>
      </section>
      <section id="sort">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option>Date</option>
          <option>Comments</option>
          <option>Votes</option>
        </select>
        <button onClick={() => setSortDirection("asc")}>Asc</button>
        <button onClick={() => setSortDirection("desc")}>Desc</button>
      </section>
      <ul id="reviewList">
        {sortReviews(reviews, sortOption, sortDirection).map((review) => {
          return (
            <section key={review.review_id}>
              <Link to={`/reviews/${review.review_id}`}>
                <li className="listItem">
                  <h3>{review.title} </h3>
                  <br></br>
                  <img src={review.review_img_url} alt={`${review.title}`} />
                  <br></br>
                  <strong>
                    {" "}
                    Posted at {review.created_at} by {review.owner}{" "}
                  </strong>
                  <br></br>
                  Category:{review.category}
                  <br></br>
                  {review.comment_count} Comments
                  <br></br>
                  Votes:{review.votes}
                </li>
              </Link>
            </section>
          );
        })}
        ;
      </ul>
    </section>
  );
};
