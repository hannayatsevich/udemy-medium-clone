import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';

import {CurrentUserContext} from 'contexts/currentUser';

const FeedToggler = ({tagname}) => {
  const [currentUserState] = useContext(CurrentUserContext);
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {currentUserState.isLoggedIn && (
          <li className="nav-item">
            <NavLink to={'/feed'} className="nav-link">
              Your feed
            </NavLink>
          </li>
        )}
        <li className="nav-item">
          <NavLink to={'/'} exact className="nav-link">
            Global feed
          </NavLink>
        </li>
        {!!tagname && (
          <li className="nav-item">
            <NavLink to={`/tags/${tagname}`} className="nav-link">
              <i className="ion-pound"></i>
              {tagname}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};
export default FeedToggler;
