import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import decode from 'jwt-decode';
import { BrowserRouter } from 'react-router-dom';

import store from './store';
import Routes from './routes';

import '../assets/js/jquery-3.2.1';
import '../assets/js/materialize';

import '../assets/css/font-awesome.css';
import '../assets/css/materialize.css';
import '../assets/css/style.scss';


import actionTypes from './actions/actionTypes';
import sampleRecipes from './utils/sampleRecipes';
import setAuthorizationToken from './utils/setAuthorizationToken';

if (localStorage.token) {
  const tokenExpiration = decode(localStorage.token).exp * 1000;
  const currentTime = Date.now();
  if (!(currentTime > tokenExpiration)) {
    setAuthorizationToken(localStorage.token);
    const user = decode(localStorage.token).user;
    store.dispatch({ type: actionTypes.SET_CURRENT_USER, payload: user });
  }
} else {
  store
    .dispatch(
      {
        type: actionTypes.FETCH_SAMPLE_RECIPES,
        payload: sampleRecipes
      }
    );
  store.dispatch({
    type: actionTypes.LOGOUT_USER,
    payload: {}
  });
}


render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Routes />
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
