import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllUsers } from "../../services/userService";
import ModalUser from "../Auth/ModalUser";
import "./UserManage.scss";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUSer: false,
    };
  }

  async componentDidMount() {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
    console.log("get user from node.js : ", response);
  }

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUSer: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUSer: !this.state.isOpenModalUSer,
    });
  };

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUSer}
          toggleFromParent={this.toggleUserModal}
        />
        <div className="title text-center">Manage users with DP</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => {
              this.handleAddNewUser();
            }}
          >
            <i class="fas fa-plus"></i> Add new user
          </button>
        </div>
        <div>
          <table className="table table-hover table-bordered mt-3">
            <thead className="table-dark">
              <tr>
                <th scope="col">Email</th>
                <th scope="col">First name</th>
                <th scope="col">Last name</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{item.email}</th>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <a
                          type="button"
                          className="btn btn-primary"
                          style={{ width: "80px" }}
                        >
                          Edit
                        </a>
                        <a
                          type="button"
                          className="btn btn-danger"
                          style={{ width: "100px" }}
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
