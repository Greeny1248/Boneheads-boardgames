import { getReviews, getQueriedReviews} from "../api";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useSearchParams} from "react-router-dom";

export const Reviews = ()=>{

    const [reviews,setReviews]=useState([])
    const [loading, setLoading]= useState(true)
    let [searchParams, setSearchParams] = useSearchParams()
    const sortByQuery = searchParams.get("category_name")
    const setChosenCategory = (category) =>{
      const newParams = new URLSearchParams(searchParams)
      newParams.set("category_name", category)
      setSearchParams(newParams)
    }

    useEffect(()=>{
        if (sortByQuery){
          getQueriedReviews(sortByQuery).then((reviews)=>{
          setReviews(reviews)})
        }
      }, [sortByQuery, setReviews])

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
        <h2>{sortByQuery} </h2>
        <section>       
        <label htmlFor="category">Category Filter:</label>
        <button onClick={()=>setChosenCategory("hidden-roles")}>hidden-roles</button>
        <button onClick={()=>setChosenCategory("dexterity")}>dexterity</button>
        <button onClick={()=>setChosenCategory("strategy")}>strategy</button>
        <button onClick={()=>setChosenCategory("deck-building")}>deck-building</button>
        <button onClick={()=>setChosenCategory("engine-building")}>engine-building</button>
        <button onClick={()=>setChosenCategory("push-your-luck")}>push-your-luck</button>
        <button onClick={()=>setChosenCategory("roll-and-write")}>roll-and-write</button>

        <Link to="/"><button onClick={()=>getReviews().then((reviews)=>{setReviews(reviews)})}>Clear Filter</button></Link>
      </section>
        <ul id="reviewList">
        {reviews.map((review)=>{
return(
    <section key={review.review_id}>
            <li className="listItem" >
            <Link to={`/reviews/${review.review_id}`}  >
                <h3>{review.title} </h3><br></br>             
                <img src={review.review_img_url} alt={`${review.title}`} />
              <br></br>

                <strong> Posted at {review.created_at} by {review.owner} </strong>
              <br></br>
              Category:{review.category}
              <br></br>
              {review.comment_count} Comments
              </Link>
              <br></br>
              Votes:{review.votes}
              </Link>
            </li>
        </section>
)})};
        </ul>
    </section>
)};