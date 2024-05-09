import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./OderRedux.scss";
class OderRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookredux: [],
      userredux: [],
      orderredux: [],
    };
  }

  componentDidMount() {
    this.props.getAllUser();
    this.props.getAllBook();
    this.props.getAllView();
    this.props.getAllOrder();
  }

  componentDidUpdate(prevPros, prevState) {
    if (prevPros.listUsers !== this.props.listUsers) {
      this.setState({
        userredux: this.props.listUsers,
      });
    }
    if (prevPros.listOrders !== this.props.listOrders) {
      this.setState({
        orderredux: this.props.listOrders,
      });
    }
  }

  handleDeleteOrder = (order) => {
    if (window.confirm("Are you sure to cancel this order?")) {
      console.log("check delete order: ", order.id);
      this.props.deleteOrder(order.id);
    }
  };

  render() {
    let userInfo = this.props.userInfo;
    let user = this.state.userredux.find(
      (item) => item.email === userInfo.email
    );
    let book = this.props.listBooks;
    // console.log("check this user:", user);
    let orders = "";
    if (user && book) {
      orders = this.props.listOrders
        .filter((c) => c.user_id === user.id)
        .map((c) => {
          let author = book.find((b) => b.id === c.book_id).author;
          let title = book.find((b) => b.id === c.book_id).title;
          let price = book.find((b) => b.id === c.book_id).price;
          let description = book.find((b) => b.id === c.book_id).description;
          let image_url = book.find((b) => b.id === c.book_id).image_url;
          return {
            id: c.id,
            author: author,
            title: title,
            price: price,
            description: description,
            quantity: c.quantity,
            image_url: image_url,
          };
        });
    }
    //
    let { orderredux } = this.state.orderredux;
    let oder = "";
    if (orderredux) {
      oder = orderredux.filter((c) => c.user_id === user.id);
    }
    // console.log("check this oder:", oder);
    // console.log("check this orders:", orders);
    return (
      <div className="container py-5 ">
        <div className="row">
          <h1 className="col-12 text-center mb-5">
            List of books you have ordered
          </h1>
          {orders &&
            orders.length > 0 &&
            orders.map((item, index) => {
              let imageBase64 = "";
              if (item.image_url) {
                imageBase64 = new Buffer(item.image_url, "base64").toString(
                  "binary"
                );
              }
              return (
                <div className="col-12 d-flex mb-4">
                  <div className="col-md-6 mb-4">
                    <img src={imageBase64} alt="" className="w-100" />
                  </div>
                  <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <div className="col-md-9">
                      <h1>Title: {item.title}</h1>
                      <h3>Author: {item.author}</h3>
                      <p className="lead">${item.price}</p>
                      <hr />
                      <p className="text-justify">
                        Description: {item.description}
                      </p>
                      <hr />
                      <p className="text-justify">Quantity: {item.quantity}</p>
                      <hr />
                      <p className="text-justify">
                        Total: ${item.price * item.quantity}
                      </p>
                      <hr />
                    </div>
                    <div className="col-md-3">
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => this.handleDeleteOrder(item)}
                      >
                        Cancel Order
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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
    listOrders: state.users.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewOrder: (data) => dispatch(actions.createNewOrder(data)),
    deleteOrder: (id) => dispatch(actions.deleteOrder(id)),
    getAllOrder: () => dispatch(actions.getAllOrder()),
    getAllBook: () => dispatch(actions.getAllBook()),
    getAllUser: () => dispatch(actions.getAllUser()),
    getAllView: () => dispatch(actions.getAllView()),
    createNewView: (data) => dispatch(actions.createNewView(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OderRedux);
