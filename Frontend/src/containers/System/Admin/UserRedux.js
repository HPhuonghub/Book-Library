import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Header from "../../Header/Header";
import * as actions from "../../../store/actions";
import { Link } from "react-router-dom/cjs/react-router-dom";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUSer: false,
      userredux: [],
    };
  }

  async componentDidMount() {
    this.props.getAllUser();
  }

  componentDidUpdate(prevPros, prevState) {
    if (prevPros.listUsers !== this.props.listUsers) {
      this.setState({
        userredux: this.props.listUsers,
      });
    }
  }

  handleDeleteUser = (user) => {
    if (window.confirm("Are you sure to delete this book?")) {
      // console.log("check delete bookid: ", book.id);
      this.props.deleteUser(user.id);
    }
  };

  handleSearch = (event) => {
    const { value } = event.target;
    const { listUsers } = this.props;
    const filteredData = listUsers.filter(
      (item) =>
        item.email.toLowerCase().includes(value.toLowerCase()) ||
        item.firstName.toLowerCase().includes(value.toLowerCase()) ||
        item.lastName.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({ term: value, userredux: filteredData }); // Cập nhật lại state với dữ liệu đã lọc
  };

  render() {
    let arrUsers = this.state.arrUsers;
    let users = this.state.userredux;
    const { term, userredux } = this.state;
    // let users = userredux;
    // console.log("check lists book", books);
    return (
      <div className="users-container">
        <div className="title text-center">Manage users with DP</div>
        <div className="d-flex justify-content-center search">
          <input
            type="text"
            placeholder="Search"
            className="input-search"
            onChange={this.handleSearch} // Khi input search thay đổi, gọi phương thức handleSearch
            value={term} // Hiển thị giá trị tìm kiếm trên input search
          />
        </div>
        <Link
          className="btn btn-success col-12 mt-4 mb-2"
          to="/system/add-user"
        >
          ADD BOOK
        </Link>
        <div>
          <table className="table table-hover table-bordered mt-3">
            <thead className="table-dark">
              <tr>
                <th scope="col">Email</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{item.email}</th>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <Link
                          type="button"
                          className="btn btn-primary"
                          style={{ width: "80px" }}
                          to={`/system/add-user/${item.id}`}
                        >
                          Edit
                        </Link>
                        <a
                          type="button"
                          className="btn btn-danger"
                          style={{ width: "100px" }}
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.users.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUser: () => dispatch(actions.getAllUser()),
    deleteUser: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
