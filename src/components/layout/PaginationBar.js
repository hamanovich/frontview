import React from 'react';
import PropTypes from 'prop-types';

import Pagination from 'react-bootstrap/lib/Pagination';

const PaginationBar = ({ activePage, pages, pageContent }) => (
  <Pagination
    prev
    next
    ellipsis
    boundaryLinks
    items={pages}
    maxButtons={5}
    activePage={activePage}
    onSelect={pageContent}
  />
);

PaginationBar.propTypes = {
  activePage: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  pageContent: PropTypes.func.isRequired
};

export default PaginationBar;
