import React from 'react';
import FontAwesome from 'react-fontawesome';

import PageHeader from 'react-bootstrap/lib/PageHeader';

import QListForm from './QListForm';

const QListPage = () => (
  <div>
    <PageHeader>
      <FontAwesome name="list-ul" /> Create new Question&apos;s List (QList)
    </PageHeader>

    <QListForm />
  </div>
);

export default QListPage;