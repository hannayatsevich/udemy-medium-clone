import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

import {range} from 'utils';

const PaginationItem = ({page, url, currentPage}) => {
  const liClasses = classNames('page-item', {
    active: page === currentPage,
  });

  return (
    <li className={liClasses}>
      <Link to={`${url}?page=${page}`} className="page-link">
        {page}
      </Link>
    </li>
  );
};

const Pagination = ({total, limit, url, currentPage}) => {
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount);

  return (
    <ul className="pagination">
      {pages.map((page) => (
        <PaginationItem
          page={page}
          key={page}
          url={url}
          currentPage={currentPage}
        />
      ))}
    </ul>
  );
};

export default Pagination;