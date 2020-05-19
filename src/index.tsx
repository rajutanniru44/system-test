import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ErrorBoundary from './components/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(<ErrorBoundary><App /></ErrorBoundary>, document.getElementById('root'));