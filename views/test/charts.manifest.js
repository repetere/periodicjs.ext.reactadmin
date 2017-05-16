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
    component: (defaultDisplay) ? 'recharts.LineChart' : 'DynamicChart',
    props: (defaultDisplay) ? {
      width: 600,
      height: 300,
      data,
    } : {
      passProps: {
        width: 600,
        height: 300,
      },
      chartComponent: 'LineChart',
      chartProps: {
        width: 600,
        height: 300,
        data,
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
    '/r-admin/content/testcharts': {
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
                'component': 'DynamicLayout',
                // ignoreReduxProps:true,
                'props': {
                  'items': [{
                    data: [
                      { name: 'A', uv: 4000, pv: 2400, amt: 2400, },
                      { name: 'B', uv: 3000, pv: 1398, amt: 2210, },
                      { name: 'C', uv: 2000, pv: 9800, amt: 2290, },
                      { name: 'D', uv: 2780, pv: 3908, amt: 2000, },
                      { name: 'E', uv: 1890, pv: 4800, amt: 2181, },
                      { name: 'F', uv: 2390, pv: 3800, amt: 2500, },
                      { name: 'G', uv: 3490, pv: 4300, amt: 2100, },
                    ],
                  }, ],
                  style: {
                    display: 'block',
                  },
                  'layout': {
                    'component': 'recharts.LineChart',
                    ignoreReduxProps: true,
                    props: {
                      width: 600,
                      height: 300,
                    },
                    thisprops: {
                      data: ['data']
                    },
                    'children': [{
                        component: 'recharts.XAxis',
                        props: {
                          dataKey: 'name',
                        },
                      }, {
                        component: 'recharts.YAxis',
                        // ignoreReduxProps: true,
                        hasWindowFunc: true,
                        props: {
                          tickFormatter: 'func:window.tickerFormatter',
                        },
                      }, {
                        component: 'recharts.CartesianGrid',
                        props: {
                          strokeDasharray: '3 3',
                        },
                      }, {
                        component: 'recharts.Tooltip',
                      }, {
                        component: 'recharts.Legend',
                        ignoreReduxProps: true,
                      }, {
                        component: 'recharts.Line',
                        props: {
                          type: 'monotone',
                          dataKey: 'pv',
                          stroke: '#8884d8',
                          activeDot: { r: 8, },
                        },
                      },
                      {
                        component: 'recharts.Line',
                        // ignoreReduxProps:true,

                        props: {
                          type: 'monotone',
                          dataKey: 'uv',
                          stroke: '#82ca9d',
                        },
                      },
                    ],
                  },
                },
              },
              {
                component: 'Title',
                props: {
                  style: {
                    marginTop: '20px',
                  },
                },
                children: [
                  // getTestChart(),
                  // getTestChart(2),
                ],
              },
              {
                component: 'ResponsiveForm',
                thisprops: {
                  dynamics: ['dynamic', ],
                },
                props: {
                  onSubmit: 'func:this.props.setDynamicData',
                  onChange: 'func:this.props.setDynamicData',
                  dynamicField: 'chartdata',
                  flattenFormData: true,
                  style: {
                    marginBottom: '20px',
                  },
                  formgroups: [{
                      gridProps: {},
                      formElements: [{
                          type: 'layout',
                          value: {
                            component: 'div',
                            children: [{
                                component: 'RawStateOutput',
                                props: {
                                  select: 'dynamic',
                                  style: {
                                    border: '1px solid black',
                                    padding: 5,
                                    margin: 5,
                                  },
                                },
                              },
                              {
                                component: 'Title',
                                props: {},
                                thisprops: {
                                  children: ['dynamic', 'chartdata', 'testData', ],
                                },
                              },
                            ],
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
                    {
                      formElements: [{
                        type: 'slider',
                        name: 'loansize',
                        label: 'loan size',
                        handle: true,
                        passProps: {
                          min: 3000,
                          max: 35000,
                          step: 1000,
                        },
                        wrapperProps: {
                          style: {
                            border: 'none',
                            background: 'none',
                          },
                        },
                        leftLabel: '$3,000',
                      }, ],
                    },
                    {
                      formElements: [
                        // {},
                        {
                          type: 'layout',
                          value: {
                            component: 'DynamicForm',
                            props: {
                              flattenData: true,
                              formgroups: [{
                                formElements: [{
                                  type: 'text',
                                  label: 'chart data',
                                  name: 'chartdata.testData',
                                }, ],
                              }, ],
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
              },
              {
                component: 'div',
                props: {
                  style: {
                    margin: '10px 0',
                  },
                },
                children: [{
                    component: 'Title',
                    children: 'slider',
                  },
                  {
                    component: 'Slider',
                    props: {
                      min: 3000,
                      max: 35000,
                      step: 1000,
                    },
                  },
                ],
              },
              {
                component: 'Carousel',
                props: {
                  showThumbs: false,
                  showStatus: false,
                  showArrows: false,
                  infiniteLoop: true,
                  // emulateTouch: true,
                  autoPlay: true,
                },
                children: [{
                    component: 'div',
                    props: {
                      key: 1 + Math.random(),
                    },
                    children: [{
                        component: 'p',
                        children: 'slider image 1',
                      },
                      {
                        component: 'Image',
                        props: {
                          src: 'https://cdn.promisefinancial.net/cloudfiles%2F2016%2F06%2F27%2F56c4dd91b0d021d5579fa01b-promisefin_fertility3-2016-06-27_17-35-11.jpeg',
                        },
                      },
                    ],
                  },
                  {
                    component: 'div',
                    props: {
                      key: 2 + Math.random(),
                    },
                    children: [{
                        component: 'Image',
                        props: {
                          src: 'https://cdn.promisefinancial.net/cloudfiles%2F2016%2F06%2F12%2F56c4dd91b0d021d5579fa01b-promise_homepage-min-2016-06-12_17-31-49.jpg',
                        },
                      },
                      {
                        component: 'p',
                        children: 'slider image 2',
                      },
                    ],
                  },
                  {
                    component: 'div',
                    props: {
                      key: 3 + Math.random(),
                    },
                    children: [{
                        component: 'Image',
                        props: {
                          src: 'https://cdn.promisefinancial.net/cloudfiles%2F2016%2F06%2F27%2F56c4dd91b0d021d5579fa01b-promisefin_home_improvement-2016-06-27_16-40-47.jpg',
                        },
                      },
                      {
                        component: 'p',
                        children: 'slider image 3',
                      },
                    ],
                  },
                ],
              },
            ],
          }, ],
        }, ],
      },
      // 'resources':{
      //   // 'tabledata':'/r-admin/contentdata/users?format=json&limit=10',
      // },
      'onFinish': 'render',
      'pageData': {
        'title': 'Home',
        'navLabel': 'Home',
      },
    },
  },
};