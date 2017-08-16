import React, { Component, PropTypes, } from 'react';
import Steps, { Step, } from 'rc-steps';

const propTypes = {
  stepsProps: PropTypes.object,
  steps: PropTypes.array,
};

const defaultProps = {
  stepsProps: {},
  steps: [ {
    title: 'Test 1',
    description: 'this is a test',
  }, ],
};

class ResponsiveSteps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stepsProps: props.stepProps,
      steps: props.steps,
    };
  }

  addStep(title, description) {
    const steps = this.state.steps;
    steps.push({
      title,
      description,
    });
    this.setState({ steps, });
  }

  render() {
    const fullSteps = (
      <Steps {...this.props.stepsProps} current={this.props.current}>
        {this.props.steps.map((s, i) => {
          return (
            <Step
              key={i}
              status={s.status}
              title={s.title}
              icon={s.icon}
              description={s.description0}
            />
          );
        }) }  
      </Steps>);
    return fullSteps;
  }
}

ResponsiveSteps.propTypes = propTypes;
ResponsiveSteps.defaultProps = defaultProps;

export default ResponsiveSteps;
