import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';

import * as QuestionsTab from './QuestionsTabs';

class QuestionsFromInternet extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  state = {
    prefixHistory: '/questions/internet',
    routes: ['Frontend', 'Soft', 'NodeJS', 'React'],
    source: ''
  };

  componentWillMount() {
    const { history, route } = this.context.router;
    const { prefixHistory, routes } = this.state;

    if (!routes.includes(route.match.params.source)) {
      history.push(`${prefixHistory}/${routes[0]}`);
      route.match.params.source = routes[0];
    }

    this.setState({ source: route.match.params.source });
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