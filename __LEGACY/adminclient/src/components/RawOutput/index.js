import React from 'react';
import flatten from 'flat';

const RawOutput = (props) => {
  // console.debug('GOT TO RAWOUTPUT')
  let displayProp='';
  let displayData='';
  try {
    let propData = Object.assign({}, props, this.props.getState());
    // console.debug({propData})
    if (props.flattenRawData) {
      let flattenedProps = Object({}, flatten(propData));
      displayProp = (props.select) ? flattenedProps[ props.select ] : flattenedProps;
    } else {
      displayProp = (props.select) ? propData[ props.select ] : propData;
    }
    displayData = (props.display) ? displayProp.toString() : JSON.stringify(displayProp, null, 2);

    console.debug({ props, displayData, displayProp, });
  } catch (e) {
    if (!global) {
      console.error(e);
    }
  }  
  switch (props.type) {
  case 'inline':
    return (
      <span style={props.style}>{displayData}</span>
    );
  case 'block':
    return (
      <div style={props.style}>{displayData}</div>
    );
  default:
    return (
      <pre style={props.style}>{displayData}</pre>
    );
  }
};

export default RawOutput;
