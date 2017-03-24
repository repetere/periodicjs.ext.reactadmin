import React, { createElement, } from 'react';
import * as rebulma from 're-bulma';
import * as recharts from 'recharts';
import { Link, } from 'react-router';
import Slider, { Range, } from 'rc-slider';
import { Carousel, } from 'react-responsive-carousel';
import GoogleMap from 'google-map-react';
import ResponsiveForm from '../ResponsiveForm';
import DynamicForm from '../DynamicForm';
import DynamicLayout from '../DynamicLayout';
import RawOutput from '../RawOutput';
import RawStateOutput from '../RawOutput/RawStateOutput';
import MenuAppLink from '../AppSidebar/MenuAppLink';
import SubMenuLinks from '../AppSidebar/SubMenuLinks';
import CodeMirror from '../RACodeMirror';
import ResponsiveDatalist from '../ResponsiveDatalist';
// import Editor from '../RAEditor';
import ResponsiveTable from '../ResponsiveTable';
import ResponsiveCard from '../ResponsiveCard';
import DynamicChart from '../DynamicChart';
import ResponsiveTabs from '../ResponsiveTabs';
import ResponsiveBar from '../ResponsiveBar';
import ResponsiveLink from '../ResponsiveLink';
import ResponsiveButton from '../ResponsiveButton';
import FormItem from '../FormItem';
import utilities from '../../util';

let renderIndex = 0;

export let AppLayoutMap = Object.assign({}, {
  recharts, ResponsiveForm, DynamicLayout, DynamicForm, RawOutput, RawStateOutput, FormItem, MenuAppLink, SubMenuLinks, ResponsiveTable, ResponsiveCard, DynamicChart, ResponsiveBar, ResponsiveTabs, ResponsiveDatalist, CodeMirror, Range, Slider, GoogleMap, Carousel, /* Editor,*/
}, React.DOM, rebulma, { Link, });

// console.log({ AppLayoutMap });
// console.log({ ReactDOM: React.DOM['div'] });


export function getRenderedComponent(componentObject, resources, debug) {
  AppLayoutMap.ResponsiveLink = ResponsiveLink.bind(this);
  AppLayoutMap.ResponsiveButton = ResponsiveButton.bind(this);
  // console.log('this.props', this);
  renderIndex++;
  // if(resources) console.info({ resources });
  if (!componentObject) {
    return null;
  }
  try {
    let asyncprops = (componentObject.asyncprops && typeof componentObject.asyncprops === 'object') ? utilities.traverse(componentObject.asyncprops, resources) : {};
    let windowprops = (componentObject.windowprops && typeof componentObject.windowprops === 'object') ? utilities.traverse(componentObject.windowprops, window) : {};
    let thisprops = (componentObject.thisprops && typeof componentObject.thisprops === 'object') ? utilities.traverse(componentObject.thisprops, Object.assign({
      __reactadmin_manifest: {
        _component: componentObject,
        _resources: resources,
      },
    }, this.props, componentObject.props, this.props.getState())) : {};
    let thisDotProps = (!React.DOM[ componentObject.component ] && !rebulma[ componentObject.component ]) ? this.props : null;
    let renderedCompProps = Object.assign({
      key: renderIndex,
    }, thisDotProps,
      thisprops,
      componentObject.props, asyncprops, windowprops);
    let comparisons = {};
    // if (thisprops) {
    //   console.debug({ thisprops, renderedCompProps });
    // }
    if (componentObject.comparisonprops) {
      comparisons = componentObject.comparisonprops.map(comp => {
        let compares = {};
        if (Array.isArray(comp.left)) {
          compares.left = comp.left;
        }
        if (Array.isArray(comp.right)) {
          compares.right = comp.right;
        }
        let propcompares = utilities.traverse(compares, renderedCompProps);
        let opscompares = Object.assign({}, comp, propcompares);
        // console.debug({ opscompares });
        if (opscompares.operation === 'eq') {
          return opscompares.left == opscompares.right;
        } else if (opscompares.operation === 'dneq') {
          return opscompares.left != opscompares.right;
        } else if (opscompares.operation === 'dnseq') {
          return opscompares.left !== opscompares.right;
        } else if (opscompares.operation === 'seq') {
          return opscompares.left === opscompares.right;
        } else if (opscompares.operation === 'lt') {
          return opscompares.left < opscompares.right;
        } else if (opscompares.operation === 'lte') {
          return opscompares.left <= opscompares.right;
        } else if (opscompares.operation === 'gt') {
          return opscompares.left > opscompares.right;
        } else if (opscompares.operation === 'gte') {
          return opscompares.left >= opscompares.right;
        } else if (opscompares.operation === 'dne') {
          return opscompares.left === undefined || opscompares.left === null;
        } else { //'exists'
          return opscompares.left !== undefined || opscompares.left !== null;
        }
      });
      // console.debug({ comparisons });
      // console.debug(comparisons.filter(comp => comp === true).length);
    }
    if (componentObject.comparisonprops && comparisons.filter(comp => comp === true).length!==comparisons.length) { 
      return null;
    } else if (typeof componentObject.conditionalprops !== 'undefined'
      && !Object.keys(utilities.traverse(componentObject.conditionalprops, renderedCompProps)).filter(key => utilities.traverse(componentObject.conditionalprops, renderedCompProps)[ key ]).length) {
      return null;
    } else {
      return createElement(
        //element component
        (typeof componentObject.component === 'string')
          ? (React.DOM[ componentObject.component ])
            ? componentObject.component
            : (recharts[ componentObject.component.replace('recharts.', '') ])
              ? recharts[ componentObject.component.replace('recharts.', '') ]
              : AppLayoutMap[ componentObject.component ]
          : componentObject.component,
        //element props
        renderedCompProps,
        //props children
        (componentObject.children && Array.isArray(componentObject.children) && typeof componentObject.children !== 'string')
          ? componentObject.children.map(childComponentObject => getRenderedComponent.call(this,
            (componentObject.bindprops)
              ? Object.assign({},
                childComponentObject, {
                  props: Object.assign({},
                    renderedCompProps,
                    {
                      style: {},
                    },
                    childComponentObject.props,
                    { key: renderIndex + Math.random(), }),
                })
              : childComponentObject, resources))
          : (typeof componentObject.children === 'undefined')
            ? (renderedCompProps && renderedCompProps.children && typeof renderedCompProps.children==='string') ? renderedCompProps.children : null
            : componentObject.children
      );
    }
   
  } catch (e) {
    console.error(e, (e.stack)?e.stack:'no stack');
    console.error({ componentObject, resources, }, this);
    return createElement('div', {}, e.toString());
  }
}
