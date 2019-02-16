import React, { Component } from 'react';
import { shape, func, bool } from 'prop-types';
import { Link } from 'react-router-dom';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';

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

export class Header extends Component {
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
    const { getUser, auth, addFlashMessage } = this.props;

    if (auth.isAuthenticated) {
      getUser(auth.user.username).catch(() =>
        addFlashMessage({
          type: 'error',
          text: '__500: Server-side error__. Please check your internet connection',
        }),
      );
    }
  }

  onSearch = values => {
    const { getSearchedQuestions, addFlashMessage } = this.props;
    const { history } = this.context.router;

    if (!values.search) return;

    getSearchedQuestions(values.search)
      .then(res => {
        if (!res.length) {
          addFlashMessage({
            type: 'warn',
            text: `Nothing found by search = ${values.search}`,
          });

          return;
        }

        history.push(`/questions/search?q=${values.search}`);
      })
      .catch(() =>
        addFlashMessage({
          type: 'error',
          text: '__500: Server-side error__. Please check your internet connection',
        }),
      );
  };

  render() {
    const { auth, logout, getSearchedQuestions, addFlashMessage } = this.props;
    const userPick = (
      <span>
        <MediaImage src={auth.user.gravatar} roundedCircle />
        {auth.user.username}
      </span>
    );
    const userLinks = (
      <Nav>
        <NavDropdown title="Menu" id="menu-dropdown">
          <LinkContainer to="/interview">
            <NavDropdown.Item>
              <FontAwesome name="id-badge" /> Interview (in progress)
            </NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Divider />
          <IndexLinkContainer to="/questions">
            <NavDropdown.Item>Show all questions</NavDropdown.Item>
          </IndexLinkContainer>
          <LinkContainer to="/questions/top">
            <NavDropdown.Item>
              <FontAwesome name="exclamation" /> Top 10
            </NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/questions/internet">
            <NavDropdown.Item>
              <FontAwesome name="internet-explorer" /> From Internet
            </NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Divider />
          <LinkContainer to="/questions/level">
            <NavDropdown.Item>
              <FontAwesome name="line-chart" /> By Levels
            </NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/questions/skill">
            <NavDropdown.Item>
              <FontAwesome name="star-half-o" /> By Skills
            </NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/questions/practice">
            <NavDropdown.Item>
              <FontAwesome name="keyboard-o" /> By Type
            </NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Divider />
          <LinkContainer to="/questions/add">
            <NavDropdown.Item>
              <FontAwesome name="question-circle-o" /> Add new
            </NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
        <NavDropdown title={userPick} id="account-dropdown">
          <IndexLinkContainer to="/me">
            <NavDropdown.Item>
              <FontAwesome name="user" /> Account
            </NavDropdown.Item>
          </IndexLinkContainer>
          <LinkContainer to="/me/edit">
            <NavDropdown.Item>
              <FontAwesome name="pencil-square-o" /> Edit profile
            </NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={logout}>
            <FontAwesome name="lock" /> Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );

    const guestLinks = (
      <Nav>
        <LinkContainer to="/signup">
          <Nav.Link>
            <FontAwesome name="user-plus" /> Sign Up
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/login">
          <Nav.Link>
            <FontAwesome name="user-circle" /> Login
          </Nav.Link>
        </LinkContainer>
      </Nav>
    );

    return (
      <Menu variant="dark" bg="dark" expand="md" sticky="top">
        <Container>
          <Navbar.Brand>
            <Link to="/">Frontview /</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <SearchForm
              getSearchedQuestions={getSearchedQuestions}
              addFlashMessage={addFlashMessage}
              onSearch={this.onSearch}
            />
            {auth.isAuthenticated ? userLinks : guestLinks}
          </Navbar.Collapse>
        </Container>
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
