import React, { Component } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import OctouriApp from './OctouriApp';
import * as reducers from '../reducers';
import thunk from 'redux-thunk';
import Snackbar from '../components/Snackbar';

const reducer = combineReducers(reducers);
const store = createStore(reducer,
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <OctouriApp />
          <Snackbar />
        </Provider>
      </div>
    );
  }
}
