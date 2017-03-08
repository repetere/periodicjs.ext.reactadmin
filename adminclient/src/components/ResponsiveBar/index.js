import React, { Component, PropTypes, } from 'react';
import { Box, Columns, Column, } from 're-bulma';
// import 'font-awesome/css/font-awesome.css';
// import styles from '../../styles';

const propTypes = {
  boxProps: PropTypes.any,
};

const defaultProps = {
};

class ResponsiveBars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxProps: props.boxProps,
      columnsProps: props.columnsProps,
      features: props.features,
    };
  }

  render() {
    return (
      <Columns {...this.state.columnsProps} isMultiline>
        {this.state.features.map((feature, idx) => {
          return (
            <Column key={idx} size="is3">
              <Box {...this.state.boxProps}>
                <span onClick={() => {
                  this.props.reduxRouter.push(feature.location);
                }} >
                    <img src={feature.image} alt={feature.title} />
                    {feature.title}
                  </span>
                </Box>
            </Column>
          );
        })}
      </Columns>);
  }
}

ResponsiveBars.propTypes = propTypes;
ResponsiveBars.defaultProps = defaultProps;

export default ResponsiveBars;
