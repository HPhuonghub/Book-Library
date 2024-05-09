import actionTypes from "./actionTypes";
import {
  getAllUsers,
  createNewUserService,
  editUserService,
  deleteUserService,
  getAllViews,
  createNewViewService,
  getAllOrders,
  createNewOrderService,
  deleteOrderService,
} from "../../services/userService";
import { toast } from "react-toastify";

//user
export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

export const userLoginSuccess = (userInfo) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfo: userInfo,
});

export const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

export const getAllUser = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      // console.log("check get all user redux:  ", res);
      if (res && res.errCode === 0) {
        dispatch(getAllUserSuccess(res.users));
      } else {
        dispatch(getAllUserFailed());
      }
    } catch (e) {
      dispatch(getAllUserFailed());
      console.log("getAllUserFailed error", e);
    }
  };
};

export const getAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});

export const getAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      console.log("check create user redux:  ", res);
      if (res && res.errCode === 0) {
        toast.success("CREAT A NEW BOOK SUCCESS!");
        dispatch(createUserSuccess());
        dispatch(getAllUser());
      } else {
        toast.error(res.errMessage);
        dispatch(createUserFailed());
      }
    } catch (e) {
      toast.error("CREAT A NEW BOOK FAILED!");
      dispatch(createUserFailed());
      console.log("createUserFailed error", e);
    }
  };
};

export const createUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const createUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      console.log("check update user redux:  ", res);
      if (res && res.errCode === 0) {
        toast.success("UPDATE A NEW USER SUCCESS!");
        dispatch(editUserSuccess());
        dispatch(getAllUser());
      } else {
        toast.error(res.errMessage);
        dispatch(editUserFailed());
      }
    } catch (e) {
      toast.error("UPDATE A NEW USER FAILED!");
      dispatch(editUserFailed());
      console.log("UpdateUserFailed error", e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      console.log("check delete user:1335435  ", userId);
      let res = await deleteUserService(userId);
      console.log("check delete user:  ", res);
      if (res && res.errCode === 0) {
        toast.success("DELETE A USER SUCCESS!");
        dispatch(deleteUserSuccess());
        dispatch(getAllUser());
      } else {
        toast.error(res.message);
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.error("DELETE A USER FAILED!");
      dispatch(deleteUserFailed());
      console.log("deleteUserFailed error", e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_ORDER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_ORDER_FAILED,
});

//view
export const getAllView = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllViews("ALL");
      // console.log("check get view redux:  ", res);
      if (res && res.errCode === 0) {
        dispatch(getAllViewSuccess(res.views));
      } else {
        dispatch(getAllViewFailed());
      }
    } catch (e) {
      dispatch(getAllViewFailed());
      console.log("getAllViewFailed error", e);
    }
  };
};

export const getAllViewSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_VIEW_SUCCESS,
  views: data,
});

export const getAllViewFailed = () => ({
  type: actionTypes.FETCH_ALL_VIEW_FAILED,
});

export const createNewView = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewViewService(data);
      console.log("check create view:  ", res);
      if (res && res.errCode === 0) {
        toast.success("COMMENT SUCCESS!");
        dispatch(createViewSuccess());
        dispatch(getAllView());
      } else {
        toast.error("COMMENT FAILED");
        dispatch(createViewFailed());
      }
    } catch (e) {
      toast.error("COMMENT FAILED!");
      dispatch(createViewFailed());
      console.log("createViewFailed error", e);
    }
  };
};

export const createViewSuccess = () => ({
  type: actionTypes.CREATE_VIEW_SUCCESS,
});

export const createViewFailed = () => ({
  type: actionTypes.CREATE_VIEW_FAILED,
});

//order
export const createNewOrder = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewOrderService(data);
      console.log("check create order:  ", res);
      if (res && res.errCode === 0) {
        toast.success("ORDER SUCCESS!");
        dispatch(createOrderSuccess());
        // dispatch(getAllView());
      } else {
        toast.error("ORDER FAILED");
        dispatch(createOrderFailed());
      }
    } catch (e) {
      toast.error("ORDER FAILED!");
      dispatch(createOrderFailed());
      console.log("createOrderFailed error", e);
    }
  };
};

export const createOrderSuccess = () => ({
  type: actionTypes.CREATE_ORDER_SUCCESS,
});

export const createOrderFailed = () => ({
  type: actionTypes.CREATE_ORDER_FAILED,
});

export const deleteOrder = (orderId) => {
  return async (dispatch, getState) => {
    try {
      console.log("check delete redux:1335435  ", orderId);
      let res = await deleteOrderService(orderId);
      console.log("check delete redux:  ", res);
      if (res && res.errCode === 0) {
        toast.success("DELETE A ORDER SUCCESS!");
        dispatch(deleteOrderSuccess());
        dispatch(getAllOrder());
      } else {
        toast.error(res.message);
        dispatch(deleteOrderFailed());
      }
    } catch (e) {
      toast.error("DELETE A ORDER FAILED!");
      dispatch(deleteOrderFailed());
      console.log("deleteOrderFailed error", e);
    }
  };
};

export const deleteOrderSuccess = () => ({
  type: actionTypes.DELETE_ORDER_SUCCESS,
});

export const deleteOrderFailed = () => ({
  type: actionTypes.DELETE_ORDER_FAILED,
});

export const getAllOrder = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllOrders("ALL");
      console.log("check get order redux:  ", res);
      if (res && res.errCode === 0) {
        dispatch(getAllOrderSuccess(res.orders));
      } else {
        dispatch(getAllOrderFailed());
      }
    } catch (e) {
      dispatch(getAllOrderFailed());
      console.log("getAllOrderFailed error", e);
    }
  };
};

export const getAllOrderSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_ORDER_SUCCESS,
  orders: data,
});

export const getAllOrderFailed = () => ({
  type: actionTypes.FETCH_ALL_ORDER_FAILED,
});
