import React, { Component, PropTypes, } from 'react';
import { Card, CardHeader, CardHeaderIcon, CardContent, CardHeaderTitle, Content, } from 're-bulma';
import 'font-awesome/css/font-awesome.css';
import styles from '../../styles';

const propTypes = {
  headerColor: PropTypes.object,
  headerTextColor: PropTypes.object,
  cardTitle: PropTypes.string,
  display: PropTypes.bool,
  icon: PropTypes.string,
};

const defaultProps = {
  headerColor: styles.isSecondaryBackground,
  headerTextColor: styles.isWhite,
  cardTitle: 'Not Set',
  display: true,
  icon: 'fa fa-angle-down',
};

class ResponsiveCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerColor: props.headerColor,
      headerTextColor: props.headerTextColor,
      display: props.display,
      icon: props.icon,
      cardTitle: props.cardTitle,
      cardProps: props.cardProps,
    };
  }

  expandCard() {
    this.setState({
      display: (this.state.display === true) ? false : true,
      icon: (this.state.icon === 'fa fa-angle-down') ? 'fa fa-angle-right' : 'fa fa-angle-down',
    });
  }

  render() {
    const fullCard = (
      <Card isFullwidth {...this.state.cardProps}>
        <CardHeader>
          <CardHeaderTitle style={this.state.headerColor}>
            {this.state.cardTitle}
          </CardHeaderTitle>
          <CardHeaderIcon icon={this.state.icon} onClick={() => this.expandCard()}/>
        </CardHeader>
        <CardContent>
            {(this.state.display) ? this.props.children : null}
        </CardContent>
      </Card>);
    return fullCard;
  }
}

ResponsiveCard.propTypes = propTypes;
ResponsiveCard.defaultProps = defaultProps;

export default ResponsiveCard;
