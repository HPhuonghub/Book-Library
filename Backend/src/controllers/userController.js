import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }

  let userData = await userService.handleUserLogin(email, password);
  console.log(userData);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; //All, id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }

  let users = await userService.getAllUsers(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    users,
  });
};

let handleEditUser = async (req, res) => {
  let message = await userService.updateUser(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};

//view
let handleGetComment = async (req, res) => {
  let id = req.query.id; //All, id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      views: [],
    });
  }

  let views = await userService.getAllComments(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    views,
  });
};

let handleCreateNewView = async (req, res) => {
  let message = await userService.createNewView(req.body);
  console.log(message);
  return res.status(200).json(message);
};

//order
let handleCreateNewOrder = async (req, res) => {
  let message = await userService.createOrder(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleGetAllOrders = async (req, res) => {
  let id = req.query.id; //All, id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      orders: [],
    });
  }

  let orders = await userService.getAllOrders(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    orders,
  });
};

let handleDeleteOrder = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await userService.deleteOrder(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};

module.exports = {
  handleLogin: handleLogin,
  handleCreateNewUser: handleCreateNewUser,
  handleGetAllUsers: handleGetAllUsers,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  handleGetComment: handleGetComment,
  handleCreateNewView: handleCreateNewView,
  handleCreateNewOrder: handleCreateNewOrder,
  handleGetAllOrders: handleGetAllOrders,
  handleDeleteOrder: handleDeleteOrder,
};
