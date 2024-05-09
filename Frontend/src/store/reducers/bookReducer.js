import actionTypes from "../actions/actionTypes";

const initialState = {
  genres: [],
  books: [],
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FECTH_GENRE_START:
      // console.log("check action : ", action);
      return {
        ...state,
      };
    case actionTypes.FECTH_GENRE_SUCCESS:
      // console.log("check action : ", action);
      return {
        ...state,
      };
    case actionTypes.FECTH_GENRE_FAILED:
      // console.log("check action : ", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_BOOK_SUCCESS:
      // console.log("check action : ", action);
      state.books = action.books;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_BOOK_FAILED:
      // console.log("check action : ", action);
      state.books = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default bookReducer;
