import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import Routes from 'routes';
import TopBar from 'components/topBar';
import {CurrentUserProvider} from 'contexts/currentUser';
import CurrentUserChecker from 'components/currentUserChecker';
import 'index.css';

const App = () => {
  return (
    <BrowserRouter>
      <CurrentUserProvider>
        <CurrentUserChecker>
          <TopBar />
          <Routes />
        </CurrentUserChecker>
      </CurrentUserProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
