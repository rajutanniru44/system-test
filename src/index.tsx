import React from 'react';
import ReactDOM from 'react-dom';
// import App from './components/App';
import App from './maincomponents/App';
import ErrorBoundary from './components/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import combineReducers from './reducers/index';

const store = createStore(combineReducers)


ReactDOM.render(<ErrorBoundary><Provider store={store}><App /></Provider></ErrorBoundary>, document.getElementById('root'));