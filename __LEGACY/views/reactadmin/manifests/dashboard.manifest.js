'use strict';
const dbstatsLayout = require('../../../utility/detail_views/layouts/dbstats.manifest.layout.js');

module.exports = (periodic) => {
  let reactadmin = periodic.app.controller.extension.reactadmin;
  return {
    containers: {
      [`${reactadmin.manifest_prefix}dashboard`]: {
        layout: {
          component: 'div',
          props: {
            style: {
              marginTop:'4.5rem',
            },
          },
          children: [
            // breadcrumbs(['CRM', 'Customers']),
            // developertabs('data'),
            {
              component: 'Container',
              // children:'ok',
              children: 
                dbstatsLayout({}),
              
            },
          ],
        },
        'resources': {
          contentstats: `${reactadmin.manifest_prefix}contentdata/standard/dbstats?format=json`,
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