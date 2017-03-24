'use strict';
const helpers = require('../lib/helpers');

module.exports = (options) => {
  let customCardProps = helpers.getCustomCardProps(options);  

  return [
    {
      component: 'Title',
      props: {
        style: {
          marginTop: '30',
        },
      },
      asyncprops: {
        children: [ 'contentstats', 'contentcounts', 'appname', ],
      },
      // children:'Application Status',
    },
    {
      component: 'ResponsiveCard',
      props: Object.assign({}, customCardProps, options.cardprops, {
        cardTitle: 'Application Overview',
      }),
      children: [
        {
          component: 'Level',
          children: [
            {
              heading: 'Extensions',
              asyncprop: 'totalExtensions',
            },
            {
              heading: 'Collections',
              asyncprop: 'totalCollections',
            },
            {
              heading: 'Documents',
              asyncprop: 'totalItems',
            },
            // {
            //   heading: 'Collections',
            //   asyncprop: 'totalCollections',
            // },
          ].map(level => {
            return {
              component: 'LevelItem',
              props: {
                hasTextCentered: true,
              },
              children: [
                {
                  component: 'Heading',
                  children: level.heading,
                },
                {
                  component: 'Title',
                  children: [
                    {
                      component: 'RawStateOutput',
                      props: {
                        select: 'stat',
                        display: true,
                        type: 'inline',
                      },
                      asyncprops: {
                        stat: [ 'contentstats', 'contentcounts', level.asyncprop ],
                      },
                    },
                  ],
                },
              ],
            };
          }),
        },
      ],
    },
    {
      component: 'ResponsiveCard',
      props: Object.assign({}, customCardProps, {
        cardTitle: 'Database Overview',
      }),
      children: [
        {
          component: 'Columns',
          children: [
            {
              component: 'Column',
              children: [
                {
                  component: 'recharts.RadialBarChart',
                  props: {
                    width: 700,
                    height: 700,
                    innerRadius: '10%',
                    outerRadius: '90%',
                    margin:'auto',
                  },
                  asyncprops: {
                    data:['contentstats', 'contentcounts', 'data', ],
                  },
                  children: [
                    {
                      component: 'recharts.RadialBar',
                      props: {
                        minAngle: 100,
                        maxAngle: -270,
                        // label: true,
                        barSize: 10,
                        background: true,
                        clockWise: true,
                        dataKey:'docs',
                        startAngle: 90,
                        endAngle:-270,
                      },
                    },
                    {
                      component:'recharts.Tooltip',
                    },
                  ],
                },
              ],
            },
            {
              component: 'Column',
              children: [
                {
                  component: 'ResponsiveTable',
                  props: {
                    hasPagination: false,
                    tableProps: {
                      isBordered:true,
                    },
                    headers: [
                      {
                        label: 'Collection',
                        sortid: 'name',
                        sortable:true,
                      },
                      {
                        label: 'Count',
                        sortid: 'count',
                        sortable:true,
                      },
                    ],
                  },
                  asyncprops: {
                    rows:['contentstats', 'contentcounts', 'data', ],
                  },

                },
              ],
            },
          ],
        },
      ],
    },
    {
      component: 'ResponsiveCard',
      props: Object.assign({}, customCardProps, {
        cardTitle: 'Extensions Overview',
      }),
      children: [
        {
          component: 'ResponsiveTable',
          props: {
            hasPagination: false,
            tableProps: {
              // isBordered:true,
            },
            headers: [
              {
                label: 'Name',
                sortid: 'name',
                sortable:true,
              },
              {
                label: 'Version',
                sortid: 'version',
                sortable:true,
              },
              {
                label: 'Enabled',
                sortid: 'enabled',
                sortable: true,
                tostring:true,
              },
              {
                label: 'Installed',
                sortid: 'date',
                sortable: true,
                momentFormat:'lll',
              },
            ],
          },
          asyncprops: {
            rows:['contentstats', 'contentcounts', 'extensions', ],
          },
        },
      ],
    },
    // {
    //   component: 'ResponsiveCard',
    //   props: cardprops({
    //     cardTitle: 'Document Feed',
    //   }),
    //     props: Object.assign({}, customCardProps, {
    // //     cardTitle: 'Document Feed',
    //     }),
    //   children: [
    //     {
    //       component: 'DynamicLayout',
    //       props: {
    //         style:{},
    //       },
    //       asyncprops: {
    //         items:['contentstats', 'contentcounts', 'databaseFeedData', ],
    //       },
    //       layout: {
    //         component: 'Columns',
    //       //   bindprops:true,
    //       //   children: [
    //       //     {
    //       //       component: 'Column',
    //       //       props: {
    //       //         size: 'isOneQuarter',
    //       //       },
    //       //       bindprops: true,
    //       //       children: [
    //       //         {
    //       //           component: 'Message',
    //       //           thisprops: {
    //       //             header: [ 'title', ],
    //       //             children: [ 'description', ],
    //       //           },
    //       //         },
    //       //       ],
    //       //     },
    //       //   ],
    //       },
    //     },
    //   ],
    // },
  ];
};