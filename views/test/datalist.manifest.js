'use strict';

module.exports = {
  'containers': {
    '/r-admin/content/testdatalist': {
      'layout': {
        component: 'Hero',
        props: {
          style: {
            padding: '5rem 0',
          },
        },
        children: [{
          component: 'HeroBody',
          props: {},
          children: [{
            component: 'Container',
            props: {},
            children: [{
              component: 'ResponsiveForm',
              props: {
                blockPageUI: true,
                cardForm: {},
                onSubmit: {
                  url: 'http://localhost:8786/testroute',
                  options: {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  },
                  responseCallback: 'func:this.props.debug',
                },
                onChange: 'func:this.props.setDynamicData',
                dynamicField: 'chartdata',
                // formdata: kbaresponse,
                flattenFormData: true,
                style: {
                  marginBottom: '20px',
                },
                'hiddenFields': [],
                "__formOptions": {
                  "food": [{
                      "value": "pizza"
                    },
                    {
                      "value": "chicken",
                      "label": "CHICKIES",
                      "disabled": true
                    },
                    {
                      "value": "kale"
                    },
                    {
                      "value": "beer"
                    }
                  ]
                },
                formgroups: [{
                    formElements: [{
                      type: 'submit',
                      value: 'Submit Form',
                    }, ],
                  },
                  {
                    formElements: [{
                      type: 'layout',
                      value: {
                        component: 'div',
                        thisprops: {
                          children: ['formdata', 'questions', 'question', '0', 'text', 'statement', ],
                        },
                      },
                    }, ],
                  },
                  // {
                  //   formElements: [
                  //     {
                  //       type: 'radio',
                  //       name: 'selected_question_4',
                  //       value:'5',
                  //       formdata_placeholder: 'questions.question.1.choice.5.text.statement',
                  //     },
                  //   ],
                  // },
                  {
                    formElements: [{
                      type: 'datalist',
                      name: 'testdatalist',
                      placeholder: 'first test',
                      label: 'DATALIST_TEST',
                      datalist: {
                        staticSearch: true,
                        selector: '_id',
                        displayField: 'email',
                        multi: true,
                        field: 'email',
                        entity: 'user',
                        dbname: '',
                      }
                    }]
                  },
                  {
                    formElements: [{
                      type: 'datalist',
                      name: 'food',
                      placeholder: 'second test',
                      label: 'DATALIST_TEST_TWO',
                      datalist: {
                        staticSearch: true,
                        selector: 'value',
                        displayField: 'value',
                        multi: true,
                        field: 'value',
                        entity: '',
                        dbname: '',
                      }
                    }]
                  }

                  /*
                  {
                    formElements:[
                      {
                        type:'layout',
                        value:{
                          component:'div',
                          thisprops:{
                            children:['formdata', 'questions', 'question', '1', 'text', 'statement',],
                          },
                        },
                      },
                    ],
                  },
                  */
                ],
              },
              asyncprops: {
                formdata: ['listdata', ]
              },
            }, ],
          }, ],
        }, ],
      },
      'resources': {
        "listdata": "/r-admin/contentdata/standard/users?format=json&limit=10"
      },
      'onFinish': 'render',
      'pageData': {
        'title': 'Home',
        'navLabel': 'Home',
      },
    },
  },
};