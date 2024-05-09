import express from "express";
// import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import bookController from "../controllers/bookController";
// import path from "path";
// var appRoot = require("app-root-path");
let router = express.Router();

const initWebRoute = (app) => {
  //user
  router.post("/api/login", userController.handleLogin);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);

  //review
  router.post("/api/create-new-view", userController.handleCreateNewView);
  router.get("/api/get-all-reviews", userController.handleGetComment);

  //order

  router.post("/api/create-new-order", userController.handleCreateNewOrder);
  router.get("/api/get-all-orders", userController.handleGetAllOrders);
  router.delete("/api/delete-order", userController.handleDeleteOrder);

  //book
  router.get("/api/get-all-books", bookController.handleGetAllBooks);
  router.post("/api/create-new-book", bookController.handleCreateNewBook);
  router.put("/api/edit-book", bookController.handleEditBook);
  router.delete("/api/delete-book", bookController.handleDeleteBook);

  return app.use("/", router);
};

export default initWebRoute;
