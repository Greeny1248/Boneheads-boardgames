import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCommentsByReviewId } from "../api";


export const Comments = () => {
  const [comments, setComments] = useState([]);
  const { review_id } = useParams();
  
  
  useEffect(() => {
    getCommentsByReviewId(review_id).then((commentsApi) => {
        setComments(commentsApi);
      })
    }, [review_id])
    return (
      <section>
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