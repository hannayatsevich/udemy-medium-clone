import {useState, useEffect, useCallback} from 'react';
import {useLocation} from 'react-router-dom';
import useLocalStorage from 'hooks/useLocalStorage';
const axios = require('axios');

const useFetch = (url) => {
  // const baseUrl = 'https://conduit.productionready.io/api';
  const baseUrl = 'http://localhost:3000/api';

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const location = useLocation();
  const [token] = useLocalStorage('token'); //token

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    const requestOptions = {
      ...options,
      headers: {
        authorization: token ? `Token ${token}` : '',
      },
    };

    if (!isLoading) return;

    axios(baseUrl + url, requestOptions)
      .then((response) => {
        setResponse(response.data);
        setError(null);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.response ? error.response.data : error.message);
        setResponse(null);
        setIsLoading(false);
      });
  }, [isLoading, url, options, token]);

  useEffect(() => {
    setError(null);
  }, [location]);

  return [{response, isLoading, error}, doFetch];
};

export default useFetch;
