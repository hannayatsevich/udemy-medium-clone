import React, {useState, useEffect, useContext} from 'react';
import {Redirect} from 'react-router-dom';

import ArticleForm from 'components/ArticleForm';
import useFetch from 'hooks/useFetch';
import {CurrentUserContext} from 'contexts/currentUser';

const CreateArticle = () => {
  const [currentUserState] = useContext(CurrentUserContext);
  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);
  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };
  const apiUrl = '/articles';
  const [{response, error}, doFetch] = useFetch(apiUrl);
  const handleSubmit = (article) => {
    doFetch({
      method: 'post',
      data: {
        article,
      },
    });
  };

  useEffect(() => {
    if (!response) return;
    setIsSuccessfulSubmit(true);
  }, [response]);

  if (!currentUserState.isLoggedIn) return <Redirect to="/" />;

  if (isSuccessfulSubmit)
    return <Redirect to={`/articles/${response.article.slug}`} />;

  return (
    <div>
      <ArticleForm
        onSubmit={handleSubmit}
        errors={(error && error.errors) || {}}
        initialValues={initialValues}
      />
    </div>
  );
};

export default CreateArticle;
