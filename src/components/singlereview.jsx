
import { getSingleReview, patchReviewVote } from "../api";
import { useState,useEffect  } from "react";
import {useParams} from 'react-router-dom';
import {Comments} from "./comments"
import { Link } from "react-router-dom";



export const SingleReview = () =>{
    
    const [singleReview, setSingleReview] = useState({})
    const {review_id} = useParams();

    const [votes, setVotes] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const [loading, setLoading]= useState(true)
    
    useEffect(() => {
        getSingleReview(review_id)
        .then((review) => {
        setSingleReview(review);
        setVotes(review.votes)
        setLoading(false)
        });
    }, [review_id]);

    if (loading){
        return (<section>
            <h2>Loading... </h2>
            <img src="https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e4747e7sqmacwz8lz2ms1i1icw1hv2744tybd05g959&rid=giphy.gif&ct=g" alt="loading"/>
            </section>)
    }
    const handleClick = () => {
        if (isClicked) {
            patchReviewVote(review_id, -1)
              .then(() => getSingleReview(review_id))
              .then((review) => {
                setSingleReview(review);
                setVotes(review.votes);
              });
          } else {
            patchReviewVote(review_id, 1)
              .then(() => getSingleReview(review_id))
              .then((review) => {
                setSingleReview(review);
                setVotes(review.votes);
              });
          }
          setIsClicked(!isClicked);
        };
    

return (
   <main>
   <section className="listItem">
        <h4><Link to="/">Go Home</Link></h4> 
        <h3>{singleReview.title}</h3>
            <br></br>
              <img src={singleReview.review_img_url} alt={`${singleReview.title}`} />
              <br></br>
                 <strong>Posted at {singleReview.created_at} by {singleReview.owner} </strong> 
              <br></br>
              Category:{singleReview.category}
              <br></br>
             {singleReview.review_body}
              <br></br>
              <button onClick={ handleClick }><span>{ `Vote | ${singleReview.votes}` }</span></button> 
              <br></br> 
              {singleReview.comment_count} Comments
    </section>
    <Comments singleReview={singleReview} />
   </main>
)
}