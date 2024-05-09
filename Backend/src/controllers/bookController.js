import bookService from "../services/bookService";

let handleGetAllBooks = async (req, res) => {
  let id = req.query.id; //All, id

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      books: [],
    });
  }

  let books = await bookService.getAllBooks(id);

  return res.status(200).json({
    errCode: 0,
    errMessage: "OK",
    books,
  });
};

let handleCreateNewBook = async (req, res) => {
  let message = await bookService.createNewBook(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleEditBook = async (req, res) => {
  let message = await bookService.updateBook(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleDeleteBook = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await bookService.deleteBook(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};

module.exports = {
  handleGetAllBooks: handleGetAllBooks,
  handleCreateNewBook: handleCreateNewBook,
  handleEditBook: handleEditBook,
  handleDeleteBook: handleDeleteBook,
};
