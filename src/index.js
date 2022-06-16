import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from "redux";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';

import {rootReducer} from "./redux/reducers/rootReducer";
import {BrowserRouter} from "react-router-dom";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    </Provider>
  </BrowserRouter>,

  document.getElementById('root')
);


