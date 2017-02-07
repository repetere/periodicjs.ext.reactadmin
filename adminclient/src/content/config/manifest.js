module.exports = {
  'containers': {
    '/healthcheck': {
      layout: {
        component: 'Hero',
        props: { size: 'isFullheight', },
        children: [{
          component: 'HeroBody',
          props: {},
          children: [{
            component: 'Container',
            props: {},
            children: [
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
        healthcheckStatus: '/healthcheck'
      },
      onFinish: 'render'
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
                  dangerouslySetInnerHTML: {__html:'<h1>FooBar: the most used line in code</h1>'}
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