import React from 'react';
import PropTypes from 'prop-types';

import Pagination from 'react-bootstrap/lib/Pagination';

const PaginationBar = ({ activePage, pages, onSelect }) => (
  <Pagination
    prev
    next
    first
    last
    ellipsis
    boundaryLinks
    items={pages}
    maxButtons={4}
    activePage={activePage}
    onSelect={onSelect}
  />
);

PaginationBar.propTypes = {
  activePage: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default PaginationBar;