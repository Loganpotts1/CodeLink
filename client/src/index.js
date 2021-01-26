import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//  LOCAL
import App from './App';
import store from "./store";
import "normalize.css";


ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
