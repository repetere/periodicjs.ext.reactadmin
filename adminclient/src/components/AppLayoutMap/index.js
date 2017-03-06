import React, { createElement, } from 'react';
import * as rebulma from 're-bulma';
import * as recharts from 'recharts';
import { Link, } from 'react-router';
import ResponsiveForm from '../ResponsiveForm';
import RawOutput from '../RawOutput';
import MenuAppLink from '../AppSidebar/MenuAppLink';
import SubMenuLinks from '../AppSidebar/SubMenuLinks';
import CodeMirror from '../RACodeMirror';
// import Editor from '../RAEditor';
import ResponsiveTable from '../ResponsiveTable';
import ResponsiveCard from '../ResponsiveCard';
import ResponsiveTabs from '../ResponsiveTabs';
import ResponsiveBar from '../ResponsiveBar';
import ResponsiveLink from '../ResponsiveLink';
import ResponsiveButton from '../ResponsiveButton';
import FormItem from '../FormItem';
import utilities from '../../util';

let renderIndex = 0;

export let AppLayoutMap = Object.assign({}, {
  recharts, ResponsiveForm, RawOutput, FormItem, MenuAppLink, SubMenuLinks, ResponsiveTable, ResponsiveCard, ResponsiveBar, ResponsiveTabs, CodeMirror, /* Editor,*/
}, React.DOM, rebulma, { Link, });

// console.log({ AppLayoutMap });
// console.log({ ReactDOM: React.DOM['div'] });


export function getRenderedComponent(componentObject, resources, debug) {
  AppLayoutMap.ResponsiveLink = ResponsiveLink.bind(this);
  AppLayoutMap.ResponsiveButton = ResponsiveButton.bind(this);
  // console.log('this.props', this);
  renderIndex++;
  // console.info({ resources });

  try {
    let asyncprops = (componentObject.asyncprops && typeof componentObject.asyncprops === 'object') ? utilities.traverse(componentObject.asyncprops, resources) : {};
    let windowprops = (componentObject.windowprops && typeof componentObject.windowprops === 'object') ? utilities.traverse(componentObject.windowprops, window) : {};
    let thisprops = (componentObject.thisprops && typeof componentObject.thisprops === 'object') ? utilities.traverse(componentObject.thisprops, this.props.getState()) : {};
    let thisDotProps = (!React.DOM[ componentObject.component ] && !rebulma[ componentObject.component ]) ? this.props : null;
    // if (debug) {
    //   console.debug({
    //     asyncprops, thisprops,
    //   });
    // }
    // if(!React.DOM[ componentObject.component ] && !rebulma[ componentObject.component ]){
    //   console.log(componentObject.component,'is not in bulma or reactdom')
    // }
    let renderedCompProps = Object.assign({ key: renderIndex, }, thisDotProps,
      thisprops,
      componentObject.props, asyncprops, windowprops);
    //this loops through props assigned on component (wither from props obj or asyncprops, etc ) if filtered list length is all false, then dont display
    if (typeof componentObject.conditionalprops !== 'undefined' &&
      !Object.keys(utilities.traverse(componentObject.conditionalprops, renderedCompProps)).filter(key=>utilities.traverse(componentObject.conditionalprops, renderedCompProps)[key]).length) {
      return null;
    }    else {
      return createElement(
        //element component
        (React.DOM[ componentObject.component ])
          ? componentObject.component
          : (recharts[ componentObject.component.replace('recharts.', '') ])
            ? recharts[ componentObject.component.replace('recharts.', '') ]
            : AppLayoutMap[ componentObject.component ],
        //element props
        renderedCompProps,
        //props children
        (componentObject.children && Array.isArray(componentObject.children) && typeof componentObject.children !== 'string')
          ? componentObject.children.map(childComponentObject => getRenderedComponent.call(this, childComponentObject, resources))
          : (typeof componentObject.children === 'undefined')
            ? null
            : componentObject.children
      );
    }
   
  } catch (e) {
    console.error(e);
    console.error({ componentObject, resources, }, this);
    return createElement('div', {}, e.toString());
  }
}
