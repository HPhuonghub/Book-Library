import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Header from "../../Header/Header";
import * as actions from "../../../store/actions";
import "./CRUUser.scss";
import { CommonUtils } from "../../../utils";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
class CRUUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      roleId: 2,

      editMode: false,
      iduser: "",
    };
  }

  async componentDidMount() {
    this.props.getAllUser();
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

  handleAddUser = () => {
    if (window.confirm("Are you sure to Add this user?")) {
      let isValid = this.checkValidateInput();
      // console.log("check isvalid: ", isValid);
      if (isValid === false) {
        alert("user creation failed");
        return;
      }
      // fire action redux
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      });
    }
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    // console.log("check isvalid: ", isValid);
    // console.log("check image_url: ", this.state.image_url);
    if (isValid === false) {
      alert("user edit failed");
      return;
    }
    // fire action redux
    this.props.editUser({
      id: this.state.iduser,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    });
  };

  checkValidateInput = () => {
    var isValid = true;
    let arrCheck = ["email", "firstName", "lastName"];
    if (this.state.email && this.state.email.includes("@gmail.com") === false) {
      isValid = false;
      alert("This email is not valid");
    }
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

  handleEditUser = () => {
    this.setState({
      editMode: true,
    });

    let idb = this.props.location.pathname.split("/")[3];
    let users = this.props.listUsers.find((item) => item.id == idb);
    console.log("check editmode:", users);

    this.setState({
      iduser: idb,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
    });
  };

  render() {
    let { email, password, firstName, lastName, editMode } = this.state;
    let idb = this.props.location.pathname.split("/")[3];
    let users = this.props.listUsers.find((item) => item.id == idb);
    console.log("check pros redux", users);

    return (
      <div className="user-redux-container">
        <div className="row d-flex justify-content-center">
          <div className="title col-12 text-center mb-4">User</div>
          <form className="container col-8">
            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="inputEmail4">Email</label>
                {idb ? (
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                    value={!editMode ? users.email : email}
                    disabled={editMode ? false : true}
                    onChange={(event) => this.onChangeInput(event, "email")}
                    required
                  />
                ) : (
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail4"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => this.onChangeInput(event, "email")}
                    required
                  />
                )}
                {/* <input
                  type="email"
                  class="form-control"
                  id="inputEmail4"
                  placeholder="Email"
                  required
                /> */}
              </div>
            </div>
            {idb ? (
              <></>
            ) : (
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label for="inputEmail4">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="inputEmail4"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => this.onChangeInput(event, "password")}
                    required
                  />
                </div>
              </div>
            )}

            <div class="form-group">
              <label for="inputAddress">First Name</label>
              {idb ? (
                <input
                  type="text"
                  class="form-control"
                  id="inputAddress"
                  placeholder="First Name"
                  value={!editMode ? users.firstName : firstName}
                  disabled={editMode ? false : true}
                  onChange={(event) => this.onChangeInput(event, "firstName")}
                />
              ) : (
                <input
                  type="text"
                  class="form-control"
                  id="inputAddress"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(event) => this.onChangeInput(event, "firstName")}
                />
              )}
              {/* <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
              /> */}
            </div>
            <div class="form-group">
              <label for="inputAddress">Last Name</label>
              {idb ? (
                <input
                  type="text"
                  class="form-control"
                  id="inputAddress"
                  placeholder="Last Name"
                  value={!editMode ? users.lastName : lastName}
                  disabled={editMode ? false : true}
                  onChange={(event) => this.onChangeInput(event, "lastName")}
                />
              ) : (
                <input
                  type="text"
                  class="form-control"
                  id="inputAddress"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(event) => this.onChangeInput(event, "lastName")}
                />
              )}
              {/* <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
              /> */}
              <div className="input-container col-12" hidden>
                <label>roleID</label>
                <input type="text" value={this.state.roleId} />
              </div>
            </div>
          </form>
        </div>

        <footer className="bg-light text-center text-lg-start">
          <div
            className="text-center p-3 d-flex flex-row-reverse footer-btn"
            style={{ background: "rgba(0, 0, 0, 0.2)" }}
          >
            <Link
              className="btn btn-warning btn_cancel"
              to="/system/user-manage"
            >
              Cancel
            </Link>
            {idb && !editMode ? (
              <button
                className="btn btn-secondary"
                onClick={(event) => this.handleEditUser(event)}
              >
                Edit
              </button>
            ) : editMode ? (
              <Link
                className="btn btn-info btn-add"
                to="/system/user-manage"
                onClick={() => this.handleSaveUser()}
              >
                Save
              </Link>
            ) : (
              <Link
                className="btn btn-success btn-add"
                to="/system/user-manage"
                onClick={() => this.handleAddUser()}
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
    listUsers: state.users.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    getAllUser: () => dispatch(actions.getAllUser()),
    editUser: (data) => dispatch(actions.editUser(data)),
    //getGenreStart: () => dispatch(actions.fetchGenreStart()),
    // processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CRUUser);
