import axios from "../axios";

const handleLogin = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUser = (data) => {
  return axios.post("/api/create-new-user", data);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const editUserService = (data) => {
  console.log("check data from service: ", data);
  return axios.put("/api/edit-user", data);
};

const deleteUserService = (userId) => {
  console.log("check data from delete: ", {
    data: {
      id: userId,
    },
  });
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

//view
const getAllViews = (inputId) => {
  return axios.get(`/api/get-all-reviews?id=${inputId}`);
};

const createNewViewService = (data) => {
  return axios.post("/api/create-new-view", data);
};

//order
const createNewOrderService = (data) => {
  return axios.post("/api/create-new-order", data);
};

const deleteOrderService = (orderId) => {
  // console.log("check data from delete: ", {
  //   data: {
  //     id: orderId,
  //   },
  // });
  return axios.delete("/api/delete-order", {
    data: {
      id: orderId,
    },
  });
};

const getAllOrders = (inputId) => {
  return axios.get(`/api/get-all-orders?id=${inputId}`);
};

export {
  handleLogin,
  getAllUsers,
  createNewUser,
  createNewUserService,
  editUserService,
  deleteUserService,
  getAllViews,
  createNewViewService,
  createNewOrderService,
  getAllOrders,
  deleteOrderService,
};
