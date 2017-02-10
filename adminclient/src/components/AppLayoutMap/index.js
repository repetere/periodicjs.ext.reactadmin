import React, { createElement, } from 'react';
import * as rebulma from 're-bulma';
import * as recharts from 'recharts';
import ResponsiveForm from '../ResponsiveForm'; 
import RawOutput from '../RawOutput'; 
import MenuAppLink from '../AppSidebar/MenuAppLink'; 
import SubMenuLinks from '../AppSidebar/SubMenuLinks'; 
import ResponsiveTable from '../ResponsiveTable';
import ResponsiveCard from '../ResponsiveCard';
import FormItem from '../FormItem';
import utilities from '../../util';

let renderIndex = 0;

export let AppLayoutMap = Object.assign({}, {
  recharts, ResponsiveForm, RawOutput, FormItem, MenuAppLink, SubMenuLinks, ResponsiveTable, ResponsiveCard,
}, React.DOM, rebulma);

// console.log({ AppLayoutMap });
// console.log({ ReactDOM: React.DOM['div'] });

export function getRenderedComponent(componentObject, resources) {
  // console.log('this.props', this);
  renderIndex++;
  try {
    let asyncprops = (componentObject.asyncprops && typeof componentObject.asyncprops === 'object') ? utilities.traverse(componentObject.asyncprops, resources) : {};
    let windowprops = (componentObject.windowprops && typeof componentObject.windowprops === 'object') ? utilities.traverse(componentObject.windowprops, window) : {};
    let thisprops = (!React.DOM[ componentObject.component ] && !rebulma[ componentObject.component ]) ? this.props : null;
    // if(!React.DOM[ componentObject.component ] && !rebulma[ componentObject.component ]){
    //   console.log(componentObject.component,'is not in bulma or reactdom')
    // }
    let renderedCompProps = Object.assign({ key: renderIndex, }, thisprops, componentObject.props, asyncprops, windowprops);
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
      (Array.isArray(componentObject.children) && typeof componentObject.children !== 'string')
        ? componentObject.children.map(childComponentObject => getRenderedComponent.call(this, childComponentObject, resources))
        : componentObject.children
    );
  }
  catch (e) {
    // console.error(e);
    return createElement('div', {}, e.toString());
  }
}
