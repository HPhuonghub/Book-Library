import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Header from "../../Header/Header";
import * as actions from "../../../store/actions";
import "./CRUBook.scss";
import { CommonUtils } from "../../../utils";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
class CRUBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previewImgURL: "",

      title: "",
      author: "",
      description: "",
      release_date: "",
      page_count: "",
      price: "",
      genre: "Action",
      image_url: "",

      editMode: false,
      idbook: "",
    };
  }

  async componentDidMount() {
    this.props.getAllBook();
    const idb = this.props.location.pathname.split("/")[3];
    const books = await this.props.listBooks.find((item) => item.id == idb);
    let imageBase64 = "";
    if (books && books.image_url) {
      imageBase64 = new Buffer(books.image_url, "base64").toString("binary");
    }
    this.setState({
      previewImgURL: imageBase64,
    });
  }

  handleOnChangeImage = async (event) => {
    console.log("check event:", event);
    let data = event.target.files;
    console.log("check data:", data);
    let file = data[0];
    console.log("check data:", file);
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      console.log("check file imgae", base64);
      let objectUrl = URL.createObjectURL(file);
      console.log("check file objectUrl", objectUrl);

      this.setState({
        previewImgURL: objectUrl,
        image_url: base64,
      });
    }
    // console.log("check file", previewImgURL);
  };

  handleAddBook = () => {
    if (window.confirm("Are you sure to Add this book?")) {
      let isValid = this.checkValidateInput();
      // console.log("check isvalid: ", isValid);
      if (isValid === false) {
        alert("book creation failed");
        return;
      }
      // fire action redux
      this.props.createNewBook({
        title: this.state.title,
        author: this.state.author,
        description: this.state.description,
        genre: this.state.genre,
        release_date: this.state.release_date,
        page_count: this.state.page_count,
        price: this.state.price,
        // quantity: this.state.quantity,
        image_url: this.state.image_url,
      });
    }
  };

  handleSaveBook = () => {
    let isValid = this.checkValidateInput();
    // console.log("check isvalid: ", isValid);
    // console.log("check image_url: ", this.state.image_url);
    if (isValid === false) {
      alert("book edit failed");
      return;
    }
    console.log("check title and author", this.state.title, this.state.author);
    // fire action redux
    this.props.editBook({
      id: this.state.idbook,
      title: this.state.title,
      author: this.state.author,
      description: this.state.description,
      genre: this.state.genre,
      release_date: this.state.release_date,
      page_count: this.state.page_count,
      price: this.state.price,
      // quantity: this.state.quantity,
      image_url: this.state.image_url,
    });
  };

  checkValidateInput = () => {
    var isValid = true;
    let arrCheck = ["title", "author", "description"];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("this input is required: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };

    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log("check state", this.state);
      }
    );
  };

  handleEditBook = () => {
    this.setState({
      editMode: true,
    });

    let idb = this.props.location.pathname.split("/")[3];
    let books = this.props.listBooks.find((item) => item.id == idb);
    console.log("check editmode:", books);

    let imageBase64 = "";
    if (books.image_url) {
      imageBase64 = new Buffer(books.image_url, "base64").toString("binary");
    }
    this.setState({
      idbook: idb,
      title: books.title,
      author: books.author,
      description: books.description,
      release_date: books.release_date,
      page_count: books.page_count,
      price: books.price,
      genre: books.genre,
      image_url: "",
      previewImgURL: imageBase64,
    });
  };

  render() {
    let {
      title,
      author,
      description,
      release_date,
      page_count,
      price,
      genre,
      image_url,
      editMode,
    } = this.state;
    let idb = this.props.location.pathname.split("/")[3];
    let books = this.props.listBooks.find((item) => item.id == idb);
    // let imageBase64 = "";
    // if (books.image_url) {
    //   imageBase64 = new Buffer(books.image_url, "base64").toString("binary");
    // }
    console.log("check pros redux", books);
    console.log("check previewImgURL", this.state.previewImgURL);
    console.log("check pros image_url", this.props.listBooks);

    return (
      <div className="book-redux-container">
        <div className="title">Book</div>
        <div className="book-redux-body">
          <div className="container d-flex">
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail4">Title</label>
                  {idb ? (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Title"
                      value={!editMode ? books.title : title}
                      disabled={editMode ? false : true}
                      onChange={(event) => this.onChangeInput(event, "title")}
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Title"
                      value={title}
                      onChange={(event) => this.onChangeInput(event, "title")}
                    />
                  )}
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPassword4">Author</label>
                  {idb ? (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Author"
                      value={!editMode ? books.author : author}
                      disabled={editMode ? false : true}
                      onChange={(event) => this.onChangeInput(event, "author")}
                      required
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Author"
                      value={author}
                      onChange={(event) => this.onChangeInput(event, "author")}
                      required
                    />
                  )}
                </div>
              </div>
              <div className="form-row">
                <div
                  className="form-group col-md-12"
                  style={{ height: "220px" }}
                >
                  <label htmlFor="inputAddress">Description</label>
                  {idb ? (
                    <textarea
                      className="form-control h-100"
                      rows="10"
                      disabled={editMode ? false : true}
                      placeholder="Description"
                      value={!editMode ? books.description : description}
                      onChange={(event) =>
                        this.onChangeInput(event, "description")
                      }
                    ></textarea>
                  ) : (
                    <textarea
                      className="form-control h-100"
                      rows="10"
                      placeholder="Description"
                      value={description}
                      onChange={(event) =>
                        this.onChangeInput(event, "description")
                      }
                    ></textarea>
                  )}
                </div>
              </div>
              <div className="form-row mt-4">
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail4">Release_date</label>
                  {idb ? (
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Release_date"
                      value={!editMode ? books.release_date : release_date}
                      disabled={editMode ? false : true}
                      onChange={(event) =>
                        this.onChangeInput(event, "release_date")
                      }
                    />
                  ) : (
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Release_date"
                      value={release_date}
                      onChange={(event) =>
                        this.onChangeInput(event, "release_date")
                      }
                    />
                  )}
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPassword4">Page_count</label>
                  {idb ? (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Page_count"
                      value={!editMode ? books.page_count : page_count}
                      disabled={editMode ? false : true}
                      onChange={(event) =>
                        this.onChangeInput(event, "page_count")
                      }
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Page_count"
                      value={page_count}
                      onChange={(event) =>
                        this.onChangeInput(event, "page_count")
                      }
                    />
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputState">Genre</label>
                  {idb ? (
                    <select
                      id="inputState"
                      className="form-control"
                      disabled={editMode ? false : true}
                      value={!editMode ? books.genre : genre}
                      onChange={(event) => this.onChangeInput(event, "genre")}
                    >
                      <option value="Action">Action</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Romantic">Romantic</option>
                    </select>
                  ) : (
                    <select
                      id="inputState"
                      className="form-control"
                      value={this.state.genre}
                      onChange={(event) => this.onChangeInput(event, "genre")}
                    >
                      <option value="Action">Action</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Romantic">Romantic</option>
                    </select>
                  )}
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPassword4">Price</label>
                  {idb ? (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Price"
                      value={!editMode ? books.price : price}
                      disabled={editMode ? false : true}
                      onChange={(event) => this.onChangeInput(event, "price")}
                    />
                  ) : (
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Price"
                      value={price}
                      onChange={(event) => this.onChangeInput(event, "price")}
                    />
                  )}
                </div>
              </div>
            </form>
            <form>
              <div className="form-group col-md-12 d-flex flex-column justify-content-center align-items-center">
                {idb ? (
                  <>
                    <input
                      type="file"
                      id="previewImg"
                      disabled={editMode ? false : true}
                      hidden
                      onChange={(event) => this.handleOnChangeImage(event)}
                    />
                  </>
                ) : (
                  <input
                    type="file"
                    id="previewImg"
                    hidden
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                )}

                <label className="label-upload" htmlFor="previewImg">
                  Upload <i className="fas fa-upload"></i>
                </label>
                <div
                  className="preview-image mt-5"
                  style={{
                    backgroundImage: `url(${this.state.previewImgURL})`,
                  }}
                ></div>
              </div>
            </form>
          </div>
        </div>

        <footer className="bg-light text-center text-lg-start">
          <div
            className="text-center p-3 d-flex flex-row-reverse footer-btn"
            style={{ background: "rgba(0, 0, 0, 0.2)" }}
          >
            <Link
              className="btn btn-warning btn_cancel"
              to="/system/book-redux"
            >
              Cancel
            </Link>
            {idb && !editMode ? (
              <button
                className="btn btn-secondary"
                onClick={(event) => this.handleEditBook(event)}
              >
                Edit
              </button>
            ) : editMode ? (
              <Link
                className="btn btn-info btn-add"
                to="/system/book-redux"
                onClick={() => this.handleSaveBook()}
              >
                Save
              </Link>
            ) : (
              <Link
                className="btn btn-success btn-add"
                to="/system/book-redux"
                onClick={() => this.handleAddBook()}
              >
                Add
              </Link>
            )}
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listBooks: state.book.books,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewBook: (data) => dispatch(actions.createNewBook(data)),
    getAllBook: () => dispatch(actions.getAllBook()),
    editBook: (data) => dispatch(actions.editBook(data)),
    //getGenreStart: () => dispatch(actions.fetchGenreStart()),
    // processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CRUBook);
