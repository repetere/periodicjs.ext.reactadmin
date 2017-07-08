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

var _AppLayoutMap = require('../components/AppLayoutMap');

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _AppSectionLoading = require('../components/AppSectionLoading');

var _AppSectionLoading2 = _interopRequireDefault(_AppSectionLoading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLoginLayout() /*options*/{
  // let { loginfunction, } =  options ;
  var hrline = {
    'gridProps': {
      style: {
        padding: '0 5px'
      }
    },
    'formElements': [{
      type: 'line',
      passProps: {
        style: {
          margin: 0,
          border: 'none',
          borderBottom: '1px solid #e4e4e4'
        }
      },
      layoutProps: {
        style: {
          padding: 0,
          margin: 0
        }
      }
    }]
  };
  var loginLayout = {
    'component': 'Hero',
    'props': {
      'size': 'isFullheight'
    },
    'children': [{
      'component': 'HeroBody',
      'props': {},
      'children': [{
        'component': 'Container',
        'props': {},
        'children': [{
          'component': 'Columns',
          'children': [{
            'component': 'Column',
            'props': {
              'size': 'is3'
            }
          }, {
            'component': 'Column',
            'props': {},
            'children': [{
              'component': 'Title',
              'props': {
                'style': {
                  'textAlign': 'center'
                }
              },
              'children': 'Sign in'
            }, {
              'component': 'ResponsiveForm',
              'props': {
                blockPageUI: true,
                'cardForm': true,
                // cardFormTitle:'Sign In',
                'cardFormProps': {
                  'isFullwidth': true
                },
                'onSubmit': 'func:this.props.loginUser',
                'validations': [{
                  'name': 'username',
                  'constraints': {
                    'username': {
                      presence: {
                        message: '^Your username is required.'
                      },
                      'length': {
                        'minimum': 3,
                        'message': '^Your username is required.'
                      }
                    }
                  }
                }, {
                  'name': 'password',
                  'constraints': {
                    'password': {
                      presence: {
                        message: '^Your username is required'
                      },
                      'length': {
                        'minimum': 4,
                        'message': '^Your password is too short'
                      }
                    }
                  }
                }],
                'formgroups': [{
                  'gridProps': {},
                  'formElements': [{
                    'type': 'text',
                    'label': 'Username',
                    'name': 'username',
                    'layoutProps': {
                      'horizontalform': true
                    }
                  }]
                }, {
                  'gridProps': {},
                  'formElements': [{
                    'type': 'text',
                    'label': 'Password',
                    'name': 'password',
                    'submitOnEnter': true,
                    'passProps': {
                      'type': 'password'
                    },
                    'layoutProps': {
                      'horizontalform': true
                    }
                  }]
                }, {
                  'gridProps': {
                    style: {
                      justifyContent: 'center'
                    }
                  },
                  'formElements': [{
                    type: 'group',
                    label: ' ',
                    'layoutProps': {
                      'horizontalform': true,
                      innerFormItem: true
                    },
                    groupElements: [{
                      'type': 'checkbox',
                      // "label": "a",
                      'placeholder': 'Remember Me',
                      'name': 'rememberme',
                      'passProps': {
                        'type': 'rememberme'
                      },
                      'layoutProps': {
                        'horizontalform': true
                      }
                    }, {
                      'type': 'layout',
                      value: {
                        component: 'ResponsiveLink',
                        props: {
                          location: '/auth/forgot'
                        },
                        children: 'Forgot Password'
                      }
                    }]
                  }]
                }, hrline, {
                  'gridProps': {
                    style: {
                      justifyContent: 'center'
                    }
                  },
                  'formElements': [{
                    'type': 'submit',
                    'value': 'Login',
                    // "placeholder": "Remember Me",
                    'name': 'login',
                    'passProps': {
                      'color': 'isPrimary'
                    },
                    'layoutProps': {
                      formItemStyle: {
                        justifyContent: 'center'
                      },
                      'horizontalform': true
                    }
                  }, {
                    'type': 'layout',
                    value: {
                      component: 'FormHorizontal',
                      props: {
                        style: {
                          justifyContent: 'center'
                        }
                      },
                      children: [{
                        component: 'ResponsiveButton',
                        props: {
                          onClick: 'func:this.props.reduxRouter.push',
                          onclickProps: '/auth/user/new',
                          style: {},
                          buttonProps: {
                            // color: 'isPrimary',
                          }
                        },
                        children: 'New User'
                      }]

                    },
                    'layoutProps': {
                      style: {
                        justifyContent: 'center'
                      }
                    }
                  }]
                }]
              }
            }]
          }, {
            'component': 'Column',
            'props': {
              'size': 'is3'
            }
          }]
        }]
      }]
    }]
  };
  return loginLayout;
}
// import styles from '../styles';

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
      } else if (this.props.isLoggedIn() && this.props.getState().settings.auth.logged_in_homepage) {
        this.props.reduxRouter.push(this.props.getState().settings.auth.logged_in_homepage);
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
      var state = this.props.getState();
      // console.debug('componentWillReceiveProps', { nextProps, state, });
      if (state.user.isLoggedIn && state.user.isLoggedIn()) {
        this.props.reduxRouter.push(state.settings.auth.logged_in_homepage);
      } else {
        this.setState(nextProps);
      }
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