import React, { Fragment } from 'react';
import { string } from 'prop-types';
import FontAwesome from 'react-fontawesome';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import QListForm from './QListForm';

const QListPage = ({ userId }) => (
  <Fragment>
    <PageHeader>
      <FontAwesome name="list-ul" /> Create new Question&apos;s List (QList)
    </PageHeader>

    <QListForm userId={userId} />
  </Fragment>
);

QListPage.propTypes = {
  userId: string.isRequired,
};

export default QListPage;
