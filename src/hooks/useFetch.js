import {useState, useEffect, useCallback} from 'react';
import {useLocation} from 'react-router-dom';
import useLocalStorage from 'hooks/useLocalStorage';
const axios = require('axios');

// для локальной сборки бэка
const tags = ['test', 'dragons', 'baby', 'coffee', 'flowers', 'japan'];
const addTags = (data) => {
  if (data.articles) {
    let newDataArticles = {...data, articles: [...data.articles]};
    newDataArticles.articles.forEach((article, idx) => {
      if (idx % 2) article.tagList.push(tags[0]);
      if (idx % 3) article.tagList.push(tags[1]);
      if (idx % 4) article.tagList.push(tags[2]);
      if (idx % 5) article.tagList.push(tags[3]);
      if (idx % 6) article.tagList.push(tags[4]);
      if (idx % 7) article.tagList.push(tags[5]);
    });
    return newDataArticles;
  } else if (data.tags) {
    let newDataTags = {...data, tags: [...tags]};
    return newDataTags;
  } else {
    return data;
  }
};

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
        setResponse(addTags(response.data));
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
