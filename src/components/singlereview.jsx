
import { getSingleReview } from "../api";
import { useState,useEffect  } from "react";
import {useParams} from 'react-router-dom';


export const SingleReview = () =>{
    
    const [singleReview, setSingleReview] = useState({})
    const {review_id} = useParams();
    
    useEffect(() => {
        getSingleReview(review_id).then((review) => {
setSingleReview(review);

        });
    }, [review_id]);

return (
    <section className="listItem">
        <h3>{singleReview.title} </h3><br></br>
              <img src={singleReview.review_img_url} alt={`${singleReview.title}`} />
              <br></br>
                  Posted at {singleReview.created_at} by {singleReview.owner} 
              <br></br>
              Category:{singleReview.category}
              <br></br>
             {singleReview.review_body}
              <br></br>
              {singleReview.comment_count} Comments
              <br></br> 
    </section>
)
}