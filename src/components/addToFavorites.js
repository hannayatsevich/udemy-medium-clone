import React, {useState, useContext} from 'react';
import {Redirect} from 'react-router-dom';
import classNames from 'classnames';

import useFetch from 'hooks/useFetch';
import {CurrentUserContext} from 'contexts/currentUser';

const AddToFavorites = ({isFavorited, favoritesCount, articleSlug}) => {
  const [currentUserState] = useContext(CurrentUserContext); // dispatch // получили то, что передали в CurrentUserContext.Provider
  const [isRedirectToLoginPage, setIsRedirectToLoginPage] = useState(false);

  const apiUrl = `/articles/${articleSlug}/favorite`;
  const [{response}, doFetch] = useFetch(apiUrl);
  // optimistic updates
  const favoritesCountWithResponse = response
    ? response.article.favoritesCount
    : favoritesCount;
  const isFavoritedWithResponse = response
    ? response.article.favorited
    : isFavorited;

  const handleLike = () => {
    if (!currentUserState.isLoggedIn) {
      setIsRedirectToLoginPage(true);
      return;
    }
    doFetch({
      method: isFavoritedWithResponse ? 'delete' : 'post',
    });
  };

  const classes = classNames({
    btn: true,
    'btn-sm': true,
    'btn-primary': isFavoritedWithResponse,
    'btn-outline-primary': !isFavoritedWithResponse,
  });

  if (isRedirectToLoginPage) return <Redirect to="/login" />;

  return (
    <button type="button" className={classes} onClick={handleLike}>
      <i className="ion-heart" />
      <span>&nbsp;{favoritesCountWithResponse}</span>
    </button>
  );
};
export default AddToFavorites;
