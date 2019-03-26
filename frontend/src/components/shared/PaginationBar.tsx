import React, { FC } from 'react';

import Pagination from 'react-bootstrap/Pagination';

import { PaginationBarProps } from './models';

const PaginationBar: FC<PaginationBarProps> = ({ activePage, pages, onSelect }) => {
  if (!activePage) {
    // eslint-disable-next-line no-param-reassign
    activePage = 1;
  }
  const minPages = 3;
  const maxPages = 6;
  const item = (page: number) => (
    <Pagination.Item key={page} active={page === activePage} onClick={() => onSelect(page)}>
      {page}
    </Pagination.Item>
  );
  let items = [item(activePage)];

  if (pages <= minPages) {
    items = [];

    for (let i = 1; i <= pages; i += 1) {
      items.push(item(i));
    }
  }
  if (pages >= 3) {
    items = [item(activePage - 1), item(activePage), item(activePage + 1)];
  }

  if (pages > maxPages) {
    items = [
      item(activePage - 2),
      item(activePage - 1),
      item(activePage),
      item(activePage + 1),
      item(activePage + 2),
    ];
  }

  if (activePage < minPages && pages > maxPages) {
    items = [item(activePage - 1), item(activePage), item(activePage + 1), item(activePage + 2)];
  }

  if (activePage > pages - minPages && pages > maxPages) {
    items = [item(activePage - 2), item(activePage - 1), item(activePage), item(activePage + 1)];
  }

  if (activePage === pages && pages >= minPages) {
    items = [item(activePage - 2), item(activePage - 1), item(activePage)];
  }

  if (activePage === 1 && pages >= minPages) {
    items = [item(activePage), item(activePage + 1), item(activePage + 2)];
  }

  return (
    <Pagination className="justify-content-center">
      <Pagination.First onClick={() => onSelect(1)} disabled={activePage === 1} />
      {items}
      <Pagination.Last onClick={() => onSelect(pages)} disabled={activePage === pages} />
    </Pagination>
  );
};

export default PaginationBar;
