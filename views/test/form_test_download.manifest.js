'use strict';


module.exports = {
  'containers':{
    '/r-admin/content/testform':{
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
              props:{},
              children:[
                {
                  component: 'Title',
                  children: 'Form Test',
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
                { 
                  component: 'ResponsiveForm',
                  // thisprops: {
                  //   formdata:[ 'dynamic', ],
                  // },
                  props: {
                    blockPageUI:true,
                    cardForm: {},
                    onSubmit: 'func:this.props.fileSaver',
                    onChange: 'func:this.props.setDynamicData',
                    dynamicField: 'chartdata',
                    formdata: {
                      latest_contact: {
                        address_state: 'new york',
                        address_postal_code:10007,
                      },
                    },
                    flattenFormData: true,
                    style: {
                      marginBottom:'20px',
                    },
                    'validations': [
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
                    ],
                    formgroups: [
                      {
                        gridProps: {},
                        formElements: [
                          
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
                            type: 'submit',
                            value: 'Download',
                            confirmModal:true,
                          },
                        ],
                      },
                      {
                        formElements: [
                          {
                            type: 'slider',
                            name: 'loansize',
                            label: 'loan size',
                            handle:true,
                            passProps: {
                              min: 3000,
                              max: 35000,
                              step: 1000,
                            },
                            wrapperProps: {
                              style: {
                                border: 'none',
                                background: 'none',
                              },
                            },
                            leftLabel: '$3,000',
                            numeralFormat:'$0,0',
                          },
                        ],
                      },
                      {
                        formElements: [
                          {
                            type: 'number',
                            name: 'numberInput',
                            label:'number Input',
                          },
                          {
                            type: 'phone',
                            name: 'phoneInput',
                            label:'phone Input',
                          },
                        ],
                      },
                      {
                        formElements: [
                          {
                            type: 'radio',
                            name: 'check',
                            value: 'ach',
                            label:'ACH Deposit',
                            placeholder:'ACH Deposit',
                          },
                          {
                            checked: true,
                            type: 'radio',
                            name: 'check',
                            value:'paper',
                            label:'Paper Check',
                            placeholder:'Paper Check',
                          },
                        ],
                      },
                      {
                        formElements: [
                          {
                            type: 'checkbox',
                            name: 'BofA',
                            value: 'Bofa',
                            label:'Bank of America',
                            placeholder:'Bank of America Account',
                          },
                          {
                            checked: true,
                            type: 'checkbox',
                            name: 'Chase',
                            value:'chase',
                            label:'JPM Chase',
                            placeholder:'JPM Chase Account',
                          },
                          {
                            type:'group',
                            label: ' ',
                            groupElements:[
                              {
                                type: 'text',
                                name: 'latest_contact.address_state',
                                'layoutProps':{
                                  'innerFormItem':true,
                                },
                              },
                              {
                                type: 'text',
                                name: 'latest_contact.address_postal_code',
                                'layoutProps':{
                                  'innerFormItem':true,
                                  style:{
                                    width:'100%',
                                  },
                                },
                                'passProps':{
                                  'isExpanded':true,
                                  style:{
                                    width:'100%',
                                  },
                                },
                              },
                            ],
                          },
                        ],
                      },
                      {
                        formElements: [
                          {
                            type: 'layout',
                            value:{
                              component: 'RawStateOutput',
                              // component: 'RawStateOutput',
                              props: {
                                select: 'dynamic',
                                style: {
                                  padding:'10px',
                                  margin: '10px',
                                  border:'1px solid black',
                                },
                              },
                              thisprops: {
                                formdata:['formdata',],
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
      'onFinish':'render',
      'pageData':{
        'title':'Home',
        'navLabel':'Home',
      },
    },
  },
};

