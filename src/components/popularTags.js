import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

import useFetch from 'hooks/useFetch';
import Loading from './loading';
import ErrorMessage from './errorMessage';

const PopularTags = () => {
  const [{response, isLoading, errors}, doFetch] = useFetch('/tags');
  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (isLoading || !response) return <Loading />;
  if (errors) return <ErrorMessage />;

  return (
    <div className="sidebar">
      <p>PopularTags</p>
      <div className="tag-list">
        {response.tags.map((tag, idx) => (
          <Link key={idx} to={`/tags/${tag}`} className="tag-default tag-pill">
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default PopularTags;
