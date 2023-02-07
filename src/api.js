import axios from "axios";

export const instance = axios.create({
  baseURL: "https://backend-boardgame-server.onrender.com/api",
});

export const getReviews = () => {
  return instance.get(`/reviews`).then((response) => {
    return response.data.reviews;
  });
};

export const getSingleReview = (review_id) => {
    return instance.get(`/reviews/${review_id}`).then((review)=>{
        console.log(review.data.review[0])
        return review.data.review[0]
    })
}
