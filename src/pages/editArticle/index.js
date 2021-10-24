import React, {useState, useEffect, useContext} from 'react';
import {Redirect} from 'react-router-dom';

import ArticleForm from 'components/articleForm';
import useFetch from 'hooks/useFetch';
import {CurrentUserContext} from 'contexts/currentUser';

const EditArticle = ({match}) => {
  const slug = match.params.slug;
  const [initialValues, setInitialValues] = useState(null);
  const [currentUserState] = useContext(CurrentUserContext);
  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);
  const apiUrl = `/articles/${slug}`;
  const [{response: fetchArticleResponse}, doFetchArticle] = useFetch(apiUrl);
  const [
    {response: updateArticleResponse, error: updateArticleError},
    doFetchArticleUpdate,
  ] = useFetch(apiUrl);

  const handleSubmit = (article) => {
    doFetchArticleUpdate({
      method: 'put',
      data: {
        article,
      },
    });
  };

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) return;

    setInitialValues({
      title: fetchArticleResponse.article.title,
      description: fetchArticleResponse.article.description,
      body: fetchArticleResponse.article.body,
      tagList: fetchArticleResponse.article.tagList,
    });
  }, [setInitialValues, fetchArticleResponse]);

  useEffect(() => {
    if (!updateArticleResponse) return;

    setIsSuccessfulSubmit(true);
  }, [updateArticleResponse, setIsSuccessfulSubmit]);

  if (currentUserState.isLoggedIn === false) return <Redirect to="/" />; // не !currentUserState.isLoggedIn, т к когда null, мы еще не проверили!

  if (isSuccessfulSubmit)
    return <Redirect to={`/articles/${updateArticleResponse.article.slug}`} />;

  return (
    <div>
      <ArticleForm
        onSubmit={handleSubmit}
        errors={(updateArticleError && updateArticleError.errors) || {}}
        initialValues={initialValues}
      />
    </div>
  );
};

export default EditArticle;
