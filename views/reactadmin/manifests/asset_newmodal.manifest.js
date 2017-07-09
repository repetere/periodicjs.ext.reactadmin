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
                stringifyBody:true,
                // blockPageUI:true,
                'onSubmit':{
                  // "url":"http://localhost:8786/r-admin/contentdata/periodic/assets?handleupload=true",

                  'url':`${reactadmin.settings.basename}${reactadmin.manifest_prefix}contentdata/standard/assets?handleupload=true&format=json&forcequerytobody=true`,
                  // 'url':`${reactadmin.settings.basename}${reactadmin.manifestPrefix}contentdata/standard/assets/new?format=json&handleupload=true`,
                  'options':{
                    'method':'post',
                  },
                  success: {
                    notification: {
                      text: 'Uploaded files',
                      timeout: 4000,
                      type:'success',
                    },
                  },
                  successCallback: 'func:this.props.hideModal',
                  successProps:'last',
                  responseCallback:'func:this.props.refresh',
                },
                'formgroups': [
                  {
                    'gridProps': {},
                    'formElements': [ {
                      'type': 'file',
                      // 'label': 'Password',
                      'name': 'newasset',
                      // 'submitOnEnter': true,
                      'passProps': {
                        'type': 'file',
                        'multiple': true,
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
                        'placeholder': 'Maintain original filename',
                        'name': 'existing-file-name',
                        'passProps': {
                          // 'type': 'rememberme',
                        },
                        'layoutProps': {
                          'horizontalform': true,
                        },
                      },
                      {
                        'type': 'checkbox',
                        // "label": "a",
                        'placeholder': 'Exclude filename timestamp',
                        'name': 'exclude-timestamp',
                        'passProps': {
                          // 'type': 'rememberme',
                        },
                        'layoutProps': {
                          'horizontalform': true,
                        },
                      },
                    ],
                  },
                  {
                    'gridProps': {
                    },
                    'formElements': [
                      {
                        'type': 'checkbox',
                        'placeholder': 'Exclude filename user id',
                        'name': 'exclude-userstamp',
                        'passProps': {
                        },
                        'layoutProps': {
                          'horizontalform': true,
                        },
                      },
                      {
                        'type': 'checkbox',
                        'placeholder': 'Use client-side end to end encryption',
                        'name': 'encryptfiles',
                        'passProps': {
                        },
                        'layoutProps': {
                          'horizontalform': true,
                        },
                      },
                    ],
                  },
                  {
                    'gridProps': {
                    },
                    'formElements': [
                      {
                        'type': 'text',
                        'label': 'Timestamp format',
                        'placeholder': 'YYYY-MM-DD_HH-m-ss',
                        'name': 'ts-format',
                        value:'YYYY-MM-DD_HH-m-ss',
                        'layoutProps': {
                          // 'horizontalform': true,
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
                        'value': 'Upload Files',
                        // "placeholder": "Remember Me",
                        'name': 'upload_files_button',
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
                                onClick: 'func:this.props.hideModal',
                                onclickProps: 'last',
                                style: {
                                },
                                buttonProps: {
                                  // color: 'isPrimary',
                                },
                              },
                              children: 'Cancel',
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