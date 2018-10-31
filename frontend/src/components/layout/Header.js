import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Image from 'react-bootstrap/lib/Image';

import { logout } from '../../actions/auth';
import { getUser } from '../../actions/signup';
import { getSearchedQuestions } from '../../actions/questions';
import { addFlashMessage } from '../../actions/flash';

import SearchForm from './SearchForm';

import { UserType } from '../../propTypes';

const Menu = styled(Navbar)`
  border-radius: 0;
`;

const MediaImage = styled(Image)`
  width: 25px;
  height: 25px;
  max-width: 25px;
  margin: -10px 5px -10px 0;
`;

const { shape, func, bool } = PropTypes;

class Header extends Component {
  static propTypes = {
    auth: shape({
      isAuthenticated: bool.isRequired,
      user: UserType.isRequired,
    }).isRequired,
    getSearchedQuestions: func.isRequired,
    getUser: func.isRequired,
    addFlashMessage: func.isRequired,
    logout: func.isRequired,
  };

  static contextTypes = {
    router: shape({
      history: shape({
        push: func.isRequired,
      }).isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const { getUser, auth } = this.props;
    if (auth.isAuthenticated) {
      getUser(auth.user.username);
    }
  }

  onSearch = values => {
    const { getSearchedQuestions, addFlashMessage } = this.props;
    const { history } = this.context.router;

    if (!values.search) return;

    getSearchedQuestions(values.search).then(res => {
      if (!res.length) {
        addFlashMessage({
          type: 'warn',
          text: `Nothing found by search = ${values.search}`,
        });

        return;
      }

      history.push(`/questions/search?q=${values.search}`);
    });
  };

  render() {
    const { auth, logout, getSearchedQuestions, addFlashMessage } = this.props;
    const userPick = (
      <span>
        <MediaImage src={auth.user.gravatar} circle />
        {auth.user.username}
      </span>
    );
    const userLinks = (
      <Nav pullRight>
        <NavDropdown title="Menu" id="menu-dropdown">
          <LinkContainer to="/interview">
            <MenuItem>
              <FontAwesome name="id-badge" /> Interview
            </MenuItem>
          </LinkContainer>
          <MenuItem divider />
          <IndexLinkContainer to="/questions">
            <MenuItem>Show all questions</MenuItem>
          </IndexLinkContainer>
          <LinkContainer to="/questions/top">
            <MenuItem>
              <FontAwesome name="exclamation" /> Top 10
            </MenuItem>
          </LinkContainer>
          <LinkContainer to="/questions/internet">
            <MenuItem>
              <FontAwesome name="internet-explorer" /> From Internet
            </MenuItem>
          </LinkContainer>
          <MenuItem divider />
          <LinkContainer to="/questions/level">
            <MenuItem>
              <FontAwesome name="line-chart" /> By Levels
            </MenuItem>
          </LinkContainer>
          <LinkContainer to="/questions/skill">
            <MenuItem>
              <FontAwesome name="star-half-o" /> By Skills
            </MenuItem>
          </LinkContainer>
          <LinkContainer to="/questions/practice">
            <MenuItem>
              <FontAwesome name="keyboard-o" /> By Practice
            </MenuItem>
          </LinkContainer>
          <MenuItem divider />
          <LinkContainer to="/questions/add">
            <MenuItem>
              <FontAwesome name="question-circle-o" /> Add new
            </MenuItem>
          </LinkContainer>
        </NavDropdown>
        <NavDropdown title={userPick} id="account-dropdown">
          <IndexLinkContainer to="/me">
            <MenuItem>
              <FontAwesome name="user" /> Account
            </MenuItem>
          </IndexLinkContainer>
          <LinkContainer to="/me/edit">
            <MenuItem>
              <FontAwesome name="pencil-square-o" /> Edit profile
            </MenuItem>
          </LinkContainer>
          <MenuItem divider />
          <MenuItem onClick={logout}>
            <FontAwesome name="lock" /> Logout
          </MenuItem>
        </NavDropdown>
      </Nav>
    );

    const guestLinks = (
      <Nav pullRight>
        <LinkContainer to="/signup">
          <NavItem>
            <FontAwesome name="user-plus" /> Sign Up
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/login">
          <NavItem>
            <FontAwesome name="user-circle" /> Login
          </NavItem>
        </LinkContainer>
      </Nav>
    );

    return (
      <Menu>
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
      </Menu>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  {
    logout,
    getUser,
    getSearchedQuestions,
    addFlashMessage,
  },
  null,
  { pure: false },
)(Header);
