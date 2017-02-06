import React, { Component, PropTypes, } from 'react';
import { Tabs, TabGroup, Tab, Button, Container, } from 're-bulma';
import styles from '../../styles';
import { getRenderedComponent, } from '../AppLayoutMap';

const propTypes = {
  tabStyle: PropTypes.oneOf(['isToggle', 'isBoxed', ]),
  alignment: PropTypes.oneOf(['isLeft', 'isCenter', 'isRight', ]),
  size: PropTypes.oneOf(['isSmall', 'isMedium', 'isLarge', ]),
  isFullwidth: PropTypes.bool.isRequired,
  isButton: PropTypes.bool,
};

const defaultProps = {
  tabStyle: 'isToggle',
  alignment: 'isCenter',
  size: 'isMedium',
  isFullwidth: true,
  isButton: true,
};

class ResponsiveTabs extends Component {
  constructor(props) {
    super(props);
    let tabs = [{
      name: 'Overview',
      layout: {
        component: 'Container',
        props: {},
        children: [{
          component: 'div',
          children: 'This is the overview',
        }, ],
      },
    }, {
      name: 'Loan Offers',
      layout: {
        component: 'Container',
        props: {},
        children: [{
          component: 'div',
          children: 'This is the loan offers page',
        }, ],
      },
    }, ];
    
    this.state = {
      tabs,
      isButton: props.isButton,
      currentTab: '' || tabs[0],
      currentLayout: '',
    };

    this.getRenderedComponent = getRenderedComponent.bind(this);
  }

  changeTab(tab) {
    let currentLayout = this.getRenderedComponent(tab.layout);
    this.setState({
      currentTab: tab,
      currentLayout,
    });
  }
  
  componentWillMount () {
    let defaultLayout = this.getRenderedComponent(this.state.currentTab.layout);
    this.setState({
      currentLayout: defaultLayout,
    });
  }
  

  render() {
    return (
    <Container>
      <Tabs>
        <TabGroup alignment="isCenter">
            {this.state.tabs.map((tab) => {
              let active = (tab.name === this.state.currentTab.name) ? true : false;
              let buttonStyle = (tab.name === this.state.currentTab.name) ? styles.activeButton : {};
              if (this.state.isButton) return (
                <Tab isActive={active} onClick={() => this.changeTab(tab)}><Button style={buttonStyle}>{tab.name}</Button></Tab>
              );
              return (
                <Tab isActive={active} onClick={() => this.changeTab(tab)}>{tab.name}</Tab>
              );
            })}
        </TabGroup>
      </Tabs>
      {this.state.currentLayout}  
    </Container>  
    );
  }
}

ResponsiveTabs.propType = propTypes;
ResponsiveTabs.defaultProps = defaultProps;

export default ResponsiveTabs;
