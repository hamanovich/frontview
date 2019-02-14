import React, { Fragment } from 'react';
import { string } from 'prop-types';
import FontAwesome from 'react-fontawesome';

import QListForm from './QListForm';

const QListPage = ({ userId }) => (
  <Fragment>
    <h1>
      <FontAwesome name="list-ul" /> Create new Question&apos;s List (QList)
    </h1>

    <QListForm userId={userId} />
  </Fragment>
);

QListPage.defaultProps = {
  userId: null,
};

QListPage.propTypes = {
  userId: string,
};

export default QListPage;
