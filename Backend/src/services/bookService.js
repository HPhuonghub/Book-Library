import db from "../models";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let checkBook = (book_title, book_author) => {
  return new Promise(async (resolve, reject) => {
    try {
      let book = await db.Book.findOne({
        where: {
          title: book_title,
          author: book_author,
        },
      });
      if (book) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllBooks = (bookId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let books = "";
      if (bookId === "ALL") {
        books = db.Book.findAll();
      } else {
        books = await db.Book.findOne({
          where: { id: bookId },
        });
      }
      resolve(books);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewBook = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check email is exist???
      let check = await checkBook(data.title, data.author);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage:
            "Title and author are already used, please try another title and author!",
        });
      } else {
        await db.Book.create({
          title: data.title,
          author: data.author,
          description: data.description,
          genre: data.genre,
          release_date: data.release_date,
          page_count: data.page_count,
          price: data.price,
          // quantity: data.quantity,
          image_url: data.image_url,
        });
      }
      resolve({
        errCode: 0,
        message: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateBook = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Misiing required parameters",
        });
      }
      let book = await db.Book.findOne({
        where: { id: data.id },
        raw: false,
      });

      let books = await db.Book.findOne({
        where: { id: data.id },
        raw: true,
      });

      let books2 = await db.Book.findAll({
        raw: true,
      });
      let books3 = books2.filter(
        (item) => item.title === data.title && item.author === data.author
      );

      let bookss = await db.Book.findOne({
        where: { title: data.title, author: data.author },
        raw: true,
      });
      // console.log("check books2", books2);
      // console.log("check books3", books3.id);
      if (bookss && bookss.id !== books.id) {
        console.log("check books3", bookss.id);
        resolve({
          errCode: 3,
          errMessage:
            "Title and author are already used, please try another title and author!",
        });
      } else {
        if (book) {
          let check = await checkBook(data.title, data.author);
          console.log("check check 1", check);
          let a =
            check === true &&
            data.title !== books.title &&
            data.author !== books.author;
          console.log("check check a", a);
          console.log("check check a", data.title);
          console.log("check check a", data.author);
          if (
            (check === true &&
              data.title !== books.title &&
              data.author !== books.author) === true
          ) {
            resolve({
              errCode: 3,
              errMessage:
                "Title and author are already used, please try another title and author!",
            });
          } else {
            book.title = data.title;
            book.author = data.author;
            book.description = data.description;
            book.genre = data.genre;
            book.release_date = data.release_date;
            book.page_count = data.page_count;
            book.price = data.price;
            if (data.image_url) {
              book.image_url = data.image_url;
            }
            console.log("check 1");
            await book.save();
            console.log("check 2");
            resolve({
              errCode: 0,
              errMessage: "Update the book succeeds!",
            });
          }
        } else {
          resolve({
            errCode: 1,
            errMessage: `Book's not found!`,
          });
        }
      }

      console.log("check books raw true", books.id);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteBook = (bookId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let book = await db.Book.findOne({
        where: { id: bookId },
        raw: false,
      });
      if (!book) {
        resolve({
          errCode: 2,
          errMessage: `The book isn't exist`,
        });
      }

      await book.destroy();
      resolve({
        errCode: 0,
        errMessage: `The book is deleted`,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllBooks: getAllBooks,
  createNewBook: createNewBook,
  updateBook: updateBook,
  deleteBook: deleteBook,
};
