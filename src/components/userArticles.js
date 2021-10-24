import React, {Fragment, useEffect} from 'react';
import {stringify} from 'query-string';

import {getPaginator, limit} from 'utils';
import useFetch from 'hooks/useFetch';
import Pagination from 'components/pagination';
import Loading from './loading';
import ErrorMessage from './errorMessage';
import Feed from './feed';

const getApiUrl = ({username, offset, isFavorites}) => {
  const params = isFavorites
    ? {limit, offset, favorited: username}
    : {limit, offset, author: username};
  return `/articles/?${stringify(params)}`;
};

const UserArticles = ({username, location, url, isFavorites}) => {
  const {offset, currentPage} = getPaginator(location.search);

  const apiUrl = getApiUrl({username, offset, isFavorites});
  const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage, isFavorites]);

  return (
    <div>
      {isLoading && <Loading />}
      {error && <ErrorMessage />}
      {!isLoading && !!response && (
        <Fragment>
          <Feed articles={response.articles} />
          <Pagination
            total={response.articlesCount}
            limit={limit}
            url={url}
            currentPage={currentPage}
          />
        </Fragment>
      )}
    </div>
  );
};

export default UserArticles;
