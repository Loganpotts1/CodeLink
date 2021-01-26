import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from "react-router-dom";
//  LOCAL
import App from './App';
import store from "./store";
import "normalize.css";


ReactDOM.render(
  // <React.StrictMode>
  <HashRouter basename="/dashboard" >
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  // </React.StrictMode>,
  document.getElementById('root')
);
