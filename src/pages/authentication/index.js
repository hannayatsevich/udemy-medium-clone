import React, {useEffect, useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

import useFetch from 'hooks/useFetch';
import useLocalStorage from 'hooks/useLocalStorage';
import {CurrentUserContext} from 'contexts/currentUser';

const Authentication = (props) => {
  const isLogIn = props.match.path === '/login';
  const pageTitle = isLogIn ? 'Sign In' : 'Sign Up';
  const descriptionText = isLogIn ? 'Need an account?' : 'Have an account?';
  const descriptionLink = isLogIn ? '/register' : '/login';

  const [currentUserState, setCurrentUserState] =
    useContext(CurrentUserContext); // получили то, что передали в CurrentUserContext.Provider
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false);
  const [token, setToken] = useLocalStorage('token');

  const apiUrl = isLogIn ? '/users/login' : '/users';
  const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = isLogIn
      ? {email, password}
      : {
          username,
          email,
          password,
        };
    doFetch({
      method: 'post',
      data: {
        user,
      },
    });
  };

  useEffect(() => {
    if (!response) return;

    setToken(response.user.token);
    setIsSuccessfulSubmit(true);
    setCurrentUserState((state) => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response.user,
    }));
  }, [response, setToken]);

  if (isSuccessfulSubmit) return <Redirect to="/" />;

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{pageTitle}</h1>
            <p className="text-xs-center">
              <Link to={descriptionLink}>{descriptionText}</Link>
            </p>
            <form onSubmit={handleSubmit}>
              <fieldset>
                {!isLogIn && (
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </fieldset>
                )}
                <fieldset className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={isLoading}
                >
                  {pageTitle}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
