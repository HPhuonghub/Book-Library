import db from "../models";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user already exist
        let user = await db.User.findOne({
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "firstName",
            "lastName",
          ],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compare(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = `OK`;
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = `Wrong password`;
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's not found`;
        }
      } else {
        //return error
        userData.errCode = 1;
        userData.errMessage = `Your's Email isn't exist in your in your system. Please try other email!`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email is exist???
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage:
            "Your email is already in used, Please try another email!",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          roleId: data.roleId,
        });
        resolve({
          errCode: 0,
          message: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = db.User.findAll();
      } else {
        users = await db.User.findOne({
          where: { id: userId },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Misiing required parameters",
        });
      }

      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });

      let users = await db.User.findOne({
        where: { id: data.id },
        raw: true,
      });

      let userss = await db.User.findOne({
        where: { email: data.email },
        raw: true,
      });
      if (userss && userss.id !== users.id) {
        console.log("check userss", userss.id);
        resolve({
          errCode: 3,
          errMessage: "Email are already used, please try another email!",
        });
      } else {
        if (user) {
          let check = await checkUserEmail(data.email);
          if ((check === true && data.email !== users.email) === true) {
            resolve({
              errCode: 3,
              errMessage: "Email are already used, please try another email!",
            });
          } else {
            user.email = data.email;
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            console.log("check 1");
            await user.save();
            console.log("check 2");
            resolve({
              errCode: 0,
              errMessage: "Update the user succeeds!",
            });
          }
        } else {
          resolve({
            errCode: 1,
            errMessage: `User's not found!`,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: false,
      });
      if (!user) {
        resolve({
          errCode: 2,
          errMessage: `The user isn't exist`,
        });
      }

      await user.destroy();
      resolve({
        errCode: 0,
        errMessage: `The user is deleted`,
      });
    } catch (e) {
      reject(e);
    }
  });
};
//view
let getAllComments = (commentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let comments = "";
      if (commentId === "ALL") {
        comments = db.Review.findAll();
      } else {
        comments = await db.Review.findOne({
          where: { id: commentId },
        });
      }
      resolve(comments);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewView = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email is exist???

      await db.Review.create({
        user_id: data.user_id,
        book_id: data.book_id,
        rating: data.rating,
        comment: data.comment,
      });
      resolve({
        errCode: 0,
        message: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

//order
// let createView = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       //check email is exist???

//       await db.Review.create({
//         user_id: data.user_id,
//         book_id: data.book_id,
//         rating: data.rating,
//         comment: data.comment,
//       });
//       resolve({
//         errCode: 0,
//         message: "OK",
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };
//
let createOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email is exist???

      await db.Order.create({
        user_id: data.user_id,
        book_id: data.book_id,
        quantity: data.quantity,
        order_date: data.order_date,
        // status: data.status,
      });
      resolve({
        errCode: 0,
        message: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getAllOrders = (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let orders = "";
      if (orderId === "ALL") {
        orders = db.Order.findAll();
      } else {
        orders = await db.Order.findOne({
          where: { id: orderId },
        });
      }
      resolve(orders);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteOrder = (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = await db.Order.findOne({
        where: { id: orderId },
        raw: false,
      });
      if (!order) {
        resolve({
          errCode: 2,
          errMessage: `The order isn't exist`,
        });
      }

      await order.destroy();
      resolve({
        errCode: 0,
        errMessage: `The order is deleted`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  createNewUser: createNewUser,
  getAllUsers: getAllUsers,
  updateUser: updateUser,
  deleteUser: deleteUser,
  getAllComments: getAllComments,
  createNewView: createNewView,
  createOrder: createOrder,
  getAllOrders: getAllOrders,
  deleteOrder: deleteOrder,
};
