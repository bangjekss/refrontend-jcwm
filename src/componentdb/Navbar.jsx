import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavbarText, Button } from 'reactstrap';
import { connect } from 'react-redux';

class NavbarComp extends Component {
  state = {
    isOpen: false,
  };
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  handleShowAvaiable = () => {
    const { rxProductdb } = this.props;
    const avaiableProduct = rxProductdb.filter((value) => value.status === 'avaiable');
    // return console.log(avaiableProduct);
    return avaiableProduct.length;
  };
  render() {
    const { rxProductdb } = this.props;
    return (
      <div style={{ boxShadow: '0px 5px 10px 1px rgba(0,0,0,0.3)' }}>
        <Navbar color="light" light expand="md" className="container">
          <NavbarBrand href="/admin">ADMIN</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <div></div>
            </Nav>
            <NavbarText>Products : {this.handleShowAvaiable()}</NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = ({ adminReducer }) => {
  return {
    rxProductdb: adminReducer.productdb,
  };
};

export default connect(mapStateToProps)(NavbarComp);
