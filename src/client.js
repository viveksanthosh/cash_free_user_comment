import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { hydrate } from 'react-dom';

hydrate(
    <App />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
