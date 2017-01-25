import { Component } from 'react';
import 'font-awesome/css/font-awesome.css';
import { getRenderedComponent, } from '../components/AppLayoutMap';

let ApplicationsLayout = {
  component: 'Hero',
  props: { size: 'isFullheight', },
  children: [ {
    component: 'HeroBody',
    props:{},
    children: [ {
      component: 'Container',
      props:{},
      children:[
        {
          component: 'div',
          children: 'div text'
        },
        {
          component: 'Title',
          props: {
          },
          children: 'Applications Page',
        }]
    }]
  }]
};

class Applications extends Component {
  render() {
    return getRenderedComponent(ApplicationsLayout);
  }
}

export default Applications;
