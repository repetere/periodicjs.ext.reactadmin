'use strict';

module.exports = {
  'containers': {
    '/r-admin/modals/testparams/:id': {
      layout: {
        component: 'Hero',
        children: [{
          component: 'HeroBody',
          children: [{
            component: 'p',
            children: 'Below is a ResponsiveForm'
          }, {
            "component": "ResponsiveForm",
            "asyncprops": {
              "formdata": ["tabledata"]
            },
            "props": {
              style: {
                marginTop: '20px',
              },
              "useFormOptions": true,
              "flattenFormData": true,
              "formgroups": [{
                "formElements": [{
                  "type": "datatable",
                  "flattenRowData": false,
                  "addNewRows": false,
                  "rowButtons": false,
                  "name": "users"
                }]
              }, ]
            }
          }, ]
        }, ]
      },
      'resources': {
        "tabledata": "/r-admin/contentdata/standard/users?format=json&limit=10"
      },
      'pageData': {
        'title': 'TEST MODAL',
        'navLabel': 'Risk Management',
      },
      'onFinish': 'render',
    },
  },
};