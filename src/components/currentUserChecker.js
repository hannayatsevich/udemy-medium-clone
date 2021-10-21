import {useEffect, useContext} from 'react';
import useFetch from 'hooks/useFetch';

import {CurrentUserContext} from 'contexts/currentUser';
import useLocalStorage from 'hooks/useLocalStorage';

const CurrentUserChecker = ({children}) => {
  const [{response, isLoading, error}, doFetch] = useFetch('/user');
  const [, dispatch] = useContext(CurrentUserContext); //currentUserState // получили то, что передали в CurrentUserContext.Provider
  const [token] = useLocalStorage('token'); //token

  useEffect(() => {
    if (!token) {
      dispatch({type: 'SET_UNAUTHORIZED'});
      return;
    }

    doFetch();
    dispatch({type: 'LOADING'});
  }, [token, doFetch, dispatch]); // только при инициализации

  useEffect(() => {
    if (!response) return;
    dispatch({type: 'SET_AUTHORIZED', payload: response.user});
  }, [response, isLoading, dispatch]);

  useEffect(() => {
    if (!error) return;
    dispatch({type: 'SET_ERROR'});
  }, [error, isLoading, dispatch]);

  return children;
};
export default CurrentUserChecker;
