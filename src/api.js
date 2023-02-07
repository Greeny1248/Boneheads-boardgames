import axios from "axios";

export const instance = axios.create({
  baseURL: "https://backend-boardgame-server.onrender.com/api",
});

export const getReviews = () => {
  return instance.get(`/reviews`).then((res) => {
    return res.data.reviews;
  });
};

export const getSingleReview = (review_id) => {
    return instance.get(`/reviews/${review_id}`).then((res)=>{
     
        return res.data.review[0];
    })
}

export const getCommentsByReviewId = (review_id) => {
    return instance.get(`/reviews/${review_id}/comments`).then((res) => {
      return res.data.comments;
    })
  }

export const patchReviewVote = (review_id, inc_votes) => {
    return instance
      .patch(`/reviews/${review_id}`, { inc_votes })
      .then((res) => {
        return res.data.review;
      });
  };

