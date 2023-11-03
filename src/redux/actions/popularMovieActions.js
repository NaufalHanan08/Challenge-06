import axios from 'axios';
import { setPopularMovies } from '../reducers/popularMovieReducers';

export const fetchPopularMovies = (token) => async (dispatch) => {
  try {
    const apiUrl = 'https://shy-cloud-3319.fly.dev/api/v1/movie/popular';
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setPopularMovies(response.data.data));
  } catch (error) {
    console.log(error);
  }
};
