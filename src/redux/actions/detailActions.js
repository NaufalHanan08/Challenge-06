import axios from 'axios';

export const setMovieDetails = (details) => ({
  type: 'SET_MOVIE_DETAILS',
  payload: details,
});

export const setTrailerLink = (link) => ({
  type: 'SET_TRAILER_LINK',
  payload: link,
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  payload: error,
});

export const fetchMovieDetails = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');

    const apiUrl = `https://shy-cloud-3319.fly.dev/api/v1/movie/${id}`;
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const movieData = response.data.data;

    if (movieData && movieData.id) {
      dispatch(setMovieDetails(movieData));

      const videosResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=5a1a8d073c4a8515a69dc7913d6f19ad`);
      const videosData = videosResponse.data.results;

      if (videosData.length > 0) {
        const trailerKey = videosData[0].key;
        dispatch(setTrailerLink(`https://www.youtube.com/watch?v=${trailerKey}`));
      }
    } else {
      dispatch(setError('Invalid movie ID or data not found'));
    }
  } catch (error) {
    dispatch(setError('Error fetching movie details: ' + error));
  }
};
