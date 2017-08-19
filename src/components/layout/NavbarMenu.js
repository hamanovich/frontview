import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import './NavbarMenu.css';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

class NavbarMenu extends Component {
  render() {
    const TRUE_OR_FALSE = false;

    const userLinks = (
      <Nav pullRight>
        <NavDropdown title="Username" id="account-dropdown">
          <LinkContainer to="/account"><MenuItem>Account</MenuItem></LinkContainer>
          <LinkContainer to="/edit"><MenuItem>Edit profile</MenuItem></LinkContainer>
          <MenuItem divider />
          <MenuItem><Glyphicon glyph="lock" /> Logout</MenuItem>
        </NavDropdown>
      </Nav>
    );

    const guestLinks = (
      <Nav pullRight>
        <LinkContainer to="/signup">
          <NavItem>Sign Up</NavItem>
        </LinkContainer>
        <LinkContainer to="/login">
          <NavItem>Login</NavItem>
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
        {TRUE_OR_FALSE ? userLinks : guestLinks}
      </Navbar>

    );
  }
}

export default NavbarMenu;