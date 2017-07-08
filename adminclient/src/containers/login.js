import React, { Component, } from 'react';
// import styles from '../styles';
import { getRenderedComponent, } from '../components/AppLayoutMap';
import qs from 'querystring';
import AppSectionLoading from '../components/AppSectionLoading';

function getLoginLayout(/*options*/) {
  // let { loginfunction, } =  options ;
  const hrline = {
    'gridProps': {
      style: {
        padding: '0 5px',
      },
    },
    'formElements': [
      {
        type: 'line',
        passProps: {
          style: {
            margin: 0,
            border: 'none',
            borderBottom: '1px solid #e4e4e4',
          },
        },
        layoutProps: {
          style: {
            padding: 0,
            margin: 0,
          },
        },
      },
    ],
  };
  const loginLayout = {
    'component': 'Hero',
    'props': {
      'size': 'isFullheight',
    },
    'children': [
      {
        'component': 'HeroBody',
        'props': {},
        'children': [
          {
            'component': 'Container',
            'props': {},
            'children': [
              {
                'component': 'Columns',
                'children': [
                  {
                    'component': 'Column',
                    'props': {
                      'size': 'is3',
                    },
                  },
                  {
                    'component': 'Column',
                    'props': {},
                    'children': [
                      {
                        'component': 'Title',
                        'props': {
                          'style': {
                            'textAlign': 'center',
                          },
                        },
                        'children': 'Sign in',
                      },
                      {
                        'component': 'ResponsiveForm',
                        'props': {
                          blockPageUI:true,
                          'cardForm': true,
                  // cardFormTitle:'Sign In',
                          'cardFormProps': {
                            'isFullwidth': true,
                          },
                          'onSubmit': 'func:this.props.loginUser',
                          'validations': [
                            {
                              'name': 'username',
                              'constraints': {
                                'username': {
                                  presence: {
                                    message: '^Your username is required.',
                                  },
                                  'length': {
                                    'minimum': 3,
                                    'message': '^Your username is required.',
                                  },
                                },
                              },
                            },
                            {
                              'name': 'password',
                              'constraints': {
                                'password': {
                                  presence: {
                                    message: '^Your username is required',
                                  },
                                  'length': {
                                    'minimum': 4,
                                    'message': '^Your password is too short',
                                  },
                                },
                              },
                            },
                          ],
                          'formgroups': [ {
                            'gridProps': {},
                            'formElements': [ {
                              'type': 'text',
                              'label': 'Username',
                              'name': 'username',
                              'layoutProps': {
                                'horizontalform': true,
                              },
                            }, ],
                          },
                          {
                            'gridProps': {},
                            'formElements': [ {
                              'type': 'text',
                              'label': 'Password',
                              'name': 'password',
                              'submitOnEnter': true,
                              'passProps': {
                                'type': 'password',
                              },
                              'layoutProps': {
                                'horizontalform': true,
                              },
                            }, ],
                          },
                          {
                            'gridProps': {
                              style: {
                                justifyContent: 'center',
                              },
                            },
                            'formElements': [
                              {
                                type: 'group',
                                label: ' ',
                                'layoutProps': {
                                  'horizontalform': true,
                                  innerFormItem: true,
                                },
                                groupElements: [
                                  {
                                    'type': 'checkbox',
                            // "label": "a",
                                    'placeholder': 'Remember Me',
                                    'name': 'rememberme',
                                    'passProps': {
                                      'type': 'rememberme',
                                    },
                                    'layoutProps': {
                                      'horizontalform': true,
                                    },
                                  },
                                  {
                                    'type': 'layout',
                                    value: {
                                      component: 'ResponsiveLink',
                                      props: {
                                        location: '/auth/forgot',
                                      },
                                      children: 'Forgot Password',
                                    },
                                  },
                                    
                                ],
                              },
                                
                            ],
                          },
                            hrline,
                          {
                            'gridProps': {
                              style: {
                                justifyContent: 'center',
                              },
                            },
                            'formElements': [
                              {
                                'type': 'submit',
                                'value': 'Login',
                        // "placeholder": "Remember Me",
                                'name': 'login',
                                'passProps': {
                                  'color': 'isPrimary',
                                },
                                'layoutProps': {
                                  formItemStyle: {
                                    justifyContent: 'center',
                                  },
                                  'horizontalform': true,
                                },
                              },
                              {
                                'type': 'layout',
                                value: {
                                  component: 'FormHorizontal',
                                  props: {
                                    style: {
                                      justifyContent: 'center',
                                    },
                                  },
                                  children: [
                                    {
                                      component: 'ResponsiveButton',
                                      props: {
                                        onClick: 'func:this.props.reduxRouter.push',
                                        onclickProps: '/auth/user/new',
                                        style: {
                                        },
                                        buttonProps: {
                                  // color: 'isPrimary',
                                        },
                                      },
                                      children: 'New User',
                                    },
                                  ],
                                    
                                },
                                'layoutProps': {
                                  style: {
                                    justifyContent: 'center',
                                  },
                          // "horizontalform": true
                                },
                              },
                            ],
                          },
                          ],
                        },
                      },
                    ],
                  },
                  {
                    'component': 'Column',
                    'props': {
                      'size': 'is3',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  return loginLayout;  
}



class Login extends Component {
  constructor() {
    super(...arguments);
    this.state = { componentIsLoaded: false, };
    this.getRenderedComponent = getRenderedComponent.bind(this);
  }
  componentDidMount() {
    let queryStrings = qs.parse((window.location.search.charAt(0) === '?') ? window.location.search.substr(1, window.location.search.length) : window.location.search);
    let returnUrl = (queryStrings.return_url) ? queryStrings.return_url : false;
    if (this.props.isLoggedIn() && returnUrl) {
      this.props.reduxRouter.push(returnUrl);
    } else if (this.props.isLoggedIn() && this.props.getState().settings.auth.logged_in_homepage) {
      this.props.reduxRouter.push(this.props.getState().settings.auth.logged_in_homepage);
    }
    this.props.fetchLoginComponent()
      .then(() => {
        this.setState({ componentIsLoaded: true, });
      }, e => {
        this.setState({ componentIsLoaded: true, });
      });
  }
  componentWillReceiveProps(nextProps) {
    let state = this.props.getState();
    // console.debug('componentWillReceiveProps', { nextProps, state, });
    if (state.user.isLoggedIn && state.user.isLoggedIn()) {
      this.props.reduxRouter.push(state.settings.auth.logged_in_homepage);
    } else {
      this.setState(nextProps);
    }
  }
  render() {
    if (!this.state.componentIsLoaded) return (<AppSectionLoading />);
    let ui = this.props.getState().ui;
    let user = this.props.getState().user;
    //console.log({ user });
    if (user.isLoggedIn) {
      return <div><h1>USER IS LOGGED IN</h1><h2>{user.email}</h2></div>;
    } else {
      // return <SimpleLineChart/>;
      if (typeof ui.containers.login.status === 'undefined' || ui.containers.login.status === 'undefined' || ui.containers.login.status === 'uninitialized') {
        return this.getRenderedComponent( getLoginLayout({
          loginfunction:this.props.loginUser,
        }));
      } else return this.getRenderedComponent(ui.containers.login.layout);
    }
  }
}

export default Login;
