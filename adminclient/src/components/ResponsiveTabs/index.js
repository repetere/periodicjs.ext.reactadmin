import React, { Component, PropTypes, } from 'react';
import { Tabs, TabGroup, Tab, Button, Select, } from 're-bulma';
import styles from '../../styles';
import { getRenderedComponent, } from '../AppLayoutMap';

const propTypes = {
  tabsType: PropTypes.string,
  isFullwidth: PropTypes.bool.isRequired,
  isButton: PropTypes.bool,
  tabgroupProps: PropTypes.object,
  tabsProps: PropTypes.shape({
    tabStyle: PropTypes.oneOf(['isToggle', 'isBoxed', ]),
    alignment: PropTypes.oneOf(['isLeft', 'isCenter', 'isRight', ]),
    size: PropTypes.oneOf(['isSmall', 'isMedium', 'isLarge', ]),
  }),  
};

const defaultProps = {
  tabsType: 'pageToggle',
  isFullwidth: true,
  isButton: true,
  tabgroupProps: {},
  tabsProps: {
    alignment: 'isCentered',
    size: 'isMedium',
  },  
};

class ResponsiveTabs extends Component {
  constructor(props) {
    super(props);
    // console.debug('responsiveTab',{props})
    this.state = {
      tabsType: props.tabsType,
      tabs: props.tabs,
      isButton: props.isButton,
      currentTab: '' || props.tabs[0],
      currentLayout: '',
      tabgroupProps: props.tabgroupProps,
      tabsProps: props.tabsProps,
    };

    this.getRenderedComponent = getRenderedComponent.bind(this);
  }

  changeTab(tab) {
    if(this.state.tabsType === 'select'){
      tab = this.state.tabs[Number(tab)];
    }
    let currentLayout = (tab.layout && (Object.keys(tab.layout).length >= 1)) ? this.getRenderedComponent(tab.layout) : '';
    // window.location.hash = tab.name;
    this.setState({
      currentTab: tab,
      currentLayout,
    });
  }
  
  componentWillMount() {
    let defaultLayout = (this.state.currentTab.layout && (Object.keys(this.state.currentTab.layout).length >= 1)) ? this.getRenderedComponent(this.state.currentTab.layout) : '';
    this.setState({
      currentLayout: defaultLayout,
    });
  }
  

  render() {

    if (this.state.tabsType === 'select') {
      return (
        <div>
          <Tabs {...this.state.tabsProps}>
            <TabGroup>
              <Select { ...this.state.tabgroupProps } onChange={(e) => {this.changeTab(e.target.value)}}>
                {this.props.tabs.map((tab, idx) => {
                  return <option key={idx} value={idx} {...tab.tabProps}>
                          {tab.name}
                        </option>  
                })}
              </Select> 
            </TabGroup> 
          </Tabs> 
          {this.state.currentLayout} 
        </div>
      )
    }

    if (this.state.tabsType === 'pageToggle') {
      return (
      <div>
          <Tabs { ...this.state.tabsProps }>
            <TabGroup { ...this.state.tabgroupProps }>
              {this.state.tabs.map((tab) => {
                let active = (tab.name === this.state.currentTab.name) ? true : false;
                let buttonStyle = (tab.name === this.state.currentTab.name) ? styles.activeButton : {};
                if (this.state.isButton) return (
                  <Tab {...tab.tabProps} isActive={active} onClick={() => this.changeTab(tab)}><Button style={buttonStyle}>{tab.name}</Button></Tab>
                );
                return (
                  <Tab {...tab.tabProps} isActive={active} onClick={() => this.changeTab(tab)}>{tab.name}</Tab>
                );
              })}
          </TabGroup>
        </Tabs>
        {this.state.currentLayout}
      </div>  
      );
    }
    
    if (this.state.tabsType === 'navBar') {
      return (
        <div>
          <Tabs { ...this.state.tabsProps }>
            <TabGroup { ...this.state.tabgroupProps }>
              {this.state.tabs.map((tab, idx) => {
                let active = (tab.name === this.state.currentTab.name) ? true : false;
                return (
                  <Tab {...tab.tabProps} key={idx} isActive={active} onClick={() => this.changeTab(tab)}>{tab.name}</Tab>
                );
              })}
          </TabGroup>
          </Tabs>
        {this.state.currentLayout}
        </div>  
      );
    }
  }
}

ResponsiveTabs.propType = propTypes;
ResponsiveTabs.defaultProps = defaultProps;

export default ResponsiveTabs;
