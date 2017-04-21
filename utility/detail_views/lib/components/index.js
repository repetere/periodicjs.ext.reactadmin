'use strict';

const DICTIONARY = require('../dictionary');
const capitalize = require('capitalize');
const pluralize = require('pluralize');
const contenttabs = require('./contenttabs');
const indextable = require('./indextable');
const buildDetail = require('./buildDetail');
const buildAdvancedDetail = require('./buildAdvancedDetail');
const helpers = require('../helpers');
pluralize.addIrregularRule('data', 'datas');

/**
 * This constructs a mongo schema detail page
 *
 * @param {*} schema 
 * @param {*} label 
 * @param {*} options 
 */
const constructDetail = function (schema, label, options = {}, newEntity) {
  let usablePrefix = helpers.getDataPrefix(options.prefix, options.dbname, schema, label, options);
  let customPageData = helpers.getExtensionOverride('customDetailPageData', schema, label, options);
  let customTabs = helpers.getExtensionOverride('customDetailTabs', schema, label, options);
  let customHeader = helpers.getExtensionOverride('customDetailHeader', schema, label, options);
  let customDetailEditor = helpers.getExtensionOverride('customDetailEditor', schema, label, options);
  let detailPageBasicEditor =
    {
      name: 'Basic Editor',
      layout: {
        component: 'div',
        children: buildDetail(schema, label, options, newEntity),
      },
    };
  let detailPageAdvancedEditor = {
    name: 'Advanced Editor',
    layout: {
      component: 'div',
      children: buildAdvancedDetail(schema, label, options, newEntity),
    },
  };
  let detailPageTabs = [];
  if (customDetailEditor) {
    if (customDetailEditor.base) {
      detailPageTabs.push(detailPageBasicEditor);
    }
    if (customDetailEditor.advanced) {
      detailPageTabs.push(detailPageAdvancedEditor);
    }
    if (customDetailEditor.customTabs) {
      detailPageTabs.push(...customDetailEditor.customTabs);
    }
    if (customDetailEditor.customTab) {
      detailPageTabs.push(customDetailEditor.customTabs);
    }
  } else {
    detailPageTabs.push(detailPageBasicEditor, detailPageAdvancedEditor);
  }

  return {
    resources: (newEntity)
      ? {}
      : {
        [ helpers.getDetailLabel(label) ]: `${usablePrefix}/${pluralize(label)}/:id?format=json`,
      },
    onFinish:'render',
    pageData: (customPageData)
      ? customPageData
      : {
        title:`Content › ${pluralize(capitalize(label))}`,
        navLabel:`Content › ${pluralize(capitalize(label))}`,
      },
    layout: {
      component:'div',
      props:{
        style:{
          marginTop:80,
          marginBottom:80,
          paddingBottom:80,
        },
      },
      children: [
        customHeader,
        (customTabs)?customTabs:contenttabs(schema, label, options),
        {
          component: 'Container',
          props: {
          },
          children: [
            {
              component: 'ResponsiveTabs',
              asyncprops: {
                formdata: [helpers.getDetailLabel(label), label, ],
              },
              props: {
                tabsType: 'navBar',
                tabsProps: {
                  style: {
                    border: 'none',
                    fontSize: 14,
                  },
                },
                tabgroupProps: {
                  style: {
                    border: 'none',
                    fontSize: 14,
                  },
                  className:'__ra_no_border',
                },
                tabs: detailPageTabs,
              },
              // children:'',
            },
          ],
          // .concat(buildDetail(schema, label, options)),
        },
      ],
    },
  };
};

/**
 * constructs index page
 *
 * @param {*} schema 
 * @param {*} label 
 * @param {*} options 
 */
const constructIndex = function (schema, label, options = {}) {
  // console.log('constructIndex', { schema, label, options })
  let usablePrefix = helpers.getDataPrefix(options.prefix, options.dbname, schema, label, options);
  let manifestPrefix = helpers.getManifestPathPrefix(options.prefix);
  let customPageData = helpers.getExtensionOverride('customIndexPageData', schema, label, options);
  let customTabs = helpers.getExtensionOverride('customIndexTabs', schema, label, options);
  let customHeader = helpers.getExtensionOverride('customIndexHeader', schema, label, options);
  let customIndexButton = helpers.getSettingOverride('customIndexButton', schema, label, options);
  
  // console.log({ label, usablePrefix });
  return {
    resources: {
      [ helpers.getIndexLabel(label) ]: `${usablePrefix}/${pluralize(label)}?format=json`,
    },
    onFinish:'render',
    pageData: (customPageData)
      ? customPageData
      : {
        title:`Content › ${pluralize(capitalize(label))}`,
        navLabel:`Content › ${pluralize(capitalize(label))}`,
      },
    layout: {
      component: 'div',
      props: {
        style:{
          marginTop:80,
          marginBottom:80,
          paddingBottom:80,
        },
      },
      children: [
        customHeader,
        (customTabs)?customTabs:contenttabs(schema, label, options),
        {
          component: 'Container',
          props: {
          },
          children: [
            {
              component: 'div',
              props: {
                style: {
                  display: 'flex',
                  flex: 1,
                },
              },
              children: [
                {
                  component: 'Title',
                  props: {
                    style: {
                      marginTop: 30,
                      display: 'flex',
                      flex:1,
                    },
                  },
                  children: capitalize(label),
                },
                {
                  component: 'ResponsiveButton',
                  children: `Create ${capitalize(label)}`,  
                  props: {
                    onClick: (customIndexButton && customIndexButton.onClick)
                      ? customIndexButton.onClick
                      : 'func:this.props.reduxRouter.push',
                    onclickProps: (customIndexButton && customIndexButton.onclickProps)
                      ? customIndexButton.onclickProps
                      : `${manifestPrefix}/${pluralize(label)}/new`,
                    buttonProps: {
                      size: 'isMedium',
                      color:'isPrimary',
                    },
                    style: {
                      alignSelf: 'center',
                      textAlign: 'right',
                      // padding: 0,
                    },
                  },
                },
              ],
            },
          ]
          .concat(indextable(schema, label, options)),
        },
      ],
    },
  };
};

module.exports = {
  constructDetail,
  constructIndex,
};