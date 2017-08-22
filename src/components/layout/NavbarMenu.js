import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import { logout } from '../../actions/auth';

import './NavbarMenu.css';

class NavbarMenu extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const { auth, logout } = this.props;
    const username = auth.user.username || '';

    const userLinks = (
      <Nav pullRight>
        <NavDropdown title={username} id="account-dropdown">
          <LinkContainer to="/me"><MenuItem><FontAwesome name="user" /> Account</MenuItem></LinkContainer>
          <LinkContainer to="/me/edit"><MenuItem>Edit profile</MenuItem></LinkContainer>
          <MenuItem divider />
          <MenuItem onClick={logout}><FontAwesome name="lock" /> Logout</MenuItem>
        </NavDropdown>
      </Nav>
    );

    const guestLinks = (
      <Nav pullRight>
        <LinkContainer to="/signup">
          <NavItem><FontAwesome name="user-plus" /> Sign Up</NavItem>
        </LinkContainer>
        <LinkContainer to="/login">
          <NavItem><FontAwesome name="user-circle" /> Login</NavItem>
        </LinkContainer>
      </Nav>
    );

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Frontview</Link>
          </Navbar.Brand>
        </Navbar.Header>
        {auth.isAuthenticated ? userLinks : guestLinks}
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout }, null, { pure: false })(NavbarMenu);