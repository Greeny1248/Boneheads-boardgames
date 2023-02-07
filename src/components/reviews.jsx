import { getReviews, getSingleReview } from "../api";
import { useState } from "react";
import { useEffect } from "react";
import { Link} from "react-router-dom";

export const Reviews = ()=>{

    const [reviews,setReviews]=useState([])
    const [loading, setLoading]= useState(true)

    useEffect(() => {
        getReviews().then((reviews) => {
            setReviews(reviews);
            setLoading(false)
        });
    }, []);


if (loading){
return (<section>
    <h2>Loading... </h2>
    <img src="https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e4747e7sqmacwz8lz2ms1i1icw1hv2744tybd05g959&rid=giphy.gif&ct=g" alt="loading"/>
    </section>)
}

return (
    <section>
        <h2>$category placeholder</h2>
        <ul id="reviewList">
        {reviews.map((review)=>{
return(
              <Link to={`/reviews/${review.review_id}`}>
        <section>
            <li className="listItem" key={review.review_id}>
                <h3>{review.title} </h3><br></br>             
                <img src={review.review_img_url} alt={`${review.title}`} />
              <br></br>
                <strong> Posted at {review.created_at} by {review.owner} </strong>
              <br></br>
              Category:{review.category}
              <br></br>
              {review.comment_count} Comments
              <br></br>
              Votes:{review.votes}
            </li>
        </section>
              </Link>
)})};
        </ul>
    </section>
)};