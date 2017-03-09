import React from 'react';
import flatten from 'flat';

const RawOutput = (props) => {
  let displayProp='';
  let displayData='';
  try {
    if (props.flattenRawData) {
      let flattenedProps = Object({}, flatten(props));
      displayProp = (props.select) ? flattenedProps[ props.select ] : flattenedProps;
    } else {
      displayProp = (props.select) ? props[ props.select ] : props;
    }
    displayData = (props.display) ? displayProp.toString() : JSON.stringify(displayProp, null, 2);

    // console.debug({ props, displayData, displayProp, });
  }
  catch (e) {
    if (!global) {
      console.error(e);
    }
  }  
  switch (props.type) {
  case 'inline':
    return (
      <span>{displayData}</span>
    );
  case 'block':
    return (
      <div>{displayData}</div>
    );
  default:
    return (
      <pre>{displayData}</pre>
    );
  }
};

export default RawOutput;
