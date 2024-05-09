import actionTypes from "./actionTypes";
import {
  createNewBookService,
  getAllBooks,
  deleteBookService,
  editBookService,
} from "../../services/bookService";
import { toast } from "react-toastify";

export const createNewBook = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewBookService(data);
      console.log("check create redux:  ", res);
      if (res && res.errCode === 0) {
        toast.success("CREAT A NEW BOOK SUCCESS!");
        dispatch(createBookSuccess());
        dispatch(getAllBook());
      } else {
        toast.error(res.errMessage);
        dispatch(createBookFailed());
      }
    } catch (e) {
      toast.error("CREAT A NEW BOOK FAILED!");
      dispatch(createBookFailed());
      console.log("createUserFailed error", e);
    }
  };
};

export const createBookSuccess = () => ({
  type: actionTypes.CREATE_BOOK_SUCCESS,
});

export const createBookFailed = () => ({
  type: actionTypes.CREATE_BOOK_FAILED,
});

export const editBook = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editBookService(data);
      console.log("check update redux:  ", res);
      if (res && res.errCode === 0) {
        toast.success("UPDATE A NEW BOOK SUCCESS!");
        dispatch(editBookSuccess());
        dispatch(getAllBook());
      } else {
        toast.error(res.errMessage);
        dispatch(editBookFailed());
      }
    } catch (e) {
      toast.error("UPDATE A NEW BOOK FAILED!");
      dispatch(editBookFailed());
      console.log("UpdateBookFailed error", e);
    }
  };
};

export const editBookSuccess = () => ({
  type: actionTypes.EDIT_BOOK_SUCCESS,
});

export const editBookFailed = () => ({
  type: actionTypes.EDIT_BOOK_FAILED,
});

export const getAllBook = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllBooks("ALL");
      // console.log("check get all book redux:  ", res);
      if (res && res.errCode === 0) {
        dispatch(getAllBookSuccess(res.books));
      } else {
        dispatch(getAllBookFailed());
      }
    } catch (e) {
      dispatch(getAllBookFailed());
      console.log("getAllBookFailed error", e);
    }
  };
};

export const getAllBookSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_BOOK_SUCCESS,
  books: data,
});

export const getAllBookFailed = () => ({
  type: actionTypes.FETCH_ALL_BOOK_FAILED,
});

export const deleteBook = (bookId) => {
  return async (dispatch, getState) => {
    try {
      console.log("check delete redux:1335435  ", bookId);
      let res = await deleteBookService(bookId);
      console.log("check delete redux:  ", res);
      if (res && res.errCode === 0) {
        toast.success("DELETE A NEW BOOK SUCCESS!");
        dispatch(deleteBookSuccess());
        dispatch(getAllBook());
      } else {
        toast.error(res.message);
        dispatch(deleteBookFailed());
      }
    } catch (e) {
      toast.error("DELETE A NEW BOOK FAILED!");
      dispatch(deleteBookFailed());
      console.log("deleteBookFailed error", e);
    }
  };
};

export const deleteBookSuccess = () => ({
  type: actionTypes.DELETE_BOOK_SUCCESS,
});

export const deleteBookFailed = () => ({
  type: actionTypes.DELETE_BOOK_FAILED,
});
