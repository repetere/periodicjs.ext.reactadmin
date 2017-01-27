module.exports = {
  'containers': {
    '/healthcheck': {
      layout: {
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
                component: 'RawOutput',
                asyncProps: ['healthcheckStatus']
              },
              {
                component: 'Title',
                children: 'Documentation Page',
              }]
          }]
        }]
      },
      resources: {
        healthcheckStatus:'/healthcheck'
      },
      onFinish:'render'
    },
    '/applications': {
      layout: {
        // component: 'Hero',
        // props: {size: 'isFullheight'},
        // children: [{
        //   component: 'HeroBody',
        //   props: {},
        //   children: [{
        component: 'Container',
        props: { style: { marginTop: '60' } },
        children: [{
          component: 'ResponsiveTable',
          props: {}
        }, {
          component: 'ResponsiveCard',
          props: { cardTitle: 'Application Overview' },
          children: []
        }, {
          component: 'ResponsiveCard',
          props: { cardTitle: 'Applicant Detail' },
          children: []
        }, {
          component: 'ResponsiveCard',
          props: { cardTitle: 'Customer Detail' },
          children: []
        }]
        //   }]
        // }]
      },
      resources: {},
      onFinish:'render'
    },    
    '/documentation': {
      layout: {
        component: 'Hero',
        props: { size: 'isFullheight' },
        children: [ {
          component: 'HeroBody',
          props:{},
          asyncprops: {
            healthcheck: ['healthcheckStatus']
          },
          children: [ {
            component: 'Container',
            props:{},
            children:[
              {
                component: 'div',
                props: {
                  dangerouslySetInnerHTML: {__html:'<h1>Hello World</h1>'}
                }
              },
              {
                component: 'Title',
                // props: {
                // },
                children: 'Documentation Page',
              }]
          }]
        }]
      },
      resources: {
        healthcheckStatus: '/load/healthcheck'
      },
      onFinish:'render'
    }
  }
}