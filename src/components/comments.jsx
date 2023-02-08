import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCommentsByReviewId } from "../api";
import AddComment from "./addcomment";


export const Comments = () => {
  const [comments, setComments] = useState([]);
  const { review_id } = useParams();
  
  
  useEffect(() => {
    getCommentsByReviewId(review_id).then((commentsApi) => {
        setComments(commentsApi);
      }).catch((err)=>{
        
      } )
    }, [review_id])
    if (comments.length===0){
      return ( <section>

        <h2> Be the first to comment!</h2>
        <AddComment review_id={review_id} setComments={setComments}/>
      </section>
      )
    }
    return (
      <section>
<AddComment review_id={review_id} setComments={setComments}/>
<ul>
{comments.map((comment) => {
  return(

    <li className="commentli" key={comment.comment_id}>
<strong>Written by {comment.author} on {comment.created_at}</strong>
  <br></br>
  {comment.body}
  <br></br>
  {comment.votes} Vote
</li>
  )
})}
</ul>
      </section>
      
      )
    }