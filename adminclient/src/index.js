import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import 'babel-polyfill';
import './util/local-storage-polyfill';
import App from './components/App/index';
import 'font-awesome/css/font-awesome.css';
import 'animate.css/animate.css';
import 'react-responsive-carousel/lib/styles/carousel.css';
import 'rc-slider/assets/index.css';
import './index.css';
import insertCss from 'insert-css';
import css from 're-bulma/build/css';
try {
  if (typeof document !== 'undefined' || document !== null) insertCss(css, { prepend: true });
} catch (e) { }



ReactDOM.render(
  <App />,
  document.getElementById('root')
);
