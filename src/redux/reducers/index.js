import { combineReducers } from '@reduxjs/toolkit';
import authReducers from './authReducers';
import popularMovieReducers from './popularMovieReducers';
import detailReducers from './detailReducers';
import searchMovieReducers from './searchMovieReducers';

export default combineReducers({
  auth: authReducers,
  popularMovies: popularMovieReducers,
  detail: detailReducers,
  search: searchMovieReducers,
});
