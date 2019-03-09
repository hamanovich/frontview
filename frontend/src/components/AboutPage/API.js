import React from 'react';
import { Helmet } from 'react-helmet';
import FontAwesome from 'react-fontawesome';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

const API = () => {
  const { protocol, host } = window.location;
  return (
    <Container>
      <Helmet>
        <title>Frontview: Application programming interface (API)</title>
      </Helmet>
      <h1>
        <FontAwesome name="cubes" /> API
      </h1>
      <h2>
        <FontAwesome name="hand-spock-o" /> Intro
      </h2>
      <p className="lead">
        API Url{' '}
        <a href={`${protocol}//${host}/api`}>
          {protocol}&#x2f;&#x2f;{host}&#x2f;api
        </a>
      </p>
      <p>All HTTP methods are supported</p>
      <Table responsive>
        <thead>
          <tr>
            <th>Method</th>
            <th>Description</th>
            <th>Url</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="4">
              <strong>User</strong>
            </td>
          </tr>
          <tr>
            <td>GET</td>
            <td>Get Author info by username or email</td>
            <td>/users/&#123;username or email&#125;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td colSpan="4">
              <strong>Questions</strong>
            </td>
          </tr>
          <tr>
            <td>GET</td>
            <td>Find questions by question parameter</td>
            <td>/search?q=/&#123;question text&#125;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>GET</td>
            <td>Get Top 10 questions</td>
            <td>/questions/top</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>GET</td>
            <td>Get all questions by author</td>
            <td>/questions/author/&#123;username&#125;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>GET</td>
            <td>Get question by slug</td>
            <td>/question/&#123;slug&#125;/one</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>GET</td>
            <td>Get list of questions by username</td>
            <td>/qlists/&#123;username&#125;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td colSpan="4">
              <strong>Comments</strong>
            </td>
          </tr>
          <tr>
            <td>GET</td>
            <td>Get all comments by author</td>
            <td>/comments/&#123;username&#125;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>POST</td>
            <td>Add a comment to a question</td>
            <td>/comments/add</td>
            <td>
              <h5>Fields:</h5>
              <p>
                <small>Do not forget to authenticate by Bearer Token firstly</small>
              </p>
              <ul>
                <li>comment: string</li>
                <li>topic: string</li>
                <li>questionId: string</li>
                <li>userId: string</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </Table>
      <p className="text-danger">Documentation is in progress. Will be updated soon…</p>
    </Container>
  );
};

export default API;
