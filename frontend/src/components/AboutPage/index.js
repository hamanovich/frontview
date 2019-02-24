import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import About from './About';
import Faq from './Faq';
import Pricing from './Pricing';
import LatestNews from './LatestNews';
import UsefulLinks from './UsefulLinks';

const AboutPage = () => (
  <Fragment>
    <Helmet>
      <title>Frontview: About</title>
    </Helmet>
    <Switch>
      <Route exact path="/about" component={About} />
      <Route exact path="/about/news" component={LatestNews} />
      <Route exact path="/about/faq" component={Faq} />
      <Route exact path="/about/pricing" component={Pricing} />
      <Route exact path="/about/links" component={UsefulLinks} />
      <Redirect to="/" />
    </Switch>
  </Fragment>
);

export default AboutPage;
