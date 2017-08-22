import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/lib/Row';

// import QuestionsList from './QuestionsList';
import PaginationBar from '../layout/PaginationBar';

// import { getQuestions } from '../../actions/questionActions';
// import { addFlashMessage } from '../../actions/flashMessages';

class QuestionsPage extends Component {
  static propTypes = {
    // getQuestions: PropTypes.func.isRequired,
    // addFlashMessage: PropTypes.func.isRequired,
    // params: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    active: '',
    activePage: 1,
    pages: 1,
    skills: [],
    ans: []
  };

  // componentDidMount() {
  //   this.pageContent(this.props.params.page || 1);
  // }

  // pageContent = (eventKey) => {
  //   const { addFlashMessage, getQuestions } = this.props;

  //   getQuestions(eventKey)
  //     .then(
  //     ({ pages, ans }) => {
  //       this.setState({ ans, pages, activePage: Number(eventKey) });
  //       this.context.router.push(`${this.context.router.routes[1].path}/page/${eventKey}`);
  //     },
  //     (err) => {
  //       addFlashMessage({
  //         type: 'error',
  //         text: err.response.data.error
  //       });

  //       this.setState({
  //         questions: false
  //       });
  //     }
  //     );
  // };

  render() {
    return (
      <Row>
        <QuestionsList questions={this.state.ans} />

        {this.state.ans.length && <PaginationBar
          activePage={this.state.activePage}
          pageContent={this.pageContent}
          pages={this.state.pages}
        />}
      </Row>
    );
  }
}

export default connect(null, { getQuestions, addFlashMessage })(QuestionsPage);
