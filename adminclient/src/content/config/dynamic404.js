'use strict';

module.exports = {
	layout: {
    component: 'Hero',
    props: { size: 'isFullheight', },
    children: [ {
      component: 'HeroBody',
      props:{},
      asyncprops: {
      	healthcheck: ['healthcheckStatus']
      },
      children: [ {
        component: 'Container',
        props:{},
        children:[{
        	component: 'Content',
        	props: {},
        	children: [{
        		component: 'h1',
        		children: 'Some Error Message'
        	}, {
        		component: 'div',
        		children: 'Some dynamic content'
        	}]
        }]
      }]
    }]
  },
  resources: {
    healthcheckStatus:'/load/healthcheck'
  },
  onFinish:'render'
};