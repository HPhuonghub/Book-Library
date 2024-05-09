import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Link, useParams, Redirect } from "react-router-dom";
import "./BookRedux.scss";

class BookRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookredux: [],
    };
  }

  componentDidMount() {
    this.props.getAllBook();
  }

  componentDidUpdate(prevPros, prevState) {
    if (prevPros.listBooks !== this.props.listBooks) {
      this.setState({
        bookredux: this.props.listBooks,
      });
    }
  }

  handleSearch = (event) => {
    const { value } = event.target;
    const { listBooks } = this.props;
    const filteredData = listBooks.filter(
      (item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.genre.toLowerCase().includes(value.toLowerCase()) ||
        item.author.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({ term: value, bookredux: filteredData }); // Cập nhật lại state với dữ liệu đã lọc
  };

  render() {
    let books = this.state.bookredux;
    console.log("check this books2:", books);
    console.log("check this books3:");
    const { term, bookredux } = this.state;
    return (
      <div>
        <section style={{ backgroundColor: "#eee" }}>
          <div className="text-center container py-5">
            <div className="d-flex justify-content-center search">
              <input
                type="text"
                placeholder="Search"
                className="input-search"
                onChange={this.handleSearch} // Khi input search thay đổi, gọi phương thức handleSearch
                value={term} // Hiển thị giá trị tìm kiếm trên input search
              />
            </div>
            <h4 className="mt-4 mb-5">
              <strong>Books</strong>
            </h4>
            <div className="row">
              {books &&
                books.length > 0 &&
                books.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image_url) {
                    imageBase64 = new Buffer(item.image_url, "base64").toString(
                      "binary"
                    );
                  }
                  return (
                    <div className="col-md-3 " key={index}>
                      <div className="card mb-4">
                        <Link
                          to={`/user/user-book/${item.id}`}
                          className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                          data-mdb-ripple-color="light"
                        >
                          <img src={imageBase64} className="w-100" />
                          <div className="mask">
                            <div className="d-flex justify-content-start align-items-end h-50">
                              <h5>
                                <span className="badge bg-primary ms-2">
                                  New
                                </span>
                              </h5>
                            </div>
                          </div>
                          <div className="hover-overlay">
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "rgba(251, 251, 251, 0.15)",
                              }}
                            ></div>
                          </div>
                        </Link>
                        <div className="card-body">
                          <Link
                            to={`/user/user-book/${item.id}`}
                            className="text-reset"
                          >
                            <h5 className="card-title mb-3 text-truncate">
                              {item.title}
                            </h5>
                          </Link>
                          <Link
                            to={`/user/user-book/${item.id}`}
                            className="text-reset"
                          >
                            <p className="text-truncate">{item.author}</p>
                          </Link>
                          <h6 className="mb-3">${item.price}</h6>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
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
    deleteBookRedux: (id) => dispatch(actions.deleteBook(id)),
    getAllBook: () => dispatch(actions.getAllBook()),

    //getGenreStart: () => dispatch(actions.fetchGenreStart()),
    // processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookRedux);
