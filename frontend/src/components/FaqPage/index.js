import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import PageHeader from 'react-bootstrap/lib/PageHeader';
import FontAwesome from 'react-fontawesome';
import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';

const FaqPage = () => (
  <Fragment>
    <Helmet>
      <title>Frontview: Frequently Asked Questions (FAQ)</title>
    </Helmet>

    <PageHeader>
      <FontAwesome name="question-circle" /> Frequently Asked Questions (FAQ)
    </PageHeader>

    <PanelGroup id="accordion-controlled-faq-1" defaultActiveKey="1" accordion>
      <Panel eventKey="1" bsStyle="success">
        <Panel.Heading>
          <Panel.Title toggle>What is Frontview?</Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          <p>
            Frontview - is a project to prepare and successfully pass technical interview on
            Frontend position. It has both practical and theoretical parts. In future interview flow
            will be available
          </p>
        </Panel.Body>
      </Panel>
      <Panel eventKey="2" bsStyle="danger">
        <Panel.Heading>
          <Panel.Title toggle>Why I have to register?</Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          <p>
            To get full access for all feature you have to be registered: Account Page,
            Adding/Modifing/Removing/Commenting questions, conducting interview
          </p>
        </Panel.Body>
      </Panel>
      <Panel eventKey="3" bsStyle="info">
        <Panel.Heading>
          <Panel.Title toggle>How to add a question?</Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          <p>
            Firstly login, and go to Menu - <Link to="/questions/add">Add new page</Link>
          </p>
        </Panel.Body>
      </Panel>
      <Panel eventKey="4" bsStyle="warning">
        <Panel.Heading>
          <Panel.Title toggle>What is interview page?</Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          <p>
            In progress section. Description will be added once interview flow starts available for
            each registered and logedin users.
          </p>
        </Panel.Body>
      </Panel>
    </PanelGroup>
  </Fragment>
);

export default FaqPage;
