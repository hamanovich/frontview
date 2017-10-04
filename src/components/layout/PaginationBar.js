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

const { number, func } = PropTypes;

PaginationBar.propTypes = {
  activePage: number.isRequired,
  pages: number.isRequired,
  onSelect: func.isRequired
};

export default PaginationBar;