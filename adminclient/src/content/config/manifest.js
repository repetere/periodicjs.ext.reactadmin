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
                asyncProps: ['healthcheckStatus',],
              },
              {
                component: 'Title',
                children: 'Healthcheck Manifest Page',
              },],
          },],
        },],
      },
      resources: {
        healthcheckStatus: '/healthcheck',
      },
      onFinish: 'render',
    },
    '/playground': {
      layout: {
        component: 'Hero',
        props: {
          size: 'isFullheight',
        // children: 'hero body text',
        },
        children: [ {
          component: 'HeroBody',
          props: {
          // children: 'hero body text'
          },
          children: [ {
            component: 'Container',
            props: {
            // children: 'container text'
            },
            children: [
              {
                component: 'Columns',
                children: [ {
                  component: 'Column',
                  props: {
                    size:'is3',
                  },
                }, {
                  component: 'Column',
                  props: {},
                  children:[
                    {
                      component: 'Title',
                      props: {
                        style: {
                          textAlign:'center',
                        },
                      },
                      children: 'Application Detail',
                    }, {
                      component: 'ResponsiveTabs',
                      props: {
                        style: {
                          textAlign:'center',
                        },
                      },
                    }, ],
                }, {
                  component: 'Column',
                  props: {
                    size:'is3',
                  },
                }, ],
              },
            ],
          }, ],
        }, ],
      },
      resources: {
        healthcheckStatus: '/load/healthcheck',
      },
      onFinish:'render',
    },
    '/documentation': {
      layout: {
        component: 'Hero',
        props: { size: 'isFullheight', },
        children: [ {
          component: 'HeroBody',
          props:{},
          asyncprops: {
            healthcheck: ['healthcheckStatus',],
          },
          children: [ {
            component: 'Container',
            props:{},
            children:[
              {
                component: 'div',
                props: {
                  dangerouslySetInnerHTML: { __html:'<h1>Hello World</h1>' ,},
                },
              },
              {
                component: 'Title',
                // props: {
                // },
                children: 'Documentation Manifest Page',
              },],
          },],
        },],
      },
      resources: {
        healthcheckStatus: '/load/healthcheck',
      },
      onFinish:'render',
    },
  },
};