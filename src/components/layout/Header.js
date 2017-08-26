import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import { logout } from '../../actions/auth';
import { getSearchedQuestions } from '../../actions/questions';
import { addFlashMessage } from '../../actions/flash';

import SearchForm from './SearchForm';

class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    getSearchedQuestions: PropTypes.func.isRequired,
    addFlashMessage: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  onSearch = (values) => {
    const { getSearchedQuestions, addFlashMessage } = this.props;
    const { history } = this.context.router;

    getSearchedQuestions(values.search).then(
      (res) => {
        if (!res.length) {
          addFlashMessage({
            type: 'warn',
            text: `Nothing found by search = ${values.search}`
          });

          return;
        }

        history.push(`/questions/search?q=${values.search}`);
      }
    );
  };

  render() {
    const { auth, logout, getSearchedQuestions, addFlashMessage } = this.props;
    const username = auth.user ? (auth.user.username || '') : '';
    const userLinks = (
      <Nav pullRight>
        <NavDropdown title="Questions" id="questions-dropdown">
          <IndexLinkContainer to="/questions"><MenuItem>Show All</MenuItem></IndexLinkContainer>
          <MenuItem divider />
          <LinkContainer to="/questions/level"><MenuItem><FontAwesome name="line-chart" /> By Levels</MenuItem></LinkContainer>
          <LinkContainer to="/questions/skill"><MenuItem><FontAwesome name="star-half-o" /> By Skills</MenuItem></LinkContainer>
          <LinkContainer to="/questions/practice"><MenuItem><FontAwesome name="keyboard-o" /> By Practice</MenuItem></LinkContainer>
          <MenuItem divider />
          <LinkContainer to="/questions/add"><MenuItem><FontAwesome name="question-circle-o" /> Add new</MenuItem></LinkContainer>
        </NavDropdown>
        <NavDropdown title={username} id="account-dropdown">
          <IndexLinkContainer to="/me"><MenuItem><FontAwesome name="user" /> Account</MenuItem></IndexLinkContainer>
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
            <Link to="/">Frontview /</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <SearchForm
            getSearchedQuestions={getSearchedQuestions}
            addFlashMessage={addFlashMessage}
            onSearch={this.onSearch}
          />
          {auth.isAuthenticated ? userLinks : guestLinks}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  { logout, getSearchedQuestions, addFlashMessage },
  null,
  { pure: false }
)(Header);