import { getReviews,getSingleReview } from "../api";
import { useState } from "react";
import { useEffect } from "react";
import { Link} from "react-router-dom";

export const Reviews = ()=>{

    const [reviews,setReviews]=useState([])
    useEffect(() => {
        getReviews().then((reviews) => {
            setReviews(reviews);
        });
    }, []);

return (
    <section>
        <h2>$category placeholder</h2>
             <ul id="reviewList">
        {reviews.map((review)=>{
return(
    <li className="listItem" key={review.review_id}>
                <h3>{review.title} </h3><br></br>
              <img src={review.review_img_url} alt={`${review.title}`} />
              <br></br>
                  Posted at {review.created_at} by {review.owner} 
              <br></br>
              Category:{review.category}
              <br></br>
             {review.review_body}
              <br></br>
              <Link
              to={`/reviews/${review.review_id}`}>
              {review.comment_count} Comments
              </Link>
              <br></br>
            </li>
)
        })}
    </ul>
    </section>
)
}