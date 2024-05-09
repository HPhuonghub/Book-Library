import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import ProductManage from "../containers/System/ProductManage";
//import RegisterPackageGroupOrAcc from "../containers/System/RegisterPackageGroupOrAcc";
import UserRedux from "../containers/System/Admin/UserRedux";
import BookRedux from "../containers/System/Admin/BookRedux";
import CRUBook from "../containers/System/CRUDBook/CRUBook";
import CRUUser from "../containers/System/Admin/CRUUser";
import ViewOrder from "../containers/System/Admin/ViewOrder";

class System extends Component {
  render() {
    const { systemMenuPath } = this.props;
    return (
      <div className="system-container">
        <div
          className="system-list overflow-auto fixed-height"
          style={{ height: "680px" }}
        >
          <Switch>
            <Route exact path="/system/user-manage" component={UserRedux} />
            <Route
              exact
              path="/system/product-manage"
              component={ProductManage}
            />
            <Route exact path="/system/order-manage" component={ViewOrder} />

            <Route exact path="/system/user-redux" component={UserRedux} />
            <Route exact path="/system/add-user" component={CRUUser} />
            <Route exact path="/system/add-user/:id" component={CRUUser} />

            <Route exact path="/system/book-redux" component={BookRedux} />
            <Route exact path="/system/book-redux/:id" component={CRUBook} />
            <Route exact path="/system/add-book" component={CRUBook} />
            <Route
              exact
              path="/system/book-redux/cru-redux"
              component={CRUBook}
            />
            <Route
              component={() => {
                return <Redirect to={systemMenuPath} />;
              }}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
