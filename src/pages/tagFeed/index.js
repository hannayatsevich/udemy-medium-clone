import React, {Fragment, useEffect} from 'react';
import {stringify} from 'query-string';

import useFetch from 'hooks/useFetch';
import {getPaginator, limit} from 'utils';
import Feed from 'components/feed';
import Pagination from 'components/pagination';
import PopularTags from 'components/popularTags';
import ErrorMessage from 'components/errorMessage';
import Loading from 'components/loading';
import FeedToggler from 'components/feedToggler';
import Banner from 'components/banner';

const TagFeed = ({location, match}) => {
  const tagName = match.params.slug;
  const url = match.url;
  const {offset, currentPage} = getPaginator(location.search);
  const stringifiedParams = stringify({limit, offset, tag: tagName});
  const apiUrl = `/articles?${stringifiedParams}`;
  const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage, tagName]); // не забудь установить зависимость от currentPage! иначе не будет отправляться повторный запрос; не забудь установить зависимость от tagName! иначе не будет учитываться изменение тега

  return (
    <div className="home-page">
      <Banner />
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler tagname={tagName} />
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
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagFeed;
