import React, { createElement, } from 'react';
import * as rebulma from 're-bulma';
import ResponsiveForm from '../ResponsiveForm'; 
import FormItem from '../FormItem'; // FormHorizontal, NavToggle, ControlLabel, Group,
// import * as reactdom from 'react-dom';
//https://github.com/lolJS/react-animate.css/blob/master/src/app.js
let renderIndex = 0;

export let AppLayoutMap = Object.assign({}, {ResponsiveForm,FormItem}, React.DOM, rebulma);

// console.log({ AppLayoutMap });
// console.log({ ReactDOM: React.DOM['div'] });

export function getRenderedComponent(componentObject) {
  // console.log('AppLayoutMap[ componentObject.component ]',AppLayoutMap[ componentObject.component ])
  renderIndex++;
  let renderedCompProps = Object.assign({key:renderIndex}, componentObject.props);
  return createElement(
    (React.DOM[componentObject.component])?componentObject.component:AppLayoutMap[ componentObject.component ],
    renderedCompProps,
    (Array.isArray(componentObject.children) && typeof componentObject.children !=='string') ?
      componentObject.children.map(childComponentObject => getRenderedComponent(childComponentObject)) :
      componentObject.children
  );
};
// export AppLayoutMap;

