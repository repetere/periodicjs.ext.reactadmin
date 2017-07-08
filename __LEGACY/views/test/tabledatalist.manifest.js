'use strict';

module.exports = {
  'containers': {
    '/r-admin/content/tabledatalist': {
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
              "component": "ResponsiveTable",
              "props": {
                "useInputRows": true,
                "headers": [
                  { "label": "#", "value": "--idx-ctr--" },
                  {
                    "label": "Fruit",
                    "sortid": "fruit",
                    "sortable": true,
                    "formtype": 'datalist',
                    "datalistProps": {
                      //if not an email || title etc. need displayField
                      displayField: 'food',
                      staticSearch: true,
                      field: 'fruit',
                      value: [],
                      multi: true,
                    },
                  },
                  {
                    "label": "Email",
                    "sortid": "email",
                    "sortable": true,
                    "formtype": 'datalist',
                    "datalistProps": {
                      staticSearch: true,
                      field: 'email',
                      value: [],
                    },
                  },
                ],
                __tableOptions: {
                  fruit: [
                    [{
                        fruit: 'apple',
                        food: 'pizza',
                      },
                      {
                        fruit: 'orange',
                        food: 'kale',
                      },
                    ],
                    [
                      {
                        fruit: 'grapes',
                        food: 'beer',
                      },
                      {
                        fruit: 'cherry',
                        food: 'tuna',
                      },
                    ]
                  ],
                  email: [
                    [
                      { email: 'iris@abcd.io' },
                      { email: 'pajama@bcd.io' }
                    ],
                    [
                      { email: 'dan@abcd.com' },
                      { email: 'maroon@efd.com' }
                    ],
                  ],
                },
                "rows": [{
                }, {
                }, ]
              }
            }, {
              "component": "ResponsiveTable",
              "props": {
                "useInputRows": true,
                "headers": [
                  { "label": "#", "value": "--idx-ctr--" },
                  {
                    "label": "Email",
                    "sortid": "users",
                    "sortable": true,
                    "formtype": 'datalist',
                    "datalistProps": {
                      staticSearch: true,
                      field: 'email',
                      displayField: 'email',
                      value: [],
                      multi: true,
                    },
                  },
                ],
                "rows": [{
                }, {
                }, ]
              },
              asyncprops: {
                __tableOptions: ['listdata', ],
              }
            },],
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