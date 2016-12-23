import React, { createElement, } from 'react';
import * as rebulma from 're-bulma'; // FormHorizontal, NavToggle, ControlLabel, Group,
// import * as reactdom from 'react-dom';
//https://github.com/lolJS/react-animate.css/blob/master/src/app.js
let renderIndex = 0;

export let AppLayoutMap = Object.assign({},React.DOM,rebulma);

export function getRenderedComponent(componentObject) {
  renderIndex++;
  let renderedCompProps = Object.assign({key:renderIndex}, componentObject.props);
  return createElement(
    AppLayoutMap[ componentObject.component ],
    renderedCompProps,
    (Array.isArray(componentObject.children) && typeof componentObject.children !=='string') ?
      componentObject.children.map(childComponentObject => getRenderedComponent(childComponentObject)) :
      componentObject.children
  );
};
// export AppLayoutMap;
