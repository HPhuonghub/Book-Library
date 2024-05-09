import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { Link, useParams, Redirect } from "react-router-dom";
import "./BookDetail.scss";

class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookredux: [],
      quantity: 1,
      rating: 0,
      comment: "",
      comments: [],
    };
  }

  componentDidMount() {
    this.props.getAllUser();
    this.props.getAllBook();
    this.props.getAllView();
  }

  componentDidUpdate(prevPros, prevState) {}

  handleQuantityChange = (e) => {
    this.setState({
      quantity: e.target.value,
    });
  };

  handleRatingChange = (e) => {
    this.setState({
      rating: e.target.value,
    });
  };

  handleCommentChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  checkValidateInput = () => {
    var isValid = true;
    let arrCheck = ["comment"];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("this input is required: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddComment = () => {
    let isValid = this.checkValidateInput();
    console.log("check isvalid: ", isValid);
    if (isValid === false) return;

    const { rating, comment, comments } = this.state;
    const newComment = { rating, comment };
    let idb = this.props.location.pathname.split("/")[3];
    let userInfo = this.props.userInfo;
    let user = this.props.listUsers.find(
      (item) => item.email === userInfo.email
    );
    console.log("check rating and comment", rating, comment);
    console.log("check idb and and user", idb, user.id);

    this.props.createNewView({
      user_id: user.id,
      book_id: idb,
      rating: rating,
      comment: comment,
    });

    this.setState({
      comments: [...comments, newComment],
      rating: 0,
      comment: "",
    });
  };

  getCurrentDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Tháng bắt đầu từ 0
    const year = today.getFullYear();
    return `${year}/${month}/${day}`;
  };

  handleCreateOrder = () => {
    if (window.confirm("Are you sure to order this book?")) {
      let idb = this.props.location.pathname.split("/")[3];
      let userInfo = this.props.userInfo;
      let user = this.props.listUsers.find(
        (item) => item.email === userInfo.email
      );
      // console.log("check idb and and user", idb, user.id);
      // console.log(
      //   "check order_date and quantity",
      //   this.getCurrentDate(),
      //   this.state.quantity
      // );

      //fire action redux
      this.props.createNewOrder({
        user_id: user.id,
        book_id: idb,
        quantity: this.state.quantity,
        order_date: this.getCurrentDate(),
      });
      this.setState({
        quantity: 1,
      });
    }
  };

  render() {
    let idb = this.props.location.pathname.split("/")[3];
    // console.log("check this id:", idb);
    let views = this.props.listViews;
    let view = views.filter((item) => item.book_id == idb);
    let users = this.props.listUsers;
    let listComent = "";
    if (view && users) {
      listComent = view
        .filter((bItem) => {
          let aItem = users.find((a) => a.id === bItem.user_id);
          return aItem && bItem.comment && aItem.lastName;
        })
        .map((item) => {
          let aItem = users.find((a) => a.id === item.user_id);
          return {
            lastName: aItem.lastName,
            comment: item.comment,
          };
        });
    }

    let userInfo = this.props.userInfo;
    let user = this.props.listUsers.find(
      (item) => item.email === userInfo.email
    );
    console.log("check this view:", view);
    console.log("check this user:", user);

    let listComentUser = view
      .filter((bItem) => bItem.user_id === user.id)
      .map((item) => ({ rating: item.rating, comment: item.comment }));
    // console.log("check this books3:", this.props.listUsers);

    // let listComentUser = {lastName: user.lastName,comment: book.comment}
    console.log("check this listComentUser:", listComentUser);

    let book = this.props.listBooks.find((item) => item.id == idb);
    let { title, author, description, price } = book;

    let imageBase64 = new Buffer(book.image_url, "base64").toString("binary");

    const { quantity, rating, comment, comments } = this.state;
    return (
      <div className="container py-5 ">
        <div className="row">
          <div className="col-md-6 mb-4">
            <img src={imageBase64} alt="" className="w-100" />
          </div>
          <div className="col-md-6">
            <h1>Title: {title}</h1>
            <h3>Author: {author}</h3>
            <p className="lead">${price}</p>
            <hr />
            <p className="text-justify">
              Description:
              {description}
            </p>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="mr-2">Quantity:</span>
                <input
                  type="number"
                  value={quantity}
                  onChange={this.handleQuantityChange}
                  min="1"
                  max="100"
                  className="form-control w-25 d-inline"
                  style={{ verticalAlign: "middle" }}
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={this.handleCreateOrder}
              >
                Add to Cart
              </button>
            </div>
            <hr />
            <div>
              <h5>Customer Reviews</h5>
              {listComentUser.length > 0 ? (
                listComentUser.map((c, index) => (
                  <div key={index} className="my-4">
                    <div className="d-flex align-items-center">
                      <span className="mr-2">{c.rating} stars</span>
                      <div className="rating-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`fa${
                              star <= c.rating ? "s" : "r"
                            } fa-star`}
                          ></span>
                        ))}
                      </div>
                    </div>
                    <p className="text-justify">{c.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
              <hr />
              <h5>Write a review</h5>
              <div className="form-group">
                <label>Rating:</label>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`fa${star <= rating ? "s" : "r"} fa-star`}
                      onClick={() =>
                        this.handleRatingChange({ target: { value: star } })
                      }
                    ></span>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Comment:</label>
                <textarea
                  value={comment}
                  onChange={this.handleCommentChange}
                  className="form-control"
                  rows="3"
                ></textarea>
              </div>
              <button
                className="btn btn-primary"
                onClick={this.handleAddComment}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <hr className="col-12" />
          <h2 className="col-12">Comment</h2>
          <div className="col-9">
            {listComent &&
              listComent.length > 0 &&
              listComent.map((item, index) => {
                return (
                  <div key={index}>
                    <h4>{item.lastName}</h4>
                    <label>{item.comment}</label>
                    <hr />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listBooks: state.book.books,
    userInfo: state.user.userInfo,
    listUsers: state.users.users,
    listViews: state.users.views,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewOrder: (data) => dispatch(actions.createNewOrder(data)),
    deleteOrder: (id) => dispatch(actions.deleteOrder(id)),
    getAllOrder: () => dispatch(actions.getAllView()),
    getAllBook: () => dispatch(actions.getAllBook()),
    getAllUser: () => dispatch(actions.getAllUser()),
    getAllView: () => dispatch(actions.getAllView()),
    createNewView: (data) => dispatch(actions.createNewView(data)),

    //getGenreStart: () => dispatch(actions.fetchGenreStart()),
    // processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
