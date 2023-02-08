import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCommentsByReviewId } from "../api";
import AddComment from "./addcomment";


export const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading]= useState(false)
  const { review_id } = useParams();
  
  
  useEffect(() => {
    getCommentsByReviewId(review_id).then((commentsApi) => {
      setLoading(true)
        setComments(commentsApi);
        setLoading(false)
      }).catch((err)=>{
        
      } )
    }, [review_id])
    
    if (loading){
      return (<section>
          <h2>Loading... </h2>
          <img src="https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e4747e7sqmacwz8lz2ms1i1icw1hv2744tybd05g959&rid=giphy.gif&ct=g" alt="loading"/>
          </section>)
      } 
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