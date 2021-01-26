import axios from 'axios';
import store from '../store';
import { LOGOUT } from '../actions/types';


const api = axios.create({
  baseURL: 'https://devconnector-3.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 intercept any error responses from the api
 and check if the token is no longer valid.
**/
const { response } = api.interceptors;

response.use(
  res => res,
  err => {
    if (err.response.status === 401) {
      store.dispatch({ type: LOGOUT });
    } else if (err.response.status === 404) {
      return window.location = "/";
    }
    return Promise.reject(err);
  }
);

export default api;