import React from 'react';
import PropTypes from 'prop-types';

import Pagination from 'react-bootstrap/lib/Pagination';

const PaginationBar = ({ activePage, pages, onSelect }) => {
  const items = [];

  for (let number = 1; number <= pages; number += 1) {
    items.push(
      <Pagination.Item key={number} active={number === activePage} onClick={() => onSelect(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      {items}
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
};

const { number, func } = PropTypes;

PaginationBar.propTypes = {
  activePage: number.isRequired,
  pages: number.isRequired,
  onSelect: func.isRequired,
};

export default PaginationBar;
