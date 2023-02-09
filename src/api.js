import axios from "axios";

const instance = axios.create({
  baseURL: "https://backend-boardgame-server.onrender.com/api",
});

export const getReviews = (date, comments, votes) => {
  return instance
    .get(`/reviews`, {
      params: {
        date: date,
        comments: comments,
        votes: votes,
        order: "asc",
      },
    })
    .then((res) => {
      return res.data.reviews;
    });
};

export const getQueriedReviews = (sortByQuery) => {
  return instance.get(`/reviews/?category=${sortByQuery}`).then((response) => {
    return response.data.reviews;
  });
};

export const getSingleReview = (review_id) => {
  return instance.get(`/reviews/${review_id}`).then((res) => {
    return res.data.review[0];
  });
};

export const getCommentsByReviewId = (review_id) => {
  return instance.get(`/reviews/${review_id}/comments`).then((res) => {
    return res.data.comments;
  });
};

export const patchReviewVote = (review_id, inc_votes) => {
  return instance.patch(`/reviews/${review_id}`, { inc_votes }).then((res) => {
    return res.data.review;
  });
};

export const postComment = (review_id, body) => {
  const postBody = {
    username: "tickle122",
    body: body,
  };
  return instance
    .post(`/reviews/${review_id}/comments`, postBody)
    .then((res) => {
      return res.data.newComment;
    });
};

export const deleteComment = (comment_id) => {
  return instance.delete(`/comments/${comment_id}`).then((res) => {
    return res;
  });
};
