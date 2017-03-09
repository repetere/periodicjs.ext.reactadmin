'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('../styles');

var _styles2 = _interopRequireDefault(_styles);

var _AppLayoutMap = require('../components/AppLayoutMap');

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _AppSectionLoading = require('../components/AppSectionLoading');

var _AppSectionLoading2 = _interopRequireDefault(_AppSectionLoading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLoginLayout(options) {
  var loginfunction = options.loginfunction;

  var loginLayout = {
    component: 'Hero',
    props: {
      size: 'isFullheight'
    },
    children: [{
      component: 'HeroBody',
      props: {},
      children: [{
        component: 'Container',
        props: {},
        children: [{
          component: 'Columns',
          children: [{
            component: 'Column',
            props: {
              size: 'is3'
            }
          }, {
            component: 'Column',
            props: {},
            children: [{
              component: 'Title',
              props: {
                style: {
                  textAlign: 'center'
                }
              },
              children: 'Please Sign in'
            }, {
              component: 'ResponsiveForm',
              props: {
                cardForm: true,
                cardFormProps: {
                  isFullwidth: true
                },
                onSubmit: loginfunction, // (data) => { console.log('formsubmit', data); },
                footergroups: [{
                  gridProps: {},
                  formElements: [{
                    type: 'submit',
                    value: 'Login',
                    name: 'login',
                    passProps: {
                      style: _styles2.default.isPrimary
                    },
                    layoutProps: {
                      // style:{textAlign:'center'}
                    }
                  }, {
                    type: 'submit',
                    value: 'Forgot Password',
                    name: 'forgot',
                    passProps: {
                      style: _styles2.default.isLink
                    },
                    layoutProps: {
                      // style:{textAlign:'center'}
                    }
                  }, {
                    type: 'submit',
                    value: 'New User',
                    name: 'register',
                    passProps: {
                      style: _styles2.default.isLink
                    },
                    layoutProps: {
                      // style:{textAlign:'center'}
                    }
                  }]
                }],
                formgroups: [{
                  gridProps: {},
                  formElements: [{
                    type: 'text',
                    label: 'Username',
                    name: 'username',
                    layoutProps: {
                      // horizontalform:true,
                    }
                  }]
                }, {
                  gridProps: {},
                  formElements: [{
                    type: 'text',
                    label: 'Password',
                    name: 'password',
                    submitOnEnter: true,
                    passProps: {
                      type: 'password'
                    },
                    layoutProps: {
                      // horizontalform:true,
                    }
                  }]
                }, {
                  gridProps: {},
                  formElements: [{
                    type: 'checkbox',
                    label: '',
                    placeholder: 'Remember Me',
                    name: 'rememberme',
                    passProps: {
                      type: 'rememberme'
                    },
                    layoutProps: {
                      // horizontalform:true,
                    }
                  }]
                }],
                'validations': [{
                  'name': 'username',
                  'constraints': {
                    'username': {
                      presence: {
                        message: 'is required'
                      },
                      'length': {
                        'minimum': 3,
                        'message': 'Your username is required'
                      }
                    }
                  }
                }, {
                  'name': 'password',
                  'constraints': {
                    'password': {
                      presence: {
                        message: 'is required'
                      },
                      'length': {
                        'minimum': 4,
                        'message': 'Your password is too short'
                      }
                    }
                  }
                }, {
                  name: 'rememberme',
                  'constraints': {
                    'rememberme': {
                      presence: {
                        message: 'is required'
                      }
                    }
                  }
                }]
              }
            }]
          }, {
            component: 'Column',
            props: {
              size: 'is3'
            }
          }]
        }]
      }]
    }]
  };
  return loginLayout;
}

var Login = function (_Component) {
  (0, _inherits3.default)(Login, _Component);

  function Login() {
    (0, _classCallCheck3.default)(this, Login);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Login.__proto__ || (0, _getPrototypeOf2.default)(Login)).apply(this, arguments));

    _this.state = { componentIsLoaded: false };
    _this.getRenderedComponent = _AppLayoutMap.getRenderedComponent.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Login, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var queryStrings = _querystring2.default.parse(window.location.search.charAt(0) === '?' ? window.location.search.substr(1, window.location.search.length) : window.location.search);
      var returnUrl = queryStrings.return_url ? queryStrings.return_url : false;
      if (this.props.isLoggedIn() && returnUrl) {
        this.props.reduxRouter.push(returnUrl);
      }
      this.props.fetchLoginComponent().then(function () {
        _this2.setState({ componentIsLoaded: true });
      }, function (e) {
        _this2.setState({ componentIsLoaded: true });
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(nextProps);
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.componentIsLoaded) return _react2.default.createElement(_AppSectionLoading2.default, null);
      var ui = this.props.getState().ui;
      var user = this.props.getState().user;
      //console.log({ user });
      if (user.isLoggedIn) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            'USER IS LOGGED IN'
          ),
          _react2.default.createElement(
            'h2',
            null,
            user.email
          )
        );
      } else {
        // return <SimpleLineChart/>;
        if (typeof ui.containers.login.status === 'undefined' || ui.containers.login.status === 'undefined' || ui.containers.login.status === 'uninitialized') {
          return this.getRenderedComponent(getLoginLayout({
            loginfunction: this.props.loginUser
          }));
        } else return this.getRenderedComponent(ui.containers.login.layout);
      }
    }
  }]);
  return Login;
}(_react.Component);

exports.default = Login;