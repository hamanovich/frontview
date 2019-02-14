import React, { Component } from 'react';
import { shape, func, string } from 'prop-types';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import * as QuestionsTab from './QuestionsTabs';

class QuestionsFromInternet extends Component {
  static propTypes = {
    match: shape({
      params: shape({
        source: string,
      }).isRequired,
    }).isRequired,
    history: shape({
      push: func.isRequired,
    }).isRequired,
  };

  state = {
    prefixHistory: '/questions/internet',
    routes: ['Frontend', 'Soft', 'NodeJS', 'React'],
    source: '',
  };

  componentWillMount() {
    const { match, history } = this.props;
    const { prefixHistory, routes } = this.state;

    if (!routes.includes(match.params.source)) {
      history.push(`${prefixHistory}/${routes[0]}`);
      [match.params.source] = routes;
    }

    this.setState({ source: match.params.source });
  }

  tabSelect = source => {
    const { history } = this.props;
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
