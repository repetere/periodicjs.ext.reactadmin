'use strict';

function getTestTabs() {
  return {
    component: 'ResponsiveTabs',
    props: {
      width: 600,
      height: 300,
      tabsType: 'select',
      tabsProps: {
        style: {
          width: '200px',
          height: '50px',
          backgroundColor: 'black',
        },
      },
      tabgroupProps: {
        style: {
          border: 'none',
          fontSize: 14,
          backgroundColor: 'white',
          color: 'blue',
        },
      },
      tabs: [
        {
          name: '12 Month',
          tabProps: {
            style: {
              color: 'blue',
               width: '50px',
               backgroundColor: 'blue',
            },
          },
          layout: {
            component: 'div',
            children: [{
              component: 'Title',
              children: '12 Months Content',
            }],
          },
        }, {
          name: '24 Month',
          tabProps: {
            style: {
              color: 'blue',
              width: '50px',
            }
          },
          layout: {
            component: 'div',
            children: [{
              component: 'Title',
              props: {
                style: {
                }
              },
              children: '24 Months Content',
            },],
          },
        }, {
          name: '36 Month',
          tabProps: {
            style: {
              color: 'blue',
            }
          },
          layout: {
            component: 'div',
            children: [{
              component: 'Title',
              children: '36 Months Content',
            }],
          },
        },
      ],
    },
  }
}
    

module.exports = {
  'containers':{
    '/r-admin/content/testtabs':{
      'layout':{
        component: 'Hero',
        props: {
          style: {
            padding:'5rem 0',
          },
        },
        children: [ {
          component: 'HeroBody',
          props:{},
          children: [
            {
              component: 'Container',
              props:{},
              children:[
                {
                  component: 'Title',
                  children: 'ResponsiveTabs Test',
                },
                {
                  component: 'div',
                  props: {
                    style: {
                      marginTop:'20px',
                    },
                  },
                  children: [ getTestTabs(), ],
                },
              ],
            },
          ],
        },
        ],
      },
      'onFinish':'render',
      'pageData':{
        'title':'Home',
        'navLabel':'Home',
      },
    },
  },
};

