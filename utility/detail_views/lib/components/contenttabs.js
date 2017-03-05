'use strict';
const pluralize = require('pluralize');
const capitalize = require('capitalize');
const helpers = require('../helpers');

module.exports = function (schemas, label, options) {
  let usablePrefix = (options.prefix)
    ? `/${options.prefix}`
    : '';
  let tabs = Object.keys(options.allSchemas).map(key => {
    return {
      label:pluralize(capitalize(key)),
      location:pluralize(key),
    };
  });

  function getTabComponent(tab, tabname) {
    return {
      component: 'Tab',
      props: {
        isActive: (tab.location == pluralize(tabname)),
        style: {
        },
      },
      children: [{
        // component: 'ResponsiveLink',
        component: 'ResponsiveButton',
        props: {
          onClick: 'func:this.props.reduxRouter.push',
          onclickProps: `${usablePrefix}/${tab.location}`,
          style: {
            border:'none',
          },
        },
        children: tab.label,        
      }, ],
    };
  }

  return {
    component: 'div',
    props: {
    },
    children: [ {
      component: 'Container',
      children: [{
        component: 'Tabs',
        children: [
          {
            component: 'TabGroup',
            children: tabs.map(tab => {
              return getTabComponent(tab, label);
            }),
            props: {
            },
          },
        ],
      }, ]
    }, ]
  };
};