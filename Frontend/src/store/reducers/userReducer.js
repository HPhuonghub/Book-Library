import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  users: [],
  views: [],
  orders: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAILED:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_VIEW_SUCCESS:
      // console.log("check action view: ", action);
      state.views = action.views;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_VIEW_FAILED:
      // console.log("check action view: ", action);
      state.views = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_ORDER_SUCCESS:
      console.log("check action orders: ", action);
      state.orders = action.orders;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_ORDER_FAILED:
      console.log("check action orders: ", action);
      state.orders = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default appReducer;
