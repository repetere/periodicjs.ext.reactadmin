'use strict';


module.exports = {
  'containers':{
    '/r-admin/content/textmask':{
      'layout':{
        component: 'Hero',
        props: {
          style: {
            padding:'5rem 0',
          },
        },
        children: [ {
          component: 'HeroBody',
          props:{},
          children: [      
            {
              component: 'Container',
              props:{},
              children:[
                {
                  component: 'Title',
                  children: 'TextMask Test',
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
                  children:'TEST TEXT MASK',
                },
                {
                  component: 'MaskedInput',
                  hasWindowFunc: true,
                  props: {
                    mask: 'func:window.testMaskInput',
                  },
                }, {
                  component: 'MaskedInput',
                  hasWindowFunc: true,
                  props: {
                    mask: 'func:window.testMaskInput',
                  },
                },
                 { 
                  component: 'ResponsiveForm',
                  props: {
                    cardForm: {},
                    dynamicField:'testform',
                    onSubmit: 'func:this.props.setDynamicData',
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
                              'minimum': 3,
                              'message': 'has to be atleast 3 chars',
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
                          errorIconLeft: true,
                          createNumberMask: true,
                          passProps: {
                            mask: 'func:window.testMaskDollarInput',
                          }
                        }, 
                          {
                            type: 'select',
                            name: 'testSelect',
                            customOnChange: 'func:window.selectOnChange',
                            label: 'Select Test',
                            disableOnChange: true,
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
                    ],
                  },
                }, 
              ],
            },
          ],
        },
        ],
      },
      'onFinish':'render',
      'pageData':{
        'title':'Home',
        'navLabel':'Home',
      },
    },
  },
};





