import React, {useState, useContext, useEffect} from 'react';
import {Redirect} from 'react-router-dom';

import {CurrentUserContext} from 'contexts/currentUser';
import useLocalStorage from 'hooks/useLocalStorage';
import useFetch from 'hooks/useFetch';
import BackendErrorMessages from 'components/backendErrorMessages';

const Settings = () => {
  const [image, setImage] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUserState, dispatch] = useContext(CurrentUserContext); // получили то, что передали в CurrentUserContext.Provider
  const apiUrl = `/user`;
  const [{response, error}, doFetch] = useFetch(apiUrl);
  const [, setToken] = useLocalStorage('token'); //token

  //обновить currentUserState
  const handleSubmit = (e) => {
    e.preventDefault();
    doFetch({
      method: 'put',
      data: {
        user: {
          //нужно передать все поля + обновленные
          ...currentUserState.currentUser,
          image,
          username,
          bio,
          email,
          password,
        },
      },
    });
  };

  const logOut = () => {
    setToken('');
    dispatch({type: 'LOG_OUT'});
  };

  useEffect(() => {
    if (!currentUserState.currentUser) return;

    setImage(currentUserState.currentUser.image);
    setUsername(currentUserState.currentUser.username);
    setBio(currentUserState.currentUser.bio);
    setEmail(currentUserState.currentUser.email);
  }, [currentUserState.currentUser]);

  useEffect(() => {
    if (!response) return;

    dispatch({type: 'SET_AUTHORIZED', payload: response.user});
  }, [response, dispatch]);

  if (currentUserState.isLoggedIn === false) return <Redirect to="/" />;

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1>Your Settings</h1>
            {!!error && <BackendErrorMessages backendErrors={error.errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="URL of profile picture"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="User name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg "
                    rows={8}
                    placeholder="Short bio about you"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </fieldset>
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
                    required={true}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                >
                  Update Settings
                </button>
              </fieldset>
              <hr />
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={logOut}
              >
                Or click here to logout
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
