import React, {Fragment, useContext} from 'react';
import {Link, NavLink} from 'react-router-dom';

import {CurrentUserContext} from 'contexts/currentUser';
import useLocalStorage from 'hooks/useLocalStorage';

const TopBar = () => {
  const [{isLoggedIn, currentUser}, setCurrentUserState] =
    useContext(CurrentUserContext); // получили то, что передали в CurrentUserContext.Provider
  const [, setToken] = useLocalStorage('token'); //token

  const logOut = () => {
    setCurrentUserState((state) => ({
      ...state,
      isLoggedIn: false,
      currentUser: null,
    }));
    setToken('');
  };

  // console.log('TopBar currentUserState', currentUser);
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Medium
        </Link>
        <ul className="navbar navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" exact>
              Home
            </NavLink>
          </li>
          {!isLoggedIn && (
            <Fragment>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link" exact>
                  Sign In
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link" exact>
                  Sign up
                </NavLink>
              </li>
            </Fragment>
          )}
          {isLoggedIn && (
            <Fragment>
              <li className="nav-item">
                <NavLink to="/articles/new" className="nav-link">
                  <i className="ion-compose" />
                  &nbsp; New Post
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={`/profiles/${currentUser.username}`}
                  className="nav-link"
                >
                  {!!currentUser.image && (
                    <img
                      className="user-pic"
                      src={currentUser.image}
                      alt={'user-pic'}
                    />
                  )}
                  &nbsp;
                  {currentUser.username}
                </NavLink>
              </li>
              <li className="nav-item" onClick={logOut}>
                <div className="nav-link">Log Out</div>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default TopBar;