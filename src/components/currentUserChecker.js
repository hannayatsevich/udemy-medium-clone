import {useEffect, useContext} from 'react';
import useFetch from 'hooks/useFetch';

import {CurrentUserContext} from 'contexts/currentUser';
import useLocalStorage from 'hooks/useLocalStorage';

const CurrentUserChecker = ({children}) => {
  const [{response, isLoading, error}, doFetch] = useFetch('/user');
  const [, setCurrentUserState] = useContext(CurrentUserContext); //currentUserState // получили то, что передали в CurrentUserContext.Provider
  const [token] = useLocalStorage('token'); //token

  useEffect(() => {
    if (!token) {
      setCurrentUserState((state) => ({
        ...state,
        isLoggedIn: false,
      }));
      return;
    }

    doFetch();
    setCurrentUserState((state) => ({
      ...state,
      isLoading: true,
    }));
  }, [token, setCurrentUserState, doFetch]); // только при инициализации

  useEffect(() => {
    if (!response) return;

    setCurrentUserState((state) => ({
      ...state,
      isLoading: isLoading,
      isLoggedIn: true,
      currentUser: response.user,
    }));
  }, [response, isLoading, setCurrentUserState]);

  useEffect(() => {
    if (!error) return;

    setCurrentUserState((state) => ({
      ...state,
      isLoggedIn: false,
      isLoading: isLoading,
      currentUser: null,
    }));
  }, [error, isLoading, setCurrentUserState]);

  return children;
};
export default CurrentUserChecker;
