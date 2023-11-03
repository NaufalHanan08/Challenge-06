const initialState = {
  movieDetails: {},
  trailerLink: '',
  error: null,
};

const detailReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MOVIE_DETAILS':
      return {
        ...state,
        movieDetails: action.payload,
        error: null,
      };
    case 'SET_TRAILER_LINK':
      return {
        ...state,
        trailerLink: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default detailReducers;
