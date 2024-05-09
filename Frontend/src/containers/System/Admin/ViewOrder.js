import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
class ViewOrder extends Component {
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

  //   handleDeleteOrder = (order) => {
  //     if (window.confirm("Are you sure to cancel this order?")) {
  //       console.log("check delete order: ", order.id);
  //       this.props.deleteOrder(order.id);
  //     }
  //   };

  render() {
    let userInfo = this.props.userInfo;
    let user = this.state.userredux;
    let book = this.props.listBooks;
    console.log("check this user:", user);
    console.log("check this book:", book);
    let orders = "";
    if (user && book) {
      orders = this.props.listOrders
        .filter((order) => {
          const userObj = user.find((user) => user.id === order.user_id);
          const bookObj = book.find((book) => book.id === order.book_id);

          return userObj && bookObj; // Lọc bỏ các order không liên kết tới user hoặc book
        })
        .map((order) => ({
          id: order.id,
          author: book.find((book) => book.id === order.book_id)?.author,
          title: book.find((book) => book.id === order.book_id)?.title,
          lastName: user.find((user) => user.id === order.user_id)?.lastName,
          email: user.find((user) => user.id === order.user_id)?.email,
          price: book.find((book) => book.id === order.book_id)?.price,
          description: book.find((book) => book.id === order.book_id)
            ?.description,
          image_url: book.find((book) => book.id === order.book_id)?.image_url,
          quantity: order.quantity,
        }));
    }
    //
    let { orderredux } = this.state.orderredux;
    console.log("check this orders:", orders);
    //     let oder = "";
    //     if (orderredux) {
    //       oder = orderredux.filter((c) => c.user_id === user.id);
    //     }
    // console.log("check this oder:", oder);
    // console.log("check this orders:", orders);
    return (
      <div className="container py-5 ">
        <div className="row">
          <h1 className="col-12 text-center mb-5">
            List of books the user has booked
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
                      <h5 className="text-justify">
                        Email user ordered: <br />
                        {item.email}
                      </h5>
                      <hr />
                      <h5 className="text-justify">
                        Name user ordered: <br />
                        {item.lastName}
                      </h5>
                      <hr />
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrder);
