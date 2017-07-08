'use strict';

module.exports = {
  layout: {
    component: 'Container',
    children: [{
      component: 'NavGroup',
      props: {
        style: {
          width: '100%'
        },
        align: 'center'
      },
      children: [{
        component: 'NavItem',
        props: {
          style: {
            width: '100%'
          }
        },
        children: [{
          component: 'span',
          children: 'React Admin v1.0'
        }]
      }]
    }]
  },
  'resources': {},
  'onFinish': 'render'
};