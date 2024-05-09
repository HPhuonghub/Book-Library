import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Header from "../../Header/Header";
import * as actions from "../../../store/actions";
import { Link, useParams, Redirect } from "react-router-dom";
import "./BookRedux.scss";
import { USER_ROLE } from "../../../utils";

class BookRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookredux: [],
      search: "",
      // data: props.listBooks,
    };
    // this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.getAllBook();
    this.props.getAllOrder();
  }

  componentDidUpdate(prevPros, prevState) {
    if (prevPros.listBooks !== this.props.listBooks) {
      this.setState({
        bookredux: this.props.listBooks,
      });
    }
  }

  handleDeleteBook = (book) => {
    if (window.confirm("Are you sure to delete this book?")) {
      // console.log("check delete bookid: ", book.id);
      this.props.deleteBookRedux(book.id);
    }
  };

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
    // console.log("check pros redux", this.props.listBooks);
    let books = this.state.bookredux;
    let orders = this.props.listOrders;
    console.log("check orders:", orders);
    const result = [];
    orders.forEach((item) => {
      const found = result.find((x) => x.book_id === item.book_id);
      if (found) {
        found.quantity += item.quantity;
      } else {
        result.push({ ...item });
      }
    });
    console.log("check arrQuantity:", result);
    // console.log("check bookredux userinfo:", this.props.userInfo);
    const { term, bookredux } = this.state; // Lấy giá trị term và dữ liệu đã lọc từ state
    const { isLoggedIn, userInfo } = this.props;
    // if (isLoggedIn && userInfo.role === USER_ROLE.USER) {
    //   console.log("chuyển trang");
    //   return <Redirect to="/user/user-book" />;
    // }
    return (
      <>
        {!this.props.isLoggedIn && <Header />}
        <div className="container">
          <div className="d-flex justify-content-center search">
            <input
              type="text"
              placeholder="Search"
              className="input-search"
              onChange={this.handleSearch} // Khi input search thay đổi, gọi phương thức handleSearch
              value={term} // Hiển thị giá trị tìm kiếm trên input search
            />
          </div>
          {this.props.isLoggedIn && this.props.userInfo.roleId === 1 ? (
            <>
              <Link className="btn btn-success col-12" to="/system/add-book">
                ADD BOOK
              </Link>
            </>
          ) : (
            <div></div>
          )}

          <div className="py-4">
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Author</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Release_date</th>
                  <th scope="col">Page_count</th>
                  <th scope="col">Sold_count</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {books &&
                  books.length > 0 &&
                  books.map((item, index) => {
                    let sold_counts = 0;
                    for (let i = 0; i < result.length; i++) {
                      if (item.id === result[i].book_id) {
                        sold_counts = result[i].quantity;
                      }
                    }
                    return (
                      <tr key={index}>
                        <th>{item.title}</th>
                        <td>{item.author}</td>
                        <td>{item.genre}</td>
                        <td>{item.release_date}</td>
                        <td> {item.page_count}</td>
                        <td> {sold_counts}</td>
                        <td className="d-flex">
                          {this.props.isLoggedIn &&
                          this.props.userInfo.roleId === 1 ? (
                            <>
                              <Link
                                className="btn btn-primary mx-2"
                                to={`/system/book-redux/${item.id}`}
                              >
                                View
                              </Link>
                              <button
                                className="btn btn-danger mx-2"
                                onClick={() => this.handleDeleteBook(item)}
                              >
                                Delete
                              </button>
                            </>
                          ) : (
                            <div></div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listBooks: state.book.books,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    listOrders: state.users.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewBook: (data) => dispatch(actions.createNewBook(data)),
    deleteBookRedux: (id) => dispatch(actions.deleteBook(id)),
    getAllBook: () => dispatch(actions.getAllBook()),
    getAllOrder: () => dispatch(actions.getAllOrder()),

    //getGenreStart: () => dispatch(actions.fetchGenreStart()),
    // processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookRedux);
