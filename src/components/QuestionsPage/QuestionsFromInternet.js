import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';

import * as QuestionsTab from './QuestionsTabs';

class QuestionsFromInternet extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        source: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    prefixHistory: '/questions/internet',
    routes: ['Frontend', 'Soft', 'NodeJS', 'React'],
    source: ''
  };

  componentWillMount() {
    const { history } = this.context.router;
    const { params } = this.props.match;
    const { prefixHistory, routes } = this.state;

    if (!routes.includes(params.source)) {
      history.push(`${prefixHistory}/${routes[0]}`);
      params.source = routes[0];
    }

    this.setState({ source: params.source });
  }

  tabSelect = (source) => {
    const { history } = this.context.router;
    const { prefixHistory } = this.state;

    this.setState({ source });

    history.push(`${prefixHistory}/${source}`);
  };

  render() {
    const { routes, source } = this.state;

    return (
      <Tabs activeKey={source} onSelect={this.tabSelect} id="question-tabs">
        <Tab eventKey={routes[0]} title="Front End">
          <QuestionsTab.QuestionsTabFrontend />
        </Tab>
        <Tab eventKey={routes[1]} title="Soft">
          <QuestionsTab.QuestionsTabSoft />
        </Tab>
        <Tab eventKey={routes[2]} title="NodeJS">
          <QuestionsTab.QuestionsTabNodeJS />
        </Tab>
        <Tab eventKey={routes[3]} title="React">
          <QuestionsTab.QuestionsTabReact />
        </Tab>
      </Tabs>
    );
  }
}

export default QuestionsFromInternet;