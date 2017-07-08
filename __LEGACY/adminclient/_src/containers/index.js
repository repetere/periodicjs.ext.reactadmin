'use strict';

var _login = require('./login');

var _login2 = _interopRequireDefault(_login);

var _Error = require('./Error404');

var _Error2 = _interopRequireDefault(_Error);

var _DynamicPage = require('./DynamicPage');

var _DynamicPage2 = _interopRequireDefault(_DynamicPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import BlogIndex from './blogindex';
// import BlogItem from './blogitem';
// import DocumentationPage from './documentation';
exports.PageComponents = {
  // HomePage,
  LoginPage: _login2.default,
  // BlogPage,
  // BlogIndex,
  // BlogItem,
  // DocumentationPage,
  Error404: _Error2.default,
  DynamicPage: _DynamicPage2.default
}; // import HomePage from './home';
// import BlogPage from './blog';