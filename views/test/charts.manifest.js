'use strict';

function getTestChart() {
  const data = [
    { name: 'A', uv: 4000, pv: 2400, amt: 2400, },
    { name: 'B', uv: 3000, pv: 1398, amt: 2210, },
    { name: 'C', uv: 2000, pv: 9800, amt: 2290, },
    { name: 'D', uv: 2780, pv: 3908, amt: 2000, },
    { name: 'E', uv: 1890, pv: 4800, amt: 2181, },
    { name: 'F', uv: 2390, pv: 3800, amt: 2500, },
    { name: 'G', uv: 3490, pv: 4300, amt: 2100, },
  ];

  return {
    component: 'recharts.LineChart',
    props: {
      width: 600,
      height: 300,
      data,
    },
    children: [ {
      component: 'recharts.XAxis',
      props: {
        dataKey:'name',
      },
    }, {
      component: 'recharts.YAxis',
    }, {
      component: 'recharts.CartesianGrid',
      props: {
        strokeDasharray:'3 3',
      },  
    }, {
      component: 'recharts.Tooltip',  
    }, {
      component: 'recharts.Legend',  
    }, {
      component: 'recharts.Line',
      props: {
        type: 'monotone',
        dataKey: 'pv',  
        stroke: '#8884d8',
        activeDot:{ r: 8, },
      },  
    }, {
      component: 'recharts.Line',
      props: {
        type: 'monotone',
        dataKey: 'uv',  
        stroke: '#82ca9d',
      },  
    }, ],
  };  
}

module.exports = {
  'containers':{
    '/r-admin/content/testcharts':{
      'layout':{
        component: 'Hero',
        props: {
          style: {
            padding:'5rem 0',
          }
        },
        // props: { size: 'isFullheight', },
        children: [ {
          component: 'HeroBody',
          props:{},
          children: [
            {
              component: 'Container',
              props:{},
              children:[
                {
                  component: 'div',
                  children: 'div text',
                },
                // {
                //   component: 'RawOutput',
                //   props: {

                //     style: {
                //       border: '1px solid black',
                //       padding: 5,
                //       margin: 5,
                //     },
                //   },
                //   thisprops: {
                //     dynamics:[ 'dynamic', ],
                //   },
                // },
                {
                  component: 'Title',
                  // props: {
                  // },
                  children: [ getTestChart(), ],
                },
                { 
                  component: 'ResponsiveForm',
                  thisprops: {
                    dynamics:[ 'dynamic', ],
                  },
                  props: {
                    onSubmit: 'func:this.props.setDynamicData',
                    dynamicField: 'chartdata',
                    flattenFormData: true,
                    formgroups: [
                      {
                        gridProps: {},
                        formElements: [
                          {
                            type: 'layout',
                            value: {
                              component: 'RawStateOutput',
                              props: {
                                select:'dynamic',
                                style: {
                                  border: '1px solid black',
                                  padding: 5,
                                  margin: 5,
                                },
                              },
                              // thisprops: {
                              //   dynamics:[ 'dynamic', ],
                              // },
                            },
                          },
                          {
                            type: 'text',
                            name: 'testData',
                            label: 'test dynamic data',
                          },
                          {
                            type: 'submit',
                            value: 'update',
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
        ],
      },
      // 'resources':{
      //   // 'tabledata':'/r-admin/contentdata/users?format=json&limit=10',
      // },
      'onFinish':'render',
      'pageData':{
        'title':'Home',
        'navLabel':'Home',
      },
    },
  },
};

