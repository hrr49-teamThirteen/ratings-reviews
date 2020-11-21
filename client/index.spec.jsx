import Jest from 'jest';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './index.jsx';
import 'regenerator-runtime/runtime';

it('renders the app without crashing', () => {
  const app = new App();
  ReactDOM.render(app);
});