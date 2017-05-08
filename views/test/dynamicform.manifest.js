'use strict';

function getTestChart(defaultDisplay) {
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
    component: 'DynamicChart',
    props: {
      passProps: {
        width: 600,
        height: 300,
      },
      chartComponent: 'LineChart',
      chartProps: {
        width: 600,
        height: 300,
        data: [
          { name: 'A', uv: 4000, pv: 2400, amt: 2400, },
          { name: 'B', uv: 3000, pv: 1398, amt: 2210, },
          { name: 'C', uv: 2000, pv: 9800, amt: 2290, },
          { name: 'D', uv: 2780, pv: 3908, amt: 2000, },
          { name: 'E', uv: 1890, pv: 4800, amt: 2181, },
          { name: 'F', uv: 2390, pv: 3800, amt: 2500, },
          { name: 'G', uv: 3490, pv: 4300, amt: 2100, },
        ],
      },
    },
    children: [{
      component: 'recharts.XAxis',
      props: {
        dataKey: 'name',
      },
    }, {
      component: 'recharts.YAxis',
    }, {
      component: 'recharts.CartesianGrid',
      props: {
        strokeDasharray: '3 3',
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
        activeDot: { r: 8, },
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
  'containers': {
    '/r-admin/content/testdynamicform': {
      'layout': {
        component: 'Hero',
        props: {
          style: {
            padding: '5rem 0',
          },
        },
        // props: { size: 'isFullheight', },
        children: [{
          component: 'HeroBody',
          props: {},
          children: [{
            component: 'Container',
            props: {},
            children: [{
                component: 'Title',
                children: 'Chart Test',
                thisprops: {
                  reqUser: ['user', ],
                },
                windowprops: {
                  screensize: ['innerWidth', ],
                },
                comparisonprops: [{
                    left: ['reqUser', 'email', ],
                    operation: 'exists',
                    right: true,
                  },
                  {
                    left: ['reqUser', 'email', ],
                    operation: 'eq',
                    right: ['reqUser', 'email', ],
                  },
                  {
                    left: ['screensize', ],
                    operation: 'lte',
                    right: 1080,
                  },
                ],
              },
              {
                component: 'div',
                props: {},
                children: [
                  getTestChart(),
                ],
              },
              {
                component: 'ResponsiveForm',
                thisprops: {
                  dynamics: ['dynamic', ],
                },
                props: {
                  updateFormOnResponse: true,
                  onSubmit: {
                    url: '/r-admin/contentdata/charts',
                    options: {
                      method: 'POST',
                    },
                    success: true,
                    responseCallback: 'func:this.props.setDynamicData',
                  },
                  dynamicResponseField: 'responseData',
                  onChange: 'func:this.props.setDynamicData',
                  flattenFormData: true,
                  style: {
                    marginBottom: '20px',
                  },
                  formgroups: [{
                      gridProps: {},
                      formElements: [{
                        type: 'text',
                        name: 'test',
                        },
                        {
                          type: 'submit',
                          value: 'update',
                        },
                      ],
                    },
                  ],
                },
                thisprops: {
                  formdata: ['dynamic', 'responseData'],
                }
              },
            ],
          }, ],
        }, ],
      },
      dynamic: {
        responseData: {
          test: 'working'
        }
      },
      'resources': {
        // 'chartdata': '/r-admin/contentdata/charts',
      },
      'onFinish': 'render',
      'pageData': {
        'title': 'Home',
        'navLabel': 'Home',
      },
    },
  },
};