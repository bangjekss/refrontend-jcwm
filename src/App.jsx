import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { AdminPage } from './pagedb';
import { NavbarComp } from './componentdb';
import { getProductAction } from './redux/action';
import { connect } from 'react-redux';

class App extends Component {
  state = {};
  componentDidMount() {
    const { getProductAction } = this.props;
    getProductAction();
  }
  render() {
    return (
      <div>
        <NavbarComp />
        <Route path="/admin" exact component={AdminPage} />
      </div>
    );
  }
}

export default connect(null, { getProductAction })(App);
