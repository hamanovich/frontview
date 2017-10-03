import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import QListForm from './QListForm';

const QListPage = ({ userId }) => (
  <div>
    <PageHeader>
      <FontAwesome name="list-ul" /> Create new Question&apos;s List (QList)
    </PageHeader>

    <QListForm userId={userId} />
  </div>
);

QListPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default QListPage;