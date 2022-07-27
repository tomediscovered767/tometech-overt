import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const STRICT_MODE = false;

root.render(
  STRICT_MODE ?
  <React.StrictMode>
    <App/>
  </React.StrictMode>
  : <App/>
);
