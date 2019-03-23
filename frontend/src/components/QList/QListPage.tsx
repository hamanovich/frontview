import React, { FC, Fragment } from 'react';
import FontAwesome from 'react-fontawesome';

import QListForm from './QListForm';
import { QListPageProps } from './models';

const QListPage: FC<QListPageProps> = ({ userId }) => (
  <Fragment>
    <h1>
      <FontAwesome name="list-ul" /> Create new Question&apos;s List (QList)
    </h1>

    <QListForm userId={userId} />
  </Fragment>
);

QListPage.defaultProps = {
  userId: '',
};

export default QListPage;
