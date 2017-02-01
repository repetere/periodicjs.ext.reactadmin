import React from 'react';

const RawOutput = (props) => {
  let displayProp = (props.select) ? props[ props.select ] : props;
  let displayData = (props.display) ? displayProp.toString() : JSON.stringify(displayProp, null, 2);
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
