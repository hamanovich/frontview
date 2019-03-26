import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

import { Timeline, TimelineItem } from './style';

const LatestNewsPage = () => (
  <Fragment>
    <Helmet>
      <title>Frontview: Latest News</title>
    </Helmet>

    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1>Latest News</h1>
          <Timeline>
            <TimelineItem>
              <Link to="/">Frontview: New Design</Link>
              <Badge variant="dark" className="pull-right">
                20 Feb, 2019
              </Badge>
              <p>
                It&apos;s time to completely upgrade Frontview to newly fresh and light vusial
                design version. Bootstrap CSS framework was upgrated to version 4 and all components
                were migrated as well. Huge step and tone of work was done! Sigh!
              </p>
            </TimelineItem>
          </Timeline>
        </Col>
      </Row>
    </Container>
  </Fragment>
);

export default LatestNewsPage;
