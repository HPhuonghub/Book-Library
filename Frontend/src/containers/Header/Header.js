import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, userMenu } from "./menuApp";
import "./Header.scss";
import _ from "lodash";
import { USER_ROLE } from "../../utils/constant";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { withRouter } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }

  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;

      // console.log("check role", role);
      // console.log("check dk: true", typeof role);
      // console.log("check dk: true", typeof USER_ROLE.ADMIN);
      // if (role === USER_ROLE.ADMIN) {
      //   console.log("check dk: true", typeof role);
      //   console.log("check dk: true", typeof USER_ROLE.ADMIN);
      // } else {
      //   console.log("check dk: false");
      // }
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.USER) {
        menu = userMenu;
      }
    }

    this.setState({
      menuApp: menu,
    });
    // console.log("check userinfor:", this.props.userInfo);
  }

  handleLogout = () => {
    // Đăng xuất và chuyển hướng đến trang localhost:3000/
    this.props.processLogout();
    this.props.history.push("/");
  };

  render() {
    const { processLogout, userInfo } = this.props;
    // console.log("check user info : ", userInfo);
    // console.log("check user menuapppp : ", this.state.menuApp);

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>

        {/* nút logout */}
        <div className="tab-left">
          <span className="welcome">
            Welcome, {userInfo && userInfo.lastName ? userInfo.lastName : ""} !
          </span>
          {this.props.isLoggedIn ? (
            <div className="btn btn-logout" onClick={this.handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
            </div>
          ) : (
            <Link className="btn btn-logout" to="/login">
              Đăng nhập
            </Link>
          )}

          {/* <div className="btn btn-logout" onClick={processLogout}>
             <i className="fas fa-sign-out-alt"></i>
          
          </div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
