import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Header";
import BookRedux from "../containers/System/User/BookRedux";
import OderRedux from "../containers/System/User/OderRedux";
import BookDetail from "../containers/System/User/BookDetail";

class User extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        <div className="system-container " style={{ position: "relative" }}>
          <div
            className="system-list overflow-auto fixed-height"
            style={{ height: "680px" }}
          >
            <Switch>
              <Route exact path="/user/user-book" component={BookRedux} />
              <Route exact path="/user/user-book/:id" component={BookDetail} />
              <Route exact path="/user/user-oder" component={OderRedux} />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
