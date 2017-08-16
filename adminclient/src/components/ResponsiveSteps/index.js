import React, { Component, PropTypes, } from 'react';
import 'rc-steps/assets/index.css';
import 'rc-steps/assets/iconfont.css';
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

class ResponsiveStep extends Component {
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

ResponsiveStep.propTypes = propTypes;
ResponsiveStep.defaultProps = defaultProps;

export default ResponsiveStep;
