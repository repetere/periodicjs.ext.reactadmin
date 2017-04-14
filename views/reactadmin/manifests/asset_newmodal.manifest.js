'use strict';
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

module.exports = (periodic) => {
  let reactadmin = periodic.app.controller.extension.reactadmin;
  return {
    containers: {
      '/r-admin/standard/content/assets/newmodal': {
        layout: {
          component: 'div',
          children: [
            {
              component: 'Content',
              children: [
                {
                  component: 'p',
                  children:'You can upload multiple files at once.',
                },
              ],
            },
            {
              'component': 'ResponsiveForm',
              'props': {
                // 'cardForm': true,
                // // cardFormTitle:'Sign In',
                // 'cardFormProps': {
                //   'isFullwidth': true,
                // },
                // 'onSubmit': 'func:this.props.loginUser',
                'onSubmit':{
                  'url':`${reactadmin.manifestPrefix}contentdata/standard/assets/new?format=json&handleupload=true`,
                  'options':{
                    'method':'post',
                  },
                  successCallback:'func:this.props.refresh',
                },
                'formgroups': [
                  {
                    'gridProps': {},
                    'formElements': [ {
                      'type': 'text',
                      // 'label': 'Password',
                      'name': 'newasset',
                      // 'submitOnEnter': true,
                      'passProps': {
                        'type': 'file',
                      },
                      'layoutProps': {
                        'horizontalform': true,
                      },
                    }, ],
                  },
                  {
                    'gridProps': {
                      style: {
                        // justifyContent: 'center',
                      },
                    },
                    'formElements': [
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
        'resources': {
          // contentstats: `${reactadmin.manifest_prefix}contentdata/standard/dbstats?format=json`,
        },
        'onFinish': 'render',
        'pageData': {
          'title': 'DBs Dashboard',
          'navLabel': 'Dashboard',
        },
      },
    },
  };
};