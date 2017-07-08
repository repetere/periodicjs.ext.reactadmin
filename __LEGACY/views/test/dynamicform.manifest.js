'use strict';

module.exports = {
  'containers': {
    '/r-admin/content/testdynamicform': {
      'layout': {
        component: 'Hero',
        props: {
          style: {
            padding: '5rem 0',
          },
        },
        // props: { size: 'isFullheight', },
        children: [{
          component: 'HeroBody',
          props: {},
          children: [{
            component: 'Container',
            props: {},
            children: [{
              component: 'Title',
              children: 'Dynamic Response Form Test',
              thisprops: {
                reqUser: ['user', ],
              },
              windowprops: {
                screensize: ['innerWidth', ],
              },
              comparisonprops: [{
                left: ['reqUser', 'email', ],
                operation: 'exists',
                right: true,
              },
              {
                left: ['reqUser', 'email', ],
                operation: 'eq',
                right: ['reqUser', 'email', ],
              },
              {
                left: ['screensize', ],
                operation: 'lte',
                right: 1080,
              },
              ],
            },
            {
              component: 'ResponsiveForm',
              thisprops: {
                dynamics: ['dynamic', ],
              },
              props: {
                updateFormOnResponse: true,
                onSubmit: {
                  url: '/test_reactadmin/charts',
                  options: {
                    method: 'POST',
                  },
                  success: true,
                  responseCallback: 'func:this.props.setDynamicData',
                },
                dynamicResponseField: 'responseData',
                onChange: 'func:this.props.setDynamicData',
                flattenFormData: true,
                style: {
                  marginBottom: '20px',
                },
                formgroups: [{
                  gridProps: {},
                  formElements: [{
                    type: 'text',
                    name: 'pageData.test',
                  },
                  {
                    type: 'submit',
                    value: 'update',
                  },{
                      gridProps: {},
                      formElements: [{
                        type: 'text',
                        name: 'test',
                        },
                        {
                          type: 'submit',
                          value: 'clicked1',
                        },
                        {
                          type: 'submit',
                          value: 'clicked2',
                        },
                      ],
                    },
                  ],
                },
                ],
              },
              thisprops: {
                formdata: ['dynamic', 'responseData',],
              },
            },
            ],
          }, ],
        }, ],
      },
      dynamic: {
        responseData: {
          pageData: {
            test: 'working',
          }
        },
      },
      'resources': {
        // 'chartdata': '/r-admin/contentdata/charts',
      },
      'onFinish': 'render',
      'pageData': {
        'title': 'Home',
        'navLabel': 'Home',
      },
    },
  },
};