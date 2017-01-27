import React from 'react';

const RawOutput = (props) => {
  return (
  	<pre>{JSON.stringify(props,null,2)}</pre>
  );
};

export default RawOutput;
