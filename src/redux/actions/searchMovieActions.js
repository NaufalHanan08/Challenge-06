import axios from 'axios';

export const setSearchResults = (results) => ({
  type: 'SET_SEARCH_RESULTS',
  payload: results,
});

export const clearSearchResults = () => ({
  type: 'CLEAR_SEARCH_RESULTS',
});

export const searchMovies = (searchKey) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`https://shy-cloud-3319.fly.dev/api/v1/search/movie?page=1&query=${searchKey}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setSearchResults(response.data.data));
  } catch (error) {
    console.error(error);
  }
};
