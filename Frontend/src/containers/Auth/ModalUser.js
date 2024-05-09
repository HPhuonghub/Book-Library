import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ModalUser.scss";
import { createNewUser } from "../../services/userService";
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      isShowPassword: false,
      roleId: 2,
    };
    this.listenToEmiiter();
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
  };

  listenToEmiiter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      });
    });
  }

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };

    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleAddNewUser = async () => {
    if (window.confirm("Are you sure to Add user?")) {
      let isValid = this.checkValideInput();
      let { isShowPassword, ...data } = this.state;
      if (isValid === true) {
        console.log(data);
        this.props.createNewUser(data);
      }
    }
  };

  checkValideInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        className={`modal-user-container`}
        toggle={() => {
          this.toggle();
        }}
        fullscreen
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Create a new user
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container col-12">
              <label htmlFor="email-input">Email</label>
              <input
                type="email"
                name="email"
                id="email-input"
                pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                title="Vui lòng nhập địa chỉ email hợp lệ"
                value={this.state.email}
                placeholder="Enter your email"
                onChange={(event) => this.handleOnChangeInput(event, "email")}
                required
              />
            </div>
            <div className="col-12 input-container login-input">
              <label>Password</label>
              <div className="custom-input-password">
                <input
                  required
                  type={this.state.isShowPassword ? "text" : "password"}
                  value={this.state.password}
                  className="form-control"
                  placeholder="Enter your password"
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "password")
                  }
                />
                <span
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                >
                  <i
                    className={
                      this.state.isShowPassword
                        ? "far fa-eye"
                        : "far fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="input-container col-12">
              <label>First Name</label>
              <input
                type="text"
                value={this.state.firstName}
                placeholder="Enter your first name"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "firstName")
                }
              />
            </div>
            <div className="input-container col-12">
              <label>Last Name</label>
              <input
                type="text"
                value={this.state.lastName}
                placeholder="Enter your last name"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "lastName")
                }
              />
            </div>
            <div className="input-container col-12" hidden>
              <label>roleID</label>
              <input type="text" value={this.state.roleId} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            // onClick={() => {
            //   this.toggle();
            // }}
            onClick={() => this.handleAddNewUser()}
          >
            Add New
          </Button>{" "}
          {/* <Button
            color="secondary"
            onClick={() => {
              this.toggle();
            }}
          >
            Close
          </Button> */}
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
