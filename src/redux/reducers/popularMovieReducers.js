import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  popularMovies: [],
};

const popularMovieSlice = createSlice({
  name: 'popularMovies',
  initialState,
  reducers: {
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
  },
});

export const { setPopularMovies } = popularMovieSlice.actions;

export default popularMovieSlice.reducer;
