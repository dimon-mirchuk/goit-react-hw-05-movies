import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "63b81895c9ecf13b3880e084c6719d4b";

export const getTrendingMovies = () =>
  axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
