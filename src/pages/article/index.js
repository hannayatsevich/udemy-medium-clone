import React, {useState, useEffect, useContext} from 'react';
import useFetch from 'hooks/useFetch';
import {Link, Redirect} from 'react-router-dom';
import Loading from 'components/loading';
import ErrorMessage from 'components/errorMessage';
import TagList from 'components/tagList';
import {CurrentUserContext} from 'contexts/currentUser';

const Article = (props) => {
  const slug = props.match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [
    {
      response: fetchArticleResponse,
      isLoading: fetchArticleIsLoading,
      error: fetchArticleError,
    },
    doFetchArticle,
  ] = useFetch(apiUrl);
  const [{response: deleteArticleResponse}, doFetchDeleteArticle] =
    useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContext); //currentUserState // получили то, что передали в CurrentUserContext.Provider
  const [isSuccessfulDelete, setIsSuccessfulDelete] = useState(false);

  const isAuthor = () => {
    if (!fetchArticleResponse || !currentUserState.isLoggedIn) return false;

    return (
      fetchArticleResponse.article.author.username ===
      currentUserState.currentUser.username
    );
  };

  const deleteArticle = () => {
    doFetchDeleteArticle({
      method: 'delete',
    });
  };

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!deleteArticleResponse) return;

    let isMounted = true;

    if (isMounted) {
      setIsSuccessfulDelete(true);
    }

    return () => (isMounted = false); // иначе пытается изменить state в компоненте, которого уже нет
  }, [deleteArticleResponse]);

  if (isSuccessfulDelete) return <Redirect to="/" />;

  return (
    <div className="article-page">
      <div className="banner">
        {!fetchArticleIsLoading && !!fetchArticleResponse && (
          <div className="container">
            <h1>{fetchArticleResponse.article.title}</h1>
            <div className="article-meta">
              <Link
                to={`/profiles/${fetchArticleResponse.article.author.username}`}
              >
                {fetchArticleResponse.article.author.image && (
                  <img
                    src={fetchArticleResponse.article.author.image}
                    alt="authorimage"
                  />
                )}
              </Link>
              <div className="info">
                <Link
                  to={`/profiles/${fetchArticleResponse.article.author.username}`}
                >
                  {fetchArticleResponse.article.author.username}
                </Link>
                <span className="date">
                  {fetchArticleResponse.article.createdAt}
                </span>
              </div>
              {isAuthor() && (
                <span>
                  <Link
                    to={`/articles/${fetchArticleResponse.article.slug}/edit`}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    <i className="ion-edit mr-1" />
                    Edit Article
                  </Link>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={deleteArticle}
                  >
                    <i className="ion-trash-a" />
                    Delete Article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {fetchArticleIsLoading && <Loading />}
        {!!fetchArticleError && <ErrorMessage />}
        {!fetchArticleIsLoading && !!fetchArticleResponse && (
          <div className="row article-content">
            <div className="col-xs-12">
              <p>{fetchArticleResponse.article.body}</p>
              <TagList tags={fetchArticleResponse.article.tagList} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
