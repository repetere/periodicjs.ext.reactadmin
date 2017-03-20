'use strict';
const pluralize = require('pluralize');
const capitalize = require('capitalize');
const helpers = require('../helpers');

module.exports = function (schemas, label, options) {
  let manifestPrefix = helpers.getManifestPathPrefix(options.prefix);
  let ignoreTabs = (options && options.extsettings && options.extsettings.extension_overrides && options.extsettings.extension_overrides.ignoreContentTabs)
    ? options.extsettings.extension_overrides.ignoreContentTabs
    : [];
  let allSchems = Object.keys(options.allSchemas);
  let filteredContentTabs = allSchems.filter(schema => ignoreTabs.indexOf(schema) === -1);
  // console.log({ ignoreTabs,allSchems,filteredContentTabs });
  let tabs = filteredContentTabs.map(key => {
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
          onclickProps: `${manifestPrefix}/${tab.location}`,
          style: {
            border: 'none',
            fontSize: 14,
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
        props: {
          style: {
            border: 'none',
            fontSize: 14,
          },
        },
        children: [
          {
            component: 'TabGroup',
            children: tabs.map(tab => {
              return getTabComponent(tab, label);
            }),
          },
        ],
      }, ],
    }, ],
  };
};