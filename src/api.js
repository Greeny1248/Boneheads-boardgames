import axios from "axios";

export const instance = axios.create({
  baseURL: "https://backend-boardgame-server.onrender.com/api",
});

export const getReviews = () => {
  return instance.get(`/reviews`).then((response) => {
    return response.data.reviews;
  });
};
