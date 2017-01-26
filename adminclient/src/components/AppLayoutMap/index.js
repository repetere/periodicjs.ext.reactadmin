import React, { createElement, } from 'react';
import * as rebulma from 're-bulma';
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
  ResponsiveForm, RawOutput, FormItem, MenuAppLink, SubMenuLinks, ResponsiveTable, ResponsiveCard,
}, React.DOM, rebulma);

// console.log({ AppLayoutMap });
// console.log({ ReactDOM: React.DOM['div'] });

export function getRenderedComponent (componentObject, resources) {
  renderIndex++;
  let asyncprops = (componentObject.asyncprops && typeof componentObject.asyncprops === 'object') ? utilities.traverse(componentObject.asyncprops, resources) : {};
  let renderedCompProps = Object.assign({ key: renderIndex }, componentObject.props, asyncprops);
  return createElement(
    (React.DOM[componentObject.component]) ? componentObject.component : AppLayoutMap[componentObject.component],
    renderedCompProps,
    (Array.isArray(componentObject.children) && typeof componentObject.children !== 'string') ?
      componentObject.children.map(childComponentObject => getRenderedComponent(childComponentObject, resources)) :
      componentObject.children
  );
};
