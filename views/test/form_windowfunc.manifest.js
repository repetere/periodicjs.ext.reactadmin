'use strict';


module.exports = {
  'containers':{
    '/r-admin/content/testform_window':{
      'layout':{
        component: 'Hero',
        props: {
          style: {
            padding:'5rem 0',
          },
        },
        // props: { size: 'isFullheight', },
        children: [ {
          component: 'HeroBody',
          props:{},
          children: [
            {
              component: 'Container',
              children: [
                {
                  component: 'Columns',
                  children: [
                    {
                      component: 'Column',
                      children: [
                        {
                          component: 'CodeMirror',
                          props: {
                            editorType:'editor',
                            codeMirrorProps: {
                              value: '<p>this is the start</p>',
                            },
                            codeMirrorPropsOptions: {
                              // mode:'javascript',
                            },
                          },
                        },
                      ],
                    },
                    // {
                    //   component: 'TestComponent',
                    //   hasWindowComponent: true,
                    //   props: {
                    //     content: 'func:window.__ra_custom_elements.Hello',
                    //     windowCompProps: {
                    //       toWhat: 'Your Name'
                    //     },
                    //   },
                    // },
                    {
                      component: 'Column',
                      children: [
                        {
                          component: 'PreviewEditor',
                          props: {
                            value: '<p>this is the start</p>',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              component: 'Container',
              props:{},
              children:[
                {
                  component: 'Title',
                  children: 'Form Test```',
                  thisprops: {
                    reqUser:[ 'user', ],
                  },
                  windowprops: {
                    screensize:['innerWidth', ],
                  },
                  comparisonprops: [
                    {
                      left:[ 'reqUser', 'email', ],
                      operation: 'exists',
                      right:true,
                    },
                    {
                      left:[ 'reqUser', 'email', ],
                      operation: 'eq',
                      right:[ 'reqUser', 'email', ],
                    },
                    {
                      left:[ 'screensize', ],
                      operation: 'lte',
                      right:1080,
                    },
                  ],
                },
                {
                  component: 'Title',
                  children:'TEST FORM',
                },
                {
                  component: 'MaskedInput',
                  hasWindowFunc: true,
                  props: {
                    mask: 'func:window.testMaskInput',
                  },
                },
                { 
                  component: 'ResponsiveForm',
                  // thisprops: {
                  //   formdata:[ 'dynamic', ],
                  // },
                  props: {
                    cardForm: {},
                    dynamicField:'testform',
                    onSubmit: 'func:this.props.setDynamicData',
                    // onChange: 'func:this.props.setDynamicData',
                    // onChange: 'func:window.testWindowFuncOnChange',
                    flattenFormData: true,
                    style: {
                      marginBottom:'20px',
                    },
                    'validations': [
                    {
                        'name': 'maskeddollar',
                        'constraints': {
                          'maskeddollar': {
                            'presence': 'true',
                            'length': {
                              'minimum': 7,
                              'message': 'has to be atleast 7 chars',
                            },
                          },
                        },
                      },
                      {
                        'name': 'testData',
                        'constraints': {
                          'testData': {
                            'presence': 'true',
                            'length': {
                              'minimum': 3,
                              'message': 'has to be atleast 3 chars',
                            },
                          },
                        },
                      },
                      {
                        'name': 'testSelect',
                        'constraints': {
                          'testSelect': {
                            'presence': 'true',
                          },
                        },
                      },
                      {
                        'name': 'BofA',
                        'constraints': {
                          'BofA': {
                            'presence': 'true',
                            'numericality': {
                              'greaterThan': 0,
                              'message': '^Must be checked',
                            },
                          },
                        },
                      },
                      {
                        'name': 'testTextArea',
                        'constraints': {
                          'testTextArea': {
                            'presence': 'true',
                            'length': {
                              'minimum': 10,
                              'message': 'has to be atleast 10 chars',
                            },
                          },
                        },
                      },
                      {
                        'name': 'fruit',
                        'constraints': {
                          'fruit': {
                            'presence': 'true',
                            'length': {
                              minimum: 1,
                            },
                          },
                        },
                      },
                    ],
                    formgroups: [
                      {
                        gridProps: {},
                        formElements: [{
                          type: 'maskedinput',
                          name: 'masked',
                          label: 'Test Mask Input',
                          passProps: {
                            mask: 'func:window.testMaskInput',
                          }
                        }, {
                          type: 'maskedinput',
                          name: 'maskeddollar',
                          keyUp: true,
                          validateOnKeyup: true,
                          label: 'Test Mask Dollar Input',
                          createNumberMask: true,
                          passProps: {
                            mask: 'func:window.testMaskDollarInput',
                          }
                        }, {
                          type: 'text',
                          name: 'ssn',
                          label: 'Test SSN Formatter!',
                          keyUp: 'func:window.formatSSN',
                          disableOnChange: true,
                        },
                          {
                            type: 'text',
                            name: 'testData',
                            label: 'test dynamic data',
                            value: 'sa',
                            keyUp: true,
                            validateOnKeyup: true,
                            errorIconRight:true,
                          },
                          {
                            type: 'select',
                            name: 'testSelect',
                            customOnChange: 'func:window.selectOnChange',
                            label: 'Select Test',
                            options: [
                              {
                                label: 'option1',
                                value: 'option1',
                              },
                              {
                                value: 'option2',
                                label: 'option2',
                              },
                              {
                                value: 'option3',
                                label: 'option3',
                                disabled: true,
                              },
                              {
                                value: 'option4',
                                label: 'option4',
                                disabled: true,
                              },
                              {
                                value: 'option5',
                                label: 'option5',
                              },

                            ],
                            validateOnChange: true,
                            errorIconRight:true,
                          },
                          {
                            type: 'editor',
                            name: 'testTextArea',
                            label: 'testTextArea',
                            value: '<div>this is the start in form</div>',
                            validateOnChange: true,
                          },
                          {
                            type: 'checkbox',
                            name: 'BofA',
                            label:'Bank of America',
                            placeholder:'Bank of America Account',
                            validateOnChange: true,
                          },
                        ],
                      },
                      {
                        formElements: [
                          {
                            type: 'radio',
                            name: 'fruit',
                            label:'apple',
                            value: 'apple val',
                            placeholder:'Apple',
                            validateOnChange: true,
                          },
                          {
                            type: 'radio',
                            name: 'fruit',
                            label:'orange',
                            value: 'orange val',
                            placeholder:'Orange',
                            validateOnChange: true,
                          },
                        ],
                      },
                      {
                        formElements: [
                          {
                            type: 'submit',
                            value: 'update',
                            confirmModal:true,
                          },
                        ],
                      },
                      {
                        formElements:[
                          {
                            type:'layout',
                            value: {
                              component: 'RawStateOutput',
                              props: {
                                select: 'dynamic',
                                style: {
                                  padding:'10px',
                                  margin: '10px',
                                  border:'1px solid black',
                                },
                              },
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
        ],
      },
      // 'resources':{
      //   // 'tabledata':'/r-admin/contentdata/users?format=json&limit=10',
      // },
      dynamic: {
        dummydata: [1, 2, 3, 4, 5,],
      },
      'onFinish':'render',
      'pageData':{
        'title':'Home',
        'navLabel':'Home',
      },
    },
  },
};

