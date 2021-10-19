import React, {Fragment, useEffect} from 'react';
import {stringify} from 'query-string';

import useFetch from 'hooks/useFetch';
import Feed from 'components/feed';
import Pagination from 'components/pagination';
import {getPaginator, limit} from 'utils';

const GlobalFeed = ({location, match}) => {
  const url = match.url;
  const {offset, currentPage} = getPaginator(location.search);
  const stringifiedParams = stringify({limit, offset});

  const [{response, isLoading, error}, doFetch] = useFetch(
    `/articles?${stringifiedParams}`
  );

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage]); // не забудь установить зависимость от currentPage! иначе не будет отправляться повторный запрос

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium clone</h1>
          <p>A place to...</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {isLoading && <div>Loading...</div>}
            {error && <div>Some error happened</div>}
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
          <div className="col-md-3">{'Popular tags'}</div>
        </div>
      </div>
    </div>
  );
};

export default GlobalFeed;
