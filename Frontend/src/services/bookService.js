import axios from "../axios";

const getAllBooks = (inputId) => {
  return axios.get(`/api/get-all-books?id=${inputId}`);
};

const createNewBookService = (data) => {
  console.log("check data from service: ", data);
  return axios.post("/api/create-new-book", data);
};

const editBookService = (data) => {
  console.log("check data from service: ", data);
  return axios.put("/api/edit-book", data);
};

const deleteBookService = (bookId) => {
  console.log("check data from delete: ", {
    data: {
      id: bookId,
    },
  });
  return axios.delete("/api/delete-book", {
    data: {
      id: bookId,
    },
  });
};

export {
  getAllBooks,
  editBookService,
  createNewBookService,
  deleteBookService,
};
