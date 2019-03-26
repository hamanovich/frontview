import React, { Component } from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import * as QuestionsTab from './QuestionsTabs';
import {
  QuestionsFromInternetProps,
  QuestionsFromInternetState,
} from './models';

class QuestionsFromInternet extends Component<
  QuestionsFromInternetProps,
  QuestionsFromInternetState
> {
  state: QuestionsFromInternetState = {
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

  private tabSelect = (source: string) => {
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
