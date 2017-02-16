import React, { Component, PropTypes, } from 'react';
import { Card, CardHeader, CardHeaderIcon, CardContent, CardHeaderTitle, } from 're-bulma';
import 'font-awesome/css/font-awesome.css';
// import styles from '../../styles';

const propTypes = {
  headerColor: PropTypes.object,
  headerTextColor: PropTypes.object,
  cardTitle: PropTypes.string,
  display: PropTypes.bool,
  leftIcon: PropTypes.bool,
  icon: PropTypes.string,
};

const defaultProps = {
  // headerColor: styles.isSecondaryBackground,
  // headerTextColor: styles.isWhite,
  cardStyle: {
    marginBottom: '20px',
  },
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
    let cardIcon = <CardHeaderIcon icon={this.state.icon} onClick={() => this.expandCard()} />;
    let leftIcon = (this.props.leftIcon)?cardIcon:null;
    let rightIcon = (!this.props.leftIcon)?cardIcon:null;
    const fullCard = (
      <Card isFullwidth style={this.props.cardStyle}>
        <CardHeader>
          {leftIcon}
          <CardHeaderTitle style={this.state.headerColor}>
            {this.state.cardTitle}
          </CardHeaderTitle>
          {rightIcon}
        </CardHeader>
        {(this.state.display) ? (
          <CardContent>{this.props.children}</CardContent>
        ) : null}
      </Card>);
    return fullCard;
  }
}

ResponsiveCard.propTypes = propTypes;
ResponsiveCard.defaultProps = defaultProps;

export default ResponsiveCard;
