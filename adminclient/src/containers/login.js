import React, { Component, } from 'react';
import styles from '../styles';
import { getRenderedComponent, } from '../components/AppLayoutMap';
import qs from 'querystring';
import AppSectionLoading from '../components/AppSectionLoading';

function getLoginLayout(options) {
  let { loginfunction, } =  options ;
  let loginLayout = {
    component: 'Hero',
    props: {
      size: 'isFullheight',
    },
    children: [ {
      component: 'HeroBody',
      props: {
      },
      children: [ {
        component: 'Container',
        props: {
        },
        children: [
          {
            component: 'Columns',
            children: [ {
              component: 'Column',
              props: {
                size:'is3',
              },
            }, {
              component: 'Column',
              props: {},
              children:[
                {
                  component: 'Title',
                  props: {
                    style: {
                      textAlign:'center',
                    },
                  },
                  children: 'Please Sign in',
                },
                {
                  component: 'ResponsiveForm',
                  props: {
                    cardForm: true,
                    cardFormProps: {
                      isFullwidth:true,
                    },
                    onSubmit: loginfunction, // (data) => { console.log('formsubmit', data); },
                    footergroups: [{
                      gridProps: {},
                      formElements: [ {
                        type: 'submit',
                        value: 'Login',
                        name:'login',
                        passProps: {
                          style:styles.isPrimary,
                        },
                        layoutProps: {
                          // style:{textAlign:'center'}
                        },
                      }, {
                        type: 'submit',
                        value: 'Forgot Password',
                        name:'forgot',
                        passProps: {
                          style:styles.isLink,
                        },
                        layoutProps: {
                          // style:{textAlign:'center'}
                        },
                      }, {
                        type: 'submit',
                        value: 'New User',
                        name:'register',
                        passProps: {
                          style:styles.isLink,
                        },
                        layoutProps: {
                          // style:{textAlign:'center'}
                        },
                      }, ],
                    }, ],
                    formgroups: [ {
                      gridProps: {},
                      formElements: [ {
                        type: 'text',
                        label: 'Username',
                        name:'username',
                        layoutProps: {
                          // horizontalform:true,
                        },
                      }, ],
                    },
                    {
                      gridProps: {},
                      formElements: [{
                        type: 'text',
                        label: 'Password',
                        name: 'password',
                        submitOnEnter: true,
                        passProps: {
                          type:'password',
                        },
                        layoutProps: {
                            // horizontalform:true,
                        },
                      }, ],
                    },
                    {
                      gridProps: {},
                      formElements: [{
                        type: 'checkbox',
                        label: '',
                        placeholder: 'Remember Me',
                        name: 'rememberme',
                        passProps: {
                          type:'rememberme',
                        },
                        layoutProps: {
                            // horizontalform:true,
                        },
                      }, ],
                    },
                    ],
                    'validations': [
                      {
                        'name': 'username',
                        'constraints': {
                          'username': {
                            presence: {
                              message: 'is required',
                            },
                            'length': {
                              'minimum': 3,
                              'message': 'Your username is required',
                            },
                          },
                        },
                      },
                      {
                        'name': 'password',
                        'constraints': {
                          'password': {
                            presence: {
                              message: 'is required',
                            },
                            'length': {
                              'minimum': 4,
                              'message': 'Your password is too short',
                            },
                          },
                        },
                      },
                      // {
                      //   name: 'rememberme',
                      //   'constraints': {
                      //     'rememberme': {
                      //       presence: {
                      //         message: 'is required',
                      //       },
                      //     },
                      //   },
                      // },
                    ],
                  },
                }, ],
            }, {
              component: 'Column',
              props: {
                size:'is3',
              },
            }, ],
          },
        ],
      }, ],
    }, ],
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
    }
    this.props.fetchLoginComponent()
      .then(() => {
        this.setState({ componentIsLoaded: true, });
      }, e => {
        this.setState({ componentIsLoaded: true, });
      });
  }
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
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
