import React, { Component } from 'react';
import { shape, func } from 'prop-types';
import { Link } from 'react-router-dom';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { logout, getUser } from '../../actions/auth';
import { getSearchedQuestions } from '../../actions/questions';
import { addFlashMessage } from '../../actions/flash';
import SearchForm from './SearchForm';
import { Auth } from '../../propTypes/UserType';

import { Menu } from './style';

type HeaderProps = {
  getSearchedQuestions: (query: string) => Promise<any>;
  getUser: (identifier: string) => Promise<{}>;
  addFlashMessage: (payload: {
    type: string;
    text: string;
  }) => { type: string; payload: { type: string; text: string } };
  logout: () => void;
  auth: Auth;
};

type searchValues = {
  search: string;
};

export class Header extends Component<HeaderProps, {}> {
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
          text:
            '__500: Server-side error__. Please check your internet connection',
        }),
      );
    }
  }

  private onSearch = (values: searchValues) => {
    const { getSearchedQuestions, addFlashMessage } = this.props;
    const { history } = this.context.router;

    if (!values.search) return;

    getSearchedQuestions(values.search)
      .then((res: { length: number }) => {
        if (!res.length) {
          addFlashMessage({
            type: 'warn',
            text: `Nothing found by search '__${values.search}__'`,
          });

          return;
        }

        history.push(`/questions/search?q=${values.search}`);
      })
      .catch(() =>
        addFlashMessage({
          type: 'error',
          text:
            '__500: Server-side error__. Please check your internet connection',
        }),
      );
  };

  render() {
    const { auth, logout } = this.props;
    const userPick = auth.user.username;
    // Known issue: https://github.com/react-bootstrap/react-bootstrap/issues/3534
    // const userPick = (
    //   <Fragment>
    //     <MediaImage src={auth.user.gravatar} roundedCircle />
    //     {auth.user.username}
    //   </Fragment>
    // );
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
      <Menu variant="dark" bg="dark" expand="md">
        <Navbar.Brand>
          <Link to="/">Frontview /</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <SearchForm onSearch={this.onSearch} />
          <Nav className="mr-auto">
            <Navbar.Text>or</Navbar.Text>
            <LinkContainer to="/questions">
              <Nav.Link>
                Check All <FontAwesome name="question-circle" size="lg" />
              </Nav.Link>
            </LinkContainer>
          </Nav>
          {auth.isAuthenticated ? userLinks : guestLinks}
        </Navbar.Collapse>
      </Menu>
    );
  }
}

const mapStateToProps = (state: { auth: Auth }) => ({ auth: state.auth });

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
