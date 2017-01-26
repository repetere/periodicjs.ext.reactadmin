import React, {Component} from 'react';
import {Card, CardHeader,CardHeaderIcon, CardContent, CardHeaderTitle, Content, CardFooter, CardFooterItem, FormHorizontal, Input, ControlLabel, Column, Columns, Label } from 're-bulma';
import 'font-awesome/css/font-awesome.css';

export default class ResponsiveCard extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      display: 'block',
      icon: 'fa fa-angle-down',
      cardTitle: props.cardTitle || 'Not set'
    };
  }


  expandCard() {
    this.setState({
      display: (this.state.display === 'none') ? 'block' : 'none',
      icon: (this.state.icon === 'fa fa-angle-down') ? 'fa fa-angle-right' : 'fa fa-angle-down'
    })
  };

  render() {
    let fullCard = (
      <Card isFullwidth>
        <CardHeader >
          <CardHeaderTitle>
            {this.state.cardTitle}
          </CardHeaderTitle>
          <CardHeaderIcon icon={this.state.icon} onClick={() => this.expandCard()}/>
        </CardHeader>
        <CardContent style={{ display: this.state.display }}>
          <Content>
            {this.props.children}  
          </Content>
        </CardContent>
      </Card>);
    return fullCard;
  }
}
