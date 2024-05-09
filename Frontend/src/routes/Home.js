import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { USER_ROLE } from "../utils";

class Home extends Component {
  render() {
    const { isLoggedIn, userInfo } = this.props;
    // let linkToRedirect = isLoggedIn ? "/system/user-manage" : "/home";
    let linkToRedirect = "";
    console.log("check linkToRedirect", linkToRedirect);

    if (isLoggedIn) {
      let role = userInfo.roleId;

      console.log("check role", role);
      // console.log("check dk: true", typeof role);
      // console.log("check dk: true", typeof USER_ROLE.ADMIN);
      if (role === USER_ROLE.ADMIN) {
        linkToRedirect = "/system/book-redux";
      }
      if (role === USER_ROLE.USER) {
        linkToRedirect = "/user/user-book";
      }
    } else {
      linkToRedirect = "/system/book-redux";
    }
    console.log("check linkToRedirect", linkToRedirect);
    // const { isLoggedIn, userInfo } = this.props;
    // let linkToRedirect = isLoggedIn ? "" : "/system/book-redux";

    // if (isLoggedIn && userInfo.role === USER_ROLE.ADMIN) {
    //   linkToRedirect = "/system/book-redux";
    // } else if (isLoggedIn && userInfo.role === USER_ROLE.USER) {
    //   linkToRedirect = "/user/user-book";
    // }
    return <Redirect to={linkToRedirect} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
